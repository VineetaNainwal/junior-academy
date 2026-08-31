import React, { useState, useEffect } from 'react';
import { SanatanTopicItem } from '../../types';

interface SanatanArtworkProps {
  item: SanatanTopicItem;
  size?: 'card' | 'large' | 'medium' | 'small' | 'spotlight';
  showOverlayText?: boolean;
}

export const SanatanArtwork: React.FC<SanatanArtworkProps> = ({
  item,
  size = 'spotlight',
  showOverlayText = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const effectiveImageUrl = item.imageUrl;

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [effectiveImageUrl, item.id]);

  // Height mappings based on size
  const getHeightClass = () => {
    switch (size) {
      case 'spotlight':
        return 'h-52 sm:h-64 md:h-72';
      case 'card':
        return 'h-40 sm:h-48';
      case 'large':
        return 'h-64 sm:h-80';
      case 'medium':
        return 'h-44 sm:h-52';
      case 'small':
        return 'h-28 sm:h-36';
      default:
        return 'h-52 sm:h-64';
    }
  };

  const hasRealImage = Boolean(effectiveImageUrl) && !imageError;

  return (
    <div
      className={`relative w-full ${getHeightClass()} rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border-2 border-slate-200 bg-gradient-to-br ${
        item.artTheme.bgGradient
      } flex flex-col items-center justify-center select-none group transition-all duration-300`}
    >
      {/* Real Image Loader */}
      {hasRealImage && (
        <img
          src={effectiveImageUrl}
          alt={item.title}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Fallback Illustrated Artwork when image is not present or while loading */}
      {(!hasRealImage || !imageLoaded) && (
        <>
          {/* Radial soft lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-black/25 pointer-events-none" />

          {/* Temple Arch Filigree Top */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-black/25 to-transparent flex items-center justify-between px-3 text-amber-200 text-xs font-['Baloo_2',sans-serif] pointer-events-none z-10">
            <span>ॐ</span>
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px] font-black text-white drop-shadow">
              ✦ BAL VIDYA SANATAN ✦
            </span>
            <span>卐</span>
          </div>

          {/* Floating animated sparkles */}
          <div className="absolute top-3 left-3 text-amber-200/60 text-xs">🪷</div>
          <div className="absolute top-3 right-3 text-amber-200/60 text-xs">✨</div>
          <div className="absolute bottom-3 left-3 text-amber-200/60 text-xs">🪔</div>
          <div className="absolute bottom-3 right-3 text-amber-200/60 text-xs">🪷</div>

          {/* Divine Radiant Halo & Center Avatar */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
            <div className="relative flex items-center justify-center">
              {/* Glowing Halo */}
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-yellow-300/40 via-white/30 to-transparent animate-pulse blur-md" />
              
              {/* Character Box */}
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white/30 backdrop-blur-md border-2 sm:border-3 border-white/60 shadow-lg flex items-center justify-center text-5xl sm:text-6xl transform transition-transform duration-300 group-hover:scale-105">
                <span className="drop-shadow-lg">{item.artTheme.badgeEmoji}</span>
              </div>

              {/* Avatar Symbol Pill */}
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md border-2 border-white">
                {item.artTheme.avatarSymbol}
              </div>
            </div>

            {/* Optional Overlay Text inside the art box if enabled */}
            {showOverlayText && (
              <div className="mt-2 drop-shadow z-10">
                <div className="text-amber-200 text-xs font-bold font-['Baloo_2',sans-serif]">
                  {item.hindiTitle}
                </div>
                <div className="text-white font-extrabold text-sm sm:text-base font-['Baloo_2',sans-serif]">
                  {item.title}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Subtle Corner Badge for Category */}
      <div className="absolute top-2.5 left-2.5 z-20">
        <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-black border border-white/20 shadow-xs flex items-center gap-1">
          <span>{item.artTheme.badgeEmoji}</span>
          <span>{item.keySymbol}</span>
        </span>
      </div>

      {/* Bottom Floating Attribute Ribbon */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] sm:text-xs font-bold text-white bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 z-20 shadow-sm font-['Nunito',sans-serif]">
        <span className="truncate max-w-[65%] text-amber-200 font-extrabold">
          {item.sacredAttribute}
        </span>
        <span className="text-amber-300 font-black shrink-0 font-['Baloo_2',sans-serif]">
          {item.sanskritTitle || item.hindiTitle}
        </span>
      </div>
    </div>
  );
};

