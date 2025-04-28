import React, { useState, useEffect } from 'react';
import BannerImage from '../assets/SalonBanner.jpg'
import { Link } from 'react-scroll';
import { FaSpa, FaCalendarAlt } from "react-icons/fa";
import whatsappimg from '../assets/whatsapp-icon.png'

const Banner = () => {

    const [pos, setPos] = useState({ x: 20, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // set initial Y based on viewport height
    useEffect(() => {
        const initialY = window.innerHeight - (window.innerHeight > 600 ? 150 : 100);
        setPos({ x: 20, y: initialY });
    }, []);

    // mouse + touch move/up
    useEffect(() => {
        const move = (clientX, clientY) => {
            setPos({
                x: clientX - offset.x,
                y: clientY - offset.y,
            });
        };

        const onMouseMove = e => dragging && move(e.clientX, e.clientY);
        const onTouchMove = e => {
            if (!dragging) return;
            const t = e.touches[0];
            move(t.clientX, t.clientY);
        };
        const end = () => setDragging(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', end);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', end);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', end);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', end);
        };
    }, [dragging, offset]);

    const handleStart = (clientX, clientY) => {
        setOffset({ x: clientX - pos.x, y: clientY - pos.y });
        setDragging(true);
    };


    return (
        <div id='home' className='min-h-[80vh] md:min-h-[90vh] flex items-center justify-center text-center px-4 relative overflow-hidden'
            style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${BannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className='max-w-6xl text-white z-10 relative px-4'>
                <div className='absolute -bottom-12 -right-12 md:-bottom-8 md:-right-8 text-4xl md:text-5xl text-amber-300/20 rotate-12 '>
                    <FaSpa />
                </div>

                {/* HEADING */}
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md-mb-6 font-[Great + Vibes] bg-gradient-to-r from-amber-300 via-rose-300 to-rose-500 bg-clip-text text-transparent drop-shadow-2xl animte-fade-in'>The Royal Spa & Salon</h1>

                {/* DECORATIVE DEVIDER */}
                <div className='w-48 md:w-64 h-1 bg-gradient-to-r from-transparent via-lime-300 to-transparent mx-auto my-6 md:my-8 rounded-full' />
                { /* TAGLINE */}
                <div className="space-y-4  md:space-y-6 mb-8 md:mb-12">

                    <p className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl italic text-amber-100 leading-tight">
                        Experience Beauty Redefined
                    </p>

                    {/* Button */}
                    <div className="bg-gradient-to-r from-rose-600 to-amber-500 px-6 py-4 mt-20 md:px-10 md:py-5 rounded-full transition-transform duration-300 text-white uppercase font-bold tracking-widest 
                            hover:scale-105 hover:shadow-2xl flex items-center gap-2 md:gap-3 mx-auto border-2 border-amber-200 hover:border-rose-200 group text-sm md:text-base">

                        <FaCalendarAlt className="text-xl md:text-2xl animate-pulse group-hover:animate-none" />
                        <Link to='contact' smooth={true}>Book Your Royal Experience</Link>

                    </div>

                </div>


            </div>

            <div
                // inline fixed so it stays on top
                style={{
                    position: 'fixed',
                    left: pos.x,
                    top: pos.y,
                    zIndex: 9999,
                    cursor: dragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={e => handleStart(e.clientX, e.clientY)}
                onTouchStart={e => {
                    const t = e.touches[0];
                    handleStart(t.clientX, t.clientY);
                }}
            >
                <a
                    href="https://wa.me/+916201204954"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={whatsappimg}
                        alt="WhatsApp"
                        className="w-12 md:w-20"
                    />
                </a>
            </div>


        </div>
    )
}

export default Banner