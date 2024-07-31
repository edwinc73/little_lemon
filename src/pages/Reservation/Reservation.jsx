import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationForm from "../../components/reservationForm/ReservationForm.jsx";
import { useEffect, useReducer, useState } from "react";
import { fetchAPI, submitAPI } from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import { isStored, setSessionStorage } from "../../utils/sessionStorage.js";
import formatDate from "../../utils/formdatDate.js";

// toast logic
const formSuccess = (name) =>
  toast.success(`Reservation success! Thank you ${name}.`);
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
    case "submitForm":
      return { ...state, availableTimes: action.payload, loading: true };
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

  const navigate = useNavigate();

  useEffect(() => {
    console.log(availableTimes);
  }, [availableTimes]);

  useEffect(() => {
    dispatch({ type: "setLoading" });
    setFormData((prev) => ({
      ...prev,
      formTime: { value: "", touched: false },
    }));

    const fetchData = async () => {
      const sessionData = isStored(formData.formDate.value);
      console.log(sessionData);
      try {
        const date = formData.formDate.value;
        let data;

        if (sessionData) {
          data = sessionData;
        } else if (date === "") {
          data = [];
        }
        dispatch({ type: "setTimes", payload: data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [formData.formDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAvailableTimes = availableTimes.map((item) => {
      if (item.time === formData.formTime.value) {
        return {
          ...item,
          available: false,
        };
      }
      return item;
    });

    if (isValid(formData)) {
      try {
        dispatch({ type: "submitForm", payload: newAvailableTimes });
        setSessionStorage(formData.formDate.value, newAvailableTimes);
        submitAPI(formData);
        resetFormData();
        formSuccess(formData.formName.value);
        navigate(`/reservation/success?name=${formData.formName.value}`);
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
        className="container p-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          borderRadius: "16px",
          backdropFilter: "blur(5px)",
        }}
      >
        <ReservationForm
          formData={formData}
          setFormData={setFormData}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          availableTimes={availableTimes}
          loading={loading}
        ></ReservationForm>
      </div>
    </section>
  );
}
