import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const LoginModal = ({ show, onClose, selectedPlan, onSuccess }) => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // ✅ Track loading state

    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // ✅ Start loading

        try {
            if (mode === 'signup') {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', userCred.user.uid), {
                    name,
                    email,
                    createdAt: new Date(),
                });
                alert('Account created!');
                onSuccess();
                onClose();
            } else if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Logged in!');
                onSuccess();
                onClose();
            } else if (mode === 'reset') {
                await sendPasswordResetEmail(auth, email);
                alert('Password reset link sent!');
                onClose();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // ✅ End loading
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
            <div className="bg-black text-white p-8 rounded-2xl w-full max-w-md relative shadow-2xl border border-white">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center capitalize">
                    {mode === 'login' && 'Log In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'reset' && 'Reset Password'}
                </h2>

                {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full bg-black border border-white rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white font-semibold"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full bg-black border border-white rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white font-semibold"
                    />

                    {mode !== 'reset' && (
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full bg-black border border-white rounded-md px-4 py-3 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white font-semibold"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-white text-black font-bold py-3 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                            }`}
                    >
                        {loading
                            ? '⏳ Please wait...'
                            : mode === 'login'
                                ? 'Log In'
                                : mode === 'signup'
                                    ? 'Sign Up'
                                    : 'Send Reset Link'}
                    </button>
                </form>

                <div className="text-sm mt-6 text-center space-y-2">
                    {mode === 'login' && (
                        <>
                            <p>
                                Don’t have an account?{' '}
                                <button
                                    onClick={() => setMode('signup')}
                                    className="underline hover:text-gray-300"
                                    disabled={loading}
                                >
                                    Sign Up
                                </button>
                            </p>
                            <p>
                                Forgot password?{' '}
                                <button
                                    onClick={() => setMode('reset')}
                                    className="underline hover:text-gray-300"
                                    disabled={loading}
                                >
                                    Reset
                                </button>
                            </p>
                        </>
                    )}
                    {mode === 'signup' && (
                        <p>
                            Already have an account?{' '}
                            <button
                                onClick={() => setMode('login')}
                                className="underline hover:text-gray-300"
                                disabled={loading}
                            >
                                Log In
                            </button>
                        </p>
                    )}
                    {mode === 'reset' && (
                        <p>
                            Back to{' '}
                            <button
                                onClick={() => setMode('login')}
                                className="underline hover:text-gray-300"
                                disabled={loading}
                            >
                                Log In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;















