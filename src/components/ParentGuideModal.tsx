import React from 'react';
import { sound } from '../utils/sound';
import { X, BookOpen, ShieldCheck, Heart, Sparkles, Brain, Award } from 'lucide-react';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          id="close-parent-guide-btn"
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-full transition-transform active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
            👨‍👩‍👧
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Parent & Educator Curriculum Guide
            </h3>
            <p className="text-xs text-amber-800">Holistic Early Learning with Cultural Values (Ages 2–6)</p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <Brain className="w-4 h-4 text-orange-600" />
              <span>Phonics & Sanskrit Phonology</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Sanskrit chanting and clear English phonics stimulate rhythmic auditory processing, enhancing speech clarity and memory retention in early childhood.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-950">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Concrete-to-Abstract Math</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Counting cultural items (sweet modaks, peacock feathers, diyas) grounds abstract numbers into physical, relatable daily experiences.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-rose-950">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Panchatantra Moral Foundations</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Stories from classical literature nurture empathy, kindness to animals, sharing, and truthfulness naturally without heavy lectures.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-sky-950">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Safe Screen-Time Principles</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Gentle color palettes, warm natural acoustic synthesizers (flute, bell), and no aggressive flashing lights ensure calm, constructive exploration.
            </p>
          </div>
        </div>

        {/* Milestone Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Age-Wise Recommended Pathways:</h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
              <span className="font-bold text-amber-900 flex-shrink-0">🐣 Age 2–3:</span>
              <span className="text-slate-700">Focus on Balloon Pop, Color explorations, Animal sounds, and tactile letter tracing.</span>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
              <span className="font-bold text-amber-900 flex-shrink-0">🌟 Age 3–4:</span>
              <span className="text-slate-700">Explore Swar & Vyanjan, Feed Ganesha counting game, and listen to Balgeet sing-alongs.</span>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
              <span className="font-bold text-amber-900 flex-shrink-0">🚀 Age 4–6:</span>
              <span className="text-slate-700">Master visual addition, Sanskrit shlokas, AI story generation, and festival knowledge quizzes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
