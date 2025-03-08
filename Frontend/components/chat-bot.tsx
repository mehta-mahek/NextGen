'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { File, Globe } from 'lucide-react'
import { Header } from './ui/header'
const inter = Inter({ subsets: ['latin'] })

export default function Chatbot() {
  const [activeTab, setActiveTab] = useState('CHATBOT')

  const navItems = ['HOME', 'DASHBOARD', 'REPORT', 'CHATBOT']

  return (
    <main className={`min-h-screen bg-[#100425] flex flex-col p-8 ${inter.className}`}>
      {/* Header */}
      <Header></Header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[30%] mr-8 flex flex-col">
          <div className="bg-white/20 rounded-lg w-[250px] h-[50px] mb-4"></div>
          <div className="bg-white/20 rounded-lg w-[290px] h-[650px] p-4 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-white font-bold text-sm mb-2">Today</h2>
              <p className="text-white/80 text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-white font-bold text-sm mb-2">Last Week</h2>
              <p className="text-white/80 text-xs">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div>
              <h2 className="text-white font-bold text-sm mb-2">Last Month</h2>
              <p className="text-white/80 text-xs">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-white/10 rounded-lg mb-4 p-4">
            {/* Chat messages would go here */}
          </div>
          <div className="h-[50px] bg-white/20 rounded-lg flex items-center px-4">
            <button className="mr-2" aria-label="Attach file">
              <File className="w-5 h-5 text-white" />
            </button>
            <button className="mr-4" aria-label="Globe">
              <Globe className="w-5 h-5 text-white" />
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
  )
}

