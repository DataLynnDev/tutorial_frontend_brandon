import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OptionLog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect user after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        { username, password },
        { withCredentials: true } // Ensures cookies are included for authentication
      );

      // Check if token exists in the response structure
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        console.error("Token not found in response data");
      }

      // Redirect user to dashboard after successful login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default OptionLog;
