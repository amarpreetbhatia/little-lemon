import { Routes, Route, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";
import { initializeTimes, updateTimes } from "./times";

// Use the provided fetchAPI(date) if available (in index.html we include the
// capstone API script which defines fetchAPI). The function returns an array
// of available times for a given date string (YYYY-MM-DD).
export default function Main() {
  const navigate = useNavigate();

  function submitForm(formData) {
    try {
      const submitFn =
        typeof window !== "undefined" && typeof window.submitAPI === "function"
          ? window.submitAPI
          : null;
      const result = submitFn ? submitFn(formData) : true;
      if (result && typeof result.then === "function") {
        result
          .then((ok) => {
            if (ok) navigate("/confirmed");
          })
          .catch((err) => console.error("submitAPI failed", err));
        return result;
      }
      if (result) {
        navigate("/confirmed");
        return result;
      }
    } catch (err) {
      console.error("Error calling submitAPI", err);
    }
    return false;
  }
  // Use initializeTimes/updateTimes from ./times which call the global fetchAPI

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}
