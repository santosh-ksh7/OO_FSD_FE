import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const ProtectedHome = () => {

  const{userState, setUserState} = useAuth();
  console.log(userState)

  return (
    <div>
        <h3>Welcome to TechNotes App</h3>
        <p><Link to="/dash/notes">View TechNotes</Link></p>
        <p><Link to="/dash/users">View All Users</Link></p>
        <p><Link to="/dash/notes/new">Create New TechNotes</Link></p>
        <p><Link to="/dash/users/new">Create New User</Link></p>
    </div>
  )
}

export default ProtectedHome