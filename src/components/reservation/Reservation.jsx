import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationForm from "../reservationForm/ReservationForm";
import { useAvailableTimes } from "../../context/AvailableTimesContext";

// form date time logic

const today = new Date();
const minDate = new Date(today);
minDate.setDate(today.getDate() + 1);

const formSuccess = (name) =>
  toast.success(`Booking success! Thank you ${name}.`);
const formFail = () => toast.error("Oops, please try again");

export default function Reservation() {
  const { availableTimes, setAvailableTimes, findDate } = useAvailableTimes();

  const [formData, setFormData] = useState({
    formName: { value: "", touched: false },
    formGuests: { value: 0, touched: false },
    formOccasion: { value: "None, Casual Dining", touched: true },
    formDate: { value: "", touched: false },
    formTime: { value: "", touched: false },
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
      formOccasion: { value: "None, Casual Dining", touched: true },
      formDate: { value: "", touched: false },
      formTime: { value: "", touched: false },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid(formData)) {
      setAvailableTimes((prev) => {
        const { formDate, formTime } = formData;
        return prev.map((day) => {
          if (day.date === formDate.value) {
            return {
              ...day,
              slots: day.slots.map((slot) => {
                return slot.time === formTime.value
                  ? { ...slot, available: false }
                  : slot;
              }),
            };
          }
          return day;
        });
      });
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
          <h2 className="text-center text-green">Reservation</h2>
        </div>
        <ReservationForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          minDate={minDate}
          availableTimes={availableTimes}
          findDate={findDate}
        ></ReservationForm>
      </div>
      <ToastContainer position="bottom-left" limit={5} />
    </section>
  );
}
