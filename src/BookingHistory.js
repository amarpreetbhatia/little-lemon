import { useEffect, useState } from "react";

export default function BookingHistory() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("reservations") || "[]");
      setReservations(Array.isArray(stored) ? stored : []);
    } catch (e) {
      setReservations([]);
    }
  }, []);

  if (!reservations || reservations.length === 0) {
    return (
      <section className="booking-history">
        <p>No reservations found.</p>
      </section>
    );
  }

  return (
    <section className="booking-history">
      <h2>Your Reservations</h2>
      <ul>
        {reservations.map((r) => (
          <li key={r.id}>
            <strong>{r.date}</strong> at <span>{r.time}</span> — {r.guests}{" "}
            guest(s) ({r.occasion})
          </li>
        ))}
      </ul>
    </section>
  );
}
