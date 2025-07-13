import React from 'react';
import heroImage from '../assets/Fill out-amico.svg'; // 🔁 Replace with your actual image path
import { ArrowRightIcon } from '@heroicons/react/24/solid'; // or /outline for outline style


const Hero = ({ onLoginClick }) => {
    return (
        <section className="w-full bg-white px-6 py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Side: Text */}
                <div className="flex items-start md:w-1/2 space-x-6">
                    <div className="relative w-1 h-[200px] mt-2 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400 rounded-full">
                        {/* Animated glowing dot */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] animate-glow-dot"></div>
                    </div>


                    {/* Text content */}
                    <div className="text-left">
                        <h1
                            className="text-[2.8rem] md:text-[4.2rem] font-black leading-tight text-gray-900 tracking-tight"
                            style={{
                                fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                            }}
                        >
                            Meet <span className="glass-text">AutoForm AI</span>
                            <br />
                            The Smarter Way to Fill Forms.
                        </h1>
                        <p className="mt-5 text-[1.125rem] md:text-lg text-gray-600 leading-relaxed max-w-lg tracking-wide">
                            Never start from scratch again. AutoForm AI remembers your answers, builds smarter forms, and helps you complete any application in seconds.
                        </p>
                        <button
                            onClick={onLoginClick}
                            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-6 py-3 rounded-md transition-colors duration-300 ease-in-out flex items-center space-x-2"
                            style={{ boxShadow: 'none' }}
                            type="button"
                        >
                            <span>Try Free</span>
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>

                    </div>
                </div>




                {/* Right Side: Image or 3D */}
                <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
                    <div className="group w-full max-w-md md:max-w-lg">
                        <img
                            src={heroImage}
                            alt="AutoForm preview"
                            className="w-full transition-transform duration-1000 ease-in-out group-hover:animate-spin-y-once"
                        />
                    </div>



                </div>
            </div>

            {/* Water drop emojis */}
            <span
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '30%',
                    fontSize: '24px',
                    animation: 'float-drop 6s ease-in-out infinite',
                    color: '#2563eb',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
                aria-label="water drop"
                role="img"
            >
                💧
            </span>

            <span
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '65%',
                    fontSize: '20px',
                    animation: 'float-drop 7s ease-in-out infinite',
                    color: '#2563eb',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
                aria-label="water drop"
                role="img"
            >
                💧
            </span>

            <span
                style={{
                    position: 'absolute',
                    top: '35%',
                    left: '45%',
                    fontSize: '16px',
                    animation: 'float-drop 8s ease-in-out infinite',
                    color: '#2563eb',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
                aria-label="water drop"
                role="img"
            >
                💧
            </span>

            <span
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: '20%',
                    fontSize: '18px',
                    animation: 'float-drop 5.5s ease-in-out infinite',
                    color: '#2563eb',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}
                aria-label="water drop"
                role="img"
            >
                💧
            </span>
        </section>
    );
};

export default Hero;
