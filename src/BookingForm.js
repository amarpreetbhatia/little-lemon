import { useState } from "react";

export default function BookingForm({
  availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  dispatch,
}) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  const [date, setDate] = useState(minDate);
  const [time, setTime] = useState(availableTimes[2] || "19:00");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("Birthday");
  const [submitted, setSubmitted] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const reservation = {
      id: Date.now(),
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("reservations") || "[]");
      existing.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(existing));
    } catch (err) {
      console.error("Could not save reservation", err);
    }

    setSubmitted(reservation);

    // reset to sensible defaults
    setDate(minDate);
    setTime("19:00");
    setGuests(2);
    setOccasion("Birthday");
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Reservation form"
    >
      <label className="form-field" htmlFor="res-date">
        <span className="field-label">Date</span>
        <input
          id="res-date"
          type="date"
          value={date}
          onChange={(e) => {
            const newDate = e.target.value;
            setDate(newDate);
            if (typeof dispatch === "function") {
              dispatch({ type: "date", date: newDate });
            }
          }}
          min={minDate}
          required
        />
      </label>

      <label className="form-field" htmlFor="res-time">
        <span className="field-label">Time</span>
        <select
          id="res-time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          {availableTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field" htmlFor="guests">
        <span className="field-label">Number of guests</span>
        <input
          id="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max="10"
          placeholder="1"
          required
        />
      </label>

      <label className="form-field" htmlFor="occasion">
        <span className="field-label">Occasion</span>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="cta-btn">
          Make Your reservation
        </button>
      </div>

      {submitted && (
        <div className="booking-success" role="status">
          <p>
            Reservation confirmed — {submitted.guests} guest(s) on{" "}
            {submitted.date} at {submitted.time} ({submitted.occasion})
          </p>
        </div>
      )}
    </form>
  );
}
