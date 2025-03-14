import { useState } from "react"; // Import the useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection
import authService from "../services/authService"; // Import the authentication service
import { Link } from "react-router-dom"; // Import the Link component for navigation
import "../../assets/styles/login-register.css"; // Import styles for login and signup pages

const Signup = () => {
  const navigate = useNavigate(); // Initialize the navigate function for redirection
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const [name, setName] = useState(""); // State to store name input
  const [message, setMessage] = useState(""); // State to store feedback messages
  const [messageType, setMessageType] = useState(""); // State to define message type (success/error)

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      setMessage("Please fill out all the fields"); // Display error message if fields are empty
      setMessageType("error");
      return;
    }
    try {
      const response = await authService.signup(email, password, name);

      if (response === true) {
        setMessage("Signed up successfully!"); // Display success message
        setMessageType("success");
        navigate("/login"); // Redirect to login page
      } else {
        setMessage(response); // Display error message from the authService
        setMessageType("error");
      }
    } catch (error) {
      setMessage(error.message); // Display error message if an exception occurs
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
