import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axiosClient";
import NotesTable from "../../components/NotesTable";


const NotesList = () => {

  const URL = "notes";

  const[allnotes, setAllNotes] = useState([]);
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);

  const getAllNotes = async (signal) => {
    try{
      const response = await axiosClient.get(URL, 
        {
        signal: signal
        }
      );
      console.log("🚀 ~ file: NotesList.jsx:16 ~ getAllNotes ~ response:", response);      
      if(response.status === 200){
        setLoading(false);
        setAllNotes(response.data.data);
      }else if(response.status === 204){
        setLoading(false);
        setMessage("No TechNotes present");
      }
    }catch(error){
      if(error.name === "CanceledError"){
        // Do nothing. React 18 behaviour useffect running twice.
        return "Request aborted, since the component mounts -> unmounts -> remounts. So by setting the error you do not want your logic to fail."
        // We need to return something to exit out of this function
      }else{
        // ! 400 & 500 series error are thrown by axios auto.ly. Hnece you are gettingthe error in error.message property.
        // ! Axios ignores the error message coming from backend if the error range are in 400 || 500 series
        // ! However, if you want to see what error message your backend is sending use the error.repsonse.data.message & error.status property respectively
        console.log("🚀 ~ file: NotesList.jsx:18 ~ getAllNotes ~ error:", error);
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

    getAllNotes(signal);

    return () => controller.abort()
  }, [])

  return (
    <div>
      <h1>Place to view all notes for now!!!</h1>
      {loading && <p>Loading.......</p>}
      {error && <p>{`Error in fulfilling the request:- ${error}`}</p>}
      {!loading && !error && message && <p>{message}</p>}
      {!loading && !error && !message && allnotes?.length && 
        <>
          <table>
            <thead>
              <tr>
                <th>Ticket No.</th>
                <th>Title</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {allnotes.map((ele, index) => <NotesTable data={ele} key={index} />)}
            </tbody>
          </table>
        </>
      }
    </div>
  )
}

export default NotesList