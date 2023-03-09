import {useLocation, useNavigate} from 'react-router-dom'

const DashFooter = () => {

    const {pathname} = useLocation();
    const navigate = useNavigate();

  return (
    <div>
        {pathname !== "/dash" 
            ?
            <button onClick={() => navigate("/dash")}>Home</button>
            :
            null 
        }
        <p>Current User:- </p>
        <p>Status:- </p>
    </div>
  )
}

export default DashFooter