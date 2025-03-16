import useAuthLogic from "./useLoginLogic";
import { Link } from "react-router-dom";
import "./style.css"

const Login = () => {
  const { form, setForm, handleLogin, message, messageType } = useAuthLogic();

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
              <div className={`message-container ${messageType}`}>{message}</div>
              <button className="welcome-button" onClick={() => { handleLogin(form.email,form.password) }}>L O G I N</button>
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