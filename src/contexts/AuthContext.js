import { createContext, useState } from 'react'


export const userContext = createContext();

function AuthContext({children}) {

    const[userState, setUserState] = useState({
        loginStatus: false, 
        accessToken: "", 
        roles: []
    });

  return (
    // TODO: Pass the memoized value to avoid re-rendering of the childrens evrytime this wrapping parent changes
    <userContext.Provider value={{userState, setUserState}}>
        {children}
    </userContext.Provider>
  )
}

export default AuthContext