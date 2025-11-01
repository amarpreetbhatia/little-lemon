import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "./BookingForm";

beforeEach(() => {
  localStorage.clear();
});

test("saves reservation to localStorage on submit when submitForm not provided", async () => {
  render(<BookingForm />);
  const submit = screen.getByRole("button", { name: /Make Your reservation/i });
  await userEvent.click(submit);

  const stored = JSON.parse(localStorage.getItem("reservations") || "[]");
  expect(Array.isArray(stored)).toBe(true);
  expect(stored.length).toBeGreaterThan(0);
  const last = stored[stored.length - 1];
  expect(last).toEqual(
    expect.objectContaining({
      date: expect.any(String),
      time: expect.any(String),
      guests: expect.any(Number),
      occasion: expect.any(String),
    })
  );
});
