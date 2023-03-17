import {axiosClient} from "../api/axiosClient"
import { useAuth } from "./useAuth";

export const useRefresh = () => {
    const{userState, setUserState} = useAuth();

    const updateAccessToken = async () => {
        
    }
}