import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Volume2, VolumeX, RefreshCcw, Trophy, Target, Shield, Zap, Search, ShoppingCart, BarChart, MessageSquare, Home, Info, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import './styles.css';
import { BUDGET, moneyChoices, items, flowSteps, challenge1, challenge2, challenge3 } from './constants';

// --- HELPERS ---

function speak(text, enabled = true) {
  if (!enabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ms-MY';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('agen-rm5-progress')) || { badges: [], scene: 'home', items: [], reason1: '', reason2: '', reflection: '' };
  } catch {
    return { badges: [], scene: 'home', items: [], reason1: '', reason2: '', reflection: '' };
  }
}

function saveProgress(progress) {
  localStorage.setItem('agen-rm5-progress', JSON.stringify(progress));
}

// --- COMPONENTS ---

const AgentBijak = ({ badge = true, size = "normal" }) => (
  <div className={`agent-bijak ${size === 'small' ? 'scale-75' : ''}`}>
    <div className="agent-head">
      <div className="agent-visor" />
    </div>
    <div className="agent-body">
      {badge && <div className="agent-badge">RM5</div>}
    </div>
  </div>
);

const Icons = {
  coin10: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <circle cx="25" cy="25" r="20" />
      <text x="25" y="32" textAnchor="middle" fontSize="14" fill="currentColor" fontWeight="bold">10</text>
    </svg>
  ),
  coin20: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <circle cx="25" cy="25" r="20" />
      <text x="25" y="32" textAnchor="middle" fontSize="14" fill="currentColor" fontWeight="bold">20</text>
    </svg>
  ),
  coin50: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <circle cx="25" cy="25" r="20" />
      <text x="25" y="32" textAnchor="middle" fontSize="14" fill="currentColor" fontWeight="bold">50</text>
    </svg>
  ),
  note1: () => (
    <svg viewBox="0 0 80 40" className="svg-icon" width="80" height="40">
      <rect x="5" y="5" width="70" height="30" rx="2" />
      <text x="40" y="27" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">RM1</text>
    </svg>
  ),
  note5: () => (
    <svg viewBox="0 0 80 40" className="svg-icon" width="80" height="40">
      <rect x="5" y="5" width="70" height="30" rx="2" fill="rgba(0, 85, 255, 0.2)" />
      <text x="40" y="27" textAnchor="middle" fontSize="12" fill="currentColor" fontWeight="bold">RM5</text>
    </svg>
  ),
  water: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <path d="M25 5 L15 25 Q15 40 25 40 Q35 40 35 25 L25 5" fill="rgba(0, 240, 255, 0.2)" />
    </svg>
  ),
  bread: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <path d="M10 35 L10 20 Q10 10 25 10 Q40 10 40 20 L40 35 Z" fill="rgba(0, 240, 255, 0.2)" />
      <line x1="15" y1="20" x2="35" y2="20" />
      <line x1="15" y1="28" x2="35" y2="28" />
    </svg>
  ),
  banana: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <path d="M15 10 Q40 10 40 35" strokeWidth="4" />
    </svg>
  ),
  milk: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <rect x="15" y="10" width="20" height="30" />
      <path d="M15 20 L35 20" />
    </svg>
  ),
  book: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <path d="M10 10 L40 10 L40 40 L10 40 Z M15 15 L35 15 M15 22 L35 22 M15 29 L35 29" />
    </svg>
  ),
  toy: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <circle cx="25" cy="18" r="8" />
      <rect x="15" y="28" width="20" height="12" rx="2" />
      <line x1="20" y1="28" x2="20" y2="22" />
      <line x1="30" y1="28" x2="30" y2="22" />
    </svg>
  ),
  candy: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="50" height="50">
      <rect x="15" y="15" width="20" height="20" transform="rotate(45 25 25)" />
      <path d="M10 25 L18 25 M32 25 L40 25" />
    </svg>
  ),
  faham: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="40" height="40">
      <circle cx="25" cy="25" r="20" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <path d="M15 30 Q25 40 35 30" />
    </svg>
  ),
  hampir: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="40" height="40">
      <circle cx="25" cy="25" r="20" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <line x1="15" y1="32" x2="35" y2="32" />
    </svg>
  ),
  bantuan: () => (
    <svg viewBox="0 0 50 50" className="svg-icon" width="40" height="40">
      <circle cx="25" cy="25" r="20" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <path d="M15 35 Q25 25 35 35" />
    </svg>
  ),
  look_money: () => <Shield size={32} />,
  look_price: () => <Search size={32} />,
  choose_item: () => <Target size={32} />,
  calculate: () => <Zap size={32} />,
  check_balance: () => <Info size={32} />,
  pay: () => <ArrowRight size={32} />,
  save_balance: () => <Shield size={32} />,
};

