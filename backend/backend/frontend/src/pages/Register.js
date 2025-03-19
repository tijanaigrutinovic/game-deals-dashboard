import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState(""); 

  const handleRegister = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords must match.");
      return;
    }

    const userData = {
      username: username.trim(),
      password: password.trim(),
      repeat_password: repeatPassword.trim(), 
    };

    console.log('Registering user with:', userData);

    fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => { throw new Error(data.message || "Something went wrong"); });
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", JSON.stringify(data));
        if (data.message === "User created successfully") {
          alert("User registered successfully!");
          navigate('/authenticated-homepage');
        } else {
          alert(`Error: ${data.username || data.password || 'Something went wrong'}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error registering user");
      });
  };

  return (
    <div className="main-container">
      <h1 className='game-deal-heading p-2'>Game Deals</h1>
      <div className="content-container d-flex flex-column align-items-center">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="d-flex flex-column">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <label htmlFor="repeatPassword">Repeat Password</label> 
          <input type="password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
          
          <p>
            Already have an account?  
            <Link to="/login">
                <a className="login-register-link"> Login </a>
            </Link> 
            here
          </p>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
