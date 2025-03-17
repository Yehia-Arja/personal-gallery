import { useState } from "react";
import Nav from "../../components/layout/Nav";
import Gallery from "../Gallery/index";
import Hero from "../../components/layout/Hero"
import "./style.css";

const Home = () => {
    const [search, setSearch] = useState(""); 

    return (
        <div>
            <Nav setSearch={setSearch} />
            <Hero></Hero>
            <Gallery search={search} />
        </div>
    );
};

export default Home;
