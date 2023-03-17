import {Link, useNavigate, useLocation} from 'react-router-dom'
import { axiosClient } from '../api/axiosClient'
import {useAuth} from "../hooks/useAuth"

const DashHeader = () => {

  const URL = "/auth/logout"

  const {pathname} = useLocation();

  const navigate = useNavigate();

  const{userState, setUserState} = useAuth();  

  const logout = async() => {
    try {
      const response = await axiosClient.get(URL, {
        withCredentials: "true"
      })
      if(response.status === 200 || response.status === 204){
        setUserState({ loginStatus: false, accessToken: "", roles: [] });
        alert("Logout Successfull");
        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: DashHeader.jsx:17 ~ logout ~ error:", error)
      alert("Unable to Logout")
    }
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <Link to="/dash">
            <h1>TechNotes</h1>
        </Link>
        {pathname !== "/dash" 
            ?
            <p style={{cursor: "pointer"}} onClick={() => navigate("/dash")}>Home</p>
            :
            null 
        }
        <p>Current User:- </p>
        <p>Status:- </p>
        <p onClick={logout} style={{cursor: "pointer"}}>Logout</p>
    </div>
  )
}

export default DashHeader