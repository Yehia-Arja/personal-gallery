import axios from "axios";
import BaseUrl from "../api/axiosInstance"; 


const login = async (email, password) => {
  try {
      
      const response = await axios.post(`${BaseUrl.baseUrl}login`, { email, password });
      if (response.data.success) {
          localStorage.setItem("id", response.data.message)
          return true;
      }
      return false

    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    };
}
    
const register = async (email, password, name) => {
  try {

    const response = await axios.post(`${BaseUrl.baseUrl}register`, { email, password, name });
    if (response.data.success) {
      localStorage.setItem("id", response.data.message)
      return true;
    }
    return response.data.message

  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("id");
  console.log("Logged out successfully.");
};

export default {
  login,
  register,
  logout,
};
