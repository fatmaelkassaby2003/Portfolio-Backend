import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="navbar">
            <nav className="container">
                <Link to="/" id="logo">
                    FATMA<span>.DEV</span>
                </Link>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/skills">Skills</Link></li>
                    <li><Link to="/projects">Work</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
