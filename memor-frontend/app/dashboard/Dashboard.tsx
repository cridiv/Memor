'use client';

import {
  Plus,
  Heart,
  User,
  Bell,
  Mail,
  Eye,
  Share2,
  ArrowUp,
  ArrowDown,
  Calendar,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const stats = [
    { label: 'Total Cards', value: '24', change: '+12%', icon: Heart, trend: 'up' },
    { label: 'Cards Sent', value: '18', change: '+8%', icon: Mail, trend: 'up' },
    { label: 'Total Views', value: '1.2K', change: '+23%', icon: Eye, trend: 'up' },
    { label: 'Avg. Shares', value: '15', change: '-2%', icon: Share2, trend: 'down' },
  ];

  const upcomingEvents = [
    { name: "Mike's Birthday", date: 'Dec 20', type: 'Birthday', daysLeft: 7 },
    { name: 'Team Anniversary', date: 'Dec 25', type: 'Anniversary', daysLeft: 12 },
    { name: "Jane's Graduation", date: 'Jan 5', type: 'Graduation', daysLeft: 23 },
  ];

  const recentActivity = [
    { action: 'Card viewed', card: 'Holiday Card', time: '2 hours ago', icon: Eye },
    { action: 'Card shared', card: 'Thank You Card', time: '5 hours ago', icon: Share2 },
    { action: 'Card created', card: 'Birthday Card', time: '1 day ago', icon: Plus },
    { action: 'Card sent', card: 'Anniversary Card', time: '2 days ago', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-base text-gray-600">Here's what's happening with your cards</p>
            </div>

            {/* Stats Grid - Comfortably Spacious */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08)]">
                      <stat.icon className="w-7 h-7 text-gray-900" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-base text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Create Card CTA - Prominent but Balanced */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 mb-10 text-white shadow-[12px_12px_24px_rgba(0,0,0,0.25)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Create a New Card</h2>
                  <p className="text-base text-gray-300">Design something beautiful with AI in minutes</p>
                </div>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-[6px_6px_12px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:scale-105 flex items-center gap-2">
                  <Plus className="w-6 h-6" />
                  Create Card
                </button>
              </div>
            </div>

            {/* Recent Activity & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                    <button className="px-5 py-2 rounded-xl text-base font-medium text-gray-900 bg-gradient-to-br from-gray-50 to-white shadow-[4px_4px_8px_rgba(0,0,0,0.08)] hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.08)] transition-all">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4 flex-1">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-[6px_6px_12px_rgba(0,0,0,0.06)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.06)] transition-all"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08)]">
                          <activity.icon className="w-6 h-6 text-gray-800" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-semibold text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.card}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <div className="bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Upcoming</h2>
                    <Calendar className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="space-y-4 flex-1">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-[6px_6px_12px_rgba(0,0,0,0.08)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900 bg-gray-200/80 px-3 py-1 rounded-lg">
                            {event.type}
                          </span>
                          <span className="text-sm text-gray-600">{event.daysLeft} days left</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3 text-base font-semibold text-gray-900 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-[6px_6px_12px_rgba(0,0,0,0.1)] hover:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08)] transition-all">
                    View Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center shadow-xl z-10">
        <button className="flex flex-col items-center gap-1 p-3 text-gray-600">
          <Heart className="w-6 h-6" />
          <span className="text-sm font-medium">Cards</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl text-gray-900 shadow-lg hover:scale-110 transition">
          <Plus className="w-7 h-7" />
          <span className="text-sm font-bold">Create</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-3 text-gray-600">
          <Bell className="w-6 h-6" />
          <span className="text-sm font-medium">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-3 text-gray-600">
          <User className="w-6 h-6" />
          <span className="text-sm font-medium">Profile</span>
        </button>
      </nav>
    </div>
  );
}