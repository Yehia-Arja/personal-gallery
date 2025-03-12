import { useState, useEffect } from 'react';
import BaseUrl from '../Config';
import axios from "axios";
import Tag from "./Tag";
import Photo from "./Photo";


const Hero = () => {
    const [tags, setTags] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${BaseUrl.baseUrl}getTags`);
                console.log(response.data);
                setTags(response.data.message);
            } catch (error) {
                console.error('Error fetching tags: ' + error);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${BaseUrl.baseUrl}getPhotos`);
                if (response.data.success) {
                    console.log(response.data.message);
                    setPhotos(response.data.message);
                }
                
            } catch (error) {
                console.error("Error fetching photos: " + error);
            }
        };
        fetchPhotos();
    }, []);

    return (
        <div>
            <div className="tag-container">
                {tags.map(tag => (
                    <Tag tag = {tag} />
                ))}
            </div>

            <div className="image-container">
                {photos.map(photo => (
                    <Photo photo = {photo} />
                ))}
            </div>
        </div>
    );
};

export default Hero;
