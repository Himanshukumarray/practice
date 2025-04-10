import React, { useState } from 'react';

const Setting = () => {
    // State to store the selected navbar color
    const [navbarColor, setNavbarColor] = useState('bg-green-500');

    // Function to handle the color change
    const changeNavbarColor = (color) => {
        setNavbarColor(color);
    };

    return (
        <>
            {/* Navbar with dynamic background color */}
            <div className={`p-4 ${navbarColor} text-white`}>
                <h3 className="flex justify-center items-center text-center">
                    Choose Your Favorite Color for Navbar.
                </h3>
            </div>

            {/* Color buttons */}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    onClick={() => changeNavbarColor('bg-red-500')}
                    className="p-3 m-4 bg-red-500 text-white rounded hover:bg-red-700 transition-all"
                ></button>

                <button
                    onClick={() => changeNavbarColor('bg-blue-500')}
                    className="p-3 m-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all"
                ></button>

                <button
                    onClick={() => changeNavbarColor('bg-green-500')}
                    className="p-3 m-4 bg-green-500 text-white rounded hover:bg-green-700 transition-all"
                ></button>

                <button
                    onClick={() => changeNavbarColor('bg-yellow-500')}
                    className="p-3 m-4 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-all"
                ></button>

                <button
                    onClick={() => changeNavbarColor('bg-purple-500')}
                    className="p-3 m-4 bg-purple-500 text-white rounded hover:bg-purple-700 transition-all"
                ></button>

                <button
                    onClick={() => changeNavbarColor('bg-pink-500')}
                    className="p-3 m-4 bg-pink-500 text-white rounded hover:bg-pink-700 transition-all"
                ></button>

                {/* Add more buttons as needed */}
            </div>
        </>
    );
};

export default Setting;
