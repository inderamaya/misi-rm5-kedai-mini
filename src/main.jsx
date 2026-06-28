import React, { useEffect, useMemo, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, RefreshCcw, Trophy, Sparkles, Coins, Map, ShoppingBasket, Brain, Home, BookOpen, Star, ArrowRight, ArrowLeft, Volume1 } from 'lucide-react';
import './styles.css';
import { BUDGET, moneyChoices, items, flowSteps, quiz } from './constants';

const PAGE_ORDER = ['home', 'intro', 'money', 'flow', 'shop', 'wise', 'quiz', 'finish'];

const translations = {
  bm: {
    home: "Utama",
    suara: "Suara",
    title: "DUNIA KEDAI MINI",
    subtitle: "Misi Syiling Doosee",
    mulakanMisi: "Mulakan Misi",
    dunia1: "DUNIA 1: Pintu Masuk",
    selamatDatang: "Selamat Datang ke Dunia Kedai Mini!",
    kenaliRM5: "Kenali Wang",
    petaAlir: "Peta Alir",
    misiKedai: "Misi Kedai",
    pilihanBijak: "Pilihan Bijak",
    panduanGuru: "Panduan Guru",
    lencanaSaya: "Lencana Saya",
    belumAdaLencana: "Belum ada lencana. Mari mula misi.",
    pengenalan: "Pengenalan",
    haiPembeliBijak: "Hai Pembeli Bijak!",
    kamuAdaRM5: "Kamu ada RM5. Mari belajar cara membeli barang dengan bijak.",
    contohMudah: "Contoh Mudah:",
    jumlah: "Jumlah",
    baki: "Baki",
    seterusnya: "Seterusnya",
    tahap1: "TAHAP 1",
    klikRM5: "Klik wang yang bernilai RM5.",
    hebatRM5: "Doosee bangga dengan kamu! Ini RM5 untuk misi hari ini.",
    cubaLagiRM5: "Cuba lagi. Cari wang yang tertulis RM5.",
    tahap2: "TAHAP 2",
    petaAlirTitle: "Peta Alir Pembeli Bijak",
    tekanLangkah: "Tekan setiap langkah mengikut urutan (1 hingga 6).",
    levelClear: "Hebat! Doosee gembira kamu ikut peta alir dengan betul.",
    tahap3: "TAHAP 3",
    kedaiMini: "Kedai Mini Ajaib",
    pilihKeperluan: "Kamu ada RM5. Pilih barang keperluan dahulu.",
    troliSaya: "Troli Saya",
    pilihBarang: "Pilih barang...",
    wangTidakCukup: "Wang tidak cukup!",
    pilihBarangKeperluan: "Pilih barang keperluan.",
    bijakWangCukup: "Bijak! Doosee kata wang kamu cukup.",
    tahap4: "TAHAP 4",
    cartaBijak: "Carta Bijak",
    bandingBarang: "Bandingkan barang menggunakan bintang.",
    hargaSesuai: "Harga Sesuai",
    diperlukan: "Diperlukan",
    baikDiri: "Baik untuk Diri",
    soalanBijak: "Soalan Bijak:",
    pendapatDoosee: "Pendapat Doosee:",
    pilihKerana: "Adakah ini pilihan bijak? Mengapa?",
    placeholderReason: "Saya pilih ... kerana...",
    tahap5: "TAHAP 5",
    kuiz: "Kuiz Pengukuhan",
    skorAnda: "Skor Anda",
    tamatMisi: "Tamat Misi",
    istana: "Istana Pembeli Bijak",
    misiBerjaya: "TAHNIAH! DOOSEE KATA KAMU BERJAYA!",
    menjadiPembeliBijak: "Doosee bangga kamu telah menjadi Pembeli Bijak di Dunia Kedai Mini.",
    koleksiLencana: "Koleksi Lencana Anda:",
    kembaliMula: "Kembali Ke Mula",
    simpanPDF: "Simpan PDF",
    rasional: "Rasional Reka Bentuk Digital",
    tahniahLencana: "Tahniah! Anda mendapat",
    tahniahLencanaShort: "Tahniah! Anda telah memenangi",
    resetConfirm: "Adakah anda pasti mahu set semula semua kemajuan?",
    resetBtn: "Reset",
    kembali: "Kembali",
    modPanduan: "Mod Panduan",
    modHidup: "Mod: Hidup",
    modMati: "Mod: Mati",
    tahap: "Tahap",
    badges: {
      "Lencana Wang": "Lencana Wang",
      "Lencana Peta Alir": "Lencana Peta Alir",
      "Pembeli Bijak": "Pembeli Bijak",
      "Lencana Carta Bijak": "Lencana Carta Bijak",
      "Juara Dunia Syiling RM5": "Juara Dunia Kedai Mini"
    }
  },
  en: {
    home: "Home",
    suara: "Sound",
    title: "MINI SHOP WORLD",
    subtitle: "Doosee Coin Mission",
    mulakanMisi: "Start Mission",
    dunia1: "WORLD 1: Entrance",
    selamatDatang: "Welcome to Mini Shop World!",
    kenaliRM5: "Identify Money",
    petaAlir: "Flow Map",
    misiKedai: "Shop Mission",
    pilihanBijak: "Wise Choice",
    panduanGuru: "Teacher's Guide",
    lencanaSaya: "My Badges",
    belumAdaLencana: "No badges yet. Let's start the mission.",
    pengenalan: "Introduction",
    haiPembeliBijak: "Hi Wise Buyer!",
    kamuAdaRM5: "You have RM5. Let's learn how to buy items wisely.",
    contohMudah: "Simple Example:",
    jumlah: "Total",
    baki: "Balance",
    seterusnya: "Next",
    tahap1: "LEVEL 1",
    klikRM5: "Click the money that is worth RM5.",
    hebatRM5: "Doosee is proud of you! This is RM5 for today's mission.",
    cubaLagiRM5: "Try again. Find the money with RM5 written on it.",
    tahap2: "LEVEL 2",
    petaAlirTitle: "Wise Buyer Flow Map",
    tekanLangkah: "Press each step in order (1 to 6).",
    levelClear: "Great! Doosee is happy you followed the flow map correctly.",
    tahap3: "LEVEL 3",
    kedaiMini: "Magic Mini Shop",
    pilihKeperluan: "You have RM5. Choose needs first.",
    troliSaya: "My Cart",
    pilihBarang: "Choose items...",
    wangTidakCukup: "Not enough money!",
    pilihBarangKeperluan: "Choose needed items.",
    bijakWangCukup: "Wise! Doosee says you have enough money.",
    tahap4: "LEVEL 4",
    cartaBijak: "Wise Chart",
    bandingBarang: "Compare items using stars.",
    hargaSesuai: "Suitable Price",
    diperlukan: "Needed",
    baikDiri: "Good for Self",
    soalanBijak: "Wise Question:",
    pendapatDoosee: "Doosee's Opinion:",
    pilihKerana: "Is this a wise choice? Why?",
    placeholderReason: "I choose ... because...",
    tahap5: "LEVEL 5",
    kuiz: "Reinforcement Quiz",
    skorAnda: "Your Score",
    tamatMisi: "Finish Mission",
    istana: "Wise Buyer Palace",
    misiBerjaya: "CONGRATULATIONS! DOOSEE SAYS MISSION SUCCESS!",
    menjadiPembeliBijak: "Doosee is proud you have become a Wise Buyer in Mini Shop World.",
    koleksiLencana: "Your Badge Collection:",
    kembaliMula: "Back to Start",
    simpanPDF: "Save PDF",
    rasional: "Digital Design Rationale",
    tahniahLencana: "Congratulations! You got",
    tahniahLencanaShort: "Congratulations! You have won",
    resetConfirm: "Are you sure you want to reset all progress?",
    resetBtn: "Reset",
    kembali: "Back",
    modPanduan: "Guided Mode",
    modHidup: "Mod: ON",
    modMati: "Mod: OFF",
    tahap: "Level",
    badges: {
      "Lencana Wang": "Money Badge",
      "Lencana Peta Alir": "Flow Map Badge",
      "Pembeli Bijak": "Wise Buyer",
      "Lencana Carta Bijak": "Wise Chart Badge",
      "Juara Dunia Syiling RM5": "Mini Shop World Champion"
    }
  }
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('misi-rm5-progress')) || { badges: [], quizScore: 0 };
  } catch {
    return { badges: [], quizScore: 0 };
  }
}

