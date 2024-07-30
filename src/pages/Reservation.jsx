import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationForm from "../components/reservationForm/ReservationForm";
import { useReducer, useState } from "react";

const formSuccess = (name) =>
  toast.success(`Booking success! Thank you ${name}.`);
const formFail = () => toast.error("Oops, please try again");

const initializeTimes = () => {
  const startTime = "10:00";
  const endTime = "22:00";
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  const slots = [];
  let current = start;

  while (current <= end) {
    const formattedTime = current.toTimeString().slice(0, 5);
    const available = Math.random() > 0.5;

    slots.push({ time: formattedTime, available });
    current.setMinutes(current.getMinutes() + 30);
  }

  return slots;
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const updateTimes = (state, action) => {
  switch (action.type) {
    case "updateTimeSlot":
      return state;
    default:
      break;
  }
};

export default function Reservation() {
  const [formData, setFormData] = useState({
    formName: { value: "", touched: false },
    formGuests: { value: 0, touched: false },
    formOccasion: { value: "None, Casual Dining", touched: true },
    formDate: { value: "", touched: false },
    formTime: { value: "", touched: false },
  });
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid(formData)) {
      formSuccess(formData.formName.value);
      resetFormData();
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

  const resetFormData = () => {
    setFormData({
      formName: { value: "", touched: false },
      formGuests: { value: 0, touched: false },
      formOccasion: { value: "None, Casual Dining", touched: true },
      formDate: { value: "", touched: false },
      formTime: { value: "", touched: false },
    });
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
          <h2 className="text-center text-green">Reservation</h2>
        </div>
        <ReservationForm
          formData={formData}
          setFormData={setFormData}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          availableTimes={availableTimes}
        ></ReservationForm>
      </div>
      <ToastContainer position="bottom-left" limit={5} />
    </section>
  );
}
