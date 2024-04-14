import React from 'react';

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
      {/* No Header included */}
      {children}
    </div>
  );
};

export default ContactLayout;