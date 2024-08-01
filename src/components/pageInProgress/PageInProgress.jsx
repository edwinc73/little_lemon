import { Link } from "react-router-dom";
import Button from "../button/Button";

export default function PageInProgress() {
  return (
    <section id="pageInProgress-section">
      <div className="container p-5">
        <div className="col-12  d-flex flex-column justify-content-center align-items-center text-center">
          <img src="" alt="" />
          <h2 style={{ maxWidth: "35rem" }}>
            This page is currently
            <br /> in development.
          </h2>
          <p style={{ maxWidth: "25rem" }}>Please return to the Homepage</p>
          <div className="row">
            <div className="col-6 px-1">
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
