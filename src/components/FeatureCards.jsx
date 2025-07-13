import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline'; // or /solid
import { BoltIcon } from '@heroicons/react/24/outline'; // or /solid if needed
import { CheckCircleIcon } from '@heroicons/react/24/outline'; // or /solid if needed





const features = [
    {
        icon: <SparklesIcon className="h-8 w-8 text-white" />,
        title: 'Learns You Instantly',
        description: 'AutoForm AI adapts to your answers and remembers everything to auto-fill future forms.',
        note: '⏱ Saves 3 minutes/form',
    },
    {
        icon: <BoltIcon className="h-8 w-8 text-white" />,
        title: 'Fills 10x Faster',
        description: 'No more typing the same things over and over — one click fills everything.',
        note: '⚡ Powered by your past data',
    },
    {
        icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
        title: 'Never Miss a Field',
        description: 'AutoForm ensures every field is filled smartly, reducing errors and rejections.',
        note: '✔️ Precision Applied',
    },
];

const FeatureCards = () => {
    return (
        <section className="bg-white py-24 px-6 text-gray-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">How It Solves Your Problem</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-black text-white p-6 rounded-2xl shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-white/80 text-sm mb-4">{feature.description}</p>
                            <div className="absolute bottom-3 right-4 text-xs text-white/40 italic">
                                {feature.note}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;



