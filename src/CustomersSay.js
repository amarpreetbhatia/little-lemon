export default function CustomersSay() {
  // Placeholder testimonials
  const testimonials = [
    { name: "Anna", rating: 5, text: "Amazing food and great atmosphere!" },
    { name: "John", rating: 4, text: "Loved the lemon dessert!" },
    { name: "Maria", rating: 5, text: "Best Mediterranean in Chicago." },
  ];
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-list">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <div className="stars">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
            <p>{t.text}</p>
            <span className="customer-name">- {t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
