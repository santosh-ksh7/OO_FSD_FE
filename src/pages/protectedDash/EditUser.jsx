import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../api/axiosClient";
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Paper, styled, Typography, Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { CheckBoxLabelWrapper, CheckBoxParentWrapper, MyFormWrapper, MyTitle } from '../../components/MUIreusable';
import Switch from '@mui/material/Switch';
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";



function EditUser() {

  const {id} = useParams();

  const URL = `users/${id}`;

  const[user, setUser] = useState({});
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  
  const axiosPrivate = useAxiosPrivate();

  const getAllSingleUser = async (signal) => {
    try {
      const response = await axiosPrivate.get(URL, 
        {
        signal: signal
        }
      );
      console.log("🚀 ~ file: NotesList.jsx:16 ~ getAllNotes ~ response:", response);      
      if(response.status === 200){
        setLoading(false);
        setUser(response.data.data);
      }else if(response.status === 204){
        setLoading(false);
        setMessage("No user found with this specific the identifier.");
      }
    } catch (error) {
      if(error.name === "CanceledError"){
        return "Request aborted, since the component mounts -> unmounts -> remounts. So by setting the error you do not want your logic to fail."
      }else{
        console.log("🚀 ~ file: EditUser.jsx:21 ~ getAllSingleUser ~ error:", error)
        setError(error.message);
        setLoading(false);
      }
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getAllSingleUser(signal);

    return () => controller.abort();
  }, [])

  return (
    <div>
      <h1>Place to Edit a Specific User for now!!!</h1>
      {loading && <p>Loading.......</p>}
      {error && <p>{`Error in fulfilling the request:- ${error}`}</p>}
      {!loading && !error && message && <p>{message}</p>}
      {!loading && !error && !message && user?.name && <UserEditForm data={user} />}
    </div>
  )
}

export default EditUser



