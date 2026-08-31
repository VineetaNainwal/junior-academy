import React, { useState, useEffect } from 'react';
import { AgeGroup, SanatanTopicItem, SanatanCategory } from '../types';
import { SANATAN_SUBSECTIONS, SANATAN_WISDOM_DATA } from '../data/sanatanWisdomData';
import { SanatanArtwork } from './sanatan/SanatanArtwork';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  Award,
  BookOpen,
  Heart,
  Star,
  Languages,
  ScrollText,
  CheckCircle2,
  HelpCircle,
  Flower2,
  Flame,
  Sun,
  X,
  ChevronRight,
  ChevronLeft,
  Music,
  Share2,
  Smile,
  ShieldCheck,
  Compass,
  Utensils,
  Eye,
  Info,
  Check
} from 'lucide-react';

interface SanatanWisdomModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const SanatanWisdomModule: React.FC<SanatanWisdomModuleProps> = ({
  ageGroup,
  onAwardStar,
}) => {
  const [activeCategory, setActiveCategory] = useState<SanatanCategory>('gods');
  const currentCategoryTopics = SANATAN_WISDOM_DATA.filter(
    (t) => t.category === activeCategory
  );

  // Selected item in the Left Spotlight Box
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    currentCategoryTopics[0]?.id || 'ganesha'
  );

  // Active topic object
  const activeTopic =
    SANATAN_WISDOM_DATA.find((t) => t.id === selectedTopicId) ||
    currentCategoryTopics[0] ||
    SANATAN_WISDOM_DATA[0];

  // Full Explore Modal State
  const [exploreModalOpen, setExploreModalOpen] = useState(false);

  // Audio / Chanting state
  const [isChanting, setIsChanting] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [languageMode, setLanguageMode] = useState<'both' | 'english' | 'hindi'>('both');
  const [learnedTopics, setLearnedTopics] = useState<Record<string, boolean>>({});

  // Stop audio immediately when unmounting or changing sections
  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  // Switch category
  const handleSelectCategory = (category: SanatanCategory) => {
    sound.playBell();
    handleStopAudio();
    setActiveCategory(category);
    const firstOfCategory = SANATAN_WISDOM_DATA.find((t) => t.category === category);
    if (firstOfCategory) {
      setSelectedTopicId(firstOfCategory.id);
    }
  };

  // Select card on right grid
  const handleSelectTopicCard = (topic: SanatanTopicItem) => {
    sound.playPop();
    handleStopAudio();
    setSelectedTopicId(topic.id);
    sound.speak(
      languageMode === 'hindi' ? topic.hindiTitle : topic.title,
      languageMode === 'hindi' ? 'hi' : 'en'
    );
  };

  const handleStopAudio = () => {
    sound.stopSpeaking();
    setIsChanting(false);
    setIsNarrating(false);
  };

  // Voice narration or Chant sound
  const handlePlaySound = (topic: SanatanTopicItem) => {
    handleStopAudio();
    sound.playBell();

    if (topic.category === 'shlokas' && topic.shloka) {
      setIsChanting(true);
      sound.speak(topic.shloka.audioText, 'hi', () => {
        setIsChanting(false);
        handleMarkLearned(topic.id);
      });
    } else {
      setIsNarrating(true);
      const isHi = languageMode === 'hindi';
      const textToSpeak =
        isHi && topic.hindiIntroduction
          ? `${topic.hindiTitle}। ${topic.hindiIntroduction.join(' ')}`
          : `${topic.title}. ${topic.subtitle}. ${topic.introduction.join(' ')}`;

      sound.speak(textToSpeak, isHi ? 'hi' : 'en', () => {
        setIsNarrating(false);
        handleMarkLearned(topic.id);
      });
    }
  };

  const handleMarkLearned = (topicId: string) => {
    if (!learnedTopics[topicId]) {
      setLearnedTopics((prev) => ({ ...prev, [topicId]: true }));
      sound.playCelebration();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
      onAwardStar();
    }
  };

  const currentCategoryConfig =
    SANATAN_SUBSECTIONS.find((s) => s.id === activeCategory) || SANATAN_SUBSECTIONS[0];

  return (
    <div className="space-y-5">
      {/* 1. Category Switcher Tabs at Top */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-3.5 sm:p-5 border-2 border-indigo-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-xs">
              <span>{currentCategoryConfig.iconEmoji}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-indigo-900 uppercase tracking-wider bg-indigo-100 px-2.5 py-0.5 rounded-full">
                  Sanatan Bal Vidya
                </span>
                <span className="text-xs font-bold text-slate-500 font-['Baloo_2',sans-serif]">
                  सनातन ज्ञान
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Baloo_2',sans-serif] leading-tight">
                {currentCategoryConfig.name} ({currentCategoryConfig.hindiName})
              </h2>
            </div>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-stretch md:self-auto justify-center">
            <button
              onClick={() => setLanguageMode('both')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                languageMode === 'both'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              English + हिंदी
            </button>
            <button
              onClick={() => setLanguageMode('english')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                languageMode === 'english'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguageMode('hindi')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                languageMode === 'hindi'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SANATAN_SUBSECTIONS.map((sub) => {
            const isActive = activeCategory === sub.id;
            return (
              <button
                key={sub.id}
                id={`sanatan-cat-tab-${sub.id}`}
                onClick={() => handleSelectCategory(sub.id)}
                className={`p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all border-2 shadow-xs ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm font-black ring-2 ring-indigo-200'
                    : 'bg-white hover:bg-indigo-50/50 text-slate-700 border-slate-200 font-bold'
                }`}
              >
                <div className="text-xl sm:text-2xl mb-0.5">{sub.iconEmoji}</div>
                <div className="text-xs font-extrabold line-clamp-1 font-['Nunito',sans-serif]">
                  {sub.name}
                </div>
                <div className="text-[11px] opacity-90 line-clamp-1 font-['Baloo_2',sans-serif]">
                  {sub.hindiName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main 2-Panel Layout (Left Box: Spotlight & Image / Right Box: Tap Any Letter Style Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT BOX: Spotlight Card & Image / Audio / Explore Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-200 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
          {/* Picture / Artwork Frame */}
          <div className="w-full relative">
            <SanatanArtwork
              item={activeTopic}
              size="spotlight"
              showOverlayText={false}
            />

            {/* Learned Checkmark Badge */}
            {learnedTopics[activeTopic.id] && (
              <div className="absolute top-3 left-3 z-30 bg-emerald-500 text-white rounded-full p-1 shadow-md border-2 border-white">
                <CheckCircle2 size={16} />
              </div>
            )}
          </div>

          {/* Title and Subtitles */}
          <div className="mt-4 space-y-1.5 w-full">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Baloo_2',sans-serif] leading-tight">
              {languageMode === 'hindi' ? activeTopic.hindiTitle : activeTopic.title}
            </h3>

            {/* Hindi / Sanskrit Pill Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs font-['Baloo_2',sans-serif] border border-slate-200">
              {languageMode === 'hindi' ? activeTopic.title : activeTopic.hindiTitle}
              {activeTopic.sanskritTitle && ` • ${activeTopic.sanskritTitle}`}
            </div>

            {/* Child-friendly Quote Box */}
            <div className="mt-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium italic leading-relaxed">
              "{activeTopic.subtitle}"
            </div>
          </div>

          {/* Action Buttons Bar (Listen Sound / Explore) */}
          <div className="mt-5 w-full flex flex-col sm:flex-row gap-2.5">
            {/* Listen Sound / Chant Button */}
            <button
              id={`play-spotlight-${activeTopic.id}`}
              onClick={() => handlePlaySound(activeTopic)}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 ${
                isChanting || isNarrating
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Volume2 size={20} />
              <span>
                {isChanting || isNarrating
                  ? 'Speaking...'
                  : activeTopic.category === 'shlokas'
                  ? 'Listen & Chant'
                  : 'Listen Sound'}
              </span>
            </button>

            {/* Explore Button */}
            <button
              id={`explore-btn-${activeTopic.id}`}
              onClick={() => {
                sound.playSparkle();
                setExploreModalOpen(true);
              }}
              className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-sm border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <BookOpen size={18} className="text-indigo-600" />
              <span>Explore</span>
            </button>
          </div>
        </div>

        {/* RIGHT BOX: Grid of Clickable Topic Cards */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header / Instructions */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base font-['Baloo_2',sans-serif]">
                  Tap Any Card:
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  (Hear sounds & see wisdom)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-black text-xs border border-slate-200">
                {currentCategoryTopics.length} Cards
              </span>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
              {currentCategoryTopics.map((topic) => {
                const isSelected = topic.id === activeTopic.id;
                const isLearned = Boolean(learnedTopics[topic.id]);

                return (
                  <button
                    key={topic.id}
                    id={`sanatan-grid-card-${topic.id}`}
                    onClick={() => handleSelectTopicCard(topic)}
                    className={`p-3 rounded-2xl sm:rounded-3xl border-2 flex flex-col items-center justify-center text-center transition-all duration-200 min-h-[105px] sm:min-h-[115px] relative group ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-102 ring-2 ring-indigo-200 font-black'
                        : 'bg-white hover:bg-indigo-50/40 text-slate-800 border-slate-200 hover:border-indigo-200 shadow-xs'
                    }`}
                  >
                    {/* Learned Star/Checkmark */}
                    {isLearned && (
                      <span className="absolute top-1.5 right-1.5 text-xs">
                        ⭐
                      </span>
                    )}

                    {/* Character Initial / Avatar Symbol */}
                    <div className="text-2xl sm:text-3xl mb-1 transform group-hover:scale-110 transition-transform">
                      {topic.artTheme.badgeEmoji}
                    </div>

                    {/* English Name */}
                    <div
                      className={`text-xs sm:text-sm font-extrabold line-clamp-1 font-['Baloo_2',sans-serif] ${
                        isSelected ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {languageMode === 'hindi' ? topic.hindiTitle : topic.title}
                    </div>

                    {/* Hindi Subtitle */}
                    <div
                      className={`text-[10px] sm:text-[11px] line-clamp-1 font-semibold ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {languageMode === 'hindi' ? topic.title : topic.hindiTitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Helpful Tip */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span>💡</span>
              <span>Click any card to spotlight, or press <strong>Explore</strong> to read full story!</span>
            </span>
            <button
              onClick={() => {
                sound.playSparkle();
                setExploreModalOpen(true);
              }}
              className="text-indigo-600 font-extrabold hover:underline flex items-center gap-1"
            >
              <span>Read Full Details</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Detailed Interactive Wisdom Reader Modal (When "Explore" is Clicked) */}
      {exploreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-indigo-200 shadow-2xl relative p-5 sm:p-7 space-y-5 font-['Nunito',sans-serif]">
            {/* Close Button */}
            <button
              onClick={() => {
                handleStopAudio();
                setExploreModalOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all z-30 shadow-xs"
              title="Close"
            >
              <X size={20} />
            </button>

            {/* Header / Category Tag */}
            <div className="flex items-center gap-2 pr-10">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black uppercase tracking-wider">
                {activeTopic.category.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Illustrated Vedic Treasury
              </span>
            </div>

            {/* Large Picture Frame */}
            <div className="relative">
              <SanatanArtwork
                item={activeTopic}
                size="large"
                showOverlayText={false}
              />
            </div>

            {/* Title & Speech Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Baloo_2',sans-serif]">
                  {languageMode === 'hindi' ? activeTopic.hindiTitle : activeTopic.title}
                </h2>
                <div className="text-sm font-bold text-indigo-700 font-['Baloo_2',sans-serif]">
                  {languageMode === 'hindi' ? activeTopic.title : activeTopic.hindiTitle} • {activeTopic.subtitle}
                </div>
              </div>

              {/* Narrate / Chant Button */}
              <button
                onClick={() => handlePlaySound(activeTopic)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 ${
                  isNarrating || isChanting
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <Volume2 size={16} />
                <span>
                  {isNarrating || isChanting
                    ? 'Stop Audio'
                    : activeTopic.category === 'shlokas'
                    ? 'Chant Shloka'
                    : 'Listen to Story'}
                </span>
              </button>
            </div>

            {/* Child-Friendly Story / Introduction */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-black text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={15} className="text-indigo-600" />
                <span>Story & Introduction (कथा व परिचय)</span>
              </div>

              {/* English Lines */}
              {(languageMode === 'both' || languageMode === 'english') && (
                <div className="space-y-1.5 text-slate-800 text-sm leading-relaxed font-medium">
                  {activeTopic.introduction.map((line, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-black">✦</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              )}

              {/* Hindi Lines */}
              {(languageMode === 'both' || languageMode === 'hindi') &&
                activeTopic.hindiIntroduction && (
                  <div className="space-y-1.5 text-slate-900 text-sm leading-relaxed font-semibold font-['Baloo_2',sans-serif] pt-2.5 border-t border-slate-200">
                    {activeTopic.hindiIntroduction.map((line, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-black">ॐ</span>
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                )}
            </div>

            {/* Category-Specific Detailed Breakdowns */}
            {/* 1. Gods & Goddesses */}
            {activeTopic.category === 'gods' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeTopic.vahana && (
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                    <div className="text-xs font-black text-slate-800 uppercase flex items-center gap-1.5">
                      <span>🐾</span>
                      <span>Sacred Vahana (वाहन)</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.vahana}
                    </div>
                    {activeTopic.vahanaHindi && (
                      <div className="text-xs text-slate-600 font-medium font-['Baloo_2',sans-serif]">
                        {activeTopic.vahanaHindi}
                      </div>
                    )}
                  </div>
                )}

                {activeTopic.favoritePrasad && (
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                    <div className="text-xs font-black text-slate-800 uppercase flex items-center gap-1.5">
                      <span>🍯</span>
                      <span>Favorite Prasad (प्रिय भोग)</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.favoritePrasad}
                    </div>
                    {activeTopic.favoritePrasadHindi && (
                      <div className="text-xs text-slate-600 font-medium font-['Baloo_2',sans-serif]">
                        {activeTopic.favoritePrasadHindi}
                      </div>
                    )}
                  </div>
                )}

                {activeTopic.blessing && (
                  <div className="sm:col-span-2 bg-indigo-50/70 rounded-2xl p-3.5 border border-indigo-200">
                    <div className="text-xs font-black text-indigo-950 uppercase flex items-center gap-1.5">
                      <span>🪷</span>
                      <span>Divine Blessings for Kids (आशीर्वाद)</span>
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.blessing}
                    </div>
                    {activeTopic.blessingHindi && (
                      <div className="text-xs text-indigo-900 font-semibold font-['Baloo_2',sans-serif] mt-0.5">
                        {activeTopic.blessingHindi}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. Basic Shlokas */}
            {activeTopic.category === 'shlokas' && activeTopic.shloka && (
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-5 text-white shadow-lg border-2 border-indigo-400 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📜</span>
                    <div>
                      <h3 className="text-base font-black font-['Baloo_2',sans-serif] text-indigo-100">
                        {activeTopic.shloka.title}
                      </h3>
                      {activeTopic.shloka.whenToChant && (
                        <div className="text-xs text-indigo-200/90 font-medium">
                          Chant: {activeTopic.shloka.whenToChant}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlaySound(activeTopic)}
                    className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all ${
                      isChanting
                        ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                        : 'bg-white hover:bg-indigo-50 text-indigo-900'
                    }`}
                  >
                    <Volume2 size={16} />
                    <span>{isChanting ? 'Stop Chant' : 'Listen & Chant'}</span>
                  </button>
                </div>

                {/* Sanskrit Verses Calligraphy */}
                <div className="bg-black/25 rounded-2xl p-4 border border-white/20 text-center space-y-2 shadow-inner">
                  {activeTopic.shloka.sanskrit.map((line, idx) => (
                    <div
                      key={idx}
                      className="text-lg sm:text-xl font-black text-amber-200 tracking-wide font-['Baloo_2',sans-serif]"
                    >
                      {line}
                    </div>
                  ))}

                  {/* Transliteration */}
                  <div className="pt-2 border-t border-white/20 text-xs sm:text-sm text-indigo-100 font-medium italic">
                    {activeTopic.shloka.transliteration.map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                </div>

                {/* Meanings */}
                <div className="bg-white rounded-2xl p-4 text-slate-800 space-y-2 text-xs sm:text-sm shadow-xs border border-slate-200">
                  <div>
                    <span className="font-bold text-indigo-900">English Meaning: </span>
                    <span className="font-medium text-slate-700">
                      {activeTopic.shloka.englishMeaning}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="font-extrabold text-indigo-900 font-['Baloo_2',sans-serif]">
                      सरल हिंदी अर्थ:{' '}
                    </span>
                    <span className="font-semibold text-slate-900 font-['Baloo_2',sans-serif]">
                      {activeTopic.shloka.hindiMeaning}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Yugas */}
            {activeTopic.category === 'yugas' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                    <div className="text-xs font-black text-slate-800 uppercase">
                      ⏳ Era & Age
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.eraName}
                    </div>
                    <div className="text-xs text-slate-600 font-semibold mt-0.5">
                      Dharma: {activeTopic.dharmaPillars}
                    </div>
                  </div>

                  {activeTopic.keyAvatars && (
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                      <div className="text-xs font-black text-slate-800 uppercase">
                        👑 Key Divine Avatars
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-1 space-y-0.5">
                        {activeTopic.keyAvatars.map((av, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <span className="text-indigo-600">✦</span>
                            <span>{av}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {activeTopic.moralLesson && (
                  <div className="bg-indigo-50/70 rounded-2xl p-3.5 border border-indigo-200">
                    <div className="text-xs font-black text-indigo-900 uppercase">
                      🌟 Moral Lesson for Kids (सदाचार शिक्षा)
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.moralLesson}
                    </div>
                    {activeTopic.moralLessonHindi && (
                      <div className="text-xs text-indigo-900 font-semibold font-['Baloo_2',sans-serif] mt-0.5">
                        {activeTopic.moralLessonHindi}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 4. Vedas */}
            {activeTopic.category === 'vedas' && (
              <div className="space-y-3">
                <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200">
                  <div className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                    <span>📖</span>
                    <span>Sacred Vedic Theme (वेद का मूल विषय)</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    {activeTopic.vedaTheme}
                  </div>
                  {activeTopic.vedaThemeHindi && (
                    <div className="text-xs text-emerald-800 font-semibold font-['Baloo_2',sans-serif] mt-0.5">
                      {activeTopic.vedaThemeHindi}
                    </div>
                  )}
                </div>

                {activeTopic.keyWisdom && (
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-black text-slate-800 uppercase">
                      🌿 Core Teachings for Life (मुख्य शिक्षाएँ)
                    </div>
                    {activeTopic.keyWisdom.map((kw, idx) => (
                      <div key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{kw}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. Festivals */}
            {activeTopic.category === 'festivals' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200">
                    <div className="text-xs font-black text-rose-900 uppercase">
                      🗓️ Festive Month
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-1">
                      {activeTopic.festiveMonth}
                    </div>
                    {activeTopic.festiveMonthHindi && (
                      <div className="text-xs text-rose-800 font-semibold font-['Baloo_2',sans-serif]">
                        {activeTopic.festiveMonthHindi}
                      </div>
                    )}
                  </div>

                  {activeTopic.festiveTreats && (
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                      <div className="text-xs font-black text-slate-800 uppercase">
                        🍬 Traditional Festive Treats
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1">
                        {activeTopic.festiveTreats}
                      </div>
                    </div>
                  )}
                </div>

                {activeTopic.howKidsCelebrate && (
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1.5">
                    <div className="text-xs font-black text-slate-800 uppercase">
                      🎉 How Kids Celebrate (उत्सव की खुशियाँ)
                    </div>
                    {activeTopic.howKidsCelebrate.map((hc, idx) => (
                      <div key={idx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">🪔</span>
                        <span>{hc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. Values */}
            {activeTopic.category === 'values' && (
              <div className="space-y-3">
                {activeTopic.practicalHabit && (
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                    <div className="text-xs font-black text-emerald-950 uppercase flex items-center gap-1.5">
                      <span>🌱</span>
                      <span>Daily Practical Habit for Kids (दैनिक सद्गुण अभ्यास)</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-950 mt-1">
                      {activeTopic.practicalHabit}
                    </div>
                    {activeTopic.practicalHabitHindi && (
                      <div className="text-xs text-emerald-800 font-semibold font-['Baloo_2',sans-serif] mt-1 pt-1 border-t border-emerald-200">
                        {activeTopic.practicalHabitHindi}
                      </div>
                    )}
                  </div>
                )}

                {activeTopic.goldenRule && (
                  <div className="bg-indigo-50 rounded-2xl p-3.5 border border-indigo-200">
                    <div className="text-xs font-black text-indigo-900 uppercase">
                      📜 Golden Sanatan Principle
                    </div>
                    <div className="text-sm font-extrabold text-slate-800 mt-1">
                      {activeTopic.goldenRule}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Did You Know Box */}
            <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl shrink-0 shadow-xs font-bold">
                💡
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-amber-950 uppercase">
                  Did You Know? (रोचक ज्ञान)
                </div>
                <div className="text-xs text-slate-800 font-semibold mt-0.5">
                  {languageMode === 'hindi' && activeTopic.funFactForKidsHindi
                    ? activeTopic.funFactForKidsHindi
                    : activeTopic.funFactForKids}
                </div>
              </div>
            </div>

            {/* Bottom Reward Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  handleMarkLearned(activeTopic.id);
                  setExploreModalOpen(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <Star size={18} className="fill-yellow-300 text-yellow-200 animate-spin" />
                <span>
                  {learnedTopics[activeTopic.id]
                    ? 'Completed! 🌟'
                    : 'I Learned This! 🌟 (Earn Star)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

