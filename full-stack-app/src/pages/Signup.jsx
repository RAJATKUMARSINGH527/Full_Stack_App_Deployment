import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // For showing loading state

  const handleRegister = () => {
    const payload = {
      name,
      email,
      password,
    };

    setLoading(true);  // Set loading to true when the request starts

    fetch("https://full-stack-app-deployment.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);  // Set loading to false when request completes
        alert(data.message);  // Handle response message
      })
      .catch((err) => {
        setLoading(false);  // Set loading to false on error
        console.error(err);
        alert("Error during registration! Please try again.");
      });
  };

  // Disable submit if any field is empty
  const isFormValid = name && email && password;

  return (
    <>
      <h2>Please register yourself!</h2>
      <input
        type="text"
        placeholder="Enter Your Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"  // Use "email" type for validation
        placeholder="Enter Your Email Id..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"  // Use "password" type to hide text
        placeholder="Enter Your Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        onClick={handleRegister} 
        disabled={!isFormValid || loading}  // Disable if form is invalid or request is loading
      >
        {loading ? "Registering..." : "Register!!"}
      </button>
    </>
  );
};

export default Signup;
