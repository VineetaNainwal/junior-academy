import React, { useState } from 'react';
import { BodyPartItem } from '../../types';
import { BODY_PARTS_DATA } from '../../data/generalAwarenessData';
import { sound } from '../../utils/sound';
import { SmartIcon } from '../SmartIcon';
import { BodyDiagramChart } from './BodyDiagramChart';
import { Volume2, Sparkles, CheckCircle2, HelpCircle, Activity, LayoutGrid, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BodyPartsSectionProps {
  onAwardStar: () => void;
}

export const BodyPartsSection: React.FC<BodyPartsSectionProps> = ({ onAwardStar }) => {
  const [selectedPart, setSelectedPart] = useState<BodyPartItem>(BODY_PARTS_DATA[0]);
  const [filterCategory, setFilterCategory] = useState<'all' | 'senses' | 'head' | 'upper' | 'lower'>('all');
  const [viewMode, setViewMode] = useState<'chart' | 'cards'>('chart');
  
  // Interactive Quiz State
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  const quizQuestions = [
    {
      question: 'Which body part helps you SEE colors and read books?',
      hindiQuestion: 'हम किस अंग से रंग और किताबें देखते हैं?',
      correctId: 'eyes',
      hint: '👀 Look with these!',
    },
    {
      question: 'Which body part is right in the middle of your face to SMELL flowers?',
      hindiQuestion: 'चेहरे के बीच में कौन सा अंग खुशबू सूंघता है?',
      correctId: 'nose',
      hint: '👃 In the middle of your face!',
    },
    {
      question: 'Which body part helps you TALK, sing, and chew food?',
      hindiQuestion: 'हम किस अंग से बोलते और खाना चबाते हैं?',
      correctId: 'mouth',
      hint: '👄 With teeth and tongue!',
    },
    {
      question: 'Which body part holds our brilliant BRAIN to think and learn?',
      hindiQuestion: 'हमारा बुद्धिमान दिमाग किस अंग में सुरक्षित रहता है?',
      correctId: 'head',
      hint: '🧠 Right at the top!',
    },
    {
      question: 'Which body parts help you CLAP happily and hold pencils?',
      hindiQuestion: 'हम किन अंगों से ताली बजाते हैं और पेंसिल पकड़ते हैं?',
      correctId: 'hand',
      hint: '✋ With 5 fingers on each!',
    },
    {
      question: 'Which body parts help you RUN, jump, and climb stairs?',
      hindiQuestion: 'हम किन अंगों से चलते और दौड़ते हैं?',
      correctId: 'leg',
      hint: '🦵 Strong and long!',
    },
    {
      question: 'Which body part bends in the middle of your leg?',
      hindiQuestion: 'टाँग के बीच में कौन सा जोड़ मुड़ता है?',
      correctId: 'knee',
      hint: '🦵 In the middle of the leg!',
    },
  ];

  const currentQuiz = quizQuestions[quizIndex];

  const handleSelectPart = (part: BodyPartItem) => {
    setSelectedPart(part);
    sound.playBell();
    sound.speak(part.name);
  };

  const handleSelectPartId = (partId: string) => {
    const found = BODY_PARTS_DATA.find((p) => p.id === partId);
    if (found) {
      if (isQuizMode) {
        handleQuizAnswer(found.id);
      } else {
        handleSelectPart(found);
      }
    }
  };

  const handleQuizAnswer = (partId: string) => {
    if (partId === currentQuiz.correctId) {
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
          sound.speak('Wonderful job! You know all your body parts brilliantly!');
        }
      }, 1500);
    } else {
      setQuizFeedback('wrong');
      sound.playPop();
      setTimeout(() => setQuizFeedback(null), 1200);
    }
  };

  const filteredParts = filterCategory === 'all'
    ? BODY_PARTS_DATA
    : BODY_PARTS_DATA.filter((p) => p.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Top Controls: Mode Switch & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50/80 p-3 rounded-2xl border-2 border-rose-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-rose-950 font-['Baloo_2',sans-serif]">
              Body Parts & Senses (शरीर के प्रमुख अंग)
            </h3>
            <p className="text-xs text-rose-800">Learn how our amazing body parts work, help us sense the world, and stay healthy!</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle when in All Parts */}
          {filterCategory === 'all' && !isQuizMode && (
            <div className="flex bg-white rounded-xl p-0.5 border border-rose-300 shadow-sm">
              <button
                id="btn-view-chart"
                onClick={() => {
                  sound.playPop();
                  setViewMode('chart');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all ${
                  viewMode === 'chart'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-900 hover:bg-rose-50'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Body Chart (चित्र चार्ट)</span>
              </button>
              <button
                id="btn-view-cards"
                onClick={() => {
                  sound.playPop();
                  setViewMode('cards');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-900 hover:bg-rose-50'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards Grid</span>
              </button>
            </div>
          )}

          <button
            id="body-quiz-toggle-btn"
            onClick={() => {
              sound.playSparkle();
              setIsQuizMode(!isQuizMode);
              setQuizFeedback(null);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm ${
              isQuizMode
                ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                : 'bg-white text-rose-900 border border-rose-300 hover:bg-rose-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isQuizMode ? 'Exit Quiz' : '🎮 Play Body Quiz'}</span>
          </button>
        </div>
      </div>

      {/* Quiz Mode Banner */}
      {isQuizMode && (
        <div className="bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white p-5 rounded-3xl shadow-lg border-2 border-white/50 text-center animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-bold text-amber-100 mb-2">
            <span>🌟 Body Explorer Challenge</span>
            <span>Question {quizIndex + 1} of {quizQuestions.length}</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold mb-1 font-['Baloo_2',sans-serif]">
            {currentQuiz.question}
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-rose-100 mb-3">
            {currentQuiz.hindiQuestion}
          </p>

          <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-black text-amber-100 mb-4">
            💡 Hint: {currentQuiz.hint}
          </div>

          {quizFeedback === 'correct' && (
            <div className="bg-emerald-500 text-white py-2 px-4 rounded-xl text-sm font-black animate-bounce shadow-md inline-block">
              🎉 Shabaash! That is 100% Correct! +1 Star ⭐
            </div>
          )}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-700 text-white py-2 px-4 rounded-xl text-sm font-black shadow-md inline-block">
              🤗 Almost! Try touching another body part!
            </div>
          )}
        </div>
      )}

      {/* Category Filter Tabs */}
      {!isQuizMode && (
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Parts & Chart (सभी अंग)' },
            { id: 'senses', label: '5 Senses 👀' },
            { id: 'head', label: 'Head & Brain 🧠' },
            { id: 'upper', label: 'Hands & Torso ✋' },
            { id: 'lower', label: 'Legs & Feet 🦵' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                const newCategory = tab.id as 'all' | 'senses' | 'head' | 'upper' | 'lower';
                setFilterCategory(newCategory);
                const items = newCategory === 'all'
                  ? BODY_PARTS_DATA
                  : BODY_PARTS_DATA.filter((p) => p.category === newCategory);
                if (items.length > 0) {
                  setSelectedPart(items[0]);
                  sound.speak(items[0].name);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterCategory === tab.id
                  ? 'bg-rose-600 text-white shadow-md scale-102 ring-2 ring-rose-300'
                  : 'bg-white text-rose-900 border border-rose-200 hover:bg-rose-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* When "All Parts" is active and in "chart" view mode: Render Full Body Diagram Chart */}
      {filterCategory === 'all' && viewMode === 'chart' && (
        <div className="space-y-6">
          <BodyDiagramChart
            selectedPartId={selectedPart.id}
            onSelectPart={handleSelectPartId}
          />

          {/* Selected Part Detail Card Below Chart */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-rose-200 shadow-lg flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 p-1 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-4xl">
                  <SmartIcon name={selectedPart.iconEmoji} size={48} />
                </div>
              </div>
              <span className="mt-2 px-2.5 py-0.5 bg-rose-100 text-rose-900 text-xs font-extrabold rounded-full">
                {selectedPart.count}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-2xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
                  {selectedPart.name}
                </h3>
                <span className="text-sm font-bold text-rose-700">({selectedPart.hindiName})</span>
              </div>

              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                <span className="font-extrabold text-slate-900">What it does: </span>
                {selectedPart.functionText}
              </p>

              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-950 font-semibold border border-amber-200 text-xs inline-block">
                💡 <span className="underline font-bold">Fun Body Fact:</span> {selectedPart.funFact}
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                id="speak-selected-part-btn"
                onClick={() => {
                  sound.playBell();
                  sound.speak(selectedPart.name);
                }}
                className="px-5 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen Name</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* When filtering by category (or toggled to Cards Grid view) */}
      {(filterCategory !== 'all' || viewMode === 'cards') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Big Selected Body Part Feature */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl p-6 border-4 border-rose-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
              {/* Animated Icon Avatar */}
              <div className="relative mb-3">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-500 p-1 shadow-lg flex items-center justify-center animate-pulse">
                  <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-5xl">
                    <SmartIcon name={selectedPart.iconEmoji} size={64} />
                  </div>
                </div>
                <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded-full shadow">
                  {selectedPart.count}
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif] mt-2">
                {selectedPart.name}
              </h3>
              <p className="text-sm font-bold text-rose-700 mb-3">{selectedPart.hindiName}</p>

              {/* Function Description Box (NO Hindi function sentence) */}
              <div className="bg-white/95 rounded-2xl p-4 border border-rose-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2 mb-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <Activity className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900">What it does: </span>
                    <span className="text-slate-700 font-medium">{selectedPart.functionText}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-950 font-semibold border border-amber-200">
                  💡 <span className="underline font-bold">Fun Body Fact:</span> {selectedPart.funFact}
                </div>
              </div>

              {/* Audio Speak Button: English name only */}
              <button
                id="speak-body-part-card-btn"
                onClick={() => {
                  sound.playBell();
                  sound.speak(selectedPart.name);
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Listen Name (सुनें)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Parts Cards Grid */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 overflow-y-auto max-h-[500px] p-1 scrollbar-thin">
              {filteredParts.map((part) => {
                const isSelected = selectedPart.id === part.id;
                return (
                  <div
                    key={part.id}
                    id={`body-part-${part.id}`}
                    onClick={() => {
                      if (isQuizMode) {
                        handleQuizAnswer(part.id);
                      } else {
                        handleSelectPart(part);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group relative ${
                      isSelected && !isQuizMode
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white border-white shadow-lg scale-105 ring-2 ring-rose-400'
                        : 'bg-white hover:bg-rose-50/80 text-slate-800 border-rose-200 hover:border-rose-400 shadow-sm'
                    }`}
                  >
                    <div className="text-4xl mb-1.5 group-hover:scale-110 transition-transform">
                      <SmartIcon name={part.iconEmoji} size={40} />
                    </div>
                    <h4 className={`text-sm font-extrabold leading-tight ${isSelected && !isQuizMode ? 'text-white' : 'text-slate-900'}`}>
                      {part.name}
                    </h4>
                    <span className={`text-[11px] font-bold mt-0.5 line-clamp-1 ${isSelected && !isQuizMode ? 'text-rose-100' : 'text-rose-700'}`}>
                      {part.hindiName}
                    </span>
                    <span className={`text-[9px] mt-1 px-1.5 py-0.5 rounded-md font-semibold ${isSelected && !isQuizMode ? 'bg-white/20 text-white' : 'bg-rose-100/70 text-rose-800'}`}>
                      {part.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
