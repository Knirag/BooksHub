import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiSpellBook } from "react-icons/gi";
import "../App.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { title: "Home", link: "/" },
    { title: "Upload", link: "/uploadbooks" },
    { title: "My Books", link: "/mybooks" },
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
<form action="" className="search-bar">
  <input type="search" name="search" pattern=".*\S.*" required/>
  <button className="search-btn" type="submit">
    <span>Search</span>
  </button>
</form>
      </nav>
    </header>
  );
};

export default NavBar;
