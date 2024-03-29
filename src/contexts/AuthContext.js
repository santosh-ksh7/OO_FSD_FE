import { createContext, useState } from 'react'


export const userContext = createContext();

function AuthContext({children}) {

    // TODO: See if you need to provide an empty object upon initialization of useState hook
    const[userState, setUserState] = useState({});

  return (
    // TODO: Pass the memoized value to avoid re-rendering of the childrens evrytime this wrapping parent changes
    <userContext.Provider value={{userState, setUserState}}>
        {children}
    </userContext.Provider>
  )
}

export default AuthContext