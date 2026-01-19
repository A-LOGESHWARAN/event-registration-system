import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";

export default function App() {
  const role = localStorage.getItem("role");
  const [showLogin, setShowLogin] = useState(true);

  if (!role) {
    return (
      <div className="container">
        <div className="switch-container">
          <button
            className={`switch-btn ${showLogin ? "active" : ""}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button
            className={`switch-btn ${!showLogin ? "active" : ""}`}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>
        </div>

        {showLogin ? <Login /> : <Register />}
      </div>
    );
  }

  return role === "USER"
    ? <UserDashboard />
    : <OrganizerDashboard />;
}
