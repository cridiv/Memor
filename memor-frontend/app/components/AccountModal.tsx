"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Calendar } from "lucide-react";

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  googleId?: string;
};

type UserInfo = {
  name: string;
  email: string;
  joined: string;
  profileImageUrl?: string;
};

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, googleId }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  const generateAvatarUrl = (name: string) => {
    const seed = encodeURIComponent(name.toLowerCase().replace(/\s+/g, ""));
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b7d0ff&radius=50`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gid = params.get("id");
    if (gid) {
      localStorage.setItem("id", gid);
      params.delete("id");
      const newQuery = params.toString();
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      setError(null);

      try {
        const id = googleId || localStorage.getItem("id");
        if (!id) {
          setError("Missing google ID");
          setIsLoading(false);
          return;
        }
        const response = await fetch(
          `http://localhost:5000/auth/me?id=${encodeURIComponent(id)}`
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        const name =
          [data.firstName, data.lastName].filter(Boolean).join(" ").trim() ||
          "Unknown User";

        const joinedDate = new Date(data.createdAt ?? Date.now()).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        setUserInfo({
          name,
          email: data.email ?? "",
          joined: joinedDate,
          profileImageUrl: data.picture ?? undefined,
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err instanceof Error ? err.message : "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isOpen, googleId]);

  // Close on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-2xl shadow-2xl p-7"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur rounded-full shadow-xl hover:bg-white transition"
        >
          <X className="w-5 h-5 text-gray-900" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Account</h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-6" />
            <p className="text-lg text-gray-600">Loading user data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <X className="w-10 h-10 text-red-600" />
            </div>
            <p className="text-xl font-semibold text-red-600 mb-2">Failed to load user data</p>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : userInfo ? (
          <>
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-7">
              <div className="relative">
                {!avatarError && userInfo.profileImageUrl ? (
                  <img
                    src={userInfo.profileImageUrl}
                    alt={userInfo.name}
                    className="w-24 h-24 rounded-full object-cover shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)]"
                    onError={() => setAvatarError(true)}
                  />
                ) : !avatarError ? (
                  <img
                    src={generateAvatarUrl(userInfo.name)}
                    alt={userInfo.name}
                    className="w-24 h-24 rounded-full object-cover shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)]"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.9)] flex items-center justify-center text-white text-2xl font-bold">
                    {getInitials(userInfo.name)}
                  </div>
                )}
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">{userInfo.name}</h3>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 max-w-md mx-auto w-full">
              {/* Email */}
              <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)]">
                <Mail className="w-5 h-5 text-gray-900" />
                <div>
                  <p className="text-xs font-medium text-gray-600">Email</p>
                  <p className="text-sm font-semibold text-gray-900">{userInfo.email}</p>
                </div>
              </div>

              {/* Joined Date */}
              <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)]">
                <Calendar className="w-5 h-5 text-gray-900" />
                <div>
                  <p className="text-xs font-medium text-gray-600">Joined</p>
                  <p className="text-sm font-semibold text-gray-900">{userInfo.joined}</p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  return typeof window === "undefined" ? null : createPortal(content, document.body);
};

export default AccountModal;