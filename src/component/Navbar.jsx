import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiHome, FiUser, FiCalendar, FiX } from "react-icons/fi";
import { GiScissors } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import fetchEmployeeCount from './fetchEmployeeCount';

const Navbar = () => {
    const [navShadow, setNavShadow] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bookingList, setBookingList] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [employeeCount, setEmployeeCount] = useState(0); // State to store the employee count

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

    return (
        <div className='fixed w-full z-50 transition-all duration-500'>
            {/*BG*/}
            <div className={`bg-white backdrop-blur-2xl ${navShadow ? 'shadow-xl' : 'shadow-md'}`}>
                <nav className="border-b border-pink-400/20">
                    <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                to="home"
                                spy={true}
                                smooth={true}
                                className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                <span className="cursor-pointer text-2xl md:text-3xl font-bold 
                                bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-[poppins] tracking-tighter">
                                    BeautySalon
                                </span>
                            </Link>
                        </div>

                        {/* CENTER DESKTOP MENU */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6 lg:space-x-10">
                            <Link
                                to="home"
                                spy={true}
                                smooth={true}
                                className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                <FiHome className="mr-1 lg:mr-2" />
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                            <Link
                                to="about"
                                spy={true}
                                smooth={true}
                                className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                <FiUser className="mr-1 lg:mr-2" />
                                About
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                            <Link
                                to="services"
                                spy={true}
                                smooth={true}
                                className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[poppins] font-medium text-base lg:text-lg">
                                <GiScissors className="mr-1 lg:mr-2" />
                                Services
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>

                        {/* Notification Icon */}
                        <div className="relative ml-210 ">
                            <IoIosNotifications
                                className="text-gray-800 text-4xl cursor-pointer transition-transform duration-300 hover:rotate-12 hover:[rotateY(12deg)]"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            />
                            {employeeCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                                    {employeeCount}
                                </span>
                            )}

                            {/* Notification Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <div className="p-4">
                                        <h4 className="text-lg font-semibold text-gray-700">Confirmed Bookings</h4>
                                        <ul className="mt-2 space-y-2">
                                            {bookingList.map((booking, index) => (
                                                <li key={index} className="text-sm text-gray-600 border-b py-2">
                                                    {booking}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='flex items-center space-x-4'>
                            <div className='hidden md:block'>
                                <Link to="contacts" spy={true} smooth={true} className='flex items-center bg-pink-400 hover:bg-pink-600 text-white py-2 lg:px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer font-[Poppins] font-semibold border border-pink-300 text-sm lg:text-base'>
                                    <FiCalendar className='mr-1 lg:mr-2' />
                                    Book Now
                                </Link>
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
                        <Link
                            to="home"
                            spy={true}
                            smooth={true}
                            className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FiHome className="mb-2 text-2xl" />
                            Home
                        </Link>

                        <Link
                            to="about"
                            spy={true}
                            smooth={true}
                            className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <FiUser className="mb-2 text-2xl" />
                            About
                        </Link>

                        <Link
                            to="services"
                            spy={true}
                            smooth={true}
                            className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <GiScissors className="mb-2 text-2xl" />
                            Services
                        </Link>

                        <Link className='flex flex-col items-center bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 lg:px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer font-[Poppins] font-semibold text-lg'
                            onClick={() => setIsMenuOpen(false)}
                            to='contacts' spy={true} smooth={true}
                        >
                            <FiCalendar className="mb-2 text-2xl" />
                            Book Appointment
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;
