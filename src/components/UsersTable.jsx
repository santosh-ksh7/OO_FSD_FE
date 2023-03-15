import { useNavigate } from "react-router-dom"


function UsersTable({data}) {

  const navigate = useNavigate();

  return (
    <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.status ? "Active" : "Not-Active"}</td>
        <td>{data.roles.toString()}</td>
        <td style={{cursor: "pointer"}} onClick={() => navigate(`/dash/users/${data.id}`)}>Edit/Delete</td>
    </tr>
  )
}

export default UsersTable