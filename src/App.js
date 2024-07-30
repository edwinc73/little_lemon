import React from "react";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";
import Reservation from "../src/pages/Reservation.jsx";
import Home from "./pages/Home";
import Main from "./components/main/Main.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
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
            <Reservation />
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
