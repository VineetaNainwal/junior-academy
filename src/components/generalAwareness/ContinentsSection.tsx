import React, { useState } from 'react';
import { ContinentItem } from '../../types';
import { CONTINENTS_DATA, OCEANS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { Volume2, Sparkles, Globe, HelpCircle, CheckCircle2, MapPin, Waves, Compass, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContinentsSectionProps {
  onAwardStar: () => void;
}

export const ContinentsSection: React.FC<ContinentsSectionProps> = ({ onAwardStar }) => {
  const [selectedContinent, setSelectedContinent] = useState<ContinentItem>(CONTINENTS_DATA[0]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'Which is the LARGEST continent on Earth where India and Mount Everest are located?',
      correctId: 'asia',
      hint: '🌏 Asia — covers 30% of land!',
    },
    {
      question: 'Which is the coldest, windiest continent covered in 98% ice where cute Emperor Penguins live?',
      correctId: 'antarctica',
      hint: '🐧 The White Continent!',
    },
    {
      question: 'Which island continent is famous for hopping Kangaroos, cuddly Koalas & the Great Barrier Reef?',
      correctId: 'australia',
      hint: '🦘 Australia / Oceania!',
    },
    {
      question: 'Which continent is home to the Amazon Rainforest — the "Lungs of our Planet"?',
      correctId: 'south-america',
      hint: '🦜 South America!',
    },
    {
      question: 'Which continent has the mighty Sahara Desert, wild lions, and the longest Nile River?',
      correctId: 'africa',
      hint: '🦁 Africa!',
    },
    {
      question: 'Which continent is famous for historic fairy tale castles, the Eiffel Tower and the Alps?',
      correctId: 'europe',
      hint: '🏰 Europe!',
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectContinent = (continent: ContinentItem) => {
    setSelectedContinent(continent);
    sound.playBell();
    sound.speak(continent.name);
  };

  const handleQuizAnswer = (continentId: string) => {
    if (continentId === currentQuiz.correctId) {
      setQuizFeedback('correct');
      sound.playCelebration();
      confetti({ particleCount: 35, spread: 50 });
      onAwardStar();

      setTimeout(() => {
        setQuizFeedback(null);
        if (quizIndex < quizQuestions.length - 1) {
          setQuizIndex((prev) => prev + 1);
        } else {
          setQuizIndex(0);
          setIsQuizMode(false);
          sound.speak('World Geography Champion! You know all 7 continents of Earth!');
        }
      }, 1500);
    } else {
      setQuizFeedback('wrong');
      sound.playPop();
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-cyan-950 text-white p-3.5 rounded-2xl border-2 border-cyan-400/40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-800/80 border border-cyan-400 flex items-center justify-center text-2xl">
            🌍
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-cyan-300 font-['Baloo_2',sans-serif]">
              7 Continents of the World (विश्व के 7 महाद्वीप)
            </h3>
            <p className="text-xs text-cyan-100">Discover Earth’s 7 continents, majestic landmarks, unique wildlife & 5 vast oceans!</p>
          </div>
        </div>

        <button
          id="continent-quiz-toggle-btn"
          onClick={() => {
            sound.playSparkle();
            setIsQuizMode(!isQuizMode);
            setQuizFeedback(null);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
            isQuizMode
              ? 'bg-cyan-400 text-slate-950 ring-2 ring-cyan-300'
              : 'bg-cyan-800 text-cyan-200 border border-cyan-600 hover:bg-cyan-700'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit World Quiz' : '🎮 Play Continents Quiz'}</span>
        </button>
      </div>

      {/* Quiz Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-teal-800 via-cyan-900 to-blue-950 text-white p-5 rounded-3xl shadow-xl border-2 border-cyan-400/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-2">
            <span>🌍 Globe Trotter Quest</span>
            <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-2 font-['Baloo_2',sans-serif] text-white">
            {currentQuiz.question}
          </h4>
          <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-black text-cyan-300 mb-4 border border-cyan-300/30">
            💡 Geography Hint: {currentQuiz.hint}
          </div>

          {/* Options Grid */}
          <div className="flex flex-wrap justify-center gap-2.5 my-2">
            {CONTINENTS_DATA.map((c) => (
              <button
                key={c.id}
                onClick={() => handleQuizAnswer(c.id)}
                className="px-4 py-2 bg-cyan-900/80 hover:bg-cyan-800 text-cyan-100 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-cyan-500/50"
              >
                <SmartIcon name={c.iconEmoji} size={22} />
                <span>{c.name} ({c.hindiName.split(' ')[0]})</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-500 text-white py-1.5 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block mt-3">
              🎉 Shabaash! Correct Continent! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-600 text-white py-1.5 px-4 rounded-xl text-sm font-black shadow-md inline-block mt-3">
              🗺️ Try looking at another continent!
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Selected Continent Showcase + Continents List + Oceans Bonus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selected Continent Showcase */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 rounded-3xl p-6 border-4 border-cyan-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-black rounded-full shadow-sm">
                Rank #{selectedContinent.orderBySize} by Size
              </span>
              <span className="px-2.5 py-0.5 bg-cyan-200 text-cyan-900 text-xs font-bold rounded-full">
                🏛️ {selectedContinent.countriesCount}
              </span>
            </div>

            {/* Icon Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 p-1 shadow-md flex items-center justify-center my-2 animate-bounce">
              <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-4xl">
                <SmartIcon name={selectedContinent.iconEmoji} size={56} />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              {selectedContinent.name}
            </h3>
            <p className="text-base font-bold text-cyan-800 mb-3">{selectedContinent.hindiName}</p>

            {/* Facts Box */}
            <div className="bg-white/95 rounded-2xl p-4 border border-cyan-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2.5 mb-4 shadow-sm">
              <div className="p-2 bg-cyan-50 rounded-xl text-cyan-950 font-bold border border-cyan-200">
                🌐 {selectedContinent.sizeRank}
              </div>

              {/* Famous Landmarks */}
              <div>
                <span className="font-bold text-slate-900 block text-[11px] mb-1">🏛️ Famous Landmarks:</span>
                <div className="space-y-1">
                  {selectedContinent.landmarks.map((lm, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-lg text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{lm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wildlife */}
              <div>
                <span className="font-bold text-slate-900 block text-[11px] mb-1">🦁 Native Animals & Birds:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedContinent.wildlife.map((wl, idx) => (
                    <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-900 rounded-lg font-bold text-[11px] border border-amber-200">
                      {wl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-950 font-medium border border-teal-200">
                💡 <span className="font-bold underline text-teal-900">Did You Know?</span> {selectedContinent.funFact}
              </div>
            </div>

            {/* Audio Button */}
            <button
              id="speak-continent-btn"
              onClick={() => {
                sound.playBell();
                sound.speak(selectedContinent.name);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Hear Name (सुनें)</span>
            </button>
          </div>
        </div>

        {/* 7 Continents Cards Grid & 5 Oceans Bonus */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CONTINENTS_DATA.map((continent) => {
              const isSelected = selectedContinent.id === continent.id;
              return (
                <div
                  key={continent.id}
                  id={`continent-${continent.id}`}
                  onClick={() => handleSelectContinent(continent)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-white shadow-lg scale-102 ring-2 ring-cyan-300'
                      : 'bg-white hover:bg-cyan-50/80 text-slate-800 border-cyan-200 hover:border-cyan-400 shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 flex-shrink-0 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    <SmartIcon name={continent.iconEmoji} size={32} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-cyan-100 text-cyan-900'}`}>
                        #{continent.orderBySize}
                      </span>
                      <h4 className={`text-base font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {continent.name}
                      </h4>
                    </div>
                    <p className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-cyan-100' : 'text-cyan-800'}`}>
                      {continent.hindiName}
                    </p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-cyan-200' : 'text-slate-500'}`}>
                      {continent.countriesCount}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bonus: 5 Oceans of Planet Earth */}
          <div className="bg-gradient-to-r from-blue-900 to-cyan-950 text-white p-4 rounded-3xl border-2 border-cyan-400/40 shadow-md">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-black mb-2">
              <Waves className="w-4 h-4" />
              <span>Bonus Knowledge: The 5 Vast Oceans of Earth (5 महासागर)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {OCEANS_DATA.map((oc, i) => (
                <div
                  key={i}
                  onClick={() => {
                    sound.playPop();
                    const oceanName = oc.name.split('(')[0].trim();
                    sound.speak(oceanName);
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition-colors border border-white/10 flex items-start gap-2"
                >
                  <span className="text-base">{oc.emoji}</span>
                  <div>
                    <div className="font-extrabold text-cyan-200">{oc.name}</div>
                    <div className="text-[10px] text-slate-300 leading-tight">{oc.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
