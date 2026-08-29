import React, { useState, useRef, useEffect } from 'react';
import { AgeGroup, HindiLetter, RhymeItem } from '../types';
import { HINDI_SWAR, HINDI_VYANJAN, HINDI_BALGEET, getHindiLetterVoiceData } from '../data/hindiData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import { LetterTracingCanvas } from './LetterTracingCanvas';
import {
  Volume2,
  PenTool,
  Grid,
  Music,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HindiModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const HindiModule: React.FC<HindiModuleProps> = ({ ageGroup, onAwardStar }) => {
  const [activeSubTab, setActiveSubTab] = useState<'swar' | 'vyanjan' | 'tracing' | 'balgeet'>('swar');
  const [selectedLetter, setSelectedLetter] = useState<HindiLetter>(HINDI_SWAR[0]);
  const [activeBalgeet, setActiveBalgeet] = useState<RhymeItem>(HINDI_BALGEET[0]);
  const [isPlayingBalgeet, setIsPlayingBalgeet] = useState(false);
  const [highlightedLineIdx, setHighlightedLineIdx] = useState<number | null>(null);

  const balgeetAbortRef = useRef<boolean>(false);
  const balgeetTimeoutRef = useRef<any>(null);

  // Stop playback when leaving balgeet tab or unmounting
  useEffect(() => {
    return () => {
      balgeetAbortRef.current = true;
      if (balgeetTimeoutRef.current) {
        clearTimeout(balgeetTimeoutRef.current);
      }
      sound.stopSpeaking();
    };
  }, []);

  const handleLetterClick = (item: HindiLetter) => {
    handleStopBalgeet();
    setSelectedLetter(item);
    sound.playBell();
    const { hindi, phonetic } = getHindiLetterVoiceData(item);
    sound.speakHindi(hindi, phonetic);
  };

  const handlePlayBalgeet = (rhyme: RhymeItem) => {
    // Reset abort and timeouts
    balgeetAbortRef.current = false;
    if (balgeetTimeoutRef.current) {
      clearTimeout(balgeetTimeoutRef.current);
      balgeetTimeoutRef.current = null;
    }

    setActiveBalgeet(rhyme);
    setIsPlayingBalgeet(true);
    sound.playFlute();

    let lineIndex = 0;
    const playNextLine = () => {
      if (balgeetAbortRef.current) {
        setIsPlayingBalgeet(false);
        setHighlightedLineIdx(null);
        return;
      }

      if (lineIndex < rhyme.lyrics.length) {
        setHighlightedLineIdx(lineIndex);
        const hindiLine = rhyme.lyrics[lineIndex];
        const phoneticFallback = rhyme.phoneticLyrics?.[lineIndex] || hindiLine;
        sound.speakHindi(hindiLine, phoneticFallback, () => {
          if (balgeetAbortRef.current) return;
          lineIndex++;
          balgeetTimeoutRef.current = setTimeout(() => {
            if (!balgeetAbortRef.current) {
              playNextLine();
            }
          }, 350);
        });
      } else {
        if (!balgeetAbortRef.current) {
          setIsPlayingBalgeet(false);
          setHighlightedLineIdx(null);
          sound.playSparkle();
          confetti({ particleCount: 35, spread: 55 });
          onAwardStar();
        }
      }
    };

    playNextLine();
  };

  const handlePlaySingleBalgeetLine = (rhyme: RhymeItem, lineIdx: number) => {
    handleStopBalgeet();
    sound.playBell();
    setHighlightedLineIdx(lineIdx);
    const hindiLine = rhyme.lyrics[lineIdx];
    const phoneticFallback = rhyme.phoneticLyrics?.[lineIdx] || hindiLine;
    sound.speakHindi(hindiLine, phoneticFallback, () => {
      setHighlightedLineIdx(null);
    });
  };

  const handleStopBalgeet = () => {
    balgeetAbortRef.current = true;
    if (balgeetTimeoutRef.current) {
      clearTimeout(balgeetTimeoutRef.current);
      balgeetTimeoutRef.current = null;
    }
    sound.stopSpeaking();
    setIsPlayingBalgeet(false);
    setHighlightedLineIdx(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕉️</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Hindi Varnamala & Balgeet (हिंदी वर्णमाला व बालगीत)
            </h2>
            <p className="text-xs text-amber-800">Learn Swar (स्वर), Vyanjan (व्यंजन), Devanagari tracing and joyful Hindi rhymes!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-amber-100/70 p-1 rounded-xl">
          <button
            id="hindi-tab-swar"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('swar');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'swar'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Swar (स्वर: अ–अः)</span>
          </button>

          <button
            id="hindi-tab-vyanjan"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('vyanjan');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'vyanjan'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vyanjan (व्यंजन: क–ह)</span>
          </button>

          <button
            id="hindi-tab-tracing"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('tracing');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'tracing'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Trace Pad</span>
          </button>

          <button
            id="hindi-tab-balgeet"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('balgeet');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'balgeet'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Balgeet (बालगीत)</span>
          </button>
        </div>
      </div>

      {/* Mode 1 & 2: Swar & Vyanjan */}
      {(activeSubTab === 'swar' || activeSubTab === 'vyanjan') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Selected Big Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 rounded-3xl p-6 border-4 border-rose-300 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <button
                onClick={() => handleLetterClick(selectedLetter)}
                className="w-36 h-36 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-600 p-1 shadow-lg mb-3 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                title="Tap to speak"
              >
                <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                  <span className="text-7xl font-extrabold font-['Baloo_2',sans-serif] bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                    {selectedLetter.char}
                  </span>
                </div>
              </button>

              <button
                onClick={() => handleLetterClick(selectedLetter)}
                className="mb-2 animate-bounce flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                title="Tap to speak"
              >
                <SmartIcon name={selectedLetter.iconEmoji} size={56} />
              </button>
              <h3
                onClick={() => handleLetterClick(selectedLetter)}
                className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif] cursor-pointer hover:text-rose-600 transition-colors"
              >
                {selectedLetter.char} से {selectedLetter.word}
              </h3>
              <p className="text-sm font-bold text-rose-700 mb-1">{selectedLetter.wordEnglish}</p>
              <p className="text-xs bg-rose-100 text-rose-900 px-3 py-1 rounded-full font-bold mb-4">
                Roman: <span className="font-mono">{selectedLetter.roman}</span>
              </p>

              <button
                onClick={() => {
                  sound.playBell();
                  const phoneticFallback = `${selectedLetter.roman.toUpperCase()} say ${selectedLetter.wordEnglish.split('(')[0]}`;
                  sound.speakHindi(selectedLetter.exampleSentence, phoneticFallback);
                }}
                className="bg-white/90 hover:bg-rose-50 rounded-2xl p-3 border border-rose-200 text-rose-950 text-sm font-semibold mb-5 shadow-sm max-w-sm cursor-pointer transition-colors text-left"
                title="Tap to listen to example sentence"
              >
                "{selectedLetter.exampleSentence}"
              </button>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full justify-center">
                <button
                  id="speak-hindi-letter-btn"
                  onClick={() => handleLetterClick(selectedLetter)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>सुनो (Listen)</span>
                </button>

                <button
                  id="trace-hindi-letter-btn"
                  onClick={() => setActiveSubTab('tracing')}
                  className="py-3 px-4 bg-rose-200 hover:bg-rose-300 text-rose-950 rounded-2xl font-bold transition-all flex items-center justify-center gap-1.5"
                  title="Trace this Hindi letter"
                >
                  <PenTool className="w-4 h-4" />
                  <span>लिखो (Trace)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Letter Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-4 border-rose-200 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <span>{activeSubTab === 'swar' ? 'स्वर (Swar - Vowels):' : 'व्यंजन (Vyanjan - Consonants):'}</span>
                </h4>
                <span className="text-xs font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-lg">
                  {activeSubTab === 'swar' ? `${HINDI_SWAR.length} स्वर` : `${HINDI_VYANJAN.length} व्यंजन`}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
                {(activeSubTab === 'swar' ? HINDI_SWAR : HINDI_VYANJAN).map((item) => {
                  const isSelected = selectedLetter.char === item.char;
                  return (
                    <button
                      key={item.char}
                      id={`hindi-letter-${item.char}`}
                      onClick={() => handleLetterClick(item)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all group ${
                        isSelected
                          ? 'bg-gradient-to-b from-rose-500 to-pink-600 text-white border-white shadow-lg scale-105 ring-2 ring-rose-300'
                          : 'bg-rose-50/60 hover:bg-rose-100 text-slate-900 border-rose-200 hover:scale-105 shadow-sm'
                      }`}
                    >
                      <span className="text-3xl font-extrabold font-['Baloo_2',sans-serif] leading-none mb-0.5">
                        {item.char}
                      </span>
                      <SmartIcon name={item.iconEmoji} size={22} className="my-0.5" />
                      <span className={`text-[11px] font-bold truncate max-w-full mt-0.5 ${isSelected ? 'text-white' : 'text-rose-900'}`}>
                        {item.word}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Tracing Mode */}
      {activeSubTab === 'tracing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2 px-1">
            {[...HINDI_SWAR, ...HINDI_VYANJAN.slice(0, 10)].map((item) => (
              <button
                key={item.char}
                onClick={() => handleLetterClick(item)}
                className={`w-11 h-11 rounded-xl font-extrabold text-lg flex-shrink-0 transition-all font-['Baloo_2',sans-serif] cursor-pointer ${
                  selectedLetter.char === item.char
                    ? 'bg-rose-500 text-white shadow-md scale-110 ring-2 ring-rose-300'
                    : 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                }`}
                title={`${item.char} से ${item.word}`}
              >
                {item.char}
              </button>
            ))}
          </div>

          <LetterTracingCanvas
            letter={selectedLetter.char}
            subtext={`${selectedLetter.char} से ${selectedLetter.word}`}
            isHindi={true}
            onComplete={() => onAwardStar()}
          />
        </div>
      )}

      {/* Mode 4: Balgeet Player */}
      {activeSubTab === 'balgeet' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-50 via-amber-50 to-rose-50 rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🎶</span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-800 font-['Baloo_2',sans-serif]">
                Hindi Balgeet Sing-Along (बालगीत)
              </h3>
              <p className="text-xs text-rose-800">Sing, listen, and follow along with cheerful musical rhymes!</p>
            </div>
          </div>

          {/* Song selector chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {HINDI_BALGEET.map((rhyme) => (
              <button
                key={rhyme.id}
                onClick={() => {
                  handleStopBalgeet();
                  setActiveBalgeet(rhyme);
                  sound.playPop();
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeBalgeet.id === rhyme.id
                    ? 'bg-rose-500 text-white shadow-md scale-105'
                    : 'bg-white text-rose-950 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                <SmartIcon name={rhyme.iconEmoji} size={18} />
                <span>{rhyme.title.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {/* Player Container */}
          <div className="bg-white/95 rounded-3xl p-6 border-2 border-rose-200 shadow-md text-center">
            <div className="mb-2 flex items-center justify-center">
              <SmartIcon name={activeBalgeet.iconEmoji} size={48} />
            </div>
            <h4 className="text-2xl font-extrabold text-rose-950 mb-4 font-['Baloo_2',sans-serif]">
              {activeBalgeet.title}
            </h4>

            {/* Lyrics with active karaoke highlight */}
            <div className="space-y-2.5 my-6 text-left max-w-md mx-auto">
              {activeBalgeet.lyrics.map((line, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePlaySingleBalgeetLine(activeBalgeet, idx)}
                  className={`p-2.5 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer flex items-center justify-between group ${
                    highlightedLineIdx === idx
                      ? 'bg-rose-500 text-white scale-105 shadow-md pl-4 border-l-4 border-amber-300'
                      : 'text-slate-800 bg-amber-50/50 hover:bg-rose-100/70'
                  }`}
                  title="Tap to hear this line in Hindi"
                >
                  <span>{line}</span>
                  <Volume2 className={`w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ${highlightedLineIdx === idx ? 'opacity-100 text-white' : 'text-rose-600'}`} />
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {!isPlayingBalgeet ? (
                <button
                  id="play-balgeet-btn"
                  onClick={() => handlePlayBalgeet(activeBalgeet)}
                  className="py-3 px-8 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play & Sing Along!</span>
                </button>
              ) : (
                <button
                  id="stop-balgeet-btn"
                  onClick={handleStopBalgeet}
                  className="py-3 px-8 bg-slate-700 text-white font-extrabold text-base rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Stop Song</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
