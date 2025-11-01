import { render, screen } from "@testing-library/react";
import BookingForm from "./BookingForm";

beforeEach(() => {
  // keep tests isolated
  localStorage.clear();
});

test("renders the booking form submit button text", () => {
  render(<BookingForm />);
  const button = screen.getByText("Make Your reservation");
  expect(button).toBeInTheDocument();
});
