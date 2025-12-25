'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Sparkles,
  Download,
  Mail,
  Copy,
  RefreshCw,
  Check,
  X,
  MessageSquare,
  Image as ImageIcon,
  Heart,
  Gift,
  Cake,
  Star,
  Flower2,
  PartyPopper,
  Smile,
  ThumbsUp,
  Loader2,
} from 'lucide-react';

type CreateCardProps = {
  onClose?: () => void;
};

type CardData = {
  occasion: string;
  theme: string;
  message: string;
  recipientEmail?: string;
};

// Helper: Determine if theme needs white text
const getTextColorForTheme = (theme: string) => {
  const darkThemes = ['minimal-bw', 'retro-80s', 'sunset-orange', 'ocean-blue'];
  return darkThemes.includes(theme) ? 'text-white' : 'text-gray-900';
};

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gray-900 to-gray-700 rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Step1Occasion = ({ selectedOccasion, onSelect, onNext }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const occasions = [
    { id: 'birthday', label: 'Birthday', icon: Cake, color: 'from-pink-100 to-pink-50' },
    { id: 'anniversary', label: 'Anniversary', icon: Heart, color: 'from-red-100 to-red-50' },
    { id: 'wedding', label: 'Wedding', icon: PartyPopper, color: 'from-purple-100 to-purple-50' },
    { id: 'graduation', label: 'Graduation', icon: Star, color: 'from-blue-100 to-blue-50' },
    { id: 'thank-you', label: 'Thank You', icon: ThumbsUp, color: 'from-green-100 to-green-50' },
    { id: 'get-well', label: 'Get Well Soon', icon: Smile, color: 'from-yellow-100 to-yellow-50' },
    { id: 'congratulations', label: 'Congratulations', icon: Gift, color: 'from-orange-100 to-orange-50' },
    { id: 'love', label: 'Love & Romance', icon: Flower2, color: 'from-rose-100 to-rose-50' },
  ];

  const filteredOccasions = occasions.filter((occ) =>
    occ.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose an Occasion</h2>
      <p className="text-gray-600 mb-6">What's the card for?</p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search occasions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredOccasions.map((occasion) => (
          <button
            key={occasion.id}
            onClick={() => onSelect(occasion.id)}
            className={`relative p-6 rounded-2xl transition-all duration-300 bg-gradient-to-br ${occasion.color} ${
              selectedOccasion === occasion.id
                ? 'shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] scale-95'
                : 'shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:scale-105'
            }`}
          >
            {selectedOccasion === occasion.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <occasion.icon className="w-12 h-12 mx-auto mb-3 text-gray-900" />
            <p className="text-sm font-semibold text-gray-900 text-center">{occasion.label}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedOccasion}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
            selectedOccasion
              ? 'bg-gray-900 text-white shadow-[8px_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.3)] hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Step
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Step2Theme = ({ selectedTheme, onSelect, onNext, onBack }: any) => {
  const themes = [
    { id: 'floral-pink', label: 'Floral Pink', gradient: 'from-pink-200 via-pink-100 to-rose-100' },
    { id: 'retro-80s', label: 'Retro 80s', gradient: 'from-purple-300 via-pink-300 to-yellow-200' },
    { id: 'minimal-bw', label: 'Minimal B&W', gradient: 'from-gray-900 via-gray-700 to-gray-500' },
    { id: 'elegant-gold', label: 'Elegant Gold', gradient: 'from-amber-200 via-yellow-100 to-amber-50' },
    { id: 'nature-green', label: 'Nature Green', gradient: 'from-green-200 via-emerald-100 to-teal-50' },
    { id: 'ocean-blue', label: 'Ocean Blue', gradient: 'from-blue-300 via-cyan-200 to-blue-100' },
    { id: 'sunset-orange', label: 'Sunset Orange', gradient: 'from-orange-300 via-red-200 to-pink-200' },
    { id: 'lavender-dream', label: 'Lavender Dream', gradient: 'from-purple-200 via-violet-100 to-pink-50' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Pick a Theme</h2>
      <p className="text-gray-600 mb-6">Choose the style for your card</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className={`relative p-4 rounded-2xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white ${
              selectedTheme === theme.id
                ? 'shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] scale-95'
                : 'shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:scale-105'
            }`}
          >
            {selectedTheme === theme.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center z-10">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`w-full h-32 rounded-xl mb-3 bg-gradient-to-br ${theme.gradient} shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]`} />
            <p className="text-sm font-semibold text-gray-900 text-center">{theme.label}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-gray-900 shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTheme}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
            selectedTheme
              ? 'bg-gray-900 text-white shadow-[8px_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.3)] hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Step
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const AIModal = ({ isOpen, onClose, onSelectMessage }: any) => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = () => {
    setLoading(true);
    setTimeout(() => {
      setSuggestions([
        "Happy Birthday! 🎉 May your special day be filled with laughter, love, and all your favorite things!",
        "Wishing you the happiest of birthdays! Here's to another year of amazing adventures and wonderful memories.",
        "Another year older, another year wiser, and still just as fabulous! Have an incredible birthday!",
        "Cheers to you on your birthday! May this year bring you endless joy and success in everything you do.",
      ]);
      setLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900">AI Message Generator</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe the message you want
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., 'Funny birthday message for my sister who loves books'"
            className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)] mb-4 min-h-24 resize-none"
          />

          <button
            onClick={generateSuggestions}
            disabled={!prompt || loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-900 text-white shadow-[6px_6px_12px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_16px_rgba(0,0,0,0.3)] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Messages
              </>
            )}
          </button>

          {suggestions.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className="text-sm font-medium text-gray-700">Choose a suggestion:</p>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectMessage(suggestion);
                    onClose();
                  }}
                  className="w-full p-4 text-left rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
                >
                  <p className="text-sm text-gray-900">{suggestion}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Step3Message = ({ message, setMessage, email, setEmail, onNext, onBack, selectedTheme }: any) => {
  const [showAIModal, setShowAIModal] = useState(false);

  const themes: Record<string, string> = {
    'floral-pink': 'from-pink-200 via-pink-100 to-rose-100',
    'retro-80s': 'from-purple-300 via-pink-300 to-yellow-200',
    'minimal-bw': 'from-gray-900 via-gray-700 to-gray-500',
    'elegant-gold': 'from-amber-200 via-yellow-100 to-amber-50',
    'nature-green': 'from-green-200 via-emerald-100 to-teal-50',
    'ocean-blue': 'from-blue-300 via-cyan-200 to-blue-100',
    'sunset-orange': 'from-orange-300 via-red-200 to-pink-200',
    'lavender-dream': 'from-purple-200 via-violet-100 to-pink-50',
  };

  const textColor = getTextColorForTheme(selectedTheme || 'floral-pink');

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Add Your Message</h2>
      <p className="text-gray-600 mb-6">Personalize your card with a heartfelt message</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] min-h-40 resize-none"
            />
            <button
              onClick={() => setShowAIModal(true)}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-gradient-to-br from-gray-50 to-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
            >
              <Sparkles className="w-4 h-4 text-gray-900" />
              Generate with AI
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email (Optional)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme Preview</label>
          <div className={`w-full aspect-[9/16] rounded-2xl bg-gradient-to-br ${themes[selectedTheme || 'floral-pink']} shadow-[8px_8px_16px_rgba(0,0,0,0.15)] flex items-center justify-center p-8 relative overflow-hidden`}>
            <div className={`text-center ${textColor} drop-shadow-lg`}>
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <p className="text-lg font-medium leading-relaxed whitespace-pre-line px-4">
                {message || "Your beautiful message will appear here..."}
              </p>
              <p className="text-sm mt-8 opacity-70">— With love ❤️</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-gray-900 shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!message.trim()}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
            message.trim()
              ? 'bg-gray-900 text-white shadow-[8px_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[10px_10px_20px_rgba(0,0,0,0.3)] hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Card
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <AIModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} onSelectMessage={setMessage} />
    </div>
  );
};

