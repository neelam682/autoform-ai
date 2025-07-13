import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
    collection,
    query,
    where,
    getDocs,
    serverTimestamp,
    addDoc,
    doc,
    getDoc,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('User');
    const navigate = useNavigate();

    const user = auth.currentUser;

    useEffect(() => {
        if (!user) {
            navigate('/'); // Redirect if not logged in
        }
    }, [user, navigate]);

    // Fetch user's name from Firestore
    useEffect(() => {
        if (!user) return;

        const fetchUserName = async () => {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                setUserName(userDoc.data().name || 'User');
            }
        };

        fetchUserName();
    }, [user]);

    // Fetch user forms
    useEffect(() => {
        if (!user) {
            setForms([]);
            setLoading(false);
            return;
        }

        const fetchForms = async () => {
            setLoading(true);
            try {
                const formsRef = collection(db, 'forms');
                const q = query(formsRef, where('ownerId', '==', user.uid));
                const querySnapshot = await getDocs(q);

                const userForms = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setForms(userForms);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
            setLoading(false);
        };

        fetchForms();
    }, [user]);

    // Group forms count by creation month for the chart
    const groupedData = forms.reduce((acc, form) => {
        if (!form.createdAt?.toDate) return acc; // skip if no date
        const date = form.createdAt.toDate();
        const monthKey = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' }); // e.g. "2025 Jul"
        const item = acc.find((d) => d.month === monthKey);
        if (item) {
            item.count += 1;
        } else {
            acc.push({ month: monthKey, count: 1 });
        }
        return acc;
    }, []);

    // Sort data by month ascending (simple string sort may not be perfect; for demo only)
    groupedData.sort((a, b) => (a.month > b.month ? 1 : -1));

    // Add new form handler
    const handleAddForm = async () => {
        if (!user) return;
        try {
            const newForm = {
                title: 'New Form',
                ownerId: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                fields: [],
            };
            const docRef = await addDoc(collection(db, 'forms'), newForm);
            setForms((prev) => [...prev, { id: docRef.id, ...newForm }]);
            navigate(`/form-builder?id=${docRef.id}`);
        } catch (error) {
            console.error('Error adding form:', error);
        }
    };

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto transition-colors duration-300 bg-white dark:bg-gray-900">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Welcome back, <span className="text-blue-600 dark:text-blue-400">{userName}</span>!
                </h1>
            </div>

            {/* Chart section */}
            <section className="mb-10 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Forms Created Over Time
                </h2>

                {groupedData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={groupedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <XAxis dataKey="month" stroke="#8884d8" />
                            <YAxis allowDecimals={false} stroke="#8884d8" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3182ce" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No form data to display.</p>
                )}
            </section>

            {/* Forms list */}
            {loading && <p className="text-gray-700 dark:text-gray-300">Loading your forms...</p>}

            {!loading && forms.length === 0 && (
                <p className="text-gray-600 dark:text-gray-400">
                    You have no forms yet. Click the button below to create your first form.
                </p>
            )}

            {!loading && forms.length > 0 && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {forms.map((form) => (
                        <li
                            key={form.id}
                            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <Link
                                to={`/form-builder?id=${form.id}`}
                                className="text-xl font-semibold text-gray-900 dark:text-white hover:underline truncate"
                                title={form.title}
                            >
                                {form.title}
                            </Link>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Created:{' '}
                                {form.createdAt?.toDate
                                    ? form.createdAt.toDate().toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })
                                    : 'Unknown'}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={handleAddForm}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                aria-label="Add new form"
            >
                + Add New Form
            </button>
        </div>
    );
};

export default Dashboard;










