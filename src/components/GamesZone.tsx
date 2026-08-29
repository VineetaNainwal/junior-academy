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
  const [activeGame, setActiveGame] = useState<'balloon' | 'memory' | 'rangoli' | 'soundSafari'>('balloon');

  // Balloon Game State
  const [balloonScore, setBalloonScore] = useState(0);
  const [balloons, setBalloons] = useState<
    { id: number; char: string; color: string; left: number; speed: number; popped: boolean }[]
  >([]);

  // Memory Game State
  const [cards, setCards] = useState<{ id: number; name: string; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMatches, setMemoryMatches] = useState(0);

  // Sound Safari State
  const [safariIndex, setSafariIndex] = useState(0);
  const [safariScore, setSafariScore] = useState(0);
  const [safariFeedback, setSafariFeedback] = useState<string | null>(null);

  // Rangoli Pad Ref
  const rangoliCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRangoliDrawing, setIsRangoliDrawing] = useState(false);
  const [selectedRangoliColor, setSelectedRangoliColor] = useState('#F59E0B');
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);

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

  // Sound Safari Clues
  const safariQuestions = [
    { soundType: 'bell', prompt: 'Which sacred item makes a sweet ringing chime?', correctEmoji: '🔔', correctName: 'Temple Bell (Ghanti)', options: [{ emoji: '🔔', name: 'Temple Bell' }, { emoji: '🐄', name: 'Cow' }, { emoji: '🦚', name: 'Peacock' }] },
    { soundType: 'flute', prompt: 'Which musical instrument plays Krishna’s sweet melody?', correctEmoji: '🪈', correctName: 'Flute (Bansuri)', options: [{ emoji: '🪈', name: 'Flute (Bansuri)' }, { emoji: '🥁', name: 'Dholak' }, { emoji: '🐘', name: 'Elephant' }] },
    { soundType: 'tabla', prompt: 'Which percussion instrument keeps the sacred rhythm?', correctEmoji: '🪘', correctName: 'Tabla / Damru', options: [{ emoji: '🪘', name: 'Tabla' }, { emoji: '🪷', name: 'Lotus' }, { emoji: '☀️', name: 'Sun' }] },
  ];

  const handlePlaySafariSound = (type: string) => {
    if (type === 'bell') sound.playBell();
    else if (type === 'flute') sound.playFlute();
    else if (type === 'tabla') sound.playTabla();
    else sound.playSparkle();
  };

  const handleSafariAnswer = (choice: { emoji: string; name: string }) => {
    const currentQ = safariQuestions[safariIndex % safariQuestions.length];
    if (choice.emoji === currentQ.correctEmoji) {
      sound.playSparkle();
      sound.speak(`Yes! ${currentQ.correctName}!`);
      setSafariFeedback('🎉 Superb! Correct!');
      setSafariScore((prev) => prev + 1);
      onAwardStar();
      confetti({ particleCount: 30, spread: 50 });
      setTimeout(() => {
        setSafariFeedback(null);
        setSafariIndex((prev) => (prev + 1) % safariQuestions.length);
      }, 1400);
    } else {
      sound.playPop();
      sound.speak('Listen again and tap the right image!');
      setSafariFeedback('🌸 Try again!');
      setTimeout(() => setSafariFeedback(null), 1000);
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎈</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Play & Learn Game Zone (बाल क्रीड़ा कुंज)
            </h2>
            <p className="text-xs text-amber-800">Balloon popping, memory cards, rangoli art pad & sound guessing!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-amber-100/70 p-1 rounded-xl">
          <button
            id="game-tab-balloon"
            onClick={() => {
              sound.playPop();
              setActiveGame('balloon');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeGame === 'balloon'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeGame === 'memory'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeGame === 'rangoli'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
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
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeGame === 'soundSafari'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Sound Safari</span>
          </button>
        </div>
      </div>

      {/* Game 1: Balloon Pop */}
      {activeGame === 'balloon' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold bg-white/90 text-amber-950 px-3 py-1.5 rounded-full shadow-sm">
              Tap floating balloons to pop!
            </span>
            <div className="flex items-center gap-1 text-sm font-black text-fuchsia-600 bg-white/90 px-3 py-1.5 rounded-full shadow-sm">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Popped: {balloonScore} 🎈</span>
            </div>
          </div>

          {/* Sky Balloon Stage */}
          <div className="relative h-96 rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-sky-200/50 to-amber-100/40 my-4 overflow-hidden shadow-inner">
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
                } shadow-lg flex flex-col items-center justify-center text-white border-2 border-white transition-all transform hover:scale-125 active:scale-75 ${
                  b.popped ? 'scale-0 opacity-0' : 'animate-bounce'
                }`}
              >
                <span className="text-2xl font-extrabold drop-shadow font-['Fredoka',sans-serif]">
                  {b.char}
                </span>
                {/* Balloon knot and thread */}
                <div className="w-2 h-2 bg-amber-800 rounded-full mt-2" />
                <div className="w-0.5 h-6 bg-slate-400 opacity-60" />
              </button>
            ))}
          </div>

          <p className="text-xs text-amber-800 font-bold">
            💡 Pop 5 balloons to earn a golden star!
          </p>
        </div>
      )}

      {/* Game 2: Memory Match */}
      {activeGame === 'memory' && (
        <div className="max-w-xl mx-auto bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-800">
              Matches Found: <span className="font-extrabold text-rose-600">{memoryMatches} / {MEMORY_CARDS.length}</span>
            </span>
            <button
              onClick={initMemoryGame}
              className="flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-rose-600 py-1.5 px-3 bg-amber-200/60 rounded-xl"
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
                  className={`h-24 sm:h-28 rounded-2xl border-4 transition-all duration-300 flex items-center justify-center shadow-md ${
                    isRevealed
                      ? 'bg-white border-rose-400 scale-100 rotate-0 shadow-lg'
                      : 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-200 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isRevealed ? (
                    <SmartIcon name={card.emoji} size={40} />
                  ) : (
                    <SmartIcon name="🪷" size={28} className="opacity-75" />
                  )}
                </button>
              );
            })}
          </div>

          {memoryMatches === MEMORY_CARDS.length && (
            <div className="p-3 bg-emerald-500 text-white rounded-2xl font-black text-sm animate-bounce shadow-md">
              🎉 Outstanding! You solved the Sacred Memory Match!
            </div>
          )}
        </div>
      )}

      {/* Game 3: Rangoli & Glitter Art Pad */}
      {activeGame === 'rangoli' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                Rangoli & Stamp Studio (रंगोली कला)
              </h3>
              <p className="text-xs text-amber-800">Place sacred stamps and draw beautiful rangoli patterns!</p>
            </div>
            <button
              onClick={clearRangoliCanvas}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl hover:bg-amber-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Art</span>
            </button>
          </div>

          {/* Stamps Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-3 p-2 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-amber-900">Stamps:</span>
            {['🪔', '🪷', '🦚', '🟡', '🌸', '🕉️', '🐘', '⭐'].map((stamp) => (
              <button
                key={stamp}
                onClick={() => {
                  setSelectedStamp(stamp);
                  sound.playPop();
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  selectedStamp === stamp
                    ? 'bg-amber-400 scale-110 shadow-md border border-white'
                    : 'bg-white hover:bg-amber-100'
                }`}
              >
                <SmartIcon name={stamp} size={20} />
              </button>
            ))}
          </div>

          {/* Art Canvas */}
          <div className="relative rounded-2xl overflow-hidden border-4 border-dashed border-amber-300 bg-slate-900 shadow-inner">
            <canvas
              ref={rangoliCanvasRef}
              width={500}
              height={320}
              onClick={handleRangoliCanvasClick}
              className="w-full h-[280px] sm:h-[320px] cursor-pointer"
            />
          </div>

          <p className="text-xs text-slate-500 text-center mt-2">
            ✨ Tap anywhere on the dark canvas to place your selected stamp and create glowing festive patterns!
          </p>
        </div>
      )}

      {/* Game 4: Sound Safari */}
      {activeGame === 'soundSafari' && (
        <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50 rounded-3xl p-6 border-4 border-indigo-200 shadow-xl text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold bg-indigo-100 text-indigo-900 px-3 py-1 rounded-full">
              Sound Riddle {safariIndex + 1} of {safariQuestions.length}
            </span>
            <span className="text-xs font-extrabold text-indigo-700">Score: {safariScore} ⭐</span>
          </div>

          {(() => {
            const q = safariQuestions[safariIndex % safariQuestions.length];
            return (
              <div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">{q.prompt}</h3>
                <p className="text-xs text-slate-600 mb-5">Tap the big speaker to hear the sacred sound, then guess!</p>

                {/* Big Audio Trigger Button */}
                <button
                  id="play-safari-audio-btn"
                  onClick={() => handlePlaySafariSound(q.soundType)}
                  className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex flex-col items-center justify-center text-4xl shadow-xl hover:scale-110 active:scale-95 transition-all mb-6 border-4 border-white animate-pulse"
                >
                  <Volume2 className="w-10 h-10" />
                  <span className="text-[10px] font-black tracking-wider uppercase mt-1">Play Sound</span>
                </button>

                {safariFeedback && (
                  <div className="my-3 py-2 px-4 bg-indigo-200 text-indigo-950 font-black rounded-xl text-sm animate-bounce">
                    {safariFeedback}
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-3 gap-3 my-4">
                  {q.options.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSafariAnswer(opt)}
                      className="p-4 bg-white rounded-2xl border-2 border-indigo-200 hover:border-indigo-500 hover:scale-105 active:scale-95 transition-all shadow-md flex flex-col items-center"
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
