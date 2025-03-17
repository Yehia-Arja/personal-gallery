import { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";


const useAuthLogic = () => {
    const [form,setForm] = useState({
        email: "",
        password: ""
    })
    
    const navigate = useNavigate();
    const [message, setMessage] = useState({message:"",color:""});

    
    const handleLogin = async (email, password) => {

        if (!email || !password) {
            setMessage({ message:"Please fill out all the fields",color:"green"});
        return;
        }
        try {
            const response = await request({
                method: requestMethods.POST,                
                route: "login",
                body: { email, password },
                
        })

        if (response.success === true) {
            setMessage({ message:"Log in successfully",color:"green"});
            localStorage.setItem('authToken',response.message)
            navigate("/home");

        } else {
            setMessage({message:response.message,color:"red"});
        }
        } catch (error) {
            setMessage({ message:error.message,color:"red" });
        }
    };

    return { form, setForm, handleLogin, message, }

}
export default useAuthLogic;