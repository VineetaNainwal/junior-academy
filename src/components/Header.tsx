import React, { useState } from 'react';
import { SubjectTab } from '../types';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  Volume2,
  VolumeX,
  Music,
  Award,
  BookOpen,
  Sparkles,
  HelpCircle,
  Shapes,
  Languages,
  Compass,
  Gamepad2,
  ScrollText,
  ChevronDown,
  Home,
  Star,
} from 'lucide-react';

interface HeaderProps {
  currentTab: SubjectTab;
  onSelectTab: (tab: SubjectTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  starsCount: number;
  onOpenBadges: () => void;
  onOpenParentGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  starsCount,
  onOpenBadges,
  onOpenParentGuide,
}) => {
  const [isPlayingVoiceSample, setIsPlayingVoiceSample] = useState(false);

  const handleTabClick = (tab: SubjectTab) => {
    sound.playBell();
    onSelectTab(tab);
  };

  const handleTestGirlVoice = () => {
    sound.playSparkle();
    setIsPlayingVoiceSample(true);
    sound.speak(
      "Namaste little friend! I am Priya, your learning buddy. Let's learn English, Math, Hindi, and fun rhymes together!",
      'en',
      () => setIsPlayingVoiceSample(false)
    );
  };

  const navTabs: { id: SubjectTab; label: string; hindiLabel: string; icon: any; color: string; activeColor: string; inactiveColor: string; emoji: string }[] = [
    { id: 'home', label: 'Home', hindiLabel: 'मुख्य पृष्ठ', icon: Home, color: 'from-indigo-500 to-purple-600', activeColor: 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300', inactiveColor: 'bg-indigo-50/70 text-indigo-900 border-indigo-200 hover:bg-indigo-100', emoji: '🏠' },
    { id: 'english', label: 'English', hindiLabel: 'आंग्ल', icon: BookOpen, color: 'from-sky-400 to-blue-500', activeColor: 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-300', inactiveColor: 'bg-sky-50/70 text-sky-900 border-sky-200 hover:bg-sky-100', emoji: '🔤' },
    { id: 'math', label: 'Math', hindiLabel: 'गणित', icon: Shapes, color: 'from-emerald-400 to-teal-500', activeColor: 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300', inactiveColor: 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100', emoji: '🔢' },
    { id: 'hindi', label: 'Hindi', hindiLabel: 'हिंदी', icon: Languages, color: 'from-rose-400 to-pink-500', activeColor: 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-300', inactiveColor: 'bg-rose-50/70 text-rose-900 border-rose-200 hover:bg-rose-100', emoji: '🕉️' },
    { id: 'gk', label: 'General Awareness', hindiLabel: 'सामान्य ज्ञान', icon: Compass, color: 'from-purple-400 to-indigo-500', activeColor: 'bg-purple-500 text-white border-purple-400 ring-2 ring-purple-300', inactiveColor: 'bg-purple-50/70 text-purple-900 border-purple-200 hover:bg-purple-100', emoji: '🌍' },
    { id: 'rhymes', label: 'Rhymes', hindiLabel: 'बालगीत', icon: Music, color: 'from-pink-400 to-rose-500', activeColor: 'bg-pink-500 text-white border-pink-400 ring-2 ring-pink-300', inactiveColor: 'bg-pink-50/70 text-pink-900 border-pink-200 hover:bg-pink-100', emoji: '🎵' },
    { id: 'sanatan', label: 'Sanatan Wisdom', hindiLabel: 'सनातन विद्या', icon: ScrollText, color: 'from-amber-400 to-yellow-500', activeColor: 'bg-amber-500 text-white border-amber-400 ring-2 ring-amber-300', inactiveColor: 'bg-amber-50/70 text-amber-950 border-amber-200 hover:bg-amber-100', emoji: '🪔' },
    { id: 'games', label: 'Play Zone', hindiLabel: 'खेल कुंज', icon: Gamepad2, color: 'from-cyan-400 to-teal-500', activeColor: 'bg-cyan-500 text-white border-cyan-400 ring-2 ring-cyan-300', inactiveColor: 'bg-cyan-50/70 text-cyan-900 border-cyan-200 hover:bg-cyan-100', emoji: '🎈' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-xs font-['Nunito',sans-serif]">
      {/* Top Auspicious Marquee / Greeting Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold px-4 py-1.5 text-xs sm:text-sm flex flex-wrap items-center justify-between shadow-inner">
        <div className="flex items-center gap-2">
          <SmartIcon name="🎈" size={18} />
          <span className="font-semibold tracking-wide font-['Baloo_2',sans-serif]">
            Bal Vidya: Joyful Early Learning & Interactive Play for Kids (All Ages 2–6)
          </span>
          <SmartIcon name="⭐" size={18} />
        </div>

        {/* Action Quick Buttons */}
        <div className="flex items-center gap-2 mt-1 sm:mt-0 relative">
          {/* Girl Voice Test Button */}
          <button
            id="test-voice-btn"
            onClick={handleTestGirlVoice}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isPlayingVoiceSample
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white/20 text-white hover:bg-white hover:text-indigo-900'
            }`}
            title="Listen to Sweet Girl Voice Guidance"
          >
            <span>👧</span>
            <span className="hidden sm:inline font-black">Voice:</span>
            <span>{isPlayingVoiceSample ? 'Speaking...' : 'Priya Voice 🎵'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            id="toggle-sound-btn"
            onClick={onToggleSound}
            className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              soundEnabled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500/80 text-white'
            }`}
            title={soundEnabled ? 'Sound Effects ON' : 'Sound Effects MUTED'}
          >
            {soundEnabled ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* Speech Voice Toggle */}
          <button
            id="toggle-speech-btn"
            onClick={onToggleSpeech}
            className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
              speechEnabled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-red-500/80 text-white'
            }`}
            title={speechEnabled ? 'Voice Guidance ON' : 'Voice Guidance MUTED'}
          >
            {speechEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{speechEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>

          {/* Star Trophy Badge Counter */}
          <button
            id="open-badges-btn"
            onClick={() => {
              sound.playSparkle();
              onOpenBadges();
            }}
            className="px-2.5 py-1 bg-amber-300 hover:bg-amber-200 text-amber-950 rounded-lg text-xs font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95"
            title="View Badges and Stickers"
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>{starsCount} ⭐</span>
          </button>

          {/* Parent / Teacher Info */}
          <button
            id="open-parent-guide-btn"
            onClick={() => {
              sound.playBell();
              onOpenParentGuide();
            }}
            className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-bold flex items-center gap-1"
            title="Parent & Teacher Guide"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Parents</span>
          </button>
        </div>
      </div>

      {/* Main Brand Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Characters */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
              <SmartIcon name="🐘" size={32} />
            </div>
            <span className="absolute -top-1.5 -right-1.5 text-base animate-bounce">
              <SmartIcon name="🌈" size={20} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-['Baloo_2',sans-serif]">
                Bal Vidya
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-black bg-indigo-100 text-indigo-800 border border-indigo-200 font-['Baloo_2',sans-serif]">
                बाल विद्या
              </span>
            </div>
            <p className="text-xs text-slate-600 font-bold flex items-center gap-1">
              <span>All-in-One Early Learning (Ages 2–6)</span>
              <span className="text-indigo-400">✦</span>
              <span>English, Math, Hindi, GK, Rhymes & Stories</span>
            </p>
          </div>
        </div>

        {/* Child-Friendly Highlights Badge Bar */}
        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
          <span className="flex items-center gap-1 text-indigo-700 font-black">
            <span>✨</span>
            <span>All Ages (2–6 Yrs)</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-emerald-700">
            <span>🛡️</span>
            <span>Safe & Ad-Free</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="hidden sm:flex items-center gap-1 text-pink-700">
            <span>👧</span>
            <span>Voice Guided</span>
          </span>
        </div>
      </div>

      {/* Navigation Subject Tabs with Soft Pastel Category Accents */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-2.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          {navTabs.map((tab) => {
            const isSelected = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                  isSelected
                    ? `${tab.activeColor} shadow-md scale-105`
                    : `${tab.inactiveColor} shadow-xs`
                }`}
              >
                <SmartIcon name={tab.emoji} size={20} />
                <div className="text-left leading-tight">
                  <div className="font-extrabold">{tab.label}</div>
                  <div className={`text-[10px] font-['Baloo_2',sans-serif] ${isSelected ? 'opacity-90' : 'opacity-70'}`}>
                    {tab.hindiLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};



