import useAuthLogic from "./useSignupLogic";
import { Link } from "react-router-dom";
import "./style.css"

const Signup = () => {
  const { form, setForm, handleSignup, message } = useAuthLogic();

  return (
    <>
      <header className="welcome-header">
        <h1>Sign up for free</h1>
        <p>Use email to sign up</p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <div className="welcome-form">
            <label>Username</label>
            <input
              type="username"
              placeholder="John doe"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="*******" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            
            <div>
              <div className={`message-container ${message.color}`}>{message.message}</div>
              <button className="welcome-button" onClick={() => { handleSignup(form.username,form.email,form.password) }}>Sign up</button>
              <p className="redirect-message">Already have an account?  
                <Link to="/" className="redirect-login">
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