import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
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

const root = ReactDOM.createRoot(document.getElementById("root"));

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

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

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div> error</div>,
    children: [
      {
        path: "/",
        element: (
          <PageTransitionWrapper>
            <App />
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/About",
        element: (
          <PageTransitionWrapper>
            <>About Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/Menu",
        element: (
          <PageTransitionWrapper>
            <>Menu Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/Reservation",
        element: (
          <PageTransitionWrapper>
            <>Reservation Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/orderOnline",
        element: (
          <PageTransitionWrapper>
            <>orderOnline Page</>
          </PageTransitionWrapper>
        ),
      },
      {
        path: "/Login",
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
