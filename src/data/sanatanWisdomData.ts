import { SanatanTopicItem, SanatanCategory } from '../types';

export interface SanatanSubsectionConfig {
  id: SanatanCategory;
  name: string;
  hindiName: string;
  description: string;
  iconEmoji: string;
  themeColor: string;
  accentGradient: string;
}

export const SANATAN_SUBSECTIONS: SanatanSubsectionConfig[] = [
  {
    id: 'gods',
    name: 'Gods & Goddesses',
    hindiName: 'देव एवं देवियाँ',
    description: 'Loving divine forms, their vahanas, sweet prasad, and stories',
    iconEmoji: '🪷',
    themeColor: 'amber-600',
    accentGradient: 'from-amber-500 via-orange-500 to-amber-600',
  },
  {
    id: 'shlokas',
    name: 'Basic Shlokas',
    hindiName: 'दैनिक सरल श्लोक',
    description: 'Morning, study, mealtime, and bedtime sacred prayers & mantras',
    iconEmoji: '📜',
    themeColor: 'orange-600',
    accentGradient: 'from-orange-500 via-amber-500 to-rose-600',
  },
  {
    id: 'yugas',
    name: 'Four Yugas',
    hindiName: 'चार युग व काल-चक्र',
    description: 'The four cosmic ages of truth, righteousness, and cosmic balance',
    iconEmoji: '⌛',
    themeColor: 'yellow-600',
    accentGradient: 'from-yellow-500 via-amber-600 to-orange-600',
  },
  {
    id: 'vedas',
    name: 'Vedas & Puranas',
    hindiName: 'वेद, उपनिषद व पुराण',
    description: 'Ancient repositories of music, natural healing, mantras, and stories',
    iconEmoji: '📖',
    themeColor: 'emerald-600',
    accentGradient: 'from-emerald-500 via-teal-600 to-amber-600',
  },
  {
    id: 'festivals',
    name: 'Sacred Festivals',
    hindiName: 'पवित्र पर्व व उत्सव',
    description: 'Diwali, Holi, Janmashtami, Raksha Bandhan, and joyful traditions',
    iconEmoji: '🪔',
    themeColor: 'rose-600',
    accentGradient: 'from-rose-500 via-pink-600 to-amber-600',
  },
  {
    id: 'values',
    name: 'Values & Culture',
    hindiName: 'संस्कार व सद्गुण',
    description: 'Compassion (Ahimsa), respect for elders, truth, and world family',
    iconEmoji: '🕊️',
    themeColor: 'indigo-600',
    accentGradient: 'from-indigo-500 via-purple-600 to-amber-600',
  },
];

