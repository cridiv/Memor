'use client';

import React, { useState } from 'react';
import {
  Heart,
  User,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';
import AccountModal from './AccountModal';

export const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  return (
    <header className="bg-white/30 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.6)]">
              <Heart className="w-7 h-7 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Memor</h1>
            </div>
          </div>

          {/* Right Side: Notifications + User Menu */}
          <div className="flex items-center gap-5">


            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/50 backdrop-blur-md shadow-[8px_8px_16px_rgba(0,0,0,0.12),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <ChevronDown className="w-5 h-5 text-gray-600 hidden md:block" />
              </button>

              {/* Dropdown Menu - Glassmorphic Style */}
{showUserMenu && (
                <div className="absolute right-0 mt-4 w-72 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                  <div className="py-2">
                    <button
                      onClick={() => { setShowAccountModal(true); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-800 hover:bg-white/50 transition">
                      <User className="w-5 h-5" />
                      My Profile
                    </button>
                    <button className="w-full flex items-center gap-4 px-6 py-4 text-base font-medium text-gray-800 hover:bg-white/50 transition">
                      <Settings className="w-5 h-5" />
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-white/30 pt-2">
                    <button className="w-full flex items-center gap-4 px-6 py-4 text-base font-semibold text-red-600 hover:bg-red-50/60 transition">
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AccountModal isOpen={showAccountModal} onClose={() => setShowAccountModal(false)} />
    </header>
  );
};

export default Navbar;