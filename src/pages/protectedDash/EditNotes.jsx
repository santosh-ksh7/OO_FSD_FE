import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../api/axiosClient';
import TextField from '@mui/material/TextField';
import { CheckBoxLabelWrapper, CheckBoxParentWrapper, MyFormWrapper, MyTitle } from '../../components/MUIreusable';
import { Button, Paper, styled, Typography, Box } from "@mui/material";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import useUserInfo from "../../hooks/useUserInfo"


function EditNotes() {

  const {id} = useParams();

  const URL = `notes/specific-note/${id}`

  const[note, setNote] = useState({})
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate()


  const getASpecificNote = async (signal) => {
    try {
      const response = await axiosPrivate.get(URL, {
        signal: signal
      });
      console.log("🚀 ~ file: EditNotes.jsx:21 ~ getASpecificNote ~ response:", response)
      if(response.status === 200){
        setLoading(false);
        setNote(response.data.data);
      }else if(response.status === 204){
        setLoading(false);
        setMessage("No Note Found with the identifier.");
      }
    } catch (error) {
      if(error.name === "CanceledError"){
        return "Request aborted, since the component mounts -> unmounts -> remounts. So by setting the error you do not want your logic to fail."
      }else{
        console.log("🚀 ~ file: NotesList.jsx:18 ~ getAllNotes ~ error:", error);
        setError(error.message);
        setLoading(false);
      }
    }finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getASpecificNote(signal);

    return () => controller.abort();
  },[])


  return (
    <div>
      {loading && <p>Loading.......</p>}
      {error && <p>{`Error in fulfilling the request:- ${error}`}</p>}
      {!loading && !error && message && <p>{message}</p>}
      {!loading && !error && !message && note?.ticketNo && <EditNotesFrom data={note} />}
    </div>
  )
}

export default EditNotes




function EditNotesFrom({data}){

  const URL = "notes"

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate()

  const ticketNo = data.ticketNo;

  const{isManager, isAdmin, name} = useUserInfo()

  const[title, setTitle] = useState(data.title)
  const[description, setDescription] = useState(data.description)
  const[status, setStatus] = useState(data.status)
  const[validationError, setValidationError] = useState("")

  // * Run validation everytime title is changed
  useEffect(() => {
    if(!title){
      setValidationError("Name is a required field.")
    }else{
      setValidationError("")
    }
  }, [title])

  // * Run validation everytime description is changed
  useEffect(() => {
    if(!description){
      setValidationError("Description is a required field.")
    }else{
      setValidationError("")
    }
  }, [description])

  // * A function to handle status change for notes
  function alterStatus(event){
    setStatus(event.target.value);
  }


  async function handleSubmit(event){
    try {
      event.preventDefault();
      if(!validationError){
        let value = {title, status, description, ticketNo, assignedTo: data.assignedTo};
        console.log("🚀 ~ file: EditNotes.jsx:117 ~ handleSubmit ~ value:", value);
        const response = await axiosPrivate.patch(URL, value);
        if(response.status === 201){
          alert(response.data.message);
          navigate("/dash/notes")
        }
      }else{
        alert("Validation error.")
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

  async function handleDelete(){

    const delURL = `notes/del-note/${ticketNo}`

    try{
      if(isAdmin || isManager){
        console.log(ticketNo);
        const response = await axiosPrivate.delete(delURL);
        if(response.status === 200){
          alert(response.data.message);
          navigate("/dash/notes");
        }
      }else{
        alert("You do not have necessary permissions to delete the notes.")
      }
    }catch(error){
      console.log(error);
      alert(error.response.data.message);
    }
  }
  

  return(
    <div>
      {name === data.assignedTo || isManager || isAdmin ?
        <Paper elevation={24} square sx={{width: "360px", padding: "10px"}}>
        <h3>Edit your Notes</h3>
        {validationError ? <MyTitle sx={{color: "red"}}>{validationError}</MyTitle> : null}
        <MyFormWrapper onSubmit={(e) => handleSubmit(e)} >
          {/* Updating the title */}
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="standard-error-helper-text1"
            label="Title"
            variant="standard"
            type="text"
          />
          {/* Updating the description */}
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="Description"
            id="standard-error-helper-text1"
            label="Description"
            variant="standard"
            type="text"
          />
          {/* Updating the status of notes */}
          <h3>Changes Notes status</h3>
            <CheckBoxParentWrapper>
              <CheckBoxLabelWrapper>
                <input
                  onChange={(e) => alterStatus(e)}
                  type="radio"
                  name="status"
                  id="alterStatus1"
                  value={false}
                  defaultChecked={status ? false : true}
                />
                <label htmlFor="alterStatus1">Pending</label>
              </CheckBoxLabelWrapper>
              <CheckBoxLabelWrapper>
                <input
                  onChange={(e) => alterStatus(e)}
                  type="radio"
                  name="status"
                  id="alterStatus2"
                  value={true}
                  defaultChecked={status ? true : false}
                />
                <label htmlFor="alterStatus2">Complete</label>
              </CheckBoxLabelWrapper>
            </CheckBoxParentWrapper>
            <h3>Assigned to:- {data.assignedTo}</h3>
            <CheckBoxParentWrapper>
              <Button variant="outlined" type="submit">Update Notes</Button>
              <Button onClick={handleDelete} disabled={!isManager || !isAdmin} variant="outlined" sx={{color: "red"}}>Delete</Button>
            </CheckBoxParentWrapper>
        </MyFormWrapper>
        </Paper>
        :
        <h1>You are not Authorized to edit notes that belongs to other employees.</h1>
      }
    </div>
  )
}