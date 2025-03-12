import { useState } from "react";
import axios from "axios"; 
import BaseUrl from "../../Config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    navigate("/home");
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

      try {
        const response = await axios.post(`${BaseUrl.baseUrl}login`, {
          email,
          password,
        });
        if (response.data.success) {
          console.log("Login Success:", response.data);
          
          
        }
        
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message); // Handle errors
      }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button> 
    </div>
  );
}

export default Login;