function Panel({ children, className = "" }) {
  return (
    <div className={`panel ${className}`}>
      {children}
      <div className="panel-corner-bl" />
      <div className="panel-corner-br" />
    </div>
  );
}

// --- SCENES ---

const TitleScreen = ({ setPage, soundOn }) => {
  const intro = "Selamat datang ke Akademi Agen RM5. Misi Kedai Mini: Pilih, Kira, Bayar dengan Bijak!";
  return (
    <main className="screen">
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div>
          <h1 className="neon-text flicker" style={{ fontSize: '3rem' }}>Akademi Agen RM5</h1>
          <p className="pulse" style={{ fontSize: '1.2rem', color: 'var(--electric-blue)', fontWeight: 'bold', marginBottom: '30px' }}>
            MISI KEDAI MINI: PILIH, KIRA, BAYAR DENGAN BIJAK!
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="primaryBtn" onClick={() => setPage('briefing')}>
              <Zap /> Mulakan Misi
            </button>
            <button className="miniBtn" onClick={() => speak(intro, soundOn)} style={{ padding: '15px' }}>
              <Volume2 /> Dengar Arahan
            </button>
          </div>
          <button className="homeBtn" onClick={() => setPage('teacher')} style={{ marginTop: '40px', border: 'none', textDecoration: 'underline' }}>
            Panduan Guru
          </button>
        </div>
        <AgentBijak size="large" />
      </div>
    </main>
  );
};

const BriefingScene = ({ setPage, soundOn }) => {
  const text = "Kamu ada RM5. Pilih barang yang sesuai. Pastikan wang kamu cukup. Kira baki wang. Buat pilihan bijak.";
  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Arahan Misi</h2>
        <div style={{ fontSize: '1.5rem', lineHeight: '2', margin: '30px 0' }}>
          <div className="flicker">➜ Kamu ada <span style={{ color: 'var(--agent-gold)' }}>RM5</span>.</div>
          <div>➜ Pilih barang yang sesuai.</div>
          <div>➜ Pastikan wang kamu cukup.</div>
          <div>➜ Kira baki wang.</div>
          <div>➜ Buat pilihan bijak.</div>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" onClick={() => setPage('money')}>
            <CheckCircle /> Scan Complete: Seterusnya
          </button>
          <button className="miniBtn" onClick={() => speak(text, soundOn)}>
            <Volume2 /> Dengar Arahan
          </button>
        </div>
      </Panel>
      <div className="briefing-overlay" />
    </main>
  );
};

