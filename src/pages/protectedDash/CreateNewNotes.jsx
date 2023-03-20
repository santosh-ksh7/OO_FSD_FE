import { useFormik } from 'formik'
import * as yup from "yup"
import { CheckBoxLabelWrapper, MyFormWrapper, MyTitle } from '../../components/MUIreusable'
import { Button, Paper } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../api/axiosClient';
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";



function CreateNewNotes() {

  const URL = "users";
  const createURL = "notes"

  const[allusers, setAllUsers] = useState([]);
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate()

  const getAllUsers = async (signal) => {
    try{
      const response = await axiosPrivate.get(URL, {
        signal: signal
      });
      console.log("🚀 ~ file: NotesList.jsx:16 ~ getAllNotes ~ response:", response);      
      if(response.status === 200){
        setLoading(false);
        setAllUsers(response.data.data);
      }else if(response.status === 204){
        setLoading(false);
        setMessage("No Users present");
      }
    }catch(error){
      if(error.name === "CanceledError"){
        return "Request aborted, since the component mounts -> unmounts -> remounts. So by setting the error you do not want your logic to fail."
      }else{
        console.log("🚀 ~ file: NotesList.jsx:18 ~ getAllNotes ~ error:", error);
        setError(error.response.data.message);
        setLoading(false);
      }
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getAllUsers(signal);

    return () => controller.abort();
  }, [])

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required().min(10),
    userid: yup.string().required("The notes should be assigned to a user")
  })

  const formik = useFormik({
    initialValues: {title: "", description: "", userid: ""},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        try {
          const response = await axiosPrivate.post(createURL, values);
          if(response.status === 201){
            alert(response.data.message)
          }
        } catch(error) {
          console.log(error);
          alert(error.response.data.message);
        }
    }
  })

  return (
    <div>
      {loading && <p>Loading.......</p>}
      {error && <p>{`Error in fulfilling the request:- ${error}`}</p>}
      {!loading && !error && message && <p>{message + ". A note should be assigned to a user. There are currently no users"}</p>}
      {!loading && !error && !message && allusers?.length && 
        <Paper elevation={24} square sx={{width: "360px", padding: "10px"}}>
          <h3>Create New User</h3>
          <MyFormWrapper onSubmit={formik.handleSubmit}>
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
              error= {formik.touched.title && formik.errors.title ? true : false}
              id="standard-error-helper-text1"
              label="Title"
              helperText={formik.touched.title && formik.errors.title ? formik.errors.title : null}
              variant="standard"
              type="text"
            />
            <TextField
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
              error= {formik.touched.description && formik.errors.description ? true : false}
              id="standard-error-helper-text1"
              label="Description"
              helperText={formik.touched.description && formik.errors.description ? formik.errors.description : null}
              variant="standard"
              type="text"
            />
            <CheckBoxLabelWrapper>
              <MyTitle>Assign Notes To:-</MyTitle>
              <select name="userid" id="dropDownSelect" onChange={formik.handleChange} onBlur={formik.handleBlur} >
                <option value="">---select---</option>
                {allusers.map((ele, index) => <option key={index} value={ele.id} disabled={ele.status ? false : true} >{ele.name}</option>)}
              </select>
            </CheckBoxLabelWrapper>
            {formik.touched.userid && formik.errors.userid ? <MyTitle sx={{color: "red"}}>{formik.errors.userid}</MyTitle> : null}
            <Button type="submit">Create Notes</Button>
          </MyFormWrapper>
        </Paper>
      }
    </div>
  )
}

export default CreateNewNotes