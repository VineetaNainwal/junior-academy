import React from 'react';
import { APP_BADGES } from '../data/gkData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import { X, Award, Sparkles, CheckCircle2, Trophy, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsCount: number;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  starsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-2xl max-w-xl w-full relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-rewards-modal-btn"
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-full transition-transform active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg text-3xl mb-2 animate-bounce">
            🏆
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
            Bal Vidya Star Rewards Book
          </h3>
          <p className="text-xs text-amber-800 font-bold">
            Total Gold Stars Earned: <span className="text-sm text-orange-600 font-black">{starsCount} ⭐</span>
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
          {APP_BADGES.map((badge, idx) => {
            const isUnlocked = starsCount >= (idx + 1) * 2;
            return (
              <div
                key={badge.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.playSparkle();
                    confetti({ particleCount: 25, spread: 40 });
                  } else {
                    sound.playPop();
                  }
                }}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                  isUnlocked
                    ? 'bg-white/90 border-amber-400 shadow-md hover:scale-105'
                    : 'bg-amber-100/40 border-amber-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                    isUnlocked ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-300' : 'bg-slate-200 grayscale'
                  }`}
                >
                  <SmartIcon name={badge.iconEmoji} size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-black text-slate-800 truncate">{badge.title}</h4>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-600 line-clamp-1">{badge.description}</p>
                  <span className="text-[9px] font-bold text-orange-700">
                    {isUnlocked ? '✨ Unlocked!' : `Needs ${(idx + 1) * 2} ⭐`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Banner */}
        <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-200 text-center text-xs font-bold text-amber-900 mt-5">
          🌟 Keep practicing alphabets, numbers, shlokas & puzzles to unlock all sacred achievement badges!
        </div>
      </div>
    </div>
  );
};
