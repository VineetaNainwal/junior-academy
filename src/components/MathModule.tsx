import React, { useState, useEffect } from 'react';
import { AgeGroup, MathNumber, ShapeItem, AdditionChallenge } from '../types';
import { MATH_NUMBERS, MATH_SHAPES, generateRandomAdditionChallenges } from '../data/mathData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  Sparkles,
  Volume2,
  Trophy,
  RefreshCw,
  Layers,
  Shapes,
  PlusCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

export const MathModule: React.FC<MathModuleProps> = ({ ageGroup, onAwardStar }) => {
  const [activeSubTab, setActiveSubTab] = useState<'counting' | 'feedGanesha' | 'shapes' | 'addition'>('counting');
  const [selectedNum, setSelectedNum] = useState<MathNumber>(MATH_NUMBERS[0]);

  // Feed Ganesha Game State
  const [targetCount, setTargetCount] = useState<number>(3);
  const [fedCount, setFedCount] = useState<number>(0);
  const [ganeshaMood, setGaneshaMood] = useState<'happy' | 'excited' | 'eating'>('happy');

  // Addition State: 10 randomized challenges per session / refresh
  const [additionChallenges, setAdditionChallenges] = useState<AdditionChallenge[]>(() =>
    generateRandomAdditionChallenges(10)
  );
  const [addIndex, setAddIndex] = useState(0);
  const [addFeedback, setAddFeedback] = useState<string | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<number[]>([]);
  const [isAdditionCompleted, setIsAdditionCompleted] = useState(false);

  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  // Full numbers list 1–20 for all ages
  const numbersList = MATH_NUMBERS;

  const getNumberSpelling = (word: string) => {
    const letters = word.toUpperCase().split('').join(', ');
    return `${letters}, ${word}`;
  };

  const getSpellingDisplay = (word: string) => {
    return word.toUpperCase().split('').join(' · ');
  };

  const handleNumberClick = (item: MathNumber) => {
    setSelectedNum(item);
    sound.playTabla();
    sound.speak(getNumberSpelling(item.word));
  };

  const handleShapeClick = (shape: ShapeItem) => {
    sound.playBell();
    sound.speak(shape.name);
  };

  // Feed Ganesha Logic
  const handleAddModak = () => {
    if (fedCount < targetCount) {
      const nextCount = fedCount + 1;
      setFedCount(nextCount);
      setGaneshaMood('eating');
      sound.playPop();
      sound.speak(`${nextCount}! Yum yum!`);

      if (nextCount === targetCount) {
        setGaneshaMood('excited');
        sound.playCelebration();
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
        onAwardStar();
        sound.speak(`Arre Waah! You fed Bal Ganesha ${targetCount} sweet modaks! Ganesha is so happy!`);
      }
    }
  };

  const handleResetGaneshaGame = (newTarget?: number) => {
    const nextTarget = newTarget || Math.floor(Math.random() * 6) + 2;
    setTargetCount(nextTarget);
    setFedCount(0);
    setGaneshaMood('happy');
    sound.playBell();
  };

  // Addition challenge logic
  const handleGenerateNewAdditionSet = () => {
    const newChallenges = generateRandomAdditionChallenges(10);
    setAdditionChallenges(newChallenges);
    setAddIndex(0);
    setSolvedChallenges([]);
    setIsAdditionCompleted(false);
    setAddFeedback(null);
    sound.playSparkle();
    sound.speak('Here are 10 new addition challenges for you!');
  };

  const handleAdditionAnswer = (ans: number) => {
    const currentQ = additionChallenges[addIndex];
    if (!currentQ) return;

    if (ans === currentQ.answer) {
      sound.playSparkle();
      sound.speak(`Awesome! ${currentQ.num1} plus ${currentQ.num2} equals ${currentQ.answer}!`);
      setAddFeedback(`🌟 Super! ${currentQ.num1} + ${currentQ.num2} = ${currentQ.answer}`);
      onAwardStar();
      confetti({ particleCount: 35, spread: 55 });

      if (!solvedChallenges.includes(currentQ.id)) {
        setSolvedChallenges((prev) => [...prev, currentQ.id]);
      }

      setTimeout(() => {
        setAddFeedback(null);
        if (addIndex + 1 >= additionChallenges.length) {
          setIsAdditionCompleted(true);
          sound.playCelebration();
          confetti({ particleCount: 70, spread: 80 });
          sound.speak('Yay! You solved all 10 visual addition challenges! You are a Math Champion!');
        } else {
          setAddIndex((prev) => prev + 1);
        }
      }, 1300);
    } else {
      sound.playPop();
      sound.speak(`Try again! Count all the ${currentQ.item} together!`);
      setAddFeedback('🟡 Count the items one by one and try again!');
      setTimeout(() => setAddFeedback(null), 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border-2 border-emerald-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔢</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              Math & Numbers Playground
            </h2>
            <p className="text-xs text-emerald-800">Learn counting 1–20, number spelling, shapes & fun addition!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-emerald-100/70 p-1 rounded-xl">
          <button
            id="math-tab-counting"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('counting');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'counting'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Counting 1–20</span>
          </button>

          <button
            id="math-tab-feedGanesha"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('feedGanesha');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'feedGanesha'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <span className="text-sm">🟡</span>
            <span>Feed Ganesha Game</span>
          </button>

          <button
            id="math-tab-shapes"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('shapes');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'shapes'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Shapes className="w-3.5 h-3.5" />
            <span>Sacred Shapes</span>
          </button>

          <button
            id="math-tab-addition"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('addition');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'addition'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Visual Addition</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Counting Board */}
      {activeSubTab === 'counting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big Number View */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-6 border-2 border-emerald-200 shadow-md flex flex-col items-center text-center relative overflow-hidden">
              {/* Number Card */}
              <button
                onClick={() => {
                  sound.playBell();
                  sound.speak(getNumberSpelling(selectedNum.word));
                }}
                className="w-36 h-36 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-md mb-3 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all group"
                title={`Click to hear spelling of ${selectedNum.word}`}
              >
                <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center group-hover:bg-emerald-50/40">
                  <span className="text-7xl font-extrabold font-['Fredoka',sans-serif] text-emerald-600 leading-none">
                    {selectedNum.num}
                  </span>
                </div>
              </button>

              {/* Word & Spelling Display */}
              <button
                onClick={() => {
                  sound.playBell();
                  sound.speak(getNumberSpelling(selectedNum.word));
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-105 active:scale-95 transition-all mb-3"
                title={`Click to hear spelling: ${getNumberSpelling(selectedNum.word)}`}
              >
                <h3 className="text-4xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
                  {selectedNum.word}
                </h3>
                <span className="mt-1 inline-block bg-emerald-100/90 text-emerald-900 font-mono font-black text-sm tracking-widest px-3.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                  {getSpellingDisplay(selectedNum.word)}
                </span>
              </button>

              {/* Counting Items Visualizer */}
              <div className="bg-white rounded-2xl p-4 border border-emerald-200 w-full mb-4 shadow-xs">
                <p className="text-xs font-bold text-slate-600 mb-2">
                  Tap to count items ({selectedNum.countItem}):
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 max-h-32 overflow-y-auto p-1">
                  {Array.from({ length: selectedNum.num }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sound.playPop();
                        sound.speak(`${i + 1}`);
                      }}
                      className="w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center shadow-xs hover:scale-125 transition-transform"
                      title={`Item ${i + 1}`}
                    >
                      <SmartIcon name={selectedNum.countItemEmoji} size={24} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Hear Counting Voice */}
              <button
                id="speak-math-number-btn"
                onClick={() => {
                  sound.playBell();
                  sound.speak(getNumberSpelling(selectedNum.word));
                }}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen Spelling ({getSpellingDisplay(selectedNum.word)})</span>
              </button>
            </div>
          </div>

          {/* Numbers Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                  <span>Tap Any Number to Hear Spelling:</span>
                </h4>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                  1 to {numbersList.length} (All Numbers)
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[440px] overflow-y-auto pr-1">
                {numbersList.map((item) => {
                  const isSelected = selectedNum.num === item.num;
                  return (
                    <button
                      key={item.num}
                      id={`num-card-${item.num}`}
                      onClick={() => handleNumberClick(item)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all group ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md scale-105 ring-2 ring-emerald-200'
                          : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200 hover:border-emerald-300 hover:scale-105 shadow-xs'
                      }`}
                    >
                      <span className="text-3xl font-extrabold font-['Fredoka',sans-serif] leading-none mb-1">
                        {item.num}
                      </span>
                      <div className="my-1">
                        <SmartIcon name={item.countItemEmoji} size={24} />
                      </div>
                      <span className={`text-xs font-black truncate max-w-full mt-0.5 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                        {item.word}
                      </span>
                      <span className={`text-[9px] font-mono tracking-tighter truncate max-w-full ${isSelected ? 'text-emerald-100' : 'text-emerald-700'}`}>
                        {getSpellingDisplay(item.word)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Feed Bal Ganesha Game */}
      {activeSubTab === 'feedGanesha' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-lg text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-extrabold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full">
              Mission: Feed Bal Ganesha {targetCount} Modaks!
            </span>
            <button
              onClick={() => handleResetGaneshaGame()}
              className="flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-950 py-1 px-3 bg-amber-100 rounded-xl"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Count</span>
            </button>
          </div>

          {/* Ganesha Avatar & Reaction */}
          <div className="relative my-4 flex flex-col items-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 p-1.5 shadow-xl flex items-center justify-center animate-pulse">
              <div className="w-full h-full bg-amber-50 rounded-full flex flex-col items-center justify-center shadow-inner">
                <SmartIcon name="🐘" size={72} />
                {ganeshaMood === 'excited' && (
                  <span className="text-xs font-black text-amber-600 animate-bounce">✨ Happy! ✨</span>
                )}
                {ganeshaMood === 'eating' && (
                  <span className="text-xs font-black text-amber-600 animate-bounce">😋 Yum! 😋</span>
                )}
              </div>
            </div>

            {/* Speech Bubble */}
            <div className="mt-3 bg-white px-5 py-2 rounded-2xl border-2 border-amber-200 shadow-xs font-bold text-sm text-slate-800">
              {fedCount === targetCount
                ? `🎉 "Jai Ganesha! Thank you for ${targetCount} sweet modaks!"`
                : `"Please give me ${targetCount - fedCount} more round modak${targetCount - fedCount > 1 ? 's' : ''}!"`}
            </div>
          </div>

          {/* Golden Plate showing fed modaks */}
          <div className="bg-amber-50 rounded-3xl p-4 border-2 border-amber-200 max-w-md mx-auto my-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2 px-2">
              <span>Ganesha's Golden Plate:</span>
              <span className="text-sm font-black text-amber-700">
                {fedCount} / {targetCount} Modaks
              </span>
            </div>

            <div className="min-h-[70px] bg-white rounded-2xl p-3 border-2 border-dashed border-amber-200 flex flex-wrap items-center justify-center gap-3">
              {fedCount === 0 ? (
                <span className="text-xs text-slate-500 font-medium italic">
                  Tap the golden modak below to add to the plate!
                </span>
              ) : (
                Array.from({ length: fedCount }).map((_, idx) => (
                  <div key={idx} className="animate-bounce">
                    <SmartIcon name="modak" size={36} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Interactive Modak Bowl to tap */}
          <div className="flex flex-col items-center">
            {fedCount < targetCount ? (
              <button
                id="add-modak-btn"
                onClick={handleAddModak}
                className="py-4 px-8 bg-amber-500 hover:bg-amber-600 text-white text-lg font-black rounded-3xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <SmartIcon name="modak" size={32} />
                <span>Tap to Feed 1 Sweet Modak!</span>
              </button>
            ) : (
              <button
                onClick={() => handleResetGaneshaGame()}
                className="py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-black rounded-3xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>Play Next Number!</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode 3: Shapes Explorer */}
      {activeSubTab === 'shapes' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">📐</span>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
                Playful & Geometric Shapes
              </h3>
              <p className="text-xs text-slate-600">Discover geometric shapes, sides, and real-world examples!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MATH_SHAPES.map((shape) => (
              <div
                key={shape.id}
                onClick={() => handleShapeClick(shape)}
                className="bg-slate-50 hover:bg-emerald-50/60 p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                {/* Shape Visual representation */}
                <div className="w-24 h-24 rounded-2xl bg-white shadow-xs border-2 border-emerald-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {shape.svgType === 'circle' && (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-xs ring-4 ring-amber-200/60" />
                  )}
                  {shape.svgType === 'triangle' && (
                    <div className="w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[50px] border-b-rose-500 filter drop-shadow-xs" />
                  )}
                  {shape.svgType === 'square' && (
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl shadow-xs ring-4 ring-emerald-200/60" />
                  )}
                  {shape.svgType === 'rectangle' && (
                    <div className="w-16 h-11 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl shadow-xs ring-4 ring-blue-200/60" />
                  )}
                  {shape.svgType === 'star' && (
                    <SmartIcon name="⭐" size={40} />
                  )}
                  {shape.svgType === 'lotus' && (
                    <SmartIcon name="🪷" size={42} />
                  )}
                </div>

                <h4 className="text-xl font-extrabold text-slate-800">{shape.name}</h4>
                <p className="text-xs text-slate-600 font-medium bg-white px-3 py-1 rounded-xl border border-emerald-100 mt-1">
                  Example: {shape.culturalExample}
                </p>

                <div className="mt-3 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Tap to Hear</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 4: Visual Addition */}
      {activeSubTab === 'addition' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl text-center">
          {/* Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold bg-emerald-200 text-emerald-950 px-3 py-1 rounded-full shadow-sm">
                Challenge {addIndex + 1} of {additionChallenges.length}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>{solvedChallenges.length} Solved</span>
              </span>
            </div>
            
            <button
              onClick={handleGenerateNewAdditionSet}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 py-1.5 px-3 bg-white/90 hover:bg-emerald-100 rounded-xl border border-emerald-300 shadow-sm transition-all"
              title="Generate 10 new random addition problems"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New 10 Challenges</span>
            </button>
          </div>

          {/* 10 Step Progress Dots */}
          <div className="flex items-center justify-center gap-1.5 mb-6 overflow-x-auto py-1">
            {additionChallenges.map((ch, idx) => {
              const isCurrent = idx === addIndex;
              const isSolved = solvedChallenges.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    sound.playPop();
                    setAddIndex(idx);
                    setIsAdditionCompleted(false);
                  }}
                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 text-white scale-110 ring-2 ring-emerald-300 ring-offset-2 shadow-md'
                      : isSolved
                      ? 'bg-amber-400 text-amber-950 font-black'
                      : 'bg-emerald-200/60 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  title={`Go to Challenge ${idx + 1}`}
                >
                  {isSolved ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>

          {isAdditionCompleted ? (
            /* Celebration Screen when all 10 are solved */
            <div className="bg-white/95 rounded-3xl p-8 border-4 border-amber-300 shadow-xl my-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="text-6xl mb-3 animate-bounce">🏆</div>
              <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif] mb-2">
                Super Addition Champion!
              </h3>
              <p className="text-base text-slate-700 font-medium mb-5">
                You successfully solved all <span className="font-extrabold text-emerald-600">10 Visual Addition Challenges</span>!
              </p>
              
              <div className="flex justify-center gap-2 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
                ))}
              </div>

              <button
                onClick={handleGenerateNewAdditionSet}
                className="py-3.5 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play 10 New Challenges</span>
              </button>
            </div>
          ) : (
            /* Current Question */
            (() => {
              const q = additionChallenges[addIndex];
              if (!q) return null;

              return (
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 font-['Baloo_2',sans-serif]">
                    {q.title}
                  </h3>

                  {/* Audio button for question */}
                  <button
                    onClick={() => {
                      sound.playBell();
                      sound.speak(`What is ${q.num1} plus ${q.num2}? Count the items!`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white/80 px-3 py-1 rounded-full border border-emerald-200 mb-4 hover:scale-105 transition-transform"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear Problem Aloud</span>
                  </button>

                  {/* Visual Equation with big emojis */}
                  <div className="flex items-center justify-center gap-2 sm:gap-4 my-4 bg-white/95 p-5 rounded-3xl border-2 border-emerald-200 shadow-md flex-wrap sm:flex-nowrap">
                    {/* Left Set */}
                    <div className="flex flex-col items-center p-2 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                      <div className="flex gap-1.5 flex-wrap justify-center max-w-[140px]">
                        {Array.from({ length: q.num1 }).map((_, i) => (
                          <div
                            key={i}
                            className="animate-bounce cursor-pointer hover:scale-125 transition-transform"
                            onClick={() => {
                              sound.playPop();
                              sound.speak(`${i + 1}`);
                            }}
                            title={`Item ${i + 1}`}
                          >
                            <SmartIcon name={q.itemEmoji} size={36} />
                          </div>
                        ))}
                      </div>
                      <span className="text-3xl font-extrabold text-emerald-700 mt-2 font-['Fredoka',sans-serif]">
                        {q.num1}
                      </span>
                    </div>

                    <span className="text-4xl font-extrabold text-amber-600 px-1">+</span>

                    {/* Right Set */}
                    <div className="flex flex-col items-center p-2 rounded-2xl bg-teal-50/60 border border-teal-100">
                      <div className="flex gap-1.5 flex-wrap justify-center max-w-[140px]">
                        {Array.from({ length: q.num2 }).map((_, i) => (
                          <div
                            key={i}
                            className="animate-bounce cursor-pointer hover:scale-125 transition-transform"
                            onClick={() => {
                              sound.playPop();
                              sound.speak(`${q.num1 + i + 1}`);
                            }}
                            title={`Item ${q.num1 + i + 1}`}
                          >
                            <SmartIcon name={q.itemEmoji} size={36} />
                          </div>
                        ))}
                      </div>
                      <span className="text-3xl font-extrabold text-teal-700 mt-2 font-['Fredoka',sans-serif]">
                        {q.num2}
                      </span>
                    </div>

                    <span className="text-4xl font-extrabold text-amber-600 px-1">=</span>

                    {/* Question Box */}
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 border-3 border-dashed border-amber-400 flex items-center justify-center text-3xl font-extrabold text-orange-600 shadow-inner">
                      ?
                    </div>
                  </div>

                  {addFeedback && (
                    <div className="my-3 py-2.5 px-4 bg-emerald-200 text-emerald-950 font-black rounded-2xl text-base animate-bounce shadow-sm">
                      {addFeedback}
                    </div>
                  )}

                  {/* 3 Answer choices */}
                  <div className="my-5">
                    <p className="text-xs font-bold text-slate-600 mb-2">Tap the Correct Total:</p>
                    <div className="grid grid-cols-3 gap-3 sm:gap-5">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAdditionAnswer(opt)}
                          className="py-4 px-4 bg-white hover:bg-emerald-50 active:bg-emerald-100 rounded-3xl border-4 border-emerald-300 text-4xl sm:text-5xl font-extrabold font-['Fredoka',sans-serif] text-emerald-700 hover:scale-105 active:scale-95 transition-all shadow-md hover:border-emerald-500 cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-200">
                    <button
                      disabled={addIndex === 0}
                      onClick={() => {
                        sound.playPop();
                        setAddIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-950 py-2 px-3 bg-white/80 rounded-xl border border-emerald-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="text-xs font-bold text-slate-500">
                      Tap items to count them!
                    </span>

                    <button
                      disabled={addIndex === additionChallenges.length - 1}
                      onClick={() => {
                        sound.playPop();
                        setAddIndex((prev) => Math.min(additionChallenges.length - 1, prev + 1));
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-800 disabled:opacity-30 disabled:cursor-not-allowed hover:text-emerald-950 py-2 px-3 bg-white/80 rounded-xl border border-emerald-200"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
};
