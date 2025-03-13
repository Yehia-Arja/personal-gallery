import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Link } from "react-router-dom";
import "../../assets/styles/login-register.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      setMessage("Please fill out all the fields");
      setMessageType("error");
      return;
    }
    try {
      const message = await authService.signup(email, password, name);
      if (message === true) {
        setMessage("Signed up successfully!");
        setMessageType("success");
        navigate("/login"); 
      }
      setMessage(message);
      setMessageType("error");

    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <>
      <header className="welcome-header">
        <h1>Create an Account</h1>
        <p>Fill in the details below to sign up</p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <div className="welcome-form">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <label>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <div className={`message-container ${messageType}`}>{message}</div>
              <button className="welcome-button" onClick={handleSubmit}>
                SIGN UP
              </button>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="redirect-login">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Signup;
