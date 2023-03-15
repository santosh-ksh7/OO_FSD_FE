import {Link} from 'react-router-dom'

function PublicHome() {
  return (
    <div>
        <h1>Welcome to our electronics service shop</h1>
        <p>Street Name:- Some Street 237</p>
        <p>Phone:- 50438743-2378687</p>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default PublicHome