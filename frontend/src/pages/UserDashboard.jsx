import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./dashboard.css";

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load events
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));

    // Load registration status
    API.get("/registrations/my")
      .then(res => {
        console.log("MY REGISTRATIONS:", res.data); // 🔥 DEBUG
        setRegistrations(res.data);
      })
      .catch(err => console.error("REG STATUS ERROR:", err));
  }, []);

  const register = async (id) => {
    try {
      const res = await API.post(`/registrations/${id}`);
      alert(res.data.message);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* 🔴 LOGOUT BUTTON */}
      <div className="top-bar">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <h2>Available Events</h2>

      <div className="event-list">
        {events.map(e => {
          const isFull = e.registeredCount >= e.capacity;

          return (
            <div key={e._id} className="event-card">
              <h3>{e.title}</h3>
              <p>
                {e.registeredCount} / {e.capacity}
              </p>

              <button
                disabled={isFull}
                className={isFull ? "btn disabled" : "btn"}
                onClick={() => register(e._id)}
              >
                {isFull ? "Event Full" : "Register"}
              </button>
            </div>
          );
        })}
      </div>

      <h2>My Registration Status</h2>

      {registrations.length === 0 ? (
        <p>No registrations yet</p>
      ) : (
        <div className="status-list">
          {registrations.map(r => (
            <div key={r._id} className="status-card">
              ✅ Registered for <b>{r.event.title}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
