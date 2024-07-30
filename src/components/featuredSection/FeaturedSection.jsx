import greekSaladImage from "../../images/greek salad.jpg";
import bruchettaImage from "../../images/bruchetta.png";
import greekImage from "../../images/lemon dessert.jpg";
import deliveryIcon from "../../images/Delivery.svg";
import Button from "../button/Button";

const recipeData = [
  {
    id: 1,
    name: "Greek Salad",
    src: greekSaladImage,
    price: "12.99",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. ",
  },
  {
    id: 2,
    name: " Bruchetta",
    src: bruchettaImage,
    price: "5.99",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
  },
  {
    id: 3,
    name: "Greek Lemon Dessert",
    src: greekImage,
    price: "5.00",
    description:
      "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
  },
];

const imageHeight = { height: "230px" };
const cardBorderRadius = "15px";

const SpecialsCard = ({ id, name, src, price, description }) => {
  return (
    <article
      className="col-12 bg-gray px-0"
      style={{ borderRadius: cardBorderRadius }}
    >
      <img
        loading="lazy"
        src={src}
        className="img-fluid w-100"
        alt={`Delicious ${name}`}
        style={{
          objectFit: "cover",
          borderRadius: `${cardBorderRadius} ${cardBorderRadius} 0 0`,
          ...imageHeight,
        }}
      />
      <div
        className="details container d-flex flex-column px-3 py-2"
        style={{
          maxHeight: imageHeight.height,
          minHeight: "90px",
          boxSizing: "border-box",
        }}
      >
        <span className="d-flex flex-column flex-lg-row align-items-center mt-3 mb-1">
          <p className="card-title col-12 col-lg-9 col-md-12 p-0 m-0">{name}</p>
          <p className="pill col-12 col-lg-3 text-center py-lg-1 m-0 mr-auto">
            ${price}
          </p>
        </span>
        <p
          className="text-green p-0 m-0 d-none d-lg-block"
          style={{ height: "130px" }}
        >
          {description}
        </p>
        <a
          href="/"
          className="text-green justify-self-end font-weight-bold mt-auto"
        >
          Order Delivery
          <img
            loading="lazy"
            src={deliveryIcon}
            style={{ height: "15px" }}
            alt="delivery icon"
            className="ml-2"
          />
        </a>
      </div>
    </article>
  );
};

export default function FeaturedSection() {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="row mb-5 text-center text-md-left">
          <h2 className="m-0 col-12 col-md-8 mb-2 mb-md-0">
            This week’s specials!
          </h2>
          <Button className="btn ml-auto my-auto mx-auto ml-md-auto mr-md-0 bg-yellow">
            Order Online
          </Button>
        </div>
        <div className="row">
          {recipeData.map((item) => (
            <div className="col-md-4 col-12 p-2" key={item.id}>
              <SpecialsCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