const MoneyScene = ({ setPage, soundOn, addBadge }) => {
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === 'rm5';

  useEffect(() => {
    if (isCorrect) addBadge('Lencana Agen Wang');
  }, [isCorrect]);

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Kenali Wang</h2>
        <p style={{ fontSize: '1.2rem' }}>Klik wang yang bernilai <span className="neon-text">RM5</span>.</p>

        <div className="grid-3" style={{ margin: '30px 0' }}>
          {moneyChoices.map(m => (
            <div
              key={m.id}
              className={`money-card ${selected === m.id ? 'selected' : ''}`}
              onClick={() => setSelected(m.id)}
            >
              <div style={{ margin: '10px 0' }}>{Icons[m.type]()}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>{m.label}</div>
              {m.highlight && <div style={{ color: 'var(--agent-gold)', fontSize: '0.7rem' }}>Hologram Active</div>}
            </div>
          ))}
        </div>

        {selected && (
          <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
            {isCorrect ? 'Hebat! Ini RM5 untuk misi hari ini.' : 'Cuba lagi. Cari wang yang tertulis RM5.'}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" disabled={!isCorrect} onClick={() => setPage('flow')}>
            Teruskan <ArrowRight />
          </button>
          <button className="miniBtn" onClick={() => speak("Klik wang yang bernilai RM5.", soundOn)}>
            <Volume2 /> Dengar Arahan
          </button>
        </div>
      </Panel>
    </main>
  );
};

const FlowScene = ({ setPage, soundOn, addBadge }) => {
  const [activeNodes, setActiveNodes] = useState([]);
  const isComplete = activeNodes.length === flowSteps.length;

  const toggleNode = (id) => {
    if (activeNodes.includes(id)) return;
    if (id === activeNodes.length + 1) {
      setActiveNodes([...activeNodes, id]);
    }
  };

  useEffect(() => {
    if (isComplete) addBadge('Lencana Peta Alir');
  }, [isComplete]);

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Peta Alir Agen</h2>
        <p>Aktifkan semua nod mengikut urutan misi.</p>

        <div className="flow-container" style={{ margin: '30px 0' }}>
          {flowSteps.map(step => (
            <div
              key={step.id}
              className={`flow-node ${activeNodes.includes(step.id) ? 'active' : ''}`}
              onClick={() => toggleNode(step.id)}
            >
              <div className="node-number">{step.id}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {Icons[step.type]()}
                <span style={{ fontWeight: 'bold' }}>{step.title}</span>
              </div>
              {activeNodes.includes(step.id) && <CheckCircle size={20} color="var(--success-green)" style={{ marginLeft: 'auto' }} />}
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="feedback-box feedback-success" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <AgentBijak size="small" badge={false} />
            <span>Modul Selesai! Kamu sudah bersedia untuk ke kedai.</span>
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" disabled={!isComplete} onClick={() => setPage('shop')}>
            Ke Kedai <ArrowRight />
          </button>
          <button className="miniBtn" onClick={() => speak("Tekan setiap langkah mengikut urutan.", soundOn)}>
            <Volume2 /> Dengar Arahan
          </button>
        </div>
      </Panel>
    </main>
  );
};

const ShopScene = ({ setPage, soundOn, addBadge, progress, setProgress }) => {
  const [basket, setBasket] = useState(progress.items || []);
  const total = basket.reduce((sum, id) => sum + (items.find(i => i.id === id)?.price || 0), 0);
  const balance = BUDGET - total;

  const hasKeperluan = basket.some(id => items.find(i => i.id === id)?.category === 'KEPERLUAN');
  const isTooExpensive = total > BUDGET;
  const isOnlyKehendak = basket.length > 0 && !hasKeperluan;
  const isValid = basket.length > 0 && !isTooExpensive;

  const toggleItem = (id) => {
    const next = basket.includes(id) ? basket.filter(x => x !== id) : [...basket, id];
    setBasket(next);
    setProgress({ ...progress, items: next });
  };

  useEffect(() => {
    if (isValid && hasKeperluan) addBadge('Lencana Pembeli Bijak');
  }, [isValid, hasKeperluan]);

  return (
    <main className="screen">
      <div className="grid-2">
        <Panel>
          <h2 className="neon-text">Holographic Shop</h2>
          <div className="grid-3" style={{ gap: '15px' }}>
            {items.map(item => (
              <div
                key={item.id}
                className={`item-card ${basket.includes(item.id) ? 'selected' : ''}`}
                onClick={() => toggleItem(item.id)}
                style={{ border: basket.includes(item.id) ? '2px solid var(--neon-cyan)' : '1px solid var(--electric-blue)' }}
              >
                {Icons[item.type]()}
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', margin: '5px 0' }}>{item.name}</div>
                <div className="neon-text" style={{ fontWeight: 'bold' }}>RM{item.price}</div>
                <div className={`cat-badge ${item.category === 'KEPERLUAN' ? 'cat-need' : 'cat-want'}`}>
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <h2 className="neon-text">Bakul Agen</h2>
          <div style={{ minHeight: '150px' }}>
            {basket.length === 0 ? <p style={{ color: 'var(--electric-blue)' }}>Pilih barang misi...</p> : (
              basket.map(id => {
                const item = items.find(i => i.id === id);
                return (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(0,240,255,0.1)' }}>
                    <span>{item.name}</span>
                    <span className="neon-text">RM{item.price}</span>
                  </div>
                );
              })
            )}
          </div>

          <div className="dashboard">
            <div className="stat-box">
              <div className="stat-label">Budget</div>
              <div className="stat-value">RM{BUDGET}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Jumlah</div>
              <div className="stat-value" style={{ color: isTooExpensive ? 'var(--alert-red)' : 'var(--neon-cyan)' }}>RM{total}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Baki</div>
              <div className="stat-value">RM{balance}</div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            {isTooExpensive && <div className="feedback-box feedback-error"><AlertTriangle size={16}/> Wang tidak cukup. Pilih semula.</div>}
            {isOnlyKehendak && <div className="feedback-box feedback-error">Wang cukup, tetapi cuba pilih barang yang lebih diperlukan.</div>}
            {isValid && hasKeperluan && <div className="feedback-box feedback-success"><CheckCircle size={16}/> Pilihan bijak! Wang cukup dan barang sesuai.</div>}
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            <button className="primaryBtn" disabled={!isValid || isOnlyKehendak} onClick={() => setPage('challenge1')}>
              Confirm <ArrowRight />
            </button>
            <button className="miniBtn" onClick={() => speak("Pilih barang keperluan. Pastikan wang cukup.", soundOn)}>
              <Volume2 />
            </button>
          </div>
        </Panel>
      </div>
    </main>
  );
};

const Challenge1Scene = ({ setPage, soundOn }) => {
  const [selected, setSelected] = useState(null);
  const correct = selected !== null && challenge1.options[selected].correct;

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Cabaran 1: Cukup atau Tidak?</h2>
        <div className="flicker" style={{ fontSize: '1.5rem', margin: '30px 0' }}>{challenge1.question}</div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {challenge1.options.map((opt, i) => (
            <button
              key={i}
              className={`primaryBtn ${selected === i ? 'selected' : ''}`}
              onClick={() => setSelected(i)}
              style={{ flex: 1, border: selected === i ? '2px solid var(--neon-cyan)' : '' }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className={`feedback-box ${correct ? 'feedback-success' : 'feedback-error'}`}>
            {challenge1.options[selected].feedback}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" disabled={!correct} onClick={() => setPage('challenge2')}>
            Misi Seterusnya <ArrowRight />
          </button>
          <button className="miniBtn" onClick={() => speak(challenge1.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </Panel>
    </main>
  );
};

// --- SCENES 7-12 ---

const Challenge2Scene = ({ setPage, soundOn, progress, setProgress }) => {
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState(progress.reason1 || "");

  const handleNext = () => {
    setProgress({ ...progress, reason1: reason });
    setPage('radar');
  };

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Cabaran 2: Pilihan Agen Bijak</h2>
        <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>{challenge2.question}</p>

        <div className="grid-3" style={{ marginBottom: '30px' }}>
          {challenge2.options.map((opt, i) => (
            <div
              key={opt.id}
              className={`money-card ${selected === i ? 'selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div style={{ fontWeight: 'bold' }}>Opsyen {opt.id}</div>
              <div style={{ fontSize: '0.9rem', margin: '10px 0' }}>{opt.label}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--electric-blue)' }}>{opt.description}</div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div style={{ marginTop: '20px' }}>
            <p>Saya pilih <span className="neon-text">{challenge2.options[selected].label}</span> kerana:</p>
            <textarea
              className="panel"
              style={{ width: '100%', minHeight: '80px', color: 'white', fontFamily: 'inherit', padding: '15px' }}
              placeholder={`Saya pilih ${challenge2.options[selected].label} kerana...`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" disabled={selected === null || !reason} onClick={handleNext}>
            Hantar <ArrowRight />
          </button>
          <button className="miniBtn" onClick={() => speak(challenge2.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </Panel>
    </main>
  );
};

const RadarScene = ({ setPage, soundOn, addBadge, progress, setProgress }) => {
  const basketItems = progress.items.length > 0 ? progress.items : ['water', 'bread'];
  const [activeIdx, setActiveIdx] = useState(0);
  const [reason, setReason] = useState(progress.reason2 || "");
  const currentItem = items.find(i => i.id === basketItems[activeIdx]);

  useEffect(() => {
    addBadge('Lencana Carta Bijak');
  }, []);

  const handleNext = () => {
    setProgress({ ...progress, reason2: reason });
    setPage('challenge3');
  };

  return (
    <main className="screen">
      <div className="grid-2">
        <Panel>
          <h2 className="neon-text">Carta Radar Bijak</h2>
          <p>Penilaian Holografik Barang</p>
          <div className="grid-2" style={{ gap: '10px', marginTop: '20px' }}>
            {basketItems.map((id, i) => (
              <button key={id} className={`money-card ${activeIdx === i ? 'selected' : ''}`} onClick={() => setActiveIdx(i)}>
                {items.find(x => x.id === id).name}
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <div style={{ textAlign: 'center' }}>
            {Icons[currentItem.type]()}
            <h3 className="neon-text">{currentItem.name}</h3>
          </div>

          <div style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Harga Sesuai</span>
              <div className="star-bar">
                {[1,2,3].map(v => <div key={v} className={`star ${v > (currentItem.price <= 2 ? 3 : currentItem.price <= 4 ? 2 : 1) ? 'empty' : ''}`} />)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Diperlukan</span>
              <div className="star-bar">
                {[1,2,3].map(v => <div key={v} className={`star ${v > currentItem.need ? 'empty' : ''}`} />)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Baik untuk Diri</span>
              <div className="star-bar">
                {[1,2,3].map(v => <div key={v} className={`star ${v > currentItem.good ? 'empty' : ''}`} />)}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '0.8rem' }}>Adakah ini pilihan bijak? Mengapa?</p>
            <textarea
              className="panel"
              style={{ width: '100%', minHeight: '60px', color: 'white', fontFamily: 'inherit', padding: '10px', fontSize: '0.9rem' }}
              placeholder={`Saya pilih ${currentItem.name} kerana...`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <button className="primaryBtn" style={{ width: '100%' }} onClick={handleNext}>
              Seterusnya <ArrowRight />
            </button>
          </div>
        </Panel>
      </div>
    </main>
  );
};

const Challenge3Scene = ({ setPage, soundOn }) => {
  const [selected, setSelected] = useState(null);
  const correct = selected !== null && challenge3.options[selected].correct;

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Cabaran 3: Kira Baki Agen</h2>
        <div style={{ fontSize: '1.5rem', margin: '30px 0' }}>{challenge3.question}</div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {challenge3.options.map((opt, i) => (
            <button
              key={i}
              className={`primaryBtn ${selected === i ? 'selected' : ''}`}
              onClick={() => setSelected(i)}
              style={{ flex: 1 }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className={`feedback-box ${correct ? 'feedback-success' : 'feedback-error'}`}>
            {challenge3.options[selected].feedback}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="primaryBtn" disabled={!correct} onClick={() => setPage('reflection')}>
            Selesaikan Misi <ArrowRight />
          </button>
          <button className="miniBtn" onClick={() => speak(challenge3.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </Panel>
    </main>
  );
};

const ReflectionScene = ({ setPage, soundOn, progress, setProgress }) => {
  const [selected, setSelected] = useState(progress.reflection || null);
  const options = [
    { label: 'Saya faham', icon: 'faham', val: 'faham', msg: 'Hebat, agen! Teruskan belajar.' },
    { label: 'Saya hampir faham', icon: 'hampir', val: 'hampir', msg: 'Bagus! Latihan akan memahirkan anda.' },
    { label: 'Saya perlukan bantuan', icon: 'bantuan', val: 'bantuan', msg: 'Jangan risau, minta bantuan guru anda.' }
  ];

  const handleSelect = (val) => {
    setSelected(val);
    setProgress({ ...progress, reflection: val });
  };

  return (
    <main className="screen">
      <Panel>
        <h2 className="neon-text">Refleksi Agen</h2>
        <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>Saya boleh membeli barang dengan bijak.</p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {options.map(opt => (
            <button
              key={opt.val}
              className={`primaryBtn ${selected === opt.val ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.val)}
              style={{ justifyContent: 'flex-start', paddingLeft: '40px' }}
            >
              {Icons[opt.icon]()}
              <span style={{ marginLeft: '20px' }}>{opt.label}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="feedback-box feedback-success" style={{ marginTop: '20px' }}>
            {options.find(o => o.val === selected).msg}
          </div>
        )}

        <button className="primaryBtn" style={{ marginTop: '30px' }} disabled={!selected} onClick={() => setPage('summary')}>
          Tamat Misi <ArrowRight />
        </button>
      </Panel>
    </main>
  );
};

const SummaryScene = ({ setPage, progress, resetProgress, soundOn }) => {
  return (
    <main className="screen">
      <Panel style={{ textAlign: 'center' }}>
        <h1 className="neon-text flicker">MISI BERJAYA!</h1>
        <AgentBijak size="large" />
        <h2 style={{ color: 'var(--agent-gold)' }}>AGEN BIJAK: {progress.badges.length > 0 ? 'CERTIFIED' : 'TRAINEE'}</h2>

        <div style={{ margin: '30px 0' }}>
          <p>Sebelum membeli barang, kita perlu melihat wang, melihat harga, memilih barang yang sesuai, dan mengira baki. Agen yang bijak akan berbelanja mengikut keperluan.</p>
        </div>

        <div className="badge-grid" style={{ justifyContent: 'center', marginBottom: '40px' }}>
          {progress.badges.map(b => (
            <div key={b} className="badge-item">
              <div className="badge-icon">
                {b.includes('Wang') && <Shield color="var(--agent-gold)" />}
                {b.includes('Peta Alir') && <ShoppingCart color="var(--agent-gold)" />}
                {b.includes('Pembeli') && <Target color="var(--agent-gold)" />}
                {b.includes('Carta') && <BarChart color="var(--agent-gold)" />}
              </div>
              <small style={{ fontSize: '0.6rem' }}>{b}</small>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="primaryBtn" onClick={() => window.print()}>
            Simpan Sijil
          </button>
          <button className="miniBtn" onClick={resetProgress}>
            <RefreshCcw /> Misi Baharu
          </button>
        </div>
      </Panel>
    </main>
  );
};

const TeacherPanel = ({ setPage }) => (
  <main className="screen">
    <Panel>
      <h2 className="neon-text">Pusat Kawalan Guru</h2>
      <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
        <h3 style={{ color: 'var(--neon-cyan)' }}>Rasional Pedagogi</h3>
        <p><strong>MBPK Masalah Pembelajaran:</strong> Visual support, scaffolded steps, no time pressure.</p>
        <p><strong>Thinking Tools:</strong> Peta Alir (Sequencing), Carta Radar (Comparison), KBAT (Reasoning).</p>
        <p><strong>KPPB:</strong> Communication, Critical Thinking, Character.</p>
        <p><strong>Ethics:</strong> No data collection, original assets.</p>
      </div>
      <button className="primaryBtn" onClick={() => setPage('home')} style={{ marginTop: '30px' }}>
        <Home /> Kembali
      </button>
    </Panel>
  </main>
);

// --- MAIN APP ---

function App() {
  const [progress, setProgress] = useState(loadProgress());
  const [page, setPage] = useState(progress.scene || 'home');
  const [soundOn, setSoundOn] = useState(true);
  const [textLarge, setTextLarge] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    saveProgress({ ...progress, scene: page });
  }, [page, progress]);

  const addBadge = (badge) => {
    if (!progress.badges.includes(badge)) {
      setProgress({ ...progress, badges: [...progress.badges, badge] });
    }
  };

  const resetProgress = () => {
    if (window.confirm("Set semula semua misi?")) {
      const init = { badges: [], scene: 'home', items: [], reason1: '', reason2: '', reflection: '' };
      setProgress(init);
      setPage('home');
    }
  };

  const shellClass = [
    'appShell',
    textLarge ? 'text-large' : '',
    highContrast ? 'high-contrast' : '',
    reduceMotion ? 'reduce-motion' : ''
  ].join(' ');

  return (
    <div className={shellClass}>
      <header className="topbar">
        <div className="brand" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <div style={{ width: '40px', height: '40px', border: '2px solid var(--neon-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AgentBijak size="small" badge={false} />
          </div>
          <div>
            <h1>Akademi Agen RM5</h1>
            <small>Unit Operasi Kedai Mini</small>
          </div>
        </div>
        <div className="tools">
          <button className="miniBtn" onClick={() => setSoundOn(!soundOn)} title="Toggle Sound">
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />} Audio
          </button>
          <button className="miniBtn" onClick={() => setTextLarge(!textLarge)}>Teks</button>
          <button className="miniBtn" onClick={() => setHighContrast(!highContrast)}>Kontras</button>
          <button className="miniBtn" onClick={() => setReduceMotion(!reduceMotion)}>Gerak</button>
          <button className="miniBtn" onClick={resetProgress}><RefreshCcw size={16}/></button>
        </div>
      </header>

      {page === 'home' && <TitleScreen setPage={setPage} soundOn={soundOn} />}
      {page === 'briefing' && <BriefingScene setPage={setPage} soundOn={soundOn} />}
      {page === 'money' && <MoneyScene setPage={setPage} soundOn={soundOn} addBadge={addBadge} />}
      {page === 'flow' && <FlowScene setPage={setPage} soundOn={soundOn} addBadge={addBadge} />}
      {page === 'shop' && <ShopScene setPage={setPage} soundOn={soundOn} addBadge={addBadge} progress={progress} setProgress={setProgress} />}
      {page === 'challenge1' && <Challenge1Scene setPage={setPage} soundOn={soundOn} />}
      {page === 'challenge2' && <Challenge2Scene setPage={setPage} soundOn={soundOn} progress={progress} setProgress={setProgress} />}
      {page === 'radar' && <RadarScene setPage={setPage} soundOn={soundOn} addBadge={addBadge} progress={progress} setProgress={setProgress} />}
      {page === 'challenge3' && <Challenge3Scene setPage={setPage} soundOn={soundOn} />}
      {page === 'reflection' && <ReflectionScene setPage={setPage} soundOn={soundOn} progress={progress} setProgress={setProgress} />}
      {page === 'summary' && <SummaryScene setPage={setPage} progress={progress} resetProgress={resetProgress} soundOn={soundOn} />}
      {page === 'teacher' && <TeacherPanel setPage={setPage} />}

      <footer>
        &copy; 2025 Akademi Agen RM5 | Protokol Belanja Bijak MBPK Masalah Pembelajaran
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
