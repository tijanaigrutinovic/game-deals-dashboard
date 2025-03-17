import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleRegister = (event) => {
  event.preventDefault();

  const userData = {
    username: username.trim(),
    password: password.trim(),
  };

  console.log('Registering user with:', userData);

  fetch("http://localhost:8000/api/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log("API Response:", JSON.stringify(data)); // Logovanje celog objekta
        if (data.message === "User created successfully") {
          alert("User registered successfully!");
          navigate('/authenticated-homepage');
        } else {
          console.log("Error in response:", data);
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
         <p>
            Already have an account?  
            <Link to="/login">
                <a> Login </a>
            </Link> 
            here
            </p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
