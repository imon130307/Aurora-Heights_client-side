// !----It is used instead of Axios------
import axios from "axios";


// ---Intance of axios-----
const axiosPublic = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
})

// =====Custom Hook=====
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;