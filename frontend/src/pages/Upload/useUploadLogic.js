import request from "../../utils/remote/axios";
import { requestMethods } from "../../utils/enums/request.methods";
import { useState } from "react";


const useUploadLogic = () => {
    const [form, setForm] = useState({
        tag: "",
        description: "",
        file: ""
    });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleUpload = async (tag, description, file) => {
        
        if (!tag || !description || !file) {
            setMessage("Please fill out all the fields");
            setMessageType("error");
            return;
        }
        const formData = new FormData();
        formData.append('tag',tag);
        formData.append('description',description);
        formData.append('file',file)

        try {
            const response = await request({
                method: requestMethods.POST,
                route: "upload",
                data: formData
            })
            if (response.success === true) {
                setMessage(response.message);
                setMessageType('success');
                return;
            }
            setMessage(response.message);
            setMessageType('error');

            }catch (error) {
                console.error("Error", error);
            }
       
    }
    return {form, setForm,handleUpload, message,messageType};
}


export default useUploadLogic;