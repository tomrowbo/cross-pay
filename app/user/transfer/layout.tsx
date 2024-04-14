import React from 'react';

const ContactsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900 text-gray-200 tracking-tight">
      {/* No Header included */}
      {children}
    </div>
  );
};

export default ContactsLayout;