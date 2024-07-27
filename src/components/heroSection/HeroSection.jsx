import heroImage from "../../images/restauranfood.jpg";

const offset = "-170px";
export default function HeroSection() {
  return (
    <section className="bg-green" style={{ marginBottom: offset }}>
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-md-6 d-flex flex-column justify-content-between"
            style={{ height: "350px" }}
          >
            <div className="text-container" st>
              <h1 className="text-yellow">Little Lemon</h1>
              <h2 className="text-white mb-5">Chicago</h2>
              <p className="text-white w-75">
                We are a family owned Mediterranean restaurant, focused on
                traditional recipes served with a modern twist.
              </p>
            </div>
            <button className="btn bg-yellow mr-auto">Reserve Table</button>
          </div>
          <div className="col-12 col-md-6">
            <img
              src={heroImage}
              alt=""
              className="img-fluid"
              style={{
                maxHeight: "500px",
                minWidth: "370px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
