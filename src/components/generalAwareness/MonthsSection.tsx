import React, { useState } from 'react';
import { MonthItem } from '../../types';
import { MONTHS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { Volume2, Sparkles, Calendar, HelpCircle, CheckCircle2, ChevronRight, Sun, Snowflake } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MonthsSectionProps {
  onAwardStar: () => void;
}

export const MonthsSection: React.FC<MonthsSectionProps> = ({ onAwardStar }) => {
  const [selectedMonth, setSelectedMonth] = useState<MonthItem>(MONTHS_DATA[0]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'Which is the very FIRST month of the year (साल का पहला महीना)?',
      correctId: 'january',
      options: ['january', 'march', 'december'],
    },
    {
      question: 'Which is the SHORTEST month with only 28 or 29 days (सबसे छोटा महीना)?',
      correctId: 'february',
      options: ['february', 'may', 'july'],
    },
    {
      question: 'In which month do we celebrate Indian Independence Day on 15th August?',
      correctId: 'august',
      options: ['june', 'august', 'october'],
    },
    {
      question: 'In which joyful month do we play with colorful Gulal for Holi?',
      correctId: 'march',
      options: ['march', 'november', 'september'],
    },
    {
      question: 'Which is the 12th and LAST month of the year with cozy winter holidays?',
      correctId: 'december',
      options: ['december', 'october', 'april'],
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectMonth = (month: MonthItem) => {
    setSelectedMonth(month);
    sound.playBell();
    sound.speak(month.name);
  };

  const handleQuizAnswer = (monthId: string) => {
    if (monthId === currentQuiz.correctId) {
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
          sound.speak('Excellent! You have mastered all 12 months of the year!');
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
      <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-50/80 p-3 rounded-2xl border-2 border-sky-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗓️</span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-sky-950 font-['Baloo_2',sans-serif]">
              12 Months of the Year (वर्ष के बारह महीने)
            </h3>
            <p className="text-xs text-sky-800">Learn all 12 months in English & Hindi, days in each month, seasonal changes & festivals!</p>
          </div>
        </div>

        <button
          id="month-quiz-toggle-btn"
          onClick={() => {
            sound.playSparkle();
            setIsQuizMode(!isQuizMode);
            setQuizFeedback(null);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
            isQuizMode
              ? 'bg-sky-600 text-white ring-2 ring-sky-400'
              : 'bg-white text-sky-900 border border-sky-300 hover:bg-sky-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit Quiz' : '🎮 Play Months Quiz'}</span>
        </button>
      </div>

      {/* Quiz Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white p-5 rounded-3xl shadow-lg border-2 border-white/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-sky-100 mb-2">
            <span>🌟 Months Calendar Challenge</span>
            <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-3 font-['Baloo_2',sans-serif]">
            {currentQuiz.question}
          </h4>

          {/* Option buttons */}
          <div className="flex flex-wrap justify-center gap-3 my-3">
            {currentQuiz.options.map((optId) => {
              const mObj = MONTHS_DATA.find((m) => m.id === optId);
              if (!mObj) return null;
              return (
                <button
                  key={optId}
                  onClick={() => handleQuizAnswer(optId)}
                  className="px-5 py-2.5 bg-white text-sky-950 hover:bg-sky-50 font-black text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 border-2 border-sky-200"
                >
                  <SmartIcon name={mObj.iconEmoji} size={24} />
                  <span>{mObj.name} ({mObj.hindiName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-500 text-white py-1.5 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block mt-2">
              🎉 Superb! That is Correct! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-700 text-white py-1.5 px-4 rounded-xl text-sm font-black shadow-md inline-block mt-2">
              🤗 Not quite! Try again!
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Selected Month Showcase + 12 Months Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selected Big Month Feature */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-blue-50 rounded-3xl p-6 border-4 border-sky-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
            {/* Header Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-sky-600 text-white text-xs font-black rounded-full shadow-sm">
                Month {selectedMonth.monthNumber} of 12
              </span>
              <span className="px-2.5 py-0.5 bg-sky-200 text-sky-900 text-xs font-black rounded-full">
                📅 {selectedMonth.days} Days
              </span>
            </div>

            {/* Icon Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 p-1 shadow-md flex items-center justify-center my-2 animate-pulse">
              <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-4xl">
                <SmartIcon name={selectedMonth.iconEmoji} size={54} />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              {selectedMonth.name}
            </h3>
            <p className="text-base font-bold text-sky-800 mb-3">{selectedMonth.hindiName}</p>

            {/* Month Details Box */}
            <div className="bg-white/95 rounded-2xl p-4 border border-sky-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2 mb-4 shadow-sm">
              <div className="p-2 bg-sky-50 rounded-xl font-bold text-sky-900 border border-sky-200 flex items-center gap-1.5">
                <span>🌤️</span>
                <span>Season: {selectedMonth.season}</span>
              </div>

              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-950 font-semibold border border-amber-200">
                🎉 <span className="font-bold">Festivals & Events: </span>
                <span>{selectedMonth.highlights}</span>
              </div>

              <div className="p-2.5 bg-teal-50 rounded-xl text-teal-950 font-medium border border-teal-200">
                💡 <span className="font-bold underline">Did You Know?</span> {selectedMonth.funFact}
              </div>
            </div>

            {/* Audio Button */}
            <button
              id="speak-month-btn"
              onClick={() => {
                sound.playBell();
                sound.speak(selectedMonth.name);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Hear Name (सुनें)</span>
            </button>
          </div>
        </div>

        {/* 12 Months Grid */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          <div className="text-xs font-black text-sky-950 flex items-center justify-between px-1">
            <span>All 12 Months (जनवरी से दिसंबर):</span>
            <span className="text-[10px] bg-sky-100 text-sky-900 px-2 py-0.5 rounded-md font-bold">Tap to explore</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto p-1 scrollbar-thin">
            {MONTHS_DATA.map((month) => {
              const isSelected = selectedMonth.id === month.id;
              return (
                <div
                  key={month.id}
                  id={`month-${month.id}`}
                  onClick={() => handleSelectMonth(month)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
                    isSelected
                      ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white border-white shadow-lg scale-105 ring-2 ring-sky-400'
                      : 'bg-white hover:bg-sky-50/70 text-slate-800 border-sky-200 hover:border-sky-400 shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                    <SmartIcon name={month.iconEmoji} size={36} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-900'}`}>
                      #{month.monthNumber}
                    </span>
                    <h4 className={`text-sm font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {month.name}
                    </h4>
                  </div>
                  <span className={`text-[11px] font-bold mt-0.5 truncate ${isSelected ? 'text-sky-100' : 'text-sky-800'}`}>
                    {month.hindiName}
                  </span>
                  <span className={`text-[10px] mt-1 font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>
                    {month.days} Days
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
