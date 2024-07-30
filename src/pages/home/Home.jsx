import AboutSection from "../../components/about/AboutSection";
import FeaturedSection from "../../components/featuredSection/FeaturedSection";
import HeroSection from "../../components/heroSection/HeroSection";
import TestimonialSection from "../../components/testimonialsSection/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <FeaturedSection></FeaturedSection>
      <TestimonialSection></TestimonialSection>
      <AboutSection></AboutSection>
    </>
  );
}
