import logo from "../../images/Logo.svg";

const NavLink = ({ link, name, active }) => {
  return (
    <li className={`nav-item ${active ? "active" : ""}`}>
      <a className="nav-link" href={link}>
        {name} {active && <span class="sr-only">(current)</span>}
      </a>
    </li>
  );
};

export default function Nav() {
  const navLink = [
    { link: "#", name: "Home", active: true },
    { link: "#", name: "About", active: false },
    { link: "#", name: "Menu", active: false },
    { link: "#", name: "Reservations", active: false },
    { link: "#", name: "Order Online", active: false },
    { link: "#", name: "Login", active: false },
  ];

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light py-3">
        <a href="#">
          <img
            src={logo}
            alt="Little Lemon Logo"
            id="logo"
            className="img-fluid"
            style={{ minHeight: "47px" }}
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ml-auto">
            {navLink.map(({ link, name, active }) => {
              return (
                <NavLink link={link} name={name} active={active}></NavLink>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
