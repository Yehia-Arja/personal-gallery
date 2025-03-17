import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";
import { useState } from "react";


const useUploadLogic = () => {
    const [form, setForm] = useState({
        tag: "",
        description: "",
        file: ""
    });
    const [message, setMessage] = useState({message:"",color:""});
   

    const handleUpload = async (tag, description, file) => {
        
        if (!tag || !description || !file) {
            setMessage({message:'Please fill out all the fields',color:'red'});
            return;
        }
        const formData = new FormData();
        formData.append('tag',tag);
        formData.append('description',description);
        formData.append('file', file)
        formData.append('authToken',localStorage.getItem('authToken'))

        
        try {
            const response = await request({
                method: requestMethods.POST,
                route: "upload",
                data: formData,
            })
            if (response.success === true) {
                setMessage({message: response.message, color: 'green'});
                return;
            }
            console.log(response);
            setMessage({message: response.message,color:'red'});

            }catch (error) {
                console.error("Error", error);
            }
       
    }
    return {form, setForm,handleUpload, message};
}


export default useUploadLogic;