import { ShlokaItem, RhymeItem } from '../types';

export const SHLOKAS_DATA: ShlokaItem[] = [
  {
    id: 'vakratunda',
    title: 'Vakratunda Mahakaya (वक्रतुण्ड महाकाय)',
    deityOrTheme: 'Bal Ganesha (Remover of Obstacles)',
    sanskrit: [
      'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
      'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'
    ],
    transliteration: [
      'Vakratunda Mahakaya, Surya Koti Samaprabha,',
      'Nirvighnam Kuru Me Deva, Sarva Karyeshu Sarvada.'
    ],
    simpleMeaning: 'O dear Bal Ganesha with a curved trunk and a radiant golden glow like a million suns! Please remove all obstacles and guide my learning and play with joy!',
    iconEmoji: '🐘',
    audioKey: 'vakratunda',
  },
  {
    id: 'saraswati',
    title: 'Saraswati Namastubhyam (सरस्वती नमस्तुभ्यं)',
    deityOrTheme: 'Mata Saraswati (Goddess of Learning & Arts)',
    sanskrit: [
      'सरस्वती नमस्तुभ्यं वरदे कामरूपिणी।',
      'विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥'
    ],
    transliteration: [
      'Saraswati Namastubhyam, Varade Kama Roopini,',
      'Vidyarambham Karishyami, Siddhir Bhavatu Me Sada.'
    ],
    simpleMeaning: 'Salutations to loving Mother Saraswati who blesses us with music, wisdom, and kind words. As I start learning my letters and numbers today, may I always learn happily!',
    iconEmoji: '🪷',
    audioKey: 'saraswati',
  },
  {
    id: 'gayatri',
    title: 'Gayatri Mantra (गायत्री महामंत्र)',
    deityOrTheme: 'Surya Dev & Cosmic Light',
    sanskrit: [
      'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं।',
      'भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥'
    ],
    transliteration: [
      'Om Bhur Bhuvaḥ Swaḥ, Tat Savitur Vareṇyam,',
      'Bhargo Devasya Dheemahi, Dhiyo Yo Naḥ Prachodayāt.'
    ],
    simpleMeaning: 'We meditate on the supreme radiant golden light of the divine sun that fills the earth, sky, and heavens. May that light inspire our young minds with gentle wisdom and clarity!',
    iconEmoji: '☀️',
    audioKey: 'gayatri',
  },
  {
    id: 'guru-brahma',
    title: 'Guru Vandana (गुरुर्ब्रह्मा गुरुर्विष्णुः)',
    deityOrTheme: 'Teachers, Parents & Gurus',
    sanskrit: [
      'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।',
      'गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥'
    ],
    transliteration: [
      'Gurur Brahma Gurur Vishnuh, Gurur Devo Maheshwarah,',
      'Guruh Sakshat Param Brahma, Tasmai Shri Gurave Namah.'
    ],
    simpleMeaning: 'My teachers and loving parents are like wonderful creators, protectors, and guides. I bow with folded hands and love to all who teach me good things!',
    iconEmoji: '🙏',
    audioKey: 'guru',
  },
  {
    id: 'sarve-bhavantu',
    title: 'Universal Peace (सर्वे भवन्तु सुखिनः)',
    deityOrTheme: 'Peace & Happiness for All Beings',
    sanskrit: [
      'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।',
      'सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्॥'
    ],
    transliteration: [
      'Sarve Bhavantu Sukhinah, Sarve Santu Niramayah,',
      'Sarve Bhadrani Pashyantu, Maa Kashchid Dukha Bhag Bhavet.'
    ],
    simpleMeaning: 'May all children, parents, birds, animals, and trees in the world be happy! May everyone stay healthy, see goodness everywhere, and live in peaceful joy!',
    iconEmoji: '🕊️',
    audioKey: 'shanti',
  },
];

export const ENGLISH_RHYMES: RhymeItem[] = [
  {
    id: 'twinkle',
    title: 'Twinkle Twinkle Little Star (Dhruva Tara)',
    language: 'english',
    lyrics: [
      'Twinkle, twinkle, little star,',
      'How I wonder what you are!',
      'Up above the world so high,',
      'Like a diamond in the sky.',
      'Shining with a golden gleam,',
      'Guiding every happy dream!'
    ],
    iconEmoji: '⭐',
    color: 'from-amber-400 to-indigo-600',
  },
  {
    id: 'peacock-rain',
    title: 'Little Peacock in the Rain (Mayur Dance)',
    language: 'english',
    lyrics: [
      'Pitter-patter falls the rain,',
      'Wash away the summer pain!',
      'Little peacock spreads his wings,',
      'Dancing round in cheerful rings.',
      'Green and blue and purple bright,',
      'Oh, what a joyful festive sight!'
    ],
    iconEmoji: '🦚',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'happy-know-it',
    title: 'If You’re Happy & You Know It (Clap Hands & Say Ram!)',
    language: 'english',
    lyrics: [
      'If you’re happy and you know it, clap your hands! (Clap, clap!)',
      'If you’re happy and you know it, tap your feet! (Tap, tap!)',
      'If you’re happy and you know it, give a smile!',
      'If you’re happy and you know it, say "Namaste!" (Namaste!)'
    ],
    iconEmoji: '😊',
    color: 'from-pink-500 to-rose-600',
  },
];
