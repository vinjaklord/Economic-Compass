import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h1>About Us</h1>
          <p>
            At Economic Compass, we provide essential tools for forex traders in
            one place. From real-time news and economic calendars to advanced
            calculators, our platform empowers you to stay informed and make
            smarter trading decisions—whether you&apos;re a beginner or a
            seasoned trader.
          </p>
        </div>
        <div className="footer-section footer-links">
          <h1>Quick Links</h1>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section footer-contact">
          <h1>Contact</h1>
          <p>Email: aronpozsar@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Economic Compass. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
