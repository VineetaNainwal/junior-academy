import React, { useState } from 'react';
import { SeasonItem } from '../../types';
import { SEASONS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { Volume2, Sparkles, Sun, CloudRain, Wind, Snowflake, HelpCircle, CheckCircle2, Shirt, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeasonsSectionProps {
  onAwardStar: () => void;
}

export const SeasonsSection: React.FC<SeasonsSectionProps> = ({ onAwardStar }) => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonItem>(SEASONS_DATA[0]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'In which season do we eat sweet Alphonso mangoes and drink cool lemonade?',
      correctId: 'summer',
      hint: '☀️ Bright and sunny!',
    },
    {
      question: 'In which season do peacocks dance and we float paper boats in raindrops?',
      correctId: 'monsoon',
      hint: '🌧️ Pitter-patter rain!',
    },
    {
      question: 'Which season is known as the "King of Seasons" (Rituraj) with blooming flowers and Holi?',
      correctId: 'spring',
      hint: '🌸 Vasant Panchami!',
    },
    {
      question: 'In which season do we wear cozy woolen caps, mufflers, and eat warm carrot halwa?',
      correctId: 'winter',
      hint: '❄️ Cold and frosty!',
    },
    {
      question: 'In which season are the skies clear blue with silver moonlight during Navratri?',
      correctId: 'autumn',
      hint: '🍂 Sharad Ritu!',
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectSeason = (season: SeasonItem) => {
    setSelectedSeason(season);
    sound.playBell();
    const englishName = season.name.split('(')[0].trim();
    sound.speak(englishName);
  };

  const handleQuizAnswer = (seasonId: string) => {
    if (seasonId === currentQuiz.correctId) {
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
          sound.speak('Bravo! You understand all seasons of nature wonderfully!');
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50/80 p-3 rounded-2xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-emerald-950 font-['Baloo_2',sans-serif]">
              Seasons of the Year (ऋतुएँ - 6 Ritus)
            </h3>
            <p className="text-xs text-emerald-800">Explore weather patterns, seasonal foods, cozy clothes & colorful nature changes!</p>
          </div>
        </div>

        <button
          id="season-quiz-toggle-btn"
          onClick={() => {
            sound.playSparkle();
            setIsQuizMode(!isQuizMode);
            setQuizFeedback(null);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
            isQuizMode
              ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
              : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit Quiz' : '🎮 Play Season Quiz'}</span>
        </button>
      </div>

      {/* Quiz Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-5 rounded-3xl shadow-lg border-2 border-white/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-100 mb-2">
            <span>🌟 Nature & Seasons Challenge</span>
            <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-2 font-['Baloo_2',sans-serif]">
            {currentQuiz.question}
          </h4>
          <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-black text-amber-100 mb-4">
            💡 Hint: {currentQuiz.hint}
          </div>

          {/* Options */}
          <div className="flex flex-wrap justify-center gap-3 my-2">
            {SEASONS_DATA.map((s) => (
              <button
                key={s.id}
                onClick={() => handleQuizAnswer(s.id)}
                className="px-4 py-2 bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 border-2 border-emerald-200"
              >
                <SmartIcon name={s.iconEmoji} size={22} />
                <span>{s.name.split('(')[0]}</span>
              </button>
            ))}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-600 text-white py-1.5 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block mt-3">
              🎉 Shabaash! Correct Season! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-700 text-white py-1.5 px-4 rounded-xl text-sm font-black shadow-md inline-block mt-3">
              🤗 Try another season!
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Selected Big Season Feature + 6 Seasons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selected Big Season Card */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-6 border-4 border-emerald-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
            {/* Months Badge */}
            <div className="px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-full shadow-sm mb-2">
              📅 {selectedSeason.months}
            </div>

            {/* Icon Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 p-1 shadow-md flex items-center justify-center my-2 animate-bounce">
              <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-4xl">
                <SmartIcon name={selectedSeason.iconEmoji} size={56} />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              {selectedSeason.name}
            </h3>
            <p className="text-sm font-bold text-emerald-800 mb-3">{selectedSeason.hindiName}</p>

            {/* Comprehensive details box */}
            <div className="bg-white/95 rounded-2xl p-4 border border-emerald-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2.5 mb-4 shadow-sm">
              <div className="p-2 bg-emerald-50/80 rounded-xl text-emerald-950 font-semibold border border-emerald-200">
                🌤️ <span className="font-bold">Weather: </span>{selectedSeason.weather}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2 bg-sky-50 rounded-xl text-sky-950 font-medium border border-sky-200 flex items-start gap-1.5">
                  <Shirt className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[11px]">Clothes:</span>
                    <span>{selectedSeason.clothes}</span>
                  </div>
                </div>

                <div className="p-2 bg-amber-50 rounded-xl text-amber-950 font-medium border border-amber-200 flex items-start gap-1.5">
                  <Utensils className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[11px]">Yummy Foods:</span>
                    <span>{selectedSeason.foods}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-bold text-slate-900 block text-[11px]">🌿 Nature Signs:</span>
                {selectedSeason.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-700 bg-slate-50 p-1.5 rounded-lg">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-teal-50 rounded-xl text-teal-950 font-semibold border border-teal-200">
                💡 <span className="font-bold underline">Fun Fact:</span> {selectedSeason.funFact}
              </div>
            </div>

            {/* Audio Button */}
            <button
              id="speak-season-btn"
              onClick={() => {
                sound.playBell();
                const englishName = selectedSeason.name.split('(')[0].trim();
                sound.speak(englishName);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Hear Name (सुनें)</span>
            </button>
          </div>
        </div>

        {/* 6 Seasons Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEASONS_DATA.map((season) => {
            const isSelected = selectedSeason.id === season.id;
            return (
              <div
                key={season.id}
                id={`season-${season.id}`}
                onClick={() => handleSelectSeason(season)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-white shadow-lg scale-102 ring-2 ring-emerald-300'
                    : 'bg-white hover:bg-emerald-50/80 text-slate-800 border-emerald-200 hover:border-emerald-400 shadow-sm'
                }`}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  <SmartIcon name={season.iconEmoji} size={42} />
                </div>
                <h4 className={`text-base font-extrabold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {season.name}
                </h4>
                <span className={`text-xs font-bold mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-emerald-800'}`}>
                  {season.months}
                </span>
                <p className={`text-[11px] mt-2 line-clamp-2 ${isSelected ? 'text-emerald-50' : 'text-slate-600'}`}>
                  {season.weather}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
