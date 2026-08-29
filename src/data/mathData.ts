import { MathNumber, ShapeItem, AdditionChallenge } from '../types';

export const MATH_NUMBERS: MathNumber[] = [
  { num: 1, word: 'One', countItem: 'Shining Sun', countItemEmoji: '☀️', color: 'from-amber-400 to-orange-500' },
  { num: 2, word: 'Two', countItem: 'Sweet Apples', countItemEmoji: '🍎', color: 'from-rose-400 to-pink-500' },
  { num: 3, word: 'Three', countItem: 'Colorful Balloons', countItemEmoji: '🎈', color: 'from-teal-400 to-emerald-500' },
  { num: 4, word: 'Four', countItem: 'Pretty Flowers', countItemEmoji: '🌸', color: 'from-blue-400 to-indigo-500' },
  { num: 5, word: 'Five', countItem: 'Sweet Mangoes', countItemEmoji: '🥭', color: 'from-yellow-400 to-amber-500' },
  { num: 6, word: 'Six', countItem: 'Little Birds', countItemEmoji: '🐦', color: 'from-emerald-400 to-green-600' },
  { num: 7, word: 'Seven', countItem: 'Rainbow Colors', countItemEmoji: '🌈', color: 'from-violet-400 to-purple-500' },
  { num: 8, word: 'Eight', countItem: 'Happy Fish', countItemEmoji: '🐟', color: 'from-orange-400 to-amber-600' },
  { num: 9, word: 'Nine', countItem: 'Juicy Strawberries', countItemEmoji: '🍓', color: 'from-pink-500 to-rose-600' },
  { num: 10, word: 'Ten', countItem: 'Shining Stars', countItemEmoji: '⭐', color: 'from-cyan-500 to-blue-600' },
  { num: 11, word: 'Eleven', countItem: 'Sweet Candies', countItemEmoji: '🍬', color: 'from-amber-600 to-yellow-600' },
  { num: 12, word: 'Twelve', countItem: 'Twinkling Stars', countItemEmoji: '✨', color: 'from-yellow-500 to-orange-500' },
  { num: 13, word: 'Thirteen', countItem: 'Sweet Cookies', countItemEmoji: '🍪', color: 'from-rose-500 to-red-500' },
  { num: 14, word: 'Fourteen', countItem: 'Little Butterflies', countItemEmoji: '🦋', color: 'from-amber-500 to-orange-600' },
  { num: 15, word: 'Fifteen', countItem: 'Bright Diamonds', countItemEmoji: '💎', color: 'from-indigo-400 to-purple-600' },
  { num: 16, word: 'Sixteen', countItem: 'Yellow Marigolds', countItemEmoji: '🌼', color: 'from-amber-400 to-yellow-500' },
  { num: 17, word: 'Seventeen', countItem: 'Green Leaves', countItemEmoji: '🍃', color: 'from-teal-400 to-emerald-600' },
  { num: 18, word: 'Eighteen', countItem: 'Sweet Cherries', countItemEmoji: '🍒', color: 'from-blue-500 to-cyan-600' },
  { num: 19, word: 'Nineteen', countItem: 'Jumping Frogs', countItemEmoji: '🐸', color: 'from-green-500 to-emerald-600' },
  { num: 20, word: 'Twenty', countItem: 'Golden Bells', countItemEmoji: '🔔', color: 'from-orange-500 to-amber-600' },
];

export const MATH_SHAPES: ShapeItem[] = [
  {
    id: 'circle',
    name: 'Circle',
    hindiName: 'वृत्त / गोल (Gole)',
    culturalExample: 'Sudarshan Chakra / Round Laddoo / Full Moon',
    sides: 0,
    color: 'from-amber-400 to-orange-500',
    svgType: 'circle',
  },
  {
    id: 'triangle',
    name: 'Triangle',
    hindiName: 'त्रिकोण (Trikon)',
    culturalExample: 'Temple Mandir Shikhar & Dhwaja (Saffron Flag)',
    sides: 3,
    color: 'from-rose-500 to-red-500',
    svgType: 'triangle',
  },
  {
    id: 'square',
    name: 'Square',
    hindiName: 'वर्ग (Varg)',
    culturalExample: 'Rangoli Grid & Sacred Yajna Vedi Box',
    sides: 4,
    color: 'from-emerald-400 to-teal-500',
    svgType: 'square',
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    hindiName: 'आयत (Aayat)',
    culturalExample: 'Temple Doorway & Sacred Granth Book',
    sides: 4,
    color: 'from-blue-500 to-indigo-600',
    svgType: 'rectangle',
  },
  {
    id: 'star',
    name: 'Star',
    hindiName: 'तारा (Tara)',
    culturalExample: 'Dhruva Tara (Pole Star) in Night Sky',
    sides: 5,
    color: 'from-yellow-400 to-amber-500',
    svgType: 'star',
  },
  {
    id: 'lotus',
    name: 'Lotus Petal',
    hindiName: 'कमल दल (Kamal Dal)',
    culturalExample: 'Sacred Lotus Bloom for Saraswati & Lakshmi',
    sides: 0,
    color: 'from-pink-400 to-rose-600',
    svgType: 'lotus',
  },
];

