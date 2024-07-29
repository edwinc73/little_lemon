import React from "react";
import "./App.css";

import FeaturedSection from "./components/featuredSection/FeaturedSection";
import HeroSection from "./components/heroSection/HeroSection";
import TestimonialSection from "./components/testimonialsSection/TestimonialSection";
import AboutSection from "./components/about/AboutSection";

function App() {
  return (
    <>
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <TestimonialSection></TestimonialSection>
      <AboutSection></AboutSection>
    </>
  );
}

export default App;
