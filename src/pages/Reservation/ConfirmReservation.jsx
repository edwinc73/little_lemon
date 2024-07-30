import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";

export default function ConfirmationReservation(props) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  return (
    <>
      <section id="confirmation" style={{ height: "50vh" }}>
        <div
          className="p-4 container d-flex align-items-center flex-column justify-content-center"
          style={{
            height: "100%",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "16px",
            backdropFilter: "blur(5px)",
          }}
        >
          <div className="container text-center">
            <h2 className="text-green my-0">Success!</h2>
            <p className="display p-0 m-0">
              Thanks for your Reservation, {name}.
            </p>
            <p className="text-muted">We look forward to your visit!</p>
          </div>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
