import React from 'react';

const Logo = ({ className = "w-8 h-8", iconOnly = false }) => {
    return (
        <div className={`flex items-center gap-2 shrink-0 ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                className="w-full h-full drop-shadow-sm shrink-0"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background Shape */}
                <rect width="100" height="100" rx="28" fill="url(#logo_grad)" />

                {/* Stylized 'F' + Cart Handle */}
                <path
                    d="M30 25C30 23.3431 31.3431 22 33 22H65C66.6569 22 68 23.3431 68 25V35C68 36.6569 66.6569 38 65 38H42V50H60C61.6569 50 63 51.3431 63 53V63C63 64.6569 61.6569 66 60 66H42V78C42 79.6569 40.6569 81 39 81H33C31.3431 81 30 79.6569 30 78V25Z"
                    fill="white"
                />

                {/* Wheels / Movement Dots */}
                <circle cx="45" cy="74" r="5" fill="white" className="animate-pulse" />
                <circle cx="58" cy="74" r="5" fill="white" className="animate-pulse" />

                {/* Steam/Speed Trails */}
                <path d="M72 45H85" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" />
                <path d="M75 55H88" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.6" />
                <path d="M72 65H85" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />

                <defs>
                    <linearGradient id="logo_grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#e11d48" />
                        <stop offset="1" stopColor="#fb7185" />
                    </linearGradient>
                </defs>
            </svg>
            {!iconOnly && (
                <span className="text-2xl font-black text-gray-900 tracking-tighter">
                    Food<span className="text-primary-600">Kart</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
