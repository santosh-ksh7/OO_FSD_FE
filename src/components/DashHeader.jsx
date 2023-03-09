import {Link} from 'react-router-dom'

const DashHeader = () => {
  return (
    <div>
        <Link to="/dash">
            <h1>TechNotes</h1>
        </Link>
    </div>
  )
}

export default DashHeader