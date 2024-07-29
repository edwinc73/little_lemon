import { createContext, useContext, useState } from "react";

const openingTime = "10:00";
const closingTime = "21:00";

const generateTimeSlots = (startTime, endTime) => {
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

const generateWeeklySchedule = (startDate) => {
  const schedule = [];
  const date = new Date(startDate);

  for (let i = 0; i <= 7; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);

    const dateString = currentDate.toISOString().split("T")[0];
    const slots = generateTimeSlots(openingTime, closingTime);

    schedule.push({
      date: dateString,
      slots,
    });
  }

  return schedule;
};

const AvailableTimesContext = createContext(undefined);

export const AvailableTimesProvider = ({ children }) => {
  const [availableTimes, setAvailableTimes] = useState(
    generateWeeklySchedule(tomorrow)
  );
  return (
    <AvailableTimesContext.Provider
      value={{
        availableTimes,
        findDate: (schedule, date) =>
          Object.values(schedule).find((item) => item.date === date),
        setAvailableTimes,
      }}
    >
      {children}
    </AvailableTimesContext.Provider>
  );
};

export const useAvailableTimes = () => useContext(AvailableTimesContext);
