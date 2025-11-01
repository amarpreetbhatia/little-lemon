import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";

export default function Main() {
  // reducer to update available times (for now returns same times regardless of date)
  function updateTimes(state, action) {
    switch (action.type) {
      case "date": {
        // TODO: compute available times based on action.date; currently return same list
        return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
      }
      default:
        return state;
    }
  }

  function initializeTimes() {
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  }

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
            <BookingPage availableTimes={availableTimes} dispatch={dispatch} />
          }
        />
      </Routes>
    </main>
  );
}
