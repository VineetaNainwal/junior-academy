import React, { useState, useRef, useEffect } from 'react';
import { AgeGroup, ShlokaItem, RhymeItem } from '../types';
import { SHLOKAS_DATA, ENGLISH_RHYMES } from '../data/shlokasRhymesData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  ScrollText,
  Music,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShlokaRhymesProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const ShlokaRhymes: React.FC<ShlokaRhymesProps> = ({ ageGroup, onAwardStar }) => {
  const [activeTab, setActiveTab] = useState<'shlokas' | 'rhymes'>('shlokas');
  const [selectedShloka, setSelectedShloka] = useState<ShlokaItem>(SHLOKAS_DATA[0]);
  const [selectedRhyme, setSelectedRhyme] = useState<RhymeItem>(ENGLISH_RHYMES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightWordIdx, setHighlightWordIdx] = useState<number | null>(null);

  const abortRef = useRef<boolean>(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      abortRef.current = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      sound.stopSpeaking();
    };
  }, []);

  const handlePlayShloka = (shloka: ShlokaItem) => {
    handleStop();
    abortRef.current = false;
    setSelectedShloka(shloka);
    setIsPlaying(true);
    sound.playBell();

    const devanagariText = shloka.sanskrit.join(' ');
    sound.speak(`${shloka.title}. ${devanagariText}. ${shloka.simpleMeaning}`, 'hi', () => {
      if (abortRef.current) return;
      setIsPlaying(false);
      sound.playSparkle();
      confetti({ particleCount: 30, spread: 45 });
      onAwardStar();
    });
  };

  const handlePlayRhyme = (rhyme: RhymeItem) => {
    handleStop();
    abortRef.current = false;
    setSelectedRhyme(rhyme);
    setIsPlaying(true);
    sound.playFlute();

    let lineIndex = 0;
    const playNext = () => {
      if (abortRef.current) {
        setIsPlaying(false);
        setHighlightWordIdx(null);
        return;
      }

      if (lineIndex < rhyme.lyrics.length) {
        setHighlightWordIdx(lineIndex);
        sound.speak(rhyme.lyrics[lineIndex], 'en', () => {
          if (abortRef.current) return;
          lineIndex++;
          timeoutRef.current = setTimeout(() => {
            if (!abortRef.current) {
              playNext();
            }
          }, 300);
        });
      } else {
        if (!abortRef.current) {
          setIsPlaying(false);
          setHighlightWordIdx(null);
          sound.playSparkle();
          onAwardStar();
        }
      }
    };
    playNext();
  };

  const handleStop = () => {
    abortRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    sound.stopSpeaking();
    setIsPlaying(false);
    setHighlightWordIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪈</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Sacred Shlokas & Cheerful Rhymes (श्लोक व बाल कविताएं)
            </h2>
            <p className="text-xs text-amber-800">Sanskrit chants for peace & focus, paired with joyful bilingual nursery rhymes!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-amber-100/70 p-1 rounded-xl">
          <button
            id="shloka-tab-sanskrit"
            onClick={() => {
              sound.playPop();
              setActiveTab('shlokas');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'shlokas'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Sanskrit Shlokas (श्लोक)</span>
          </button>

          <button
            id="shloka-tab-rhymes"
            onClick={() => {
              sound.playPop();
              setActiveTab('rhymes');
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'rhymes'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Bilingual Rhymes</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Shlokas */}
      {activeTab === 'shlokas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Selected Shloka Player */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-violet-50 via-amber-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-4 border-violet-300 shadow-xl flex flex-col items-center text-center">
              <div className="mb-2 animate-pulse flex items-center justify-center">
                <SmartIcon name={selectedShloka.iconEmoji} size={64} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-violet-950 font-['Baloo_2',sans-serif]">
                {selectedShloka.title}
              </h3>
              <p className="text-xs bg-violet-200/80 text-violet-900 font-bold px-3 py-1 rounded-full mb-4">
                Dedication: {selectedShloka.deityOrTheme}
              </p>

              {/* Devanagari Sacred Chant */}
              <div className="bg-white/95 rounded-3xl p-6 border-2 border-violet-200 shadow-sm w-full my-3 space-y-3">
                <div className="text-xl sm:text-2xl font-extrabold text-amber-900 leading-relaxed font-['Baloo_2',sans-serif]">
                  {selectedShloka.sanskrit.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-violet-800 italic font-mono pt-2 border-t border-violet-100">
                  {selectedShloka.transliteration.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Simple Kid Explanation */}
              <div className="bg-amber-100/80 rounded-2xl p-3.5 border border-amber-200 text-left text-xs sm:text-sm text-amber-950 font-medium mb-5 w-full">
                <div className="font-bold text-amber-900 mb-1">🌸 What it means for little children:</div>
                <p>{selectedShloka.simpleMeaning}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full justify-center">
                {!isPlaying ? (
                  <button
                    id="play-shloka-btn"
                    onClick={() => handlePlayShloka(selectedShloka)}
                    className="py-3 px-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Listen & Chant</span>
                  </button>
                ) : (
                  <button
                    id="stop-shloka-btn"
                    onClick={handleStop}
                    className="py-3 px-8 bg-slate-700 text-white font-extrabold text-base rounded-2xl shadow-lg flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Stop Chant</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Shloka List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-extrabold text-slate-800 px-1">Select a Sacred Shloka:</h4>
            {SHLOKAS_DATA.map((item) => {
              const isSelected = selectedShloka.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedShloka(item);
                    sound.playBell();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-white shadow-lg scale-102 ring-2 ring-violet-300'
                      : 'bg-white/90 hover:bg-violet-50 text-slate-800 border-violet-200 shadow-sm'
                  }`}
                >
                  <SmartIcon name={item.iconEmoji} size={30} />
                  <div>
                    <h5 className={`text-base font-extrabold ${isSelected ? 'text-white' : 'text-violet-950'}`}>
                      {item.title}
                    </h5>
                    <p className={`text-xs ${isSelected ? 'text-violet-100' : 'text-slate-600'}`}>
                      {item.deityOrTheme}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Bilingual Rhymes */}
      {activeTab === 'rhymes' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-xl">
          {/* Rhymes Selectors */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {ENGLISH_RHYMES.map((rhyme) => (
              <button
                key={rhyme.id}
                onClick={() => {
                  handleStop();
                  setSelectedRhyme(rhyme);
                  sound.playPop();
                }}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedRhyme.id === rhyme.id
                    ? 'bg-purple-600 text-white shadow-md scale-105'
                    : 'bg-white text-purple-950 border border-purple-200'
                }`}
              >
                <SmartIcon name={rhyme.iconEmoji} size={18} />
                <span>{rhyme.title.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {/* Rhyme Reader */}
          <div className="bg-white/95 rounded-3xl p-6 border-2 border-purple-200 shadow-md text-center">
            <div className="mb-2 flex items-center justify-center">
              <SmartIcon name={selectedRhyme.iconEmoji} size={56} />
            </div>
            <h4 className="text-2xl font-extrabold text-purple-950 mb-4 font-['Baloo_2',sans-serif]">
              {selectedRhyme.title}
            </h4>

            {/* Lyrics with active karaoke line */}
            <div className="space-y-2 my-5 text-left max-w-md mx-auto">
              {selectedRhyme.lyrics.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl text-base font-bold transition-all ${
                    highlightWordIdx === idx
                      ? 'bg-purple-600 text-white scale-105 shadow-md pl-4 border-l-4 border-amber-300'
                      : 'text-slate-800 bg-amber-50/50'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {!isPlaying ? (
                <button
                  id="play-bilingual-rhyme-btn"
                  onClick={() => handlePlayRhyme(selectedRhyme)}
                  className="py-3 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Sing Rhyme!</span>
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="py-3 px-8 bg-slate-700 text-white font-extrabold text-base rounded-2xl shadow-lg flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Stop Rhyme</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
