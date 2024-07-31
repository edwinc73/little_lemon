import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Reservation from "../Reservation/Reservation.jsx";
import formatDate from "../../utils/formdatDate";
import { BrowserRouter } from "react-router-dom";

const getInputs = () => {
  const dateInput = screen.getByLabelText("Date");
  const timeInput = screen.getByLabelText("Time");
  const nameInput = screen.getByLabelText("Name");
  const guestsInput = screen.getByLabelText("Number of guests");
  const occasionInput = screen.getByLabelText("Special Occasion");

  return { dateInput, timeInput, nameInput, guestsInput, occasionInput };
};

const renderReservation = () => {
  render(
    <BrowserRouter>
      <Reservation />
    </BrowserRouter>
  );
};

const selectDate = (date) => {
  renderReservation();
  const { dateInput } = getInputs();
  fireEvent.change(dateInput, { target: { value: formatDate(date) } });
};

test("Users can enter their name", () => {
  renderReservation();
  const { nameInput } = getInputs();
  fireEvent.change(nameInput, { target: { value: "John Smith" } });
  expect(nameInput).toBeValid();
  expect(nameInput.value).toBe("John Smith");
});

test("Users can only enter a number beteween 1-12 in the guests input", () => {
  renderReservation();
  const { guestsInput } = getInputs();
  fireEvent.change(guestsInput, { target: { value: "asd" } });
  expect(guestsInput).toBeInvalid();
  fireEvent.change(guestsInput, { target: { value: 0 } });
  expect(guestsInput).toBeInvalid();
  fireEvent.change(guestsInput, { target: { value: 13 } });
  expect(guestsInput).toBeInvalid();
  fireEvent.change(guestsInput, { target: { value: 2 } });
  expect(guestsInput).toBeValid();
});

test("Occasions input shows a list of options", () => {
  renderReservation();
  const { occasionInput } = getInputs();
  expect(occasionInput.length).toBe(6);
  expect(occasionInput[0].value).toBe("None, Casual Dining");
});

test("User can select from occassion options", () => {
  renderReservation();
  const { occasionInput } = getInputs();
  const options = screen.getAllByTestId("occassion-option");
  fireEvent.change(occasionInput, { target: { value: "Birthday" } });
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});

test("Time input should be disabled on first load", () => {
  renderReservation();
  const { timeInput } = getInputs();
  expect(timeInput).toBeDisabled();
});

test("User can select a date and the input becomes valid", () => {
  renderReservation();
  const { dateInput } = getInputs();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  selectDate(tomorrow);
  expect(dateInput).toBeValid();
});

test("If user select past dates, the input is invalid", () => {
  renderReservation();
  const { dateInput } = getInputs();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  selectDate(yesterday);
  expect(dateInput).toBeInvalid();
});

test("Users cannot select more than 8 days in advance", () => {
  renderReservation();
  const { dateInput } = getInputs();
  const advanceDate = new Date();
  advanceDate.setDate(advanceDate.getDate() - 8);

  selectDate(advanceDate);
  expect(dateInput).toBeInvalid();
});

test("On selecting date, time input becomes not disabled", () => {
  renderReservation();
  const { timeInput, dateInput } = getInputs();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  fireEvent.change(dateInput, { target: { value: formatDate(tomorrow) } });
  expect(timeInput).not.toBeDisabled();
});

// testing initialize times
test("After date input there should be 1 default option and 25 time options", async () => {
  renderReservation();
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
