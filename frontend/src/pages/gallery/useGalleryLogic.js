import { useState, useEffect } from "react";
import request from "../../utils/remote/axios";
import {requestMethods} from "../../utils/enums/request.methods";

const useGalleryLogic = (search) => {
    const [photos, setPhotos] = useState([]);

    const getPhotos = async (search) => {
        try {
            const response = await request({
                method: requestMethods.POST,
                route: "getPhotos",
                data: { search },
            });

            if (response.success === true) { 
                setPhotos(response.message);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        getPhotos(search);
    }, [search]);

    return photos;
};

export default useGalleryLogic;
