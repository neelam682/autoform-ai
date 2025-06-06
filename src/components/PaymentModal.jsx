import React, { useState } from "react";

const PaymentModal = ({ onClose, onSuccess, user }) => {
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        setProcessing(true);

        // Simulate async payment process (replace with real payment integration)
        setTimeout(() => {
            setProcessing(false);
            onSuccess();
        }, 2500);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: "30px 40px",
                    width: 350,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    textAlign: "center",
                    fontFamily: "Arial",
                }}
            >
                <h2 style={{ marginBottom: 15 }}>🔒 Payment Required</h2>
                <p style={{ marginBottom: 20 }}>
                    Hello {user.name}, to generate forms you need to make a payment.
                </p>

                <button
                    onClick={handlePayment}
                    disabled={processing}
                    style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#05071A",
                        color: "#fff",
                        cursor: processing ? "not-allowed" : "pointer",
                        width: "100%",
                    }}
                >
                    {processing ? "Processing..." : "Pay Now"}
                </button>

                <button
                    onClick={onClose}
                    disabled={processing}
                    style={{
                        marginTop: "15px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#05071A",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;

