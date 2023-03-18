import {Link, useNavigate, useLocation} from 'react-router-dom'
import { axiosClient } from '../api/axiosClient'
import {useAuth} from "../hooks/useAuth"
import useUserInfo from '../hooks/useUserInfo'

const DashHeader = () => {

  const {name, status, isManager, isAdmin} = useUserInfo();

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
        setUserState({});
        alert("Logout Successfull");
        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: DashHeader.jsx:17 ~ logout ~ error:", error)
      alert("Unable to Logout")
    }
  }

  const linkStyle = {
    cursor: "pointer"
  }

  let createNewNoteLink = null;
  if(pathname !== "/dash/notes/new"){
    createNewNoteLink = <p style={linkStyle} onClick={() => navigate("/dash/notes/new")}>Create New Note</p>
  }

  let createNewUser = null;
  if(pathname !== "/dash/users/new" && (isManager || isAdmin)){
    createNewUser = <p style={linkStyle} onClick={() => navigate("/dash/users/new")}>Create New User</p>
  }

  let viewAllUsers = null;
  if(pathname !== "/dash/users" && (isManager || isAdmin)){
    viewAllUsers = <p style={linkStyle} onClick={() => navigate("/dash/users")}>View All User</p>
  }

  let viewAllNotes = null;
  if(pathname !== "/dash/notes" && (isManager || isAdmin)){
    viewAllNotes = <p style={linkStyle} onClick={() => navigate("/dash/notes")}>View All Notes</p>
  }

  let homeLink = null;
  if(pathname !== "/dash"){
    homeLink = <p style={linkStyle} onClick={() => navigate("/dash")}>TechNotes</p>
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        <h1>TechNotes</h1>
        {homeLink}
        {createNewNoteLink}
        {createNewUser}
        {viewAllUsers}
        {viewAllNotes}
        <p>Current User:- {name}</p>
        <p>Status:- {status}</p>
        <p onClick={logout} style={{cursor: "pointer"}}>Logout</p>
    </div>
  )
}

export default DashHeader