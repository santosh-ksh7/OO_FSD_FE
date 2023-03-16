import { useNavigate } from "react-router-dom"


function NotesTable({data}) {

  const navigate = useNavigate();

  return (
    <tr>
        <td>{data.ticketNo}</td>
        <td>{data.title}</td>
        <td>{data.status ? "Completed" : "Pending"}</td>
        <td>{data.assignedTo}</td>
        <td>{data.createdAt}</td>
        <td>{data.updatedAt}</td>
        <td style={{cursor: "pointer"}} onClick={() => navigate(`/dash/notes/${data.ticketNo}`)}>Edit/Delete</td>
    </tr>
  )
}

  
  export default NotesTable