import { Link } from "react-router-dom";
import myImage from "../assets/logo.png";

const Nav = () => {
    return (
        <>
            <div>
                <ul className="nav-elements">
                    <li><img className = "logo" src={myImage}></img></li>
                    <li><input type="search" className = "search-bar" placeholder="Search..."></input></li>
                    <li><Link className="link active" to="/home">Home</Link></li>
                    <li><Link className="link" to="/upload">Upload</Link></li>
                    <li><button className="logout">Log out</button></li>
                </ul>
            </div>
        </>
    )
}
export default Nav;