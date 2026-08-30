import React, { useState, useEffect } from 'react';
import { AgeGroup, FestivalItem, SacredAnimal } from '../types';
import { FESTIVALS_DATA, SACRED_ANIMALS } from '../data/gkData';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import { BodyPartsSection } from './generalAwareness/BodyPartsSection';
import { WeekDaysSection } from './generalAwareness/WeekDaysSection';
import { MonthsSection } from './generalAwareness/MonthsSection';
import { SeasonsSection } from './generalAwareness/SeasonsSection';
import { PlanetsSection } from './generalAwareness/PlanetsSection';
import { ContinentsSection } from './generalAwareness/ContinentsSection';
import {
  Volume2,
  Sparkles,
  Flame,
  CheckCircle2,
  HelpCircle,
  Globe,
  Sun,
  Calendar,
  Layers,
  Heart,
  Orbit,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GkModuleProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

type GeneralAwarenessSubTab =
  | 'body-parts'
  | 'week-days'
  | 'months'
  | 'seasons'
  | 'planets'
  | 'continents'
  | 'festivals';

export const GkModule: React.FC<GkModuleProps> = ({ ageGroup, onAwardStar }) => {
  const [activeSubTab, setActiveSubTab] = useState<GeneralAwarenessSubTab>('body-parts');
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem>(FESTIVALS_DATA[0]);
  const [selectedAnimal, setSelectedAnimal] = useState<SacredAnimal>(SACRED_ANIMALS[0]);

  useEffect(() => {
    return () => {
      sound.stopSpeaking();
    };
  }, []);

  const subTabs = [
    { id: 'body-parts' as const, label: 'Body Parts', hindi: 'शरीर के अंग', emoji: '🧠', color: 'from-rose-500 to-pink-600' },
    { id: 'week-days' as const, label: 'Week Days', hindi: 'सप्ताह के दिन', emoji: '📅', color: 'from-amber-500 to-orange-500' },
    { id: 'months' as const, label: 'Months Name', hindi: 'महीनों के नाम', emoji: '🗓️', color: 'from-sky-500 to-blue-600' },
    { id: 'seasons' as const, label: 'Seasons', hindi: 'ऋतुएँ', emoji: '🌸', color: 'from-emerald-500 to-teal-600' },
    { id: 'planets' as const, label: 'Solar System', hindi: 'सौरमंडल', emoji: '🪐', color: 'from-indigo-600 to-purple-600' },
    { id: 'continents' as const, label: 'Continents', hindi: 'महाद्वीप', emoji: '🌍', color: 'from-cyan-600 to-blue-600' },
    { id: 'festivals' as const, label: 'Festivals & Culture', hindi: 'त्यौहार व प्रकृति', emoji: '🪔', color: 'from-orange-500 to-amber-600' },
  ];

  const handleFestivalClick = (fest: FestivalItem) => {
    setSelectedFestival(fest);
    if (fest.soundEffect === 'bell') sound.playBell();
    else if (fest.soundEffect === 'flute') sound.playFlute();
    else if (fest.soundEffect === 'tabla') sound.playTabla();
    else sound.playSparkle();

    sound.speak(`${fest.name}. ${fest.tagline}. ${fest.description}`);
  };

  const handleAnimalClick = (animal: SacredAnimal) => {
    setSelectedAnimal(animal);
    sound.playFlute();
    sound.speak(`${animal.name}. ${animal.soundText}. ${animal.symbolism}. ${animal.funFact}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation with High-Contrast Category Tabs */}
      <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-3xl border-2 border-teal-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🌍</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Baloo_2',sans-serif]">
                General Awareness (सामान्य ज्ञान)
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Explore Body Parts, 7 Week Days, 12 Months, 6 Seasons, Solar System Planets, & 7 Continents!
              </p>
            </div>
          </div>
        </div>

        {/* 6 Core Subsections + Culture Pill Selector */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-teal-50 rounded-2xl border border-teal-100">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`ga-tab-${tab.id}`}
                onClick={() => {
                  sound.playPop();
                  setActiveSubTab(tab.id);
                  if (tab.id === 'festivals') {
                    setSelectedFestival(FESTIVALS_DATA[0]);
                    setSelectedAnimal(SACRED_ANIMALS[0]);
                  }
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md scale-102 ring-2 ring-teal-200'
                    : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span className="text-sm">{tab.emoji}</span>
                <div className="text-left leading-tight">
                  <div className="font-extrabold">{tab.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>{tab.hindi}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Subsection */}
      {activeSubTab === 'body-parts' && (
        <BodyPartsSection onAwardStar={onAwardStar} />
      )}

      {activeSubTab === 'week-days' && (
        <WeekDaysSection onAwardStar={onAwardStar} />
      )}

      {activeSubTab === 'months' && (
        <MonthsSection onAwardStar={onAwardStar} />
      )}

      {activeSubTab === 'seasons' && (
        <SeasonsSection onAwardStar={onAwardStar} />
      )}

      {activeSubTab === 'planets' && (
        <PlanetsSection onAwardStar={onAwardStar} />
      )}

      {activeSubTab === 'continents' && (
        <ContinentsSection onAwardStar={onAwardStar} />
      )}

      {/* Festivals & Culture Tab */}
      {activeSubTab === 'festivals' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-200 shadow-sm flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <div>
              <h3 className="text-lg font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                Indian Festivals & Nature (त्यौहार व पवित्र पशु)
              </h3>
              <p className="text-xs text-amber-800">Learn about joyous festivals, lights, colors, and sacred animal companions!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Big Festival Feature */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex-1 flex flex-col items-center text-center relative overflow-hidden">
                <div className="text-6xl mb-2 animate-bounce">
                  <SmartIcon name={selectedFestival.iconEmoji} size={64} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                  {selectedFestival.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-800 mb-3">{selectedFestival.hindiName}</p>

                <div className="bg-white/90 rounded-2xl p-4 border border-amber-200 text-slate-800 text-xs leading-relaxed w-full text-left space-y-2 mb-4">
                  <div className="font-extrabold text-amber-900">{selectedFestival.tagline}</div>
                  <p>{selectedFestival.description}</p>
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-900 font-bold border border-amber-200">
                    🎉 How we celebrate: {selectedFestival.celebration}
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-xl text-yellow-950 font-semibold border border-yellow-200">
                    💡 Fun Fact: {selectedFestival.funFact}
                  </div>
                </div>

                <button
                  id="speak-festival-btn"
                  onClick={() => handleFestivalClick(selectedFestival)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Hear Story & Sounds (सुनें)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Festivals & Sacred Animals Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-sm font-black text-amber-950 mb-2">Festivals of Joy (त्यौहार):</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FESTIVALS_DATA.map((fest) => {
                    const isSelected = selectedFestival.id === fest.id;
                    return (
                      <div
                        key={fest.id}
                        id={`fest-${fest.id}`}
                        onClick={() => handleFestivalClick(fest)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-white shadow-lg scale-105 ring-2 ring-amber-300'
                            : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400 shadow-sm'
                        }`}
                      >
                        <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                          <SmartIcon name={fest.iconEmoji} size={36} />
                        </div>
                        <h5 className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-amber-950'}`}>
                          {fest.name.split('(')[0]}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-emerald-950 mb-2">Sacred Animal Companions (पवित्र पशु-पक्षी):</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SACRED_ANIMALS.map((animal) => {
                    const isSelected = selectedAnimal.id === animal.id;
                    return (
                      <div
                        key={animal.id}
                        id={`animal-${animal.id}`}
                        onClick={() => handleAnimalClick(animal)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center group ${
                          isSelected
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-white shadow-lg scale-105 ring-2 ring-emerald-300'
                            : 'bg-white hover:bg-emerald-50 text-slate-800 border-emerald-200 hover:border-emerald-400 shadow-sm'
                        }`}
                      >
                        <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                          <SmartIcon name={animal.iconEmoji} size={36} />
                        </div>
                        <h5 className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-emerald-950'}`}>
                          {animal.name.split('(')[0]}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
