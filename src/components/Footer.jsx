// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-gray-500 text-sm py-6 border-t bg-gray-50">
            © {new Date().getFullYear()} AutoForm AI — All rights reserved.
        </footer>
    );
};

export default Footer;
