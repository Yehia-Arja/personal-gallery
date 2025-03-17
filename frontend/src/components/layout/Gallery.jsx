const Gallery = ({ photos }) => {
  return (
    <div className="gallery">
      {photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt={photo.name} />
            <p>{photo.name}</p>
          </div>
        ))
      ) : (
        <p>No photos found.</p>
      )}
    </div>
  );
};

export default Gallery;
