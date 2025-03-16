import axios from "axios";

axios.defaults.baseURL = "http://localhost/personal-gallery/gallery-server/"; 
axios.defaults.headers = {
  "Content-Type": "application/json",
};

const request = async ({ method, route, body, headers }) => {
  try {
    const response = await axios.request({
      method,
      headers,
      url: route,
      data: body,
    });

    return response.data;

  } catch (error) {

    return {
      error: true,
      message: error.message,
    };
  }
};
export default request