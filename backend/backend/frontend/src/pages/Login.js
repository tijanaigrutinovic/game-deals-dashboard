import { useState, setError } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  

  const handleLogin = async (event) => {
    event.preventDefault();

    const userData = {
      username: username.trim(),
      password: password.trim(),
    };

    console.log('Logging in with:', userData); 

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("API Response:", JSON.stringify(data));

      if (response.ok) {
        localStorage.setItem("token", data.access);
        alert("Login successful!");
        navigate("/authenticated-homepage");
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="main-container">
    <h1 className='game-deal-heading p-2'>Game Deals</h1>
      <div className="content-container d-flex flex-column align-items-center">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="d-flex flex-column">
          <label for="username">Username</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
          <label for="password">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <p>
            Don't have an account? 
            <Link to="/register" className="login-register-link"> Register </Link>
            here
          </p>
          <button type="submit" className="submit-button">Login</button>
          {error && <div className="error">{error}</div>}  
        </form>
      </div>
    </div>
  );
};

export default Login;
