import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, RefreshCcw, Trophy, Sparkles, Coins, Map, ShoppingBasket, Brain, Home, BookOpen, Star, ArrowRight } from 'lucide-react';
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

function AudioButton({ text, soundOn, speaking, setSpeaking }) {
  return (
    <button
      className={`iconBtn ${speaking ? 'speaking' : ''}`}
      onClick={() => speak(text, soundOn, () => setSpeaking(true), () => setSpeaking(false))}
      aria-label="Dengar arahan"
    >
      <Volume2 size={20} /> Dengar Arahan
    </button>
  );
}

function StarRating({ label, value }) {
  return (
    <div className="star-line" aria-label={`${label}: ${value} bintang`}>
      <span style={{fontWeight: '900'}}>{label}</span>
      <span className="star-group">{'★'.repeat(value)}{'☆'.repeat(3 - value)}</span>
    </div>
  );
}

function Header({ page, setPage, soundOn, setSoundOn, highContrast, setHighContrast, largeText, setLargeText, reduceMotion, setReduceMotion }) {
  return (
    <header className="topbar">
      <button className="homeBtn" onClick={() => setPage('home')}><Home size={18} /> Utama</button>
      <div className="brand">
        <div className="float-coin" style={{width: '40px', height: '40px', background: 'var(--coin)', border: '3px solid var(--outline)', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: '900'}}>RM5</div>
        <div>
          <strong>DUNIA SYILING RM5</strong>
          <small>Misi Kedai Mini: Pilih, Kira, Bayar!</small>
        </div>
      </div>
      <div className="tools">
        <button className="miniBtn" onClick={() => setSoundOn(!soundOn)}>{soundOn ? <Volume2 size={17}/> : <VolumeX size={17}/>} Audio</button>
        <button className="miniBtn" onClick={() => setLargeText(!largeText)}>Teks</button>
        <button className="miniBtn" onClick={() => setHighContrast(!highContrast)}>Kontras</button>
        <button className="miniBtn" onClick={() => setReduceMotion(!reduceMotion)}>Gerak</button>
      </div>
    </header>
  );
}

function HomeScreen({ setPage, soundOn, progress, speaking, setSpeaking }) {
  const intro = 'Selamat datang ke Dunia Syiling RM5! Mari belajar cara memilih barang, mengira wang, dan membuat keputusan bijak.';
  return (
    <main>
      <section className="heroCard castlePanel">
        <div className="heroText">
          <div className="badge-label">WORLD 1: Welcome Gate</div>
          <h1>Selamat Datang ke Dunia Syiling RM5!</h1>
          <p style={{fontSize: '1.2rem', fontWeight: '900', marginBottom: '20px'}}>Misi Kedai Mini: Pilih, Kira, Bayar!</p>
          <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <button className="primaryBtn brick-style" onClick={() => setPage('intro')}><Sparkles size={20}/> Mulakan Misi</button>
            <AudioButton text={intro} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
          </div>
        </div>
        <DidiDuit />
      </section>

      <section className="objectiveGrid">
        <button className="level-card" onClick={() => setPage('money')}>
          <div className="lvl-icon"><Coins size={30} /></div>
          <span>Kenali RM5</span>
        </button>
        <button className="level-card" onClick={() => setPage('flow')}>
          <div className="lvl-icon"><Map size={30} /></div>
          <span>Peta Alir</span>
        </button>
        <button className="level-card" onClick={() => setPage('shop')}>
          <div className="lvl-icon"><ShoppingBasket size={30} /></div>
          <span>Misi Kedai</span>
        </button>
        <button className="level-card" onClick={() => setPage('wise')}>
          <div className="lvl-icon"><Brain size={30} /></div>
          <span>Pilihan Bijak</span>
        </button>
        <button className="level-card" onClick={() => setPage('teacher')}>
          <div className="lvl-icon"><BookOpen size={30} /></div>
          <span>Panduan Guru</span>
        </button>
      </section>

      <section className="progressBox">
        <h2>Lencana Saya</h2>
        <div className="badge-row">
          {progress.badges.length ? progress.badges.map(b => (
            <div key={b} className="medal" title={b}>⭐</div>
          )) : <p className="muted">Belum ada lencana. Mari mula misi.</p>}
        </div>
      </section>
    </main>
  );
}

