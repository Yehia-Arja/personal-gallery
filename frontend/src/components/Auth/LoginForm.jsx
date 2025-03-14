import { useState } from "react"; //import the useState hook
import { useNavigate } from "react-router-dom"; //import the useNavigate hook
import authService from "../../services/authService";
import "../../assets/styles/login-register.css";
import { Link } from "react";

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
      const message = await authService.login(email, password);

      if (message === true) {
        setMessage("Log in successfully");
        setMessageType("success");
        navigate("/home");
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
        <h1>Welcome back</h1>
        <p>use email or phone number to login</p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <div className="welcome-form">
            <label>Email</label>
            <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <div>
              <div className={`message-container ${messageType}`}>{message}</div>
              <button className="welcome-button" onClick={handleSubmit}>L O G I N</button>
              <p>Don't have an account?
                <Link to="/signup" className="redirect-signup">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
