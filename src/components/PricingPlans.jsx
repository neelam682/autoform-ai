// src/components/PricingPlans.jsx
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        description: 'Get started with 3 form generations.',
        features: ['Save personal data', '1-click fill', '3 forms/month'],
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '$12/mo',
        description: 'For individuals who fill forms frequently.',
        features: ['Unlimited forms', 'Smart memory', 'Auto PDF export'],
        highlighted: true,
    },
    {
        name: 'Team',
        price: '$25/mo',
        description: 'Best for small teams & agencies.',
        features: ['All Pro features', 'Multi-user access', 'Data sync'],
        highlighted: false,
    },
];




const PricingPlans = ({ onLoginClick, onProClick, disableButtons }) => {
    return (
        <section className="bg-black text-white px-6 py-20">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Simple Plans, Powerful Results</h2>
                <p className="text-white/70 max-w-xl mx-auto mb-12 text-lg">
                    Whether you're filling one form or a hundred — AutoForm AI scales with you.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-6 border rounded-2xl transition-transform hover:scale-105 ${plan.highlighted ? 'border-white shadow-xl bg-white text-black' : 'border-gray-600'
                                }`}
                        >
                            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-4">{plan.price}</p>
                            <p className="text-sm mb-6">{plan.description}</p>
                            <ul className="text-sm space-y-2 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center space-x-2">
                                        <CheckIcon className="h-5 w-5 text-green-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => {
                                    if (plan.name === 'Starter') {
                                        onLoginClick('free');
                                    } else {
                                        onLoginClick(plan.name.toLowerCase());
                                    }
                                }}
                                disabled={disableButtons}
                                className={`w-full py-2 px-4 rounded-md font-semibold transition ${disableButtons ? 'opacity-50 cursor-not-allowed' :
                                        plan.highlighted
                                            ? 'bg-black text-white hover:bg-gray-900'
                                            : 'bg-white text-black hover:bg-gray-200'
                                    }`}
                            >
                                {plan.name === 'Starter' ? 'Start Free' : 'Get Started'}
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingPlans;

