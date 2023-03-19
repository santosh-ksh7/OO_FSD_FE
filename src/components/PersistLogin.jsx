import { Outlet, Link } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import usePersist from "../hooks/usePersist";
import { useAuth } from "../hooks/useAuth";
import { useRefresh } from "../hooks/useRefresh";


function PersistLogin() {

    const[persist] = usePersist();
    const{userState} = useAuth();
    const useEffectRan = useRef(false);

    const[success, setSuccess] = useState(false);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    const getNewAccessToken = useRefresh();

    const accessToken = userState.accessToken;
    console.log("🚀 ~ file: PersistLogin.jsx:21 ~ PersistLogin ~ accessToken:", accessToken)
    

    useEffect(() => {
        if(useEffectRan.current === true || process.env.NODE_ENV !== "development"){
          const verifyRefreshToken = async () => {
            try {
              const response = await getNewAccessToken();
              console.log("🚀 ~ file: PersistLogin.jsx:27 ~ verifyRefreshToken ~ response:", response);
              setSuccess(true);
              setLoading(false);
            } catch (error) {
              console.log("🚀 ~ file: PersistLogin.jsx:25 ~ verifyRefreshToken ~ error:", error)
              setError(error.message);
              setLoading(false);
            }finally{
              setLoading(false);
            }
          }

          if (!accessToken && persist){
            verifyRefreshToken();
          }else{
            setLoading(false);
          }
        }

        return () => {
          useEffectRan.current = true;
        }
    },[])

    let content;
    if(!persist){
      content = <Outlet />
    }else if(persist && !loading){
      content = <Outlet />
    }else if(loading){
      content = "Loading......"
    }else if(error){
      content = "Error. Need to log-in again"
    }else if(success){
      content = <Outlet />
    }

  return (
    <div>
      {content}
    </div>
  )
}

export default PersistLogin