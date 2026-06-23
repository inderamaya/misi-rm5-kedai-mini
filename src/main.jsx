import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, RefreshCcw, Trophy, Sparkles, Coins, Map, ShoppingBasket, Brain, Home, BookOpen, Star, ArrowRight } from 'lucide-react';
import './styles.css';
import { BUDGET, moneyChoices, items, flowSteps, quiz } from './constants';

const translations = {
  bm: {
    home: "Utama",
    title: "DUNIA SYILING RM5",
    subtitle: "Misi Kedai Mini: Pilih, Kira, Bayar!",
    audio: "Audio",
    dengarArahan: "Dengar Arahan",
    mulakanMisi: "Mulakan Misi",
    dunia1: "DUNIA 1: Pintu Masuk",
    selamatDatang: "Selamat Datang ke Dunia Syiling RM5!",
    kenaliRM5: "Kenali RM5",
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
    hebatRM5: "Hebat! Ini RM5 untuk misi hari ini.",
    cubaLagiRM5: "Cuba lagi. Cari wang yang tertulis RM5.",
    tahap2: "TAHAP 2",
    petaAlirTitle: "Peta Alir Pembeli Bijak",
    tekanLangkah: "Tekan setiap langkah mengikut urutan (1 hingga 6).",
    levelClear: "Level Clear! Kamu sudah ikut peta alir dengan betul.",
    tahap3: "TAHAP 3",
    kedaiMini: "Kedai Mini Ajaib",
    pilihKeperluan: "Kamu ada RM5. Pilih barang keperluan dahulu.",
    troliSaya: "Troli Saya",
    pilihBarang: "Pilih barang...",
    wangTidakCukup: "Wang tidak cukup!",
    pilihBarangKeperluan: "Pilih barang keperluan.",
    bijakWangCukup: "Bijak! Wang cukup.",
    tahap4: "TAHAP 4",
    cartaBijak: "Carta Bijak",
    bandingBarang: "Bandingkan barang menggunakan bintang.",
    hargaSesuai: "Harga Sesuai",
    diperlukan: "Diperlukan",
    baikDiri: "Baik untuk Diri",
    soalanBijak: "Soalan Bijak:",
    pilihKerana: "Adakah ini pilihan bijak? Mengapa?",
    placeholderReason: "Saya pilih ... kerana...",
    tahap5: "TAHAP 5",
    kuiz: "Kuiz Pengukuhan",
    skorAnda: "Skor Anda",
    tamatMisi: "Tamat Misi",
    istana: "Istana Pembeli Bijak",
    misiBerjaya: "TAHNIAH! MISI BERJAYA!",
    menjadiPembeliBijak: "Kamu telah menjadi Pembeli Bijak di Dunia Syiling RM5.",
    koleksiLencana: "Koleksi Lencana Anda:",
    kembaliMula: "Kembali Ke Mula",
    simpanPDF: "Simpan PDF",
    rasional: "Rasional Reka Bentuk Digital",
    introSpeak: "Selamat datang ke Dunia Syiling RM5! Mari belajar cara memilih barang, mengira wang, dan membuat keputusan bijak.",
    introText: "Kamu ada RM5. Tugas kamu ialah memilih barang yang sesuai. Pastikan wang cukup dan kira baki.",
    moneySpeak: "Klik wang yang bernilai RM5. Lihat simbol dan nombor pada wang.",
    flowSpeak: "Peta alir membantu kita menyusun langkah membeli barang. Tekan langkah satu hingga enam.",
    shopSpeak: "Pilih barang. Pastikan jumlah tidak lebih daripada RM5. Utamakan barang keperluan.",
    wiseSpeak: "Gunakan carta bijak untuk menilai barang. Lihat bintang untuk harga, keperluan, dan manfaat.",
    quizSpeak: "Jawab semua soalan kuiz. Pilih jawapan yang paling bijak.",
    tahniahLencana: "Tahniah! Anda mendapat",
    tahniahLencanaShort: "Tahniah! Anda telah memenangi",
    resetConfirm: "Adakah anda pasti mahu set semula semua kemajuan?",
    resetBtn: "Reset",
    badges: {
      "Lencana Wang": "Lencana Wang",
      "Lencana Peta Alir": "Lencana Peta Alir",
      "Pembeli Bijak": "Pembeli Bijak",
      "Lencana Carta Bijak": "Lencana Carta Bijak",
      "Juara Dunia Syiling RM5": "Juara Dunia Syiling RM5"
    }
  },
  en: {
    home: "Home",
    title: "RM5 COIN WORLD",
    subtitle: "Mini Shop Mission: Choose, Count, Pay!",
    audio: "Audio",
    dengarArahan: "Listen",
    mulakanMisi: "Start Mission",
    dunia1: "WORLD 1: Entrance",
    selamatDatang: "Welcome to the RM5 Coin World!",
    kenaliRM5: "Identify RM5",
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
    hebatRM5: "Great! This is RM5 for today's mission.",
    cubaLagiRM5: "Try again. Find the money with RM5 written on it.",
    tahap2: "LEVEL 2",
    petaAlirTitle: "Wise Buyer Flow Map",
    tekanLangkah: "Press each step in order (1 to 6).",
    levelClear: "Level Clear! You followed the flow map correctly.",
    tahap3: "LEVEL 3",
    kedaiMini: "Magic Mini Shop",
    pilihKeperluan: "You have RM5. Choose needs first.",
    troliSaya: "My Cart",
    pilihBarang: "Choose items...",
    wangTidakCukup: "Not enough money!",
    pilihBarangKeperluan: "Choose needed items.",
    bijakWangCukup: "Wise! Enough money.",
    tahap4: "LEVEL 4",
    cartaBijak: "Wise Chart",
    bandingBarang: "Compare items using stars.",
    hargaSesuai: "Suitable Price",
    diperlukan: "Needed",
    baikDiri: "Good for Self",
    soalanBijak: "Wise Question:",
    pilihKerana: "Is this a wise choice? Why?",
    placeholderReason: "I choose ... because...",
    tahap5: "LEVEL 5",
    kuiz: "Reinforcement Quiz",
    skorAnda: "Your Score",
    tamatMisi: "Finish Mission",
    istana: "Wise Buyer Palace",
    misiBerjaya: "CONGRATULATIONS! MISSION SUCCESS!",
    menjadiPembeliBijak: "You have become a Wise Buyer in RM5 Coin World.",
    koleksiLencana: "Your Badge Collection:",
    kembaliMula: "Back to Start",
    simpanPDF: "Save PDF",
    rasional: "Digital Design Rationale",
    introSpeak: "Welcome to RM5 Coin World! Let's learn how to choose items, count money, and make wise decisions.",
    introText: "You have RM5. Your task is to choose the right items. Make sure the money is enough and calculate the balance.",
    moneySpeak: "Click the money worth RM5. Look at the symbols and numbers on the money.",
    flowSpeak: "The flow map helps us arrange the steps of buying items. Press steps one to six.",
    shopSpeak: "Choose items. Ensure the total is not more than RM5. Prioritize needed items.",
    wiseSpeak: "Use the wise chart to evaluate items. Look at the stars for price, necessity, and benefit.",
    quizSpeak: "Answer all quiz questions. Choose the wisest answer.",
    tahniahLencana: "Congratulations! You got",
    tahniahLencanaShort: "Congratulations! You have won",
    resetConfirm: "Are you sure you want to reset all progress?",
    resetBtn: "Reset",
    badges: {
      "Lencana Wang": "Money Badge",
      "Lencana Peta Alir": "Flow Map Badge",
      "Pembeli Bijak": "Wise Buyer",
      "Lencana Carta Bijak": "Wise Chart Badge",
      "Juara Dunia Syiling RM5": "RM5 Coin World Champion"
    }
  }
};

