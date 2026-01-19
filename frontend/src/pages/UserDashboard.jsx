import { useEffect, useState } from "react";
import API from "../services/api";

export default function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // Fetch all events
  useEffect(() => {
    API.get("/events").then(res => setEvents(res.data));
  }, []);

  // Fetch user's registrations (STATUS)
  useEffect(() => {
    API.get("/registrations/me").then(res => setMyRegistrations(res.data));
  }, []);

  const registerEvent = async (id) => {
    try {
      await API.post(`/registrations/${id}`);
      alert("Registered successfully");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <button className="logout" onClick={logout}>Logout</button>

      {/* EVENT LIST */}
      <div className="section">
        <h3>Available Events</h3>

        {events.map(e => (
          <div key={e._id} className="card">
            <p><strong>{e.title}</strong></p>
            <p>Available Seats: {e.capacity - e.registeredCount}</p>

            <button
              disabled={e.registeredCount >= e.capacity}
              onClick={() => registerEvent(e._id)}
            >
              Register
            </button>
          </div>
        ))}
      </div>

      {/* REGISTRATION STATUS */}
      <div className="section">
        <h3>My Registrations</h3>

        {myRegistrations.length === 0 && (
          <p>No registrations yet</p>
        )}

        {myRegistrations.map(r => (
          <div key={r._id} className="card">
            <p><strong>Event:</strong> {r.eventId.title}</p>
            <p><strong>Status:</strong> {r.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
