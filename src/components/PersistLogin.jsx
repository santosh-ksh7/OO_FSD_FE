import { Outlet, Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import usePersist from "../hooks/usePersist";
import { useAuth } from "../hooks/useAuth";


function PersistLogin() {

    const[persist] = usePersist();
    const{userState, setUserState} = useAuth();
    const useEffectRan = useRef(false);

    const[trueSuccess, setTrueSuccess] = useState(false);

    useEffect(() => {
        if(useEffectRan.current === true || process.env.NODE_ENV !== "development"){

        }

        return () => useEffectRan.current = true
    },[])

  return (
    <div>PersistLogin</div>
  )
}

export default PersistLogin