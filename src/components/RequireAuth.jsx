import { useLocation, Navigate, Outlet } from "react-router-dom"
import useUserInfo from "../hooks/useUserInfo"

function RequireAuth({allowedRoles}) {

    const location = useLocation();
    const {roles} = useUserInfo();
    
    

  return (
    <div>
        {
            roles.some((ele) => allowedRoles.includes(ele)) ? 
                <Outlet />
                :
                <Navigate to="/login" state={{ from: location}} replace />
        }
    </div>
  )
}

export default RequireAuth