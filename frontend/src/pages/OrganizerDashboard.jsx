import { useEffect, useState } from "react";
import API from "../services/api";

export default function OrganizerDashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  useEffect(() => {
    API.get("/events").then(res => setEvents(res.data));
  }, []);

  const createEvent = async () => {
    try {
      await API.post("/events", { title, capacity });
      alert("Event created");
      window.location.reload();
    } catch {
      alert("Failed to create event");
    }
  };

  const viewRegistrations = async (id) => {
    const res = await API.get(`/registrations/event/${id}`);
    setRegistrations(res.data);
  };

  return (
  <div className="dashboard">
    <button className="logout" onClick={logout}>Logout</button>

    <h2>Organizer Dashboard</h2>

    <div className="section">
      <h3>Create Event</h3>
      <input
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Capacity"
        onChange={e => setCapacity(e.target.value)}
      />
      <button className="center-btn" onClick={createEvent}>
        Create
      </button>
    </div>

    <div className="section">
      <h3>Your Events</h3>

      <div className="event-list">
        {events.map(e => (
          <div key={e._id} className="card">
            <p>{e.title}</p>
            <button
              className="center-btn"
              onClick={() => viewRegistrations(e._id)}
            >
              View Registrations
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="section">
      <h3>Registrations</h3>
      {registrations.map(r => (
        <p key={r._id}>{r.userId.email}</p>
      ))}
    </div>
  </div>
);
}
