import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    setError(null);

    const payload = { email, password };

    fetch("https://full-stack-app-deployment.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          navigate("/dashboard");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <>
      <h2>Please Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Enter your Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Your Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </>
  );
};

export default Login;
