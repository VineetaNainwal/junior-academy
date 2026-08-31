import React from 'react';
import { SubjectTab } from '../types';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  BookOpen,
  Shapes,
  Languages,
  Compass,
  Music,
  ScrollText,
  Sparkles,
  Gamepad2,
  Volume2,
  Award,
  Play,
  Heart,
  Star,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smile,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomePageProps {
  onNavigateTab: (tab: SubjectTab) => void;
  starsCount: number;
  onAwardStar: () => void;
  onOpenBadges: () => void;
  onOpenParentGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTab,
  starsCount,
  onAwardStar,
  onOpenBadges,
  onOpenParentGuide,
}) => {
  const handleMascotVoice = () => {
    sound.playSparkle();
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    sound.speak(
      "Namaste little champ! Welcome to Bal Vidya! Choose any fun world below to start learning letters, numbers, Hindi, GK, and awesome rhymes!",
      'en'
    );
  };

  const handleDailyLetterSound = () => {
    sound.playFlute();
    sound.speak('A for Apple! Sweet, red, and crunchy apple!');
  };

  const handleDailyHindiSound = () => {
    sound.playBell();
    sound.speakHindi('अ से अनार! मीठे-मीठे लाल दाने!', 'A se anaar, meethe meethe laal daane');
  };

  const handleDailyNumberSound = () => {
    sound.playTabla();
    sound.speak('Number 5! Let us count five golden modaks! 1, 2, 3, 4, 5!');
  };

  const handleDailyShlokaSound = () => {
    sound.playBell();
    sound.speakHindi(
      'ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      'Om Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada'
    );
  };

  const learningPortals = [
    {
      id: 'english' as SubjectTab,
      title: 'English Fun',
      hindiTitle: 'अंग्रेज़ी वर्णमाला',
      subtitle: 'Letters A–Z, Phonics, Sight Words & Tracing',
      emoji: '🔤',
      tagColor: 'bg-sky-100 text-sky-900 border-sky-200',
      bgGradient: 'from-sky-500/10 via-sky-500/5 to-transparent hover:border-sky-400',
      accentColor: 'text-sky-600',
      buttonBg: 'bg-sky-600 hover:bg-sky-700 text-white',
      highlights: ['26 ABC Cards with Voice', 'Interactive Letter Tracing', 'Toddler Sight Words & Colors'],
    },
    {
      id: 'math' as SubjectTab,
      title: 'Math & Shapes',
      hindiTitle: 'गणित व आकृतियाँ',
      subtitle: 'Numbers 1–20, Feed Ganesha, Shapes & Addition',
      emoji: '🔢',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent hover:border-emerald-400',
      accentColor: 'text-emerald-600',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      highlights: ['Count & Feed Ganesha', 'Geometric Shapes & Objects', 'Fun Object Addition Puzzles'],
    },
    {
      id: 'hindi' as SubjectTab,
      title: 'Hindi Varnamala',
      hindiTitle: 'हिंदी वर्णमाला',
      subtitle: 'Swar (स्वर), Vyanjan (व्यंजन) & Hindi Tracing',
      emoji: '🕉️',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-200',
      bgGradient: 'from-rose-500/10 via-rose-500/5 to-transparent hover:border-rose-400',
      accentColor: 'text-rose-600',
      buttonBg: 'bg-rose-600 hover:bg-rose-700 text-white',
      highlights: ['13 Swar with Audio', '36 Vyanjan Flashcards', 'Devanagari Tracing Pad'],
    },
    {
      id: 'gk' as SubjectTab,
      title: 'General Awareness',
      hindiTitle: 'सामान्य ज्ञान',
      subtitle: 'Body Parts, Weekdays, Months, Planets & Continents',
      emoji: '🌍',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-200',
      bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent hover:border-purple-400',
      accentColor: 'text-purple-600',
      buttonBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      highlights: ['Interactive Human Body Map', 'Solar System 8 Planets', '7 Continents & India Festivals'],
    },
    {
      id: 'rhymes' as SubjectTab,
      title: 'Sing-Along Rhymes',
      hindiTitle: 'बालगीत व कविताएँ',
      subtitle: 'English Classics & Hindi Nursery Balgeet',
      emoji: '🎵',
      tagColor: 'bg-pink-100 text-pink-900 border-pink-200',
      bgGradient: 'from-pink-500/10 via-pink-500/5 to-transparent hover:border-pink-400',
      accentColor: 'text-pink-600',
      buttonBg: 'bg-pink-600 hover:bg-pink-700 text-white',
      highlights: ['Chanda Mama, Machhli Jal Ki', 'Twinkle Twinkle, Humpty Dumpty', 'Karaoke Line Highlighter'],
    },
    {
      id: 'sanatan' as SubjectTab,
      title: 'Sanatan Wisdom',
      hindiTitle: 'सनातन बाल विद्या',
      subtitle: 'Sacred Gods, Yugas, Basic Shlokas & Moral Values',
      emoji: '🪔',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-200',
      bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent hover:border-amber-400',
      accentColor: 'text-amber-700',
      buttonBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      highlights: ['Gods & Divine Avatars', 'Gayatri & Ganesha Mantras', 'Moral Values for Kids'],
    },
    {
      id: 'games' as SubjectTab,
      title: 'Play & Game Zone',
      hindiTitle: 'बाल क्रीड़ा कुंज',
      subtitle: 'Balloon Pop, Memory Cards & Rangoli Art',
      emoji: '🎮',
      tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-200',
      bgGradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent hover:border-cyan-400',
      accentColor: 'text-cyan-700',
      buttonBg: 'bg-cyan-600 hover:bg-cyan-700 text-white',
      highlights: ['Alphabet Balloon Popper', 'Sacred Memory Match Cards', 'Rangoli Art Pad'],
    },
  ];

  return (
    <div className="space-y-8 font-['Nunito',sans-serif] animate-in fade-in duration-300">
      {/* 1. HERO GREETING BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white p-6 sm:p-8 md:p-10 shadow-lg border-2 border-indigo-400/40 overflow-hidden">
        {/* Subtle decorative background symbols */}
        <div className="absolute -right-6 -bottom-6 text-8xl sm:text-9xl opacity-10 select-none pointer-events-none">
          👧
        </div>
        <div className="absolute top-4 right-12 text-3xl opacity-30 select-none animate-pulse">
          ✨
        </div>
        <div className="absolute bottom-6 left-1/3 text-2xl opacity-20 select-none">
          🌈
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Column: Greeting & Call to Actions */}
          <div className="space-y-3.5 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-black shadow-xs">
              <span className="animate-spin text-amber-300">✦</span>
              <span>Joyful All-in-One Learning for Ages 2–6</span>
              <span className="bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                100% Free & Safe
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Baloo_2',sans-serif] tracking-tight leading-tight">
              Namaste Little Explorer! <br className="hidden sm:inline" />
              <span className="text-amber-300">Let’s Play, Learn & Grow! 🌟</span>
            </h1>

            <p className="text-sm sm:text-base text-indigo-100 font-medium leading-relaxed">
              Explore English alphabets, counting numbers, Hindi swar-vyanjan, body parts, solar system, rhymes, and sacred moral stories in a sweet child-friendly voice.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="home-start-english-btn"
                onClick={() => {
                  sound.playSparkle();
                  onNavigateTab('english');
                }}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-all active:scale-95 hover:scale-105"
              >
                <Play size={18} className="fill-amber-950" />
                <span>Start Learning Now</span>
              </button>

              <button
                id="home-mascot-voice-btn"
                onClick={handleMascotVoice}
                className="px-4 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white border border-white/30 font-extrabold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Volume2 size={18} className="text-amber-300" />
                <span>Hear Priya's Voice 👧</span>
              </button>

              <button
                id="home-play-game-btn"
                onClick={() => {
                  sound.playPop();
                  onNavigateTab('games');
                }}
                className="px-4 py-3 rounded-2xl bg-cyan-500/80 hover:bg-cyan-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <Gamepad2 size={18} />
                <span>Play Games 🎈</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mascot Card & Trophy Status */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/25 flex flex-col items-center text-center w-full sm:w-72 shrink-0 shadow-lg">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-6xl shadow-inner mb-3 transform hover:scale-105 transition-transform">
              <span className="drop-shadow">👧</span>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-300 text-amber-950 font-black flex items-center justify-center text-sm shadow-md border-2 border-white">
                ⭐
              </div>
            </div>

            <div className="text-lg font-black font-['Baloo_2',sans-serif] text-white">
              Priya & Mitra
            </div>
            <div className="text-xs text-indigo-200 font-bold mb-3">
              Your Friendly Learning Buddy
            </div>

            {/* Stars Counter Card */}
            <div className="w-full bg-white/15 rounded-2xl p-2.5 flex items-center justify-between text-xs font-black border border-white/20">
              <span className="flex items-center gap-1 text-amber-200">
                <Star size={14} className="fill-amber-300 text-amber-300" />
                <span>Collected Stars</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-sm">
                {starsCount} ⭐
              </span>
            </div>

            <button
              onClick={() => {
                sound.playSparkle();
                onOpenBadges();
              }}
              className="mt-2.5 text-xs text-amber-200 hover:text-white font-extrabold flex items-center gap-1 hover:underline"
            >
              <Award size={13} />
              <span>View All Unlocked Badges</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S DAILY WONDERS (Interactive Quick Daily Discovery for Kids) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl shadow-xs">
              ✨
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Baloo_2',sans-serif] leading-tight">
                Today’s Learning Wonders (दैनिक ज्ञान)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Tap any daily bite to hear interactive speech, sounds & rhymes!
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-black border border-indigo-100">
            Daily Discovery 📅
          </span>
        </div>

        {/* 4 Interactive Daily Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card 1: Letter of the Day */}
          <div
            onClick={handleDailyLetterSound}
            className="p-4 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border-2 border-sky-200 cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
                Letter of Day
              </span>
              <Volume2 size={16} className="text-sky-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 my-1">
              <span className="text-4xl font-black text-sky-700 font-['Baloo_2',sans-serif]">Aa</span>
              <span className="text-3xl">🍎</span>
              <div>
                <div className="text-sm font-black text-slate-900">Apple</div>
                <div className="text-xs text-slate-500 font-bold">/æ/ • सेब</div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-sky-800 mt-2 flex items-center gap-1">
              <span>🔊 Tap to listen</span>
            </div>
          </div>

          {/* Card 2: Hindi Swar of the Day */}
          <div
            onClick={handleDailyHindiSound}
            className="p-4 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border-2 border-rose-200 cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                स्वर ज्ञान
              </span>
              <Volume2 size={16} className="text-rose-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 my-1">
              <span className="text-4xl font-black text-rose-700 font-['Baloo_2',sans-serif]">अ</span>
              <span className="text-3xl">🍇</span>
              <div>
                <div className="text-sm font-black text-slate-900">अनार (Anaar)</div>
                <div className="text-xs text-slate-500 font-bold">Pomegranate</div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-rose-800 mt-2 flex items-center gap-1">
              <span>🔊 Tap for Hindi voice</span>
            </div>
          </div>

          {/* Card 3: Number & Count of the Day */}
          <div
            onClick={handleDailyNumberSound}
            className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border-2 border-emerald-200 cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Math Number
              </span>
              <Volume2 size={16} className="text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 my-1">
              <span className="text-4xl font-black text-emerald-700 font-['Baloo_2',sans-serif]">5</span>
              <span className="text-3xl">🟡</span>
              <div>
                <div className="text-sm font-black text-slate-900">Five • पाँच</div>
                <div className="text-xs text-slate-500 font-bold">5 Sweet Modaks</div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-emerald-800 mt-2 flex items-center gap-1">
              <span>🔊 Tap to count</span>
            </div>
          </div>

          {/* Card 4: Shloka / Mantra of the Day */}
          <div
            onClick={handleDailyShlokaSound}
            className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border-2 border-amber-200 cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                दैनिक श्लोक
              </span>
              <Volume2 size={16} className="text-amber-700 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-center gap-3 my-1">
              <span className="text-3xl font-black text-amber-800 font-['Baloo_2',sans-serif]">ॐ</span>
              <span className="text-3xl">🐘</span>
              <div>
                <div className="text-xs font-black text-slate-900 line-clamp-1 font-['Baloo_2',sans-serif]">वक्रतुण्ड महाकाय</div>
                <div className="text-[11px] text-slate-500 font-bold">Ganesha Blessing</div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-amber-900 mt-2 flex items-center gap-1">
              <span>🔊 Tap to chant mantra</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. EXPLORE LEARNING WORLDS (Big, Vibrant, Interactive Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl shadow-xs">
              🚀
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Baloo_2',sans-serif] leading-tight">
                Explore Learning Worlds
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Choose any curriculum subject below to explore lessons, sounds, and tracing!
              </p>
            </div>
          </div>
        </div>

        {/* 8 Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPortals.map((portal) => (
            <div
              key={portal.id}
              onClick={() => {
                sound.playBell();
                onNavigateTab(portal.id);
              }}
              className={`bg-white rounded-3xl p-5 border-2 border-slate-200 ${portal.bgGradient} transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden`}
            >
              <div>
                {/* Header Row: Emoji & Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
                    <span>{portal.emoji}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${portal.tagColor} font-['Baloo_2',sans-serif]`}>
                    {portal.hindiTitle}
                  </span>
                </div>

                {/* Subject Title */}
                <h3 className="text-xl font-black text-slate-900 font-['Baloo_2',sans-serif] leading-tight mb-1">
                  {portal.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mb-3.5 leading-relaxed">
                  {portal.subtitle}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 mb-4 text-xs font-semibold text-slate-600">
                  {portal.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className={portal.accentColor} />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${portal.buttonBg} group-hover:shadow-md`}
              >
                <span>Enter {portal.title.split(' ')[0]}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. QUICK MINI-PLAY & ACTIVITIES BAR */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-pink-100 rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-xs shrink-0">
              🎈
            </div>
            <div>
              <h3 className="text-xl font-black text-amber-950 font-['Baloo_2',sans-serif]">
                Quick Play: Balloon Pop & Rangoli Art!
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                Pop colorful alphabet balloons, match sacred memory cards, or draw glowing rangoli patterns.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playPop();
                onNavigateTab('games');
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <Gamepad2 size={16} />
              <span>Launch Play Zone</span>
            </button>

            <button
              onClick={() => {
                sound.playBell();
                onNavigateTab('sanatan');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 font-black text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <span>🪔 Sacred Shlokas & Gods</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. PARENT & EARLY CHILDHOOD FOUNDATION QUALITY BANNER */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shrink-0 font-bold">
            🛡️
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-sm font-['Baloo_2',sans-serif]">
              Designed for Early Childhood Foundations (Ages 2–6)
            </div>
            <p className="text-slate-500">
              Phonics sounds, multilingual Devanagari awareness, fine-motor tracing, zero ads, and screen-safe pacing.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playBell();
            onOpenParentGuide();
          }}
          className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-200 shadow-xs shrink-0"
        >
          View Parent & Teacher Curriculum Guide 📘
        </button>
      </div>
    </div>
  );
};
