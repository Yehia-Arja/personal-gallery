
const Photo = ({photo}) => {
    const { url, description } = photo;
    return (    
        <div>
            <img src={url}></img>
            <p>{description}</p>
        </div>
      
    )
}
export default Photo;