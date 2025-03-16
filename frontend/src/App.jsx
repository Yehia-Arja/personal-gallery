import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/index"
import Signup from "./pages/Auth/signup"
import Home from "./pages/Home/index"
import "./App.css";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element = {<Home />} />
            </Routes>
        </BrowserRouter>    
    
    )
}
export default App 