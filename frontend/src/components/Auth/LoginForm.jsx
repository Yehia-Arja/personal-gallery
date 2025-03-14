import { useState } from "react"; // Import the useState hook for managing state
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation
import authService from "../../services/authService"; // Import the authentication service
import "../../assets/styles/login-register.css"; // Import the CSS styles for login and register pages
import { Link } from "react-router-dom"; // Import the Link component for navigation

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function for redirection
  const [email, setEmail] = useState(""); // State to store the email input
  const [password, setPassword] = useState(""); // State to store the password input
  const [message, setMessage] = useState(""); // State to store feedback messages
  const [messageType, setMessageType] = useState(""); // State to define message type (success/error)

  const handleSubmit = async () => {
    if (!email || !password) {
      setMessage("Please fill out all the fields"); // Display error message if fields are empty
      setMessageType("error");
      return;
    }
    try {
      const response = await authService.login(email, password);

      if (response === true) {
        setMessage("Log in successfully"); // Display success message
        setMessageType("success");
        navigate("/home"); // Redirect to home page
      } else {
        setMessage(response); // Display error message returned from the authService
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
        <h1>Welcome back</h1>
        <p>Use email or phone number to log in</p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <div className="welcome-form">
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
