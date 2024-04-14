// user/page.tsx
import React from 'react';
import BottomNavigationBar from '@/components/ui/BottomNavigationBar';

interface User{
    name: string;
    handle: string;
    balance: number;
    country: string;
}

const UserPage = () => {

    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black via-black to-blue-900 text-white"> {/* Diagonal gradient with color ratio */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
                <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gray-300"> {/* Larger profile picture */}
                    </div>
                </div>
                <div className="text-center text-3xl font-semibold mt-2">Abdel Lemamsha</div> {/* Larger and more emphasized user name */}
                <div className="text-center text-xl mt-1">@Abzzer</div> {/* Optimized user handle */}
                <div className="flex justify-center items-center mt-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-blue-500 mr-2"></div> {/* Larger country logo placeholder */}
                    <div className="text-lg font-medium flex items-center space-x-1">
                        <span className="font-bold text-xl"></span>
                        <span className="font-bold text-3xl">€54.80</span>
                        <span className="text-xl">EUROC</span>
                    </div> {/* Enhanced bank balance */}
                </div>
                <a href="/user/contacts"
                    className="px-8 py-4 bg-green-500 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                    Send Money Instantly
                </a>
            </div>
            <div>
                <BottomNavigationBar />
            </div>
        </div>
    );
}

export default UserPage;