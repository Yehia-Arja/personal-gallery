import useGalleryLogic from "./useGalleryLogic";

const Gallery = ({ search }) => {
    const photos = useGalleryLogic(search);

    return (
        <div className="image-container">
            {photos.map((photo) => (
                <div key={photo.id}>
                    <img src={photo.url} alt={photo.description} />
                    <p className="image-description">{photo.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
