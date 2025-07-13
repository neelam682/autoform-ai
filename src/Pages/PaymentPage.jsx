import React from 'react';

const PaymentPage = () => (
    <div className="w-full flex justify-center items-center py-12">
        <svg viewBox="0 0 800 200" className="w-full max-w-2xl">
            <defs>
                <pattern id="wave-pattern" x="0" y="0" width="200" height="50" patternUnits="userSpaceOnUse">
                    <path
                        d="M0 25 C 50 15, 150 35, 200 25 V50 H0 Z"
                        fill="#fff"
                        opacity="0.3"
                    >
                        <animateTransform
                            attributeName="patternTransform"
                            type="translate"
                            from="0 0" to="200 0"
                            begin="0s"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </path>
                </pattern>

                <mask id="text-mask">
                    <text x="50%" y="50%" textAnchor="middle" dy=".35em"
                        fontSize="80" fontWeight="900" fontFamily="SF Pro Display"
                        fill="#fff">
                        AutoForm AI
                    </text>
                </mask>
            </defs>

            <rect
                x="0" y="0" width="100%" height="100%"
                fill="url(#wave-pattern)"
                mask="url(#text-mask)"
            />

            <text x="50%" y="50%" textAnchor="middle" dy=".35em"
                fontSize="80" fontWeight="900" fontFamily="SF Pro Display"
                fill="#111">
                AutoForm AI
            </text>
        </svg>
    </div>
);

export default PaymentPage;
