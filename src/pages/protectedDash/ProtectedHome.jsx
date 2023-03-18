import {Link} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useUserInfo from '../../hooks/useUserInfo';


const ProtectedHome = () => {

  const{name, isManager, isAdmin} = useUserInfo();


  return (
    <div>
      <h1>Welcome {name}</h1>
        <h3>Welcome to TechNotes App</h3>
        <p><Link to="/dash/notes">View TechNotes</Link></p>
        <p><Link to="/dash/notes/new">Create New TechNotes</Link></p>
        {(isManager || isAdmin) && <p><Link to="/dash/users">View All Users</Link></p>}
        {(isManager || isAdmin) && <p><Link to="/dash/users/new">Create New User</Link></p>}
    </div>
  )
}

export default ProtectedHome