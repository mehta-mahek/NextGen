"use client";

import { Inter } from "next/font/google";
import { File, Globe, Mic } from "lucide-react";
import { Header } from "@/components/ui/header";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-[#100425] flex flex-col ${inter.className}`}
    >
      <Header />
      <div className="flex pt-16 px-8">
        {/* Sidebar */}
        <aside className="w-[250px] mr-8 flex flex-col">
          <div className="bg-white/20 backdrop-blur-md rounded-lg w-[250px] h-[50px] mb-4 flex items-center justify-center">
            <h2 className="text-white font-semibold text-lg">HISTORY</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-lg w-[250px] h-[400px] p-4 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-white font-bold text-sm mb-2">Today</h3>
              <p className="text-white/80 text-xs">
                Explored AI-driven solutions for customer support. Implemented
                new chatbot features to enhance user experience.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-white font-bold text-sm mb-2">Last Week</h3>
              <p className="text-white/80 text-xs">
                Conducted data analysis on user interactions. Optimized response
                times and accuracy of the chatbot system.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-2">Last Month</h3>
              <p className="text-white/80 text-xs">
                Integrated natural language processing capabilities. Expanded
                knowledge base to cover wider range of topics.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-[#2BD8D5]/10 to-[#DC00D3]/10 backdrop-blur-md rounded-lg mb-4 p-4 w-[850px] h-[450px] overflow-y-auto">
            {/* Chat messages would go here */}
          </div>
          <div className="h-[50px] bg-white/20 backdrop-blur-md rounded-lg flex items-center px-4 w-[850px]">
            <button className="mr-2" aria-label="Attach file">
              <File className="w-5 h-5 text-white" />
            </button>
            <button className="mr-2" aria-label="Globe">
              <Globe className="w-5 h-5 text-white" />
            </button>
            <button className="mr-4" aria-label="Microphone">
              <Mic className="w-5 h-5 text-white" />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
            />
          </div>
        </main>
      </div>
    </main>
  );
}
