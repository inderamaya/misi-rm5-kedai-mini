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
          <strong>Misi RM5</strong>
          <small>Kedai Mini Ajaib</small>
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

function HomeScreen({ setPage, soundOn, progress, speaking, setSpeaking }) {
  const intro = 'Selamat datang ke Misi RM5. Hari ini kita belajar mengenal wang, memilih barang, mengira jumlah harga, dan membuat keputusan bijak.';
  return (
    <main className="screen homeScreen">
      <section className="heroCard castlePanel">
        <div className="cloud cloud1">☁️</div>
        <div className="cloud cloud2">☁️</div>
        <div className="heroText">
          <Badge>Untuk MBPK Masalah Pembelajaran Tahap 2</Badge>
          <h1>Misi RM5: Kedai Mini Ajaib</h1>
          <p>Pilih barang, kira wang, semak baki, dan buat keputusan bijak.</p>
          <div className="buttonRow">
            <button className="primaryBtn" onClick={() => setPage('intro')}><Sparkles size={20}/> Mula Misi</button>
            <AudioButton text={intro} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
          </div>
        </div>
        <div className="heroMascot" aria-hidden="true">
          <div className="shopSprite">🏪</div>
          <div className="learnerSprite">🧑‍🎓</div>
          <div className="coinTrail">🪙 🪙 🪙</div>
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
      const badges = prev.badges.includes('Kenali Wang') ? prev.badges : [...prev.badges, 'Kenali Wang'];
      return { ...prev, badges };
    });
  }
  useEffect(() => { if (correct) award(); }, [correct]);
  return (
    <main className="screen">
      <section className="missionCard">
        <Badge>Misi 1</Badge>
        <h1>Kenali Wang</h1>
        <p className="bigInstruction">Klik wang yang bernilai <strong>RM5</strong>.</p>
        <div className="moneyGrid">
          {moneyChoices.map(m => (
            <button key={m.id} className={`moneyCard ${chosen === m.id ? 'selected' : ''}`} onClick={() => setChosen(m.id)}>
              <span className="moneySymbol">{m.symbol}</span>
              <strong>{m.label}</strong>
            </button>
          ))}
        </div>
        {chosen && (
          <div className={correct ? 'feedback good' : 'feedback retry'} aria-live="polite">
            {correct ? 'Bagus! RM5 ialah wang untuk misi hari ini.' : 'Cuba lagi. Cari wang yang tertulis RM5.'}
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
        const badges = prev.badges.includes('Peta Alir') ? prev.badges : [...prev.badges, 'Peta Alir'];
        return { ...prev, badges };
      });
    }
  }, [complete, setProgress]);
  return (
    <main className="screen">
      <section className="missionCard wide">
        <Badge>Alat Berfikir Utama</Badge>
        <h1>Peta Alir: Langkah Membeli Barang</h1>
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
  const total = basket.reduce((sum, id) => sum + items.find(i => i.id === id).price, 0);
  const balance = BUDGET - total;
  const valid = total > 0 && total <= BUDGET;
  const hasNeed = basket.some(id => items.find(i => i.id === id).need >= 2);
  const excellent = valid && hasNeed && basket.length >= 2;
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
    <main className="screen">
      <section className="missionCard wide">
        <Badge>Misi 2</Badge>
        <h1>Kedai Mini Maya</h1>
        <p className="bigInstruction">Kamu ada <strong>RM5</strong>. Pilih barang yang sesuai. Pastikan wang cukup.</p>
        <div className="shopLayout">
          <div className="itemGrid">
            {items.map(item => (
              <button key={item.id} className={`itemCard ${basket.includes(item.id) ? 'selected' : ''}`} onClick={() => toggleItem(item.id)}>
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
              {valid && hasNeed && basket.length < 2 && total < BUDGET && <div className="feedback retry">Bagus, tapi kamu masih ada baki. Cuba pilih satu lagi barang.</div>}
              {excellent && <div className="feedback good">Pilihan bijak! Wang cukup dan barang sesuai.</div>}
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
        <Badge>Alat Berfikir Kedua</Badge>
        <h1>Carta Bijak: Harga, Keperluan, Manfaat</h1>
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
            <StarRating label="Harga sesuai" value={active.price <= 3 ? 3 : active.price === 4 ? 2 : 1} />
            <StarRating label="Diperlukan" value={active.need} />
            <StarRating label="Baik untuk diri" value={active.good} />
            <div className="teacherNote">Murid belajar membandingkan pilihan, bukan hanya mengira harga.</div>
          </div>
        </div>
        <div className="questionBox">
          <strong>Soalan KBAT Mudah:</strong>
          <p>Jika kamu hanya ada RM5, adakah barang ini pilihan bijak? Mengapa?</p>
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
        const badges = score >= 3 && !prev.badges.includes('Juara Misi') ? [...prev.badges, 'Juara Misi'] : prev.badges;
        return { ...prev, badges, quizScore: score };
      });
    }
  }, [complete, score, setProgress]);
  return (
    <main className="screen">
      <section className="missionCard wide">
        <Badge>Pengukuhan</Badge>
        <h1>Kuiz Pembeli Bijak</h1>
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
                  {answers[idx] === q.answer ? 'Betul! ' : 'Cuba semak semula. '} {q.explain}
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
      <section className="missionCard">
        <Badge>Rumusan Pembelajaran</Badge>
        <h1>Tahniah, Pembeli Bijak!</h1>
        <p className="bigInstruction">Hari ini kamu belajar melihat wang, membaca harga, memilih barang, mengira baki, dan membuat keputusan.</p>
        <div className="summaryList">
          <p>✅ Saya boleh mengenal RM5.</p>
          <p>✅ Saya boleh ikut Peta Alir membeli barang.</p>
          <p>✅ Saya boleh memilih barang mengikut bajet.</p>
          <p>✅ Saya boleh memberi sebab pilihan saya.</p>
        </div>
        <div className="progressBox">
          <h2>Lencana Akhir</h2>
          <div className="badges">{progress.badges.map(b => <span key={b} className="earned">🏅 {b}</span>)}</div>
        </div>
        <div className="buttonRow">
          <button className="primaryBtn" onClick={() => setPage('home')}>Kembali ke Utama</button>
          <button className="secondaryBtn" onClick={() => window.print()}>Cetak / Simpan PDF</button>
        </div>
      </section>
    </main>
  );
}