export const SANATAN_WISDOM_DATA: SanatanTopicItem[] = [
  // =========================================================================
  // 1. GODS & GODDESSES (देव एवं देवियाँ) - Focus on Divine Forms, Vahana & Stories
  // =========================================================================
  {
    id: 'bal-ganesha',
    category: 'gods',
    title: 'Lord Ganesha',
    hindiTitle: 'श्री गणेश (विघ्नहर्ता)',
    sanskritTitle: 'श्रीगणेशाय नमः',
    subtitle: 'Beloved Son of Shiva & Parvati, Remover of All Obstacles',
    imageUrl: '/images/sanatan/gods/lord-ganesha.jpg',
    introduction: [
      'Lord Ganesha is the friendly, cheerful deity with an elephant face and twinkling kind eyes.',
      'He loves sweet warm modaks and rides his swift, loyal companion Mooshak the little mouse.',
      'Before starting any new drawing, school work, or festival, we greet Him with "Shree Ganeshay Namah"!'
    ],
    hindiIntroduction: [
      'भगवान श्री गणेश जी गजमुख वाले अत्यंत कृपालु और प्रसन्न देव हैं, जिनकी दृष्टि ज्ञान और मंगल देने वाली है।',
      'उन्हें मीठे-मीठे मोदक बहुत प्रिय हैं और वे अपने नन्हे वाहन मूषक राज पर सवारी करते हैं।',
      'कोई भी नया शुभ कार्य, पढ़ाई या कला शुरू करने से पहले हम गणेश जी की वंदना करते हैं।'
    ],
    vahana: 'Mooshak (The swift little mouse)',
    vahanaHindi: 'मूषक राज (छोटा और चंचल चूहा)',
    symbols: ['Modak (Sweet joy)', 'Lotus (Purity)', 'Ankusha (Focus)', 'Abhaya Mudra (Blessing)'],
    favoritePrasad: 'Fresh Golden Modaks & Motichoor Laddus',
    favoritePrasadHindi: 'मोदक और मोतीचूर के लड्डू',
    blessing: 'Wisdom, sharp memory, creative talents, and smooth success in every task.',
    blessingHindi: 'सद्बुद्धि, उत्तम विद्या और सब विघ्नों का नाश।',
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-600 via-orange-600 to-yellow-600',
      badgeEmoji: '🐘',
      avatarSymbol: 'ॐ',
      illustrationType: 'ganesha',
    },
    keySymbol: '🪷 Modak & Lotus',
    sacredAttribute: 'Pratham Pujya (First Worshipped)',
    funFactForKids: 'Ganesha wrote down the entire great epic Mahabharata as Sage Vyasa spoke!',
    funFactForKidsHindi: 'महर्षि वेदव्यास जी के मुख से महाभारत सुनकर स्वयं गणेश जी ने अपनी लेखनी से लिखा था!',
  },
  {
    id: 'shree-krishna',
    category: 'gods',
    title: 'Lord Krishna',
    hindiTitle: 'श्री कृष्ण (गोपाल)',
    sanskritTitle: 'श्रीकृष्णाय नमः',
    subtitle: 'Playful Little Makhan Chor, Friend of Cows, Flute Player',
    imageUrl: '/images/sanatan/gods/lord-krishna.jpg',
    introduction: [
      'Little Krishna is the dark-cloud complexioned divine child who wears a brilliant peacock feather in His crown.',
      'He plays the melodious flute that makes deer, calves, and white cows dance with happiness in Vrindavan.',
      'He is everyone\'s dearest friend who taught us love, courage, and standing up for truth!'
    ],
    hindiIntroduction: [
      'भगवान श्री कृष्ण जी मोरमुकुटधारी, बाँसुरी बजाने वाले और सभी के परम सखा हैं।',
      'उनकी मधुर मुरली की धुन सुनकर गौमाताएं, बछड़े और सारे ग्वाल-बाल आनंद से झूम उठते थे।',
      'वे माखन मिश्री के प्रेमी और हमें प्रेम, साहस और धर्म के मार्ग पर चलना सिखाते हैं।'
    ],
    vahana: 'Garuda (Divine eagle) & Kamadhenu cows',
    vahanaHindi: 'गरुड़ देव व सुरभि गौमाताएं',
    symbols: ['Bansuri (Flute of harmony)', 'Peacock Feather (Beauty)', 'Butter Pot (Pure Love)'],
    favoritePrasad: 'Fresh White Butter (Makhan) with Sweet Mishri',
    favoritePrasadHindi: 'घर का ताजा मक्खन और मिश्री',
    blessing: 'Joyful happiness, sweet speech, friendship, and fearlessness.',
    blessingHindi: 'निर्मल आनंद, मधुर वाणी और सबको प्रेम करने का संस्कार।',
    artTheme: {
      primaryColor: 'sky',
      bgGradient: 'from-sky-600 via-blue-700 to-indigo-900',
      badgeEmoji: '🪈',
      avatarSymbol: '🦚',
      illustrationType: 'krishna',
    },
    keySymbol: '🦚 Peacock Feather & Flute',
    sacredAttribute: 'Ananda Rupa (Form of Pure Joy)',
    funFactForKids: 'Little Krishna lifted the huge Govardhan mountain on His tiny pinky finger to protect all animals and people from storm!',
    funFactForKidsHindi: 'नन्हे कृष्ण ने ब्रजवासियों और पशु-पक्षियों की रक्षा के लिए गोवर्धन पर्वत अपनी छोटी उंगली पर उठा लिया था!',
  },
  {
    id: 'shree-rama',
    category: 'gods',
    title: 'Lord Rama',
    hindiTitle: 'श्री राम (मर्यादा पुरुषोत्तम)',
    sanskritTitle: 'श्रीरामाय नमः',
    subtitle: 'The Noble King of Ayodhya, Ideal Son, Champion of Truth',
    imageUrl: '/images/sanatan/gods/lord-rama.jpg',
    introduction: [
      'Lord Rama is known as Maryada Purushottam—the greatest embodiment of kindness, duty, and truth.',
      'He carried a divine bow and arrows to protect sages, gentle forest animals, and innocent people.',
      'His reign, known as "Ramrajya", was a peaceful golden time where everyone lived in harmony and joy.'
    ],
    hindiIntroduction: [
      'श्री राम चंद्र जी सत्य, मर्यादा, विनम्रता और पितृ-भक्ति के सर्वोच्च आदर्श हैं।',
      'उन्होंने सदैव धर्म और सत्य की रक्षा की और सभी से समभाव और करुणा से प्रेम किया।',
      'उनके राज को रामराज्य कहा जाता है, जहाँ सब सुखी और प्रसन्न रहते थे।'
    ],
    vahana: 'Surya Ratha (Chariot of the Sun)',
    vahanaHindi: 'सूर्य रथ',
    symbols: ['Kodanda Bow (Righteousness)', 'Golden Arrows (Justice)', 'Lotus Eyes (Kindness)'],
    favoritePrasad: 'Forest Fruits, Kheer & Sweet Berries (Ber of Shabari)',
    favoritePrasadHindi: 'शबरी के मीठे बेर, खीर और पंचामृत',
    blessing: 'Truthfulness, discipline, respect for parents, and noble courage.',
    blessingHindi: 'सत्यनिष्ठा, माता-पिता की आज्ञा का पालन और सदाचार।',
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-600 via-yellow-600 to-orange-700',
      badgeEmoji: '🏹',
      avatarSymbol: '☀️',
      illustrationType: 'rama',
    },
    keySymbol: '🏹 Kodanda Bow',
    sacredAttribute: 'Maryada Purushottam (Ideal Being)',
    funFactForKids: 'Even tiny squirrels helped Lord Rama build the floating stone bridge (Ram Setu) across the ocean!',
    funFactForKidsHindi: 'राम सेतु बनाते समय एक नन्ही गिलहरी ने भी रेत के कण डालकर प्रभु श्री राम की सेवा की थी!',
  },
  {
    id: 'maa-saraswati',
    category: 'gods',
    title: 'Maa Saraswati',
    hindiTitle: 'माँ सरस्वती (विद्या दायिनी)',
    sanskritTitle: 'ॐ सरस्वत्यै नमः',
    subtitle: 'Goddess of Learning, Knowledge, Arts, Music & Speech',
    imageUrl: '/images/sanatan/gods/maa-saraswati.jpg',
    introduction: [
      'Maa Saraswati wears pure white robes, sitting gracefully on a spotless white lotus in peaceful waters.',
      'She holds the sacred musical Veena, holy scriptures (Vedas), and crystal prayer beads (Japamala).',
      'Students and artists pray to Her for a sharp memory, beautiful singing voice, and pure wisdom.'
    ],
    hindiIntroduction: [
      'माँ सरस्वती विद्या, संगीत, कला और निर्मल बुद्धि की देवी हैं।',
      'वे श्वेत वस्त्र धारण करती हैं और पवित्र श्वेत कमल पर विराजमान होकर वीणा बजाती हैं।',
      'पढ़ाई शुरू करने वाले सभी बच्चे माँ सरस्वती की कृपा से ज्ञान और विद्या प्राप्त करते हैं।'
    ],
    vahana: 'Hamsa (The majestic White Swan)',
    vahanaHindi: 'हंस (विवेक और पवित्रता का प्रतीक)',
    symbols: ['Veena (Cosmic Harmony)', 'Book (Vedas/Knowledge)', 'White Lotus (Purity)'],
    favoritePrasad: 'Yellow Kesar Halwa, Sweet Rice & Seasonal Berries',
    favoritePrasadHindi: 'पीला केसरिया हलवा, मीठे पीले चावल और मिश्री',
    blessing: 'Excellence in studies, artistic creativity, clear speech, and sharp memory.',
    blessingHindi: 'उत्तम विद्या, संगीत-कला में निपुणता और एकाग्रता।',
    artTheme: {
      primaryColor: 'yellow',
      bgGradient: 'from-yellow-400 via-amber-500 to-orange-600',
      badgeEmoji: '🪕',
      avatarSymbol: '🦢',
      illustrationType: 'saraswati',
    },
    keySymbol: '🪕 Veena & Swan',
    sacredAttribute: 'Vidya Veda Vani (Voice of Pure Knowledge)',
    funFactForKids: 'Her swan (Hamsa) can magically separate milk from water, showing us how to choose goodness in life!',
    funFactForKidsHindi: 'माँ सरस्वती का हंस दूध और पानी को अलग कर देता है, जो हमें अच्छाई को चुनने की सीख देता है!',
  },
  {
    id: 'bhagwan-shiva',
    category: 'gods',
    title: 'Lord Shiva',
    hindiTitle: 'भगवान शिव (महादेव / भोलेनाथ)',
    sanskritTitle: 'ॐ नमः शिवाय',
    subtitle: 'The Great Ascetic of Mount Kailash, Lord of Yoga & Compassion',
    imageUrl: '/images/sanatan/gods/lord-shiva.jpg',
    introduction: [
      'Lord Shiva meditates peacefully on snowy Mount Kailash with the cool crescent moon glowing in His hair.',
      'From His locks flows the sacred river Mother Ganga, bringing fresh life and greenery to earth.',
      'He holds the rhythmic Damru drum, the Trishula of cosmic balance, and loves all animals deeply.'
    ],
    hindiIntroduction: [
      'भगवान भोलेनाथ कैलाश पर्वत पर ध्यानमग्न रहते हैं और सबके दुखों को हरने वाले परम दयालु हैं।',
      'उनकी जटाओं से माँ गंगा की शीतल धारा बहती है और उनके मस्तक पर अर्धचंद्र सुशोभित है।',
      'वे डमरू बजाते हैं और नंदी बैल की सवारी करते हैं।'
    ],
    vahana: 'Nandi (The strong, devoted White Bull)',
    vahanaHindi: 'नंदी (परम भक्त बैल)',
    symbols: ['Trishula (Balance of 3 Gunas)', 'Damru (Rhythm of creation)', 'Crescent Moon (Calm mind)'],
    favoritePrasad: 'Pure Fresh Milk, Bilva Leaves, Fruits & Panchamrit',
    favoritePrasadHindi: 'ताजा दूध, बेलपत्र और पंचामृत',
    blessing: 'Peace of mind, inner strength, focus in meditation, and fearlessness.',
    blessingHindi: 'मन की शांति, एकाग्रता और आंतरिक बल।',
    artTheme: {
      primaryColor: 'indigo',
      bgGradient: 'from-indigo-700 via-slate-800 to-cyan-900',
      badgeEmoji: '🔱',
      avatarSymbol: '🌙',
      illustrationType: 'shiva',
    },
    keySymbol: '🔱 Trishula & Damru',
    sacredAttribute: 'Bholenath (The Most Innocent & Loving Deity)',
    funFactForKids: 'Shiva is called Pashupatinath because He is the loving protector of every bird, animal, and creature!',
    funFactForKidsHindi: 'शिव जी को पशुपतिनाथ भी कहते हैं क्योंकि वे संसार के सभी पशु-पक्षियों के रक्षक हैं!',
  },
  {
    id: 'shree-hanuman',
    category: 'gods',
    title: 'Lord Hanuman',
    hindiTitle: 'श्री हनुमान (पवनपुत्र / संकटमोचन)',
    sanskritTitle: 'ॐ हं हनुमते नमः',
    subtitle: 'Mighty Hero of Courage, Devotion, Strength and Humility',
    imageUrl: '/images/sanatan/gods/lord-hanuman.jpg',
    introduction: [
      'Lord Hanuman is the beloved monkey hero with golden glow, unlimited power, and the kindest heart.',
      'He can leap across oceans, fly through clouds, and carry entire mountains in the palm of His hand.',
      'Whenever children feel scared or alone, chanting "Jai Bajrangbali" fills the heart with instant courage!'
    ],
    hindiIntroduction: [
      'श्री हनुमान जी असीम बल, बुद्धि और प्रभु श्री राम की अनन्य भक्ति के प्रतीक हैं।',
      'वे हवा के वेग से उड़ सकते हैं और संजीवनी बूटी के लिए पूरा द्रोणागिरि पर्वत अपनी हथेली पर उठा लाए थे।',
      'उनका स्मरण करने से सारा डर दूर भाग जाता है और मन में असीम साहस भर जाता है।'
    ],
    vahana: 'Pavan Vayu (He travels on the gentle winds)',
    vahanaHindi: 'पवन वेग (वायु के समान तीव्र गति)',
    symbols: ['Gada (Mighty Mace of Strength)', 'Sanjeevani Hill (Life saver)', 'Folded Hands in Devotion'],
    favoritePrasad: 'Red Sindoor, Juicy Bananas, Besan Laddus & Sweet Paan',
    favoritePrasadHindi: 'बेसन के लड्डू, मीठे केले और सिन्दूर',
    blessing: 'Supreme physical energy, bravery, sharp wits, and protection from fear.',
    blessingHindi: 'शारीरिक बल, निडरता, आरोग्य और बुद्धि की वृद्धि।',
    artTheme: {
      primaryColor: 'orange',
      bgGradient: 'from-orange-500 via-red-600 to-amber-700',
      badgeEmoji: '🚩',
      avatarSymbol: '🏔️',
      illustrationType: 'hanuman',
    },
    keySymbol: '🏔️ Sanjeevani Mountain & Gada',
    sacredAttribute: 'Sankat Mochan (Dispeller of All Troubles)',
    funFactForKids: 'As a little baby, Hanuman thought the glowing rising sun was a giant ripe mango and leaped to take a bite!',
    funFactForKidsHindi: 'बचपन में नन्हे हनुमान जी ने उगते हुए लाल सूर्य को स्वादिष्ट मीठा आम समझकर एक छलांग में पकड़ लिया था!',
  },

  // =========================================================================
  // 2. BASIC SHLOKAS (दैनिक सरल श्लोक) - EXCLUSIVE SHLOKA RECITATION SECTION
  // =========================================================================
  {
    id: 'gayatri-mantra',
    category: 'shlokas',
    title: 'Gayatri Mantra',
    hindiTitle: 'गायत्री महामंत्र',
    sanskritTitle: 'गायत्री मन्त्रः',
    subtitle: 'The Universal Prayer to the Radiant Divine Light (Savitur)',
    imageUrl: '/images/sanatan/shlokas/gayatri-mantra.jpg',
    introduction: [
      'The Gayatri Mantra is the most celebrated Vedic prayer asking the Divine Sun to enlighten our intellect.',
      'Chanting this mantra makes our mind crystal clear, peaceful, and filled with positive energy.',
      'Children can chant it three times every morning before beginning study and play.'
    ],
    hindiIntroduction: [
      'गायत्री महामंत्र वेदों का सबसे पावन मंत्र है, जो हमारी बुद्धि को सन्मार्ग और तेज प्रदान करता है।',
      'इसके जप से मन शांत होता है, सकारात्मक ऊर्जा बढ़ती है और स्मरण शक्ति तेज होती है।'
    ],
    shloka: {
      title: 'Gayatri Maha Mantra',
      sanskrit: [
        'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं।',
        'भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥'
      ],
      transliteration: [
        'Om Bhur Bhuvah Swaha, Tat Savitur Varenyam,',
        'Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat.'
      ],
      audioText: 'Om Bhur Bhuvah Swaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat',
      englishMeaning: 'We meditate on the divine brilliance of the radiant Sun of Creation. May that holy light illuminate and guide our intellect towards truth!',
      hindiMeaning: 'हम उस प्राणस्वरूप, पापनाशक, तेजस्वी परमात्मा का ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
      whenToChant: 'Morning sunrise, before studies, and during quiet prayer time.',
      whenToChantHindi: 'प्रातःकाल सूर्योदय के समय, पढ़ाई शुरू करने से पहले।'
    },
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-500 via-orange-500 to-yellow-500',
      badgeEmoji: '☀️',
      avatarSymbol: 'ॐ',
      illustrationType: 'gayatri',
    },
    keySymbol: '☀️ Divine Surya Rays',
    sacredAttribute: 'Veda Mata (Mother of all Mantras)',
    funFactForKids: 'Gayatri Mantra consists of 24 sacred syllables that resonate like sweet cosmic chimes throughout nature!',
    funFactForKidsHindi: 'गायत्री मंत्र में 24 पवित्र अक्षर हैं जो मस्तिष्क में अद्भुत एकाग्रता और शक्ति भरते हैं!',
  },
  {
    id: 'karagre-vasate-lakshmi',
    category: 'shlokas',
    title: 'Karagre Vasate Lakshmi',
    hindiTitle: 'कराग्रे वसते लक्ष्मी (प्रातः कर-दर्शन)',
    sanskritTitle: 'प्रातः कर-दर्शनम्',
    subtitle: 'Morning Prayer Looking at One’s Own Palms for Good Deeds',
    imageUrl: '/images/sanatan/shlokas/karagre-vasate.jpg',
    introduction: [
      'As soon as we wake up in the morning, we rub our palms together and look at our hands with gratitude.',
      'Our fingertips carry prosperity (Lakshmi), palm center carries wisdom (Saraswati), and the base is God Govinda.',
      'It reminds us to use our hands today only for helping, drawing, studying, and doing kind deeds!'
    ],
    hindiIntroduction: [
      'सुबह उठते ही अपनी हथेलियों को देखकर यह श्लोक बोलने से पूरा दिन शुभ और मंगलमय बीतता है।',
      'हथेली के आगे लक्ष्मी, मध्य में सरस्वती और मूल में भगवान गोविंद का वास माना जाता है।'
    ],
    shloka: {
      title: 'Morning Palm Shloka',
      sanskrit: [
        'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।',
        'करमूले तु गोविन्दः प्रभाते करदर्शनम्॥'
      ],
      transliteration: [
        'Karagre Vasate Lakshmi, Karamadhye Saraswati,',
        'Karamule Tu Govindah, Prabhate Kara Darshanam.'
      ],
      audioText: 'Karagre Vasate Lakshmi, Karamadhye Saraswati, Karamule Tu Govindah, Prabhate Kara Darshanam',
      englishMeaning: 'On the tips of fingers resides Goddess Lakshmi, in the center resides Goddess Saraswati, and at the base sits Lord Govinda. Thus we view our hands every morning!',
      hindiMeaning: 'हथेलियों के अग्रभाग में माँ लक्ष्मी, मध्य में माँ सरस्वती और मूल भाग में भगवान गोविंद विराजते हैं। अतः प्रातः काल हथेलियों के दर्शन करने चाहिए।',
      whenToChant: 'First thing upon opening eyes in the morning bed.',
      whenToChantHindi: 'सुबह नींद से जागते ही बिस्तर पर दोनों हाथ देखकर।'
    },
    artTheme: {
      primaryColor: 'emerald',
      bgGradient: 'from-emerald-500 via-teal-600 to-green-700',
      badgeEmoji: '🤲',
      avatarSymbol: '✨',
      illustrationType: 'karagre',
    },
    keySymbol: '🤲 Helping Hands',
    sacredAttribute: 'Karmaphala (Sanctifying Daily Actions)',
    funFactForKids: 'This practice is ancient mindfulness—teaching children that our hands hold the power to build a better world!',
    funFactForKidsHindi: 'यह श्लोक हमें सिखाता है कि हमारी मेहनत और हाथों में ही सफलता और ज्ञान की शक्ति है!',
  },
  {
    id: 'guru-brahma',
    category: 'shlokas',
    title: 'Guru Brahma Guru Vishnu',
    hindiTitle: 'गुरुर्ब्रह्मा गुरुर्विष्णुः (गुरु वंदना)',
    sanskritTitle: 'गुरु स्तुतिः',
    subtitle: 'Gratitude to Parents, Teachers, and Guides of Wisdom',
    imageUrl: '/images/sanatan/shlokas/guru-brahma.jpg',
    introduction: [
      'Our parents and teachers are our first gurus who lovingly guide our steps and open the doors of wonder.',
      'This prayer honors the teacher as the creator of skills, protector of good values, and transformer of our mind.',
      'We bow to our teachers and elders to receive their joyful blessings.'
    ],
    hindiIntroduction: [
      'गुरु और माता-पिता ही हमारे प्रथम मार्गदर्शक हैं जो हमें अज्ञान के अंधकार से प्रकाश की ओर ले जाते हैं।',
      'यह श्लोक गुरु के प्रति सर्वोच्च सम्मान और आभार प्रकट करता है।'
    ],
    shloka: {
      title: 'Guru Vandana',
      sanskrit: [
        'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।',
        'गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥'
      ],
      transliteration: [
        'Gurur Brahma Gurur Vishnuh, Gurur Devo Maheshwarah,',
        'Guruh Sakshat Param Brahma, Tasmai Shri Gurave Namah.'
      ],
      audioText: 'Gurur Brahma Gurur Vishnuh, Gurur Devo Maheshwarah, Guruh Sakshat Param Brahma, Tasmai Shri Gurave Namah',
      englishMeaning: 'The Teacher is Brahma (the Creator), the Teacher is Vishnu (the Sustainer), the Teacher is Shiva (the Transformer). The Teacher is the Supreme Spirit manifested; salutations to that revered Guru!',
      hindiMeaning: 'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही भगवान शंकर हैं। गुरु ही साक्षात् परमब्रह्म हैं, उन श्री गुरुदेव को सादर प्रणाम।',
      whenToChant: 'Before starting class, teacher’s day, and when touching parents\' feet.',
      whenToChantHindi: 'कक्षा शुरू होने से पूर्व और शिक्षकों-माता-पिता के चरण स्पर्श करते समय।'
    },
    artTheme: {
      primaryColor: 'rose',
      bgGradient: 'from-rose-500 via-pink-600 to-amber-600',
      badgeEmoji: '🙏',
      avatarSymbol: '🌸',
      illustrationType: 'guru',
    },
    keySymbol: '🙏 Folded Hands to Teachers',
    sacredAttribute: 'Acharya Devo Bhava (Respect to Guides)',
    funFactForKids: 'In Sanskrit, "Gu" means darkness of unknowing, and "Ru" means the brilliant light that removes it!',
    funFactForKidsHindi: '\'गु\' का अर्थ है अज्ञान का अंधकार और \'रु\' का अर्थ है उसे दूर करने वाला दिव्य प्रकाश!',
  },
  {
    id: 'vakratunda-shloka',
    category: 'shlokas',
    title: 'Vakratunda Mahakaya',
    hindiTitle: 'वक्रतुण्ड महाकाय (गणेश प्रार्थना)',
    sanskritTitle: 'गणेश मन्त्रः',
    subtitle: 'Prayer to Lord Ganesha Before Starting Any Task',
    imageUrl: '/images/sanatan/shlokas/vakratunda-shloka.jpg',
    introduction: [
      'This sweet prayer celebrates Lord Ganesha whose curved trunk and great aura shine like millions of suns.',
      'We pray to Him to remove all stumbling blocks and keep our journey filled with smooth smiles.',
      'Sing this before exams, competitions, writing, or when embarking on a holiday trip!'
    ],
    hindiIntroduction: [
      'भगवान गणेश जी की यह सबसे प्रिय स्तुति है जिसमें उनसे सभी विघ्नों को दूर करने की प्रार्थना की जाती है।'
    ],
    shloka: {
      title: 'Vakratunda Mahakaya',
      sanskrit: [
        'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
        'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'
      ],
      transliteration: [
        'Vakratunda Mahakaya, Surya Koti Samaprabha,',
        'Nirvighnam Kuru Me Deva, Sarva Karyeshu Sarvada.'
      ],
      audioText: 'Vakratunda Mahakaya, Surya Koti Samaprabha, Nirvighnam Kuru Me Deva, Sarva Karyeshu Sarvada',
      englishMeaning: 'O Lord with the curved trunk and immense radiant body, shining like ten million suns! Please make all our endeavors free from obstacles at all times!',
      hindiMeaning: 'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी प्रभु! मेरे सभी कार्यों को सदा बिना किसी विघ्न के पूर्ण करें।',
      whenToChant: 'Before starting a test, drawing, sports game, or entering school.',
      whenToChantHindi: 'कोई भी नया काम, खेल या परीक्षा शुरू करने से पहले।'
    },
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-500 via-orange-600 to-red-600',
      badgeEmoji: '🐘',
      avatarSymbol: '🕉️',
      illustrationType: 'ganesha',
    },
    keySymbol: '🐘 Divine Elephant Face',
    sacredAttribute: 'Vighnaharta (Obstacle Remover)',
    funFactForKids: 'Lord Ganesha\'s large ears remind us to listen carefully to good advice and wisdom!',
    funFactForKidsHindi: 'गणेश जी के बड़े कान हमें अच्छी बातें ध्यान से सुनने की सीख देते हैं!',
  },
  {
    id: 'sarve-bhavantu-sukhinah',
    category: 'shlokas',
    title: 'Sarve Bhavantu Sukhinah',
    hindiTitle: 'सर्वे भवन्तु सुखिनः (शांति पाठ)',
    sanskritTitle: 'विश्व शान्ति प्रार्थना',
    subtitle: 'Universal Blessing Wishing Happiness & Health to All Living Beings',
    imageUrl: '/images/sanatan/shlokas/sarve-bhavantu.jpg',
    introduction: [
      'This is the golden prayer of Sanatan Dharma that wishes joy, good health, and peace for the entire planet.',
      'We pray not just for ourselves, but for our friends, family, trees, birds, puppies, and all living creatures.',
      'It fills our heart with broad universal love and kindness.'
    ],
    hindiIntroduction: [
      'यह श्लोक सनातन संस्कृति की सबसे उदार भावना को दर्शाता है, जिसमें सभी प्राणियों के कल्याण और सुख की कामना की गई है।'
    ],
    shloka: {
      title: 'Universal Peace Prayer',
      sanskrit: [
        'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।',
        'सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥'
      ],
      transliteration: [
        'Sarve Bhavantu Sukhinah, Sarve Santu Niramayah,',
        'Sarve Bhadrani Pashyantu, Ma Kashchid Duhkha Bhag Bhavet.'
      ],
      audioText: 'Sarve Bhavantu Sukhinah, Sarve Santu Niramayah, Sarve Bhadrani Pashyantu, Ma Kashchid Duhkha Bhag Bhavet',
      englishMeaning: 'May all beings be happy! May all beings be healthy and free from illness! May everyone see only goodness and prosperity, and may no one suffer sorrow!',
      hindiMeaning: 'सब सुखी हों, सब निरोगी और स्वस्थ हों, सब कल्याण देखें और किसी को भी कोई दुःख न हो।',
      whenToChant: 'Nighttime before sleeping and at the end of community gatherings.',
      whenToChantHindi: 'रात को सोने से पहले और प्रार्थना सभा के समापन पर।'
    },
    artTheme: {
      primaryColor: 'teal',
      bgGradient: 'from-teal-500 via-cyan-600 to-blue-700',
      badgeEmoji: '🕊️',
      avatarSymbol: '🌍',
      illustrationType: 'peace',
    },
    keySymbol: '🕊️ White Dove of Global Harmony',
    sacredAttribute: 'Lokah Samastah Sukhino Bhavantu',
    funFactForKids: 'Indian sages chanted this thousands of years ago to wish peace for forests, rivers, and the stars!',
    funFactForKidsHindi: 'हजारों साल पहले ऋषियों ने यह प्रार्थना पूरी पृथ्वी, नदियों और वनों के स्वास्थ्य के लिए गाई थी!',
  },

  // =========================================================================
  // 3. FOUR YUGAS (चार युग व काल चक्र) - Cosmic Time & Dharma Progression
  // =========================================================================
  {
    id: 'satya-yuga',
    category: 'yugas',
    title: 'Satya Yuga (Krita Yuga)',
    hindiTitle: 'सत्य युग (स्वर्ण काल)',
    subtitle: 'The Golden Age of 100% Truth, Purity, and Harmony',
    imageUrl: '/images/sanatan/yugas/satya-yuga.jpg',
    introduction: [
      'Satya Yuga is the glorious Golden Age where every human being spoke only pure truth and loved all creatures.',
      'Dharma (righteousness) stood strong and sturdy on all 4 golden pillars: Truth, Purity, Compassion, and Charity.',
      'There was no greed, sorrow, or fighting; nature provided sweet fruits and pure water in abundance!'
    ],
    hindiIntroduction: [
      'सत्ययुग को स्वर्ण काल कहा जाता है, जहाँ सभी लोग पूर्ण सत्य, दया और पवित्रता के साथ जीते थे।',
      'इस युग में धर्म के चारों चरण—सत्य, तप, दया और दान—पूर्ण रूप से स्थापित थे।',
      'प्रकृति हर प्रकार से समृद्ध थी और कोई भी प्राणी दुखी नहीं था।'
    ],
    eraName: 'Golden Age (Krita Yuga)',
    dharmaPillars: '4 out of 4 (100% Truth & Righteousness)',
    keyAvatars: ['Matsya (Fish Avatar)', 'Kurma (Tortoise Avatar)', 'Varaha (Boar Avatar)', 'Narasimha (Man-Lion Avatar)'],
    moralLesson: 'Always speak the truth gently and keep your heart pure like sunshine.',
    moralLessonHindi: 'सदा सत्य बोलें और अपने मन में सबके प्रति भलाई का भाव रखें।',
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-400 via-yellow-500 to-orange-500',
      badgeEmoji: '👑',
      avatarSymbol: '☀️',
      illustrationType: 'satya',
    },
    keySymbol: '👑 4 Golden Pillars of Dharma',
    sacredAttribute: '100% Truth (Satyam Param Dheemahi)',
    funFactForKids: 'In Satya Yuga, meditation (Dhyana) was the direct way to connect with the supreme divine joy!',
    funFactForKidsHindi: 'सत्ययुग में लोग गहन ध्यान और साधना से परमात्मा का साक्षात्कार करते थे!',
  },
  {
    id: 'treta-yuga',
    category: 'yugas',
    title: 'Treta Yuga',
    hindiTitle: 'त्रेता युग (रजत काल / श्री राम युग)',
    subtitle: 'The Silver Age of Nobility, Chivalry, and Ideal Character',
    imageUrl: '/images/sanatan/yugas/treta-yuga.jpg',
    introduction: [
      'Treta Yuga is the noble Silver Age where Lord Rama descended to establish ideals of duty and goodness.',
      'Dharma stood on 3 strong pillars: Truth, Compassion, and Charity.',
      'People performed sacred Yajnas (sacrifices) to protect the environment and lived by high family values.'
    ],
    hindiIntroduction: [
      'त्रेता युग में भगवान श्री राम ने अवतार लेकर मर्यादा, भ्रातृ-प्रेम और सत्य का सर्वोच्च मार्ग दिखाया।',
      'इस युग में धर्म के 3 चरण उपस्थित थे और यज्ञ व पर्यावरण की रक्षा को बहुत महत्व दिया जाता था।'
    ],
    eraName: 'Silver Age (Treta Yuga)',
    dharmaPillars: '3 out of 4 (75% Dharma)',
    keyAvatars: ['Vamana (The Young Scholar)', 'Parashurama (The Brave Sage)', 'Lord Rama (The Maryada Purushottam)'],
    moralLesson: 'Respect your parents, fulfill your promises, and stand by your friends.',
    moralLessonHindi: 'माता-पिता की आज्ञा मानें, वचन का पालन करें और धर्म की रक्षा करें।',
    artTheme: {
      primaryColor: 'rose',
      bgGradient: 'from-rose-500 via-amber-600 to-orange-700',
      badgeEmoji: '🏹',
      avatarSymbol: '🏹',
      illustrationType: 'treta',
    },
    keySymbol: '🏹 Sacred Yajna Fire & Bow',
    sacredAttribute: 'Sacrifice and Duty (Tapa & Yajna)',
    funFactForKids: 'The epic Ramayana took place in Treta Yuga, showing the victory of good over evil!',
    funFactForKidsHindi: 'पवित्र रामायण की पावन गाथा त्रेता युग में ही घटित हुई थी!',
  },
  {
    id: 'dvapara-yuga',
    category: 'yugas',
    title: 'Dvapara Yuga',
    hindiTitle: 'द्वापर युग (कांस्य काल / श्री कृष्ण युग)',
    subtitle: 'The Age of Divine Play (Leela) and the Sacred Bhagavad Gita',
    imageUrl: '/images/sanatan/yugas/dvapara-yuga.jpg',
    introduction: [
      'Dvapara Yuga is the colorful age when Lord Krishna gave humanity the eternal wisdom of the Bhagavad Gita.',
      'Dharma stood on 2 pillars: Truth and Charity.',
      'Sage Ved Vyasa organized the four Vedas into clear books so future generations could easily read them.'
    ],
    hindiIntroduction: [
      'द्वापर युग में भगवान श्री कृष्ण ने अवतरित होकर कुरुक्षेत्र के मैदान में अमर ग्रंथ श्रीमद्भगवद्गीता का उपदेश दिया।',
      'महर्षि वेदव्यास जी ने इसी युग में चारों वेदों और महाभारत ग्रंथ की रचना की।'
    ],
    eraName: 'Bronze Age (Dvapara Yuga)',
    dharmaPillars: '2 out of 4 (50% Dharma)',
    keyAvatars: ['Lord Krishna (The Supreme Guide)', 'Balarama (The Lord of Strength)'],
    moralLesson: 'Do your best work with devotion and do not worry about results.',
    moralLessonHindi: 'कर्म करो और फल की चिंता किए बिना अपना श्रेष्ठतम योगदान दो।',
    artTheme: {
      primaryColor: 'sky',
      bgGradient: 'from-sky-500 via-blue-600 to-indigo-800',
      badgeEmoji: '🦚',
      avatarSymbol: '🪈',
      illustrationType: 'dvapara',
    },
    keySymbol: '🪈 Flute & Bhagavad Gita',
    sacredAttribute: 'Devotional Temple Worship (Archana)',
    funFactForKids: 'The Bhagavad Gita teaches that every child has a divine spark inside waiting to shine with goodness!',
    funFactForKidsHindi: 'गीता हमें सिखाती है कि प्रत्येक बच्चे के भीतर ज्ञान और अच्छाई का दिव्य प्रकाश विद्यमान है!',
  },
  {
    id: 'kali-yuga',
    category: 'yugas',
    title: 'Kali Yuga',
    hindiTitle: 'कलि युग (वर्तमान युग)',
    subtitle: 'The Present Age Where Simple Chanting & Kindness Bring Highest Joy',
    imageUrl: '/images/sanatan/yugas/kali-yuga.jpg',
    introduction: [
      'Kali Yuga is the present cosmic age where material machines and speed are everywhere.',
      'Dharma stands on 1 precious pillar: Charity (Daan) and Truth (Satya).',
      'Sages say that even the simplest act of kindness, planting a tree, or singing God’s name brings huge blessings!'
    ],
    hindiIntroduction: [
      'कलयुग वर्तमान युग है, जहाँ मात्र प्रेमपूर्वक प्रभु का नाम लेने और दूसरों की सेवा करने से ही परम कल्याण होता है।',
      'इस युग में दान, सेवा और परोपकार सबसे बड़े धर्म माने गए हैं।'
    ],
    eraName: 'The Present Age (Kali Yuga)',
    dharmaPillars: '1 out of 4 (Charity & Kindness)',
    keyAvatars: ['Buddha (The Compassionate)', 'Kalki (The Future Rider of the White Horse)'],
    moralLesson: 'Help those in need, share your food, and chant sweet names with love.',
    moralLessonHindi: 'जरूरतमंदों की सहायता करें, भोजन बांटें और प्रेमपूर्वक रहें।',
    artTheme: {
      primaryColor: 'purple',
      bgGradient: 'from-purple-600 via-violet-700 to-indigo-900',
      badgeEmoji: '🐴',
      avatarSymbol: '✨',
      illustrationType: 'kali',
    },
    keySymbol: '🐴 Divine White Stallion (Kalki)',
    sacredAttribute: 'Nama Sankirtana (Singing God’s Name)',
    funFactForKids: 'In Kali Yuga, even a small 2-minute prayer with pure love is as powerful as years of meditation in ancient times!',
    funFactForKidsHindi: 'इस युग में सच्चे मन से की गई 2 मिनट की प्रार्थना भी अद्भुत शांति और आनंद देती है!',
  },

  // =========================================================================
  // 4. VEDAS & PURANAS (वेद व पुराण) - Sacred Ancient Treasures of Knowledge
  // =========================================================================
  {
    id: 'rigveda',
    category: 'vedas',
    title: 'Rigveda',
    hindiTitle: 'ऋग्वेद (ज्ञान का आदि स्रोत)',
    subtitle: 'The World’s Oldest Book of Nature Hymns, Sun, Rain & Cosmic Order',
    imageUrl: '/images/sanatan/vedas/rigveda.jpg',
    introduction: [
      'Rigveda is the oldest sacred text of humanity, containing over 10,000 beautiful poetic mantras.',
      'It sings praises of the rising Sun, fresh morning Breeze (Vayu), gentle Rain (Indra), and Mother Earth.',
      'It contains the famous saying: "Ekam Sat Vipra Bahudha Vadanti" (Truth is One, the wise call It by many names).'
    ],
    hindiIntroduction: [
      'ऋग्वेद मानव सभ्यता का सबसे प्राचीन और पावन ज्ञान ग्रंथ है जिसमें प्रकृति और परमात्मा की स्तुतियां हैं।',
      'यह हमें सिखाता है कि सत्य एक ही है, जिसे विद्वान जन अलग-अलग नामों से पुकारते हैं।'
    ],
    vedaTheme: 'Hymns of Cosmic Harmony & Nature Reverence',
    vedaThemeHindi: 'प्रकृति वंदना और ज्ञान का महासमुद्र',
    keyWisdom: [
      'Treat the Sun, Rivers, and Trees like divine family.',
      'Always welcome noble, inspiring thoughts from all directions in the universe.',
      'Live with honesty and harmonious teamwork.'
    ],
    keyWisdomHindi: [
      'प्रकृति, नदियों और वनों को पूजनीय मानना।',
      'सभी दिशाओं से शुभ और कल्याणकारी विचारों को ग्रहण करना।',
      'सद्भाव और एकता के साथ मिलकर रहना।'
    ],
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-600 via-orange-600 to-yellow-600',
      badgeEmoji: '📜',
      avatarSymbol: '☀️',
      illustrationType: 'rigveda',
    },
    keySymbol: '📜 Ancient Palm Leaves & Sun',
    sacredAttribute: 'Rig (Hymns of Light & Truth)',
    funFactForKids: 'Ancient Indian students memorized the entire Rigveda using musical memory rhymes without writing a single word on paper!',
    funFactForKidsHindi: 'प्राचीन काल में विद्यार्थी पूरे ऋग्वेद को मधुर स्वर में कंठस्थ कर लेते थे!',
  },
  {
    id: 'samaveda',
    category: 'vedas',
    title: 'Samaveda',
    hindiTitle: 'सामवेद (संगीत व नाद ब्रह्म)',
    subtitle: 'The Veda of Melodies, Chants, and the Roots of Indian Classical Music',
    imageUrl: '/images/sanatan/vedas/samaveda.jpg',
    introduction: [
      'Samaveda is the origin of classical Indian music (the seven notes: Sa, Re, Ga, Ma, Pa, Dha, Ni).',
      'It turns the sacred mantras of the Rigveda into sweet, soothing musical songs that calm the soul.',
      'Lord Krishna in the Bhagavad Gita said: "Among the Vedas, I am the Samaveda!"'
    ],
    hindiIntroduction: [
      'सामवेद भारतीय शास्त्रीय संगीत के सात सुरों (सा रे ग म प ध नि) का मूल उद्गम स्थल है।',
      'इसके मधुर गायन से मन शांत और प्रसन्न होता है। स्वयं भगवान कृष्ण ने कहा कि वेदों में मैं सामवेद हूँ।'
    ],
    vedaTheme: 'Sacred Music & Meditative Melodies',
    vedaThemeHindi: 'दिव्य संगीत, राग और नाद साधना',
    keyWisdom: [
      'Music is a direct, joyful bridge to connect with divine peace.',
      'Singing with pure love heals sadness and brings joy to all.',
      'Every natural sound—waterfalls, birds, ocean waves—is musical!'
    ],
    keyWisdomHindi: [
      'संगीत मन को शांति और आनंद देने का सर्वोत्तम माध्यम है।',
      'प्रकृति की प्रत्येक ध्वनि में संगीत की मधुरता है।'
    ],
    artTheme: {
      primaryColor: 'rose',
      bgGradient: 'from-rose-500 via-pink-600 to-purple-700',
      badgeEmoji: '🎵',
      avatarSymbol: '🪕',
      illustrationType: 'samaveda',
    },
    keySymbol: '🎵 7 Swaras (Sa Re Ga Ma Pa Dha Ni)',
    sacredAttribute: 'Gana (Divine Melody)',
    funFactForKids: 'The 7 musical notes (Swaras) were discovered by listening to animals: Peacock (Sa), Bull (Re), Goat (Ga), Heron (Ma), Cuckoo (Pa), Horse (Dha), Elephant (Ni)!',
    funFactForKidsHindi: 'संगीत के सात सुर पशु-पक्षियों की स्वाभाविक आवाजों जैसे मोर (सा), कोयल (प) आदि से लिए गए हैं!',
  },
  {
    id: 'yajurveda',
    category: 'vedas',
    title: 'Yajurveda',
    hindiTitle: 'यजुर्वेद (कर्म व यज्ञ विज्ञान)',
    subtitle: 'The Guidebook of Right Action, Environmental Offerings & Cosmic Balance',
    imageUrl: '/images/sanatan/vedas/yajurveda.jpg',
    introduction: [
      'Yajurveda explains how to perform daily noble duties (Karma) and sacred fire ceremonies (Havan/Yajna).',
      'Havan fires with herbs and pure ghee purify the air, bring rain, and nourish the atmosphere.',
      'It contains the famous Shanti Mantra that prays for peace in skies, oceans, medicines, and space.'
    ],
    hindiIntroduction: [
      'यजुर्वेद में शुभ कर्मों, यज्ञ-हवन और पर्यावरण को शुद्ध रखने के पवित्र विधान बताए गए हैं।',
      'हवन सामग्री और गौघृत से वायुमंडल स्वच्छ होता है और शांति की प्राप्ति होती है।'
    ],
    vedaTheme: 'Right Action (Karma Yoga) & Purification',
    vedaThemeHindi: 'सत्कर्म, यज्ञ और पर्यावरण शुद्धि',
    keyWisdom: [
      'Every action should be done selflessly for the welfare of the world (Yajna).',
      'Keep our environment, water bodies, and air clean and fragrant.'
    ],
    keyWisdomHindi: [
      'अपने सभी कार्य निष्काम भाव से संसार के भले के लिए करना।',
      'पर्यावरण और वायु को शुद्ध रखना।'
    ],
    artTheme: {
      primaryColor: 'orange',
      bgGradient: 'from-orange-500 via-red-600 to-amber-700',
      badgeEmoji: '🔥',
      avatarSymbol: '🪔',
      illustrationType: 'yajurveda',
    },
    keySymbol: '🔥 Sacred Havan Fire',
    sacredAttribute: 'Karmakanda & Seva (Dedicated Action)',
    funFactForKids: 'The Shanti Mantra from Yajurveda prays: "May peace be upon trees, peace upon water, peace upon the whole universe!"',
    funFactForKidsHindi: 'यजुर्वेद की शांति प्रार्थना में वृक्षों, जल, आकाश और औषधियों के लिए भी शांति की कामना की गई है!',
  },
  {
    id: 'atharvaveda',
    category: 'vedas',
    title: 'Atharvaveda',
    hindiTitle: 'अथर्ववेद (आयुर्वेद व दैनिक विज्ञान)',
    subtitle: 'The Treasure of Health, Herbal Healing (Ayurveda), Architecture & Daily Life',
    imageUrl: '/images/sanatan/vedas/atharvaveda.jpg',
    introduction: [
      'Atharvaveda is the practical encyclopedia of holistic living, containing the foundations of Ayurveda (herbal medicine).',
      'It teaches using Tulsi, Neem, turmeric, yoga, and fresh foods to stay energetic and strong.',
      'It celebrates Mother Earth in the Prithvi Sukta: "Mata Bhumih Putroham Prithivyah" (Earth is my Mother, I am her child!).'
    ],
    hindiIntroduction: [
      'अथर्ववेद में आयुर्वेद, स्वास्थ्य, जड़ी-बूटियों (तुलसी, नीम) और दैनिक जीवन के विज्ञान का अद्भुत वर्णन है।',
      'इसमें भूमि को माता और स्वयं को उसका बालक मानकर प्रकृति की सेवा करने की प्रेरणा दी गई है।'
    ],
    vedaTheme: 'Ayurveda, Natural Wellness & Earth Conservation',
    vedaThemeHindi: 'आयुर्वेद, स्वास्थ्य और प्रकृति संरक्षण',
    keyWisdom: [
      'Use natural plants like Tulsi, Neem, and Haldi to heal and protect health.',
      'Protect our Mother Earth with deep love and care.',
      'Practice Yoga, clean breathing, and early sleep routines.'
    ],
    keyWisdomHindi: [
      'तुलसी, नीम जैसी औषधियों से स्वास्थ्य की रक्षा करना।',
      'धरती को अपनी माता मानकर उसका सम्मान करना।'
    ],
    artTheme: {
      primaryColor: 'emerald',
      bgGradient: 'from-emerald-600 via-teal-700 to-green-800',
      badgeEmoji: '🌿',
      avatarSymbol: '🌱',
      illustrationType: 'atharvaveda',
    },
    keySymbol: '🌿 Healing Tulsi & Ayurvedic Herbs',
    sacredAttribute: 'Ayurveda & Prithvi Sukta',
    funFactForKids: 'The Prithvi Sukta in Atharvaveda is the world’s very first environmental anthem written over 4000 years ago!',
    funFactForKidsHindi: 'अथर्ववेद का पृथ्वी सूक्त पर्यावरण संरक्षण पर लिखा गया दुनिया का सबसे पहला गीत है!',
  },

  // =========================================================================
  // 5. SACRED FESTIVALS (पवित्र पर्व व उत्सव) - Joy, Traditions, Lights & Sweets
  // =========================================================================
  {
    id: 'festival-diwali',
    category: 'festivals',
    title: 'Diwali (Deepavali)',
    hindiTitle: 'दीपावली (रोशनी का महापर्व)',
    subtitle: 'The Grand Festival of Lights, Joy, New Clothes & Sweet Celebrations',
    imageUrl: '/images/sanatan/festivals/diwali.jpg',
    introduction: [
      'Diwali marks the joyful return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years.',
      'Families light rows of golden clay diyas, make colorful rangoli flower patterns, and share sweet treats.',
      'It represents the timeless victory of light over darkness and knowledge over ignorance!'
    ],
    hindiIntroduction: [
      'दीपावली भगवान श्री राम के 14 वर्ष के वनवास के पश्चात अयोध्या लौटने की खुशी में मनाई जाती है।',
      'घर-घर में मिट्टी के दीप जलाए जाते हैं, रंगोली सजाई जाती है और माँ लक्ष्मी व गणेश जी का पूजन होता है।'
    ],
    festiveMonth: 'Kartik Amavasya (October - November)',
    festiveMonthHindi: 'कार्तिक माह की अमावस्या',
    howKidsCelebrate: [
      'Decorate home doorsteps with colorful rice flour and flower petal rangolis.',
      'Light clay oil diyas and glowing fairy lights.',
      'Wear brand new festive clothes and visit grandparents for blessings.',
      'Share sweet Kaju Katli, Besan Laddus, and crunchy savory snacks.'
    ],
    howKidsCelebrateHindi: [
      'सुंदर रंगोली बनाना और मिट्टी के दीये जलाना।',
      'नए वस्त्र पहनना और बड़ों का आशीर्वाद लेना।',
      'काजू कतली, लड्डू और मिठाइयाँ बांटना।'
    ],
    festiveTreats: 'Kaju Katli, Gulab Jamun, Besan Laddus, Gujiya, Mathri',
    festiveTreatsHindi: 'काजू कतली, गुलाब जामुन, बेसन के लड्डू और मठरी',
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-500 via-orange-600 to-yellow-500',
      badgeEmoji: '🪔',
      avatarSymbol: '✨',
      illustrationType: 'diwali',
    },
    keySymbol: '🪔 Golden Clay Diya & Rangoli',
    sacredAttribute: 'Victory of Inner Light over Darkness',
    funFactForKids: 'The word Deepavali literally translates from Sanskrit as "a continuous row (avali) of glowing lights (deepa)"!',
    funFactForKidsHindi: 'दीपावली शब्द का अर्थ है \'दीपों की कतार या पंक्ति\'!',
  },
  {
    id: 'festival-holi',
    category: 'festivals',
    title: 'Holi (Festival of Colors)',
    hindiTitle: 'होली (रंगों और प्रेम का उत्सव)',
    subtitle: 'Welcoming Springtime with Joyful Herbal Colors, Music & Unity',
    imageUrl: '/images/sanatan/festivals/holi.jpg',
    introduction: [
      'Holi is the cheerful festival that welcomes the blooming flowers, warm sunshine, and fresh air of Spring (Vasant).',
      'It celebrates how brave little Prince Prahlad was saved by God’s love when wicked Holika tried to harm him.',
      'Children play happily with fragrant herbal gulal, splashing pink, yellow, and green colors on friends!'
    ],
    hindiIntroduction: [
      'होली वसंत ऋतु के आगमन और भक्त प्रह्लाद की ईश्वर भक्ति की विजय का पावन पर्व है।',
      'इस दिन सभी लोग गिले-शिकवे भुलाकर एक-दूसरे को अबीर-गुलाल लगाते हैं और मीठी गुजिया खाते हैं।'
    ],
    festiveMonth: 'Phalguna Purnima (February - March)',
    festiveMonthHindi: 'फाल्गुन पूर्णिमा',
    howKidsCelebrate: [
      'Light the Holika bonfire in the evening to celebrate the triumph of devotion and goodness.',
      'Play outdoors with skin-friendly herbal gulal made from marigolds and rose petals.',
      'Hug friends and say "Bura Na Mano, Holi Hai!" spreading smiles everywhere.',
      'Enjoy fresh, sweet homemade mawa gujiyas and chilled badam thandai.'
    ],
    howKidsCelebrateHindi: [
      'होलिका दहन में बुराई पर अच्छाई की विजय का स्मरण करना।',
      'प्राकृतिक हर्बल रंगों से मित्रों संग खेलना और गले मिलना।',
      'स्वादिष्ट मीठी गुजिया का आनंद लेना।'
    ],
    festiveTreats: 'Crispy Sweet Gujiya, Malpua, Thandai, Namakpare',
    festiveTreatsHindi: 'मावा गुजिया, मालपुआ, ठंडाई और नमकपारे',
    artTheme: {
      primaryColor: 'rose',
      bgGradient: 'from-rose-500 via-pink-600 to-amber-500',
      badgeEmoji: '🎨',
      avatarSymbol: '🌸',
      illustrationType: 'holi',
    },
    keySymbol: '🎨 Natural Herbal Gulal & Pichkari',
    sacredAttribute: 'Celebration of Spring & Universal Unity',
    funFactForKids: 'Traditional Holi colors are made from flowers like Palash (Flame of the Forest), turmeric, and beetroot!',
    funFactForKidsHindi: 'प्राचीन काल में होली के रंग पलाश के फूलों, हल्दी और चुकंदर से बनाए जाते थे जो त्वचा के लिए गुणकारी होते हैं!',
  },
  {
    id: 'festival-janmashtami',
    category: 'festivals',
    title: 'Krishna Janmashtami',
    hindiTitle: 'श्री कृष्ण जन्माष्टमी',
    subtitle: 'The Birthday of Little Krishna with Jhula Swings & Dahi Handi Fun',
    imageUrl: '/images/sanatan/festivals/janmashtami.jpg',
    introduction: [
      'Janmashtami is the joyous midnight birthday celebration of Little Krishna in Mathura and Gokul.',
      'Temples and homes decorate cute little wooden cradles (Jhulas) with soft velvet and fresh jasmine flowers.',
      'Children dress up in yellow dhotis with peacock feathers as Kanha and beautiful Radha!'
    ],
    hindiIntroduction: [
      'जन्माष्टमी भगवान श्री कृष्ण के जन्मोत्सव का महापर्व है।',
      'नन्हे बाल गोपाल को पालने में झुलाया जाता है, माखन-मिश्री का भोग लगाया जाता है और दही-हांडी का आयोजन होता है।'
    ],
    festiveMonth: 'Bhadrapada Ashtami (August - September)',
    festiveMonthHindi: 'भाद्रपद माह की कृष्ण पक्ष अष्टमी',
    howKidsCelebrate: [
      'Dress up as cute Little Krishna with flute or graceful Radha with flowers.',
      'Gently pull the ribbons of Bal Gopal’s floral swing at midnight.',
      'Form human pyramids with cheerful friends to break the hanging butter pot (Dahi Handi)!',
      'Taste delicious Panchamrit and coriander panjiri prasad.'
    ],
    howKidsCelebrateHindi: [
      'नन्हे कान्हा और राधा बनकर सज-धज कर उत्सव मनाना।',
      'बाल गोपाल के झूले को प्यार से झुलाना।',
      'दही-हांडी फोड़ना और माखन-मिश्री का भोग लगाना।'
    ],
    festiveTreats: 'Makhan Mishri, Dhaniya Panjiri, Panchamrit, Pedas',
    festiveTreatsHindi: 'माखन-मिश्री, धनिया पंजीरी, पंचामृत और मथुरा के पेड़े',
    artTheme: {
      primaryColor: 'sky',
      bgGradient: 'from-sky-500 via-blue-600 to-indigo-800',
      badgeEmoji: '🪈',
      avatarSymbol: '🍯',
      illustrationType: 'janmashtami',
    },
    keySymbol: '🪈 Floral Swing (Jhula) & Butter Pot',
    sacredAttribute: 'Ananda Utsav (Festival of Divine Joy)',
    funFactForKids: 'Footprints of little baby Krishna are painted with rice paste leading from the doorway inside the house!',
    funFactForKidsHindi: 'घरों के मुख्य द्वार से लेकर पूजा स्थल तक नन्हे कान्हा के चरण-चिन्ह बनाए जाते हैं!',
  },
  {
    id: 'festival-raksha-bandhan',
    category: 'festivals',
    title: 'Raksha Bandhan',
    hindiTitle: 'रक्षाबंधन (भाई-बहन का पावन पर्व)',
    subtitle: 'The Sacred Thread of Love, Care, Protection & Lifelong Friendship',
    imageUrl: '/images/sanatan/festivals/raksha-bandhan.jpg',
    introduction: [
      'Raksha Bandhan celebrates the sweet, unbreakable bond between sisters and brothers.',
      'Sisters tie a colorful, beaded sacred thread called a Rakhi on their brother’s wrist with prayers for his health.',
      'Brothers give lovely gifts and promise to always support, protect, and stand by their sister.'
    ],
    hindiIntroduction: [
      'रक्षाबंधन भाई-बहन के पवित्र प्रेम और अटूट विश्वास का त्यौहार है।',
      'बहनें अपने भाई की कलाई पर रक्षा सूत्र (राखी) बांधती हैं और भाई उनकी सदैव रक्षा का वचन देते हैं।'
    ],
    festiveMonth: 'Shravana Purnima (August)',
    festiveMonthHindi: 'श्रावण पूर्णिमा',
    howKidsCelebrate: [
      'Prepare a glowing Aarti thali with chawal, roli kumkum, fresh flowers, and sparkling Rakhis.',
      'Tie colorful Rakhis on brothers\' and cousins\' wrists while sharing sweet laddus.',
      'Brothers touch elder sisters\' feet or exchange gifts and happy promises.',
      'Families gather together to enjoy a warm festive lunch.'
    ],
    howKidsCelebrateHindi: [
      'सुंदर थाली सजाकर भाई को तिलक लगाना और राखी बांधना।',
      'मिठाई खिलाना और उपहारों का आदान-प्रदान करना।',
      'सदा एक-दूसरे की मदद और रक्षा करने का संकल्प लेना।'
    ],
    festiveTreats: 'Ghewar, Rasgulla, Kaju Katli, Besan Laddus, Kheer',
    festiveTreatsHindi: 'घेवर, रसगुल्ले, काजू कतली और स्वादिष्ट खीर',
    artTheme: {
      primaryColor: 'rose',
      bgGradient: 'from-rose-500 via-pink-600 to-amber-500',
      badgeEmoji: '🧵',
      avatarSymbol: '❤️',
      illustrationType: 'rakshabandhan',
    },
    keySymbol: '🧵 Golden Rakhi Thread & Sweets Thali',
    sacredAttribute: 'Sacred Bond of Sibling Love & Care',
    funFactForKids: 'Draupadi once tore a strip of her silk sari to bandage Lord Krishna\'s finger; in return, Krishna protected her forever!',
    funFactForKidsHindi: 'द्रौपदी ने अपनी साड़ी का पल्लू फाड़कर श्री कृष्ण की उंगली पर बांधा था, और प्रभु ने जीवन भर उनकी रक्षा की!',
  },

  // =========================================================================
  // 6. VALUES & CULTURE (संस्कार व सद्गुण) - Daily Habits, Ahimsa, Respect & Family
  // =========================================================================
  {
    id: 'value-ahimsa',
    category: 'values',
    title: 'Ahimsa (Non-Violence & Kindness)',
    hindiTitle: 'अहिंसा (जीव दया व करुणा)',
    subtitle: 'Gentle Love and Care for All Animals, Birds, Trees & Living Beings',
    imageUrl: '/images/sanatan/values/ahimsa.jpg',
    introduction: [
      'Ahimsa means never hurting any creature through our actions, our words, or even angry thoughts.',
      'It teaches us to see the divine spark of life inside every stray puppy, flying sparrow, and green plant.',
      'When we speak gently and feed birds, our heart becomes radiant and full of peace!'
    ],
    hindiIntroduction: [
      'अहिंसा का अर्थ है मन, वचन और कर्म से किसी भी जीव को कष्ट न पहुँचाना।',
      'सभी पशु-पक्षियों, प्रकृति और मनुष्यों के प्रति दया, प्रेम और करुणा का भाव रखना ही अहिंसा है।'
    ],
    practicalHabit: 'Keep a small earthen bowl of fresh water on your balcony or garden for thirsty birds in summer!',
    practicalHabitHindi: 'गर्मियों में छत या बालकनी पर पक्षियों के लिए पानी का सकोरा और दाना रखना!',
    goldenRule: '"Ahimsa Paramo Dharmah" - Non-violence and kindness is the supreme righteous path.',
    goldenRuleHindi: '\'अहिंसा परमो धर्मः\' - जीवों पर दया करना ही सबसे बड़ा धर्म है।',
    artTheme: {
      primaryColor: 'emerald',
      bgGradient: 'from-emerald-500 via-teal-600 to-green-700',
      badgeEmoji: '🕊️',
      avatarSymbol: '🌱',
      illustrationType: 'ahimsa',
    },
    keySymbol: '🕊️ Lotus & Gentle Bird in Hands',
    sacredAttribute: 'Ahimsa Paramo Dharmah (Kindness to All)',
    funFactForKids: 'Ancient Indian villages set up free bird hospitals and animal shelters called Pinjrapoles over 2000 years ago!',
    funFactForKidsHindi: 'प्राचीन भारत में पक्षियों और बीमार पशुओं के इलाज के लिए विशेष औषधालय बनाए जाते थे!',
  },
  {
    id: 'value-respect-parents',
    category: 'values',
    title: 'Matru-Pitru Devo Bhava',
    hindiTitle: 'मातृ-पितृ देवो भव (माता-पिता व बड़ों का आदर)',
    subtitle: 'Honoring and Loving Our Parents, Grandparents & Elders',
    imageUrl: '/images/sanatan/values/respect-parents.jpg',
    introduction: [
      'Our mother gives us life and sweet care, while our father protects and guides our steps with patience.',
      'The sacred Vedas proclaim: "Matru Devo Bhava, Pitru Devo Bhava, Acharya Devo Bhava" (Revere your mother, father, and teacher as divine!).',
      'Touching the feet of parents and grandparents in the morning showers us with their warm blessings.'
    ],
    hindiIntroduction: [
      'माता-पिता हमारी प्रथम पाठशाला और ईश्वर का साक्षात् रूप हैं जो हमें निःस्वार्थ प्रेम देते हैं।',
      'बड़ों का सम्मान करना, उनकी आज्ञा मानना और उनके चरण स्पर्श करना हमें उत्तम संस्कार देता है।'
    ],
    practicalHabit: 'Touch the feet of your parents or grandparents every morning and say "Pranaam" or "Namaste" with a warm smile!',
    practicalHabitHindi: 'रोज सुबह माता-पिता व दादा-दादी के चरण स्पर्श कर \'प्रणाम\' कहें और उनका आशीर्वाद लें!',
    goldenRule: 'Treat your mother and father with lifelong gratitude, honor, and gentle obedience.',
    goldenRuleHindi: 'माता-पिता की सेवा और सम्मान करना जीवन का सबसे बड़ा पुण्य है।',
    artTheme: {
      primaryColor: 'amber',
      bgGradient: 'from-amber-500 via-orange-600 to-yellow-600',
      badgeEmoji: '🙏',
      avatarSymbol: '❤️',
      illustrationType: 'parents',
    },
    keySymbol: '🙏 Touching Feet & Receiving Blessings',
    sacredAttribute: 'Pitri Bhakti (Devotion to Parents)',
    funFactForKids: 'When asked to circle the entire universe, Lord Ganesha simply walked around His parents Shiva & Parvati, showing they were His whole universe!',
    funFactForKidsHindi: 'जब पूरी दुनिया का चक्कर लगाने की बात आई, तो गणेश जी ने अपने माता-पिता की परिक्रमा कर ली क्योंकि वे ही उनका पूरा संसार थे!',
  },
  {
    id: 'value-vasudhaiva',
    category: 'values',
    title: 'Vasudhaiva Kutumbakam',
    hindiTitle: 'वसुधैव कुटुम्बकम् (संसार एक परिवार)',
    subtitle: 'The Whole World is One Big Beautiful Family Without Borders',
    imageUrl: '/images/sanatan/values/vasudhaiva-kutumbakam.jpg',
    introduction: [
      'Sanatan philosophy sees the entire planet—every country, culture, race, and animal—as one loving family.',
      'No one is a stranger; everyone is our brother, sister, and friend under the same warm sun.',
      'This golden value teaches children to share their toys, welcome new friends, and care for international harmony!'
    ],
    hindiIntroduction: [
      'वसुधैव कुटुम्बकम् का पावन संदेश है कि पूरी पृथ्वी ही हमारा एक विशाल परिवार है।',
      'कोई भी पराया नहीं है, सभी देशों और संस्कृतियों के लोग हमारे भाई-बहन के समान हैं।'
    ],
    practicalHabit: 'Always be kind and welcoming to new children at school or in the playground, no matter where they come from!',
    practicalHabitHindi: 'स्कूल या पार्क में नए बच्चों से प्यार से मिलें, अपनी चीजें साझा करें और मिलकर खेलें!',
    goldenRule: '"Ayam Nijah Paro Veti Ganana Laghuchetasam, Udaracharitanam Tu Vasudhaiva Kutumbakam."',
    goldenRuleHindi: '\'उदार चरितानां तु वसुधैव कुटुम्बकम्\' - विशाल हृदय वाले लोगों के लिए पूरी धरती ही एक परिवार है।',
    artTheme: {
      primaryColor: 'teal',
      bgGradient: 'from-teal-500 via-cyan-600 to-blue-700',
      badgeEmoji: '🌍',
      avatarSymbol: '🤝',
      illustrationType: 'vasudhaiva',
    },
    keySymbol: '🌍 Children of the World Holding Hands',
    sacredAttribute: 'Universal Brotherhood & Love',
    funFactForKids: 'This timeless Sanskrit phrase is carved in gold at the entrance of India’s Parliament hall!',
    funFactForKidsHindi: 'यह महान आदर्श वाक्य भारत की संसद के मुख्य द्वार पर स्वर्णाक्षरों में अंकित है!',
  },
  {
    id: 'value-namaste',
    category: 'values',
    title: 'Namaste & Anjali Mudra',
    hindiTitle: 'नमस्ते व अंजलि मुद्रा',
    subtitle: 'Greeting the Divine Goodness in Every Soul with Folded Hands',
    imageUrl: '/images/sanatan/values/namaste.jpg',
    introduction: [
      'When we bring both palms together near our chest and gently bow our head, we perform the sacred "Namaste".',
      'Namaste means: "The divine spark of goodness in my heart bows to the divine spark in your heart!"',
      'It is a hygienic, respectful, and joyful greeting that spreads positive vibrations everywhere.'
    ],
    hindiIntroduction: [
      'दोनों हाथों को जोड़कर सिर झुकाकर नमस्ते करना भारतीय संस्कृति का सबसे सुंदर और विनम्र अभिवादन है।',
      'इसका अर्थ है कि मैं आपके भीतर विराजमान ईश्वर और सद्गुणों को प्रणाम करता हूँ।'
    ],
    practicalHabit: 'Greet teachers, elders, friends, and guests by joining both hands and saying "Namaste" with a happy face!',
    practicalHabitHindi: 'अतिथियों, शिक्षकों और मित्रों का दोनों हाथ जोड़कर मुस्कुराते हुए \'नमस्ते\' कहकर स्वागत करें!',
    goldenRule: 'See the good in everyone and greet all souls with equal humility and warmth.',
    goldenRuleHindi: 'हर व्यक्ति में अच्छाई देखें और सम्मानपूर्वक व्यवहार करें।',
    artTheme: {
      primaryColor: 'purple',
      bgGradient: 'from-purple-500 via-violet-600 to-indigo-700',
      badgeEmoji: '🙏',
      avatarSymbol: '✨',
      illustrationType: 'namaste',
    },
    keySymbol: '🙏 Anjali Mudra (Folded Palms)',
    sacredAttribute: 'Namaste (I Bow to the Divine in You)',
    funFactForKids: 'Pressing the tips of your fingers together in Namaste stimulates gentle acupressure points that boost memory and calm nerves!',
    funFactForKidsHindi: 'नमस्ते करने से उंगलियों के अग्रभाग आपस में मिलते हैं जिससे एकाग्रता और सकारात्मक ऊर्जा बढ़ती है!',
  },
];
