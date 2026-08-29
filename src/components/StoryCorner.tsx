import React, { useState } from 'react';
import { AgeGroup } from '../types';
import { sound } from '../utils/sound';
import { SmartIcon } from './SmartIcon';
import {
  Sparkles,
  Volume2,
  BookOpen,
  Send,
  Loader2,
  Play,
  RotateCcw,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryCornerProps {
  ageGroup: AgeGroup;
  onAwardStar: () => void;
}

const STORY_CHARACTERS = [
  { id: 'ganesha', name: 'Bal Ganesha', emoji: '🐘', desc: 'Wise & loves sweet modaks' },
  { id: 'hanuman', name: 'Brave Little Hanuman', emoji: '🐒', desc: 'Strong, cheerful & kind' },
  { id: 'peacock', name: 'Mayur the Peacock', emoji: '🦚', desc: 'Loves rainbow rain dances' },
  { id: 'squirrel', name: 'Little Golden Squirrel', emoji: '🐿️', desc: 'Helps with big heart' },
  { id: 'cow', name: 'Kamdhenu the Calf', emoji: '🐄', desc: 'Gentle and loving friend' },
];

const STORY_MORALS = [
  { id: 'kindness', title: 'Kindness to All Animals', emoji: '❤️' },
  { id: 'sharing', title: 'Joy of Sharing & Giving', emoji: '🎁' },
  { id: 'truth', title: 'Speaking Truth & Bravery', emoji: '🌟' },
  { id: 'helping', title: 'Helping Friends & Family', emoji: '🤝' },
];

const PRESET_QUESTIONS = [
  'Why do we light diyas on Diwali? 🪔',
  'Why does Bal Ganesha love modaks? 🟡',
  'Why is the peacock the national bird? 🦚',
  'How do we greet with "Namaste"? 🙏',
];

export const StoryCorner: React.FC<StoryCornerProps> = ({ ageGroup, onAwardStar }) => {
  const [activeTab, setActiveTab] = useState<'createStory' | 'askMitra'>('createStory');

  // Story Generator State
  const [selectedChar, setSelectedChar] = useState(STORY_CHARACTERS[0].name);
  const [selectedMoral, setSelectedMoral] = useState(STORY_MORALS[0].title);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const [storyResult, setStoryResult] = useState<{
    title: string;
    scenes: { emoji: string; text: string; hindiTranslation: string }[];
    moral: string;
  } | null>(null);

  // Ask Mitra Q&A State
  const [userQuestion, setUserQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [mitraAnswer, setMitraAnswer] = useState<string | null>(null);

  // Handle Story Generation via Server-Side Gemini API
  const handleGenerateStory = async () => {
    setIsGeneratingStory(true);
    sound.playBell();

    try {
      const res = await fetch('/api/gemini/create-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: selectedChar,
          moral: selectedMoral,
          ageGroup: ageGroup,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      setStoryResult(data);
      sound.playCelebration();
      confetti({ particleCount: 40, spread: 60 });
      onAwardStar();
    } catch (err) {
      console.warn('Fallback story generation:', err);
      // High-quality fallback story if offline or no key
      setStoryResult({
        title: `${selectedChar} and the Joy of ${selectedMoral}`,
        scenes: [
          {
            emoji: '🌸',
            text: `Once upon a sunny morning in a peaceful green forest, ${selectedChar} was skipping happily among lotus blossoms.`,
            hindiTranslation: `एक सुंदर सुबह हरे-भरे वन में ${selectedChar} कमल के फूलों के बीच खुशी से झूम रहा था।`,
          },
          {
            emoji: '🤝',
            text: `A little friend came along who needed some warmth and help. ${selectedChar} smiled and showed wonderful ${selectedMoral.toLowerCase()}.`,
            hindiTranslation: `तभी एक छोटा मित्र आया जिसे सहायता की आवश्यकता थी। ${selectedChar} ने मुस्कुराकर उसकी मदद की।`,
          },
          {
            emoji: '✨',
            text: `Everyone in the forest cheered with joy, and golden flowers showered from the skies!`,
            hindiTranslation: `वन के सभी पशु-पक्षी खुशी से झूम उठे और चारों ओर खुशियाँ छा गईं!`,
          },
        ],
        moral: `Always practice ${selectedMoral.toLowerCase()} and bring smiles to everyone around you!`,
      });
      sound.playSparkle();
      onAwardStar();
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // Handle Ask Mitra Q&A
  const handleAskQuestion = async (queryText?: string) => {
    const q = queryText || userQuestion;
    if (!q.trim()) return;

    setIsAnswering(true);
    sound.playFlute();

    try {
      const res = await fetch('/api/gemini/ask-mitra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          ageGroup: ageGroup,
        }),
      });

      if (!res.ok) throw new Error('Mitra Q&A failed');
      const data = await res.json();
      setMitraAnswer(data.answer);
      sound.playSparkle();
      sound.speak(data.answer);
    } catch (err) {
      const fallbackAnswers: Record<string, string> = {
        'diya': 'Diyas bring warm light and dispel darkness, celebrating love and happiness on Diwali! 🪔',
        'modak': 'Bal Ganesha loves sweet round modaks because they represent the sweetness of wisdom and joy! 🟡',
        'peacock': 'Peacocks represent grace, beauty, and rain joy with their magnificent rainbow feathers! 🦚',
      };
      const fallback = "Namaste sweet friend! In Indian culture, every festival, flower, and bird teaches us to love nature and be kind to everyone! 🌸";
      setMitraAnswer(fallback);
      sound.speak(fallback);
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Dadi’s Storybook & Bal Mitra AI Corner (कहानियाँ)
            </h2>
            <p className="text-xs text-amber-800">Create custom moral tales and ask curious cultural questions!</p>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-1.5 bg-amber-100/70 p-1 rounded-xl">
          <button
            id="story-tab-create"
            onClick={() => {
              sound.playPop();
              setActiveTab('createStory');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'createStory'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create AI Story</span>
          </button>

          <button
            id="story-tab-ask"
            onClick={() => {
              sound.playPop();
              setActiveTab('askMitra');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              activeTab === 'askMitra'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ask Bal Mitra (Q&A)</span>
          </button>
        </div>
      </div>

      {/* Mode 1: AI Story Generator */}
      {activeTab === 'createStory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls to pick Hero & Moral */}
          <div className="lg:col-span-5 bg-white/90 rounded-3xl p-5 border-4 border-amber-300 shadow-md space-y-4">
            <div>
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-2">
                1. Choose Story Hero (नायक):
              </label>
              <div className="grid grid-cols-1 gap-2">
                {STORY_CHARACTERS.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedChar(char.name);
                      sound.playPop();
                    }}
                    className={`p-2.5 rounded-xl border-2 transition-all flex items-center gap-3 text-left ${
                      selectedChar === char.name
                        ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                        : 'bg-amber-50/70 hover:bg-amber-100 text-amber-950 border-amber-200'
                    }`}
                  >
                    <SmartIcon name={char.emoji} size={24} />
                    <div>
                      <div className="text-sm font-extrabold">{char.name}</div>
                      <div className={`text-[10px] ${selectedChar === char.name ? 'text-amber-100' : 'text-amber-700'}`}>
                        {char.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-2">
                2. Choose Moral Value (शिक्षा):
              </label>
              <div className="grid grid-cols-1 gap-2">
                {STORY_MORALS.map((moral) => (
                  <button
                    key={moral.id}
                    onClick={() => {
                      setSelectedMoral(moral.title);
                      sound.playPop();
                    }}
                    className={`p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 text-left ${
                      selectedMoral === moral.title
                        ? 'bg-orange-500 text-white border-orange-600 shadow-md font-bold'
                        : 'bg-amber-50/70 hover:bg-amber-100 text-amber-950 border-amber-200'
                    }`}
                  >
                    <SmartIcon name={moral.emoji} size={20} />
                    <span className="text-xs font-extrabold">{moral.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              id="generate-story-btn"
              disabled={isGeneratingStory}
              onClick={handleGenerateStory}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingStory ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Weaving Magical Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Weave Story with Gemini AI!</span>
                </>
              )}
            </button>
          </div>

          {/* Story Viewer Display */}
          <div className="lg:col-span-7">
            {storyResult ? (
              <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl space-y-4">
                <div className="text-center pb-2 border-b border-amber-200">
                  <h3 className="text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
                    {storyResult.title}
                  </h3>
                  <p className="text-xs text-orange-700 font-bold mt-1">A Bedtime Tale for Little Angels</p>
                </div>

                {/* Scenes */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {storyResult.scenes.map((sc, i) => (
                    <div
                      key={i}
                      className="bg-white/95 p-4 rounded-2xl border border-amber-200 shadow-sm flex items-start gap-3.5"
                    >
                      <span className="text-3xl mt-0.5">{sc.emoji}</span>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">{sc.text}</p>
                        <p className="text-xs text-amber-900 font-semibold italic">{sc.hindiTranslation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Moral Box */}
                <div className="p-3.5 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>Moral: {storyResult.moral}</span>
                </div>

                {/* Read Aloud Button */}
                <button
                  id="read-ai-story-btn"
                  onClick={() => {
                    sound.playBell();
                    const fullText = `${storyResult.title}. ${storyResult.scenes.map((s) => s.text).join(' ')}. Moral of the story: ${storyResult.moral}`;
                    sound.speak(fullText);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Read Entire Story Aloud</span>
                </button>
              </div>
            ) : (
              <div className="bg-white/80 rounded-3xl p-10 border-4 border-dashed border-amber-200 text-center flex flex-col items-center justify-center h-full min-h-[350px]">
                <div className="text-6xl mb-3 animate-bounce">📚</div>
                <h4 className="text-xl font-bold text-amber-900 mb-1">Pick a Hero & Moral to Begin!</h4>
                <p className="text-xs text-amber-700 max-w-xs">
                  Bal Mitra will weave an inspiring, heartwarming illustrated story with moral values for your child.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mode 2: Ask Bal Mitra */}
      {activeTab === 'askMitra' && (
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-amber-50 via-sky-50 to-orange-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-2 animate-bounce">🐘🦚</div>
            <h3 className="text-2xl font-extrabold text-amber-950 font-['Baloo_2',sans-serif]">
              Ask Bal Mitra! (ज्ञान जिज्ञासा)
            </h3>
            <p className="text-xs text-amber-800">Kid-friendly, sweet explanations for curious little minds!</p>
          </div>

          {/* Quick Preset Question Bubbles */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700">Tap a popular question:</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setUserQuestion(q);
                    handleAskQuestion(q);
                  }}
                  className="py-1.5 px-3 bg-white hover:bg-amber-100 text-amber-950 rounded-full border border-amber-300 text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 bg-white rounded-2xl p-2 border-2 border-amber-300 shadow-inner">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask anything (e.g. Why do birds sing at sunrise?)"
              className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none bg-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            />
            <button
              id="send-question-btn"
              disabled={isAnswering}
              onClick={() => handleAskQuestion()}
              className="p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-md transition-transform active:scale-95 disabled:opacity-50"
            >
              {isAnswering ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>

          {/* Answer Display */}
          {mitraAnswer && (
            <div className="bg-white/95 p-5 rounded-3xl border-2 border-amber-300 shadow-md space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-black text-orange-600">
                <span>🦚 Bal Mitra says:</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                {mitraAnswer}
              </p>
              <button
                onClick={() => {
                  sound.playBell();
                  sound.speak(mitraAnswer);
                }}
                className="text-xs font-bold text-amber-800 hover:text-orange-600 flex items-center gap-1.5 pt-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Voice Again</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
