import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import photoService from "../../services/photoService";
import tagsService from "../../services/tagsService";
import "../../assets/styles/edit-photo.css";

const EditPhoto = () => {
  const { photoId } = useParams();
  const navigate = useNavigate();

    
  const [description, setDescription] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const photos = await photoService.getPhotos();
        const photoData = photos.find((p) => p.id === Number(photoId));

        if (photoData) {
          setDescription(photoData.description);
          setTag(photoData.tag);
        } else {
          setMessage("Photo not found");
          setMessageType("error");
        }

        const tagsData = await tagsService.getTags();
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data");
        setMessageType("error");
      }
    };

    fetchData();
  }, [photoId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("tag", tag);
    if (newPhoto) formData.append("photo", newPhoto);

    try {
      await photoService.updatePhoto(photoId, formData);
      setMessage("Photo updated successfully");
      setMessageType("success");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error("Error updating photo:", error);
      setMessage("Failed to update photo");
      setMessageType("error");
    }
  };

  return (
    <>
      <header className="edit-header">
        <h1>Edit Photo</h1>
        <p>Modify your photo details</p>
      </header>
      <main className="edit-main">
        <section className="edit-section">
          <form className="edit-form" onSubmit={handleSubmit}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter new description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Tag</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="">Select a tag</option>
              {tags.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>

            <label>Upload New Photo (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setNewPhoto(e.target.files[0])} />

            <div className={`message-container ${messageType}`}>{message}</div>
            <button className="edit-button" type="submit">Update Photo</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default EditPhoto;
