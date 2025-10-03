export default function BookingPage() {
  return (
    <section className="booking">
      <h2>Reserve a Table</h2>
      <p>Book your table at Little Lemon and enjoy a Mediterranean feast!</p>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="date" required />
        <input type="time" required />
        <button type="submit">Book Now</button>
      </form>
    </section>
  );
}
