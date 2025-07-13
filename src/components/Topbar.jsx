// src/components/Topbar.jsx
import React, { useState, useEffect } from 'react';
import { LogOut, Settings, Sun, Moon } from 'lucide-react';

const Topbar = ({ toggleTheme, darkMode, onLogout }) => {
    const [open, setOpen] = useState(false);

    const user = {
        name: 'Neelam',
        email: 'neelamsayed100@gmail.com',
    };

    useEffect(() => {
        const close = () => setOpen(false);
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, []);

    return (
        <div className="flex justify-end p-4 bg-white dark:bg-[#05071A] border-b dark:border-white/10">
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    className="flex items-center space-x-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-semibold"
                >
                    <span>{user.name}</span>
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        className="w-8 h-8 rounded-full"
                        alt="avatar"
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a2e] text-black dark:text-white rounded-lg shadow-lg z-50">
                        <div className="px-4 py-2 text-sm">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-white/60">{user.email}</p>
                        </div>
                        <hr className="border-t border-gray-200 dark:border-white/20" />
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-left text-sm"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button
                            onClick={() => alert('Settings not yet wired')}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-left text-sm"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 text-left text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
