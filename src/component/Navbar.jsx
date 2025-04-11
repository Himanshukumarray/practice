import React, { useState, useEffect } from 'react';
// Import with aliases
import { Link as ScrollLink } from 'react-scroll';  // Alias for react-scroll Link
import { Link as RouterLink } from 'react-router-dom';  // Alias for react-router-dom Link
import { FiHome, FiUser, FiCalendar, FiX, FiMenu, FiSettings } from "react-icons/fi";
import { GiScissors } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import fetchEmployeeCount from './FetchEmployeeCount';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bookingList, setBookingList] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [employeeCount, setEmployeeCount] = useState(0); // State to store the employee count
    const [notifications, setNotifications] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [navbarColor, setNavbarColor] = useState('bg-green-500'); // fallback default

    useEffect(() => {
        const savedColor = localStorage.getItem('navbarColor');
        if (savedColor) {
            setNavbarColor(savedColor);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const newCount = await fetchEmployeeCount();
            setEmployeeCount(newCount);
        };

        fetchData(); // Fetch initially
        const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []); // Empty dependency array to run once when the component mounts

    useEffect(() => {
        // Load initial bookings from localStorage
        const storedBookings = JSON.parse(localStorage.getItem("bookingList")) || [];
        setBookingList(storedBookings);
    }, []);

    useEffect(() => {
        // Listen for booking submission
        const handleBookingUpdate = (event) => {
            const newBooking = `Booking Confirmed #${bookingList.length + 1}`;
            setBookingList((prevList) => {
                const updatedList = [...prevList, newBooking];
                localStorage.setItem("bookingList", JSON.stringify(updatedList));
                return updatedList;
            });
        };

        window.addEventListener("bookingSubmitted", handleBookingUpdate);

        return () => {
            window.removeEventListener("bookingSubmitted", handleBookingUpdate);
        };
    }, [bookingList]);

    const hadleNotificationclick = async () => {
        setIsDropdownOpen(!isDropdownOpen)
        try {
            const response = await fetch("http://localhost:8080/api/employees/getall1");
            if (!response.ok) {
                throw new Error("Failed to fetch Employee Data")
            }

            const data = await response.json();
            setNotifications(data)
        }
        catch (error) {
            console.error("Error fetching employees:", error);
        }
    }

    return (
        <>
            <style jsx>{`
                @media (max-width: 768px) {
                    .ml-210 {
                        margin-left: 0 !important;
                    }
                    .ml-200 {
                        margin-left: 0 !important;
                    }
                }
            `}</style>

            <div className='fixed w-full z-50 transition-all duration-500'>
                {/*BG*/}
                <div className={`${navbarColor} backdrop-blur-2xl `}>
                    <nav className="border-b border-pink-400/20">
                        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative">
                            {/* Logo */}
                            <div className="flex items-center">
                                <ScrollLink
                                    to="home"
                                    className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                    <span className="cursor-pointer text-2xl md:text-3xl font-bold 
                                    bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-[poppins] tracking-tighter">
                                        BeautySalon
                                    </span>
                                </ScrollLink>
                            </div>

                            {/* CENTER DESKTOP MENU */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6 lg:space-x-10">
                                <ScrollLink
                                    to="home"
                                    spy={true}
                                    smooth={true}
                                    className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                    <FiHome className="mr-1 lg:mr-2" />
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                                </ScrollLink>

                                <ScrollLink
                                    to="about"
                                    spy={true}
                                    smooth={true}
                                    className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                    <FiUser className="mr-1 lg:mr-2" />
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                                </ScrollLink>

                                <ScrollLink
                                    to="services"
                                    spy={true}
                                    smooth={true}
                                    className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                    <GiScissors className="mr-1 lg:mr-2" />
                                    Services
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                                </ScrollLink>

                                <ScrollLink
                                    to="alert"
                                    spy={true}
                                    smooth={true}
                                    className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                    <IoIosNotifications className="mr-1 lg:mr-2" />
                                    Alert
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>

                                </ScrollLink>
                            </div>

                            {/* Notification Icon */}
                            <div className="id= notifi relative ml-210 ">
                                <IoIosNotifications
                                    className="text-gray-800 text-4xl cursor-pointer transition-transform duration-300 hover:rotate-12 hover:[rotateY(12deg)]"
                                    onClick={hadleNotificationclick}
                                />
                                {employeeCount > 0 && (
                                    <span className="absolute -top-1 -right-1.5 pt-0.5 bg-red-500 text-white text-xs font-bold rounded-full p-1">
                                        {employeeCount}
                                    </span>
                                )}

                                {/* Notification Dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0  mt-2 ml-200 w-60 bg-black border cursor-pointer border-gray-200 rounded-xl shadow-xl transition-transform transform origin-top-right scale-95 hover:scale-100">
                                        <div className="p-4 bg-white">
                                            <h4 className="text-lg text-red-600 font-semibold border-b pb-2">🔔 Alert </h4>
                                            <ul className="mt-2 ml-2 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                                {notifications?.length > 0 ? (
                                                    notifications.map((noti) => (
                                                        <li
                                                            key={noti.id}
                                                            className="text-sm text-gray-700 px-3 py-2 border-b last:border-b-0 hover:bg-gray-100 transition duration-200"
                                                            onClick={() => setSelectedEmployee(noti)}
                                                        >
                                                            {noti.employeeName}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="text-sm text-gray-500 p-3 text-center">No Alert !</li>
                                                )}
                                            </ul>
                                        </div>
                                        {/* Employee Details */}
                                        {selectedEmployee && (
                                            <div className="mt-4 p-4 border rounded bg-gray-100">
                                                <h3 className="text-lg font-bold">Employee Details</h3>
                                                <p><strong>Name:</strong> {selectedEmployee.employeeName}</p>
                                                <p><strong>Address:</strong> {selectedEmployee.address}</p>
                                                <p><strong>Account No:</strong> {selectedEmployee.accountNo}</p>
                                                <p><strong>IF:</strong> {selectedEmployee.accountNo}</p>
                                                <p><strong>ID:</strong> {selectedEmployee.id}</p>
                                                <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                                                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* MOBILE MENU TOGGLE */}
                            <div className="md:hidden">                                 <button
                                onClick={() => setIsMenuOpen(true)}
                                className="text-gray-800 hover:text-pink-700 transition-colors duration-300"
                            >
                                <FiMenu size={28} />
                            </button>
                            </div>

                            <div className='flex items-center space-x-4'>
                                <div className='hidden md:block'>
                                    <ScrollLink to="contacts" spy={true} smooth={true} className='flex items-center bg-pink-400 hover:bg-pink-600 text-white py-2 lg:px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer font-[Poppins] font-semibold border border-pink-300 text-sm lg:text-base'>
                                        <FiCalendar className='mr-1 lg:mr-2' />
                                        Book Now
                                    </ScrollLink>
                                </div>
                            </div>

                            <div className="flex items-center -mr-8">
                                <div className="hidden md:block">
                                    <RouterLink
                                        to="/setting/new"
                                        spy={true}
                                        smooth={true}
                                        className="group flex items-center rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer font-poppins font-semibold text-sm lg:text-base border border-pink-400"
                                    >
                                        <FiSettings className="text-4xl transition-all duration-300  group-hover:rotate-12" />
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                {/*MENU MOBILE */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center bg-pink-200/95 backdrop-blur-lg">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-800 hover:text-pink-700 transition-colors duration-300 p-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FiX size={28} />
                        </button>

                        {/* Menu Container */}
                        <div className="bg-pink-100/90 border border-pink-300/20 rounded-xl shadow-2xl p-8 space-y-8 w-11/12 max-w-sm">
                            {/* Home Link */}
                            <ScrollLink
                                to="home"
                                spy={true}
                                smooth={true}
                                className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FiHome className="mb-2 text-2xl" />
                                Home
                            </ScrollLink>

                            <ScrollLink
                                to="about"
                                spy={true}
                                smooth={true}
                                className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FiUser className="mb-2 text-2xl" />
                                About
                            </ScrollLink>

                            <ScrollLink
                                to="services"
                                spy={true}
                                smooth={true}
                                className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <GiScissors className="mb-2 text-2xl" />
                                Services
                            </ScrollLink>

                            <ScrollLink className='flex flex-col items-center bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 lg:px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer font-[Poppins] font-semibold text-lg'
                                onClick={() => setIsMenuOpen(false)}
                                to='contacts' spy={true} smooth={true}
                            >
                                <FiCalendar className="mb-2 text-2xl" />
                                Book Appointment
                            </ScrollLink>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar;
