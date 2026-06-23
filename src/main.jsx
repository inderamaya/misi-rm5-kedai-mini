import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, RefreshCcw, Trophy, Sparkles, Coins, Map, ShoppingBasket, Brain, Home, BookOpen } from 'lucide-react';
import './styles.css';
import { BUDGET, moneyChoices, items, flowSteps, quiz } from './constants';

function speak(text, enabled = true, onStart, onEnd) {
  if (!enabled) return;
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ms-MY';
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

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function AudioButton({ text, soundOn, speaking, setSpeaking }) {
  return (
    <button
      className={`iconBtn ${speaking ? 'speaking' : ''}`}
      onClick={() => speak(text, soundOn, () => setSpeaking(true), () => setSpeaking(false))}
      aria-label="Dengar arahan"
    >
      <Volume2 size={20} /> Dengar
    </button>
  );
}

function StarRating({ label, value }) {
  return (
    <div className="ratingLine" aria-label={`${label}: ${value} bintang`}>
      <span>{label}</span>
      <span className="stars">{'⭐'.repeat(value)}{'☆'.repeat(3 - value)}</span>
    </div>
  );
}

function Header({ page, setPage, soundOn, setSoundOn, highContrast, setHighContrast, largeText, setLargeText, reduceMotion, setReduceMotion }) {
  return (
    <header className="topbar">
      <button className="homeBtn" onClick={() => setPage('home')}><Home size={18} /> Utama</button>
      <div className="brand">
        <span className="pixelCoin">🪙</span>
        <div>
          <strong>Dunia Syiling RM5</strong>
          <small>Pilih, Kira, Bayar!</small>
        </div>
      </div>
      <div className="tools">
        <button className="miniBtn" onClick={() => setSoundOn(!soundOn)}>{soundOn ? <Volume2 size={17}/> : <VolumeX size={17}/>} Audio</button>
        <button className="miniBtn" onClick={() => setLargeText(!largeText)}>A+</button>
        <button className="miniBtn" onClick={() => setHighContrast(!highContrast)}>Kontras</button>
        <button className="miniBtn" onClick={() => setReduceMotion(!reduceMotion)}>Gerak</button>
      </div>
    </header>
  );
}

function DidiDuit() {
  return (
    <div className="didi-duit" aria-hidden="true">
      <div className="didi-mouth"></div>
      <div className="didi-arms"></div>
    </div>
  );
}

function HomeScreen({ setPage, soundOn, progress, speaking, setSpeaking }) {
  const intro = 'Selamat datang ke Dunia Syiling RM5. Hari ini kita belajar mengenal wang, memilih barang, mengira jumlah harga, dan membuat keputusan bijak.';
  return (
    <main className="screen homeScreen">
      <section className="heroCard castlePanel">
        <div className="heroText">
          <Badge>WORLD 1: Welcome Gate</Badge>
          <h1>Dunia Syiling RM5</h1>
          <p>Misi Kedai Mini: Pilih, Kira, Bayar!</p>
          <div className="buttonRow">
            <button className="primaryBtn" onClick={() => setPage('intro')}><Sparkles size={20}/> Mulakan Misi</button>
            <AudioButton text={intro} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
          </div>
        </div>
        <div className="heroMascot" aria-hidden="true">
          <DidiDuit />
        </div>
      </section>

      <section className="objectiveGrid">
        <button className="objectiveCard" onClick={() => setPage('money')}><Coins /> Kenali Wang</button>
        <button className="objectiveCard" onClick={() => setPage('flow')}><Map /> Peta Alir</button>
        <button className="objectiveCard" onClick={() => setPage('shop')}><ShoppingBasket /> Misi Kedai</button>
        <button className="objectiveCard" onClick={() => setPage('wise')}><Brain /> Pilihan Bijak</button>
        <button className="objectiveCard" onClick={() => setPage('teacher')}><BookOpen /> Panduan Guru</button>
      </section>

      <section className="progressBox">
        <h2>Lencana Saya</h2>
        <div className="badges">
          {progress.badges.length ? progress.badges.map(b => <span key={b} className="earned">🏅 {b}</span>) : <span className="muted">Belum ada lencana. Mari mula misi.</span>}
        </div>
      </section>
    </main>
  );
}

function IntroScreen({ setPage, soundOn, speaking, setSpeaking }) {
  const text = 'Kamu ada RM5. Tugas kamu ialah memilih barang yang sesuai. Pastikan wang cukup dan kira baki.';
  return (
    <main className="screen">
      <section className="missionCard">
        <Badge>Pengenalan + Contoh</Badge>
        <h1>Hai Pembeli Bijak!</h1>
        <p className="bigInstruction">Kamu ada <strong>RM5</strong>. Mari belajar cara membeli barang dengan bijak.</p>
        <div className="exampleBox">
          <h2>Contoh Mudah</h2>
          <p>Roti = RM2</p>
          <p>Air Mineral = RM1</p>
          <p><strong>Jumlah:</strong> RM2 + RM1 = RM3</p>
          <p><strong>Baki:</strong> RM5 - RM3 = RM2</p>
        </div>
        <div className="buttonRow">
          <button className="primaryBtn" onClick={() => setPage('money')}>Seterusnya: Kenali Wang</button>
          <AudioButton text={text} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function MoneyScreen({ setPage, soundOn, setProgress, speaking, setSpeaking }) {
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
    <main className="screen">
      <section className="missionCard">
        <Badge>LEVEL 1</Badge>
        <h1>Kenali RM5</h1>
        <p className="bigInstruction">Klik wang yang bernilai <strong>RM5</strong>.</p>
        <div className="moneyGrid">
          {moneyChoices.map(m => (
            <button key={m.id} className={`moneyCard question-block ${chosen === m.id ? 'selected' : ''}`} onClick={() => setChosen(m.id)}>
              <span className="moneySymbol">{m.symbol}</span>
              <strong>{m.label}</strong>
            </button>
          ))}
        </div>
        {chosen && (
          <div className={correct ? 'feedback good' : 'feedback retry'} aria-live="polite">
            {correct ? 'Super! RM5 ialah wang untuk misi hari ini.' : 'Cuba lagi. Cari wang yang tertulis RM5.'}
          </div>
        )}
        <div className="buttonRow">
          <button className="primaryBtn" disabled={!correct} onClick={() => setPage('flow')}>Seterusnya: Peta Alir</button>
          <AudioButton text="Klik wang yang bernilai RM5. Lihat simbol dan nombor pada wang." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function FlowScreen({ setPage, soundOn, setProgress, speaking, setSpeaking }) {
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
    <main className="screen">
      <section className="missionCard wide">
        <Badge>LEVEL 2</Badge>
        <h1>Peta Alir Pembeli Bijak</h1>
        <p className="bigInstruction">Tekan setiap langkah. Baca dan ikut urutan.</p>
        <div className="flowGrid">
          {flowSteps.map((s, idx) => (
            <button key={s.title} className={`flowStep ${done.includes(idx) ? 'done' : ''}`} onClick={() => setDone(prev => {
              if (idx === prev.length) return [...prev, idx];
              return prev;
            })}>
              <span className="stepNumber">{idx + 1}</span>
              <span className="stepIcon">{s.icon}</span>
              <strong>{s.title}</strong>
              <small>{s.desc}</small>
            </button>
          ))}
        </div>
        {complete && <div className="feedback good" aria-live="polite">Hebat! Kamu sudah ikut peta alir dengan betul.</div>}
        <div className="buttonRow">
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('shop')}>Seterusnya: Misi Kedai</button>
          <AudioButton text="Peta alir membantu kita menyusun langkah membeli barang. Lihat wang, lihat harga, pilih barang, kira jumlah, semak baki dan bayar." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function ShopScreen({ setPage, soundOn, setProgress, speaking, setSpeaking }) {
  const [basket, setBasket] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const total = basket.reduce((sum, id) => sum + items.find(i => i.id === id).price, 0);
  const balance = BUDGET - total;
  const valid = total > 0 && total <= BUDGET;
  const hasNeed = basket.some(id => items.find(i => i.id === id).need >= 2);
  const excellent = valid && hasNeed && basket.length >= 2;
  function toggleItem(id) {
    const isAdding = !basket.includes(id);
    if (isAdding) {
      setLastAdded(id);
      setTimeout(() => setLastAdded(null), 800);
    }
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
    <main className="screen">
      <section className="missionCard wide">
        <Badge>LEVEL 3</Badge>
        <h1>Kedai Mini Ajaib</h1>
        <p className="bigInstruction">Kamu ada <strong>RM5</strong>. Pilih barang yang sesuai. Pastikan wang cukup.</p>
        <div className="shopLayout">
          <div className="itemGrid">
            {items.map(item => (
              <button key={item.id} className={`itemCard question-block ${basket.includes(item.id) ? 'selected' : ''}`} onClick={() => toggleItem(item.id)}>
                {lastAdded === item.id && <span className="coin-effect">🪙</span>}
                <span className="itemSymbol">{item.symbol}</span>
                <strong>{item.name}</strong>
                <span className="priceTag">RM{item.price}</span>
                <small>{item.tag}</small>
              </button>
            ))}
          </div>
          <aside className="basketPanel">
            <h2>Troli Saya 🛒</h2>
            {basket.length === 0 ? <p className="muted">Pilih barang dahulu.</p> : basket.map(id => {
              const item = items.find(i => i.id === id);
              return <p key={id}>{item.symbol} {item.name} — RM{item.price}</p>
            })}
            <hr />
            <p><strong>Jumlah:</strong> RM{total}</p>
            <p><strong>Baki:</strong> RM{balance}</p>
            <div aria-live="polite">
              {total > BUDGET && <div className="feedback retry">Wang tidak cukup. Kurangkan barang.</div>}
              {valid && !hasNeed && <div className="feedback retry">Wang cukup, tetapi cuba pilih barang yang lebih diperlukan.</div>}
              {valid && hasNeed && basket.length < 2 && total < BUDGET && <div className="feedback retry">Hebat, tapi kamu masih ada baki. Cuba pilih satu lagi barang.</div>}
              {excellent && <div className="feedback good">Super! Pilihan bijak. Wang cukup dan barang sesuai.</div>}
            </div>
          </aside>
        </div>
        <div className="buttonRow">
          <button className="primaryBtn" disabled={!excellent} onClick={() => setPage('wise')}>Seterusnya: Pilihan Bijak</button>
          <AudioButton text="Pilih barang. Lihat harga. Pastikan jumlah tidak lebih daripada RM5. Cuba pilih barang yang diperlukan." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function WiseChoiceScreen({ setPage, soundOn, speaking, setSpeaking }) {
  const [active, setActive] = useState(items[0]);
  return (
    <main className="screen">
      <section className="missionCard wide">
        <Badge>LEVEL 4</Badge>
        <h1>Carta Bijak</h1>
        <p className="bigInstruction">Pilih satu barang. Lihat bintang untuk membuat keputusan.</p>
        <div className="wiseLayout">
          <div className="miniItemList">
            {items.map(item => (
              <button key={item.id} className={`smallItem ${active.id === item.id ? 'selected' : ''}`} onClick={() => setActive(item)}>{item.symbol} {item.name}</button>
            ))}
          </div>
          <div className="radarCard">
            <div className="giantSymbol">{active.symbol}</div>
            <h2>{active.name}</h2>
            <p className="priceTag">RM{active.price}</p>
            <StarRating label="Harga Sesuai" value={active.price <= 2 ? 3 : active.price <= 4 ? 2 : 1} />
            <StarRating label="Diperlukan" value={active.need} />
            <StarRating label="Baik untuk Diri" value={active.good} />
            <div className="teacherNote">Adakah barang ini pilihan bijak? Mengapa?</div>
          </div>
        </div>
        <div className="questionBox">
          <strong>Soalan KBAT Mudah:</strong>
          <p>Jika kamu hanya ada RM5, adakah barang ini pilihan bijak? Mengapa?</p>
          <p style={{marginTop: '10px', color: 'var(--sky-dark)'}}><em>Contoh: "Saya pilih <strong>{active.name}</strong> kerana <strong>ia diperlukan</strong>."</em></p>
        </div>
        <div className="buttonRow">
          <button className="primaryBtn" onClick={() => setPage('quiz')}>Seterusnya: Kuiz</button>
          <AudioButton text="Carta bijak membantu kita memilih barang. Lihat harga, keperluan dan manfaat barang." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function QuizScreen({ setPage, soundOn, setProgress, speaking, setSpeaking }) {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = quiz.reduce((sum, q, idx) => sum + (answers[idx] === q.answer ? 1 : 0), 0);
  const complete = answered === quiz.length;
  useEffect(() => {
    if (complete) {
      setProgress(prev => {
        const badges = score >= 4 && !prev.badges.includes('Juara Dunia Syiling RM5') ? [...prev.badges, 'Juara Dunia Syiling RM5'] : prev.badges;
        return { ...prev, badges, quizScore: score };
      });
    }
  }, [complete, score, setProgress]);
  return (
    <main className="screen">
      <section className="missionCard wide">
        <Badge>LEVEL 5</Badge>
        <h1>Kuiz Pengukuhan</h1>
        <div className="quizGrid">
          {quiz.map((q, idx) => (
            <div className="quizCard" key={q.q}>
              <h2>{idx + 1}. {q.q}</h2>
              <div className="quizOptions">
                {q.options.map((op, opIdx) => (
                  <button key={op} className={answers[idx] === opIdx ? 'selected' : ''} onClick={() => setAnswers(prev => ({...prev, [idx]: opIdx}))}>{op}</button>
                ))}
              </div>
              {answers[idx] !== undefined && (
                <div className={answers[idx] === q.answer ? 'feedback good' : 'feedback retry'} aria-live="polite">
                  {answers[idx] === q.answer ? 'Super! Betul! ' : 'Cuba semak semula. '} {q.explain}
                </div>
              )}
            </div>
          ))}
        </div>
        {complete && <div className="scoreBanner" aria-live="polite"><Trophy /> Skor: {score}/{quiz.length}</div>}
        <div className="buttonRow">
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('finish')}>Lihat Rumusan</button>
          <AudioButton text="Jawab kuiz. Pilih jawapan yang paling bijak. Kamu boleh cuba lagi jika salah." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function FinishScreen({ setPage, progress }) {
  return (
    <main className="screen">
      <section className="missionCard finish-area">
        <div className="castle-top">🏰</div>
        <Badge>Istana Pembeli Bijak</Badge>
        <h1>Tahniah!</h1>
        <p className="bigInstruction">Kamu sudah belajar memilih barang, mengira wang, dan membuat keputusan bijak.</p>

        <div className="summaryList">
          <h2>Misi Selesai:</h2>
          <p>✅ Kenali RM5</p>
          <p>✅ Ikut Peta Alir</p>
          <p>✅ Pilih Barang Bijak</p>
          <p>✅ Kira Jumlah & Baki</p>
        </div>

        <div className="progressBox">
          <h2>Lencana Saya</h2>
          <div className="badges">
            {progress.badges.map(b => <span key={b} className="earned">🏅 {b}</span>)}
          </div>
        </div>

        <div className="buttonRow" style={{justifyContent: 'center'}}>
          <button className="primaryBtn" onClick={() => setPage('home')}>Kembali ke Utama</button>
          <button className="secondaryBtn" onClick={() => window.print()}>Cetak Lencana</button>
        </div>
      </section>
    </main>
  );
}

function TeacherGuide({ setPage }) {
  return (
    <main className="screen">
      <section className="missionCard wide teacherGuide">
        <Badge>Panduan Guru / Pensyarah</Badge>
        <h1>Rasional Reka Bentuk Digital</h1>
        <div className="guideGrid">
          <div>
            <h2>1. Kesesuaian MBPK</h2>
            <ul>
              <li>Sokongan visual (ikon + teks).</li>
              <li>Arahan pendek & berulang.</li>
              <li>Latihan berperingkat (scaffolded).</li>
              <li>Tiada tekanan masa.</li>
              <li>Peneguhan positif (Lencana).</li>
              <li>Sokongan audio (Read-aloud).</li>
              <li>Kiraan matematik mudah.</li>
              <li>Konteks kehidupan harian.</li>
            </ul>
          </div>
          <div>
            <h2>2. Alat Berfikir</h2>
            <ul>
              <li><strong>Peta Alir:</strong> Membantu murid menyusun langkah membeli barang secara berurutan.</li>
              <li><strong>Carta Bijak:</strong> Membantu murid membandingkan barang berdasarkan harga, keperluan, dan manfaat.</li>
              <li><strong>Penyoalan KBAT:</strong> Menggalakkan murid memberi sebab mudah bagi pilihan mereka.</li>
            </ul>
          </div>
          <div>
            <h2>3. Kemahiran Belajar</h2>
            <ul>
              <li>Memperoleh maklumat (Mengenal RM5).</li>
              <li>Mengurus maklumat (Peta Alir).</li>
              <li>Memproses maklumat (Kiraan harga/baki).</li>
              <li>Membuat keputusan (Pilihan bijak).</li>
              <li>Refleksi pembelajaran (Rumusan).</li>
            </ul>
          </div>
          <div>
            <h2>4. Elemen KPPB</h2>
            <ul>
              <li><strong>Communication:</strong> Menyatakan pilihan dan sebab.</li>
              <li><strong>Creativity:</strong> Simulasi pengembaraan platformer.</li>
              <li><strong>Critical Thinking:</strong> Menilai keperluan vs kehendak.</li>
              <li><strong>Character:</strong> Tanggungjawab dalam berbelanja.</li>
              <li><strong>Citizenship:</strong> Nilai celik kewangan.</li>
            </ul>
          </div>
          <div>
            <h2>5. Etika Teknologi</h2>
            <ul>
              <li>Tiada iklan atau pautan luar.</li>
              <li>Tiada pengumpulan data peribadi.</li>
              <li>Data disimpan secara lokal (LocalStorage).</li>
              <li>Tiada aset berhak cipta.</li>
              <li>Reka bentuk aksesibel (Kontras/Teks Besar).</li>
            </ul>
          </div>
        </div>
        <button className="primaryBtn" onClick={() => setPage('home')}>Kembali ke Utama</button>
      </section>
    </main>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(loadProgress);
  const [soundOn, setSoundOn] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => saveProgress(progress), [progress]);

  const className = useMemo(() => [
    'appShell',
    largeText ? 'largeText' : '',
    highContrast ? 'highContrast' : '',
    reduceMotion ? 'reduceMotion' : ''
  ].join(' '), [largeText, highContrast, reduceMotion]);

  function reset() {
    if (!window.confirm('Adakah anda pasti mahu set semula semua kemajuan?')) return;
    const next = { badges: [], quizScore: 0 };
    setProgress(next);
    setPage('home');
  }

  return (
    <div className={className}>
      <Header page={page} setPage={setPage} soundOn={soundOn} setSoundOn={setSoundOn} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
      {page === 'home' && <HomeScreen setPage={setPage} soundOn={soundOn} progress={progress} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'intro' && <IntroScreen setPage={setPage} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'money' && <MoneyScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'flow' && <FlowScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'shop' && <ShopScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'wise' && <WiseChoiceScreen setPage={setPage} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'quiz' && <QuizScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
      {page === 'finish' && <FinishScreen setPage={setPage} progress={progress} />}
      {page === 'teacher' && <TeacherGuide setPage={setPage} />}
      <button className="resetBtn" onClick={reset}><RefreshCcw size={16}/> Reset</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
