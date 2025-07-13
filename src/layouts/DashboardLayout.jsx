import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleTheme = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const handleLogout = () => {
        alert('🔒 Logged out');
        // Add real auth logout here
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0c23] text-black dark:text-white">
            <Sidebar
                collapsed={collapsed}
                toggleSidebar={() => setCollapsed(!collapsed)}
                isMobile={isMobile}
            />
            <div className={`flex-1 ${!isMobile ? 'ml-20 md:ml-64' : ''} transition-all`}>
                <Topbar toggleTheme={toggleTheme} darkMode={darkMode} onLogout={handleLogout} />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;







