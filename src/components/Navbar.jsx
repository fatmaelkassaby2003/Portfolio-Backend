import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="navbar">
            <nav className="container">
                <Link to="/" id="logo" onClick={closeMenu}>
                    FATMA<span>.DEV</span>
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                    <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                    <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
                    <li><NavLink to="/skills" onClick={closeMenu}>Skills</NavLink></li>
                    <li><NavLink to="/projects" onClick={closeMenu}>Work</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
