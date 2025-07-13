// src/Pages/FormBuilder.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { generateFormWithGPT } from '../services/service';
import jsPDF from 'jspdf';
import { db } from '../firebase';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';

const FormBuilder = () => {
    const {
        user,
        isLoggedIn,
        userPlan,
        formsUsed,
        setFormsUsed
    } = useUser();

    const [formPurpose, setFormPurpose] = useState('');
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [savedForms, setSavedForms] = useState([]);

    // 🌍 You can make this dynamic later
    const userCountry = 'Afghanistan';

    const handleGenerate = async () => {
        if (!formPurpose.trim()) {
            alert('Please enter a form purpose');
            return;
        }

        setLoading(true);
        setError('');
        setFields([]);

        const prompt = `
Generate a JSON array of standard form fields for: "${formPurpose}".
Country: ${userCountry}
Each field should have: 
- label
- type [text, email, number, date, textarea, select, checkbox]
- required
- options (if select)
- default (if possible, based on: ${JSON.stringify(user || {})})

Return ONLY valid JSON array.
Example: [
  {
    "label": "Full Name",
    "type": "text",
    "required": true,
    "default": "John Doe"
  }
]
    `;

        try {
            const result = await generateFormWithGPT(prompt);

            const jsonStart = result.indexOf('[');
            const jsonEnd = result.lastIndexOf(']') + 1;
            const json = result.slice(jsonStart, jsonEnd);

            const parsed = JSON.parse(json);
            setFields(parsed);

        } catch (err) {
            console.error('❌ GPT Error:', err);
            setError('Failed to generate form. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        const docPdf = new jsPDF();
        docPdf.text(`Form: ${formPurpose}`, 10, 10);
        fields.forEach((field, i) => {
            docPdf.text(`${i + 1}. ${field.label} (${field.type})`, 10, 20 + i * 10);
        });
        docPdf.save(`${formPurpose.replace(/\s+/g, '_')}_form.pdf`);
    };

    const handleSaveForm = async () => {
        if (!user) return alert('🔒 Please log in to save');

        const formDoc = {
            purpose: formPurpose,
            fields,
            userId: user.uid,
            createdAt: new Date().toISOString()
        };

        await addDoc(collection(db, 'forms'), formDoc);
        alert('✅ Form saved!');
        fetchSavedForms();
    };

    const fetchSavedForms = async () => {
        if (!user) return;
        const snapshot = await getDocs(collection(db, 'forms'));
        const data = snapshot.docs
            .filter(doc => doc.data().userId === user.uid)
            .map(doc => ({ id: doc.id, ...doc.data() }));

        setSavedForms(data);
    };

    const deleteForm = async (id) => {
        await deleteDoc(doc(db, 'forms', id));
        fetchSavedForms();
    };

    useEffect(() => {
        fetchSavedForms();
    }, [user]);

    return (
        <div className="p-6 max-w-4xl mx-auto dark:text-white text-black">
            <h2 className="text-2xl font-bold mb-4">AutoForm Builder</h2>

            <input
                type="text"
                value={formPurpose}
                onChange={(e) => setFormPurpose(e.target.value)}
                placeholder="e.g. Rental Agreement, Job Application..."
                className="w-full px-4 py-2 border rounded mb-4 dark:bg-black dark:border-white"
            />

            <div className="flex gap-4 mb-6 flex-wrap">
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    {loading ? 'Generating...' : 'Generate Form'}
                </button>

                {fields.length > 0 && (
                    <>
                        <button
                            onClick={handleDownloadPDF}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                        >
                            Download PDF
                        </button>
                        <button
                            onClick={handleSaveForm}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded"
                        >
                            Save Form
                        </button>
                    </>
                )}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-4">
                {fields.map((field, idx) => (
                    <div
                        key={idx}
                        className="border p-4 rounded bg-white dark:bg-black dark:border-white"
                    >
                        <label className="font-bold block mb-1">{field.label}</label>
                        {field.type === 'select' ? (
                            <select className="w-full px-3 py-2 border rounded dark:bg-black dark:border-white">
                                {field.options?.map((opt, i) => (
                                    <option key={i}>{opt}</option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                className="w-full px-3 py-2 border rounded dark:bg-black dark:border-white"
                                rows={4}
                            />
                        ) : (
                            <input
                                type={field.type}
                                defaultValue={field.default || ''}
                                className="w-full px-3 py-2 border rounded dark:bg-black dark:border-white"
                            />
                        )}
                    </div>
                ))}
            </div>

            {savedForms.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-3">Saved Forms</h3>
                    <ul className="space-y-2">
                        {savedForms.map((form) => (
                            <li
                                key={form.id}
                                className="border p-3 rounded flex justify-between items-center dark:bg-black dark:border-white"
                            >
                                <span>{form.purpose}</span>
                                <button
                                    onClick={() => deleteForm(form.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FormBuilder;





