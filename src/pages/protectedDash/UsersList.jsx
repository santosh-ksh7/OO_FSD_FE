import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axiosClient";
import UsersTable from "../../components/UsersTable";

const UsersList = () => {

  const URL = "users";

  const[allusers, setAllUsers] = useState([]);
  const[message, setMessage] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);


  const getAllUsers = async (signal) => {
    try{
      const response = await axiosClient.get(URL, {
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

  return (
    <div>
      <h1>Place to view all users for now!!!</h1>
      {loading && <p>Loading.......</p>}
      {error && <p>{`Error in fulfilling the request:- ${error}`}</p>}
      {!loading && !error && message && <p>{message}</p>}
      {!loading && !error && !message && allusers?.length && 
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Roles</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allusers.map((ele, index) => <UsersTable data={ele} key={index} />)}
            </tbody>
          </table>
        </>
      }
    </div>
  )
}

export default UsersList