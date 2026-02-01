import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Fatma Elkassaby. All rights reserved.</p>
                <div style={{ marginTop: '5px', fontSize: '12px', opacity: 0.7 }}>
                    Backend Developer | Laravel & PHP Specialist
                </div>
            </div>
        </footer>
    );
};

export default Footer;
