import { ReactNode } from 'react';
import Header from '@/components/ui/header'



export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="bg-black min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}