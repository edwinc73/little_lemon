import React from "react";
import "./App.css";

import FeaturedSection from "./components/featuredSection/FeaturedSection";
import HeroSection from "./components/heroSection/HeroSection";
import Main from "./components/main/Main";
import TestimonialSection from "./components/testimonialsSection/TestimonialSection";
import AboutSection from "./components/about/AboutSection";

// import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <React.Fragment>
      {/* <ThemeProvider> */}
      <Main>
        <HeroSection></HeroSection>
        <FeaturedSection></FeaturedSection>
        <TestimonialSection></TestimonialSection>
        <AboutSection></AboutSection>
      </Main>
      {/* </ThemeProvider> */}
    </React.Fragment>
  );
}

export default App;
