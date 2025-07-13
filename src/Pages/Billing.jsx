import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '../context/UserContext';

const Billing = () => {
    const { user } = useUser();
    const [billingHistory, setBillingHistory] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchBilling = async () => {
            const q = query(
                collection(db, 'billing'),
                where('userId', '==', user.uid)
            );
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => doc.data());
            setBillingHistory(data);
        };

        fetchBilling();
    }, [user]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Billing</h1>

            <section className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Your Plan</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You are currently on the <strong>{user?.plan || 'Free'}</strong> plan.
                </p>
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition">
                    Upgrade to Pro
                </button>
            </section>

            <section className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Billing History</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-300">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Plan</th>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingHistory.length === 0 ? (
                                <tr><td colSpan="4" className="px-4 py-4 text-center">No billing history yet.</td></tr>
                            ) : (
                                billingHistory.map((item, index) => (
                                    <tr key={index} className="border-b dark:border-gray-700">
                                        <td className="py-2 px-4">{item.date}</td>
                                        <td className="py-2 px-4">{item.plan}</td>
                                        <td className="py-2 px-4">${item.amount.toFixed(2)}</td>
                                        <td className="py-2 px-4">{item.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Billing;


