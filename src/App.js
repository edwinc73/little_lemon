import React from "react";
import "./App.css";

import FeaturedSection from "./components/featuredSection/featuredSection.js";
import Header from "./components/header/Header.js";
import Nav from "./components/nav/Nav.js";
import HeroSection from "./components/heroSection/HeroSection.js";
import Main from "./components/main/Main.js";
import TestimonialSection from "./components/testimonialsSection/TestimonialSection.js";
import AboutSection from "./components/about/AboutSection.js";
import Footer from "./components/footer/Footer.js";

function App() {
  return (
    <React.Fragment>
      <Header>
        <Nav></Nav>
      </Header>
      <Main>
        <HeroSection></HeroSection>
        <FeaturedSection></FeaturedSection>
        <TestimonialSection></TestimonialSection>
        <AboutSection></AboutSection>
        <Footer></Footer>
      </Main>
    </React.Fragment>
  );
}

export default App;
