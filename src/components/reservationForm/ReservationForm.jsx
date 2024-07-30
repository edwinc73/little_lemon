import Button from "../button/Button";
import formatDate from "../../utils/formdatDate";

const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate() + 1);
const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 8);

export default function ReservationForm({
  formData,
  setFormData,
  dispatch,
  handleSubmit,
  availableTimes,
}) {
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: {
        value: e.target.value,
        touched: true,
      },
    }));
  };

  const handleDateChange = (e) => {
    handleChange(e);

    dispatch({ type: "updateTimeSlot", payload: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="col-12 col-md-6 mx-auto needs-validation"
      id="reservation-form"
    >
      <div className="form-group">
        <label htmlFor="formName">Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control w-100"
          id="formName"
          aria-describedby="nameHelp"
          placeholder="Mario Vincenti"
          value={formData.formName.value}
          required
        />
        <small id="nameHelp" className="form-text text-muted">
          Please enter your full name
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="formGuests">Number of guests</label>
        <input
          onChange={handleChange}
          type="number"
          className="form-control w-100"
          id="formGuests"
          aria-describedby="guestHelp"
          value={formData.formGuests.value}
          min={1}
          max={12}
          required
        />
        <small id="guestHelp" className="form-text text-muted">
          Please enter the number of guests (1 - 12)
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="formOccasion">Special Occasion</label>
        <select
          className="form-control"
          id="formOccasion"
          aria-describedby="occasionHelp"
          required
          value={formData.formOccasion.value}
          onChange={handleChange}
        >
          <option>None, Casual Dining</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Private Dining</option>
          <option>Corporate Event</option>
          <option>Chef’s Table</option>
        </select>
        <small id="occasionHelp" className="form-text text-muted">
          Choose an occasion to enhance your experience
        </small>
      </div>
      <div className="row">
        <div className="form-group col-6">
          <label htmlFor="formDate">Date</label>
          <input
            onChange={handleDateChange}
            type="date"
            className="form-control w-100"
            id="formDate"
            aria-describedby="guestHelp"
            value={formData.formDate.value}
            min={formatDate(minDate)}
            max={formatDate(maxDate)}
            required
          />
          <small id="guestHelp" className="form-text text-muted">
            Please select the reservation date
          </small>
        </div>
        <div className="form-group col-6">
          <label htmlFor="formTime">Time</label>
          <select
            className="form-control"
            id="formTime"
            aria-describedby="timehelp"
            required
            value={formData.formTime.value}
            onChange={handleChange}
            disabled={formData.formDate.value === ""}
          >
            <option>
              {formData.formDate.value === ""
                ? "Select Date First"
                : "Select Time"}
            </option>

            {availableTimes.map((item) => {
              if (!item.available) {
                return (
                  <option className="strike-through" disabled key={item.time}>
                    {item.time}
                  </option>
                );
              }
              return (
                <option className="text-dark" key={item.time}>
                  {item.time}
                </option>
              );
            })}
          </select>
          <small id="timehelp" className="form-text text-muted">
            Please select the reservation time
          </small>
        </div>
      </div>
      <div className="col-12 p-0 d-flex justify-content-center">
        <Button type="submit">Book Table</Button>
      </div>
    </form>
  );
}
