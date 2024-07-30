import { render, fireEvent, screen } from "@testing-library/react";

import Reservation from "../Reservation";
import formatDate from "../../utils/formdatDate";

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
test("After date input there should be 1 default option and 25 time options", () => {
  const { timeInput, dateInput } = renderReservation();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  fireEvent.change(dateInput, { target: { value: formatDate(tomorrow) } });
  expect(timeInput.length).toBe(26);
  expect(timeInput[0]).toHaveTextContent("Select Time");
  for (let i = 1; i < timeInput.length; i++) {
    const option = timeInput[i];
    expect(option.value).toMatch(/^\d{2}:\d{2}$/);
  }
});

// testing updateTimes

test("After updating date, the input of time should be the same as before", () => {
  const { timeInput, dateInput } = renderReservation();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date2 = new Date();
  date2.setDate(date2.getDate() + 2);

  fireEvent.change(dateInput, { target: { value: formatDate(tomorrow) } });
  const initialTimeValue = timeInput;
  fireEvent.change(dateInput, {
    target: { value: formatDate(date2) },
  });

  expect(timeInput).toBe(initialTimeValue);
});
