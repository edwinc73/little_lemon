import React from "react";
import { AvailableTimesProvider } from "../../context/AvailableTimesContext";

export default function Main({ children }) {
  return (
    <AvailableTimesProvider>
      <main>{children}</main>;
    </AvailableTimesProvider>
  );
}
