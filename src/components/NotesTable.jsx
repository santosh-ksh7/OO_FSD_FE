

function NotesTable({data}) {
    return (
      <tr>
          <td>{data.ticketNo}</td>
          <td>{data.title}</td>
          <td>{data.status ? "Completed" : "Pending"}</td>
          <td>{data.assignedTo}</td>
          <td>{data.createdAt}</td>
          <td>{data.updatedAt}</td>
      </tr>
    )
  }

  
  export default NotesTable