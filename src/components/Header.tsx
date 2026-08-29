import React, { useState } from 'react';
import { AgeGroup, SubjectTab } from '../types';
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
} from 'lucide-react';

interface HeaderProps {
  currentTab: SubjectTab;
  onSelectTab: (tab: SubjectTab) => void;
  ageGroup: AgeGroup;
  onSelectAge: (age: AgeGroup) => void;
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
  ageGroup,
  onSelectAge,
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

  const handleAgeChange = (age: AgeGroup) => {
    sound.playSparkle();
    onSelectAge(age);
    const ageTitles: Record<AgeGroup, string> = {
      '2-3': 'Age 2 to 3, Little Explorers!',
      '3-4': 'Age 3 to 4, Pre-K Learners!',
      '4-6': 'Age 4 to 6, Kindergarten Champions!',
    };
    sound.speak(ageTitles[age]);
  };

  const handleTestGirlVoice = () => {
    sound.playSparkle();
    setIsPlayingVoiceSample(true);
    sound.speak(
      "Namaste little friend! I am your learning buddy. Let's learn English, Math, Hindi, and fun stories together!",
      'en',
      () => setIsPlayingVoiceSample(false)
    );
  };

  const navTabs: { id: SubjectTab; label: string; hindiLabel: string; icon: any; color: string; emoji: string }[] = [
    { id: 'english', label: 'English', hindiLabel: 'आंग्ल', icon: BookOpen, color: 'from-amber-500 to-orange-500', emoji: '🔤' },
    { id: 'math', label: 'Math', hindiLabel: 'गणित', icon: Shapes, color: 'from-emerald-500 to-teal-600', emoji: '🔢' },
    { id: 'hindi', label: 'Hindi', hindiLabel: 'हिंदी', icon: Languages, color: 'from-rose-500 to-pink-600', emoji: '🕉️' },
    { id: 'gk', label: 'General Awareness', hindiLabel: 'सामान्य ज्ञान', icon: Compass, color: 'from-sky-500 to-blue-600', emoji: '🌍' },
    { id: 'shlokas', label: 'Rhymes & Shlokas', hindiLabel: 'श्लोक-गीत', icon: ScrollText, color: 'from-violet-500 to-purple-600', emoji: '🪈' },
    { id: 'stories', label: 'Dadi’s Stories', hindiLabel: 'कहानियाँ', icon: Sparkles, color: 'from-yellow-500 to-amber-600', emoji: '📖' },
    { id: 'games', label: 'Play Zone', hindiLabel: 'खेल कुंज', icon: Gamepad2, color: 'from-fuchsia-500 to-rose-500', emoji: '🎈' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/95 backdrop-blur-md border-b-4 border-amber-300 shadow-md">
      {/* Top Auspicious Marquee / Greeting Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-amber-950 font-bold px-4 py-1.5 text-xs sm:text-sm flex flex-wrap items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 text-white">
          <SmartIcon name="🪔" size={18} />
          <span className="font-semibold tracking-wide">
            ॐ श्री गणेशाय नमः | Bal Vidya: Colorful Early Learning for Kids (Ages 2–6)
          </span>
          <SmartIcon name="🦚" size={18} />
        </div>

        {/* Action Quick Buttons */}
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          {/* Girl Voice Test Button */}
          <button
            id="test-voice-btn"
            onClick={handleTestGirlVoice}
            className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isPlayingVoiceSample
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-rose-100/90 text-rose-900 hover:bg-white hover:text-rose-600'
            }`}
            title="Listen to Sweet Girl Voice Guidance"
          >
            <span>👧</span>
            <span className="hidden sm:inline font-black">Girl Voice:</span>
            <span>{isPlayingVoiceSample ? 'Speaking...' : 'Listen 🎵'}</span>
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
            className="px-2.5 py-1 bg-amber-200 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm transition-transform active:scale-95"
            title="View Badges and Stickers"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
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

      {/* Main Brand & Age Selector Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Characters */}
        <div
          onClick={() => handleTabClick('english')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-amber-50 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl shadow-inner">
              <SmartIcon name="🐘" size={32} />
            </div>
            <span className="absolute -top-1.5 -right-1.5 text-base animate-bounce">
              <SmartIcon name="🦚" size={20} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-800 via-orange-700 to-rose-700 bg-clip-text text-transparent font-['Baloo_2',sans-serif]">
                Bal Vidya
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-200 text-amber-900 border border-amber-300">
                बाल विद्या
              </span>
            </div>
            <p className="text-xs text-amber-800 font-medium flex items-center gap-1">
              <span>Joyful Toddler & Kindergarten Learning</span>
              <span className="text-amber-500">✦</span>
              <span>English, Math, Hindi & GK</span>
            </p>
          </div>
        </div>

        {/* Age Selector Tabs */}
        <div className="flex items-center bg-amber-100/80 p-1 rounded-2xl border-2 border-amber-300 shadow-inner">
          <span className="text-xs font-bold text-amber-800 px-2 hidden sm:inline">Age Level:</span>
          {(['2-3', '3-4', '4-6'] as AgeGroup[]).map((age) => {
            const labels: Record<AgeGroup, { title: string; subtitle: string; emoji: string }> = {
              '2-3': { title: '2–3 Yrs', subtitle: 'Toddler', emoji: '🐣' },
              '3-4': { title: '3–4 Yrs', subtitle: 'Pre-K', emoji: '🌟' },
              '4-6': { title: '4–6 Yrs', subtitle: 'Kinder', emoji: '🚀' },
            };
            const isSelected = ageGroup === age;
            return (
              <button
                key={age}
                id={`age-btn-${age}`}
                onClick={() => handleAgeChange(age)}
                className={`px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                    : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                <span>{labels[age].emoji}</span>
                <span>{labels[age].title}</span>
                <span className="text-[10px] opacity-80 hidden md:inline">({labels[age].subtitle})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Subject Tabs */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          {navTabs.map((tab) => {
            const isSelected = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                  isSelected
                    ? `bg-gradient-to-r ${tab.color} text-white border-white shadow-md scale-105 ring-2 ring-amber-400`
                    : 'bg-white/80 text-amber-900 border-amber-200 hover:bg-amber-100/90 hover:border-amber-300 shadow-sm'
                }`}
              >
                <SmartIcon name={tab.emoji} size={20} />
                <div className="text-left leading-tight">
                  <div className="font-extrabold">{tab.label}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-amber-700'}`}>
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

