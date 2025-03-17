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
    const [message, setMessage] = useState({
        message: "",
        color: ""
    });

    const handleSignup = async (username,email, password) => {
        
        if (!username || !email || !password) {
        setMessage({message:"Please fill out all the fields",color:'red'});
        return;
        }
        try {
            const response = await request({
                method: requestMethods.POST,                
                route: "signup",
                body: {username, email, password }
                
        })

        if (response.success === true) {
            setMessage({message:"Sign up successfully",color:'green'});
            localStorage.setItem('authToken',response.message)
            navigate("/home");
        } else {
            console.log(response)
            setMessage({message:response.message,color:'red'});
        }
        } catch (error) {
        setMessage({message:error.message,color:'red'});
        }
    };

    return { form, setForm, handleSignup, message }

}
export default useAuthLogic;