function IntroScreen({ setPage, soundOn, speaking, setSpeaking }) {
  const text = 'Kamu ada RM5. Tugas kamu ialah memilih barang yang sesuai. Pastikan wang cukup dan kira baki.';
  return (
    <main>
      <section className="missionCard brick-panel">
        <div className="badge-label" style={{background: 'var(--white)', color: 'var(--outline)'}}>Pengenalan</div>
        <h1 style={{color: 'var(--coin)'}}>Hai Pembeli Bijak!</h1>
        <p style={{fontSize: '1.3rem', fontWeight: '900'}}>Kamu ada <strong className="price-tag">RM5</strong>. Mari belajar cara membeli barang dengan bijak.</p>

        <div className="wooden-sign" style={{margin: '30px 0'}}>
          <h2 style={{marginTop: 0}}>Contoh Mudah:</h2>
          <p>Roti = RM2</p>
          <p>Air Mineral = RM1</p>
          <hr style={{borderColor: 'rgba(255,255,255,0.2)'}} />
          <p><strong>Jumlah:</strong> RM2 + RM1 = RM3</p>
          <p><strong>Baki:</strong> RM5 - RM3 = RM2</p>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="primaryBtn" onClick={() => setPage('money')}>Seterusnya: Kenali RM5 <ArrowRight /></button>
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
    <main>
      <section className="missionCard">
        <div className="badge-label">LEVEL 1</div>
        <h1>Kenali RM5</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>Klik wang yang bernilai <strong>RM5</strong>.</p>

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
            {correct ? 'Hebat! Ini RM5 untuk misi hari ini.' : 'Cuba lagi. Cari wang yang tertulis RM5.'}
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" disabled={!correct} onClick={() => setPage('flow')}>Seterusnya: Peta Alir <ArrowRight /></button>
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
    <main>
      <section className="missionCard">
        <div className="badge-label">LEVEL 2</div>
        <h1>Peta Alir Pembeli Bijak</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>Tekan setiap langkah mengikut urutan (1 hingga 6).</p>

        <div className="flowPath">
          {flowSteps.map((s, idx) => {
            const isActive = done.includes(idx);
            return (
              <div key={s.title} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <button
                  className={`stepping-stone ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (idx === done.length) setDone(prev => [...prev, idx]);
                  }}
                >
                  <div className="step-num">{idx + 1}</div>
                  <div style={{margin: '10px 0'}}>{Icons[s.type]()}</div>
                  <div style={{fontSize: '0.9rem'}}>{s.title}</div>
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
              <span>Level Clear! Kamu sudah ikut peta alir dengan betul.</span>
            </div>
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('shop')}>Seterusnya: Misi Kedai <ArrowRight /></button>
          <AudioButton text="Peta alir membantu kita menyusun langkah membeli barang. Tekan langkah satu hingga enam." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
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
  const hasNeed = basket.some(id => items.find(i => i.id === id).tag === 'KEPERLUAN');
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
        <div className="badge-label">LEVEL 3</div>
        <h1>Kedai Mini Ajaib</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>Kamu ada <strong className="price-tag">RM5</strong>. Pilih barang keperluan dahulu.</p>

        <div className="shopLayout">
          <div className="itemGrid">
            {items.map(item => (
              <button key={item.id} className={`platform-card ${basket.includes(item.id) ? 'selected' : ''}`} onClick={() => toggleItem(item.id)}>
                <div style={{background: 'var(--cream)', borderRadius: '50%', padding: '10px', border: '3px solid var(--outline)'}}>
                  {Icons[item.type]()}
                </div>
                <strong>{item.name}</strong>
                <span className="price-tag">RM{item.price}</span>
                <small style={{fontWeight: '900', color: item.tag === 'KEPERLUAN' ? 'var(--grass)' : 'var(--red)'}}>{item.tag}</small>
              </button>
            ))}
          </div>

          <aside className="wooden-sign">
            <h2 style={{marginTop: 0}}>Troli Saya 🛒</h2>
            {basket.length === 0 ? <p>Pilih barang...</p> : basket.map(id => {
              const item = items.find(i => i.id === id);
              return <div key={id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                <span>{item.name}</span>
                <span>RM{item.price}</span>
              </div>
            })}
            <hr style={{borderColor: 'rgba(255,255,255,0.3)'}} />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900'}}>
              <span>Jumlah:</span>
              <span>RM{total}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', color: balance < 0 ? 'var(--red)' : 'var(--coin)'}}>
              <span>Baki:</span>
              <span>RM{balance}</span>
            </div>

            <div style={{marginTop: '20px'}} aria-live="polite">
              {total > BUDGET && <div className="toast error" style={{fontSize: '0.9rem', padding: '10px'}}>Wang tidak cukup!</div>}
              {valid && !hasNeed && <div className="toast error" style={{fontSize: '0.9rem', padding: '10px'}}>Pilih barang keperluan.</div>}
              {excellent && <div className="toast success" style={{fontSize: '0.9rem', padding: '10px', color: 'var(--outline)'}}>Bijak! Wang cukup.</div>}
            </div>
          </aside>
        </div>

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '30px'}}>
          <button className="primaryBtn" disabled={!excellent} onClick={() => setPage('wise')}>Seterusnya: Pilihan Bijak <ArrowRight /></button>
          <AudioButton text="Pilih barang. Pastikan jumlah tidak lebih daripada RM5. Utamakan barang keperluan." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function WiseChoiceScreen({ setPage, soundOn, setProgress, speaking, setSpeaking }) {
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
        <div className="badge-label">LEVEL 4</div>
        <h1>Carta Bijak</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>Bandingkan barang menggunakan bintang.</p>

        <div className="wiseLayout">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
            {items.map((item, idx) => (
              <button key={item.id} className={`platform-card ${activeIdx === idx ? 'selected' : ''}`} onClick={() => setActiveIdx(idx)}>
                {Icons[item.type]()}
                <small>{item.name}</small>
              </button>
            ))}
          </div>

          <div className="radarCard" style={{background: 'var(--cream)', position: 'relative', overflow: 'hidden'}}>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
              <div className="bounce" style={{display: 'inline-block'}}>{Icons[active.type]()}</div>
              <h2 style={{margin: '10px 0'}}>{active.name}</h2>
              <span className="price-tag">RM{active.price}</span>
            </div>

            <StarRating label="Harga Sesuai" value={active.price <= 2 ? 3 : active.price <= 4 ? 2 : 1} />
            <StarRating label="Diperlukan" value={active.need} />
            <StarRating label="Baik untuk Diri" value={active.good} />

            <div className="wooden-sign" style={{marginTop: '20px', fontSize: '0.9rem'}}>
              <strong>Soalan Bijak:</strong>
              <p>Adakah ini pilihan bijak? Mengapa?</p>
              <textarea
                className="reason-input"
                placeholder={`Saya pilih ${active.name} kerana...`}
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
          <button className="primaryBtn" onClick={() => setPage('quiz')}>Seterusnya: Kuiz <ArrowRight /></button>
          <AudioButton text="Gunakan carta bijak untuk menilai barang. Lihat bintang untuk harga, keperluan, dan manfaat." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
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
        <div className="badge-label">LEVEL 5</div>
        <h1>Kuiz Pengukuhan</h1>

        <div className="quizGrid">
          {quiz.map((q, idx) => (
            <div key={idx} className="quizCard brick-panel" style={{color: 'var(--outline)', background: 'var(--white)'}}>
              <h2 style={{fontSize: '1.2rem'}}>{idx + 1}. {q.q}</h2>
              <div style={{display: 'grid', gap: '10px', marginTop: '15px'}}>
                {q.options.map((opt, optIdx) => (
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
                  {answers[idx] === q.answer ? 'Betul! ' : 'Salah. '} {q.explain}
                </div>
              )}
            </div>
          ))}
        </div>

        {complete && (
          <div className="toast success" style={{fontSize: '1.5rem', marginBottom: '30px'}}>
            <Trophy size={40} /> Skor Anda: {score} / {quiz.length}
          </div>
        )}

        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
          <button className="primaryBtn" disabled={!complete} onClick={() => setPage('finish')}>Tamat Misi <ArrowRight /></button>
          <AudioButton text="Jawab semua soalan kuiz. Pilih jawapan yang paling bijak." soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />
        </div>
      </section>
    </main>
  );
}

function FinishScreen({ setPage, progress }) {
  return (
    <main>
      <div className="castle-container">
        <div className="flag-pole">
          <div className="flag"></div>
        </div>
        <div style={{background: '#888', width: '200px', height: '150px', margin: '0 auto', border: '6px solid var(--outline)', borderRadius: '10px 10px 0 0', position: 'relative'}}>
           <div style={{position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '80px', background: 'var(--outline)', borderRadius: '30px 30px 0 0'}}></div>
        </div>

        <div className="badge-label" style={{marginTop: '30px'}}>Istana Pembeli Bijak</div>
        <h1>TAHNIAH! MISI BERJAYA!</h1>
        <p style={{fontSize: '1.2rem', fontWeight: '900'}}>Kamu telah menjadi Pembeli Bijak di Dunia Syiling RM5.</p>

        <div className="progressBox" style={{marginTop: '40px'}}>
          <h2>Koleksi Lencana Anda:</h2>
          <div className="badge-row" style={{justifyContent: 'center'}}>
            {progress.badges.map(b => (
              <div key={b} className="medal" title={b} style={{width: '100px', height: '100px', fontSize: '3rem'}}>⭐</div>
            ))}
          </div>
        </div>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px'}}>
          <button className="primaryBtn" onClick={() => setPage('home')}><Home /> Kembali Ke Mula</button>
          <button className="secondaryBtn" onClick={() => window.print()}>Simpan PDF</button>
        </div>
      </div>
    </main>
  );
}
function TeacherGuide({ setPage }) {
  return (
    <main>
      <section className="teacherGuide wooden-sign" style={{background: '#8B5A2B', color: 'var(--white)', borderRadius: '15px'}}>
        <div className="badge-label" style={{background: 'var(--white)', color: 'var(--outline)'}}>Panduan Guru / Pensyarah</div>
        <h1>Rasional Reka Bentuk Digital</h1>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px'}}>
          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>1. Kesesuaian MBPK</h2>
            <ul style={{paddingLeft: '20px'}}>
              <li>Sokongan visual (ikon + teks).</li>
              <li>Arahan pendek & berulang.</li>
              <li>Latihan berperingkat (scaffolded).</li>
              <li>Tiada tekanan masa.</li>
              <li>Peneguhan positif (Lencana).</li>
              <li>Sokongan audio (Read-aloud).</li>
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>2. Alat Berfikir</h2>
            <ul style={{paddingLeft: '20px'}}>
              <li><strong>Peta Alir:</strong> Membantu murid menyusun langkah membeli secara berurutan.</li>
              <li><strong>Carta Bijak:</strong> Membantu murid membandingkan barang (Harga, Keperluan, Manfaat).</li>
              <li><strong>Penyoalan KBAT:</strong> Menggalakkan murid memberi sebab bagi pilihan mereka.</li>
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>3. Kemahiran Belajar</h2>
            <ul style={{paddingLeft: '20px'}}>
              <li>Memperoleh maklumat (Mengenal RM5).</li>
              <li>Mengurus maklumat (Peta Alir).</li>
              <li>Memproses maklumat (Kiraan harga/baki).</li>
              <li>Membuat keputusan (Pilihan bijak).</li>
            </ul>
          </div>

          <div style={{background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '10px'}}>
            <h2>4. Elemen KPPB</h2>
            <ul style={{paddingLeft: '20px'}}>
              <li><strong>Communication:</strong> Menyatakan pilihan dan sebab.</li>
              <li><strong>Critical Thinking:</strong> Menilai keperluan vs kehendak.</li>
              <li><strong>Character:</strong> Tanggungjawab berbelanja.</li>
            </ul>
          </div>
        </div>

        <button className="primaryBtn" style={{marginTop: '30px'}} onClick={() => setPage('home')}><Home /> Kembali ke Utama</button>
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
      <div className="hills"><div className="hill"></div><div className="hill"></div><div className="hill"></div></div>
      <Header page={page} setPage={setPage} soundOn={soundOn} setSoundOn={setSoundOn} highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
      <div className="screen">
        {page === 'home' && <HomeScreen setPage={setPage} soundOn={soundOn} progress={progress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'intro' && <IntroScreen setPage={setPage} soundOn={soundOn} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'money' && <MoneyScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'flow' && <FlowScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'shop' && <ShopScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'wise' && <WiseChoiceScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'quiz' && <QuizScreen setPage={setPage} soundOn={soundOn} setProgress={setProgress} speaking={speaking} setSpeaking={setSpeaking} />}
        {page === 'finish' && <FinishScreen setPage={setPage} progress={progress} />}
        {page === 'teacher' && <TeacherGuide setPage={setPage} />}
      </div>
      <button className="resetBtn" style={{position: 'fixed', bottom: '100px', right: '20px', zIndex: 100}} onClick={reset}><RefreshCcw size={16}/> Reset</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
