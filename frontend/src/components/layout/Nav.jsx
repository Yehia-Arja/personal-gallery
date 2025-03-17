import { Link } from "react-router-dom";
import myImage from "../../assets/images/logo.png"

const Nav = ({ setSearch }) => {

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <nav>
            <ul className="nav-elements">
                <li><img src={myImage} className="logo" alt="Logo" /></li>
                <li>
                    <input 
                        type="search" 
                        className="search-bar"  
                        placeholder="Search..." 
                        onChange={handleChange} 
                    />
                </li>
                <li><Link className="link active" to="/home">Home</Link></li>
                <li><Link className="link" to="/upload">Upload</Link></li>
                <li><button className="logout">Log out</button></li>
            </ul>
        </nav>
    );
};

export default Nav;
