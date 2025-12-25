import { useState } from 'react';
import {
  Sparkles,
  Heart,
  Cake,
  Star,
  ThumbsUp,
  ArrowRight,
  Zap,
  Send,
} from 'lucide-react';
import AuthModal from './AuthPage';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  const occasions = [
    { icon: Cake, label: 'Birthdays' },
    { icon: Heart, label: 'Love' },
    { icon: Star, label: 'Celebrations' },
    { icon: ThumbsUp, label: 'Thank You' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 md:py-32">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Create Beautiful
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
              AI-Powered Cards
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Design stunning digital greeting cards with AI-generated messages and elegant themes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => setShowAuth(true)}
             className="group px-8 py-4 rounded-2xl font-semibold text-lg text-gray-900 bg-gradient-to-br from-gray-100 to-gray-200 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.2),-10px_-10px_20px_rgba(255,255,255,1)] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.15),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all duration-300">
              <span className="flex items-center gap-3">
                Create Your Card
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-8 py-4 rounded-2xl font-semibold text-lg text-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] hover:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.12),inset_-8px_-8px_16px_rgba(255,255,255,0.9)] transition-all duration-300">
              View Examples
            </button>
          </div>
            <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Why Choose Our Cards?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Elegant design meets intelligent automation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.18),-16px_-16px_32px_rgba(255,255,255,1)] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <Zap className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">AI Messages</h3>
              <p className="text-gray-600 text-center leading-relaxed">Instant heartfelt messages powered by advanced AI</p>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.18),-16px_-16px_32px_rgba(255,255,255,1)] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <Heart className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Beautiful Themes</h3>
              <p className="text-gray-600 text-center leading-relaxed">Elegant designs for every celebration and mood</p>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.18),-16px_-16px_32px_rgba(255,255,255,1)] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-100 rounded-2xl flex items-center justify-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]">
                <Send className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Instant Sharing</h3>
              <p className="text-gray-600 text-center leading-relaxed">Share via link, email, or download instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Perfect for Every Occasion
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            From birthdays to thank you notes
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {occasions.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.12),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.15),-10px_-10px_20px_rgba(255,255,255,1)] transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-gray-800 mx-auto mb-3" />
                  <p className="text-center font-semibold text-gray-900">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.9)]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Create your first AI-powered card in seconds
            </p>
            <button
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-xl text-gray-900 bg-gradient-to-br from-gray-100 to-gray-200 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.2),-12px_-12px_24px_rgba(255,255,255,1)] active:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.15),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all duration-300"
            >
              <Sparkles className="w-6 h-6" />
              Start Creating Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>s

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-br from-gray-200 to-gray-300 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2 text-lg font-semibold text-gray-900">CardCraft</p>
          <p className="text-gray-600">© 2025 All rights reserved</p>        </div>
      </footer>
    </div>
  );
}