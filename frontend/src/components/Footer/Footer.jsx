import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h1>About Us</h1>
          <p>
            We are a company dedicated to providing the best services to our
            customers.
          </p>
        </div>
        <div className="footer-section links">
          <h1>Quick Links</h1>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h1>Contact Us</h1>
          <p>Email: contact@company.com</p>
          <p>Phone: +123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
