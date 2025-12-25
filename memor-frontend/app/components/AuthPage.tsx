'use client';

import React, { useState } from 'react';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
  X,
} from 'lucide-react';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = 'http://localhost:5000/auth/google';
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal Container - Perfectly centered */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
        <div
          className="
            w-full max-w-md                                   /* Slightly wider: 448px */
            bg-gradient-to-br from-gray-50 to-white
            rounded-2xl                                       /* Softer, rounder edges */
            shadow-2xl overflow-hidden border border-gray-200
            transition-all duration-300
          "
        >
          {/* Subtle background accents */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl" />
          </div>

          {/* Close Button */}
          <button
            onClick={() => !isLoading && onClose()}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content with generous spacing */}
          <div className="relative p-6 sm:p-8">

            {/* Heading */}
            <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"> {/* Reduced font size */}
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">Memor</span>
        </h2>
              <p className="text-gray-600 text-base">
                Sign in to save your cards, access history, and unlock more features
              </p>
            </div>

            {/* Features List - more space */}
            <div className="space-y-5 mb-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]">
              <div className="flex items-center gap-4">
                <Zap className="w-6 h-6 text-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Unlimited Creations</p>
                  <p className="text-sm text-gray-600">Save and revisit all your cards</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-6 h-6 text-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Secure & Private</p>
                  <p className="text-sm text-gray-600">Your data is safe with Google auth</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 text-gray-900 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Personal Touch</p>
                  <p className="text-sm text-gray-600">Access premium themes and AI features</p>
                </div>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-white bg-gray-900 shadow-[8px_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.3)] hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="20" height="20" className="shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-8">
              By continuing, you agree to CardCraft's{' '}
              <a href="#" className="text-gray-900 font-medium hover:underline">Terms</a>{' '}
              and{' '}
              <a href="#" className="text-gray-900 font-medium hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}