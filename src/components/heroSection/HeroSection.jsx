import heroImage from "../../images/restauranfood.jpg";

const offset = 180;
export default function HeroSection() {
  return (
    <section
      className="bg-green position-relative"
      style={{ marginBottom: `-${offset - 90}px` }}
    >
      <div
        className="col-12 bg-white"
        style={{
          position: "absolute",
          bottom: "-1px",
          height: `${offset}px`,
          zIndex: "0",
        }}
      ></div>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-12 col-md-6 text-center text-md-left"
            id="hero-text-container"
          >
            <div className="text-container">
              <h1 className="text-yellow">Little Lemon</h1>
              <h2 className="text-white">Chicago</h2>
              <p
                className="text-white my-4 mx-md-0 mx-auto"
                style={{ maxWidth: "20rem" }}
              >
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </p>
            </div>
            <button className="btn bg-yellow">Reserve Table</button>
          </div>
          <img
            src={heroImage}
            alt="Delicious Little Lemon specials"
            className="img-fluid mx-auto col-6 p-0"
            style={{
              maxHeight: "520px",
              width: "100%",
              minWidth: "300px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
