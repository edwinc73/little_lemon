import React from "react";
import "./App.css";

import FeaturedSection from "./components/featuredSection/featuredSection";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import HeroSection from "./components/heroSection/HeroSection";
import Main from "./components/main/Main";
import TestimonialSection from "./components/testimonialsSection/TestimonialSection";
import AboutSection from "./components/about/AboutSection";
import Footer from "./components/footer/Footer";

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
