export type AgeGroup = '2-3' | '3-4' | '4-6';

export type SubjectTab = 'home' | 'english' | 'math' | 'hindi' | 'gk' | 'rhymes' | 'sanatan' | 'games' | 'shlokas';

export type SanatanCategory = 'gods' | 'shlokas' | 'yugas' | 'vedas' | 'festivals' | 'values';

export interface SanatanTopicItem {
  id: string;
  category: SanatanCategory;
  title: string;
  hindiTitle: string;
  sanskritTitle?: string;
  subtitle: string;
  imageUrl: string;
  introduction: string[]; // 2-3 line child-friendly introduction
  hindiIntroduction?: string[];
  
  // Specific to Gods & Goddesses
  vahana?: string;
  vahanaHindi?: string;
  symbols?: string[];
  favoritePrasad?: string;
  favoritePrasadHindi?: string;
  blessing?: string;
  blessingHindi?: string;

  // Specific to Basic Shlokas (ONLY in shlokas category)
  shloka?: {
    title: string;
    sanskrit: string[];
    transliteration: string[];
    audioText: string;
    englishMeaning: string;
    hindiMeaning: string;
    whenToChant?: string;
    whenToChantHindi?: string;
  };

  // Specific to Yugas
  eraName?: string;
  dharmaPillars?: string;
  keyAvatars?: string[];
  moralLesson?: string;
  moralLessonHindi?: string;

  // Specific to Vedas & Puranas
  vedaTheme?: string;
  vedaThemeHindi?: string;
  keyWisdom?: string[];
  keyWisdomHindi?: string[];

  // Specific to Festivals
  festiveMonth?: string;
  festiveMonthHindi?: string;
  howKidsCelebrate?: string[];
  howKidsCelebrateHindi?: string[];
  festiveTreats?: string;
  festiveTreatsHindi?: string;

  // Specific to Values & Culture
  practicalHabit?: string;
  practicalHabitHindi?: string;
  goldenRule?: string;
  goldenRuleHindi?: string;

  artTheme: {
    primaryColor: string;
    bgGradient: string;
    badgeEmoji: string;
    avatarSymbol: string;
    illustrationType: string;
  };
  keySymbol: string;
  sacredAttribute: string;
  funFactForKids: string;
  funFactForKidsHindi?: string;
}

export interface RhymeCardItem {
  id: string;
  title: string;
  hindiTitle?: string;
  language: 'hindi' | 'english';
  tagline: string;
  lyrics: string[];
  phoneticLyrics?: string[];
  translation?: string[];
  iconEmoji: string;
  illustrationType: string;
  color: string;
  bgGradient: string;
  themeCharacters: string[];
}

export interface EnglishLetter {
  letter: string;
  lowercase: string;
  phonic: string;
  word: string;
  hindiMeaning: string;
  iconName: string;
  themeWord: string;
  exampleSentence: string;
  color: string;
}

export interface HindiLetter {
  char: string;
  name: string;
  roman: string;
  word: string;
  wordEnglish: string;
  type: 'swar' | 'vyanjan';
  iconEmoji: string;
  exampleSentence: string;
  color: string;
  phoneticPronounce?: string;
}

export interface MathNumber {
  num: number;
  word: string;
  hindiWord?: string;
  hindiNum?: string;
  countItem: string;
  countItemEmoji: string;
  color: string;
}

export interface ShapeItem {
  id: string;
  name: string;
  hindiName: string;
  culturalExample: string;
  sides: number;
  color: string;
  svgType: 'circle' | 'triangle' | 'square' | 'rectangle' | 'star' | 'lotus' | 'oval';
}

export interface BodyPartItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'head' | 'upper' | 'lower' | 'senses';
  functionText: string;
  hindiFunction?: string;
  funFact: string;
  count: string;
  iconEmoji: string;
  color: string;
  positionPercent?: { top: number; left: number };
  view?: 'front' | 'back' | 'both';
  side?: 'left' | 'right';
}

export interface WeekDayItem {
  id: string;
  name: string;
  hindiName: string;
  order: number;
  rulingPlanet: string;
  funActivity: string;
  type: 'weekday' | 'weekend';
  iconEmoji: string;
  color: string;
}

export interface MonthItem {
  id: string;
  name: string;
  hindiName: string;
  monthNumber: number;
  days: number;
  season: string;
  highlights: string;
  funFact: string;
  iconEmoji: string;
  color: string;
}

export interface SeasonItem {
  id: string;
  name: string;
  hindiName: string;
  sanskritName: string;
  months: string;
  weather: string;
  clothes: string;
  foods: string;
  features: string[];
  funFact: string;
  iconEmoji: string;
  color: string;
}

export interface PlanetItem {
  id: string;
  name: string;
  hindiName: string;
  orderFromSun: number;
  planetType: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Dwarf Planet';
  distanceOrder: string;
  diameter: string;
  moonsCount: number;
  temperature: string;
  funFact: string;
  features: string[];
  iconEmoji: string;
  color: string;
  gradient: string;
}

export interface ContinentItem {
  id: string;
  name: string;
  hindiName: string;
  orderBySize: number;
  sizeRank: string;
  landmarks: string[];
  wildlife: string[];
  funFact: string;
  countriesCount: string;
  color: string;
  iconEmoji: string;
  highlightFact: string;
}

export interface FestivalItem {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  celebration: string;
  iconEmoji: string;
  color: string;
  funFact: string;
  soundEffect: 'diya' | 'sparkle' | 'flute' | 'bell' | 'tabla';
}

export interface SacredAnimal {
  id: string;
  name: string;
  hindiName: string;
  sanskritName: string;
  symbolism: string;
  funFact: string;
  soundText: string;
  iconEmoji: string;
  color: string;
}

export interface ShlokaItem {
  id: string;
  title: string;
  sanskrit: string[];
  transliteration: string[];
  simpleMeaning: string;
  deityOrTheme: string;
  iconEmoji: string;
  audioKey: string;
}

export interface RhymeItem {
  id: string;
  title: string;
  hindiTitle?: string;
  language: 'english' | 'hindi';
  lyrics: string[];
  phoneticLyrics?: string[];
  translation?: string[];
  iconEmoji: string;
  color: string;
}

export interface MoralStory {
  id: string;
  title: string;
  hindiTitle: string;
  characters: string[];
  scenes: {
    text: string;
    hindiText: string;
    sceneEmoji: string;
  }[];
  moral: string;
  moralHindi: string;
}

export interface AdditionChallenge {
  id: number;
  num1: number;
  num2: number;
  item: string;
  itemEmoji: string;
  title: string;
  answer: number;
  options: number[];
}

export interface Badge {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  iconEmoji: string;
  unlocked: boolean;
  category: 'english' | 'math' | 'hindi' | 'gk' | 'games' | 'special';
}