function saveProgress(progress) {
  localStorage.setItem('misi-rm5-progress', JSON.stringify(progress));
}

const SOUNDS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  correct: 'https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3',
  wrong: 'https://assets.mixkit.co/active_storage/sfx/2688/2688-preview.mp3',
  pageChange: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
};

function playSFX(type, enabled) {
  if (!enabled || !SOUNDS[type]) return;
  const audio = new Audio(SOUNDS[type]);
  audio.volume = 0.5;
  audio.play().catch(() => {});
}

// Custom SVG Icons
function speakAllText(texts, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();
  
  const performSpeak = (availableVoices) => {
    texts.forEach((text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'bm' ? 'ms-MY' : 'en-US';

      // Explicitly find and set the voice to ensure correct speaker
      if (lang === 'bm') {
        const msVoice = availableVoices.find(v => v.lang.toLowerCase().includes('ms-my')) ||
                        availableVoices.find(v => v.lang.toLowerCase().includes('ms'));
        if (msVoice) utterance.voice = msVoice;
      } else {
        const enVoice = availableVoices.find(v => v.lang.toLowerCase().includes('en-us')) ||
                        availableVoices.find(v => v.lang.toLowerCase().includes('en'));
        if (enVoice) utterance.voice = enVoice;
      }

      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    });
  };

  if (voices.length === 0) {
    const handleVoicesChanged = () => {
      const updatedVoices = window.speechSynthesis.getVoices();
      performSpeak(updatedVoices);
    };
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged, { once: true });
  } else {
    performSpeak(voices);
  }
}

function SpeakerButton({ texts, lang }) {
  const [speaking, setSpeaking] = useState(false);
  const checkInterval = useRef(null);

  const handleSpeak = () => {
    speakAllText(texts, lang);
    setSpeaking(true);
    
    if (checkInterval.current) clearInterval(checkInterval.current);
    checkInterval.current = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        setSpeaking(false);
        clearInterval(checkInterval.current);
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const unsupported = !window.speechSynthesis;

  return (
    <button 
      className={`dengar-btn ${speaking ? 'speaking' : ''}`} 
      onClick={handleSpeak}
      title={unsupported ? (lang === 'bm' ? 'Audio tidak disokong' : 'Audio not supported') : ''}
      disabled={unsupported}
    >
      <Volume1 />
      <span>{lang === 'bm' ? 'Dengar' : 'Listen'}</span>
    </button>
  );
}

const Icons = {
  note1: () => (
    <svg width="80" height="40" viewBox="0 0 80 40">
      <rect width="80" height="40" rx="4" fill="#69D34F" stroke="#1C1C1C" strokeWidth="3" />
      <circle cx="40" cy="20" r="12" fill="none" stroke="#1C1C1C" strokeWidth="2" />
      <text x="40" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1C1C">RM1</text>
    </svg>
  ),
  note5: () => (
    <svg width="80" height="40" viewBox="0 0 80 40">
      <rect width="80" height="40" rx="4" fill="#5BCBFF" stroke="#1C1C1C" strokeWidth="3" />
      <circle cx="40" cy="20" r="12" fill="none" stroke="#1C1C1C" strokeWidth="2" />
      <text x="40" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1C1C">RM5</text>
    </svg>
  ),
  note10: () => (
    <svg width="80" height="40" viewBox="0 0 80 40">
      <rect width="80" height="40" rx="4" fill="#E9443A" stroke="#1C1C1C" strokeWidth="3" />
      <circle cx="40" cy="20" r="12" fill="none" stroke="#1C1C1C" strokeWidth="2" />
      <text x="40" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1C1C1C">RM10</text>
    </svg>
  ),
  water: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <path d="M25 5 L15 25 Q15 40 25 40 Q35 40 35 25 L25 5" fill="#5BCBFF" stroke="#1C1C1C" strokeWidth="3" />
    </svg>
  ),
  bread: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="10" y="15" width="30" height="25" rx="5" fill="#D96B32" stroke="#1C1C1C" strokeWidth="3" />
      <path d="M10 20 Q25 10 40 20" fill="none" stroke="#1C1C1C" strokeWidth="3" />
    </svg>
  ),
  banana: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <path d="M15 10 Q25 5 35 15 Q45 25 35 40 Q25 45 15 35 Q5 25 15 10" fill="#FFD447" stroke="#1C1C1C" strokeWidth="3" />
      <path d="M15 10 Q20 15 25 25" fill="none" stroke="#1C1C1C" strokeWidth="1" />
    </svg>
  ),
  milk: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="12" y="10" width="26" height="32" fill="#FFFFFF" stroke="#1C1C1C" strokeWidth="3" />
      <path d="M12 20 L38 20" stroke="#1C1C1C" strokeWidth="2" />
      <text x="25" y="32" textAnchor="middle" fontSize="8" fontWeight="bold">MILK</text>
    </svg>
  ),
  book: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="10" y="10" width="30" height="35" rx="2" fill="#1F63C7" stroke="#1C1C1C" strokeWidth="3" />
      <line x1="15" y1="18" x2="35" y2="18" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="15" y1="25" x2="35" y2="25" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  ),
  toy: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="10" y="25" width="15" height="15" fill="#E9443A" stroke="#1C1C1C" strokeWidth="2" />
      <rect x="25" y="25" width="15" height="15" fill="#5BCBFF" stroke="#1C1C1C" strokeWidth="2" />
      <rect x="17" y="10" width="15" height="15" fill="#FFD447" stroke="#1C1C1C" strokeWidth="2" />
    </svg>
  ),
  apple: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="28" r="15" fill="#E9443A" stroke="#1C1C1C" strokeWidth="3" />
      <path d="M25 13 L25 8" stroke="#8B5A2B" strokeWidth="3" />
      <path d="M25 13 L30 10" fill="#3CB043" stroke="#1C1C1C" strokeWidth="1" />
    </svg>
  ),
  pencil: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="20" y="10" width="10" height="30" fill="#FFD447" stroke="#1C1C1C" strokeWidth="2" />
      <path d="M20 40 L25 48 L30 40 Z" fill="#FFF6D8" stroke="#1C1C1C" strokeWidth="2" />
      <circle cx="25" cy="48" r="2" fill="#1C1C1C" />
      <rect x="20" y="10" width="10" height="5" fill="#E9443A" stroke="#1C1C1C" strokeWidth="2" />
    </svg>
  ),
  eraser: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect x="10" y="20" width="30" height="15" rx="2" fill="#FFC0CB" stroke="#1C1C1C" strokeWidth="3" transform="rotate(-15, 25, 27.5)" />
    </svg>
  ),
  biscuits: () => (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#D96B32" stroke="#1C1C1C" strokeWidth="3" />
      <circle cx="18" cy="18" r="2" fill="#1C1C1C" />
      <circle cx="32" cy="18" r="2" fill="#1C1C1C" />
      <circle cx="25" cy="32" r="2" fill="#1C1C1C" />
      <circle cx="18" cy="32" r="2" fill="#1C1C1C" />
      <circle cx="32" cy="32" r="2" fill="#1C1C1C" />
    </svg>
  ),
  look_money: () => <Coins size={32} />,
  look_price: () => <BookOpen size={32} />,
  choose_item: () => <ShoppingBasket size={32} />,
  calculate: () => <Star size={32} />,
  check_balance: () => <Brain size={32} />,
  pay: () => <ArrowRight size={32} />,
};

