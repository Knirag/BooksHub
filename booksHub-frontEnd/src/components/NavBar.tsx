import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiSpellBook } from "react-icons/gi";
import "../App.css";

interface NavigationItem {
  title: string;
  link: string;
}

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems: NavigationItem[] = [
    { title: "Home", link: "/" },
    { title: "Upload", link: "/uploadbooks" },
    { title: "My Books", link: "/mybooks" },
    { title: "Browse Library", link: "/allbooks" },
  ];

  return (
    <header className={`navbar ${isSticky ? "sticky" : ""}`}>
      <nav className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <GiSpellBook className="logo" />
            <h2 className="logo-text">BooksHub</h2>
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {navigationItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.link} className="nav-link">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
