import React, { useState } from 'react';
import { BodyPartItem } from '../../types';
import { sound } from '../../utils/sound';
import { Volume2, Sparkles } from 'lucide-react';

interface BodyDiagramChartProps {
  selectedPartId: string;
  onSelectPart: (partId: string) => void;
}

export const BodyDiagramChart: React.FC<BodyDiagramChartProps> = ({
  selectedPartId,
  onSelectPart,
}) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handleLabelClick = (partId: string, partName: string) => {
    sound.playPop();
    sound.speak(partName);
    onSelectPart(partId);
  };

  const isHighlighted = (partId: string) => {
    return selectedPartId === partId || hoveredPart === partId;
  };

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 via-white to-blue-50/50 rounded-3xl p-4 sm:p-6 border-4 border-sky-200 shadow-xl select-none overflow-hidden relative">
      {/* Title Header inside Chart */}
      <div className="flex items-center justify-between pb-3 border-b border-sky-100 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🧒</span>
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-800 font-['Baloo_2',sans-serif]">
              Interactive Human Body Chart (शरीर के अंग)
            </h4>
            <p className="text-[11px] sm:text-xs text-sky-700 font-bold">
              Tap any naming label to hear its English pronunciation!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-xs font-black">
          <Volume2 className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          <span>Click to Listen</span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 860 560"
          className="w-full min-w-[620px] max-w-[900px] mx-auto h-auto transition-all"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.03))' }}
        >
          <defs>
            {/* Soft Shadow Filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.5" />
            </filter>
            <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f43f5e" floodOpacity="0.8" />
            </filter>
            
            {/* Skin Gradients */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="shortsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* Subheadings: Front View & Back View */}
          <text x="215" y="32" textAnchor="middle" fill="#0369a1" fontSize="17" fontWeight="800" fontFamily="'Baloo 2', sans-serif">
            FRONT VIEW (आगे का भाग)
          </text>
          <text x="645" y="32" textAnchor="middle" fill="#0369a1" fontSize="17" fontWeight="800" fontFamily="'Baloo 2', sans-serif">
            BACK VIEW (पीछे का भाग)
          </text>

          {/* Middle Divider Line */}
          <line x1="430" y1="20" x2="430" y2="540" stroke="#bae6fd" strokeWidth="2" strokeDasharray="6 6" />

          {/* ============================================================ */}
          {/* 1. FRONT VIEW FIGURE (X: 130 to 300, Center ~ 215)          */}
          {/* ============================================================ */}
          <g id="front-figure" transform="translate(0, 0)">
            {/* Head Silhouette */}
            <circle cx="215" cy="115" r="42" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />

            {/* Hair Front */}
            <path
              d="M 174 105 C 172 70, 258 70, 256 105 C 248 90, 230 85, 215 88 C 200 85, 182 90, 174 105 Z"
              fill="url(#hairGrad)"
            />
            {/* Cute Front Hair Tufts */}
            <path d="M 195 82 Q 215 70 235 84 Q 215 76 195 82 Z" fill="#78350f" />

            {/* Ears */}
            <circle cx="173" cy="118" r="8" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="173" cy="118" r="4" fill="#fed7aa" />
            <circle cx="257" cy="118" r="8" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="257" cy="118" r="4" fill="#fed7aa" />

            {/* Eyebrows */}
            <path d="M 190 100 Q 198 94 206 100" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 224 100 Q 232 94 240 100" stroke="#451a03" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <circle cx="198" cy="112" r="5" fill="#0f172a" />
            <circle cx="200" cy="110" r="1.5" fill="#ffffff" />
            <circle cx="232" cy="112" r="5" fill="#0f172a" />
            <circle cx="234" cy="110" r="1.5" fill="#ffffff" />

            {/* Nose */}
            <path d="M 215 116 Q 212 124 217 124" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Cheerful Mouth & Tongue */}
            <path d="M 205 132 Q 215 145 225 132" stroke="#be123c" strokeWidth="2.5" fill="#e11d48" />
            <path d="M 210 136 Q 215 142 220 136" fill="#fda4af" />

            {/* Neck */}
            <rect x="207" y="153" width="16" height="15" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1" />

            {/* Shoulders & Upper Body / Chest */}
            <path
              d="M 165 178 Q 215 165 265 178 L 255 270 Q 215 275 175 270 Z"
              fill="url(#skinGrad)"
              stroke="#ea580c"
              strokeWidth="1.5"
            />
            {/* Collarbone / Chest details */}
            <path d="M 195 185 Q 215 192 235 185" stroke="#f97316" strokeWidth="1.5" fill="none" />
            {/* Navel / Belly button */}
            <ellipse cx="215" cy="256" rx="2" ry="1.5" fill="#c2410c" />

            {/* Arms & Hands Front */}
            {/* Left Arm (viewer's left) */}
            <path d="M 168 180 Q 140 215 130 255 L 142 258 Q 152 220 176 190 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Left Hand */}
            <circle cx="128" cy="264" r="11" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <path d="M 120 262 Q 126 274 136 264" stroke="#ea580c" strokeWidth="1" fill="none" />

            {/* Right Arm (viewer's right) */}
            <path d="M 262 180 Q 290 215 300 255 L 288 258 Q 278 220 254 190 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Right Hand */}
            <circle cx="302" cy="264" r="11" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <path d="M 294 262 Q 300 274 310 264" stroke="#ea580c" strokeWidth="1" fill="none" />

            {/* Shorts */}
            <path
              d="M 174 270 L 256 270 L 260 320 L 225 320 L 215 295 L 205 320 L 170 320 Z"
              fill="url(#shortsGrad)"
              stroke="#0369a1"
              strokeWidth="2"
            />

            {/* Legs Front */}
            {/* Left Leg */}
            <path d="M 180 320 L 176 450 Q 176 480 180 510 L 200 510 Q 204 480 204 450 L 208 320 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Left Knee marker */}
            <path d="M 182 410 Q 192 416 202 410" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Right Leg */}
            <path d="M 222 320 L 226 450 Q 226 480 230 510 L 250 510 Q 254 480 254 450 L 250 320 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Right Knee marker */}
            <path d="M 228 410 Q 238 416 248 410" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Feet & Toes Front */}
            {/* Left Foot */}
            <path d="M 178 510 L 158 522 Q 158 532 178 532 L 200 532 Q 204 522 200 510 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Left Toes lines */}
            <circle cx="163" cy="527" r="2.5" fill="#f97316" />
            <circle cx="169" cy="528" r="2.2" fill="#f97316" />
            <circle cx="175" cy="529" r="2" fill="#f97316" />

            {/* Right Foot */}
            <path d="M 230 510 L 252 510 Q 272 522 272 532 L 250 532 Q 230 532 230 522 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Right Toes lines */}
            <circle cx="267" cy="527" r="2.5" fill="#f97316" />
            <circle cx="261" cy="528" r="2.2" fill="#f97316" />
            <circle cx="255" cy="529" r="2" fill="#f97316" />
          </g>

          {/* ============================================================ */}
          {/* 2. BACK VIEW FIGURE (X: 560 to 730, Center ~ 645)           */}
          {/* ============================================================ */}
          <g id="back-figure" transform="translate(0, 0)">
            {/* Back Head & Hair */}
            <circle cx="645" cy="115" r="42" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <path
              d="M 603 115 C 603 70, 687 70, 687 115 C 687 142, 603 142, 603 115 Z"
              fill="url(#hairGrad)"
            />
            {/* Hair texture strands */}
            <path d="M 625 90 Q 645 80 665 92" stroke="#92400e" strokeWidth="2" fill="none" />
            <path d="M 618 110 Q 645 100 672 110" stroke="#92400e" strokeWidth="2" fill="none" />

            {/* Ears Back */}
            <circle cx="603" cy="118" r="7" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="687" cy="118" r="7" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />

            {/* Neck Back */}
            <rect x="637" y="153" width="16" height="15" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1" />

            {/* Back & Shoulders */}
            <path
              d="M 595 178 Q 645 165 695 178 L 685 270 Q 645 275 605 270 Z"
              fill="url(#skinGrad)"
              stroke="#ea580c"
              strokeWidth="1.5"
            />
            {/* Spine Line */}
            <path d="M 645 178 L 645 268" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Shoulder blades */}
            <path d="M 622 195 Q 632 210 622 225" stroke="#ea580c" strokeWidth="1.5" fill="none" />
            <path d="M 668 195 Q 658 210 668 225" stroke="#ea580c" strokeWidth="1.5" fill="none" />

            {/* Arms & Hands Back */}
            {/* Left Arm Back (viewer's left) */}
            <path d="M 598 180 Q 570 215 560 255 L 572 258 Q 582 220 606 190 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="558" cy="264" r="11" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Left Elbow crease */}
            <path d="M 574 222 Q 580 225 586 222" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Right Arm Back (viewer's right) */}
            <path d="M 692 180 Q 720 215 730 255 L 718 258 Q 708 220 684 190 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="732" cy="264" r="11" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Right Elbow crease */}
            <path d="M 704 222 Q 710 225 716 222" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Shorts Back */}
            <path
              d="M 604 270 L 686 270 L 690 320 L 655 320 L 645 295 L 635 320 L 600 320 Z"
              fill="url(#shortsGrad)"
              stroke="#0369a1"
              strokeWidth="2"
            />
            {/* Buttocks pocket curves */}
            <path d="M 618 285 Q 630 305 642 285" stroke="#0284c7" strokeWidth="1.5" fill="none" />
            <path d="M 648 285 Q 660 305 672 285" stroke="#0284c7" strokeWidth="1.5" fill="none" />

            {/* Legs Back */}
            {/* Left Leg Back */}
            <path d="M 610 320 L 606 450 Q 606 480 610 510 L 630 510 Q 634 480 634 450 L 638 320 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Back of Left Knee */}
            <path d="M 612 415 Q 620 410 628 415" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Right Leg Back */}
            <path d="M 652 320 L 656 450 Q 656 480 660 510 L 680 510 Q 684 480 684 450 L 680 320 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            {/* Back of Right Knee */}
            <path d="M 658 415 Q 666 410 674 415" stroke="#ea580c" strokeWidth="2" fill="none" />

            {/* Heels & Feet Back */}
            {/* Left Heel */}
            <path d="M 610 510 Q 605 522 620 532 L 632 532 Q 635 522 630 510 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <ellipse cx="620" cy="522" rx="5" ry="3" fill="#fdba74" stroke="#ea580c" strokeWidth="1" />

            {/* Right Heel */}
            <path d="M 660 510 Q 655 522 670 532 L 682 532 Q 685 522 680 510 Z" fill="url(#skinGrad)" stroke="#ea580c" strokeWidth="1.5" />
            <ellipse cx="670" cy="522" rx="5" ry="3" fill="#fdba74" stroke="#ea580c" strokeWidth="1" />
          </g>

          {/* ============================================================ */}
          {/* 3. POINTER LINES & TARGET DOTS                               */}
          {/* ============================================================ */}
          {/* Front Left Pointers */}
          {/* Eyebrow */}
          <line x1="90" y1="98" x2="192" y2="98" stroke={isHighlighted('eyebrow') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('eyebrow') ? '3' : '2'} strokeDasharray={isHighlighted('eyebrow') ? 'none' : '2 2'} />
          <circle cx="192" cy="98" r={isHighlighted('eyebrow') ? 5 : 3.5} fill={isHighlighted('eyebrow') ? '#f43f5e' : '#0284c7'} />

          {/* Nose */}
          <line x1="75" y1="135" x2="215" y2="124" stroke={isHighlighted('nose') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('nose') ? '3' : '2'} strokeDasharray={isHighlighted('nose') ? 'none' : '2 2'} />
          <circle cx="215" cy="124" r={isHighlighted('nose') ? 5 : 3.5} fill={isHighlighted('nose') ? '#f43f5e' : '#0284c7'} />

          {/* Mouth */}
          <line x1="75" y1="175" x2="215" y2="136" stroke={isHighlighted('mouth') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('mouth') ? '3' : '2'} strokeDasharray={isHighlighted('mouth') ? 'none' : '2 2'} />
          <circle cx="215" cy="136" r={isHighlighted('mouth') ? 5 : 3.5} fill={isHighlighted('mouth') ? '#f43f5e' : '#0284c7'} />

          {/* Chest */}
          <line x1="75" y1="225" x2="200" y2="200" stroke={isHighlighted('chest') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('chest') ? '3' : '2'} strokeDasharray={isHighlighted('chest') ? 'none' : '2 2'} />
          <circle cx="200" cy="200" r={isHighlighted('chest') ? 5 : 3.5} fill={isHighlighted('chest') ? '#f43f5e' : '#0284c7'} />

          {/* Stomach */}
          <line x1="90" y1="275" x2="210" y2="255" stroke={isHighlighted('stomach') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('stomach') ? '3' : '2'} strokeDasharray={isHighlighted('stomach') ? 'none' : '2 2'} />
          <circle cx="210" cy="255" r={isHighlighted('stomach') ? 5 : 3.5} fill={isHighlighted('stomach') ? '#f43f5e' : '#0284c7'} />

          {/* Leg */}
          <line x1="65" y1="355" x2="190" y2="360" stroke={isHighlighted('leg') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('leg') ? '3' : '2'} strokeDasharray={isHighlighted('leg') ? 'none' : '2 2'} />
          <circle cx="190" cy="360" r={isHighlighted('leg') ? 5 : 3.5} fill={isHighlighted('leg') ? '#f43f5e' : '#0284c7'} />

          {/* Knee */}
          <line x1="75" y1="410" x2="192" y2="410" stroke={isHighlighted('knee') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('knee') ? '3' : '2'} strokeDasharray={isHighlighted('knee') ? 'none' : '2 2'} />
          <circle cx="192" cy="410" r={isHighlighted('knee') ? 5 : 3.5} fill={isHighlighted('knee') ? '#f43f5e' : '#0284c7'} />

          {/* Toe */}
          <line x1="65" y1="505" x2="170" y2="528" stroke={isHighlighted('toe') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('toe') ? '3' : '2'} strokeDasharray={isHighlighted('toe') ? 'none' : '2 2'} />
          <circle cx="170" cy="528" r={isHighlighted('toe') ? 5 : 3.5} fill={isHighlighted('toe') ? '#f43f5e' : '#0284c7'} />

          {/* Front Right Pointers */}
          {/* Head */}
          <line x1="335" y1="75" x2="245" y2="85" stroke={isHighlighted('head') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('head') ? '3' : '2'} strokeDasharray={isHighlighted('head') ? 'none' : '2 2'} />
          <circle cx="245" cy="85" r={isHighlighted('head') ? 5 : 3.5} fill={isHighlighted('head') ? '#f43f5e' : '#0284c7'} />

          {/* Ear */}
          <line x1="335" y1="118" x2="257" y2="118" stroke={isHighlighted('ear') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('ear') ? '3' : '2'} strokeDasharray={isHighlighted('ear') ? 'none' : '2 2'} />
          <circle cx="257" cy="118" r={isHighlighted('ear') ? 5 : 3.5} fill={isHighlighted('ear') ? '#f43f5e' : '#0284c7'} />

          {/* Hand */}
          <line x1="335" y1="264" x2="302" y2="264" stroke={isHighlighted('hand') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('hand') ? '3' : '2'} strokeDasharray={isHighlighted('hand') ? 'none' : '2 2'} />
          <circle cx="302" cy="264" r={isHighlighted('hand') ? 5 : 3.5} fill={isHighlighted('hand') ? '#f43f5e' : '#0284c7'} />

          {/* Foot */}
          <line x1="335" y1="490" x2="245" y2="520" stroke={isHighlighted('foot') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('foot') ? '3' : '2'} strokeDasharray={isHighlighted('foot') ? 'none' : '2 2'} />
          <circle cx="245" cy="520" r={isHighlighted('foot') ? 5 : 3.5} fill={isHighlighted('foot') ? '#f43f5e' : '#0284c7'} />

          {/* Back Left Pointers */}
          {/* Hair */}
          <line x1="510" y1="75" x2="620" y2="85" stroke={isHighlighted('hair') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('hair') ? '3' : '2'} strokeDasharray={isHighlighted('hair') ? 'none' : '2 2'} />
          <circle cx="620" cy="85" r={isHighlighted('hair') ? 5 : 3.5} fill={isHighlighted('hair') ? '#f43f5e' : '#0284c7'} />

          {/* Arm */}
          <line x1="510" y1="190" x2="585" y2="205" stroke={isHighlighted('arm') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('arm') ? '3' : '2'} strokeDasharray={isHighlighted('arm') ? 'none' : '2 2'} />
          <circle cx="585" cy="205" r={isHighlighted('arm') ? 5 : 3.5} fill={isHighlighted('arm') ? '#f43f5e' : '#0284c7'} />

          {/* Elbow */}
          <line x1="510" y1="230" x2="580" y2="225" stroke={isHighlighted('elbow') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('elbow') ? '3' : '2'} strokeDasharray={isHighlighted('elbow') ? 'none' : '2 2'} />
          <circle cx="580" cy="225" r={isHighlighted('elbow') ? 5 : 3.5} fill={isHighlighted('elbow') ? '#f43f5e' : '#0284c7'} />

          {/* Finger */}
          <line x1="510" y1="275" x2="558" y2="265" stroke={isHighlighted('finger') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('finger') ? '3' : '2'} strokeDasharray={isHighlighted('finger') ? 'none' : '2 2'} />
          <circle cx="558" cy="265" r={isHighlighted('finger') ? 5 : 3.5} fill={isHighlighted('finger') ? '#f43f5e' : '#0284c7'} />

          {/* Back Right Pointers */}
          {/* Neck */}
          <line x1="755" y1="150" x2="655" y2="155" stroke={isHighlighted('neck') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('neck') ? '3' : '2'} strokeDasharray={isHighlighted('neck') ? 'none' : '2 2'} />
          <circle cx="655" cy="155" r={isHighlighted('neck') ? 5 : 3.5} fill={isHighlighted('neck') ? '#f43f5e' : '#0284c7'} />

          {/* Shoulder */}
          <line x1="755" y1="190" x2="685" y2="178" stroke={isHighlighted('shoulder') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('shoulder') ? '3' : '2'} strokeDasharray={isHighlighted('shoulder') ? 'none' : '2 2'} />
          <circle cx="685" cy="178" r={isHighlighted('shoulder') ? 5 : 3.5} fill={isHighlighted('shoulder') ? '#f43f5e' : '#0284c7'} />

          {/* Back */}
          <line x1="755" y1="235" x2="655" y2="220" stroke={isHighlighted('back') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('back') ? '3' : '2'} strokeDasharray={isHighlighted('back') ? 'none' : '2 2'} />
          <circle cx="655" cy="220" r={isHighlighted('back') ? 5 : 3.5} fill={isHighlighted('back') ? '#f43f5e' : '#0284c7'} />

          {/* Buttocks */}
          <line x1="755" y1="290" x2="660" y2="295" stroke={isHighlighted('buttocks') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('buttocks') ? '3' : '2'} strokeDasharray={isHighlighted('buttocks') ? 'none' : '2 2'} />
          <circle cx="660" cy="295" r={isHighlighted('buttocks') ? 5 : 3.5} fill={isHighlighted('buttocks') ? '#f43f5e' : '#0284c7'} />

          {/* Heel */}
          <line x1="755" y1="495" x2="670" y2="520" stroke={isHighlighted('heel') ? '#f43f5e' : '#0284c7'} strokeWidth={isHighlighted('heel') ? '3' : '2'} strokeDasharray={isHighlighted('heel') ? 'none' : '2 2'} />
          <circle cx="670" cy="520" r={isHighlighted('heel') ? 5 : 3.5} fill={isHighlighted('heel') ? '#f43f5e' : '#0284c7'} />
        </svg>

        {/* ============================================================ */}
        {/* 4. INTERACTIVE CLICKABLE HTML LABELS (OVERLAID ON DIAGRAM)   */}
        {/* ============================================================ */}

        {/* Front Left Labels */}
        <DiagramLabel
          id="btn-label-eyebrow"
          name="Eyebrow"
          hindi="भौंह"
          left="2%"
          top="15%"
          isSelected={selectedPartId === 'eyebrow'}
          onMouseEnter={() => setHoveredPart('eyebrow')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('eyebrow', 'Eyebrow')}
        />
        <DiagramLabel
          id="btn-label-nose"
          name="Nose"
          hindi="नाक"
          left="2%"
          top="22%"
          isSelected={selectedPartId === 'nose'}
          onMouseEnter={() => setHoveredPart('nose')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('nose', 'Nose')}
        />
        <DiagramLabel
          id="btn-label-mouth"
          name="Mouth"
          hindi="मुँह"
          left="2%"
          top="29%"
          isSelected={selectedPartId === 'mouth'}
          onMouseEnter={() => setHoveredPart('mouth')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('mouth', 'Mouth')}
        />
        <DiagramLabel
          id="btn-label-chest"
          name="Chest"
          hindi="सीना"
          left="2%"
          top="38%"
          isSelected={selectedPartId === 'chest'}
          onMouseEnter={() => setHoveredPart('chest')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('chest', 'Chest')}
        />
        <DiagramLabel
          id="btn-label-stomach"
          name="Stomach"
          hindi="पेट"
          left="2%"
          top="47%"
          isSelected={selectedPartId === 'stomach'}
          onMouseEnter={() => setHoveredPart('stomach')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('stomach', 'Stomach')}
        />
        <DiagramLabel
          id="btn-label-leg"
          name="Leg"
          hindi="टाँग"
          left="2%"
          top="61%"
          isSelected={selectedPartId === 'leg'}
          onMouseEnter={() => setHoveredPart('leg')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('leg', 'Leg')}
        />
        <DiagramLabel
          id="btn-label-knee"
          name="Knee"
          hindi="घुटना"
          left="2%"
          top="71%"
          isSelected={selectedPartId === 'knee'}
          onMouseEnter={() => setHoveredPart('knee')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('knee', 'Knee')}
        />
        <DiagramLabel
          id="btn-label-toe"
          name="Toe"
          hindi="पैर की उँगली"
          left="2%"
          top="87%"
          isSelected={selectedPartId === 'toe'}
          onMouseEnter={() => setHoveredPart('toe')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('toe', 'Toe')}
        />

        {/* Front Right Labels */}
        <DiagramLabel
          id="btn-label-head"
          name="Head"
          hindi="सिर"
          left="37%"
          top="11%"
          isSelected={selectedPartId === 'head'}
          onMouseEnter={() => setHoveredPart('head')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('head', 'Head')}
        />
        <DiagramLabel
          id="btn-label-ear"
          name="Ear"
          hindi="कान"
          left="37%"
          top="19%"
          isSelected={selectedPartId === 'ear'}
          onMouseEnter={() => setHoveredPart('ear')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('ear', 'Ear')}
        />
        <DiagramLabel
          id="btn-label-hand"
          name="Hand"
          hindi="हाथ"
          left="37%"
          top="45%"
          isSelected={selectedPartId === 'hand'}
          onMouseEnter={() => setHoveredPart('hand')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('hand', 'Hand')}
        />
        <DiagramLabel
          id="btn-label-foot"
          name="Foot"
          hindi="पाँव"
          left="37%"
          top="85%"
          isSelected={selectedPartId === 'foot'}
          onMouseEnter={() => setHoveredPart('foot')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('foot', 'Foot')}
        />

        {/* Back Left Labels */}
        <DiagramLabel
          id="btn-label-hair"
          name="Hair"
          hindi="बाल"
          left="52%"
          top="11%"
          isSelected={selectedPartId === 'hair'}
          onMouseEnter={() => setHoveredPart('hair')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('hair', 'Hair')}
        />
        <DiagramLabel
          id="btn-label-arm"
          name="Arm"
          hindi="बाँह"
          left="52%"
          top="32%"
          isSelected={selectedPartId === 'arm'}
          onMouseEnter={() => setHoveredPart('arm')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('arm', 'Arm')}
        />
        <DiagramLabel
          id="btn-label-elbow"
          name="Elbow"
          hindi="कोहनी"
          left="52%"
          top="39%"
          isSelected={selectedPartId === 'elbow'}
          onMouseEnter={() => setHoveredPart('elbow')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('elbow', 'Elbow')}
        />
        <DiagramLabel
          id="btn-label-finger"
          name="Finger"
          hindi="उँगलियाँ"
          left="52%"
          top="47%"
          isSelected={selectedPartId === 'finger'}
          onMouseEnter={() => setHoveredPart('finger')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('finger', 'Finger')}
        />

        {/* Back Right Labels */}
        <DiagramLabel
          id="btn-label-neck"
          name="Neck"
          hindi="गर्दन"
          left="86%"
          top="25%"
          isSelected={selectedPartId === 'neck'}
          onMouseEnter={() => setHoveredPart('neck')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('neck', 'Neck')}
        />
        <DiagramLabel
          id="btn-label-shoulder"
          name="Shoulder"
          hindi="कंधा"
          left="86%"
          top="32%"
          isSelected={selectedPartId === 'shoulder'}
          onMouseEnter={() => setHoveredPart('shoulder')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('shoulder', 'Shoulder')}
        />
        <DiagramLabel
          id="btn-label-back"
          name="Back"
          hindi="पीठ"
          left="86%"
          top="40%"
          isSelected={selectedPartId === 'back'}
          onMouseEnter={() => setHoveredPart('back')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('back', 'Back')}
        />
        <DiagramLabel
          id="btn-label-buttocks"
          name="Buttocks"
          hindi="नितंब"
          left="86%"
          top="49%"
          isSelected={selectedPartId === 'buttocks'}
          onMouseEnter={() => setHoveredPart('buttocks')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('buttocks', 'Buttocks')}
        />
        <DiagramLabel
          id="btn-label-heel"
          name="Heel"
          hindi="एड़ी"
          left="86%"
          top="86%"
          isSelected={selectedPartId === 'heel'}
          onMouseEnter={() => setHoveredPart('heel')}
          onMouseLeave={() => setHoveredPart(null)}
          onClick={() => handleLabelClick('heel', 'Heel')}
        />
      </div>
    </div>
  );
};

interface DiagramLabelProps {
  id: string;
  name: string;
  hindi: string;
  left: string;
  top: string;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const DiagramLabel: React.FC<DiagramLabelProps> = ({
  id,
  name,
  hindi,
  left,
  top,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ left, top }}
      className={`absolute z-10 -translate-y-1/2 px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer shadow-md flex items-center gap-1.5 whitespace-nowrap ${
        isSelected
          ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white ring-4 ring-rose-300 scale-110 shadow-rose-300/50 shadow-lg animate-pulse'
          : 'bg-white hover:bg-rose-50 text-slate-800 border-2 border-sky-300 hover:border-rose-400 hover:scale-105'
      }`}
    >
      <span className="font-['Baloo_2',sans-serif]">{name}</span>
      <span className={`text-[10px] font-normal hidden sm:inline ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
        ({hindi})
      </span>
      <Volume2 className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-sky-600'}`} />
    </button>
  );
};
