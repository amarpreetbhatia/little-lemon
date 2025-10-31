import BookingForm from "./BookingForm";

export default function BookingPage() {
  return (
    <section className="booking">
      <div className="booking-grid">
        <div className="booking-intro">
          <h2>Reserve a Table</h2>
          <p>
            Book your table at Little Lemon and enjoy a Mediterranean feast!
          </p>
          <img
            src="/resturantfood.jpg"
            alt="Restaurant food"
            className="booking-image"
          />
        </div>

        <div className="booking-panel">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