function speak(text, enabled = true, lang = 'bm', onStart, onEnd) {
  if (!enabled) return;
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'bm' ? 'ms-MY' : 'en-US';
  utterance.rate = 0.86;
  utterance.pitch = 1.05;
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

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

// Custom SVG Icons
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
      <path d="M10 10 Q40 10 40 40" fill="none" stroke="#FFD447" strokeWidth="6" strokeLinecap="round" />
      <path d="M10 10 Q40 10 40 40" fill="none" stroke="#1C1C1C" strokeWidth="1" />
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
      <circle cx="25" cy="20" r="12" fill="#E9443A" stroke="#1C1C1C" strokeWidth="3" />
      <circle cx="25" cy="40" r="8" fill="#E9443A" stroke="#1C1C1C" strokeWidth="3" />
    </svg>
  ),
  look_money: () => <Coins size={32} />,
  look_price: () => <BookOpen size={32} />,
  choose_item: () => <ShoppingBasket size={32} />,
  calculate: () => <Star size={32} />,
  check_balance: () => <Brain size={32} />,
  pay: () => <ArrowRight size={32} />,
};

function DidiDuit({ className = "" }) {
  return (
    <div className={`didi-duit bounce ${className}`} style={{
      width: '100px', height: '100px', background: 'var(--coin)',
      border: '6px solid var(--outline)', borderRadius: '50%',
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset -6px -6px 0 rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '10px', height: '10px', background: 'var(--outline)', borderRadius: '50%' }}></div>
        <div style={{ width: '10px', height: '10px', background: 'var(--outline)', borderRadius: '50%' }}></div>
      </div>
      <div style={{
        position: 'absolute', bottom: '25%', width: '30px', height: '15px',
        borderBottom: '4px solid var(--outline)', borderRadius: '50%'
      }}></div>
    </div>
  );
}

