import { render, fireEvent, screen } from "@testing-library/react";

import FeaturedSection from "./components/featuredSection/FeaturedSection";

test("Renders the BookingForm heading", () => {
  render(<FeaturedSection />);
  const headingElement = screen.getByText("This week’s specials!");
  expect(headingElement).toBeInTheDocument();
});
