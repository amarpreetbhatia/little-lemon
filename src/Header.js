export default function Header({ onReserve }) {
  return (
    <header className="App-header">
      <h1>Little Lemon</h1>
      <h2>Sydney</h2>
      <p>
        We are a family owned Mediterranean restaurant, focused on traditional
        recipes served with a modern twist.
      </p>
      <button onClick={onReserve}>Reserve a Table</button>
      <img
        src="/resturantfood.jpg"
        width={400}
        height={300}
        alt="Restaurant Food"
      />
    </header>
  );
}
