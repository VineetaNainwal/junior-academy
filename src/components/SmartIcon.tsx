import React from 'react';

interface SmartIconProps {
  name: string; // Emoji character or icon name (e.g. '🪔', '🪷', '🪈', '🐘', '🦚', '🟡', '🕉️', 'diya', 'lotus', etc.)
  className?: string;
  size?: number | string;
  alt?: string;
}

/**
 * SmartIcon ensures 100% reliable icon rendering across all browsers,
 * mobile OSes, and desktop platforms by providing crisp vector SVG fallbacks
 * for Indian cultural icons (Diya, Lotus, Flute, Temple, Modak, Om, Damru, etc.)
 * alongside robust multi-platform emoji typography.
 */
export const SmartIcon: React.FC<SmartIconProps> = ({
  name,
  className = '',
  size = 28,
  alt = '',
}) => {
  const cleanName = (name || '').trim();

  // 1. Diya (दीपक / Lamp)
  if (cleanName === '🪔' || cleanName.toLowerCase() === 'diya' || cleanName.toLowerCase() === 'deepak') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Diya'}
      >
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="clayPot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Glow halo */}
        <circle cx="32" cy="20" r="18" fill="url(#flameGlow)" opacity="0.85" />
        {/* Outer Flame */}
        <path
          d="M32 4 C37 12, 43 20, 39 27 C36 32, 28 32, 25 27 C21 20, 27 12, 32 4 Z"
          fill="#F59E0B"
        />
        {/* Inner Flame */}
        <path
          d="M32 9 C35 15, 38 21, 36 26 C34 29, 30 29, 28 26 C26 21, 29 15, 32 9 Z"
          fill="#FEF08A"
        />
        {/* Clay base */}
        <path
          d="M10 36 C12 50, 52 50, 54 36 C55 33, 9 33, 10 36 Z"
          fill="url(#clayPot)"
        />
        {/* Decorative Gold Rim */}
        <ellipse cx="32" cy="36" rx="22" ry="4.5" fill="url(#goldRim)" />
        <ellipse cx="32" cy="35" rx="19" ry="3" fill="#9A3412" />
        {/* Oil reservoir glow */}
        <ellipse cx="32" cy="35" rx="14" ry="2" fill="#FBBF24" opacity="0.6" />
        {/* Base Stand */}
        <path
          d="M26 48 C28 54, 36 54, 38 48 Z"
          fill="#7C2D12"
        />
      </svg>
    );
  }

  // 2. Lotus (कमल / Sacred Lotus Flower)
  if (cleanName === '🪷' || cleanName.toLowerCase() === 'lotus' || cleanName.toLowerCase() === 'kamal') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Lotus'}
      >
        <defs>
          <linearGradient id="lotusPink1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#BE185D" />
            <stop offset="60%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#FBCFE8" />
          </linearGradient>
          <linearGradient id="lotusPink2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#FDF2F8" />
          </linearGradient>
          <linearGradient id="lotusCenter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
        </defs>
        {/* Left background petals */}
        <path d="M32 46 C20 44, 8 36, 10 24 C14 20, 24 30, 32 46 Z" fill="url(#lotusPink1)" opacity="0.9" />
        {/* Right background petals */}
        <path d="M32 46 C44 44, 56 36, 54 24 C50 20, 40 30, 32 46 Z" fill="url(#lotusPink1)" opacity="0.9" />
        {/* Left inner petal */}
        <path d="M32 48 C18 42, 14 26, 22 14 C27 22, 30 36, 32 48 Z" fill="url(#lotusPink2)" />
        {/* Right inner petal */}
        <path d="M32 48 C46 42, 50 26, 42 14 C37 22, 34 36, 32 48 Z" fill="url(#lotusPink2)" />
        {/* Center Main Petal */}
        <path d="M32 50 C26 38, 24 20, 32 8 C40 20, 38 38, 32 50 Z" fill="url(#lotusPink1)" />
        {/* Golden seed pod / center */}
        <circle cx="32" cy="40" r="4" fill="url(#lotusCenter)" />
        {/* Green leaf base pad */}
        <path d="M16 52 C24 57, 40 57, 48 52 C42 55, 22 55, 16 52 Z" fill="#059669" />
      </svg>
    );
  }

  // 3. Flute / Bansuri (बांसुरी)
  if (cleanName === '🪈' || cleanName.toLowerCase() === 'flute' || cleanName.toLowerCase() === 'bansuri') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Flute'}
      >
        <defs>
          <linearGradient id="bambooGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="peacockFeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Flute Body */}
        <rect
          x="10"
          y="28"
          width="48"
          height="8"
          rx="4"
          transform="rotate(-28 32 32)"
          fill="url(#bambooGold)"
          stroke="#92400E"
          strokeWidth="1"
        />
        {/* Red decorative bands */}
        <rect x="18" y="27" width="2.5" height="10" rx="1" transform="rotate(-28 32 32)" fill="#DC2626" />
        <rect x="46" y="27" width="2.5" height="10" rx="1" transform="rotate(-28 32 32)" fill="#DC2626" />
        {/* Finger Holes */}
        <circle cx="28" cy="32" r="1.5" fill="#451A03" />
        <circle cx="34" cy="29" r="1.5" fill="#451A03" />
        <circle cx="40" cy="26" r="1.5" fill="#451A03" />
        <circle cx="46" cy="23" r="1.5" fill="#451A03" />
        {/* Peacock feather attached to tip */}
        <path
          d="M14 42 C10 46, 6 54, 8 58 C12 60, 20 54, 22 48 Z"
          fill="url(#peacockFeather)"
        />
        <circle cx="13" cy="52" r="3" fill="#0284C7" />
        <circle cx="13" cy="52" r="1.5" fill="#FDE047" />
      </svg>
    );
  }

  // 4. Modak (मोदक / Sweet)
  if (cleanName === '🟡' || cleanName.toLowerCase() === 'modak') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Modak'}
      >
        <defs>
          <linearGradient id="modakYellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Modak Body */}
        <path
          d="M32 6 C33 6, 48 24, 48 40 C48 52, 16 52, 16 40 C16 24, 31 6, 32 6 Z"
          fill="url(#modakYellow)"
        />
        {/* Pleat grooves */}
        <path d="M32 8 Q24 28 20 44" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M32 8 Q28 28 27 48" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M32 8 Q36 28 37 48" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M32 8 Q40 28 44 44" stroke="#D97706" strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Saffron Tika at top tip */}
        <circle cx="32" cy="7" r="2" fill="#DC2626" />
      </svg>
    );
  }

  // 5. Hindu Temple (मंदिर / Mandir)
  if (cleanName === '🛕' || cleanName.toLowerCase() === 'temple' || cleanName.toLowerCase() === 'mandir') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Mandir'}
      >
        <defs>
          <linearGradient id="sandstone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
        </defs>
        {/* Plinth */}
        <rect x="8" y="52" width="48" height="6" rx="2" fill="#9A3412" />
        <rect x="12" y="46" width="40" height="6" fill="#C2410C" />
        {/* Main Chamber Pillars */}
        <rect x="16" y="30" width="6" height="16" fill="#FED7AA" />
        <rect x="42" y="30" width="6" height="16" fill="#FED7AA" />
        <rect x="14" y="28" width="36" height="4" rx="1" fill="#EA580C" />
        {/* Inner sanctum arch */}
        <path d="M22 46 L22 36 Q32 30 42 36 L42 46 Z" fill="#451A03" />
        <circle cx="32" cy="40" r="3" fill="#FBBF24" />
        {/* Shikhar (Tower) */}
        <path d="M18 28 C22 18, 26 12, 32 8 C38 12, 42 18, 46 28 Z" fill="url(#sandstone)" />
        {/* Kalash on peak */}
        <ellipse cx="32" cy="7" rx="3" ry="2" fill="#FBBF24" />
        {/* Saffron Flag (Dhwaja) */}
        <path d="M32 7 L32 2 L42 4.5 L32 7 Z" fill="#F97316" />
      </svg>
    );
  }

  // 6. Damru (डमरू / Drum)
  if (cleanName === '🪘' || cleanName.toLowerCase() === 'damru') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Damru'}
      >
        <defs>
          <linearGradient id="damruWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        {/* Hourglass Wood Body */}
        <path d="M16 14 C28 28, 28 36, 16 50 L48 50 C36 36, 36 28, 48 14 Z" fill="url(#damruWood)" />
        {/* Top & Bottom Leather Rims */}
        <ellipse cx="32" cy="14" rx="16" ry="4" fill="#FEF08A" stroke="#78350F" strokeWidth="1.5" />
        <ellipse cx="32" cy="50" rx="16" ry="4" fill="#FEF08A" stroke="#78350F" strokeWidth="1.5" />
        {/* Cords */}
        <line x1="20" y1="16" x2="32" y2="32" stroke="#451A03" strokeWidth="1" />
        <line x1="44" y1="16" x2="32" y2="32" stroke="#451A03" strokeWidth="1" />
        <line x1="20" y1="48" x2="32" y2="32" stroke="#451A03" strokeWidth="1" />
        <line x1="44" y1="48" x2="32" y2="32" stroke="#451A03" strokeWidth="1" />
        {/* Clapper Balls */}
        <circle cx="14" cy="30" r="3" fill="#DC2626" />
        <circle cx="50" cy="34" r="3" fill="#DC2626" />
      </svg>
    );
  }

  // 7. Om (ॐ / Aum)
  if (cleanName === '🕉️' || cleanName === 'ॐ' || cleanName.toLowerCase() === 'om') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Om'}
      >
        <defs>
          <linearGradient id="omGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" />
        <text
          x="32"
          y="42"
          fontFamily="'Baloo 2', 'Rozha One', sans-serif"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle"
          fill="url(#omGold)"
        >
          ॐ
        </text>
      </svg>
    );
  }

  // 8. Potted Plant / Gamla (गमला / Plant Pot)
  if (cleanName === '🪴' || cleanName.toLowerCase() === 'gamla' || cleanName.toLowerCase() === 'pot') {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`inline-block drop-shadow-sm ${className}`}
        aria-label={alt || 'Gamla'}
      >
        <defs>
          <linearGradient id="potClay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="60%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
          <linearGradient id="plantLeaf" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        {/* Pot Base */}
        <polygon points="16,34 48,34 44,58 20,58" fill="url(#potClay)" />
        <rect x="14" y="29" width="36" height="6" rx="2" fill="#EA580C" />
        <line x1="14" y1="35" x2="50" y2="35" stroke="#9A3412" strokeWidth="1" />
        {/* Soil */}
        <ellipse cx="32" cy="30" rx="16" ry="2.5" fill="#451A03" />
        {/* Main Stem & Leaves */}
        <path d="M32 30 Q32 18 32 10" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Left Leaves */}
        <path d="M32 24 C22 22, 14 16, 16 10 C24 10, 30 18, 32 24 Z" fill="url(#plantLeaf)" />
        <path d="M32 18 C26 14, 20 8, 24 4 C30 5, 31 12, 32 18 Z" fill="url(#plantLeaf)" />
        {/* Right Leaves */}
        <path d="M32 22 C42 20, 50 14, 48 8 C40 8, 34 16, 32 22 Z" fill="url(#plantLeaf)" />
        <path d="M32 14 C38 10, 44 4, 40 1 C34 2, 33 10, 32 14 Z" fill="url(#plantLeaf)" />
        {/* Blossom on Top */}
        <circle cx="32" cy="7" r="4" fill="#F43F5E" />
        <circle cx="32" cy="7" r="1.5" fill="#FDE047" />
      </svg>
    );
  }

  // Default: Fallback styled emoji rendering with cross-platform emoji font stack
  return (
    <span
      className={`inline-flex items-center justify-center select-none font-['Noto_Color_Emoji','Apple_Color_Emoji','Segoe_UI_Emoji','Segoe_UI_Symbol','Baloo_2',sans-serif] leading-none ${className}`}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
      role="img"
      aria-label={alt || cleanName}
    >
      {cleanName}
    </span>
  );
};