function Doosee({ className = "", style = {}, expression = "thinking" }) {
  return (
    <div className={`didi-duit bounce ${expression} ${className}`} style={style}>
      <div className="doosee-bubble">Doosee!</div>
      <div className="sparkle-overlay">
        <div className="sparkle" style={{top: '10%', left: '10%', width: '15px', height: '15px'}}></div>
        <div className="sparkle" style={{top: '20%', right: '15%', width: '10px', height: '10px', animationDelay: '0.2s'}}></div>
        <div className="sparkle" style={{bottom: '20%', left: '20%', width: '12px', height: '12px', animationDelay: '0.4s'}}></div>
      </div>
      <div className="didi-eyes">
        <div className="didi-eye"></div>
        <div className="didi-eye"></div>
      </div>
      <div className="didi-smile"></div>
    </div>
  );
}

function GuideText({ iconType, text }) {
  const IconMap = {
    click: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="m21 12-2.3 2.3" />
        <path d="M12 3v2.3" />
        <path d="m5.6 5.6 1.7 1.7" />
        <path d="M3 12h2.3" />
        <path d="m5.6 18.4 1.7-1.7" />
        <path d="M12 21v-2.3" />
        <path d="m18.4 18.4-1.7-1.7" />
        <path d="m18.4 5.6-1.7 1.7" />
      </svg>
    ),
    look: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    drag: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 9-3 3 3 3" />
        <path d="m19 9 3 3-3 3" />
        <path d="m9 5 3-3 3 3" />
        <path d="m9 19 3 3 3-3" />
      </svg>
    ),
    star: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
         <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
       </svg>
    )
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', verticalAlign: 'middle' }}>
      <span style={{ color: 'var(--red)', display: 'flex' }}>{IconMap[iconType] || IconMap.click}</span>
      <span>{text}</span>
    </div>
  );
}

function StarRating({ label, value }) {
  return (
    <div className="star-line" aria-label={`${label}: ${value} stars`}>
      <span style={{fontWeight: '900'}}>{label}</span>
      <span className="star-group">{'★'.repeat(value)}{'☆'.repeat(3 - value)}</span>
    </div>
  );
}

function Header({ page, setPage, soundOn, setSoundOn, lang, setLang, guideMode, setGuideMode, t }) {
  return (
    <header className="topbar">
      <button className="homeBtn" onClick={() => { playSFX('click', soundOn); setPage('home'); }}><Home size={18} /> {t.home}</button>
      <div className="brand">
        <Doosee className="mini" style={{ width: '40px', height: '40px', borderWidth: '3px', animation: 'none' }} />
        <div>
          <strong>{t.title}</strong>
          <small>{t.subtitle}</small>
        </div>
      </div>
      <div className="tools">
        <button className={`miniBtn ${guideMode ? 'speaking' : ''}`} onClick={() => setGuideMode(!guideMode)}>
          <RefreshCcw size={17} /> {guideMode ? t.modHidup : t.modMati}
        </button>
        <button className="miniBtn" onClick={() => setSoundOn(!soundOn)}>{soundOn ? <Volume2 size={17}/> : <VolumeX size={17}/>} {t.suara}</button>
        <button className="miniBtn" onClick={() => setLang(lang === 'bm' ? 'en' : 'bm')}>
          {lang === 'bm' ? 'English' : 'B. Melayu'}
        </button>
      </div>
    </header>
  );
}

