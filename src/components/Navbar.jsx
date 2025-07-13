import React, { useState } from 'react';
import { DocumentIcon } from '@heroicons/react/24/solid';


const navItemsLeft = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricingplans' },
];
const navItemsRight = [
    { name: 'About', href: '/#about' },
];

const Navbar = ({ onLoginClick }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null); // For demo, no routing

    // Helper for nav item classes
    const navItemClass = (isTryFree = false, isActive = false) => {
        if (isTryFree) {
            return `relative inline-block px-4 py-2 bg-black text-white font-semibold transition duration-200 rounded-md`;
        }

        return `
    relative inline-block px-4 py-2 text-gray-800 font-medium transition duration-200
    before:content-[''] before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-6 before:h-0.5 before:bg-black before:transition-all before:duration-300
    after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-black after:transition-all after:duration-300
    hover:before:w-full hover:after:w-full hover:bg-black hover:text-white
    ${isActive ? 'bg-black text-white before:w-full after:w-full' : ''}
  `;
    };




    return (
        <nav className="w-full bg-white shadow-md sticky top-0 z-50" style={{ height: '90px' }}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative">
                {/* Left nav items */}
                <div className="hidden md:flex items-center absolute left-6 top-1/2 -translate-y-1/2 space-x-4">
                    {navItemsLeft.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={() => setActiveItem(name)}
                            className={navItemClass(false, activeItem === name)}
                        >
                            {name}
                        </a>

                    ))}
                </div>

                {/* Centered Logo */}
                <div className="flex-shrink-0 mx-auto flex items-center text-black font-bold text-2xl cursor-pointer select-none">
                    <DocumentIcon className="h-6 w-6 mr-2" />
                    AutoForm AI
                </div>

                {/* Right nav items */}
                <div className="hidden md:flex items-center absolute right-6 top-1/2 -translate-y-1/2 space-x-4">
                    {navItemsRight.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            onClick={() => setActiveItem(name)}
                            className={navItemClass(false, activeItem === name)}

                        >
                            {name}
                        </a>
                    ))}
                    {/* Try Free black button */}
                    <button
                        onClick={() => {
                            console.log("Try Free clicked!");
                            setActiveItem('Try Free');
                            onLoginClick();
                        }}
                        className={navItemClass(true, activeItem === 'Try Free')}
                        style={{ borderRadius: '12px' }}
                        type="button"
                    >
                        Try Free
                    </button>



                </div>

                {/* Mobile menu button */}
                <div className="md:hidden ml-auto">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                        className="text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-black rounded-md"
                    >
                        {mobileMenuOpen ? (
                            // Close icon (X)
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden px-4 pt-3 pb-4">
                    <div className="bg-black rounded-xl shadow-lg">
                        <ul className="flex flex-col space-y-1 py-3 px-4">
                            {[...navItemsLeft, ...navItemsRight].map(({ name, href }) => (
                                <li key={name}>
                                    <a
                                        href={href}
                                        onClick={() => {
                                            setActiveItem(name);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 rounded-md text-white hover:bg-gray-800 transition"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}

                            {/* Fix: Only ONE <li> */}
                            <li>
                                <button
                                    onClick={() => {
                                        setActiveItem('Try Free');
                                        setMobileMenuOpen(false);
                                        onLoginClick();
                                    }}
                                    className="block w-full px-4 py-2 rounded-md bg-white text-black font-semibold text-center hover:bg-gray-100 transition"
                                    type="button"
                                >
                                    Try Free
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
