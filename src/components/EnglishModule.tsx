import React, { useState } from 'react';
import { AgeGroup, EnglishLetter } from '../types';
import { ENGLISH_ALPHABETS, SIGHT_WORDS, TODDLER_COLORS } from '../data/englishData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import { LetterTracingCanvas } from './LetterTracingCanvas';
import {
  Volume2,
  Sparkles,
  PenTool,
  Grid,
  CheckCircle2,
  Palette,
  Layers,
  Star,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnglishModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const EnglishModule: React.FC<EnglishModuleProps> = ({ ageGroup, onAwardStar }) => {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'tracing' | 'sightwords' | 'colors' | 'quiz'>('flashcards');
  const [selectedLetter, setSelectedLetter] = useState<EnglishLetter>(ENGLISH_ALPHABETS[0]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Filter letters for toddlers if age 2-3 (Focus on first 10 or common letters)
  const letters = ageGroup === '2-3' ? ENGLISH_ALPHABETS.slice(0, 12) : ENGLISH_ALPHABETS;

  const handleLetterClick = (item: EnglishLetter) => {
    setSelectedLetter(item);
    sound.playFlute();
    sound.speak(`${item.letter} for ${item.word}`);
  };

  const handleSightWordClick = (word: typeof SIGHT_WORDS[0]) => {
    sound.playBell();
    sound.speak(`${word.word}. ${word.hint}`);
  };

  const handleColorClick = (color: typeof TODDLER_COLORS[0]) => {
    sound.playSparkle();
    sound.speak(color.name);
  };

  // Generate simple toddler quiz questions
  const quizItems = [
    { target: ENGLISH_ALPHABETS[0], prompt: 'Which letter is for 🍎 Apple?', options: [ENGLISH_ALPHABETS[0], ENGLISH_ALPHABETS[1], ENGLISH_ALPHABETS[2]] },
    { target: ENGLISH_ALPHABETS[1], prompt: 'Which letter is for ⚽ Ball?', options: [ENGLISH_ALPHABETS[1], ENGLISH_ALPHABETS[3], ENGLISH_ALPHABETS[5]] },
    { target: ENGLISH_ALPHABETS[2], prompt: 'Which letter is for 🐱 Cat?', options: [ENGLISH_ALPHABETS[0], ENGLISH_ALPHABETS[2], ENGLISH_ALPHABETS[4]] },
    { target: ENGLISH_ALPHABETS[3], prompt: 'Which letter is for 🦆 Duck?', options: [ENGLISH_ALPHABETS[3], ENGLISH_ALPHABETS[4], ENGLISH_ALPHABETS[6]] },
    { target: ENGLISH_ALPHABETS[4], prompt: 'Which letter is for 🐘 Elephant?', options: [ENGLISH_ALPHABETS[2], ENGLISH_ALPHABETS[4], ENGLISH_ALPHABETS[5]] },
    { target: ENGLISH_ALPHABETS[6], prompt: 'Which letter is for 🍇 Grapes?', options: [ENGLISH_ALPHABETS[6], ENGLISH_ALPHABETS[7], ENGLISH_ALPHABETS[8]] },
    { target: ENGLISH_ALPHABETS[10], prompt: 'Which letter is for 🪁 Kite?', options: [ENGLISH_ALPHABETS[8], ENGLISH_ALPHABETS[10], ENGLISH_ALPHABETS[12]] },
    { target: ENGLISH_ALPHABETS[11], prompt: 'Which letter is for 🦁 Lion?', options: [ENGLISH_ALPHABETS[10], ENGLISH_ALPHABETS[11], ENGLISH_ALPHABETS[12]] },
    { target: ENGLISH_ALPHABETS[12], prompt: 'Which letter is for 🥭 Mango?', options: [ENGLISH_ALPHABETS[11], ENGLISH_ALPHABETS[12], ENGLISH_ALPHABETS[14]] },
  ];

  const handleQuizAnswer = (letter: EnglishLetter) => {
    const currentQ = quizItems[quizIndex % quizItems.length];
    if (letter.letter === currentQ.target.letter) {
      sound.playSparkle();
      sound.speak(`Shabash! Correct! ${letter.letter} is for ${letter.word}!`);
      setQuizFeedback('🎉 Shabash! Excellent!');
      setQuizScore((prev) => prev + 1);
      onAwardStar();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => {
        setQuizFeedback(null);
        setQuizIndex((prev) => (prev + 1) % quizItems.length);
      }, 1400);
    } else {
      sound.playPop();
      sound.speak(`Try again! Look for ${currentQ.target.letter}`);
      setQuizFeedback('🌸 Try again, sweet friend!');
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔤</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              English Phonics & Alphabet Garden
            </h2>
            <p className="text-xs text-amber-800">Learn letters, phonics sounds, writing and colorful words!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-amber-100/70 p-1 rounded-xl">
          <button
            id="eng-tab-flashcards"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('flashcards');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'flashcards'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>A–Z Cards</span>
          </button>

          <button
            id="eng-tab-tracing"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('tracing');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'tracing'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Trace Pad</span>
          </button>

          <button
            id="eng-tab-sightwords"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('sightwords');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'sightwords'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sight Words</span>
          </button>

          <button
            id="eng-tab-colors"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('colors');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'colors'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colors</span>
          </button>

          <button
            id="eng-tab-quiz"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('quiz');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Fun Quiz</span>
          </button>
        </div>
      </div>

      {/* Mode 1: A-Z Flashcards */}
      {activeSubTab === 'flashcards' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Selected Big Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Background decorative flower */}
              <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                <SmartIcon name="🪷" size={140} />
              </div>

              {/* Letter Display */}
              <button
                onClick={() => {
                  sound.playBell();
                  sound.speak(`${selectedLetter.letter} for ${selectedLetter.word}`);
                }}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-lg mb-4 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all group"
                title={`Click to hear ${selectedLetter.letter} for ${selectedLetter.word}`}
              >
                <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center group-hover:bg-amber-50/50">
                  <span className="text-6xl sm:text-7xl font-extrabold font-['Fredoka',sans-serif] bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {selectedLetter.letter}
                    <span className="text-4xl sm:text-5xl text-amber-400 ml-1">{selectedLetter.lowercase}</span>
                  </span>
                </div>
              </button>

              {/* Icon Emoji and Name */}
              <button
                onClick={() => {
                  sound.playBell();
                  sound.speak(`${selectedLetter.letter} for ${selectedLetter.word}`);
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
                title={`Click to hear ${selectedLetter.letter} for ${selectedLetter.word}`}
              >
                <div className="mb-2 animate-bounce flex items-center justify-center">
                  <SmartIcon name={selectedLetter.iconName} size={56} />
                </div>
                <h3 className="text-3xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                  {selectedLetter.word}
                </h3>
              </button>
              <p className="text-sm font-bold text-orange-700 mb-2">
                Phonic: <span className="underline decoration-wavy decoration-orange-400 font-mono text-base">{selectedLetter.phonic}</span>
              </p>
              <p className="text-xs bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full font-bold mb-4">
                {selectedLetter.hindiMeaning}
              </p>

              {/* Sentence */}
              <div className="bg-white/90 rounded-2xl p-3 border border-amber-200 text-amber-900 text-sm font-medium mb-5 shadow-sm max-w-sm">
                "{selectedLetter.exampleSentence}"
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full justify-center">
                <button
                  id="speak-selected-letter-btn"
                  onClick={() => {
                    sound.playBell();
                    sound.speak(`${selectedLetter.letter} for ${selectedLetter.word}`);
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Listen Sound</span>
                </button>

                <button
                  id="trace-selected-letter-btn"
                  onClick={() => setActiveSubTab('tracing')}
                  className="py-3 px-4 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-2xl font-bold transition-all flex items-center justify-center gap-1.5"
                  title="Trace this letter"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Trace</span>
                </button>
              </div>
            </div>
          </div>

          {/* Letter Cards Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-4 border-amber-200 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-extrabold text-amber-900 flex items-center gap-2">
                  <span>Tap Any Letter:</span>
                  <span className="text-xs font-normal text-amber-700">(Hear sounds & colorful words)</span>
                </h4>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                  {letters.length} Letters
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
                {letters.map((item) => {
                  const isSelected = selectedLetter.letter === item.letter;
                  return (
                    <button
                      key={item.letter}
                      id={`letter-card-${item.letter}`}
                      onClick={() => handleLetterClick(item)}
                      className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all group ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-400 to-orange-500 text-white border-white shadow-lg scale-105 ring-2 ring-amber-300'
                          : 'bg-amber-50/60 hover:bg-amber-100 text-amber-950 border-amber-200 hover:scale-105 shadow-sm'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl font-extrabold font-['Fredoka',sans-serif] leading-none mb-0.5">
                        {item.letter}
                      </span>
                      <SmartIcon name={item.iconName} size={22} className="my-0.5" />
                      <span className={`text-[10px] font-bold truncate max-w-full mt-0.5 ${isSelected ? 'text-white' : 'text-amber-800'}`}>
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

      {/* Mode 2: Tracing Mode */}
      {activeSubTab === 'tracing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {letters.map((item) => (
              <button
                key={item.letter}
                onClick={() => {
                  setSelectedLetter(item);
                  sound.playPop();
                  sound.speak(`${item.letter} for ${item.word}`);
                }}
                className={`w-10 h-10 rounded-xl font-black text-base flex-shrink-0 transition-all ${
                  selectedLetter.letter === item.letter
                    ? 'bg-orange-500 text-white shadow-md scale-110'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {item.letter}
              </button>
            ))}
          </div>

          <LetterTracingCanvas
            letter={selectedLetter.letter}
            subtext={`${selectedLetter.letter} for ${selectedLetter.word}`}
            onComplete={() => onAwardStar()}
          />
        </div>
      )}

      {/* Mode 3: Sight Words */}
      {activeSubTab === 'sightwords' && (
        <div className="bg-white/90 rounded-3xl p-6 border-4 border-amber-200 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <SmartIcon name="📖" size={32} />
            <div>
              <h3 className="text-xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                Toddler Sight Words & Happy Expressions
              </h3>
              <p className="text-xs text-amber-800">Tap words to hear them spoken clearly with heartwarming examples.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SIGHT_WORDS.map((w) => (
              <button
                key={w.word}
                onClick={() => handleSightWordClick(w)}
                className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl border-2 border-amber-300 hover:border-orange-400 hover:shadow-lg transition-all active:scale-95 text-center group"
              >
                <div className="mb-2 group-hover:scale-125 transition-transform">
                  <SmartIcon name={w.emoji} size={36} />
                </div>
                <span className="text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">{w.word}</span>
                <span className="text-xs text-amber-700 font-medium mt-1">{w.hint}</span>
                <div className="mt-2 text-[10px] font-bold text-orange-600 flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Tap to Listen</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode 4: Colors */}
      {activeSubTab === 'colors' && (
        <div className="bg-white/90 rounded-3xl p-6 border-4 border-amber-200 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <SmartIcon name="🎨" size={32} />
            <div>
              <h3 className="text-xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                Basic Colors for Children
              </h3>
              <p className="text-xs text-amber-800">Learn basic colors with everyday examples like Red, Blue, Green, Yellow, and more!</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TODDLER_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => handleColorClick(c)}
                className="flex flex-col items-center p-4 bg-amber-50/50 rounded-2xl border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all text-center group active:scale-95"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-md border-4 border-white mb-3 flex items-center justify-center transition-transform group-hover:scale-110 ring-2 ring-slate-200/50"
                  style={{ backgroundColor: c.hex }}
                >
                  <SmartIcon name={c.emoji} size={32} />
                </div>
                <h4 className="text-base font-extrabold text-slate-800">{c.name}</h4>
                <p className="text-xs text-amber-800 font-medium mt-0.5">{c.theme}</p>
                <span className="text-[10px] font-bold text-orange-600 mt-1 flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <Volume2 className="w-3 h-3" />
                  <span>Tap to Hear</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mode 5: Fun Quiz */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-xl mx-auto bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-3xl p-6 border-4 border-amber-300 shadow-xl text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black bg-amber-200 text-amber-900 px-3 py-1 rounded-full">
              Question {quizIndex + 1} of {quizItems.length}
            </span>
            <div className="flex items-center gap-1 text-sm font-black text-orange-600">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Score: {quizScore} ⭐</span>
            </div>
          </div>

          <div className="my-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 mb-2">
              {quizItems[quizIndex % quizItems.length].prompt}
            </h3>
            <p className="text-xs text-amber-700">Tap the correct letter below to win a gold star!</p>
          </div>

          {/* Feedback banner */}
          {quizFeedback && (
            <div className="my-3 py-2 px-4 bg-amber-200 text-amber-950 font-black rounded-xl text-sm animate-bounce shadow-inner">
              {quizFeedback}
            </div>
          )}

          {/* 3 Options */}
          <div className="grid grid-cols-3 gap-4 my-6">
            {quizItems[quizIndex % quizItems.length].options.map((opt) => (
              <button
                key={opt.letter}
                onClick={() => handleQuizAnswer(opt)}
                className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border-4 border-amber-200 hover:border-orange-400 hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <span className="text-4xl sm:text-5xl font-extrabold font-['Fredoka',sans-serif] text-orange-600 mb-1 group-hover:scale-110 transition-transform">
                  {opt.letter}
                </span>
                <div className="my-1">
                  <SmartIcon name={opt.iconName} size={28} />
                </div>
                <span className="text-xs font-bold text-amber-900 mt-1">{opt.word}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setQuizIndex((prev) => (prev + 1) % quizItems.length);
            }}
            className="flex items-center gap-2 mx-auto text-xs font-bold text-amber-800 hover:text-orange-600 py-1 px-3 bg-amber-200/60 rounded-xl"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Question</span>
          </button>
        </div>
      )}
    </div>
  );
};