function AudioButton({ text, soundOn, lang, speaking, setSpeaking, t }) {
  return (
    <button
      className={`iconBtn ${speaking ? 'speaking' : ''}`}
      onClick={() => speak(text, soundOn, lang, () => setSpeaking(true), () => setSpeaking(false))}
      aria-label={t.dengarArahan}
    >
      <Volume2 size={20} /> {t.dengarArahan}
    </button>
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

function Header({ page, setPage, soundOn, setSoundOn, lang, setLang, t }) {
  return (
    <header className="topbar">
      <button className="homeBtn" onClick={() => setPage('home')}><Home size={18} /> {t.home}</button>
      <div className="brand">
        <div style={{width: '40px', height: '40px', background: 'var(--coin)', border: '3px solid var(--outline)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: '900'}}>RM5</div>
        <div>
          <strong>{t.title}</strong>
          <small>{t.subtitle}</small>
        </div>
      </div>
      <div className="tools">
        <button className="miniBtn" onClick={() => setSoundOn(!soundOn)}>{soundOn ? <Volume2 size={17}/> : <VolumeX size={17}/>} {t.audio}</button>
        <button className="miniBtn" onClick={() => setLang(lang === 'bm' ? 'en' : 'bm')}>
          {lang === 'bm' ? 'English' : 'B. Melayu'}
        </button>
      </div>
    </header>
  );
}

function HomeScreen({ setPage, soundOn, lang, progress, speaking, setSpeaking, t }) {
  return (
    <main>
      <section className="heroCard castlePanel">
        <div className="heroText">
          <div className="badge-label">{t.dunia1}</div>
          <h1>{t.selamatDatang}</h1>
          <p style={{fontSize: '1.2rem', fontWeight: '900', marginBottom: '20px'}}>{t.subtitle}</p>
          <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <button className="primaryBtn brick-style" onClick={() => setPage('intro')}><Sparkles size={20}/> {t.mulakanMisi}</button>
            <AudioButton text={t.introSpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
          </div>
        </div>
        <DidiDuit />
      </section>

      <section className="objectiveGrid">
        <button className="level-card" onClick={() => setPage('money')}>
          <div className="lvl-icon"><Coins size={30} /></div>
          <span>{t.kenaliRM5}</span>
        </button>
        <button className="level-card" onClick={() => setPage('flow')}>
          <div className="lvl-icon"><Map size={30} /></div>
          <span>{t.petaAlir}</span>
        </button>
        <button className="level-card" onClick={() => setPage('shop')}>
          <div className="lvl-icon"><ShoppingBasket size={30} /></div>
          <span>{t.misiKedai}</span>
        </button>
        <button className="level-card" onClick={() => setPage('wise')}>
          <div className="lvl-icon"><Brain size={30} /></div>
          <span>{t.pilihanBijak}</span>
        </button>
        <button className="level-card" onClick={() => setPage('teacher')}>
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
              onClick={() => speak(`${t.tahniahLencana} ${t.badges[b] || b}`, soundOn, lang, () => setSpeaking(true), () => setSpeaking(false))}
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

function IntroScreen({ setPage, soundOn, lang, speaking, setSpeaking, t }) {
  return (
    <main>
      <section className="missionCard brick-panel">
        <div className="badge-label" style={{background: 'var(--white)', color: 'var(--outline)'}}>{t.pengenalan}</div>
        <h1 style={{color: 'var(--coin)'}}>{t.haiPembeliBijak}</h1>
        <p style={{fontSize: '1.3rem', fontWeight: '900'}}>{t.kamuAdaRM5}</p>

        <div className="wooden-sign" style={{margin: '30px 0'}}>
          <h2 style={{marginTop: 0}}>{t.contohMudah}</h2>
          <p>{lang === 'bm' ? 'Roti' : 'Bread'} = RM2</p>
          <p>{lang === 'bm' ? 'Air Mineral' : 'Mineral Water'} = RM1</p>
          <hr style={{borderColor: 'rgba(255,255,255,0.2)'}} />
          <p><strong>{t.jumlah}:</strong> RM2 + RM1 = RM3</p>
          <p><strong>{t.baki}:</strong> RM5 - RM3 = RM2</p>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="primaryBtn" onClick={() => setPage('money')}>{t.seterusnya}: {t.kenaliRM5} <ArrowRight /></button>
          <AudioButton text={t.introText} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}

function MoneyScreen({ setPage, soundOn, lang, setProgress, speaking, setSpeaking, t }) {
  const [chosen, setChosen] = useState(null);
  const correct = chosen === 'rm5';
  function award() {
    setProgress(prev => {
      const badges = prev.badges.includes('Lencana Wang') ? prev.badges : [...prev.badges, 'Lencana Wang'];
      return { ...prev, badges };
    });
  }
  useEffect(() => { if (correct) award(); }, [correct]);

  return (
    <main>
      <section className="missionCard">
        <div className="badge-label">{t.tahap1}</div>
        <h1>{t.kenaliRM5}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>{t.klikRM5}</p>

        <div className="moneyGrid">
          {moneyChoices.map(m => (
            <button key={m.id} className={`platform-card ${chosen === m.id ? 'selected' : ''}`} onClick={() => setChosen(m.id)}>
              <div className="coin-block" style={{background: m.id === 'rm5' ? 'var(--coin)' : '#ccc'}}>
                {Icons[m.type]()}
              </div>
              <strong style={{fontSize: '1.5rem'}}>{m.label}</strong>
            </button>
          ))}
        </div>

        {chosen && (
          <div className={`toast ${correct ? 'success' : 'error'}`} aria-live="polite">
            {correct ? t.hebatRM5 : t.cubaLagiRM5}
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" disabled={!correct} onClick={() => setPage('flow')}>{t.seterusnya}: {t.petaAlir} <ArrowRight /></button>
          <AudioButton text={t.moneySpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}

function FlowScreen({ setPage, soundOn, lang, setProgress, speaking, setSpeaking, t }) {
  const [done, setDone] = useState([]);
  const complete = done.length === flowSteps.length;

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
      <section className="missionCard">
        <div className="badge-label">{t.tahap2}</div>
        <h1>{t.petaAlirTitle}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>{t.tekanLangkah}</p>

        <div className="flowPath">
          {flowSteps.map((s, idx) => {
            const isActive = done.includes(idx);
            return (
              <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <button
                  className={`stepping-stone ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (idx === done.length) setDone(prev => [...prev, idx]);
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
              <DidiDuit />
              <span>{t.levelClear}</span>
            </div>
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('shop')}>{t.seterusnya}: {t.misiKedai} <ArrowRight /></button>
          <AudioButton text={t.flowSpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}
function ShopScreen({ setPage, soundOn, lang, setProgress, speaking, setSpeaking, t }) {
  const [basket, setBasket] = useState([]);
  const total = basket.reduce((sum, id) => sum + items.find(i => i.id === id).price, 0);
  const balance = BUDGET - total;
  const valid = total > 0 && total <= BUDGET;
  const hasNeed = basket.some(id => items.find(i => i.id === id).tag.bm === 'KEPERLUAN');
  const excellent = valid && hasNeed;

  function toggleItem(id) {
    setBasket(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

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
      <section className="missionCard">
        <div className="badge-label">{t.tahap3}</div>
        <h1>{t.kedaiMini}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>{t.pilihKeperluan}</p>

        <div className="shopLayout">
          <div className="itemGrid">
            {items.map(item => (
              <button key={item.id} className={`platform-card ${basket.includes(item.id) ? 'selected' : ''}`} onClick={() => toggleItem(item.id)}>
                <div style={{background: 'var(--cream)', borderRadius: '50%', padding: '10px', border: '3px solid var(--outline)'}}>
                  {Icons[item.type]()}
                </div>
                <strong>{item.name[lang]}</strong>
                <span className="price-tag">RM{item.price}</span>
                <small style={{fontWeight: '900', color: item.tag.bm === 'KEPERLUAN' ? 'var(--grass)' : 'var(--red)'}}>{item.tag[lang]}</small>
              </button>
            ))}
          </div>

          <aside className="wooden-sign">
            <h2 style={{marginTop: 0}}>{t.troliSaya} 🛒</h2>
            {basket.length === 0 ? <p>{t.pilihBarang}</p> : basket.map(id => {
              const item = items.find(i => i.id === id);
              return <div key={id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                <span>{item.name[lang]}</span>
                <span>RM{item.price}</span>
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
          <button className="primaryBtn" disabled={!excellent} onClick={() => setPage('wise')}>{t.seterusnya}: {t.pilihanBijak} <ArrowRight /></button>
          <AudioButton text={t.shopSpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}

function WiseChoiceScreen({ setPage, soundOn, lang, setProgress, speaking, setSpeaking, t }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [reason, setReason] = useState("");
  const active = items[activeIdx];

  useEffect(() => {
    setProgress(prev => {
      const badges = prev.badges.includes('Lencana Carta Bijak') ? prev.badges : [...prev.badges, 'Lencana Carta Bijak'];
      return { ...prev, badges };
    });
  }, [setProgress]);

  return (
    <main>
      <section className="missionCard">
        <div className="badge-label">{t.tahap4}</div>
        <h1>{t.cartaBijak}</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>{t.bandingBarang}</p>

        <div className="wiseLayout">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
            {items.map((item, idx) => (
              <button key={item.id} className={`platform-card ${activeIdx === idx ? 'selected' : ''}`} onClick={() => setActiveIdx(idx)}>
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

            <div className="wooden-sign" style={{marginTop: '20px', fontSize: '0.9rem'}}>
              <strong>{t.soalanBijak}</strong>
              <p>{t.pilihKerana}</p>
              <textarea
                className="reason-input"
                placeholder={t.placeholderReason.replace('...', active.name[lang])}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: '100%', minHeight: '80px', borderRadius: '8px',
                  padding: '10px', border: '3px solid var(--outline)',
                  fontFamily: 'inherit', fontWeight: 'bold'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" onClick={() => setPage('quiz')}>{t.seterusnya}: {t.kuiz} <ArrowRight /></button>
          <AudioButton text={t.wiseSpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}

function QuizScreen({ setPage, soundOn, lang, setProgress, speaking, setSpeaking, t }) {
  const [answers, setAnswers] = useState({});
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
      <section className="missionCard">
        <div className="badge-label">{t.tahap5}</div>
        <h1>{t.kuiz}</h1>

        <div className="quizGrid">
          {quiz.map((q, idx) => (
            <div key={idx} className="quizCard brick-panel" style={{color: 'var(--outline)', background: 'var(--white)'}}>
              <h2 style={{fontSize: '1.2rem'}}>{idx + 1}. {q.q[lang]}</h2>
              <div style={{display: 'grid', gap: '10px', marginTop: '15px'}}>
                {q.options[lang].map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    className={`platform-card ${answers[idx] === optIdx ? 'selected' : ''}`}
                    onClick={() => setAnswers(prev => ({...prev, [idx]: optIdx}))}
                    style={{flexDirection: 'row', justifyContent: 'flex-start', padding: '12px 20px'}}
                  >
                    <div style={{width: '30px', height: '30px', background: 'var(--outline)', color: 'var(--white)', borderRadius: '50%', display: 'grid', placeItems: 'center', marginRight: '15px'}}>{optIdx + 1}</div>
                    {opt}
                  </button>
                ))}
              </div>
              {answers[idx] !== undefined && (
                <div className={`toast ${answers[idx] === q.answer ? 'success' : 'error'}`} style={{fontSize: '0.9rem', marginTop: '15px', padding: '10px'}}>
                  {answers[idx] === q.answer ? (lang === 'bm' ? 'Betul! ' : 'Correct! ') : (lang === 'bm' ? 'Salah. ' : 'Wrong. ')} {q.explain[lang]}
                </div>
              )}
            </div>
          ))}
        </div>

        {complete && (
          <div className="toast success" style={{fontSize: '1.5rem', marginBottom: '30px'}}>
            <Trophy size={40} /> {t.skorAnda}: {score} / {quiz.length}
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('finish')}>{t.tamatMisi} <ArrowRight /></button>
          <AudioButton text={t.quizSpeak} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />
        </div>
      </section>
    </main>
  );
}

function FinishScreen({ setPage, progress, soundOn, lang, setSpeaking, t }) {
  return (
    <main>
      <div className="castle-container">
        <div className="flag-pole">
          <div className="flag"></div>
        </div>
        <div style={{background: '#888', width: '200px', height: '150px', margin: '0 auto', border: '6px solid var(--outline)', borderRadius: '10px 10px 0 0', position: 'relative'}}>
           <div style={{position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '80px', background: 'var(--outline)', borderRadius: '30px 30px 0 0'}}></div>
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
                onClick={() => speak(`${t.tahniahLencanaShort} ${t.badges[b] || b}`, soundOn, lang, () => setSpeaking(true), () => setSpeaking(false))}
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
          <button className="primaryBtn" onClick={() => setPage('home')}><Home /> {t.kembaliMula}</button>
          <button className="secondaryBtn" onClick={() => window.print()}>{t.simpanPDF}</button>
        </div>
      </div>
    </main>
  );
}
function TeacherGuide({ setPage, lang, t }) {
  return (
    <main>
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
                  <li>Sokongan audio (Read-aloud).</li>
                </>
              ) : (
                <>
                  <li>Visual support (icons + text).</li>
                  <li>Short & repetitive instructions.</li>
                  <li>Scaffolded practice.</li>
                  <li>No time pressure.</li>
                  <li>Positive reinforcement (Badges).</li>
                  <li>Audio support (Read-aloud).</li>
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
                  <li>Memperoleh maklumat (Mengenal RM5).</li>
                  <li>Mengurus maklumat (Peta Alir).</li>
                  <li>Memproses maklumat (Kiraan harga/baki).</li>
                  <li>Membuat keputusan (Pilihan bijak).</li>
                </>
              ) : (
                <>
                  <li>Acquiring information (Identifying RM5).</li>
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

function App() {
  const [page, setPage] = useState('home');
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(loadProgress);
  const [soundOn, setSoundOn] = useState(true);
  const [lang, setLang] = useState('bm');

  const t = translations[lang];

  useEffect(() => saveProgress(progress), [progress]);

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
      <Header page={page} setPage={setPage} soundOn={soundOn} setSoundOn={setSoundOn} lang={lang} setLang={setLang} t={t} />
      <div className="screen">
        {page === 'home' && <HomeScreen setPage={setPage} soundOn={soundOn} lang={lang} progress={progress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'intro' && <IntroScreen setPage={setPage} soundOn={soundOn} lang={lang} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'money' && <MoneyScreen setPage={setPage} soundOn={soundOn} lang={lang} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'flow' && <FlowScreen setPage={setPage} soundOn={soundOn} lang={lang} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'shop' && <ShopScreen setPage={setPage} soundOn={soundOn} lang={lang} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'wise' && <WiseChoiceScreen setPage={setPage} soundOn={soundOn} lang={lang} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'quiz' && <QuizScreen setPage={setPage} soundOn={soundOn} lang={lang} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} t={t} />}
        {page === 'finish' && <FinishScreen setPage={setPage} progress={progress} soundOn={soundOn} lang={lang} setSpeaking={setSpeaking} t={t} />}
        {page === 'teacher' && <TeacherGuide setPage={setPage} lang={lang} t={t} />}
      </div>
      <button className="resetBtn" style={{position: 'fixed', bottom: '100px', right: '20px', zIndex: 100}} onClick={reset}><RefreshCcw size={16}/> {t.resetBtn}</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
