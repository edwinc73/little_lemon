import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationForm from "../components/reservationForm/ReservationForm";
import { useEffect, useReducer, useRef, useState } from "react";
import { fetchAPI, submitAPI } from "../utils/api.js";
import formatDate from "../utils/formdatDate.js";

// toast logic
const formSuccess = (name) =>
  toast.success(`Booking success! Thank you ${name}.`);
const formFail = () => toast.error("Oops, please try again");

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// available times reducer logic

const initializeTimes = () => {
  return {
    availableTimes: [],
    loading: true,
  };
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case "setTimes":
      return { ...state, availableTimes: action.payload, loading: false };
    case "setLoading":
      return { ...state, loading: true };
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
  const [{ availableTimes, loading }, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  useEffect(() => {
    dispatch({ type: "setLoading" });
    setFormData((prev) => ({
      ...prev,
      formTime: { value: "", touched: false },
    }));
    const fetchData = async () => {
      try {
        const data = await fetchAPI(
          formData.formDate.value ? new Date(formData.formDate.value) : tomorrow
        );
        dispatch({ type: "setTimes", payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [formData.formDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid(formData)) {
      try {
        submitAPI(formData);
        formSuccess(formData.formName.value);
        resetFormData();
      } catch (error) {
        formFail();
        console.error(error);
      }
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
          loading={loading}
        ></ReservationForm>
      </div>
      <ToastContainer position="bottom-left" limit={5} />
    </section>
  );
}
