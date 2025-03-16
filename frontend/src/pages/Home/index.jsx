import { useState } from "react";
import Nav from "../components/Nav";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import request from "../utils/remote/axios"; 
import { requestMethods } from "../utils/enums/request.methods";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async (query) => {
    try {
      const response = await request({
        method: requestMethods.GET,
        route: `/photos?q=${query}`,
      });
      setPhotos(response.message);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div>
      <Nav onSearch={fetchPhotos} />
      <Gallery photos={photos} /> 
      <Footer />
    </div>
  );
};

export default Home;