const ADDITION_ITEM_POOL = [
  { item: 'red apples', emoji: '🍎', singular: 'apple', prompt: (n1: number, n2: number) => `You have ${n1} red ${n1 === 1 ? 'apple' : 'apples'}, then get ${n2} more!` },
  { item: 'sweet mangoes', emoji: '🥭', singular: 'mango', prompt: (n1: number, n2: number) => `${n1} juicy ${n1 === 1 ? 'mango' : 'mangoes'} in the basket, plus ${n2} on the plate!` },
  { item: 'shining stars', emoji: '⭐', singular: 'star', prompt: (n1: number, n2: number) => `${n1} bright ${n1 === 1 ? 'star' : 'stars'} twinkling, joined by ${n2} more!` },
  { item: 'colorful balloons', emoji: '🎈', singular: 'balloon', prompt: (n1: number, n2: number) => `${n1} floating ${n1 === 1 ? 'balloon' : 'balloons'} and ${n2} pretty ${n2 === 1 ? 'balloon' : 'balloons'}!` },
  { item: 'little birds', emoji: '🐦', singular: 'bird', prompt: (n1: number, n2: number) => `${n1} singing ${n1 === 1 ? 'bird' : 'birds'} on a branch, plus ${n2} flying in!` },
  { item: 'butterflies', emoji: '🦋', singular: 'butterfly', prompt: (n1: number, n2: number) => `${n1} colorful ${n1 === 1 ? 'butterfly' : 'butterflies'}, joined by ${n2} more!` },
  { item: 'happy fish', emoji: '🐟', singular: 'fish', prompt: (n1: number, n2: number) => `${n1} little ${n1 === 1 ? 'fish' : 'fish'} swimming, plus ${n2} more friend ${n2 === 1 ? 'fish' : 'fish'}!` },
  { item: 'fresh flowers', emoji: '🌸', singular: 'flower', prompt: (n1: number, n2: number) => `${n1} blooming ${n1 === 1 ? 'flower' : 'flowers'}, plus ${n2} in the garden!` },
  { item: 'strawberries', emoji: '🍓', singular: 'strawberry', prompt: (n1: number, n2: number) => `${n1} sweet ${n1 === 1 ? 'strawberry' : 'strawberries'} and ${n2} fresh ${n2 === 1 ? 'strawberry' : 'strawberries'}!` },
  { item: 'sweet candies', emoji: '🍬', singular: 'candy', prompt: (n1: number, n2: number) => `${n1} sweet ${n1 === 1 ? 'candy' : 'candies'} on the table, plus ${n2} more!` },
  { item: 'crunchy cookies', emoji: '🍪', singular: 'cookie', prompt: (n1: number, n2: number) => `${n1} crunchy ${n1 === 1 ? 'cookie' : 'cookies'} in the jar, plus ${n2} more!` },
  { item: 'bouncy balls', emoji: '⚽', singular: 'ball', prompt: (n1: number, n2: number) => `${n1} bouncy ${n1 === 1 ? 'ball' : 'balls'} on the lawn, and ${n2} rolling in!` },
  { item: 'golden bells', emoji: '🔔', singular: 'bell', prompt: (n1: number, n2: number) => `${n1} golden ${n1 === 1 ? 'bell' : 'bells'} ringing, plus ${n2} more!` },
  { item: 'jumping frogs', emoji: '🐸', singular: 'frog', prompt: (n1: number, n2: number) => `${n1} green ${n1 === 1 ? 'frog' : 'frogs'} on the lily pad, plus ${n2} jumping over!` },
];

export function generateRandomAdditionChallenges(count = 10): AdditionChallenge[] {
  const challenges: AdditionChallenge[] = [];
  const shuffledItems = [...ADDITION_ITEM_POOL].sort(() => Math.random() - 0.5);
  const usedPairs = new Set<string>();

  for (let i = 0; i < count; i++) {
    // Generate distinct random (n1, n2) pairs between 1 and 5
    let n1 = Math.floor(Math.random() * 5) + 1;
    let n2 = Math.floor(Math.random() * 5) + 1;
    let pairKey = `${n1}+${n2}`;
    let attempts = 0;
    
    while (usedPairs.has(pairKey) && attempts < 20) {
      n1 = Math.floor(Math.random() * 5) + 1;
      n2 = Math.floor(Math.random() * 5) + 1;
      pairKey = `${n1}+${n2}`;
      attempts++;
    }
    usedPairs.add(pairKey);

    const answer = n1 + n2;
    const itemConfig = shuffledItems[i % shuffledItems.length];

    // Generate 3 unique options including the correct answer
    const optionsSet = new Set<number>([answer]);
    const offsets = [-2, -1, 1, 2, 3].sort(() => Math.random() - 0.5);
    
    for (const offset of offsets) {
      const candidate = answer + offset;
      if (candidate > 0 && candidate <= 12 && !optionsSet.has(candidate)) {
        optionsSet.add(candidate);
      }
      if (optionsSet.size === 3) break;
    }

    // Fallback if set size < 3
    let fallbackNum = 1;
    while (optionsSet.size < 3) {
      if (!optionsSet.has(fallbackNum)) {
        optionsSet.add(fallbackNum);
      }
      fallbackNum++;
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    challenges.push({
      id: i + 1,
      num1: n1,
      num2: n2,
      item: itemConfig.item,
      itemEmoji: itemConfig.emoji,
      title: itemConfig.prompt(n1, n2),
      answer,
      options,
    });
  }

  return challenges;
}

export const ADDITION_CHALLENGES = generateRandomAdditionChallenges(10);

