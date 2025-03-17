import React from 'react';
import usePhotoLogic from './useUpdateLogic'; 

const EditPhoto = ({ photoId }) => {
  const { photoData, handleInputChange, handleSubmit, message } = usePhotoLogic(photoId);

  return (
    <div>
      <h1>Edit Photo Information</h1>
      {message.text && (
        <div style={{ color: message.color }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tag">Tag:</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={photoData.tag}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={photoData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPhoto;
