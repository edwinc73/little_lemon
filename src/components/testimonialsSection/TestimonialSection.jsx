import starFilled from "../../images/star-filled.svg";
import starUnfilled from "../../images/star-unfilled.svg";
import userProfilePic from "../../images/user.png";

const testimonials = [
  {
    id: 0,
    rating: 5,
    title: "Review title",
    body: "Lorem ipsum dolor sit amet, consectetur",
    user: { name: "Reviewer Name", img: userProfilePic },
    date: "27/07/2024",
  },
  {
    id: 1,
    rating: 4,
    title: "Review title",
    body: "Lorem ipsum dolor sit amet, consectetur",
    user: { name: "Reviewer Name", img: userProfilePic },
    date: "27/07/2024",
  },
  {
    id: 2,
    rating: 5,
    title: "Review title",
    body: "Lorem ipsum dolor sit amet, consectetur",
    user: { name: "Reviewer Name", img: userProfilePic },
    date: "27/07/2024",
  },
  {
    id: 3,
    rating: 3,
    title: "Review title",
    body: "Lorem ipsum dolor sit amet, consectetur",
    user: { name: "Reviewer Name", img: userProfilePic },
    date: "27/07/2024",
  },
];

const Rating = ({ rating }) => {
  const validRating = Math.min(Math.max(rating, 0), 5);
  const starElements = [];
  for (let i = 0; i < 5; i++) {
    starElements.push(
      <img
        key={i}
        src={i < validRating ? starFilled : starUnfilled}
        alt={i < validRating ? "filled star" : "unfilled star"}
        style={{ width: "18px", height: "18px" }}
      />
    );
  }
  return (
    <div className="d-flex" style={{ gap: "5px" }}>
      {starElements}
    </div>
  );
};

const TestimonialCard = (props) => {
  return (
    <div className="bg-white col-12 p-3" style={{ borderRadius: "15px" }}>
      <div
        className="container p-0 d-flex flex-column justify-content-between"
        style={{ height: "180px" }}
      >
        <div className="rating d-flex">
          <Rating rating={props.rating}></Rating>
        </div>
        <div className="details">
          <h4 className="m-0">{props.title}</h4>
          <p className="m-0 text-muted">{props.body}</p>
        </div>
        <div className="user d-flex">
          <img
            src={props.user.img}
            alt={`${props.user.name} profile`}
            className="rounded-circle img-fluid mr-2"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="user-details">
            <p className="text-secondary font-weight-bold m-0">
              {props.user.name}
            </p>
            <p className="text-muted small m-0">{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  return (
    <section id="testimonial-section" className="bg-green">
      <div className="container">
        <h2 className="text-white text-center pb-4">Our Customers love us!</h2>
        <div id="testimonials" className="my-5 row justify-content-center">
          {testimonials.map((item) => (
            <div className="col-8 col-md-6 col-lg-3 p-2" key={item.id}>
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
