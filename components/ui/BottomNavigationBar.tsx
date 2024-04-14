import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BottomNavigationBar = () => {
  const navigationItems = [
    { name: 'Home', image: '/1.png', link: '/user' },
    { name: 'Deposit', image: '/2.png', link: '' },
    { name: 'Contacts', image: '/3.png', link: '/user/contacts' },
    { name: 'Settings', image: '/4.png', link: '' },
  ];

  return (
    <div className="w-full p-4 fixed inset-x-0 bottom-0 flex justify-between bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700"> {/* Adjusted gradient for the bottom bar */}
      {navigationItems.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          {item.link ? (
            <Link href={item.link}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={24} // Smaller icons as requested
                  height={24}
                  className="hover:scale-110 transition-transform duration-300"
                />
                <span className="mt-2 text-xs text-white">{item.name}</span> {/* Name labels */}
            </Link>
          ) : (
            <div>
              <Image
                src={item.image}
                alt={item.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="mt-2 text-xs text-white">{item.name}</span> {/* Name labels */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BottomNavigationBar;