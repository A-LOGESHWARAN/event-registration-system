import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function OrganizerDashboard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [events, setEvents] = useState([]);

  // 🔐 Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const fetchEvents = () => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  };

  useEffect(fetchEvents, []);

  const createEvent = async () => {
    if (!title || !capacity) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/events", {
        title,
        capacity: Number(capacity)
      });
      alert("Event created");
      setTitle("");
      setCapacity("");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="container">
      <h2>Organizer Dashboard</h2>

      <button onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>

      <h3>Create Event</h3>

      <input
        placeholder="Event Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={e => setCapacity(e.target.value)}
      />

      <button onClick={createEvent}>Create Event</button>

      <h3>Your Events</h3>

      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><b>{event.title}</b></p>
          <p>Registrations: {event.registeredCount} / {event.capacity}</p>
        </div>
      ))}
    </div>
  );
}
