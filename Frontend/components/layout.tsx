"use client";

import { Header } from "./ui/header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-screen bg-[#100425] relative">
      {/* Radial Gradient Circle */}
      <div
        
      ></div>

      {/* Main Content Wrapper - Ensures Background Stays Consistent */}
      <div className="flex flex-col min-h-screen">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-8">
            <Header />
          </div>
        </nav>
        {/* Add margin below the header */}
        <main className="flex-grow mt-8">{children}</main>{" "}
        {/* Added mt-8 to add margin */}
      </div>
    </div>
  );
}
