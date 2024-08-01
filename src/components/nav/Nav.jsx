import logo from "../../images/Logo.svg";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ link, name, active }) => {
  return (
    <li className={`nav-item`} key={name}>
      <NavLink
        to={link}
        className={`${({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""} nav-link `}
      >
        {name} {active && <span className="sr-only">(current)</span>}
      </NavLink>
    </li>
  );
};

export default function Nav() {
  const navLink = [
    { link: "/", name: "Home", active: true },
    { link: "/about", name: "About", active: false },
    { link: "/menu", name: "Menu", active: false },
    { link: "/reservation", name: "Reservations", active: false },
    { link: "/orderonline", name: "Order Online", active: false },
    { link: "/login", name: "Login", active: false },
  ];

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <NavLink to="/" className="nav-link">
          <img
            src={logo}
            alt="Little Lemon Logo"
            id="logo"
            className="img-fluid"
            style={{ minHeight: "47px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ml-auto">
            {navLink.map(({ link, name, active }) => {
              return (
                <NavLinkComponent
                  link={link}
                  name={name}
                  active={active}
                  key={name}
                ></NavLinkComponent>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