function HomeScreen({ setPage, soundOn, lang, progress, t, expression }) {
  const speechTexts = lang === 'bm' 
    ? [t.title, t.subtitle, t.selamatDatang] 
    : [t.title, t.subtitle, t.selamatDatang];

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="heroCard castlePanel">
        <div className="heroText">
          <div className="badge-label">{t.dunia1}</div>
          <h1>{t.selamatDatang}</h1>
          <p style={{fontSize: '1.2rem', fontWeight: '900', marginBottom: '20px'}}>{t.subtitle}</p>
          <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <button className="primaryBtn brick-style" onClick={() => { playSFX('click', soundOn); setPage('intro'); }}><Sparkles size={20}/> {t.mulakanMisi}</button>
          </div>
        </div>
        <Doosee expression={expression} />
      </section>

      <section className="objectiveGrid">
        <button className="level-card" onClick={() => { playSFX('click', soundOn); setPage('money'); }}>
          <div className="lvl-icon"><Coins size={30} /></div>
          <span>{t.kenaliRM5}</span>
        </button>
        <button className="level-card" onClick={() => { playSFX('click', soundOn); setPage('flow'); }}>
          <div className="lvl-icon"><Map size={30} /></div>
          <span>{t.petaAlir}</span>
        </button>
        <button className="level-card" onClick={() => { playSFX('click', soundOn); setPage('shop'); }}>
          <div className="lvl-icon"><ShoppingBasket size={30} /></div>
          <span>{t.misiKedai}</span>
        </button>
        <button className="level-card" onClick={() => { playSFX('click', soundOn); setPage('wise'); }}>
          <div className="lvl-icon"><Brain size={30} /></div>
          <span>{t.pilihanBijak}</span>
        </button>
        <button className="level-card" onClick={() => { playSFX('click', soundOn); setPage('teacher'); }}>
          <div className="lvl-icon"><BookOpen size={30} /></div>
          <span>{t.panduanGuru}</span>
        </button>
      </section>

      <section className="progressBox">
        <h2>{t.lencanaSaya}</h2>
        <div className="badge-row">
          {progress.badges.length ? progress.badges.map(b => (
            <button
              key={b}
              className="medal bounce"
              title={t.badges[b] || b}
              aria-label={`Badge: ${t.badges[b] || b}`}
            >
              {b.includes('Wang') && <Coins size={40} />}
              {b.includes('Peta Alir') && <Map size={40} />}
              {b.includes('Pembeli Bijak') && <ShoppingBasket size={40} />}
              {b.includes('Carta Bijak') && <Brain size={40} />}
              {b.includes('Juara') && <Trophy size={40} />}
              <small style={{display: 'block', fontSize: '0.7rem', marginTop: '5px'}}>{t.badges[b] || b}</small>
            </button>
          )) : <p className="muted">{t.belumAdaLencana}</p>}
        </div>
      </section>
    </main>
  );
}

