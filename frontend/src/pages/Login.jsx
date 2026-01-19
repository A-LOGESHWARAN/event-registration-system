import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "ORGANIZER") {
        navigate("/organizer");
      } else {
        navigate("/user");
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={login}>Login</button>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
