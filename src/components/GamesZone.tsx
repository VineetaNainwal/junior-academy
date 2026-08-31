import React, { useState, useEffect, useRef } from 'react';
import { AgeGroup } from '../types';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  Sparkles,
  Gamepad2,
  Trophy,
  RotateCcw,
  Volume2,
  Palette,
  CheckCircle2,
  Layers,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesZoneProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

// Memory Match Items
const MEMORY_CARDS = [
  { id: 1, name: 'Diya', emoji: '🪔' },
  { id: 2, name: 'Lotus', emoji: '🪷' },
  { id: 3, name: 'Modak', emoji: '🟡' },
  { id: 4, name: 'Peacock', emoji: '🦚' },
  { id: 5, name: 'Flute', emoji: '🪈' },
  { id: 6, name: 'Ganesha', emoji: '🐘' },
];

export const GamesZone: React.FC<GamesZoneProps> = ({ ageGroup, onAwardStar }) => {
  const [activeGame, setActiveGame] = useState<'balloon' | 'memory' | 'rangoli'>('balloon');

  // Balloon Game State
  const [balloonScore, setBalloonScore] = useState(0);
  const [balloons, setBalloons] = useState<
    { id: number; char: string; color: string; left: number; speed: number; popped: boolean }[]
  >([]);

  // Memory Game State
  const [cards, setCards] = useState<{ id: number; name: string; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMatches, setMemoryMatches] = useState(0);

  // Rangoli Pad Ref
  const rangoliCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRangoliDrawing, setIsRangoliDrawing] = useState(false);
  const [selectedRangoliColor, setSelectedRangoliColor] = useState('#F59E0B');
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  // Initialize Balloon Pop Game
  useEffect(() => {
    if (activeGame === 'balloon') {
      initBalloons();
      const interval = setInterval(() => {
        setBalloons((prev) =>
          prev.map((b) => ({
            ...b,
            left: (b.left + (Math.random() * 2 - 1) + 100) % 85 + 5,
          }))
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeGame]);

  const initBalloons = () => {
    const chars = ['A', 'B', 'C', '१', '२', '३', '🪔', '🦚', '🟡', '🌸', '🐘', 'ॐ'];
    const colors = [
      'from-rose-400 to-pink-500',
      'from-amber-400 to-orange-500',
      'from-emerald-400 to-teal-500',
      'from-sky-400 to-blue-500',
      'from-purple-400 to-violet-500',
    ];

    const initial = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      color: colors[i % colors.length],
      left: 10 + i * 15,
      speed: 1.5,
      popped: false,
    }));
    setBalloons(initial);
  };

  const handlePopBalloon = (id: number, char: string) => {
    sound.playPop();
    sound.speak(`${char}!`);
    setBalloonScore((prev) => prev + 1);

    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Replace popped balloon after short delay
    setTimeout(() => {
      const chars = ['A', 'B', 'C', 'D', '१', '२', '३', '४', '🪔', '🦚', '🟡', '🌸', '🐘', '🕉️', '⭐'];
      const colors = ['from-rose-400 to-pink-500', 'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500', 'from-sky-400 to-blue-500', 'from-purple-400 to-violet-500'];
      setBalloons((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                char: chars[Math.floor(Math.random() * chars.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                left: Math.floor(Math.random() * 80) + 10,
                popped: false,
              }
            : b
        )
      );
    }, 600);

    if ((balloonScore + 1) % 5 === 0) {
      sound.playSparkle();
      confetti({ particleCount: 30, spread: 45 });
      onAwardStar();
    }
  };

  // Initialize Memory Cards
  useEffect(() => {
    if (activeGame === 'memory') {
      initMemoryGame();
    }
  }, [activeGame]);

  const initMemoryGame = () => {
    const deck = [...MEMORY_CARDS, ...MEMORY_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        ...item,
        uniqueId: idx,
        flipped: false,
        matched: false,
      }));
    setCards(deck as any);
    setFlippedIndices([]);
    setMemoryMatches(0);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) return;

    sound.playPop();
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        // Matched!
        setTimeout(() => {
          sound.playSparkle();
          sound.speak(`Matched ${cards[firstIdx].name}!`);
          const matchedDeck = [...newCards];
          matchedDeck[firstIdx].matched = true;
          matchedDeck[secondIdx].matched = true;
          setCards(matchedDeck);
          setFlippedIndices([]);
          setMemoryMatches((prev) => {
            const next = prev + 1;
            if (next === MEMORY_CARDS.length) {
              sound.playCelebration();
              confetti({ particleCount: 50, spread: 70 });
              onAwardStar();
            }
            return next;
          });
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          const resetDeck = [...newCards];
          resetDeck[firstIdx].flipped = false;
          resetDeck[secondIdx].flipped = false;
          setCards(resetDeck);
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Rangoli Pad Handlers
  const handleRangoliCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = rangoliCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (selectedStamp) {
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      sound.playSparkle();
    }
  };

  const clearRangoliCanvas = () => {
    const canvas = rangoliCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sound.playPop();
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl">
            🎮
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              Play & Learn Game Zone (बाल क्रीड़ा कुंज)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Interactive balloon popping, memory match cards, rangoli art pad & sound riddles!
            </p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
          <button
            id="game-tab-balloon"
            onClick={() => {
              sound.playPop();
              setActiveGame('balloon');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              activeGame === 'balloon'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="text-sm">🎈</span>
            <span>Balloon Pop</span>
          </button>

          <button
            id="game-tab-memory"
            onClick={() => {
              sound.playPop();
              setActiveGame('memory');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              activeGame === 'memory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Memory Match</span>
          </button>

          <button
            id="game-tab-rangoli"
            onClick={() => {
              sound.playPop();
              setActiveGame('rangoli');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              activeGame === 'rangoli'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Rangoli Art</span>
          </button>

          <button
            id="game-tab-safari"
            onClick={() => {
              sound.playPop();
              setActiveGame('soundSafari');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
              activeGame === 'soundSafari'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Sound Safari</span>
          </button>
        </div>
      </div>

      {/* Game 1: Balloon Pop */}
      {activeGame === 'balloon' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold bg-indigo-50 text-indigo-900 px-3.5 py-1.5 rounded-full border border-indigo-100">
              Tap floating balloons to pop! 🎈
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Popped: {balloonScore}</span>
            </div>
          </div>

          {/* Sky Balloon Stage */}
          <div className="relative h-96 rounded-2xl border border-sky-200 bg-gradient-to-b from-sky-100 via-sky-50 to-indigo-50/30 my-4 overflow-hidden shadow-inner">
            {/* Sun & Cloud Decor */}
            <div className="absolute top-4 left-6 text-4xl animate-pulse">☀️</div>
            <div className="absolute top-8 right-8 text-3xl opacity-80">☁️</div>

            {balloons.map((b) => (
              <button
                key={b.id}
                onClick={() => handlePopBalloon(b.id, b.char)}
                style={{
                  left: `${b.left}%`,
                  bottom: `${20 + (b.id * 12) % 65}%`,
                }}
                className={`absolute w-20 h-24 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-br ${
                  b.color
                } shadow-md flex flex-col items-center justify-center text-white border-2 border-white transition-all transform hover:scale-125 active:scale-75 ${
                  b.popped ? 'scale-0 opacity-0' : 'animate-bounce'
                }`}
              >
                <span className="text-2xl font-black drop-shadow font-['Baloo_2',sans-serif]">
                  {b.char}
                </span>
                {/* Balloon knot and thread */}
                <div className="w-2 h-2 bg-slate-700/40 rounded-full mt-1.5" />
                <div className="w-0.5 h-6 bg-slate-400 opacity-60" />
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-500 font-bold">
            💡 Pop 5 balloons to earn a golden star!
          </p>
        </div>
      )}

      {/* Game 2: Memory Match */}
      {activeGame === 'memory' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
              Matches: <span className="font-extrabold text-indigo-600">{memoryMatches} / {MEMORY_CARDS.length}</span>
            </span>
            <button
              onClick={initMemoryGame}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 py-1.5 px-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Shuffle Cards</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 my-4">
            {cards.map((card, idx) => {
              const isRevealed = card.flipped || card.matched;
              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`h-24 sm:h-28 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center shadow-xs ${
                    isRevealed
                      ? 'bg-indigo-50/80 border-indigo-400 scale-100 rotate-0 shadow-sm'
                      : 'bg-gradient-to-br from-indigo-500 to-indigo-700 border-indigo-400 hover:scale-105 active:scale-95 text-white'
                  }`}
                >
                  {isRevealed ? (
                    <SmartIcon name={card.emoji} size={40} />
                  ) : (
                    <span className="text-2xl text-white/80 font-black">✦</span>
                  )}
                </button>
              );
            })}
          </div>

          {memoryMatches === MEMORY_CARDS.length && (
            <div className="p-3 bg-emerald-500 text-white rounded-2xl font-black text-sm animate-bounce shadow-sm">
              🎉 Outstanding! You solved the Memory Match!
            </div>
          )}
        </div>
      )}

      {/* Game 3: Rangoli & Glitter Art Pad */}
      {activeGame === 'rangoli' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
                Rangoli & Stamp Studio (रंगोली कला)
              </h3>
              <p className="text-xs text-slate-500 font-medium">Place sacred stamps and draw beautiful rangoli patterns!</p>
            </div>
            <button
              onClick={clearRangoliCanvas}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Art</span>
            </button>
          </div>

          {/* Stamps Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Stamps:</span>
            {['🪔', '🪷', '🦚', '🟡', '🌸', '🕉️', '🐘', '⭐'].map((stamp) => (
              <button
                key={stamp}
                onClick={() => {
                  setSelectedStamp(stamp);
                  sound.playPop();
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  selectedStamp === stamp
                    ? 'bg-indigo-600 text-white scale-110 shadow-xs border border-white'
                    : 'bg-white hover:bg-indigo-50 border border-slate-200'
                }`}
              >
                <SmartIcon name={stamp} size={20} />
              </button>
            ))}
          </div>

          {/* Art Canvas */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-indigo-200 bg-slate-900 shadow-inner">
            <canvas
              ref={rangoliCanvasRef}
              width={500}
              height={320}
              onClick={handleRangoliCanvasClick}
              className="w-full h-[280px] sm:h-[320px] cursor-pointer"
            />
          </div>

          <p className="text-xs text-slate-500 text-center mt-2.5">
            ✨ Tap anywhere on the canvas to place your selected stamp and create colorful patterns!
          </p>
        </div>
      )}

      {/* Game 4: Sound Safari */}
      {activeGame === 'soundSafari' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 border-2 border-indigo-100 shadow-sm text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold bg-indigo-50 text-indigo-900 px-3.5 py-1.5 rounded-full border border-indigo-100">
              Sound Riddle {safariIndex + 1} of {safariQuestions.length}
            </span>
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full">Score: {safariScore} ⭐</span>
          </div>

          {(() => {
            const q = safariQuestions[safariIndex % safariQuestions.length];
            return (
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1.5 font-['Baloo_2',sans-serif]">{q.prompt}</h3>
                <p className="text-xs text-slate-500 mb-5 font-medium">Tap the speaker to hear the sound, then guess the right answer!</p>

                {/* Big Audio Trigger Button */}
                <button
                  id="play-safari-audio-btn"
                  onClick={() => handlePlaySafariSound(q.soundType)}
                  className="w-24 h-24 mx-auto rounded-3xl bg-indigo-600 text-white flex flex-col items-center justify-center text-3xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all mb-6 border-2 border-indigo-400"
                >
                  <Volume2 className="w-8 h-8" />
                  <span className="text-[10px] font-black tracking-wider uppercase mt-1">Play Sound</span>
                </button>

                {safariFeedback && (
                  <div className="my-3 py-2 px-4 bg-indigo-100 text-indigo-950 font-black rounded-xl text-sm animate-bounce">
                    {safariFeedback}
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-3 gap-3 my-4">
                  {q.options.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSafariAnswer(opt)}
                      className="p-4 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-xs flex flex-col items-center"
                    >
                      <div className="mb-1">
                        <SmartIcon name={opt.emoji} size={36} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{opt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
