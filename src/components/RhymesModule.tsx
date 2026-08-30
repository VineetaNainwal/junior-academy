import React, { useState, useEffect } from 'react';
import { AgeGroup, RhymeCardItem } from '../types';
import { HINDI_RHYMES_DATA, ENGLISH_RHYMES_DATA } from '../data/rhymesData';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import {
  Play,
  Square,
  Volume2,
  Sparkles,
  Music,
  Mic,
  Star
} from 'lucide-react';

interface RhymesModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const RhymesModule: React.FC<RhymesModuleProps> = ({
  ageGroup,
  onAwardStar,
}) => {
  const [activeTab, setActiveTab] = useState<'hindi' | 'english'>('hindi');
  const isHindi = activeTab === 'hindi';
  const rhymesList = isHindi ? HINDI_RHYMES_DATA : ENGLISH_RHYMES_DATA;
  const [selectedRhyme, setSelectedRhyme] = useState<RhymeCardItem>(rhymesList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  const handleSelectTab = (tab: 'hindi' | 'english') => {
    sound.playPop();
    handleStop();
    setActiveTab(tab);
    const newList = tab === 'hindi' ? HINDI_RHYMES_DATA : ENGLISH_RHYMES_DATA;
    setSelectedRhyme(newList[0]);
  };

  const handleSelectRhyme = (rhyme: RhymeCardItem) => {
    sound.playPop();
    handleStop();
    setSelectedRhyme(rhyme);
    const phonetic = rhyme.phoneticLyrics?.[0] || rhyme.tagline;
    sound.speak(rhyme.title, isHindi ? 'hi' : 'en', undefined, phonetic);
  };

  const handleStop = () => {
    sound.stopSpeaking();
    setIsPlaying(false);
    setCurrentLineIndex(-1);
  };

  const handlePlayRhyme = (rhyme: RhymeCardItem) => {
    handleStop();
    setSelectedRhyme(rhyme);
    sound.playSparkle();
    setIsPlaying(true);

    const langCode = rhyme.language === 'hindi' ? 'hi' : 'en';
    const lines = rhyme.lyrics;
    const phonetics = rhyme.phoneticLyrics || [];
    let index = 0;

    const playNextLine = () => {
      if (index < lines.length) {
        setCurrentLineIndex(index);
        const linePhonetic = phonetics[index];
        sound.speak(lines[index], langCode, () => {
          index++;
          setTimeout(playNextLine, 350);
        }, linePhonetic);
      } else {
        setIsPlaying(false);
        setCurrentLineIndex(-1);
        sound.playCelebration();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
        onAwardStar();
      }
    };

    playNextLine();
  };

  // Helper renderer for large thematic illustrations
  const renderBigIllustration = (rhyme: RhymeCardItem) => {
    return (
      <div className={`relative w-full h-52 sm:h-64 rounded-2xl bg-gradient-to-br ${rhyme.bgGradient} overflow-hidden flex flex-col items-center justify-center p-4 border-4 border-amber-300/80 shadow-inner group`}>
        {/* Soft watercolor and star overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute top-2 left-3 text-amber-200/60 text-xs font-bold tracking-wider font-['Baloo_2',sans-serif]">
          {isHindi ? '✦ बाल विद्या बालगीत मंच ✦' : '✦ BAL VIDYA RHYME THEATRE ✦'}
        </div>

        {/* Floating animated sparkles & stickers */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-amber-900/60 backdrop-blur-sm border border-amber-400/40 px-2.5 py-1 rounded-full text-amber-200 text-xs font-bold">
          <Sparkles size={13} className="text-amber-300 animate-spin" />
          <span>{isHindi ? 'हिंदी बालगीत' : 'English Sing-Along'}</span>
        </div>

        {/* Center Character Art */}
        <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-amber-200/60 shadow-2xl flex items-center justify-center text-6xl sm:text-7xl mb-2 animate-bounce">
            <span className="drop-shadow-lg">{rhyme.iconEmoji}</span>
          </div>
          <div className="text-white font-extrabold text-lg sm:text-2xl drop-shadow-md text-center px-4 font-['Baloo_2',sans-serif]">
            {rhyme.title}
          </div>
          <div className="text-amber-200/90 text-xs sm:text-sm font-semibold text-center mt-0.5 max-w-sm">
            {rhyme.tagline}
          </div>
        </div>

        {/* Bottom sticker ribbon */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1.5 flex-wrap z-10">
          {rhyme.themeCharacters.map((char, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-amber-100 text-xs font-bold border border-white/10"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl p-5 sm:p-6 text-white shadow-xl border-4 border-violet-200/60 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-3xl shadow-lg">
              <Music className="text-amber-300 animate-pulse" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider">
                  {isHindi ? 'गाओ और सीखो' : 'Sing & Learn'}
                </span>
                <span className="text-xs text-purple-200 font-bold">
                  {isHindi ? 'सस्वर बालगीत मंच' : 'Interactive Audio Nursery'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-['Baloo_2',sans-serif] tracking-wide text-white drop-shadow">
                {isHindi ? 'हिंदी बालगीत एवं कविताएँ' : 'English Nursery Rhymes'}
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 font-medium">
                {isHindi
                  ? 'सरल और मधुर हिंदी बालगीत गाएं और सस्वर पाठ सीखें!'
                  : 'Sing along with delightful English nursery rhymes with animated lyrics!'}
              </p>
            </div>
          </div>

          {/* Subsections Navigation Tabs */}
          <div className="flex items-center gap-2 bg-purple-950/40 p-1.5 rounded-2xl border border-white/20 self-stretch sm:self-auto justify-center">
            <button
              id="rhymes-tab-hindi"
              onClick={() => handleSelectTab('hindi')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                activeTab === 'hindi'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 shadow-md scale-105'
                  : 'text-purple-100 hover:bg-white/10'
              }`}
            >
              <span className="text-base">🇮🇳</span>
              <span>हिंदी बालगीत</span>
            </button>
            <button
              id="rhymes-tab-english"
              onClick={() => handleSelectTab('english')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all ${
                activeTab === 'english'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 shadow-md scale-105'
                  : 'text-purple-100 hover:bg-white/10'
              }`}
            >
              <span className="text-base">🇬🇧</span>
              <span>English Rhymes</span>
            </button>
          </div>
        </div>
      </div>

        {/* Main Grid: Left Featured Theater / Sing-Along Player + Right Grid of Rhyme Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Featured Sing-Along Stage (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border-2 border-purple-200 space-y-4 relative">
            {/* Top Bar with Title and Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-black text-purple-900 uppercase tracking-wide">
                  {isHindi ? 'गायन मंच (सक्रिय गीत)' : 'Now Playing Theatre'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-100 border border-purple-200 px-3 py-1 rounded-full">
                <Music size={13} className="text-purple-700" />
                <span>{isHindi ? 'सस्वर गायन' : 'Audio Sing-Along'}</span>
              </div>
            </div>

            {/* Big Illustration */}
            {renderBigIllustration(selectedRhyme)}

            {/* Play / Stop Action Bar */}
            <div className="flex items-center justify-between gap-3 bg-purple-50 p-3 rounded-2xl border border-purple-100">
              <div className="flex items-center gap-2">
                <button
                  id={`play-featured-${selectedRhyme.id}`}
                  onClick={() => {
                    if (isPlaying) handleStop();
                    else handlePlayRhyme(selectedRhyme);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-sm transition-all ${
                    isPlaying
                      ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white scale-102'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square size={16} fill="white" />
                      <span>{isHindi ? 'गायन रोकें' : 'Stop Sing-Along'}</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="white" />
                      <span>{isHindi ? 'गाएं और दोहराएं' : 'Sing & Recite'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    sound.playBell();
                    sound.speak(selectedRhyme.title, isHindi ? 'hi' : 'en');
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-purple-100 text-slate-700 border border-slate-200 transition-all font-bold"
                  title={isHindi ? 'शीर्षक सुनें' : 'Pronounce Title'}
                >
                  <Volume2 size={18} />
                </button>
              </div>

              <div className="flex items-center gap-1 text-xs font-black text-purple-900">
                <Star size={16} className="text-amber-400 fill-amber-400 animate-spin" />
                <span>{isHindi ? 'तारे कमाएं!' : 'Earn Stars!'}</span>
              </div>
            </div>

            {/* Karaoke Line-by-Line Highlighted Lyrics */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 max-h-72 overflow-y-auto">
              <div className="text-xs font-extrabold text-purple-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mic size={14} className="text-purple-600" />
                <span>{isHindi ? 'गीत के बोल' : 'Lyrics'}</span>
              </div>
              {selectedRhyme.lyrics.map((line, idx) => {
                const isLineActive = currentLineIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl transition-all ${
                      isLineActive
                        ? 'bg-purple-600 text-white font-black shadow-sm scale-[1.02] border-l-4 border-amber-300'
                        : 'bg-white text-slate-800 font-bold border border-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    <div className="text-base sm:text-lg font-['Baloo_2',sans-serif] leading-relaxed">
                      {line}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Grid of Rhyme Cards (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Baloo_2',sans-serif] flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              <span>{isHindi ? 'हिंदी बालगीत संग्रह' : 'English Nursery Rhymes'}</span>
            </h2>
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
              {isHindi ? `${rhymesList.length} बालगीत उपलब्ध` : `${rhymesList.length} Rhymes Available`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {rhymesList.map((rhyme) => {
              const isSelected = selectedRhyme.id === rhyme.id;
              return (
                <div
                  key={rhyme.id}
                  id={`rhyme-card-${rhyme.id}`}
                  onClick={() => handleSelectRhyme(rhyme)}
                  className={`group relative rounded-2xl p-3.5 transition-all cursor-pointer border-2 text-left flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-500 shadow-sm ring-2 ring-purple-200'
                      : 'bg-white hover:bg-purple-50/40 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {/* Top Header Card */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl shadow-xs border border-purple-200">
                        {rhyme.iconEmoji}
                      </div>
                      {/* Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayRhyme(rhyme);
                        }}
                        className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 active:scale-95"
                        title={isHindi ? 'गाना चलाएं' : 'Play Rhyme'}
                      >
                        <Play size={16} fill="white" className="ml-0.5" />
                      </button>
                    </div>

                    <h3 className="font-black text-sm sm:text-base text-slate-900 font-['Baloo_2',sans-serif] line-clamp-1 group-hover:text-purple-700">
                      {rhyme.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 font-medium">
                      {rhyme.tagline}
                    </p>
                  </div>

                  {/* Bottom Character Badges */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <Music size={12} className="text-purple-600" />
                      <span>{isHindi ? `${rhyme.lyrics.length} पंक्तियाँ` : `${rhyme.lyrics.length} Verses`}</span>
                    </span>
                    <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-extrabold">
                      {isHindi ? 'गाओ साथ ✨' : 'Sing Along ✨'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
