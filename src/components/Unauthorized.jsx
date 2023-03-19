import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Unauthorized() {

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/"

  return (
    <div>
        <h1>You are unauthorized to view this data.</h1>
    </div>
  )
}

export default Unauthorized