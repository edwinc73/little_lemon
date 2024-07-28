import footerLogo from "../../images/footerLogo 1.png";

const doormatNav = [
  { name: "Home", link: "/" },
  { name: "About", link: "/" },
  { name: "Menu", link: "/" },
  { name: "Order Online", link: "/" },
  { name: "Reservation", link: "/" },
  { name: "Login", link: "/" },
];

const contacts = [
  { name: "Address", link: "/" },
  { name: "Phone Number", link: "/" },
  { name: "Email", link: "/" },
];

const FooterContainer = ({ children }) => {
  return (
    <div className="col-md-3 col-12 my-4 d-flex flex-column">{children}</div>
  );
};

const FootNavCol = ({ title, arr }) => {
  return (
    <FooterContainer>
      <h4 className="text-yellow text-md-left align-items-left mb-4 text-center">
        {title}
      </h4>
      <ul className="list-unstyled">
        {arr.map(({ name, link }) => (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-white"
            key={title + name}
          >
            <li className="text-md-left align-items-left text-center">
              <p className="small my-2 pd-0">{name}</p>
            </li>
          </a>
        ))}
      </ul>
    </FooterContainer>
  );
};

export default function Footer() {
  return (
    <footer className="bg-green">
      <div className="container" style={{ padding: "90px 0" }}>
        <div className="row align-item-md-left">
          <FooterContainer>
            <img
              style={{
                minHeight: "120px",
                maxHeight: "260px",
              }}
              src={footerLogo}
              alt="little lemon footer logo"
              className="img-fluid mx-auto"
            />
          </FooterContainer>
          <FootNavCol title="Doormat Navigation" arr={doormatNav}></FootNavCol>
          <FootNavCol title="Contact" arr={contacts}></FootNavCol>
          <FootNavCol title="Social Media" arr={contacts}></FootNavCol>
        </div>
      </div>
    </footer>
  );
}
