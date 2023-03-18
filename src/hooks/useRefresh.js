import {axiosClient} from "../api/axiosClient"
import { useAuth } from "./useAuth";

export const useRefresh = () => {

    const URL = "/auth/refresh"

    const{userState, setUserState} = useAuth();

    const updateAccessToken = async () => {
        const response = await axiosClient.get(URL, {
            withCredentials: true
        })
        setUserState((prev) => {
            return{
                ...prev,
                accessToken: response.data.accessToken, 
                roles: JSON.parse(response.data.roles)
            }
        });
        return response.data.accessToken
    }
    return updateAccessToken
}