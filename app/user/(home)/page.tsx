// user/page.tsx
"use client";
import useBalanceStore from '@/components/useBalanceStore';

import React, { useEffect, useState } from 'react';
import BottomNavigationBar from '@/components/ui/BottomNavigationBar';

interface User{
    name: string;
    handle: string;
    currency: string;
    coin: string;
    address: string;
    balance?: number;
    pfp: string;
}

const UserPage = () => {
    const { balance, addTransaction } = useBalanceStore();

    const [user, setUser] = useState<User>({
        name: 'Abdel Lemamsha',
        handle: '@Abzzer',
        currency: '€',
        coin: 'EUROC',
        address: '0x77f5504acf4712D8dB92a6C34b4bba49724acEE6',
        pfp: `/images/abdel.jpeg`
    });

    useEffect(() => {
        async function fetchMetaMaskAddress() {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
                    if (accounts[0] === "0x4296A6cbdCdcEb9F2314c9d7481686DdA8b48e51") {
                        setUser({
                            name: 'Carl',
                            handle: '@carl',
                            currency: '$',
                            coin: 'USDC',
                            address: '0x4296A6cbdCdcEb9F2314c9d7481686DdA8b48e51',
                            pfp: `/images/abdel.jpeg` //TODO: Add Carl's image
                        });
                    }
                } catch (error) {
                    console.error("Error accessing MetaMask accounts:", error);
                }
            } else {
                console.warn("MetaMask is not installed!");
            }
        }

        fetchMetaMaskAddress();
    }, []);

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await fetch(`/api/getBalance?address=${user.address}`);
                const data = await response.json();
                setUser(prevUser => ({
                    ...prevUser,
                    balance: data.balance
                }));
            } catch (error) {
                console.error('Failed to fetch balance:', error);
            }
        }

        if (user.address) {
            fetchBalance();
        }
    }, [user.address]); // Depend on user.address to refetch when it changes


    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black via-black to-blue-900 text-white"> {/* Diagonal gradient with color ratio */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
                <div className="flex justify-center">
                <img
                                src={user.pfp}
                                alt="Author"
                                className="w-32 h-32 rounded-full"
                            />
                </div>
                <div className="text-center text-3xl font-semibold mt-2">{user.name}</div> {/* Larger and more emphasized user name */}
                <div className="text-center text-xl mt-1">{user.handle}</div> {/* Optimized user handle */}
                <div className="flex justify-center items-center mt-4 mb-6">
                <img
                                src='/images/eu_flag.jpg'
                                alt="Author"
                                className="w-8 h-8 object-cover rounded-full"
                            />                    
                            <div className="text-lg font-medium flex items-center space-x-1">
                        <span className="font-bold text-xl"></span>
                        <span className="font-bold text-3xl">   {user.currency}{balance.toFixed(2)}</span>
                        <span className="text-xl">${user.coin}</span>
                    </div> {/* Enhanced bank balance */}
                </div>
                <a href="/user/contacts"
                    className="px-8 py-4 bg-green-500 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                    Send Money Instantly
                </a>
            </div>
            
           {/* Transactions panel */}
           <div className="absolute bottom-0 left-0 w-full bg-white text-black">
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Recent Transactions</h3>
                    <button onClick={() => addTransaction(10)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add €10
                    </button>
                    <div className="mt-2">
                        <p>+€{balance.toFixed(2)} EUROC - Topped Up</p>
                    </div>
                </div>
            </div>
            <BottomNavigationBar />
            </div>
    );
}

/**
 * Asynchronously retrieves the current user's MetaMask wallet address.
 * 
 * @returns {Promise<string|null>} A promise that resolves with the address, or null if MetaMask is not available or the user denies permission.
 */
async function getMetaMaskAddress() {
    // Check if Ethereum object is available in the global window scope (injected by MetaMask)
    if (window.ethereum) {
        try {
            // Request permission to access user accounts
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
            // Return the first account from the array
            return accounts[0];
        } catch (error) {
            console.error("Error accessing MetaMask accounts:", error);
            return null;  // Return null in case of an error (e.g., user denied account access)
        }
    } else {
        console.warn("MetaMask is not installed!");
        return null;  // Return null if MetaMask is not installed
    }
}


export default UserPage;
