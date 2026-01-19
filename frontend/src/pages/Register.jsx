import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: role.toUpperCase()
  });

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully. Now login.");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <select
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="USER">USER</option>
        <option value="ORGANIZER">ORGANIZER</option>
      </select>

      <button onClick={register}>Register</button>
    </div>
  );
}
