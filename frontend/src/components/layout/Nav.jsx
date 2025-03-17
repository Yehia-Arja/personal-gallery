import { Link } from "react-router-dom";
import myImage from "../assets/logo.png";
import { useState } from "react";

const Nav = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <nav>
            <ul className="nav-elements">
                <li><img className="logo" src={myImage} alt="Logo" /></li>
                <li>
                    <input 
                        type="search" 
                        className="search-bar" 
                        value={query} 
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
