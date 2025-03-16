const Tag = ({ tag }) => {
    const {name} = {tag}
    return (
        <div class="tags-container">
            <button>{name}</button>
        </div>
    )
}

export default Tag;