'use client';

import React, { useState, useEffect } from 'react';
import {
  Cake,
  Heart,
  Gift,
  Eye,
  Share2,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Loader2,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

type CardType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  occasion: string;
  message: string;
  theme: string;
  recipientEmail: string;
  url: string;
};

type ApiCardResponse = {
  ID?: number;
  id?: number;
  CreatedAt?: string;
  created_at?: string;
  UpdatedAt?: string;
  updated_at?: string;
  DeletedAt?: string | null;
  deleted_at?: string | null;
  UserID?: string;
  user_id?: string;
  Occasion?: string;
  occasion?: string;
  Message?: string;
  message?: string;
  Theme?: string;
  theme?: string;
  RecipientEmail?: string;
  recipient_email?: string;
  URL?: string;
  url?: string;
};

const getOccasionIcon = (occasion: string) => {
  switch (occasion.toLowerCase()) {
    case 'birthday': return <Cake className="w-5 h-5" />;
    case 'anniversary': return <Heart className="w-5 h-5" />;
    default: return <Gift className="w-5 h-5" />;
  }
};

const getOccasionEmoji = (occasion: string) => {
  switch (occasion.toLowerCase()) {
    case 'birthday': return '🎂';
    case 'anniversary': return '💝';
    case 'thank you': return '🙏';
    case 'congratulations': return '🎉';
    case 'get well soon': return '🌸';
    case 'holiday': return '🎄';
    default: return '🎁';
  }
};

const getOccasionColor = (occasion: string) => {
  switch (occasion.toLowerCase()) {
    case 'birthday': return 'bg-pink-50';
    case 'anniversary': return 'bg-red-50';
    case 'thank you': return 'bg-blue-50';
    case 'congratulations': return 'bg-yellow-50';
    case 'get well soon': return 'bg-green-50';
    case 'holiday': return 'bg-purple-50';
    default: return 'bg-gray-50';
  }
};

export default function Card() {
  const [activeTab, setActiveTab] = useState<'all' | 'sent' | 'draft'>('all');
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const googleId = localStorage.getItem('id');
        console.log('Google ID from localStorage:', googleId);
        if (!googleId) {
          setError('Please log in to view your cards');
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/cards?id=${encodeURIComponent(googleId)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }

        const data = await response.json();
        console.log('Raw backend response:', data);
        console.log('Cards array:', data.cards);
        console.log('First card (if exists):', data.cards?.[0]);
        const normalized: CardType[] = (data.cards || []).map((c: ApiCardResponse) => ({
          id: c.ID ?? c.id ?? 0,
          createdAt: c.CreatedAt ?? c.created_at ?? '',
          updatedAt: c.UpdatedAt ?? c.updated_at ?? '',
          deletedAt: c.DeletedAt ?? c.deleted_at ?? null,
          userId: c.UserID ?? c.user_id ?? '',
          occasion: c.Occasion ?? c.occasion ?? '',
          message: c.Message ?? c.message ?? '',
          theme: c.Theme ?? c.theme ?? '',
          recipientEmail: c.RecipientEmail ?? c.recipient_email ?? '',
          url: c.URL ?? c.url ?? '',
        }));
        console.log('Normalized cards:', normalized);
        setCards(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  const filteredCards = cards;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 pt-10 lg:p-10 lg:pt-14">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">My Cards</h1>

              <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.08),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-all duration-300">
                <Plus className="w-6 h-6 text-gray-900" />
                <span className="text-lg font-semibold text-gray-900">Create Card</span>
              </button>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.06),-8px_-8px_16px_rgba(255,255,255,0.8)] p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-xl font-semibold text-gray-900">Your Cards</h2>

                <div className="flex gap-2 bg-gray-100/60 rounded-xl p-1.5 shadow-inner">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'all'
                        ? 'bg-white text-gray-900 shadow-[4px_4px_8px_rgba(0,0,0,0.08),-4px_-4px_8px_rgba(255,255,255,0.9)]'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('sent')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'sent'
                        ? 'bg-white text-gray-900 shadow-[4px_4px_8px_rgba(0,0,0,0.08),-4px_-4px_8px_rgba(255,255,255,0.9)]'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Sent
                  </button>
                  <button
                    onClick={() => setActiveTab('draft')}
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'draft'
                        ? 'bg-white text-gray-900 shadow-[4px_4px_8px_rgba(0,0,0,0.08),-4px_-4px_8px_rgba(255,255,255,0.9)]'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Drafts
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-20">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && !error && cards.length === 0 && (
                <div className="text-center py-20">
                  <Gift className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg">No cards yet. Create your first card!</p>
                </div>
              )}

              {/* Cards Grid */}
              {!isLoading && !error && cards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards.map((card) => (
                    <div
                      key={card.id}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-[8px_8px_16px_rgba(0,0,0,0.06),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.06),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] transition-all duration-300"
                    >
                      {/* Replace emoji with actual card image */}
                      <div className="relative h-48 overflow-hidden">
                        {card.url ? (
                          <img
                            src={card.url}
                            alt={`${card.occasion} card for ${card.recipientEmail}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className={`${getOccasionColor(card.occasion)} h-full flex items-center justify-center text-6xl`}>
                            {getOccasionEmoji(card.occasion)}
                          </div>
                        )}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:bg-white transition">
                            <MoreVertical className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            SENT
                          </span>
                          <div className="flex items-center gap-2 text-gray-700">
                            {getOccasionIcon(card.occasion)}
                            <span className="text-sm font-medium">{card.occasion}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">{card.recipientEmail}</h3>

                        <p className="text-sm text-gray-500">
                          {new Date(card.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <Eye className="w-4.5 h-4.5" />
                              <span className="text-sm font-medium">0</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Share2 className="w-4.5 h-4.5" />
                              <span className="text-sm font-medium">0</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                              <Edit className="w-4.5 h-4.5 text-gray-700" />
                            </button>
                            <button className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition">
                              <Trash2 className="w-4.5 h-4.5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>s
      </div>
    </div>
  );
}