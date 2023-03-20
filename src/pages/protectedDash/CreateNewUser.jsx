import { useFormik } from 'formik'
import * as yup from "yup"
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Paper, styled, Typography, Box } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { CheckBoxLabelWrapper, CheckBoxParentWrapper, MyFormWrapper, MyTitle } from '../../components/MUIreusable';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';



function CreateNewUser() {

    const URL = "users"

    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate()

    const[showpwd, setShowpwd] = useState(false)

    const validationSchema = yup.object({
        name: yup.string().required(),
        password: yup.string().required().min(8).matches(/[!@#$^]/, "Password should contain at-least 1 of the following special characters !, @, #, $, ^"),
        re_password: yup.string().required().oneOf([yup.ref("password"), null], "passwords doesn't match"),
        roles: yup.array().of(yup.string()).min(1, "Users should be assigned at least 1 role")
    })

    const formik = useFormik({
        initialValues: {name: "", password: "", re_password: "", roles: ["employee"]},
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let value2send = {
                    ...values,
                    roles: JSON.stringify(values.roles)
                }
                console.log("🚀 ~ file: CreateNewUser.jsx:39 ~ onSubmit: ~ values:", value2send);
                const response = await axiosPrivate.post(URL, value2send);
                if(response.status === 201){
                    alert(response.data.message);
                    navigate("/dash/users");
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    })

    function alterRoles(event){
        if(event.target.checked){
            if(!formik.values.roles.includes(event.target.value)){
                formik.values.roles.push(event.target.value)
            }
        }else{
            if(formik.values.roles.includes(event.target.value)){
                const newArray = formik.values.roles.filter((ele) => ele !== event.target.value);
                formik.values.roles = newArray;
            }
        }
    }


  return (
    <div>
        <Paper elevation={24} square sx={{width: "360px", padding: "10px"}}>
            <h3>Create New User</h3>
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
                <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="re_password"
                    error= {formik.touched.re_password && formik.errors.re_password ? true : false}
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
                    helperText={formik.touched.re_password && formik.errors.re_password ? formik.errors.re_password : null}
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <MyTitle>Assign Roles to user</MyTitle>
                {!formik.values.roles.length ? <MyTitle sx={{color: "red"}}>{formik.errors.roles}</MyTitle> : null}
                <CheckBoxParentWrapper>
                    <CheckBoxLabelWrapper>
                        <Checkbox
                            onChange={(e) => alterRoles(e)}
                            label="Employee"
                            defaultChecked
                            id="employeeCheckBox"
                            value="employee"
                            name="roles"
                        />
                        <label htmlFor="employeeCheckBox">Employee</label>
                    </CheckBoxLabelWrapper>
                    <CheckBoxLabelWrapper>
                        <Checkbox
                            onChange={(e) => alterRoles(e)}
                            label="Manager"
                            id="managerCheckBox"
                            value="manager"
                        />
                        <label htmlFor="managerCheckBox">Manager</label>
                    </CheckBoxLabelWrapper>
                    <CheckBoxLabelWrapper>
                        <Checkbox
                            onChange={(e) => alterRoles(e)}
                            label="Admin"
                            id="adminCheckBox"
                            value="admin"
                        />
                        <label htmlFor="adminCheckBox">Admin</label>
                    </CheckBoxLabelWrapper>
                </CheckBoxParentWrapper>
                <Button type="submit" variant="outlined" >Create User</Button>
            </MyFormWrapper>
        </Paper>
    </div>
  )
}

export default CreateNewUser