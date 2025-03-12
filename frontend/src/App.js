import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Auth/Login"
import Home from "./pages/Home"
import "./App.css";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>    
    
    )
}
export default App 