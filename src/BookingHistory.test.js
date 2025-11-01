import { render, screen } from "@testing-library/react";
import BookingHistory from "./BookingHistory";

beforeEach(() => {
  localStorage.clear();
});

test("renders reservations from localStorage", () => {
  const mock = [
    {
      id: 1,
      date: "2025-11-01",
      time: "19:00",
      guests: 2,
      occasion: "Birthday",
    },
    {
      id: 2,
      date: "2025-11-02",
      time: "20:00",
      guests: 4,
      occasion: "Anniversary",
    },
  ];
  localStorage.setItem("reservations", JSON.stringify(mock));

  render(<BookingHistory />);

  // heading
  expect(screen.getByText(/Your Reservations/i)).toBeInTheDocument();

  // check that both dates appear
  expect(screen.getByText(/2025-11-01/)).toBeInTheDocument();
  expect(screen.getByText(/19:00/)).toBeInTheDocument();
  expect(screen.getByText(/2025-11-02/)).toBeInTheDocument();
  expect(screen.getByText(/20:00/)).toBeInTheDocument();
});
