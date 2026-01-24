import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/economicCompass.png';
import AvatarMenu from '../Layouts/AvatarMenu';
import useStore from '../../hooks/useStore';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { loggedInMember } = useStore((state) => state);

  const mainLinks = [
    { icon: 'fa-home', text: 'Dashboard', to: '/' },
    { icon: 'fa-newspaper-o', text: 'News', to: '/news' },
    { icon: 'fa-calendar', text: 'Calendar', to: '/calendar' },
    { icon: 'fa-calculator', text: 'Calculator', to: '/calculator' },
  ];

  const additionalLinks = loggedInMember
    ? [
        {
          icon: 'fa-cogs',
          text: 'Edit Profile & Preferences',
          to: '/edit-profile',
        },
        { icon: 'fa-sign-out', text: 'Log Out', to: '#' },
      ]
    : [
        { icon: 'fa-sign-in', text: 'Login', to: '/login' },
        { icon: 'fa-user-plus', text: 'Signup', to: '/signup' },
      ];

  return (
    <nav
      className={`main-menu ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className="sidebar-logo">
        <Link to="/">
          <img src={Logo} alt="Economic Compass Logo" className="logo-image" />
        </Link>
      </div>

      {/* Main Navigation Links */}
      <ul>
        {mainLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>
              <i className={`fa ${link.icon} fa-2x`}></i>
              <span className="nav-text">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="sidebar-divider"></div>

      {/* Additional Links */}
      <ul>
        {additionalLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>
              <i className={`fa ${link.icon} fa-2x`}></i>
              <span className="nav-text">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Avatar Menu at Bottom (only for logged-in users) */}
      {loggedInMember && (
        <div className="sidebar-avatar">
          <AvatarMenu />
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
