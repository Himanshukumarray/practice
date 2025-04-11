import React, { useState, useEffect } from 'react';
import {
    FiSettings, FiUser, FiBell, FiLock, FiGlobe,
    FiImage, FiRefreshCw, FiLogOut, FiEdit3
} from 'react-icons/fi';

const settingsOptions = [
    { icon: <FiUser />, label: 'Profile Settings' },
    { icon: <FiBell />, label: 'Notification Settings' },
    { icon: <FiImage />, label: 'Theme & Appearance' },
    { icon: <FiEdit3 />, label: 'Change Navbar Color' },
    { icon: <FiLock />, label: 'Privacy & Security' },
    { icon: <FiGlobe />, label: 'Language & Region' },
    { icon: <FiSettings />, label: 'App Preferences' },
    { icon: <FiRefreshCw />, label: 'Reset Settings' },
    { icon: <FiLogOut />, label: 'Logout' },
];

const Sidebar = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [navbarColor, setNavbarColor] = useState('bg-green-500');
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState('text-base');

    const colorOptions = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];

    useEffect(() => {
        const savedColor = localStorage.getItem('navbarColor');
        const savedTheme = localStorage.getItem('theme');
        const savedFontSize = localStorage.getItem('fontSize');

        if (savedColor) setNavbarColor(savedColor);
        if (savedTheme) setTheme(savedTheme);
        if (savedFontSize) setFontSize(savedFontSize);
    }, []);

    const changeNavbarColor = (color) => {
        const newColor = `bg-${color}-500`;
        setNavbarColor(newColor);
        localStorage.setItem('navbarColor', newColor);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const changeFontSize = (size) => {
        setFontSize(size);
        localStorage.setItem('fontSize', size);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-700">Settings</h2>
                <ul className="space-y-4">
                    {settingsOptions.map((option, index) => (
                        <li
                            key={index}
                            className={`flex items-center space-x-3 cursor-pointer transition-colors 
                                ${selectedOption === option.label ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => setSelectedOption(option.label)}
                        >
                            <span className="text-xl">{option.icon}</span>
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Content Area */}
            <main className="flex-1 p-8">
                {selectedOption === 'Change Navbar Color' ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Change Navbar Color</h2>
                        <div className="flex flex-wrap gap-4">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => changeNavbarColor(color)}
                                    className={`w-12 h-12 rounded-full bg-${color}-500 hover:bg-${color}-700 transition-all`}
                                    aria-label={`Change color to ${color}`}
                                />
                            ))}
                        </div>
                    </>
                ) : selectedOption === 'Theme & Appearance' ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Theme & Appearance</h2>

                        {/* Dark/Light Mode Toggle */}
                        <div className="flex items-center space-x-4 mb-4">
                            <span>Dark Mode</span>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={theme === 'dark'} 
                                    onChange={toggleTheme} 
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {/* Font Size Adjustments */}
                        <div className="mb-4">
                            <h3 className="text-lg">Font Size</h3>
                            <div className="space-x-4">
                                <button 
                                    onClick={() => changeFontSize('text-sm')}
                                    className={`p-2 ${fontSize === 'text-sm' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                >
                                    Small
                                </button>
                                <button 
                                    onClick={() => changeFontSize('text-base')}
                                    className={`p-2 ${fontSize === 'text-base' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                >
                                    Medium
                                </button>
                                <button 
                                    onClick={() => changeFontSize('text-lg')}
                                    className={`p-2 ${fontSize === 'text-lg' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                >
                                    Large
                                </button>
                            </div>
                        </div>

                        {/* Background Theme */}
                        <div className="mb-4">
                            <h3 className="text-lg">Background Theme</h3>
                            <div className="flex gap-4">
                                <button 
                                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition-all"
                                    aria-label="Background Gray"
                                />
                                <button 
                                    className="w-12 h-12 rounded-full bg-blue-200 hover:bg-blue-300 transition-all"
                                    aria-label="Background Blue"
                                />
                                <button 
                                    className="w-12 h-12 rounded-full bg-yellow-200 hover:bg-yellow-300 transition-all"
                                    aria-label="Background Yellow"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-lg">
                        Choose a setting from the sidebar.
                    </div>
                )}
            </main>
        </div>
    );
};

export default Sidebar;
