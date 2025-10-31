import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";
import BookingForm from "./BookingForm";

function App() {
  const [showBooking, setShowBooking] = useState(false);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowBooking(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Header onReserve={() => setShowBooking(true)} />
      <NavigationMenu />
      <Main />
      <Footer />

      {showBooking && (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <div
            className="booking-modal-backdrop"
            onClick={() => setShowBooking(false)}
            aria-hidden="true"
          />
          <div className="booking-modal-panel">
            <button
              className="modal-close"
              aria-label="Close reservation dialog"
              onClick={() => setShowBooking(false)}
            >
              ×
            </button>
            <h3>Make a reservation</h3>
            <BookingForm />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
