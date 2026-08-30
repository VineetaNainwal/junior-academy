import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Sparkles, MessageCircle, X, Heart } from 'lucide-react';

export const FloatingBuddy: React.FC = () => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isDancing, setIsDancing] = useState(false);

  const cheers = [
    `Great job little superstar! 🌟 Keep learning!`,
    `You are so smart! 👏 Let's learn something new!`,
    `Namaste! I am Priya! Let's explore together! 🪷`,
    `You collected golden stars today! ⭐⭐⭐⭐⭐`,
    `Tap on English, Math, Hindi or GK to have fun! 🚀`,
    `You are doing amazing! Shabash! 🎉`,
  ];

  const handleBuddyClick = () => {
    sound.playSparkle();
    setIsDancing(true);
    const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
    setBubbleText(randomCheer);
    sound.speak(randomCheer);

    setTimeout(() => {
      setIsDancing(false);
    }, 1500);

    setTimeout(() => {
      setBubbleText(null);
    }, 6000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none">
      {/* Speech Bubble popup */}
      {bubbleText && (
        <div className="bg-white rounded-2xl p-3 max-w-[220px] sm:max-w-[260px] border-2 border-indigo-200 shadow-xl text-xs font-black text-slate-800 animate-in fade-in slide-in-from-bottom-2 relative">
          <button
            onClick={() => setBubbleText(null)}
            className="absolute top-1 right-1 text-slate-400 hover:text-slate-700"
          >
            <X size={12} />
          </button>
          <p className="pr-2">{bubbleText}</p>
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b-2 border-r-2 border-indigo-200 transform rotate-45"></div>
        </div>
      )}

      {/* Mascot Avatar Button */}
      <button
        id="mascot-buddy-btn"
        onClick={handleBuddyClick}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 border-3 border-white ring-4 ring-indigo-200 ${
          isDancing ? 'animate-bounce' : 'animate-pulse'
        }`}
        title="Click Priya for cheering encouragement!"
      >
        <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
          <span className="drop-shadow">👧</span>
        </div>
      </button>
    </div>
  );
};
