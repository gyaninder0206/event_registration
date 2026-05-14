import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '', message: '' });
  const [status, setStatus] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/registrations`);
      setRegistrations(response.data);
    } catch (error) {
      console.error(error);
      setStatus('Unable to load registered events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      await axios.post(`${API_BASE_URL}/api/registrations`, form);
      setStatus('Registration successful!');
      setForm({ name: '', email: '', phone: '', event: '', message: '' });
      fetchRegistrations();
    } catch (error) {
      console.error(error);
      setStatus('Failed to submit registration. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration?')) return;

    setStatus('Deleting registration...');
    try {
      await axios.delete(`${API_BASE_URL}/api/registrations/${id}`);
      setStatus('Registration deleted successfully.');
      fetchRegistrations();
    } catch (error) {
      console.error(error);
      setStatus('Failed to delete registration. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Event Registration</h1>
        <p>Enter your details to register for the event.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>

          <label>
            Event
            <input name="event" value={form.event} onChange={handleChange} placeholder="Example: Spring Summit" />
          </label>

          <label>
            Message
            <textarea name="message" value={form.message} onChange={handleChange} rows="4" />
          </label>

          <button type="submit">Register</button>
        </form>

        {status && <div className="status-message">{status}</div>}
      </div>

      <div className="card registration-panel">
        <h2>Registered Events</h2>
        {loading ? (
          <p>Loading registrations...</p>
        ) : registrations.length === 0 ? (
          <p>No registrations yet.</p>
        ) : (
          <div className="registration-list">
            {registrations.map((registration) => (
              <div key={registration._id} className="registration-card">
                <div className="registration-row">
                  <strong>{registration.name}</strong>
                  <span>{registration.email}</span>
                </div>
                <div className="registration-row">
                  <span>{registration.phone}</span>
                  <span>{registration.event || 'General Event'}</span>
                </div>
                {registration.message && <p className="registration-message">{registration.message}</p>}
                <button className="delete-btn" onClick={() => handleDelete(registration._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
