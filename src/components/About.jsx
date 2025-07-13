import React from 'react';

const About = () => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black px-6 py-20">
            <div className="relative w-full max-w-2xl bg-black text-white font-serif leading-relaxed tracking-wide p-8 border border-white rounded-xl shadow-lg overflow-hidden">

                {/* Folded corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white text-black text-xs font-bold rotate-45 translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center">
                    📄
                </div>

                {/* Letter Body */}
                <h2 className="text-4xl font-bold mb-4">Dear Reader,</h2>

                <p className="text-lg mb-6">
                    Welcome to <strong>AutoForm AI</strong> — where your first answer becomes your last.
                    Instead of rewriting your name, history, and details over and over, we remember them all for you.
                </p>

                <p className="text-lg mb-6">
                    Imagine filling out one form — and having the next 10 done for you. Fast, consistent, and personal.
                </p>

                <p className="text-lg mb-10">
                    Our mission is to make paperwork... vanish.
                </p>

                <p className="text-lg italic text-white/80" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Yours truly,
                    <br />
                    — AutoForm AI Team ✍️
                </p>
            </div>
        </section>
    );
};

export default About;



