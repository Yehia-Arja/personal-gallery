import { useState } from "react";
import axios from "axios"; 
import BaseUrl from "../../Config";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/login-register.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");


  const handleSubmit = async () => {
    if (!email || !password) {
      setMessage("Please fill out all the fields");
      setMessageType('error');
      return;
    }
    try {
      const response = await axios.post(`${BaseUrl.baseUrl}login`, {
        email,
        password,
      });

      if (response.data.success) {
          console.log("Login Success:", response.data);
          setMessage('Log in successfully')
          setMessageType('success')
          navigate("./home")
        }
        
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <>

      <header class="welcome-header">
        <h1>Welcome back</h1>
        <p>use email or phone number to login</p>
      </header>
      <main class="welcome-main">
        <section class="welcome-section">
          <div class="welcome-form">
                  
            <label>Email</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
              <div className={`message-container ${messageType}`}>{ message }</div>
              <button className="welcome-button" onClick={handleSubmit}>L O G I N</button>
              <p>Don't have an account? <a class="redirect-signup" href="../wallet-client-frontend/html/signup.html">Sign up here</a></p>
            </div>
          </div>
        </section>
          
      </main>
        
    </>
  );
}

export default Login;
