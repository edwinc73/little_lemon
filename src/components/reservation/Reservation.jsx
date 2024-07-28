import { useState } from "react";
import Button from "../button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// form date time logic

const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate() + 1);
const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 7);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formSuccess = (name) =>
  toast.success(`Booking success! Thank you ${name}.`);
const formFail = () => toast.error("Oops, please try again");

export default function Reservation() {
  const [formData, setFormData] = useState({
    formName: { value: "", touched: false },
    formGuests: { value: 0, touched: false },
    formOccasion: { value: "None, Casual Dining", touched: false },
    formDate: { value: formatDate(minDate), touched: false },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: {
        value: e.target.value,
        touched: true,
      },
    }));
  };

  const restFormData = () => {
    setFormData({
      formName: { value: "", touched: false },
      formGuests: { value: 0, touched: false },
      formOccasion: { value: "None, Casual Dining", touched: false },
      formDate: { value: formatDate(minDate), touched: false },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid(formData)) {
      formSuccess(formData.formName.value);
      restFormData();
    } else {
      formFail();
    }
  };

  const isValid = (obj) => {
    const isAllTouched = Object.values(obj).every(
      (item) => item.touched === true
    );
    return (
      obj.formName.value !== "" &&
      obj.formGuests.value >= 1 &&
      obj.formGuests.value <= 12 &&
      isAllTouched
    );
  };

  return (
    <section id="reservation">
      <div
        className="container p-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "16px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="col-12 mb-4">
          <h2 className="text-center">Reservation</h2>
        </div>
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
      </div>
      <ToastContainer position="bottom-left" limit={5} />
    </section>
  );
}
