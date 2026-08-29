import React, { useState } from 'react';
import { WeekDayItem } from '../../types';
import { WEEK_DAYS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { Volume2, Sparkles, Calendar, HelpCircle, CheckCircle2, ChevronRight, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeekDaysSectionProps {
  onAwardStar: () => void;
}

export const WeekDaysSection: React.FC<WeekDaysSectionProps> = ({ onAwardStar }) => {
  const [selectedDay, setSelectedDay] = useState<WeekDayItem>(WEEK_DAYS_DATA[0]);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'Which day comes right AFTER Monday (सोमवार के बाद कौन सा दिन आता है)?',
      correctId: 'tuesday',
      options: ['tuesday', 'sunday', 'friday'],
    },
    {
      question: 'Which day is the happy family weekend named after the SUN (सूर्य / रवि)?',
      correctId: 'sunday',
      options: ['wednesday', 'sunday', 'monday'],
    },
    {
      question: 'Which day comes right BEFORE Thursday (गुरुवार से पहले कौन सा दिन आता है)?',
      correctId: 'wednesday',
      options: ['wednesday', 'saturday', 'tuesday'],
    },
    {
      question: 'Which day is associated with the beautiful planet with shiny rings (शनि ग्रह)?',
      correctId: 'saturday',
      options: ['monday', 'saturday', 'thursday'],
    },
    {
      question: 'Which day is Friday in Hindi (शुक्रवार)?',
      correctId: 'friday',
      options: ['friday', 'tuesday', 'sunday'],
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectDay = (day: WeekDayItem) => {
    setSelectedDay(day);
    sound.playBell();
    sound.speak(day.name);
  };

  const handleQuizAnswer = (dayId: string) => {
    if (dayId === currentQuiz.correctId) {
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
          sound.speak('Brilliant! You know all 7 days of the week perfectly!');
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
      {/* Top Banner & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50/80 p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              7 Days of the Week (सप्ताह के सात दिन)
            </h3>
            <p className="text-xs text-amber-800">Learn all 7 days in English and Hindi, their planetary origins & fun daily routines!</p>
          </div>
        </div>

        <button
          id="weekday-quiz-toggle-btn"
          onClick={() => {
            sound.playSparkle();
            setIsQuizMode(!isQuizMode);
            setQuizFeedback(null);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
            isQuizMode
              ? 'bg-amber-600 text-white ring-2 ring-amber-400'
              : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isQuizMode ? 'Exit Quiz' : '🎮 Play Days Quiz'}</span>
        </button>
      </div>

      {/* Quiz Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white p-5 rounded-3xl shadow-lg border-2 border-white/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-amber-100 mb-2">
            <span>🌟 Days of the Week Quiz</span>
            <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-3 font-['Baloo_2',sans-serif]">
            {currentQuiz.question}
          </h4>

          {/* Option buttons */}
          <div className="flex flex-wrap justify-center gap-3 my-3">
            {currentQuiz.options.map((optId) => {
              const dayObj = WEEK_DAYS_DATA.find((d) => d.id === optId);
              if (!dayObj) return null;
              return (
                <button
                  key={optId}
                  onClick={() => handleQuizAnswer(optId)}
                  className="px-5 py-2.5 bg-white text-amber-950 hover:bg-amber-50 font-black text-sm rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 border-2 border-amber-200"
                >
                  <SmartIcon name={dayObj.iconEmoji} size={24} />
                  <span>{dayObj.name} ({dayObj.hindiName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-500 text-white py-1.5 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block mt-2">
              🎉 Shabaash! That is Right! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-700 text-white py-1.5 px-4 rounded-xl text-sm font-black shadow-md inline-block mt-2">
              🤗 Oops! Try again!
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Selected Day Detail + All 7 Days Sequence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Selected Day Showcase Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
            {/* Day Order Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-black rounded-full shadow-sm">
                Day {selectedDay.order} of 7
              </span>
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${selectedDay.type === 'weekend' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'}`}>
                {selectedDay.type === 'weekend' ? '🎉 Weekend Fun' : '📚 School Weekday'}
              </span>
            </div>

            {/* Icon Avatar */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-1 shadow-md flex items-center justify-center my-2 animate-bounce">
              <div className="w-full h-full bg-white rounded-[20px] flex items-center justify-center text-4xl">
                <SmartIcon name={selectedDay.iconEmoji} size={54} />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
              {selectedDay.name}
            </h3>
            <p className="text-base font-bold text-amber-800 mb-3">{selectedDay.hindiName}</p>

            {/* Day Details */}
            <div className="bg-white/95 rounded-2xl p-4 border border-amber-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2 mb-4 shadow-sm">
              <div className="p-2 bg-amber-50 rounded-xl font-bold text-amber-900 border border-amber-200 flex items-center gap-1.5">
                <span>🪐</span>
                <span>Ruling Energy: {selectedDay.rulingPlanet}</span>
              </div>

              <div className="p-2.5 bg-orange-50/70 rounded-xl text-slate-800 font-medium border border-orange-200">
                🎨 <span className="font-bold text-orange-950">Suggested Kid Routine: </span>
                <span>{selectedDay.funActivity}</span>
              </div>
            </div>

            {/* Audio Button */}
            <button
              id="speak-weekday-btn"
              onClick={() => {
                sound.playBell();
                sound.speak(selectedDay.name);
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Hear Name (सुनें)</span>
            </button>
          </div>
        </div>

        {/* All 7 Days Sequence Cards */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-black text-amber-900 flex items-center justify-between px-1">
            <span>The 7 Days Sequence (सोमवार से रविवार):</span>
            <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-md font-bold">Tap any day</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {WEEK_DAYS_DATA.map((day) => {
              const isSelected = selectedDay.id === day.id;
              return (
                <div
                  key={day.id}
                  id={`weekday-${day.id}`}
                  onClick={() => handleSelectDay(day)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-white shadow-lg scale-102 ring-2 ring-amber-300'
                      : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex-shrink-0 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    <SmartIcon name={day.iconEmoji} size={28} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-200/70 text-amber-950'}`}>
                        Day {day.order}
                      </span>
                      <h4 className={`text-base font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {day.name}
                      </h4>
                    </div>
                    <p className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-amber-100' : 'text-amber-800'}`}>
                      {day.hindiName}
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
