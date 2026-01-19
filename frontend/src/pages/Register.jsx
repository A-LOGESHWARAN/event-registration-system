import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });

  const register = async () => {
    try {
      console.log("REGISTER FORM:", form);

      await API.post("/auth/register", form);

      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      /><br /><br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      /><br /><br />

      <select
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="USER">USER</option>
        <option value="ORGANIZER">ORGANIZER</option>
      </select>

      <br /><br />

      <button onClick={register}>Register</button>
    </div>
  );
}
