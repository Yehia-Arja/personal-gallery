import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";


const useAuthLogic = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 

    const handleSignup = async (username,email, password) => {
        
        if (!username || !email || !password) {
        setMessage("Please fill out all the fields");
        setMessageType("error");
        return;
        }
        try {
            const response = await request({
                method: requestMethods.POST,                
                route: "signin",
                body: {username, email, password }
                
        })

        if (response.success === true) {
            setMessage("Sign up successfully");
            setMessageType("success");
            localStorage.setItem('authToken',response.message)
            navigate("/home");
        } else {
            setMessage(response.message);
            setMessageType("error");
        }
        } catch (error) {
        setMessage(error.message);
        setMessageType("error");
        }
    };

    return { form, setForm, handleSignup, message, messageType }

}
export default useAuthLogic;