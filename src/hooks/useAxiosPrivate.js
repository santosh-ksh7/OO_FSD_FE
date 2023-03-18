import { useEffect } from "react";
import { axiosPrivateClient } from "../api/axiosClient";
import { useAuth } from "./useAuth"
import { useRefresh } from "./useRefresh";


export const useAxiosPrivate = () => {

    const{userState, setUserState} = useAuth();

    const refreshAccessToken = useRefresh();

    useEffect(() => {

        // * Request Intercept
        const requestIntercept = axiosPrivateClient.interceptors.request.use(
            (config) => {
                if(!config.headers["Authorization"]){
                    config.headers["Authorization"] = `Bearer ${userState?.accessToken}`
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        // * Response Interceptors
        const responseIntercept = axiosPrivateClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refreshAccessToken();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                    return axiosPrivateClient(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivateClient.interceptors.response.eject(responseIntercept);
            axiosPrivateClient.interceptors.request.eject(requestIntercept);
        }

    },[userState, refreshAccessToken])
    // TODO: Find out the purpose of dependencies

    return axiosPrivateClient
}