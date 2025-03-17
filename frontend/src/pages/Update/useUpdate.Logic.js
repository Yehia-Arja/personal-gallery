
import { useState, useEffect } from "react";
import { requestMethods } from "../../utils/enums/request.methods";
import request from "../../utils/remote/axios";

const useUpdateLogic = (photoId) => {
  const [photoData, setPhotoData] = useState({ tag: "", description: "" });
  const [message, setMessage] = useState({ text: "", color: "" });

  useEffect(() => {
    const fetchPhotoData = async () => {
      try {
        const response = await request({
          method: requestMethods.GET,
          route: `photos/${photoId}`,
        });
        setPhotoData({
          tag: response.data.tag,
          description: response.data.description,
        });
      } catch (error) {
        setMessage({ text: "Error fetching photo data"+ error, color: "red" });
      }
    };

    fetchPhotoData();
  }, [photoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request({
        method: requestMethods.PUT,
        route: `photos/${photoId}`,
        body: photoData,
      });

      if (response.success) {
        setMessage({ text: "Photo info updated successfully!", color: "green" });
      } else {
        setMessage({ text: response.message, color: "red" });
      }
    } catch (error) {
      setMessage({ text: "Error updating photo data" + error, color: "red" });
    }
  };

  return { photoData, setPhotoData, handleInputChange, handleSubmit, message };
};

export default useUpdateLogic;
