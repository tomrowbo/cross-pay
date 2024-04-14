import React from 'react';
import BottomNavigationBar from '@/components/ui/BottomNavigationBar';
import Link from 'next/link';

interface Contact {
  name: string;
  handle: string;
  image: string;
}

// This is a placeholder function to simulate fetching contacts.
// In a real app, you would likely fetch this data from a server.
const getContacts = (): Contact[] => {
  const names = ["Aaron", "Abigail", "Carl", "Carla", "Derek", "Diana", "Edward", "Eva", "Fiona", "Frank"];
  const teamImages = [
    "/images/team-member-01.jpg",
    "/images/team-member-02.jpg",
    "/images/team-member-03.jpg",
    "/images/team-member-04.jpg",
    "/images/team-member-05.jpg",
    "/images/team-member-06.jpg",
    "/images/team-member-07.jpg",
    "/images/team-member-08.jpg",
  ];

  return names.map((name, index) => ({
    name,
    handle: `@${name.toLowerCase()}`, // Replace with a function to generate random handles if needed
    image: teamImages[index % teamImages.length], // Cycle through team images
  }));
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

    return  (
            <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-black to-blue-900 text-white pb-20">
            {/* Search Bar */}
            <div className="p-4">
                <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="pl-4 pr-2 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6H21M8 12H21m-13 6h13" />
                    </svg>
                </div>
                <input 
                    type="search"
                    placeholder="Search..."
                    className="w-full p-3 text-black placeholder-gray-700 focus:outline-none"
                />
                </div>
            </div>
            {/* Recent Transactions */}
            <h2 className="px-4 text-lg font-bold">Recents</h2>
                <div className="flex overflow-x-auto p-4 space-x-4">
                    {contacts.slice(0, 6).map((contact, index) => (
                    <div key={index} className="shrink-0">
                        <img
                        src={contact.image}
                        alt={`Author ${index + 1}`}
                        className="w-24 h-24 rounded-full"
                        />
                        <p className="text-xs mt-2 text-center">{contact.handle}</p>
                    </div>
                    ))}
                </div>

            {/* Contacts Section */}
            <h2 className="px-4 text-lg font-bold mt-4">Contacts</h2>
            <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
                {Object.entries(groupedContacts).map(([letter, contacts]) => (
                <React.Fragment key={letter}>
                    <div className="pt-3 pb-2"> {/* Adjusted padding here */}
                    <p className="text-lg">{letter}</p>
                    </div>
                    {contacts.map(contact => (
                    <div key={contact.name} className="flex items-center bg-gradient-to-br from-transparent to-blue-800 p-2 rounded-lg">
                        <img src={contact.image} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex flex-col flex-grow">
                        <span className="font-bold">{contact.name}</span>
                        <span className="text-sm text-gray-300">{contact.handle}</span>
                        </div>
                        <Link href="/user/transfer" passHref>
                            <button className="bg-green-500 text-white py-1 px-4 rounded-full cursor-pointer">Transfer</button>
                        </Link>
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