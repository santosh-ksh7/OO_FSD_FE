import {Link} from 'react-router-dom'

const ProtectedHome = () => {
  return (
    <div>
        <h3>Welcome to TechNotes App</h3>
        <p>{new Date().toISOString().slice(0,11)}</p>
        <p><Link to="/dash/notes">View TechNotes</Link></p>
        <p><Link to="/dash/users">View All Users</Link></p>
    </div>
  )
}

export default ProtectedHome