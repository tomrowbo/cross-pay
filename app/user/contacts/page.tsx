import React from 'react';
import BottomNavigationBar from '@/components/ui/BottomNavigationBar';

interface Contact {
    name: string;
}

// This is a placeholder function to simulate fetching contacts.
// In a real app, you would likely fetch this data from a server.
const getContacts = (): Contact[] => {
    const names = ["Aaron", "Abigail", "Carl", "Carla", "Derek", "Diana", "Edward", "Eva", "Fiona", "Frank"];
    return names.map(name => ({ name }));
};

const UserTransferPage: React.FC = () => {
    const contacts = getContacts();

    // Function to group contacts by the first letter of their names
    const groupedContacts = contacts.reduce((groups, contact) => {
        const letter = contact.name[0].toUpperCase();
        groups[letter] = groups[letter] || [];
        groups[letter].push(contact);
        return groups;
    }, {} as Record<string, Contact[]>);


    return (
            <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black to-blue-900 text-white">
                {/* Search Bar */}
                <div className="p-4">
                    <input 
                        type="search"
                        placeholder="Search..."
                        className="w-full p-2 rounded-full text-black"
                    />
                </div>

                {/* Recent Transactions */}
                <div className="flex overflow-x-auto p-4 space-x-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="flex flex-col items-center">
                            <img
                                src={`/images/new-author-0${num}.jpg`}
                                alt="Author"
                                className="w-16 h-16 rounded-full"
                            />
                            <p className="text-xs mt-2">Author {num}</p>
                        </div>
                    ))}
                </div>

            {/* Contacts Section */}
                <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
                    {Object.entries(groupedContacts).map(([letter, contacts]) => (
                        <React.Fragment key={letter}>
                            <div className="pt-4 pb-2">
                                <p className="text-lg">{letter}</p>
                            </div>
                            {contacts.map(contact => (
                                <div key={contact.name} className="flex justify-between items-center bg-gradient-to-br from-transparent to-blue-800 p-2 rounded-lg">
                                    <p>{contact.name}</p>
                                    <button className="bg-green-500 text-white py-1 px-4 rounded-full">Transfer</button>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            {/* Bottom Navigation Bar */}
            <BottomNavigationBar />
        </div>
    );
};

export default UserTransferPage;