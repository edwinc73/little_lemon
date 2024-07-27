import aboutImg from "../../images/adrian and mario.png";

export default function AboutSection() {
  return (
    <section id="about-section">
      <div className="container bg-white">
        <div className="row">
          <div className="col-12 col-lg-6 text-lg-left text-center mb-4 mb-lg-0">
            <h2 className="text-green ">Little Lemon</h2>
            <h4 className="mb-5 text-muted">Chicago</h4>
            <p
              className="ml-lg-0 mr-lg-0 ml-md-auto mr-md-auto"
              style={{ maxWidth: "30rem" }}
            >
              Little Lemon is a charming neighborhood bistro that serves simple
              food and classic cocktails in a lively but casual environment the
              restaurant features a locally sourced menu with daily
              specials.Little Lemon is a charming neighborhood bistro that
              serves simple food and classic cocktails in a lively but casual
              environment the restaurant features a locally sourced menu with
              daily specials.
            </p>
          </div>
          <div
            id="about-image-container"
            className="col-12 col-lg-6"
            style={{
              position: "relative",
            }}
          >
            <img
              src={aboutImg}
              alt="mario and adrian cooking"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
