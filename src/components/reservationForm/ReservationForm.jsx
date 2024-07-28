import Button from "../button/Button";

export default function ReservationForm({
  formData,
  handleChange,
  handleSubmit,
  formatDate,
  minDate,
  maxDate,
}) {
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
      <div className="form-group">
        <label htmlFor="formDate">Date</label>
        <input
          onChange={handleChange}
          type="datetime-local"
          className="form-control w-100"
          id="formDate"
          aria-describedby="guestHelp"
          min={formatDate(minDate)}
          max={formatDate(maxDate)}
          value={formData.formDate.value}
          required
        />
        <small id="guestHelp" className="form-text text-muted">
          Please select the reservation date and time
        </small>
      </div>
      <div className="col-12 p-0 d-flex justify-content-center">
        <Button type="submit">Book Table</Button>
      </div>
    </form>
  );
}
