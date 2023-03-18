import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { CheckBoxLabelWrapper, MyFormWrapper } from '../../components/MUIreusable'
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Paper } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../hooks/useAuth';
import { axiosClient } from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import usePersist from '../../hooks/usePersist';




function Login() {

  const URL = "/auth/login"

  const navigate = useNavigate();

  const[persist, setPersist] = usePersist();

  const{userState, setUserState} = useAuth();  

  const[showpwd, setShowpwd] = useState(false);

  const login = async (payload) => {
    try {
      const response = await axiosClient.post(URL, payload, {
        withCredentials: true
      });
      console.log("🚀 ~ file: Login.jsx:30 ~ login ~ response:", response);
      if(response.status === 200){
        setUserState({...userState, loginStatus: true, accessToken: response.data.accessToken , roles: JSON.parse(response.data.roles) });
        alert(response.data.message);
        navigate("/dash")
      }
    } catch (error) {
      console.log("🚀 ~ file: Login.jsx:35 ~ login ~ error:", error)
      if(error.response.status === 406 || error.response.status === 422 || error.response.status === 429){
        alert(error.response.data.message)
      }
    }
  }

  const validationSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().required().min(8).matches(/[!@#$^]/, "Password should contain at-least 1 of the following special characters !, @, #, $, ^")
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ file: Login.jsx:58 ~ Login ~ values:", values);
      login(values);
    }
  })

  const handlePersistToggle = () => setPersist((prev) => !prev)

  return (
    <div>
      <Paper elevation={24} square sx={{width: "360px", padding: "10px"}}>
      <h3>Login</h3>
      <MyFormWrapper onSubmit={formik.handleSubmit}>
        <TextField
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="name"
          error= {formik.touched.name && formik.errors.name ? true : false}
          id="standard-error-helper-text1"
          InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                      <AccountCircleIcon />
                  </InputAdornment>
              ),
          }}
          label="Name"
          helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
          variant="standard"
          type="text"
        />
        <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            error= {formik.touched.password && formik.errors.password ? true : false}
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
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
            type={showpwd ? "text" : "password"}
            variant="standard"
        />
        <CheckBoxLabelWrapper>
          <input type="checkbox" id="persist" onChange={handlePersistToggle} checked={persist} />
          <label htmlFor="persist">Persistent Login || Remember me</label>
        </CheckBoxLabelWrapper>
        <Button type="submit" >Login</Button>
      </MyFormWrapper>
      </Paper>
    </div>
  )
}

export default Login