function TeacherGuide({ setPage }) {
  return (
    <main className="screen">
      <section className="missionCard wide teacherGuide">
        <Badge>Rasional Guru Pelatih</Badge>
        <h1>Panduan Pensyarah / Guru</h1>
        <div className="guideGrid">
          <div>
            <h2>Objektif Pembelajaran</h2>
            <ul>
              <li>Murid mengenal nilai RM5.</li>
              <li>Murid menyusun langkah membeli barang menggunakan Peta Alir.</li>
              <li>Murid memilih barang berdasarkan bajet.</li>
              <li>Murid memberi sebab mudah bagi pilihan barang.</li>
            </ul>
          </div>
          <div>
            <h2>Kesediaan MBPK</h2>
            <ul>
              <li>Arahan ringkas dan berulang.</li>
              <li>Butang besar sesuai sentuhan.</li>
              <li>Visual, simbol dan emoji sebagai sokongan.</li>
              <li>Tiada pemasa bagi mengurangkan tekanan.</li>
              <li>Audio arahan melalui Web Speech API.</li>
            </ul>
          </div>
          <div>
            <h2>Alat Berfikir</h2>
            <ul>
              <li><strong>Peta Alir:</strong> menyusun langkah pembelian.</li>
              <li><strong>Carta Bijak:</strong> membandingkan harga, keperluan dan manfaat.</li>
              <li><strong>Penyoalan KBAT:</strong> murid memberi sebab pilihan.</li>
            </ul>
          </div>
          <div>
            <h2>Kemahiran Belajar</h2>
            <ul>
              <li>Memperoleh maklumat melalui visual harga.</li>
              <li>Mengurus maklumat melalui peta alir.</li>
              <li>Memproses maklumat melalui kiraan wang.</li>
              <li>Menyampaikan maklumat melalui alasan pilihan.</li>
            </ul>
          </div>
          <div>
            <h2>Elemen KPPB</h2>
            <ul>
              <li><strong>Communication:</strong> menyatakan pilihan dan sebab.</li>
              <li><strong>Creativity:</strong> simulasi kedai mini interaktif.</li>
              <li><strong>Critical Thinking:</strong> membanding harga dan keperluan.</li>
              <li><strong>Character:</strong> berbelanja secara bertanggungjawab.</li>
              <li><strong>Citizenship:</strong> nilai pengguna bijak.</li>
            </ul>
          </div>
          <div>
            <h2>Nota Etika Teknologi</h2>
            <ul>
              <li>Tiada data murid dihantar ke pelayan.</li>
              <li>Progress disimpan secara localStorage sahaja.</li>
              <li>Tiada iklan, pautan luar atau aset berhak cipta.</li>
              <li>Gunakan tema retro platformer asli, bukan aset rasmi mana-mana permainan.</li>
            </ul>
          </div>
        </div>
        <button className="primaryBtn" onClick={() => setPage('home')}>Kembali</button>
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
