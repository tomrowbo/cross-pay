'use client';

import React from 'react';

const SuccessPage = () => {

    const handleDone = () => {
        window.location.href = '/user/contacts'; // Directly modifying window.location to navigate
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white">
            <div className="text-center animate-pulse">
                <svg className="mx-auto mb-4 w-16 h-16 text-white fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <h1 className="mb-4 text-xl font-bold">Transaction Successful!</h1>
                <p>Payment Will Arrive With Carl Shortly</p>
                <button
                    onClick={handleDone}
                    className="mt-4 px-6 py-3 bg-white text-green-500 rounded-full hover:bg-gray-100 font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;