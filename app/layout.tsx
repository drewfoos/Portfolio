// app/layout.tsx
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import SocialSidebar from '@/components/layout/socialSidebar';
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md",
            style: {
              marginTop: '50px',
            },
          }}
        />
        <SocialSidebar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}