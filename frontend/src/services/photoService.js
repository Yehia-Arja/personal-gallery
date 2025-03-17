import axios from "axios"
import BaseUrl from "../api/axiosInstance"


const getPhotos = async (search="") => {
    try {
        const response = await axios.get(`${BaseUrl.baseUrl}api/photos${search ? `?search=${search}` : ""}`);
        console.log(response.data);
        if (response.data.success) {
            return response.data.message
        }
        return false

    } catch (error) {
        console.error("Error",error)
    }
}

export default {
    getPhotos
};