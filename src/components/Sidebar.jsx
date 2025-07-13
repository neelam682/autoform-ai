import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    Sun,
    Moon,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

const links = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Form Builder', to: '/form-builder', icon: FileText },
    { name: 'Saved Forms', to: '/saved', icon: FileText },
    { name: 'Billing', to: '/billing', icon: CreditCard },
    { name: 'Settings', to: '/settings', icon: Settings },
];

const Sidebar = ({ collapsed, toggleSidebar, isMobile }) => {
    const [darkMode, setDarkMode] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        alert('🔒 You have been logged out.');
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };




    useEffect(() => {
        if (!isMobile) setMobileOpen(false);
    }, [isMobile]);

    return (
        <>
            {/* Mobile menu toggle button */}
            {isMobile && (
                <button
                    className="md:hidden fixed top-4 left-4 z-[1000] p-3 rounded-full bg-black/80 text-white shadow-lg hover:bg-opacity-90 transition"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out
                    flex flex-col shadow-xl
                    bg-white text-black dark:bg-[#05071A] dark:text-white

                    ${isMobile
                        ? mobileOpen
                            ? 'translate-x-0 w-64'
                            : '-translate-x-full w-64'
                        : ''
                    }

                    ${!isMobile && (collapsed ? 'w-20' : 'w-64')}
                `}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b border-black/10 dark:border-white/20">
                    {!collapsed && (
                        <h1 className="text-xl font-bold whitespace-nowrap">AutoForm AI</h1>
                    )}

                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition"
                            aria-label="Toggle sidebar"
                        >
                            {collapsed ? (
                                <ChevronsRight className="h-6 w-6" />
                            ) : (
                                <ChevronsLeft className="h-6 w-6" />
                            )}
                        </button>
                    )}

                    {isMobile && (
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition md:hidden"
                            aria-label="Close menu"
                        >
                            <ChevronsLeft className="h-6 w-6" />
                        </button>
                    )}
                </div>

                {/* Nav Links */}
                <nav className="flex-1 mt-4 overflow-y-auto px-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-medium text-sm
                                ${isActive
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'hover:bg-black/5 text-black dark:hover:bg-white/10 dark:text-white/90'}
                                ${collapsed ? 'justify-center px-2' : 'justify-start'}`
                            }
                            onClick={() => isMobile && setMobileOpen(false)}
                        >
                            <link.icon className="w-6 h-6 flex-shrink-0" />
                            {!collapsed && <span className="truncate">{link.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t border-black/10 dark:border-white/20 p-4 space-y-3">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-4 w-full hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 rounded-xl transition"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 w-full hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2 rounded-xl transition"
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;








