'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useBalanceStore from '@/components/useBalanceStore'; // Adjust the path as necessary
import BottomNavigationBar from '@/components/ui/BottomNavigationBar';

const TransferPage = () => {
    const { balance, addTransaction } = useBalanceStore();
    const [amount, setAmount] = useState<string>(''); // Change to string to handle input more effectively
    const [error, setError] = useState<string>('');

    const handleTransfer = () => {
        const numericAmount = parseFloat(amount);
        if (numericAmount > 0 && numericAmount <= balance) {
            addTransaction(-numericAmount);
            window.location.href = '/user/success'; // Redirect to success page
        } else {
            setError('Invalid amount.'); // Update error in UI
        }
    };

    const handleClose = () => {
        window.location.href = '/user/contacts'; // Redirect to contacts page
    };

    // Clear the input when component mounts
    useEffect(() => {
        setAmount('');
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
            <div className="bg-white text-black rounded-lg shadow-lg p-4 max-w-sm w-full relative">
                <button onClick={handleClose} className="absolute top-2 right-2 text-black">
                    Close
                </button>
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow">
                        <Image src="/images/team-member-04.jpg" alt="Carl" width={96} height={96} />
                    </div>
                    <h2 className="text-2xl font-bold">Carl</h2>
                    <p>@carl</p>
                    <h3 className="text-lg font-semibold">Available Balance: €{balance.toFixed(2)}</h3>
                    {error && <p className="text-red-500">{error}</p>}
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                            setError(''); // Clear error when changing input
                        }}
                        className="input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        placeholder="Enter amount to transfer"
                    />
                    <button
                        onClick={handleTransfer}
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Transfer to Carl
                    </button>
                </div>
            </div>
            <BottomNavigationBar />
        </div>
    );
};

export default TransferPage;