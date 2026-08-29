import React, { useState } from 'react';
import { PlanetItem } from '../../types';
import { PLANETS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { Volume2, Sparkles, HelpCircle, CheckCircle2, Orbit, Rocket, Compass, Telescope } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlanetsSectionProps {
  onAwardStar: () => void;
}

export const PlanetsSection: React.FC<PlanetsSectionProps> = ({ onAwardStar }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetItem>(
    PLANETS_DATA.find((p) => p.id === 'earth') || PLANETS_DATA[0]
  );
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'Which planet is called the "Red Planet" because of rusty iron rocks (लाल ग्रह)?',
      correctId: 'mars',
      hint: '🔴 Mangal Grah!',
    },
    {
      question: 'Which is the LARGEST planet in our solar system with a giant spinning red storm?',
      correctId: 'jupiter',
      hint: '🟠 Brihaspati — King of Planets!',
    },
    {
      question: 'Which breathtaking planet is famous for its shimmering, spectacular RINGS (वलय)?',
      correctId: 'saturn',
      hint: '🪐 Shani Grah with ice rings!',
    },
    {
      question: 'Which is OUR beautiful home planet with blue liquid oceans and breathing life?',
      correctId: 'earth',
      hint: '🌍 Dharti Mata / Prithvi!',
    },
    {
      question: 'Which is the HOTTEST planet in the solar system, also called the Morning Star?',
      correctId: 'venus',
      hint: '🟡 Shukra Grah!',
    },
    {
      question: 'What is at the glowing center of our solar system providing all light and warmth?',
      correctId: 'sun',
      hint: '☀️ Surya Dev — Our Star!',
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectPlanet = (planet: PlanetItem) => {
    setSelectedPlanet(planet);
    sound.playBell();
    const englishName = planet.name.split('(')[0].trim();
    sound.speak(englishName);
  };

  const handleQuizAnswer = (planetId: string) => {
    if (planetId === currentQuiz.correctId) {
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
          sound.speak('Space Champion! You know all planets of our Solar System brilliantly!');
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-950 text-white p-3.5 rounded-2xl border-2 border-indigo-400/40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-800/80 border border-indigo-400 flex items-center justify-center text-2xl">
            🪐
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-amber-300 font-['Baloo_2',sans-serif]">
              Planets in our Solar System (सौरमंडल के ग्रह)
            </h3>
            <p className="text-xs text-indigo-200">Explore the Sun, Earth, giant Jupiter, ringed Saturn & our solar family!</p>
          </div>
        </div>

        <button
          id="planet-quiz-toggle-btn"
          onClick={() => {
            sound.playSparkle();
            setIsQuizMode(!isQuizMode);
            setQuizFeedback(null);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
            isQuizMode
              ? 'bg-amber-500 text-indigo-950 ring-2 ring-amber-300'
              : 'bg-indigo-800 text-amber-200 border border-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Telescope className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit Space Quiz' : '🚀 Play Space Quiz'}</span>
        </button>
      </div>

      {/* Quiz Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-5 rounded-3xl shadow-xl border-2 border-indigo-400/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-2">
            <span>🚀 Junior Astronaut Mission</span>
            <span>Mission {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-2 font-['Baloo_2',sans-serif] text-white">
            {currentQuiz.question}
          </h4>
          <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-black text-amber-300 mb-4 border border-amber-300/30">
            💡 Cosmic Hint: {currentQuiz.hint}
          </div>

          {/* Options Grid */}
          <div className="flex flex-wrap justify-center gap-2.5 my-2">
            {PLANETS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => handleQuizAnswer(p.id)}
                className="px-4 py-2 bg-indigo-900/80 hover:bg-indigo-800 text-amber-200 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 border border-indigo-500/50"
              >
                <SmartIcon name={p.iconEmoji} size={22} />
                <span>{p.name.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-500 text-white py-1.5 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block mt-3">
              🎉 Mission Success! Correct Planet! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-600 text-white py-1.5 px-4 rounded-xl text-sm font-black shadow-md inline-block mt-3">
              🛰️ Not quite, check your space coordinates and try again!
            </div>
          )}
        </div>
      )}

      {/* Orbit Strip: Quick Planet Selector in Order from the Sun */}
      <div className="bg-slate-900/90 text-white p-3 rounded-2xl border border-indigo-500/30 overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-black text-amber-400 px-1">Order from Sun:</span>
          {PLANETS_DATA.map((p) => {
            const isSel = selectedPlanet.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPlanet(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isSel
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg scale-105 ring-2 ring-amber-300'
                    : 'bg-indigo-950/70 text-indigo-200 hover:bg-indigo-900 border border-indigo-800'
                }`}
              >
                <SmartIcon name={p.iconEmoji} size={18} />
                <span>{p.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase: Selected Planet Card + Planet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Big Cosmic Planet Showcase */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 border-4 border-indigo-400/60 shadow-2xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
            {/* Background cosmic stars effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-800/20 via-transparent to-transparent pointer-events-none" />

            {/* Orbit Order Badge */}
            <div className="flex items-center gap-2 mb-3 z-10">
              <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full shadow">
                {selectedPlanet.distanceOrder}
              </span>
              <span className="px-2.5 py-0.5 bg-indigo-800/80 text-indigo-200 text-xs font-bold rounded-full border border-indigo-600">
                {selectedPlanet.planetType}
              </span>
            </div>

            {/* Large Visual Planet Avatar */}
            <div className="relative my-3 z-10">
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-2 shadow-[0_0_50px_rgba(251,191,36,0.35)] flex items-center justify-center animate-pulse"
                style={{ background: selectedPlanet.gradient }}
              >
                <SmartIcon name={selectedPlanet.iconEmoji} size={76} />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-amber-300 font-['Baloo_2',sans-serif] z-10">
              {selectedPlanet.name}
            </h3>
            <p className="text-sm font-bold text-indigo-300 mb-4 z-10">{selectedPlanet.hindiName}</p>

            {/* Scientific Planet Facts Box */}
            <div className="bg-indigo-900/60 backdrop-blur-md rounded-2xl p-4 border border-indigo-400/30 text-xs leading-relaxed w-full text-left space-y-2.5 mb-4 z-10 shadow-inner">
              <div className="grid grid-cols-2 gap-2 text-indigo-200">
                <div className="p-2 bg-indigo-950/70 rounded-xl border border-indigo-700/50">
                  <span className="text-[10px] text-amber-300 font-bold block">Diameter:</span>
                  <span className="font-extrabold text-white text-xs">{selectedPlanet.diameter}</span>
                </div>
                <div className="p-2 bg-indigo-950/70 rounded-xl border border-indigo-700/50">
                  <span className="text-[10px] text-amber-300 font-bold block">Moons:</span>
                  <span className="font-extrabold text-white text-xs">{selectedPlanet.moonsCount} Moons</span>
                </div>
              </div>

              <div className="p-2 bg-indigo-950/70 rounded-xl border border-indigo-700/50 text-indigo-200">
                <span className="text-[10px] text-amber-300 font-bold block">Temperature:</span>
                <span className="font-bold text-white text-xs">{selectedPlanet.temperature}</span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-bold text-amber-300 block text-[11px]">✨ Cosmic Features:</span>
                {selectedPlanet.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-indigo-100 bg-indigo-950/40 p-1.5 rounded-lg">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-amber-400/10 rounded-xl text-amber-200 font-medium border border-amber-400/30">
                💡 <span className="font-bold underline text-amber-300">Space Wonder Fact:</span> {selectedPlanet.funFact}
              </div>
            </div>

            {/* Audio Button */}
            <button
              id="speak-planet-btn"
              onClick={() => {
                sound.playBell();
                const englishName = selectedPlanet.name.split('(')[0].trim();
                sound.speak(englishName);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 z-10"
            >
              <Volume2 className="w-5 h-5 text-slate-950" />
              <span>Hear Name (सुनें)</span>
            </button>
          </div>
        </div>

        {/* Planet Grid List */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto p-1 scrollbar-thin">
          {PLANETS_DATA.map((planet) => {
            const isSelected = selectedPlanet.id === planet.id;
            return (
              <div
                key={planet.id}
                id={`planet-${planet.id}`}
                onClick={() => handleSelectPlanet(planet)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-amber-400 shadow-xl scale-102 ring-2 ring-amber-300'
                    : 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-100 hover:border-indigo-300 shadow-sm'
                }`}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  <SmartIcon name={planet.iconEmoji} size={48} />
                </div>
                <h4 className={`text-base font-extrabold leading-tight ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                  {planet.name.split('(')[0]}
                </h4>
                <span className={`text-xs font-bold mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-indigo-700'}`}>
                  {planet.hindiName.split('(')[0]}
                </span>
                <span className={`text-[10px] mt-1.5 px-2 py-0.5 rounded-full font-semibold ${isSelected ? 'bg-indigo-950 text-amber-200' : 'bg-slate-100 text-slate-600'}`}>
                  {planet.distanceOrder.split('(')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
