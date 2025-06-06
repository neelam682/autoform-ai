import React from 'react';

export default function TrustPage() {
    return (
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1>🚀 Help Fund the Next Version of AutoForm AI</h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "1rem auto" }}>
                Want smarter autofill, multi-language support, and voice input? Support this project and unlock advanced features sooner!
            </p>
            <a
                href="https://trustwallet.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "inline-block",
                    marginTop: "20px",
                    padding: "12px 24px",
                    fontSize: "16px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                }}
            >
                🚀 Fund via Trust Wallet
            </a>
        </div>
    );
}