function IntroScreen({ setPage, soundOn, lang, t, expression }) {
  const speechTexts = lang === 'bm'
    ? ["Pengenalan. Hai Pembeli Bijak! Kamu ada RM5. Mari belajar cara membeli barang dengan bijak. Contoh Mudah: Roti RM2, Air Mineral RM1. Jumlah RM3. Baki RM2."]
    : ["Introduction. Hi Wise Buyer! You have RM5. Let's learn how to buy items wisely. Simple Example: Bread RM2, Mineral Water RM1. Total RM3. Balance RM2."];

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard brick-panel" style={{position: 'relative'}}>
        <Doosee expression={expression} className="mini" style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px'}} />
        <div className="badge-label" style={{background: 'var(--white)', color: 'var(--outline)'}}>{t.pengenalan}</div>
        <h1 style={{color: 'var(--coin)'}}>{t.haiPembeliBijak}</h1>
        <p style={{fontSize: '1.3rem', fontWeight: '900'}}>
          <GuideText iconType="look" text={t.kamuAdaRM5} />
        </p>

        <div className="wooden-sign" style={{margin: '30px 0'}}>
          <h2 style={{marginTop: 0}}>{t.contohMudah}</h2>
          <p>{lang === 'bm' ? 'Roti' : 'Bread'} = RM2</p>
          <p>{lang === 'bm' ? 'Air Mineral' : 'Mineral Water'} = RM1</p>
          <hr style={{borderColor: 'rgba(255,255,255,0.2)'}} />
          <p><strong>{t.jumlah}:</strong> RM2 + RM1 = RM3</p>
          <p><strong>{t.baki}:</strong> RM5 - RM3 = RM2</p>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('home'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" onClick={() => { playSFX('click', soundOn); setPage('money'); }}>{t.seterusnya}: {t.kenaliRM5} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function MoneyScreen({ setPage, soundOn, lang, setProgress, t, guideMode, setDooseeState, expression }) {
  const [chosen, setChosen] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const speechTexts = lang === 'bm'
    ? ["Tahap 1. Kenali Wang. Klik wang yang bernilai RM5."]
    : ["Level 1. Identify Money. Click the money worth RM5."];
  const correct = chosen === 'rm5';

  useEffect(() => {
    setDooseeState('thinking');
  }, [setDooseeState]);

  function award() {
    setProgress(prev => {
      const badges = prev.badges.includes('Lencana Wang') ? prev.badges : [...prev.badges, 'Lencana Wang'];
      return { ...prev, badges };
    });
  }
  useEffect(() => { if (correct) award(); }, [correct]);

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard" style={{position: 'relative'}}>
        <Doosee expression={expression} className="mini" style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px'}} />
        <div className="badge-label">{t.tahap1}</div>
        <h1>{t.kenaliRM5}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>
          <GuideText iconType="click" text={t.klikRM5} />
        </p>

        <div className="moneyGrid">
          {moneyChoices.map(m => (
            <button key={m.id} className={`platform-card ${chosen === m.id ? 'selected' : ''} ${guideMode && m.id !== 'rm5' ? 'guided-inactive' : ''} ${guideMode && m.id === 'rm5' && !chosen ? 'guide-highlight' : ''} ${chosen === m.id ? (feedback === 'correct' ? 'feedback-correct' : (feedback === 'wrong' ? 'feedback-wrong' : '')) : ''}`} onClick={() => {
              setChosen(m.id);
              if (m.id === 'rm5') {
                playSFX('correct', soundOn);
                setDooseeState('happy');
                setFeedback('correct');
              } else {
                playSFX('wrong', soundOn);
                setDooseeState('encouraging');
                setFeedback('wrong');
              }
              setTimeout(() => setFeedback(null), 500);
            }}>
              <div className="coin-block" style={{background: m.id === 'rm5' ? 'var(--coin)' : '#ccc'}}>
                {Icons[m.type]()}
              </div>
              <strong style={{fontSize: '1.5rem'}}>{m.label}</strong>
            </button>
          ))}
        </div>

        {chosen && (
          <div className={`toast ${correct ? 'success' : 'error'}`} aria-live="polite">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              {correct && <Doosee className="mini" expression={expression} style={{ width: '60px', height: '60px', borderWidth: '4px' }} />}
              <span>{correct ? t.hebatRM5 : t.cubaLagiRM5}</span>
            </div>
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('intro'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" disabled={!correct} onClick={() => { playSFX('click', soundOn); setPage('flow'); }}>{t.seterusnya}: {t.petaAlir} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function FlowScreen({ setPage, soundOn, lang, setProgress, t, guideMode, setDooseeState, expression }) {
  const [done, setDone] = useState([]);
  const [feedback, setFeedback] = useState({ idx: null, type: null });
  const speechTexts = lang === 'bm'
    ? ["Tahap 2. Peta Alir Pembeli Bijak. Tekan setiap langkah mengikut urutan 1 hingga 6."]
    : ["Level 2. Wise Buyer Flow Map. Press each step in order 1 to 6."];
  const complete = done.length === flowSteps.length;

  useEffect(() => {
    setDooseeState('thinking');
  }, [setDooseeState]);

  useEffect(() => {
    if (complete) {
      setProgress(prev => {
        const badges = prev.badges.includes('Lencana Peta Alir') ? prev.badges : [...prev.badges, 'Lencana Peta Alir'];
        return { ...prev, badges };
      });
    }
  }, [complete, setProgress]);

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard" style={{position: 'relative'}}>
        <Doosee expression={expression} className="mini" style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px'}} />
        <div className="badge-label">{t.tahap2}</div>
        <h1>{t.petaAlirTitle}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>
          <GuideText iconType="click" text={t.tekanLangkah} />
        </p>

        <div className="flowPath">
          {flowSteps.map((s, idx) => {
            const isActive = done.includes(idx);
            const isNext = idx === done.length;
            return (
              <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <button
                  className={`stepping-stone ${isActive ? 'active' : ''} ${guideMode && !isActive && !isNext ? 'guided-inactive' : ''} ${guideMode && isNext ? 'guide-highlight' : ''} ${feedback.idx === idx ? (feedback.type === 'correct' ? 'feedback-correct' : 'feedback-wrong') : ''}`}
                  onClick={() => {
                    if (idx === done.length) {
                      setDone(prev => [...prev, idx]);
                      playSFX('correct', soundOn);
                      setDooseeState(idx === flowSteps.length - 1 ? 'celebrating' : 'happy');
                      setFeedback({ idx, type: 'correct' });
                    } else {
                      playSFX('wrong', soundOn);
                      setDooseeState('encouraging');
                      setFeedback({ idx, type: 'wrong' });
                    }
                    setTimeout(() => setFeedback({ idx: null, type: null }), 500);
                  }}
                >
                  <div className="step-num">{idx + 1}</div>
                  <div style={{margin: '10px 0'}}>{Icons[s.type]()}</div>
                  <div style={{fontSize: '0.9rem'}}>{s.title[lang]}</div>
                </button>
                {idx < flowSteps.length - 1 && <ArrowRight size={30} color="var(--outline)" />}
              </div>
            );
          })}
        </div>

        {complete && (
          <div className="toast success" aria-live="polite">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
            <Doosee expression={expression} />
              <span>{t.levelClear}</span>
            </div>
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('money'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" disabled={!complete} onClick={() => { playSFX('click', soundOn); setPage('shop'); }}>{t.seterusnya}: {t.misiKedai} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}
function ShopScreen({ setPage, soundOn, lang, setProgress, t, guideMode, setDooseeState, expression }) {
  const [basket, setBasket] = useState([]);
  const speechTexts = lang === 'bm'
    ? ["Tahap 3. Kedai Mini Ajaib. Kamu ada RM5. Pilih barang keperluan dahulu."]
    : ["Level 3. Magic Mini Shop. You have RM5. Choose needs first."];
  const [dragOver, setDragOver] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setDooseeState('thinking');
  }, [setDooseeState]);

  const total = basket.reduce((sum, id) => sum + items.find(i => i.id === id).price, 0);
  const balance = BUDGET - total;
  const valid = total > 0 && total <= BUDGET;
  const hasNeed = basket.some(id => items.find(i => i.id === id).tag.bm === 'KEPERLUAN');
  const excellent = valid && hasNeed;

  const groupedBasket = useMemo(() => {
    const counts = {};
    basket.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
    return Object.entries(counts).map(([id, count]) => ({
      item: items.find(i => i.id === id),
      count
    }));
  }, [basket]);

  function toggleItem(id, isAdding = null) {
    const item = items.find(i => i.id === id);
    const shouldAdd = isAdding !== null ? isAdding : true;

    if (shouldAdd) {
      if (total + item.price <= BUDGET) {
        setBasket(prev => [...prev, id]);
        setFeedback('correct');
        playSFX('correct', soundOn);
        setDooseeState('happy');
      } else {
        setFeedback('wrong');
        playSFX('wrong', soundOn);
        setDooseeState('encouraging');
      }
    } else {
      const idx = basket.indexOf(id);
      if (idx !== -1) {
        setBasket(prev => {
          const next = [...prev];
          next.splice(idx, 1);
          return next;
        });
        playSFX('click', soundOn);
        setDooseeState('thinking');
      }
    }
    setTimeout(() => setFeedback(null), 500);
  }

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) toggleItem(id, true);
  };

  useEffect(() => {
    if (excellent) {
      setProgress(prev => {
        const badges = prev.badges.includes('Pembeli Bijak') ? prev.badges : [...prev.badges, 'Pembeli Bijak'];
        return { ...prev, badges };
      });
    }
  }, [excellent, setProgress]);

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard" style={{position: 'relative'}}>
        <Doosee expression={expression} className="mini" style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px'}} />
        <div className="badge-label">{t.tahap3}</div>
        <h1>{t.kedaiMini}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>
          <GuideText iconType="drag" text={t.pilihKeperluan} />
        </p>

        <div className="shopLayout">
          <div className="itemGrid">
            {items.map(item => {
              const isNeed = item.tag.bm === 'KEPERLUAN';
              const inBasket = basket.includes(item.id);
              const firstMissingNeed = items.find(i => i.tag.bm === 'KEPERLUAN' && !basket.includes(i.id));
              const isHighlighted = guideMode && firstMissingNeed && firstMissingNeed.id === item.id;
              const isInactive = guideMode && (!isNeed || (firstMissingNeed && firstMissingNeed.id !== item.id)) && !inBasket;

              return (
                <button
                  key={item.id}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className={`platform-card shop-item-card ${inBasket ? 'selected' : ''} ${isInactive ? 'guided-inactive' : ''} ${isHighlighted ? 'guide-highlight' : ''}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div style={{background: 'var(--cream)', borderRadius: '50%', padding: '10px', border: '3px solid var(--outline)', position: 'relative'}}>
                    {Icons[item.type]()}
                    <div className="add-btn" style={{position: 'absolute', bottom: '-10px', right: '-10px'}}>+</div>
                  </div>
                  <strong>{item.name[lang]}</strong>
                  <span className="price-tag">RM{item.price}</span>
                  <small style={{fontWeight: '900', color: item.tag.bm === 'KEPERLUAN' ? 'var(--grass)' : 'var(--red)'}}>{item.tag[lang]}</small>
                </button>
              );
            })}
          </div>

          <aside className={`wooden-sign basket-drop-zone ${dragOver ? 'drag-over' : ''} ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'wrong' ? 'feedback-wrong' : ''}`}
                 onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                 onDragLeave={() => setDragOver(false)}
                 onDrop={handleDrop}>
            <h2 style={{marginTop: 0}}>{t.troliSaya} 🛒</h2>
            {dragOver && <div style={{textAlign: 'center', color: 'var(--coin)', fontWeight: 'bold', marginBottom: '10px'}}>{lang === 'bm' ? 'Lepaskan di sini!' : 'Release here!'}</div>}
            {basket.length === 0 ? <p>{t.pilihBarang}</p> : groupedBasket.map(({ item, count }) => {
              return <div key={item.id} className="basket-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                <span>{item.name[lang]} {count > 1 ? `x${count}` : ''} (RM{item.price * count})</span>
                <button
                  onClick={() => { toggleItem(item.id, false); }}
                  style={{background: 'var(--red)', color: 'var(--white)', border: '2px solid var(--outline)', borderRadius: '5px', cursor: 'pointer', padding: '2px 8px', fontWeight: 'bold'}}
                >X</button>
              </div>
            })}
            <hr style={{borderColor: 'rgba(255,255,255,0.3)'}} />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900'}}>
              <span>{t.jumlah}:</span>
              <span>RM{total}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', color: balance < 0 ? 'var(--red)' : 'var(--coin)'}}>
              <span>{t.baki}:</span>
              <span>RM{balance}</span>
            </div>

            <div style={{marginTop: '20px'}} aria-live="polite">
              {total > BUDGET && <div className="toast error" style={{fontSize: '0.9rem', padding: '10px'}}>{t.wangTidakCukup}</div>}
              {valid && !hasNeed && <div className="toast error" style={{fontSize: '0.9rem', padding: '10px'}}>{t.pilihBarangKeperluan}</div>}
              {excellent && <div className="toast success" style={{fontSize: '0.9rem', padding: '10px', color: 'var(--outline)'}}>{t.bijakWangCukup}</div>}
            </div>
          </aside>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('flow'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" disabled={!excellent} onClick={() => { playSFX('click', soundOn); setPage('wise'); }}>{t.seterusnya}: {t.pilihanBijak} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function WiseChoiceScreen({ setPage, soundOn, lang, setProgress, t, expression, setDooseeState }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const speechTexts = lang === 'bm'
    ? ["Tahap 4. Carta Bijak. Bandingkan barang menggunakan bintang."]
    : ["Level 4. Wise Chart. Compare items using stars."];
  const [reason, setReason] = useState("");
  const active = items[activeIdx];

  useEffect(() => {
    setDooseeState('thinking');
  }, [setDooseeState]);

  useEffect(() => {
    setProgress(prev => {
      const badges = prev.badges.includes('Lencana Carta Bijak') ? prev.badges : [...prev.badges, 'Lencana Carta Bijak'];
      return { ...prev, badges };
    });
  }, [setProgress]);

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard">
        <div className="badge-label">{t.tahap4}</div>
        <h1>{t.cartaBijak}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>
          <GuideText iconType="look" text={t.bandingBarang} />
        </p>

        <div className="wiseLayout">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
            {items.map((item, idx) => (
              <button key={item.id} className={`platform-card ${activeIdx === idx ? 'selected' : ''}`} onClick={() => {
                playSFX('click', soundOn);
                setActiveIdx(idx);
                setDooseeState('happy');
              }}>
                {Icons[item.type]()}
                <small>{item.name[lang]}</small>
              </button>
            ))}
          </div>

          <div className="radarCard" style={{background: 'var(--cream)', position: 'relative', overflow: 'hidden'}}>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
              <div className="bounce" style={{display: 'inline-block'}}>{Icons[active.type]()}</div>
              <h2 style={{margin: '10px 0'}}>{active.name[lang]}</h2>
              <span className="price-tag">RM{active.price}</span>
            </div>

            <StarRating label={t.hargaSesuai} value={active.price <= 2 ? 3 : active.price <= 4 ? 2 : 1} />
            <StarRating label={t.diperlukan} value={active.need} />
            <StarRating label={t.baikDiri} value={active.good} />

            <div className="wooden-sign" style={{ marginTop: '20px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Doosee className="mini" expression={expression} style={{ width: '50px', height: '50px', borderWidth: '4px' }} />
                <div>
                  <strong>{t.pendapatDoosee}</strong>
                  <p style={{ margin: '5px 0 0', fontSize: '1rem', lineHeight: '1.4' }}>
                    "{active.opinion[lang]}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('shop'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" onClick={() => { playSFX('click', soundOn); setPage('quiz'); }}>{t.seterusnya}: {t.kuiz} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function QuizScreen({ setPage, soundOn, lang, setProgress, t, guideMode, setDooseeState, expression }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({ qIdx: null, optIdx: null, type: null });
  const speechTexts = lang === 'bm'
    ? ["Tahap 5. Kuiz Pengukuhan. Jawab semua soalan."]
    : ["Level 5. Reinforcement Quiz. Answer all questions."];

  useEffect(() => {
    setDooseeState('thinking');
  }, [setDooseeState]);

  const shuffledOptions = useMemo(() => {
    return quiz.map(q => {
      const opts = q.options[lang].map((text, index) => ({ text, index }));
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return opts;
    });
  }, [lang]);

  const answered = Object.keys(answers).length;
  const score = quiz.reduce((sum, q, idx) => sum + (answers[idx] === q.answer ? 1 : 0), 0);
  const complete = answered === quiz.length;

  useEffect(() => {
    if (complete && score >= 4) {
      setProgress(prev => {
        const badges = prev.badges.includes('Juara Dunia Syiling RM5') ? prev.badges : [...prev.badges, 'Juara Dunia Syiling RM5'];
        return { ...prev, badges, quizScore: score };
      });
    }
  }, [complete, score, setProgress]);

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="missionCard" style={{position: 'relative'}}>
        <Doosee expression={expression} className="mini" style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px'}} />
        <div className="badge-label">{t.tahap5}</div>
        <h1>{t.kuiz}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>
          <GuideText iconType="star" text={t.kuiz} />
        </p>

        <div className="quizGrid">
          {quiz.map((q, idx) => {
            if (guideMode && idx !== answered) return null;
            return (
            <div key={idx} className="quizCard brick-panel" style={{color: 'var(--outline)', background: 'var(--white)'}}>
              <h2 style={{fontSize: '1.2rem'}}>{idx + 1}. {q.q[lang]}</h2>
              <div style={{display: 'grid', gap: '10px', marginTop: '15px'}}>
                {shuffledOptions[idx].map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    className={`platform-card ${answers[idx] === opt.index ? 'selected' : ''} ${feedback.qIdx === idx && feedback.optIdx === optIdx ? (feedback.type === 'correct' ? 'feedback-correct' : 'feedback-wrong') : ''}`}
                    onClick={() => {
                      playSFX('click', soundOn);
                      setAnswers(prev => ({...prev, [idx]: opt.index}));
                      if (opt.index === q.answer) {
                        playSFX('correct', soundOn);
                        setDooseeState('happy');
                        setFeedback({ qIdx: idx, optIdx, type: 'correct' });
                      } else {
                        playSFX('wrong', soundOn);
                        setDooseeState('encouraging');
                        setFeedback({ qIdx: idx, optIdx, type: 'wrong' });
                      }
                      setTimeout(() => setFeedback({ qIdx: null, optIdx: null, type: null }), 500);
                    }}
                    style={{flexDirection: 'row', justifyContent: 'flex-start', padding: '12px 20px'}}
                  >
                    <div style={{width: '30px', height: '30px', background: 'var(--outline)', color: 'var(--white)', borderRadius: '50%', display: 'grid', placeItems: 'center', marginRight: '15px'}}>{optIdx + 1}</div>
                    {opt.text}
                  </button>
                ))}
              </div>
              {answers[idx] !== undefined && (
                <div className={`toast ${answers[idx] === q.answer ? 'success' : 'error'}`} style={{fontSize: '0.9rem', marginTop: '15px', padding: '10px'}}>
                  {answers[idx] === q.answer ? (lang === 'bm' ? 'Betul! ' : 'Correct! ') : (lang === 'bm' ? 'Salah. ' : 'Wrong. ')} {q.explain[lang]}
                </div>
              )}
              </div>
            );
          })}
        </div>

        {complete && (
          <div className="toast success" style={{fontSize: '1.5rem', marginBottom: '30px'}}>
            <Trophy size={40} /> {t.skorAnda}: {score} / {quiz.length}
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); setPage('wise'); }}><ArrowLeft /> {t.kembali}</button>
          <button className="primaryBtn" disabled={!complete} onClick={() => { playSFX('click', soundOn); setPage('finish'); }}>{t.tamatMisi} <ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}

function FinishScreen({ setPage, progress, soundOn, lang, t, expression }) {
  const speechTexts = lang === 'bm'
    ? ["Tamat Misi. Istana Pembeli Bijak. Tahniah! Kamu berjaya!"]
    : ["Mission Complete. Wise Buyer Palace. Congratulations! You succeeded!"];

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <div className="castle-container">
        <div className="flag-pole">
          <div className="flag"></div>
        </div>
        <div style={{background: '#888', width: '200px', height: '150px', margin: '0 auto', border: '6px solid var(--outline)', borderRadius: '10px 10px 0 0', position: 'relative'}}>
           <div style={{position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '80px', background: 'var(--outline)', borderRadius: '30px 30px 0 0'}}></div>
           <Doosee expression={expression} style={{ position: 'absolute', top: '-40px', left: '50%', marginLeft: '-50px' }} />
        </div>

        <div className="badge-label" style={{marginTop: '30px'}}>{t.istana}</div>
        <h1>{t.misiBerjaya}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>{t.menjadiPembeliBijak}</p>

        <div className="progressBox" style={{marginTop: '40px'}}>
          <h2>{t.koleksiLencana}</h2>
          <div className="badge-row" style={{justifyContent: 'center'}}>
            {progress.badges.map(b => (
              <button
                key={b}
                className="medal bounce"
                title={t.badges[b] || b}
                style={{width: '120px', height: '120px', flexDirection: 'column'}}
                aria-label={`Badge: ${t.badges[b] || b}`}
              >
                {b.includes('Wang') && <Coins size={50} />}
                {b.includes('Peta Alir') && <Map size={50} />}
                {b.includes('Pembeli Bijak') && <ShoppingBasket size={50} />}
                {b.includes('Carta Bijak') && <Brain size={50} />}
                {b.includes('Juara') && <Trophy size={50} />}
                <small style={{display: 'block', fontSize: '0.8rem', marginTop: '5px', textAlign: 'center'}}>{t.badges[b] || b}</small>
              </button>
            ))}
          </div>
        </div>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px'}}>
          <button className="primaryBtn" onClick={() => { playSFX('click', soundOn); setPage('home'); }}><Home /> {t.kembaliMula}</button>
          <button className="secondaryBtn" onClick={() => { playSFX('click', soundOn); window.print(); }}>{t.simpanPDF}</button>
        </div>
      </div>
    </main>
  );
}
function TeacherGuide({ setPage, lang, t }) {
  const speechTexts = lang === 'bm'
    ? ["Panduan Guru dan Pensyarah. Rasional Reka Bentuk Digital."]
    : ["Teacher and Lecturer Guide. Digital Design Rationale."];

  return (
    <main>
      <SpeakerButton texts={speechTexts} lang={lang} />
      <section className="teacherGuide wooden-sign" style={{background: '#8B5A2B', color: 'var(--white)', borderRadius: '15px'}}>
        <div className="badge-label" style={{background: 'var(--white)', color: 'var(--outline)'}}>{lang === 'bm' ? 'Panduan Guru / Pensyarah' : "Teacher / Lecturer Guide"}</div>
        <h1>{t.rasional}</h1>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px'}}>
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>{lang === 'bm' ? '1. Kesesuaian MBPK' : '1. Suitability for SEN'}</h2>
            <ul style={{paddingLeft: '20px'}}>
              {lang === 'bm' ? (
                <>
                  <li>Sokongan visual (ikon + teks).</li>
                  <li>Arahan pendek & berulang.</li>
                  <li>Latihan berperingkat (scaffolded).</li>
                  <li>Tiada tekanan masa.</li>
                  <li>Peneguhan positif (Lencana).</li>
                  <li>Kesan bunyi interaktif (SFX).</li>
                  <li>Sokongan dwibahasa (BM & EN).</li>
                </>
              ) : (
                <>
                  <li>Visual support (icons + text).</li>
                  <li>Short & repetitive instructions.</li>
                  <li>Scaffolded practice.</li>
                  <li>No time pressure.</li>
                  <li>Positive reinforcement (Badges).</li>
                  <li>Interactive sound effects (SFX).</li>
                  <li>Bilingual support (BM & EN).</li>
                </>
              )}
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>{lang === 'bm' ? '2. Alat Berfikir' : '2. Thinking Tools'}</h2>
            <ul style={{paddingLeft: '20px'}}>
              {lang === 'bm' ? (
                <>
                  <li><strong>Peta Alir:</strong> Membantu murid menyusun langkah membeli secara berurutan.</li>
                  <li><strong>Carta Bijak:</strong> Membantu murid membandingkan barang (Harga, Keperluan, Manfaat).</li>
                  <li><strong>Penyoalan KBAT:</strong> Menggalakkan murid memberi sebab bagi pilihan mereka.</li>
                </>
              ) : (
                <>
                  <li><strong>Flow Map:</strong> Helps students arrange buying steps sequentially.</li>
                  <li><strong>Wise Chart:</strong> Helps students compare items (Price, Need, Benefit).</li>
                  <li><strong>HOTS Questioning:</strong> Encourages students to give reasons for their choices.</li>
                </>
              )}
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>{lang === 'bm' ? '3. Kemahiran Belajar' : '3. Learning Skills'}</h2>
            <ul style={{paddingLeft: '20px'}}>
              {lang === 'bm' ? (
                <>
                  <li>Memperoleh maklumat (Mengenal wang).</li>
                  <li>Mengurus maklumat (Peta Alir).</li>
                  <li>Memproses maklumat (Kiraan harga/baki).</li>
                  <li>Membuat keputusan (Pilihan bijak).</li>
                </>
              ) : (
                <>
                  <li>Acquiring information (Identifying money).</li>
                  <li>Managing information (Flow Map).</li>
                  <li>Processing information (Price/balance calculation).</li>
                  <li>Decision making (Wise choice).</li>
                </>
              )}
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>{lang === 'bm' ? '4. Elemen KPPB' : '4. NPDL Elements'}</h2>
            <ul style={{paddingLeft: '20px'}}>
              {lang === 'bm' ? (
                <>
                  <li><strong>Communication:</strong> Menyatakan pilihan dan sebab.</li>
                  <li><strong>Critical Thinking:</strong> Menilai keperluan vs kehendak.</li>
                  <li><strong>Character:</strong> Tanggungjawab berbelanja.</li>
                </>
              ) : (
                <>
                  <li><strong>Communication:</strong> Stating choices and reasons.</li>
                  <li><strong>Critical Thinking:</strong> Evaluating needs vs wants.</li>
                  <li><strong>Character:</strong> Spending responsibility.</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <button className="primaryBtn" style={{marginTop: '30px'}} onClick={() => setPage('home')}><Home /> {t.kembaliMula}</button>
      </section>
    </main>
  );
}

function ProgressBar({ currentPage, PAGE_ORDER, onJump, t }) {
  const currentIndex = PAGE_ORDER.indexOf(currentPage);
  if (currentIndex === -1) return null;

  return (
    <div className="progress-bar-container">
      <div className="progress-text">{t.tahap || (t.home === 'Utama' ? 'Tahap' : 'Level')} {currentIndex + 1} / {PAGE_ORDER.length}</div>
      <div className="steps-row">
        {PAGE_ORDER.map((p, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={p}
              className={`step-circle ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              onClick={() => isCompleted && onJump(p)}
              disabled={!isCompleted}
              title={p}
            />
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [direction, setDirection] = useState('fade');
  const [progress, setProgress] = useState(loadProgress);
  const [soundOn, setSoundOn] = useState(true);
  const [lang, setLang] = useState('bm');
  const [dooseeState, setDooseeState] = useState('thinking');
  const [guideMode, setGuideMode] = useState(false);

  const t = translations[lang];

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const goToPage = (nextPage) => {
    if (nextPage === page) return;

    const currentIndex = PAGE_ORDER.indexOf(page);
    const nextIndex = PAGE_ORDER.indexOf(nextPage);

    if (currentIndex !== -1 && nextIndex !== -1) {
      setDirection(nextIndex > currentIndex ? 'forward' : 'backward');
    } else {
      setDirection('fade');
    }

    setPage(nextPage);
  };

  const lastPage = React.useRef(page);
  useEffect(() => {
    if (lastPage.current !== page) {
      playSFX('pageChange', soundOn);
      lastPage.current = page;
      if (page === 'finish') setDooseeState('celebrating');
      else if (page === 'home') setDooseeState('thinking');
      else setDooseeState('thinking');
    }
  }, [page, soundOn]);

  const className = useMemo(() => [
    'appShell',
    'text-lvl-1',
  ].join(' '), []);

  function reset() {
    if (!window.confirm(t.resetConfirm)) return;
    const next = { badges: [], quizScore: 0 };
    setProgress(next);
    setPage('home');
  }

  return (
    <div className={className}>
      <div className="hills"><div className="hill"></div><div className="hill"></div><div className="hill"></div></div>
      <Header
        page={page}
        setPage={goToPage}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        lang={lang}
        setLang={setLang}
        guideMode={guideMode}
        setGuideMode={setGuideMode}
        t={t}
      />

      <ProgressBar currentPage={page} PAGE_ORDER={PAGE_ORDER} onJump={goToPage} t={t} />

      <div className={`screen transition-${direction}`} key={page}>
        {page === 'home' && <HomeScreen setPage={goToPage} soundOn={soundOn} lang={lang} progress={progress} t={t} expression={dooseeState} />}
        {page === 'intro' && <IntroScreen setPage={goToPage} soundOn={soundOn} lang={lang} t={t} expression={dooseeState} />}
        {page === 'money' && <MoneyScreen setPage={goToPage} soundOn={soundOn} lang={lang} setProgress={setProgress} t={t} guideMode={guideMode} setDooseeState={setDooseeState} expression={dooseeState} />}
        {page === 'flow' && <FlowScreen setPage={goToPage} soundOn={soundOn} lang={lang} setProgress={setProgress} t={t} guideMode={guideMode} setDooseeState={setDooseeState} expression={dooseeState} />}
        {page === 'shop' && <ShopScreen setPage={goToPage} soundOn={soundOn} lang={lang} setProgress={setProgress} t={t} guideMode={guideMode} setDooseeState={setDooseeState} expression={dooseeState} />}
        {page === 'wise' && <WiseChoiceScreen setPage={goToPage} soundOn={soundOn} lang={lang} setProgress={setProgress} t={t} expression={dooseeState} setDooseeState={setDooseeState} />}
        {page === 'quiz' && <QuizScreen setPage={goToPage} soundOn={soundOn} lang={lang} setProgress={setProgress} t={t} guideMode={guideMode} setDooseeState={setDooseeState} expression={dooseeState} />}
        {page === 'finish' && <FinishScreen setPage={goToPage} progress={progress} soundOn={soundOn} lang={lang} t={t} expression={dooseeState} />}
        {page === 'teacher' && <TeacherGuide setPage={goToPage} lang={lang} t={t} />}
      </div>
      <button className="resetBtn" style={{position: 'fixed', bottom: '100px', right: '20px', zIndex: 100}} onClick={reset}><RefreshCcw size={16}/> {t.resetBtn}</button>
      <footer className="watermark">© Aieryl Shazh</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
