import axios from "axios"

const baseURL = "http://localhost:5000/"

export const axiosClient = axios.create({
    baseURL: baseURL
})



// Axios Client to be used to make authenticated n/w request.
export const axiosPrivateClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