const Step4Preview = ({
  cardData,
  generatedCardUrl,
  isGenerating,
  error,
  onBack,
  onRegenerate,
  onConfirmGenerate,
}: {
  cardData: CardData;
  generatedCardUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  onBack: () => void;
  onRegenerate: () => void;
  onConfirmGenerate: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const themes: Record<string, string> = {
    'floral-pink': 'from-pink-200 via-pink-100 to-rose-100',
    'retro-80s': 'from-purple-300 via-pink-300 to-yellow-200',
    'minimal-bw': 'from-gray-900 via-gray-700 to-gray-500',
    'elegant-gold': 'from-amber-200 via-yellow-100 to-amber-50',
    'nature-green': 'from-green-200 via-emerald-100 to-teal-50',
    'ocean-blue': 'from-blue-300 via-cyan-200 to-blue-100',
    'sunset-orange': 'from-orange-300 via-red-200 to-pink-200',
    'lavender-dream': 'from-purple-200 via-violet-100 to-pink-50',
  };

  const textColor = getTextColorForTheme(cardData.theme);

  const handleCopyLink = () => {
    const link = generatedCardUrl || 'https://cardcraft.app/placeholder';
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <Loader2 className="w-20 h-20 mx-auto mb-6 text-gray-900 animate-spin" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI is crafting your beautiful card...</h2>
        <p className="text-gray-600">This usually takes 8-15 seconds</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <X className="w-20 h-20 mx-auto mb-6 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Go Back
          </button>
          <button
            onClick={onConfirmGenerate}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:scale-105 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Your Card is Ready! 🎉</h2>
      <p className="text-gray-600 mb-8 text-center">Share this special moment with your loved ones</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          {generatedCardUrl ? (
            <img
              src={generatedCardUrl}
              alt="Your generated greeting card"
              className="w-full max-w-sm rounded-3xl shadow-2xl border border-gray-200"
            />
          ) : (
            <div
              className={`w-full max-w-sm aspect-[9/16] rounded-3xl bg-gradient-to-br ${themes[cardData.theme]} shadow-[12px_12px_24px_rgba(0,0,0,0.2)] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden`}
            >
              <div className={`${textColor} drop-shadow-2xl`}>
                <Heart className="w-20 h-20 mx-auto mb-8 opacity-90" />
                <p className="text-xl font-medium leading-relaxed whitespace-pre-line px-6">
                  {cardData.message}
                </p>
                <p className="text-base mt-10 opacity-80">— With love ❤️</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)]">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onRegenerate}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Edit & Regenerate
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)]">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all">
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all">
                <ImageIcon className="w-4 h-4" />
                Instagram
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all">
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            {generatedCardUrl && (
              <div className="text-center text-sm text-gray-500 break-all">
                Shareable link: <span className="font-medium">{generatedCardUrl}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CreateCard({ onClose }: CreateCardProps = {}) {
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState<CardData>({
    occasion: '',
    theme: '',
    message: '',
    recipientEmail: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCardUrl, setGeneratedCardUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;

  const updateCardData = (updates: Partial<CardData>) => {
    setCardData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setError(null);
  };

const handleGenerateCard = async () => {
  setIsGenerating(true);
  setError(null);
  setGeneratedCardUrl(null);

  try {
    // Get the Google ID from localStorage
    const googleId = localStorage.getItem('id');
    console.log('DEBUG: Google ID from localStorage:', googleId);

    if (!googleId) {
      setError('User not authenticated. Please log in again.');
      setIsGenerating(false);
      return;
    }

    const payload = {
      user_id: googleId, // Use the actual Google ID from localStorage
      occasion: cardData.occasion,
      message: cardData.message,
      theme: cardData.theme,
      recipient_email: cardData.recipientEmail || '',
    };

    console.log('DEBUG: Payload being sent:', payload);

    const response = await fetch('http://localhost:5000/api/generate-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const data = await response.json();
    console.log('Full backend response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.error || data.details || 'Failed to generate card');
    }
    
    // Check if card exists in response
    if (!data.card) {
      console.error('Card missing from response. Full data:', data);
      throw new Error('Invalid response from server - no card data');
    }

    if (!data.card.url && !data.card.URL) {
      console.error('URL missing from card. Card data:', data.card);
      throw new Error('Card was created but has no image URL');
    }
    
    // Handle both snake_case and PascalCase
    const cardUrl = data.card.URL || data.card.url;
    setGeneratedCardUrl(cardUrl);
    
    const cardId = data.card.ID || data.card.id;
    if (cardId) {
      localStorage.setItem('lastCardId', cardId.toString());
    }
    
  } catch (err: any) {
    setError(err.message || 'An error occurred while generating your card. Please try again.');
    console.error('Card generation error:', err);
  } finally {
    setIsGenerating(false);
  }
};

const handleRegenerate = () => {
    setStep(3);
    setGeneratedCardUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-7xl mx-auto relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-16 right-0 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition lg:hidden"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        )}

        {step < 4 && <ProgressBar currentStep={step} totalSteps={totalSteps} />}

        {step === 1 && (
          <Step1Occasion
            selectedOccasion={cardData.occasion}
            onSelect={(occasion: string) => updateCardData({ occasion })}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <Step2Theme
            selectedTheme={cardData.theme}
            onSelect={(theme: string) => updateCardData({ theme })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <Step3Message
            message={cardData.message}
            setMessage={(message: string) => updateCardData({ message })}
            email={cardData.recipientEmail || ''}
            setEmail={(email: string) => updateCardData({ recipientEmail: email || undefined })}
            selectedTheme={cardData.theme}
            onNext={() => {
              handleNext();
              handleGenerateCard();
            }}
            onBack={handleBack}
          />
        )}

        {step === 4 && (
          <Step4Preview
            cardData={cardData}
            generatedCardUrl={generatedCardUrl}
            isGenerating={isGenerating}
            error={error}
            onBack={handleBack}
            onRegenerate={handleRegenerate}
            onConfirmGenerate={handleGenerateCard}
          />
        )}
      </div>
    </div>
  );
}