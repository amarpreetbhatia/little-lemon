import { useState, useRef, useEffect } from "react";

export default function BookingForm({
  availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  dispatch,
  submitForm,
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
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  // Update form validity whenever input values change
  useEffect(() => {
    if (!formRef.current) {
      setIsFormValid(false);
      return;
    }
    // Ensure guests is within allowed range
    const guestsValid =
      typeof guests === "number" && guests >= 1 && guests <= 10;
    const valid = formRef.current.checkValidity() && guestsValid;
    setIsFormValid(Boolean(valid));
  }, [date, time, guests, occasion, availableTimes]);

  async function handleSubmit(e) {
    e.preventDefault();
    const reservation = {
      id: Date.now(),
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    try {
      // final client-side validation: prevent submission if form invalid
      if (formRef.current && !formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
      }
      if (typeof submitForm === "function") {
        const result = submitForm(reservation);
        const ok =
          result && typeof result.then === "function" ? await result : result;
        if (ok) {
          // Optionally persist locally
          try {
            const existing = JSON.parse(
              localStorage.getItem("reservations") || "[]"
            );
            existing.push(reservation);
            localStorage.setItem("reservations", JSON.stringify(existing));
          } catch (err) {
            console.error("Could not save reservation locally", err);
          }
          setSubmitted(reservation);
        } else {
          console.error("Submission failed");
        }
      } else {
        // no submit handler provided, fall back to local save
        const existing = JSON.parse(
          localStorage.getItem("reservations") || "[]"
        );
        existing.push(reservation);
        localStorage.setItem("reservations", JSON.stringify(existing));
        setSubmitted(reservation);
      }
    } catch (err) {
      console.error("Error submitting reservation", err);
    }

    // reset to sensible defaults
    setDate(minDate);
    setTime("19:00");
    setGuests(2);
    setOccasion("Birthday");
  }

  return (
    <form
      ref={formRef}
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Reservation form"
      noValidate
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
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          max="10"
          placeholder="1"
          required
          aria-invalid={guests < 1 || guests > 10}
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
        <button type="submit" className="cta-btn" disabled={!isFormValid}>
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
