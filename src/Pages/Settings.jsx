import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Settings = () => {
    const user = auth.currentUser;
    const [name, setName] = useState('');
    const [email, setEmail] = useState(user?.email || '');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!user) return;
        const fetchUser = async () => {
            const docRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(docRef);
            if (userSnap.exists()) {
                setName(userSnap.data().name || '');
            }
            setLoading(false);
        };
        fetchUser();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), { name });
            setStatus('✅ Name updated!');
        } catch (error) {
            console.error('Error updating user:', error);
            setStatus('❌ Failed to update.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Settings</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-600 dark:text-gray-300">Name</label>
                        <input
                            className="w-full p-2 border rounded bg-white dark:bg-gray-900 dark:border-gray-700 text-black dark:text-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 dark:text-gray-300">Email</label>
                        <input
                            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-800 text-gray-500"
                            value={email}
                            readOnly
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Save Changes
                    </button>

                    {status && <p className="mt-2 text-sm">{status}</p>}
                </>
            )}
        </div>
    );
};

export default Settings;

