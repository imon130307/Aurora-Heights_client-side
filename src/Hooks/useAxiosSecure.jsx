// !----It is used instead of Axios but will have security------
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { useEffect } from "react";

// ---Intance of axios-----
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    })
// =====Custom Hook=====
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    useEffect(() => {
        axiosSecure.interceptors.response.use((res) => {
            return res
        },async (error) => {
            console.log('Error caught from Axios interceptor====>>>>>', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
            // ------logout------
            logOut()
            // ---navigate to login----..
            navigate('/log-in')
            console.log('Sorry IMON !!')
            }
            return Promise.reject(error)
        }
        )
    }, [logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;