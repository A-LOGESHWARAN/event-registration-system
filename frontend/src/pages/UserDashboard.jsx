import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // 🔐 Auth guard
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  // 📥 Fetch events
  const loadEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  // 📥 Fetch my registrations
  const loadRegistrations = async () => {
    const res = await API.get("/registrations/me");
    setRegistrations(res.data);
  };

  useEffect(() => {
    loadEvents();
    loadRegistrations();
  }, []);

  const registerEvent = async (eventId) => {
    try {
      await API.post(`/registrations/${eventId}`);
      alert("Registered successfully");
      loadEvents();
      loadRegistrations();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const alreadyRegistered = (eventId) =>
    registrations.some(r => r.event._id === eventId);

  return (
    <div className="container">
      <h2>User Dashboard</h2>

      <button onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>

      <h3>Available Events</h3>

      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><b>{event.title}</b></p>
          <p>{event.registeredCount} / {event.capacity}</p>

          {alreadyRegistered(event._id) ? (
            <p style={{ color: "green" }}>Already Registered</p>
          ) : (
            <button
              disabled={event.registeredCount >= event.capacity}
              onClick={() => registerEvent(event._id)}
            >
              {event.registeredCount >= event.capacity ? "Event Full" : "Register"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
