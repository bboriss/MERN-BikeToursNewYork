import "./Footer.css";

const Footer = (props) => {
  return (
    <footer className="Footer">
      <div>{props.children}</div>
      <small>&copy; Stevanovic Boris 2022</small>
    </footer>
  );
};

export default Footer;
