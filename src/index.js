import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import Reservation from "../src/pages/Reservation/Reservation";
import Home from "./pages/home/Home";
import Main from "./components/main/Main";
import ConfirmationReservation from "./pages/Reservation/ConfirmReservation";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <ToastContainer position="bottom-left" limit={5} />
      <Footer />
    </>
  );
};

// animation component
const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// v6.2+ recommended syntax
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div> error</div>,
    children: [
      {
        path: "/",
        element: (
          <PageTransitionWrapper>
            <Home />
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <PageTransitionWrapper>
            <>About Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/menu",
        element: (
          <PageTransitionWrapper>
            <>Menu Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/reservation",
        element: (
          <PageTransitionWrapper>
            <Reservation />
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/reservation/success",
        element: (
          <PageTransitionWrapper>
            <ConfirmationReservation />
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/orderonline",
        element: (
          <PageTransitionWrapper>
            <>orderOnline Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/login",
        element: (
          <PageTransitionWrapper>
            <>Login</>
          </PageTransitionWrapper>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
