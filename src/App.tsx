import React, { useState, useEffect } from 'react';
import { AgeGroup, SubjectTab } from './types';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { EnglishModule } from './components/EnglishModule';
import { MathModule } from './components/MathModule';
import { HindiModule } from './components/HindiModule';
import { GkModule } from './components/GkModule';
import { ShlokaRhymes } from './components/ShlokaRhymes';
import { StoryCorner } from './components/StoryCorner';
import { GamesZone } from './components/GamesZone';
import { RewardsModal } from './components/RewardsModal';
import { ParentGuideModal } from './components/ParentGuideModal';
import { SmartIcon } from './components/SmartIcon';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, HelpCircle, Award, Volume2, Shield } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<SubjectTab>('english');
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-100/60 text-slate-800 flex flex-col font-['Fredoka',sans-serif] selection:bg-amber-300 selection:text-amber-950">
      {/* Auspicious Top Header Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        ageGroup={ageGroup}
        onSelectAge={setAgeGroup}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        starsCount={starsCount}
        onOpenBadges={() => setShowBadges(true)}
        onOpenParentGuide={() => setShowParentGuide(true)}
      />

      {/* Main Learning Canvas Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 md:p-8">
        {/* Dynamic Current Subject Render */}
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
        {currentTab === 'shlokas' && (
          <ShlokaRhymes ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'stories' && (
          <StoryCorner ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
        {currentTab === 'games' && (
          <GamesZone ageGroup={ageGroup} onAwardStar={handleAwardStar} />
        )}
      </main>

      {/* Warm Auspicious Footer */}
      <footer className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-950 text-amber-100 py-6 px-4 border-t-4 border-amber-400 mt-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <SmartIcon name="🪔" size={24} />
            </div>
            <div>
              <div className="font-extrabold text-amber-200 text-sm font-['Baloo_2',sans-serif]">
                Bal Vidya (बाल विद्या) — Early Childhood Learning Platform
              </div>
              <div className="text-xs text-amber-300/80">
                ॐ असतो मा सद्गमय | तमसो मा ज्योतिर्गमय
              </div>
            </div>
          </div>

          {/* Quick Badges & Guide triggers in footer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSparkle();
                setShowBadges(true);
              }}
              className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-amber-600/60"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{starsCount} ⭐ Badges</span>
            </button>

            <button
              onClick={() => {
                sound.playBell();
                setShowParentGuide(true);
              }}
              className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-amber-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-amber-600/60"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
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
