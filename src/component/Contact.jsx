import React, { useState, useCallback, useMemo } from "react";
import { FiCheck, FiPhone, FiUser, FiInfo, FiCalendar, FiClock, FiSearch } from "react-icons/fi";

const servicesData = [
    "Hair Styling",
    "Facial Treatment",
    "Manicure/Pedicure",
    "Massage Therapy",
    "Makeup Artistry",
    "Hair Coloring",
    "Waxing",
    "Skin Care",
    "Body Treatment",
    "Others"
];

const Contact = () => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [notification, setNotification] = useState([]);

    const filteredServices = useMemo(() =>
        servicesData.filter(service => service.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery]
    );

    const handleNotification = () => {
        setNotification(prev => [...prev, 'New Notification']);
    };

    const validateForm = useCallback(() => {
        const errors = {};
        if (!name.trim()) errors.name = 'Name is required.';
        if (!/^\d{10}$/.test(phone)) errors.phone = 'Phone number must be exactly 10 digits.';
        if (selectedServices.length === 0) errors.services = 'Please select at least one service.';
        if (!date) errors.date = 'Date is required.';
        if (!time) errors.time = 'Time is required.';
        return errors;
    }, [name, phone, selectedServices, date, time]);

    const toggleService = (service) => {
        setSelectedServices(prev => prev.includes(service)
            ? prev.filter(s => s !== service)
            : [...prev, service]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsSubmitting(true);

        const message = `Name: ${name}%0APhone: ${phone}%0AServices: ${selectedServices.join(', ')}%0ADate: ${date}%0ATime: ${time}`;
        setTimeout(() => {
            window.open(`https://wa.me/+916201204954?text=${message}`, '_blank');
            
            // Dispatch a custom event for navbar update
            window.dispatchEvent(new Event("bookingSubmitted"));

            // Add notification after successful booking
            setNotification(prev => [...prev, 'Your booking was successful!']);

            setName('');
            setPhone('');
            setSelectedServices([]);
            setDate('');
            setTime('');
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <section id="contacts" className="py-20 bg-yellow-50 min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-4xl font-bold mb-4 text-yellow-600 text-center">Book Your Appointment</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-xl">
                    <div className="mb-4 relative">
                        <FiUser className="absolute left-4 top-5 text-yellow-400 text-xl" />
                        <input type="text" placeholder="Your Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-yellow-100 focus:ring-2 focus:ring-yellow-200" />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <FiPhone className="absolute left-4 top-5 text-yellow-400 text-xl" />
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-yellow-100 focus:ring-2 focus:ring-yellow-200" />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <FiSearch className="absolute left-4 top-5 text-yellow-400 text-xl" />
                        <input type="text" placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-yellow-100 focus:ring-2 focus:ring-yellow-200" />
                    </div>

                    <div className="mb-4 ">
                        <label className="block text-yellow-700 text-lg font-medium mb-2">Select Services</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {filteredServices.slice(0, 4).map(service => (
                                <button type="button" key={service} onClick={() => toggleService(service)} className={`p-3 rounded-xl border-2 ${selectedServices.includes(service) ? 'bg-yellow-500 text-white' : 'bg-yellow-50 border-yellow-100'}`}>{service}</button>
                            ))}
                        </div>
                        {errors.services && <p className="text-red-400 text-sm mt-2">{errors.services}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <FiCalendar className="absolute left-4 top-5 text-yellow-400 text-xl" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-yellow-100 focus:ring-2 focus:ring-yellow-200" />
                        {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <FiClock className="absolute left-4 top-5 text-yellow-400 text-xl" />
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-yellow-100 focus:ring-2 focus:ring-yellow-200" />
                        {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className={`w-full py-4 bg-yellow-500 text-white rounded-xl font-bold ${isSubmitting ? 'opacity-50' : 'hover:bg-yellow-600'}`}>{isSubmitting ? 'Booking...' : 'Confirm Booking'}</button>
                </form>

            </div>
        </section>
    );
};

export default Contact;
