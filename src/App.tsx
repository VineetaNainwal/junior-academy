import React, { useState, useEffect } from 'react';
import { AgeGroup, SubjectTab } from './types';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { EnglishModule } from './components/EnglishModule';
import { MathModule } from './components/MathModule';
import { HindiModule } from './components/HindiModule';
import { GkModule } from './components/GkModule';
import { RhymesModule } from './components/RhymesModule';
import { SanatanWisdomModule } from './components/SanatanWisdomModule';
import { GamesZone } from './components/GamesZone';
import { RewardsModal } from './components/RewardsModal';
import { ParentGuideModal } from './components/ParentGuideModal';
import { FloatingBuddy } from './components/FloatingBuddy';
import { SmartIcon } from './components/SmartIcon';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, HelpCircle, Award, Volume2, Shield } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<SubjectTab>('home');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('3-4');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [starsCount, setStarsCount] = useState(5);
  const [showBadges, setShowBadges] = useState(false);
  const [showParentGuide, setShowParentGuide] = useState(false);

  // Sync audio state to sound manager
  useEffect(() => {
    sound.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    sound.setSpeechEnabled(speechEnabled);
  }, [speechEnabled]);

  // Stop any active speech, chant, or rhyme playback whenever the user switches sections
  useEffect(() => {
    sound.stopSpeaking();
  }, [currentTab]);

  const handleAwardStar = () => {
    setStarsCount((prev) => prev + 1);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) sound.playBell();
  };

  const handleToggleSpeech = () => {
    const next = !speechEnabled;
    setSpeechEnabled(next);
    if (next) sound.speak('Voice guidance enabled!');
    else sound.stopSpeaking();
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col font-['Nunito',sans-serif] selection:bg-indigo-200 selection:text-indigo-950 relative overflow-x-hidden">
      {/* Background Soft Pastel Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Top-Left Indigo Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-transparent blur-3xl" />
        {/* Top-Right Amber Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-bl from-amber-200/35 via-orange-100/25 to-transparent blur-3xl" />
        {/* Center-Left Sky/Cyan Glow */}
        <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-sky-200/25 blur-3xl" />
        {/* Bottom-Right Rose/Pink Glow */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-200/30 via-rose-100/20 to-transparent blur-3xl" />

        {/* Subtle Floating Learning Elements */}
        <div className="absolute top-20 left-6 text-2xl opacity-25 animate-pulse">🌟</div>
        <div className="absolute top-44 right-8 text-2xl opacity-30 animate-bounce">🎈</div>
        <div className="absolute top-2/3 left-4 text-2xl opacity-25">🌸</div>
        <div className="absolute bottom-32 right-10 text-2xl opacity-25 animate-pulse">🪔</div>
        <div className="absolute top-1/2 right-4 text-xl opacity-20">🌈</div>
      </div>

      {/* Auspicious Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        starsCount={starsCount}
        onOpenBadges={() => setShowBadges(true)}
        onOpenParentGuide={() => setShowParentGuide(true)}
      />

      {/* Main Learning Canvas Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 md:p-8 relative z-10">
        {/* Dynamic Current Subject Render */}
        {currentTab === 'home' && (
          <HomePage
            onNavigateTab={setCurrentTab}
            starsCount={starsCount}
            onAwardStar={handleAwardStar}
            onOpenBadges={() => setShowBadges(true)}
            onOpenParentGuide={() => setShowParentGuide(true)}
          />
        )}
        {currentTab === 'english' && (
          <EnglishModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'math' && (
          <MathModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'hindi' && (
          <HindiModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'gk' && (
          <GkModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'rhymes' && (
          <RhymesModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'sanatan' && (
          <SanatanWisdomModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'shlokas' && (
          <SanatanWisdomModule ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'games' && (
          <GamesZone ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
      </main>

      {/* Floating Interactive Mascot Buddy */}
      <FloatingBuddy />

      {/* Clean & Friendly Kids Learning Footer */}
      <footer className="bg-slate-900 text-slate-200 py-6 px-4 border-t-2 border-indigo-500/30 mt-12 shadow-inner relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-xl">
              <span>👧</span>
            </div>
            <div>
              <div className="font-black text-white text-sm font-['Baloo_2',sans-serif]">
                Bal Vidya (बाल विद्या) — Joyful Learning Platform
              </div>
              <div className="text-xs text-slate-400 font-['Baloo_2',sans-serif]">
                Early Childhood Foundations for Kids (All Ages 2–6)
              </div>
            </div>
          </div>

          {/* Quick Action triggers in footer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSparkle();
                setShowBadges(true);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border border-slate-700 hover:border-amber-400"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{starsCount} ⭐ Badges</span>
            </button>

            <button
              onClick={() => {
                sound.playBell();
                setShowParentGuide(true);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 border border-slate-700 hover:border-sky-400"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Parent Guide</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Star Rewards Modal */}
      <RewardsModal
        isOpen={showBadges}
        onClose={() => setShowBadges(false)}
        starsCount={starsCount}
      />

      {/* Parent & Educator Guide Modal */}
      <ParentGuideModal
        isOpen={showParentGuide}
        onClose={() => setShowParentGuide(false)}
      />
    </div>
  );
}

export default App;


