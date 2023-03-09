import {Link} from 'react-router-dom'

function PublicHome() {
  return (
    <div>
        <h1>Welcome to our electronics service shop</h1>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default PublicHome