import { useContext } from "react"
import { userContext } from "../contexts/AuthContext"


export const useAuth = () => {
    return useContext(userContext)
}