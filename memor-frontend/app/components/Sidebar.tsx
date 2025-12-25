'use client';

import React, { useState } from 'react';
import {
  Home,
  Plus,
  Gift,
  Calendar,
  TrendingUp,
  X,
} from 'lucide-react';
import Link from 'next/link';
import CreateCard from './CreateCard'; // Adjust path as needed

export default function Sidebar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      {/* Modern Neumorphic Sidebar - Matching CreateCard Step 1 Style */}
     <aside className="hidden lg:block w-80 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 h-screen sticky top-16 shadow-[12px_0_30px_rgba(0,0,0,0.1)]">       
       <div className="p-8 space-y-10">

          {/* Navigation Items - Spacious & Bold */}
          <nav className="space-y-4">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 bg-white shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]">
              <Plus className="w-8 h-8 text-gray-900" />
              <span className="text-xl font-bold text-gray-900">Create Card</span>
            </button>

            <Link href="/dashboard">
              <button className="w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 bg-white shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),inset_-4px_-4px_10px_rgba(255,255,255,0.9)]">
                <Home className="w-8 h-8 text-gray-900" />
                <span className="text-xl font-bold text-gray-900">Dashboard</span>
              </button>
            </Link>

            <Link href="/card">
              <button className="w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 bg-white/70 shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08)]">
                <Gift className="w-8 h-8 text-gray-900" />
                <span className="text-xl font-semibold text-gray-900">My Cards</span>
              </button>
            </Link>

            <Link href="/dashboard/calendar">
              <button className="w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 bg-white/70 shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08)]">
                <Calendar className="w-8 h-8 text-gray-900" />
                <span className="text-xl font-semibold text-gray-900">Calendar</span>
              </button>
            </Link>

            <button className="w-full flex items-center gap-5 px-6 py-5 rounded-3xl transition-all duration-300 bg-white/70 shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08)]">
              <TrendingUp className="w-8 h-8 text-gray-900" />
              <span className="text-xl font-semibold text-gray-900">Analytics</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Modal - Kept clean and matching */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setIsCreateModalOpen(false)}
          />

          <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-3xl shadow-2xl">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-8 right-8 z-10 p-4 bg-white/90 backdrop-blur rounded-full shadow-xl hover:bg-white transition"
            >
              <X className="w-7 h-7 text-gray-900" />
            </button>

            <CreateCard onClose={() => setIsCreateModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}