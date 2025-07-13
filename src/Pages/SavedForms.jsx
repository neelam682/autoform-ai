// src/Pages/SavedForms.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SavedForms = () => {
    const { user } = useUser();
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            if (!user) return;

            const q = query(collection(db, 'forms'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const userForms = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setForms(userForms);
            setLoading(false);
        };

        fetchForms();
    }, [user]);

    const handleDelete = async (formId) => {
        if (!window.confirm("Are you sure you want to delete this form?")) return;

        await deleteDoc(doc(db, 'forms', formId));
        setForms(prev => prev.filter(f => f.id !== formId));
    };

    if (loading) return <p className="text-center text-gray-500">Loading saved forms...</p>;

    if (forms.length === 0) return (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No saved forms yet. Start by creating one!
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Saved Forms</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {forms.map(form => (
                    <div key={form.id} className="bg-white dark:bg-[#111827] border dark:border-white/10 rounded-xl shadow p-4 flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{form.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {form.fields?.length || 0} fields | Created {form.createdAt?.toDate().toLocaleDateString()}
                        </p>

                        <div className="mt-auto flex gap-2">
                            <button
                                onClick={() => navigate(`/form-builder?id=${form.id}`)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(form.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedForms;


