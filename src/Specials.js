export default function Specials() {
  // Placeholder specials
  const specials = [
    {
      name: "Greek Salad",
      description: "Fresh salad with feta, olives, and lemon dressing.",
    },
    {
      name: "Bruschetta",
      description: "Grilled bread with tomato, garlic, and basil.",
    },
    {
      name: "Lemon Dessert",
      description: "Tangy lemon cake with whipped cream.",
    },
  ];
  return (
    <section className="specials">
      <h2>Specials</h2>
      <div className="specials-list">
        {specials.map((item, idx) => (
          <div className="special-card" key={idx}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
