import jwtDecode from "jwt-decode";
import {useAuth} from "./useAuth"



function useUserInfo() {
    const{userState} = useAuth();
    let isAdmin = false;
    let isManager = false;
    let status = "employee";

    if(userState?.accessToken){
        const decodeToken = jwtDecode(userState.accessToken);
        // const {id, name, active, roles} = decodeToken.userInfo;
        const id = decodeToken.userInfo.id;
        const name = decodeToken.userInfo.name;
        const active = decodeToken.userInfo.active;
        const roles = JSON.parse(decodeToken.userInfo.roles);


        isManager = roles.includes("manager");
        isAdmin = roles.includes("admin");

        if(isManager){
            status = "manager"
        }

        if(isAdmin){
            status = "admin"
        }

        return {name, roles, status, active, id, isManager, isAdmin}
    }

    return {name: "", roles: [], isManager, isAdmin, status}
}

export default useUserInfo