function UserEditForm({data}){

  const axiosPrivate = useAxiosPrivate();

  const id = data.id;
  const[name, setName] = useState(data.name);
  const[roles, setRoles] = useState(JSON.parse(data.roles));
  const[active, setActive] = useState(data.active);
  const[password, setPassword] = useState("");
  const[re_password, setRe_Password] = useState("");
  const[showpwd, setShowpwd] = useState(false);
  const[validationError, setValidationError] = useState("");

  // * Because not every edit requires a password to be updated, it can be for roles, active or name change as well
  const[updatingPassword, setUpdatingPassword] = useState(false);

  // * Run the validation everytime the name is changed
  useEffect(() => {
    if(!name){
      setValidationError("Name is a required field")
    }else{
      setValidationError("")
    }
  }, [name])

  // * Run the validation everytime the role is changed
  useEffect(() => {
    if(roles?.length){
      setValidationError("")
    }else{
      setValidationError("At least one roles should be assigned to the user")
    }
  }, [roles])

  // * Run the validation everytime the password is chamged/typed
  useEffect(() => {
    if(password.length >= 8 && password.includes("!") || password.includes("@") || password.includes("#") || password.includes("$") || password.includes("^")){
      setValidationError("")
    }else{
      setValidationError("Password should minimum 8 digit in length & should contain any of the special character !, @, #, $, ^")
    }
  }, [password])

  useEffect(() => {
    if(re_password === password){
      setValidationError("")
    }else{
      setValidationError("Both your password should match")
    }
  }, [re_password])

  // * A function to handle change in roles for user
  function alterRoles(event){
    if(event.target.checked){
        if(!roles.includes(event.target.value)){
          setRoles([...roles, event.target.value])
        }
    }else{
      if(roles.includes(event.target.value)){
        const newArray = roles.filter((ele) => ele !== event.target.value);
        setRoles(newArray);
      }
    }
}

  // * A function to handle status change for user
  function alterStatus(event){
    setActive(event.target.value);
  }


  function handleSubmit(event){
    event.preventDefault();
    if(updatingPassword){
      console.log(name, active, roles, password, re_password, updatingPassword)
    }else{
      console.log(name, active, roles, updatingPassword)
    }
  }

  async function deleteUser(){
    const delURL = `/users/delete-user/${id}`
    try {
      const response = await axiosPrivate.delete(delURL);
      if(response.status === 200){
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }

  return(
    <div>
      <Paper elevation={24} square sx={{width: "360px", padding: "10px"}}>
          <h3>Edit User</h3>
          {validationError ? <MyTitle sx={{color: "red"}}>{validationError}</MyTitle> : null}
          <MyFormWrapper onSubmit={(e) => handleSubmit(e)}>
            {/* Updating the name */}
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="standard-error-helper-text1"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    ),
                }}
                label="Name"
                variant="standard"
                type="text"
              />
              {/* Updating the user status */}
              <h3>Changes user status</h3>
              <CheckBoxParentWrapper>
                <CheckBoxLabelWrapper>
                  <input
                    onChange={(e) => alterStatus(e)} 
                    type="radio" 
                    name="active" 
                    id="alterStatus1" 
                    value={true} 
                    defaultChecked={active ? true : false} 
                  />
                  <label htmlFor="alterStatus1">Active</label>
                </CheckBoxLabelWrapper>
                <CheckBoxLabelWrapper>
                  <input
                    onChange={(e) => alterStatus(e)} 
                    type="radio" 
                    name="active" 
                    id="alterStatus2" 
                    value={false} 
                    defaultChecked={active ? false : true} 
                  />
                  <label htmlFor="alterStatus2">Unactive</label>
                </CheckBoxLabelWrapper>
              </CheckBoxParentWrapper>
              {/* Updating the user roles */}
              <h3>Updates Roles to user</h3>
              <CheckBoxParentWrapper>
                  <CheckBoxLabelWrapper>
                      <Checkbox
                          onChange={(e) => alterRoles(e)}
                          label="Employee"
                          defaultChecked = {roles.includes("employee")}
                          id="employeeCheckBox"
                          value="employee"
                          name="roles"
                      />
                      <label htmlFor="employeeCheckBox">Employee</label>
                  </CheckBoxLabelWrapper>
                  <CheckBoxLabelWrapper>
                      <Checkbox
                          onChange={(e) => alterRoles(e)}
                          defaultChecked = {roles.includes("manager")}
                          label="Manager"
                          id="managerCheckBox"
                          value="manager"
                      />
                      <label htmlFor="managerCheckBox">Manager</label>
                  </CheckBoxLabelWrapper>
                  <CheckBoxLabelWrapper>
                      <Checkbox
                          onChange={(e) => alterRoles(e)}
                          defaultChecked = {roles.includes("admin")}
                          label="Admin"
                          id="adminCheckBox"
                          value="admin"
                      />
                      <label htmlFor="adminCheckBox">Admin</label>
                  </CheckBoxLabelWrapper>
              </CheckBoxParentWrapper>
              {/* Toggling the update password */}
              <CheckBoxLabelWrapper>
                <Switch 
                  checked={updatingPassword} 
                  onChange={() => setUpdatingPassword(!updatingPassword)} 
                />
                <label>Check to Update Password</label>
              </CheckBoxLabelWrapper>
              {/* Updating the password */}
              {updatingPassword && 
                <div>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="standard-password-input2"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon />
                            </InputAdornment>
                            ),
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={()=> setShowpwd(!showpwd)}>
                                {showpwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label="Password"
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => setRe_Password(e.target.value)}
                    name="re_password"
                    id="standard-password-input3"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                        ),
                      endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={()=> setShowpwd(!showpwd)}>
                          {showpwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Re Type Password"
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                  />
                </div>
              }
              <CheckBoxParentWrapper>
                <Button type="submit" variant="outlined" >Update User</Button>
                <Button onClick={deleteUser} variant="outlined" sx={{color: "red"}} >Delete User</Button>
              </CheckBoxParentWrapper>
          </MyFormWrapper>
      </Paper>
    </div>
  )
}