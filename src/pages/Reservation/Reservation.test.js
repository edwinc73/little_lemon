import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Reservation from "../Reservation";
import formatDate from "../../utils/formdatDate";
import "@testing-library/jest-dom/extend-expect";

const renderReservation = () => {
  render(<Reservation />);
  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  return { dateInput, timeInput };
};

const selectDate = (date) => {
  const { dateInput } = renderReservation();
  fireEvent.change(dateInput, { target: { value: formatDate(date) } });
};

test("Time input should be disabled on first load", () => {
  const { timeInput } = renderReservation();
  expect(timeInput).toBeDisabled();
});

test("User can select a date and the input becomes valid", () => {
  const { dateInput } = renderReservation();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  selectDate(tomorrow);
  expect(dateInput).toBeValid();
});

test("If user select past dates, the input is invalid", () => {
  const { dateInput } = renderReservation();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  selectDate(yesterday);
  expect(dateInput).toBeInvalid();
});

test("Users cannot select more than 8 days in advance", () => {
  const { dateInput } = renderReservation();
  const advanceDate = new Date();
  advanceDate.setDate(advanceDate.getDate() - 8);

  selectDate(advanceDate);
  expect(dateInput).toBeInvalid();
});

test("On selecting date, time input becomes not disabled", () => {
  const { timeInput, dateInput } = renderReservation();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  fireEvent.change(dateInput, { target: { value: formatDate(tomorrow) } });
  expect(timeInput).not.toBeDisabled();
});

// testing initialize times
test("After date input there should be 1 default option and 25 time options", async () => {
  render(<Reservation />);
  const dateInput = screen.getByLabelText("Date");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  fireEvent.change(dateInput, { target: { value: formatDate(tomorrow) } });

  await waitFor(() => {
    expect(
      screen.getByRole("option", { name: "Select Time" })
    ).toBeInTheDocument();
  });

  const timeInput = screen.getByLabelText("Time");
  expect(timeInput.length).toBe(26);
  expect(timeInput[0]).toHaveTextContent(
    "Select Time" || "LoadingLoading data..." || "Select Time"
  );

  for (let i = 1; i < timeInput.length; i++) {
    const option = timeInput[i];
    expect(option.value).toMatch(/^\d{2}:\d{2}$/);
  }
});
