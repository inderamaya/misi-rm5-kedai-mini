import React, { useEffect, useState, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Volume2, VolumeX, RefreshCcw, Home, ArrowRight, CheckCircle,
  AlertTriangle, Settings, Heart, Star, BookOpen, Trash2,
  Package, ShoppingBasket, Trophy, Info
} from 'lucide-react';
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
    return JSON.parse(localStorage.getItem('dunia-rm5-progress')) || {
      badges: [],
      scene: 'home',
      basket: [],
      bonusCoins: 0,
      reason1: '',
      reason2: '',
      reflection: '',
      unlockedScenes: ['home']
    };
  } catch {
    return {
      badges: [],
      scene: 'home',
      basket: [],
      bonusCoins: 0,
      reason1: '',
      reason2: '',
      reflection: '',
      unlockedScenes: ['home']
    };
  }
}

function saveProgress(progress) {
  localStorage.setItem('dunia-rm5-progress', JSON.stringify(progress));
}

// --- SHARED COMPONENTS ---

const DidiDuit = ({ bouncing = true, size = "normal", className = "" }) => (
  <div className={`didi-duit ${bouncing ? 'bouncing' : ''} ${className}`} style={{ transform: `scale(${size === 'small' ? 0.6 : size === 'large' ? 1.5 : 1})` }}>
    <div className="didi-eye left"></div>
    <div className="didi-eye right"></div>
    <div className="didi-smile"></div>
  </div>
);

const WorldBackground = () => (
  <div className="world-bg">
    <div className="cloud" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
    <div className="cloud" style={{ top: '25%', left: '40%', animationDelay: '-5s' }}></div>
    <div className="cloud" style={{ top: '15%', left: '70%', animationDelay: '-12s' }}></div>

    <div className="hill" style={{ width: '300px', height: '150px', left: '-50px', bottom: '60px', opacity: 0.8 }}></div>
    <div className="hill" style={{ width: '400px', height: '200px', right: '-100px', bottom: '60px', opacity: 0.6 }}></div>

    <div className="ground">
      <div className="ground-grass"></div>
    </div>
  </div>
);

const CoinShower = ({ active }) => {
  if (!active) return null;
  return (
    <div className="coin-shower">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="falling-coin"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const BonusCoin = ({ onCollect }) => {
  const [visible, setVisible] = useState(true);
  const [pos] = useState({ top: `${20 + Math.random() * 40}%`, left: `${10 + Math.random() * 80}%` });

  if (!visible) return null;

  return (
    <div
      className="coin-block bouncing"
      style={{ position: 'absolute', ...pos, cursor: 'pointer', zIndex: 50 }}
      onClick={() => { setVisible(false); onCollect(); }}
    >
      $
    </div>
  );
};

// --- SCENES ---

const TitleScreen = ({ setPage, soundOn, bonusCoins }) => {
  const text = "Selamat datang ke Dunia Syiling RM5! Mari belajar berbelanja dengan bijak.";
  return (
    <div className="screen">
      <div className="wooden-board" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', margin: '0 0 10px' }}>Dunia Syiling RM5</h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--brick-orange)', fontWeight: 'bold' }}>Misi Kedai Mini: Pilih, Kira, Bayar!</p>

        <div style={{ margin: '40px 0' }}>
          <DidiDuit size="large" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <button className="game-btn primary" onClick={() => setPage('briefing')}>
            Mulakan Misi <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak(text, soundOn)}>
            <Volume2 /> Dengar Arahan
          </button>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div className="coin-block" style={{ width: '30px', height: '30px', fontSize: '1rem' }}>$</div>
            <span>{bonusCoins}</span>
          </div>
          <button onClick={() => setPage('teacher')} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Panduan Guru
          </button>
        </div>
      </div>
    </div>
  );
};

const BriefingScene = ({ setPage, soundOn }) => {
  const text = "Misi kamu: Kamu ada RM5. Pilih barang yang sesuai di Kedai Mini. Pastikan wang cukup dan kira baki dengan betul.";
  return (
    <div className="screen">
      <div className="brick-panel">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem' }}>Arahan Misi</h2>
        <div className="wooden-board" style={{ color: 'var(--text-dark)', marginTop: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.4rem', lineHeight: '2' }}>
            <li>💰 Kamu ada <strong>RM5</strong>.</li>
            <li>🛒 Pilih barang yang <strong>diperlukan</strong>.</li>
            <li>📊 Pastikan wang kamu <strong>cukup</strong>.</li>
            <li>🔢 Kira <strong>baki wang</strong> kamu.</li>
            <li>🌟 Buat pilihan yang <strong>bijak</strong>!</li>
          </ul>
        </div>
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className="game-btn" style={{ background: 'var(--grass-green)', color: 'white' }} onClick={() => setPage('money')}>
            Faham! Seterusnya
          </button>
          <button className="game-btn secondary" onClick={() => speak(text, soundOn)}>
            <Volume2 /> Dengar
          </button>
        </div>
      </div>
    </div>
  );
};

const MoneyScene = ({ setPage, soundOn, addBadge, triggerCoinShower }) => {
  const [selected, setSelected] = useState(null);
  const isCorrect = selected === 'rm5';

  const handleSelect = (id) => {
    setSelected(id);
    if (id === 'rm5') {
      addBadge('Lencana Wang');
      triggerCoinShower();
    }
  };

  return (
    <div className="screen">
      <div className="wooden-board" style={{ width: '100%', maxWidth: '800px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Misi 1: Kenali RM5</h2>
        <p style={{ fontSize: '1.4rem' }}>Klik pada wang yang bernilai <strong>RM5</strong>.</p>

        <div className="game-grid" style={{ margin: '30px 0' }}>
          {moneyChoices.map(m => (
            <div
              key={m.id}
              className={`item-card ${selected === m.id ? 'selected' : ''}`}
              onClick={() => handleSelect(m.id)}
            >
              <div className="coin-block" style={{ margin: '0 auto 10px', width: '80px', height: '80px', borderRadius: m.type.includes('note') ? '4px' : '50%' }}>
                {m.label}
              </div>
              <div style={{ fontWeight: 'bold' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {selected && (
          <div className={`wooden-board ${isCorrect ? '' : 'shake'}`} style={{ background: isCorrect ? 'var(--grass-green)' : 'var(--alert-red)', color: 'white', marginBottom: '20px', padding: '15px' }}>
            {isCorrect ? 'Hebat! Kamu sudah bersedia dengan RM5.' : 'Cuba lagi. Cari wang yang tertulis RM5.'}
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px' }}>
          <button className={`game-btn primary ${!isCorrect ? 'disabled' : ''}`} disabled={!isCorrect} onClick={() => setPage('flow')}>
            Teruskan <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak("Klik wang yang bernilai RM5.", soundOn)}>
            <Volume2 />
          </button>
        </div>
      </div>
    </div>
  );
};

const FlowScene = ({ setPage, soundOn, addBadge }) => {
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setShuffledSteps([...flowSteps].sort(() => Math.random() - 0.5));
  }, []);

  const handleStepClick = (step) => {
    if (step.id === correctCount + 1) {
      setCorrectCount(prev => prev + 1);
      setFeedback("Betul!");
      if (step.id === flowSteps.length) {
        addBadge('Lencana Peta Alir');
      }
    } else {
      setFeedback(`Langkah ini sepatutnya selepas langkah ${correctCount}.`);
    }
  };

  return (
    <div className="screen">
      <div className="brick-panel" style={{ maxWidth: '900px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Misi 2: Susun Langkah Bijak</h2>
        <p>Klik langkah-langkah di bawah mengikut urutan yang betul.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', margin: '30px 0', justifyContent: 'center' }}>
          {flowSteps.slice(0, correctCount).map(step => (
            <div key={step.id} className="flow-block correct">
              {step.id}. {step.title}
            </div>
          ))}
        </div>

        {correctCount < flowSteps.length && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '20px', borderRadius: '8px' }}>
            {shuffledSteps.filter(s => s.id > correctCount).map(step => (
              <button key={step.id} className="game-btn" onClick={() => handleStepClick(step)}>
                {step.title}
              </button>
            ))}
          </div>
        )}

        {feedback && (
          <div style={{ textAlign: 'center', margin: '15px 0', fontWeight: 'bold' }}>{feedback}</div>
        )}

        {correctCount === flowSteps.length && (
          <div style={{ textAlign: 'center' }}>
            <div className="flagpole-container" style={{ margin: '20px auto' }}>
              <div className="flag" style={{ bottom: '160px', background: 'var(--coin-yellow)' }}></div>
            </div>
            <p>Sempurna! Kamu sudah tahu cara berbelanja.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <button className={`game-btn primary ${correctCount < flowSteps.length ? 'disabled' : ''}`} disabled={correctCount < flowSteps.length} onClick={() => setPage('shop')}>
            Ke Kedai Mini <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak("Susun langkah berbelanja mengikut urutan.", soundOn)}>
            <Volume2 />
          </button>
        </div>
      </div>
    </div>
  );
};

const ShopScene = ({ setPage, soundOn, addBadge, progress, setProgress }) => {
  const [basket, setBasket] = useState(progress.basket || []);
  const total = basket.reduce((sum, id) => sum + (items.find(i => i.id === id)?.price || 0), 0);
  const balance = BUDGET - total;

  const hasKeperluan = basket.some(id => items.find(i => i.id === id)?.category === 'KEPERLUAN');
  const isTooExpensive = total > BUDGET;
  const isOnlyKehendak = basket.length > 0 && !hasKeperluan;
  const isValid = basket.length > 0 && !isTooExpensive;

  const addItem = (id) => {
    if (basket.includes(id)) {
      setBasket(basket.filter(x => x !== id));
    } else {
      setBasket([...basket, id]);
    }
  };

  const handleConfirm = () => {
    setProgress({ ...progress, basket });
    if (isValid && hasKeperluan) addBadge('Lencana Pembeli Bijak');
    setPage('challenge1');
  };

  return (
    <div className="screen" style={{ flexDirection: 'row', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div className="wooden-board" style={{ flex: '1', minWidth: '300px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Misi 3: Kedai Mini Didi</h2>
        <div className="game-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {items.map(item => (
            <div
              key={item.id}
              className={`item-card ${basket.includes(item.id) ? 'selected' : ''}`}
              onClick={() => addItem(item.id)}
            >
              <div style={{ fontSize: '2rem' }}>
                {item.type === 'water' && '💧'}
                {item.type === 'bread' && '🍞'}
                {item.type === 'banana' && '🍌'}
                {item.type === 'milk' && '🥛'}
                {item.type === 'book' && '📚'}
                {item.type === 'toy' && '🧸'}
              </div>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ color: 'var(--brick-orange)', fontWeight: 'bold' }}>RM{item.price}</div>
              <div style={{ fontSize: '0.7rem', color: item.category === 'KEPERLUAN' ? 'var(--grass-green)' : 'var(--alert-red)' }}>
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="brick-panel" style={{ flex: '0.8', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)' }}>Bakul Saya</h3>

        <div className="shopping-basket" style={{ margin: '10px auto', display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '15px', alignContent: 'start' }}>
          {basket.map(id => (
            <div key={id} style={{ background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black', fontSize: '0.8rem' }}>
              {id.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>

        <div className="wooden-board" style={{ color: 'black', padding: '15px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Bajet:</span> <span style={{ fontWeight: 'bold' }}>RM{BUDGET}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Jumlah:</span> <span style={{ fontWeight: 'bold', color: isTooExpensive ? 'red' : 'inherit' }}>RM{total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid black', paddingTop: '5px' }}>
            <span>Baki:</span> <span style={{ fontWeight: 'bold' }}>RM{balance}</span>
          </div>
        </div>

        <div style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          {isTooExpensive && <div style={{ color: 'yellow' }}>⚠️ Wang tidak cukup! Pilih semula.</div>}
          {isOnlyKehendak && <div style={{ color: 'white' }}>💡 Cuba pilih barang keperluan.</div>}
          {isValid && hasKeperluan && <div style={{ color: 'white' }}>✅ Pilihan bijak! Wang cukup.</div>}
        </div>

        <button className={`game-btn primary ${!isValid || isOnlyKehendak ? 'disabled' : ''}`} style={{ marginTop: 'auto' }} disabled={!isValid || isOnlyKehendak} onClick={handleConfirm}>
          Bayar Sekarang <ArrowRight />
        </button>
      </div>
    </div>
  );
};

const Challenge1Scene = ({ setPage, soundOn, triggerCoinShower }) => {
  const [selected, setSelected] = useState(null);
  const correct = selected !== null && challenge1.options[selected].correct;

  const handleSelect = (idx) => {
    setSelected(idx);
    if (challenge1.options[idx].correct) triggerCoinShower();
  };

  return (
    <div className="screen">
      <div className="wooden-board" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Cabaran 1: Cukupkah Wang?</h2>
        <p style={{ fontSize: '1.6rem', margin: '30px 0' }}>{challenge1.question}</p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {challenge1.options.map((opt, i) => (
            <button key={i} className={`game-btn ${selected === i ? 'primary' : ''}`} onClick={() => handleSelect(i)} style={{ padding: '20px 40px' }}>
              {opt.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="wooden-board" style={{ marginTop: '30px', background: correct ? 'var(--grass-green)' : 'var(--alert-red)', color: 'white' }}>
            {challenge1.options[selected].feedback}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className={`game-btn primary ${!correct ? 'disabled' : ''}`} disabled={!correct} onClick={() => setPage('challenge2')}>
            Misi Seterusnya <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak(challenge1.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </div>
    </div>
  );
};

const Challenge2Scene = ({ setPage, soundOn, progress, setProgress }) => {
  const [selected, setSelected] = useState(null);
  const [reason, setReason] = useState(progress.reason1 || "");

  const handleNext = () => {
    setProgress({ ...progress, reason1: reason });
    setPage('radar');
  };

  return (
    <div className="screen">
      <div className="brick-panel" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Cabaran 2: Pilihan Bekal Bijak</h2>
        <p style={{ fontSize: '1.4rem' }}>{challenge2.question}</p>

        <div className="game-grid" style={{ margin: '20px 0' }}>
          {challenge2.options.map((opt, i) => (
            <div
              key={opt.id}
              className={`item-card ${selected === i ? 'selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Pilihan {opt.id}</div>
              <div>{opt.label}</div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div className="wooden-board" style={{ color: 'black' }}>
            <p><strong>Didi Duit:</strong> Kenapa kamu pilih ini?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {["Ia makanan sihat", "Saya memerlukannya", "Harganya murah", "Ia kegemaran saya"].map(r => (
                <button key={r} className={`game-btn ${reason === r ? 'primary' : ''}`} style={{ fontSize: '1rem', padding: '5px 15px' }} onClick={() => setReason(r)}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button className={`game-btn primary ${selected === null || !reason ? 'disabled' : ''}`} disabled={selected === null || !reason} onClick={handleNext}>
            Hantar Pilihan <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak(challenge2.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </div>
    </div>
  );
};

const RadarScene = ({ setPage, soundOn, addBadge, progress, setProgress }) => {
  const basketItems = progress.basket.length > 0 ? progress.basket : ['water', 'bread'];
  const [activeIdx, setActiveIdx] = useState(0);
  const currentItem = items.find(i => i.id === basketItems[activeIdx]);

  useEffect(() => {
    addBadge('Lencana Carta Bijak');
  }, []);

  return (
    <div className="screen">
      <div className="wooden-board" style={{ width: '100%', maxWidth: '900px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Carta Bijak: Nilai Barang</h2>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <p>Klik barang untuk lihat bintang:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {basketItems.map((id, i) => (
                <button key={id} className={`game-btn ${activeIdx === i ? 'primary' : ''}`} onClick={() => setActiveIdx(i)}>
                  {items.find(x => x.id === id).name}
                </button>
              ))}
            </div>
          </div>

          <div className="brick-panel" style={{ flex: '2', minWidth: '300px' }}>
            <h3 style={{ textAlign: 'center', borderBottom: '2px solid white', paddingBottom: '10px' }}>{currentItem.name}</h3>

            <div style={{ marginTop: '20px' }}>
              {[
                { label: 'Harga Sesuai', val: currentItem.price <= 2 ? 3 : currentItem.price <= 4 ? 2 : 1 },
                { label: 'Diperlukan', val: currentItem.need },
                { label: 'Baik untuk Diri', val: currentItem.good }
              ].map(cat => (
                <div key={cat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontSize: '1.2rem' }}>{cat.label}</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {[1, 2, 3].map(s => (
                      <Star key={s} fill={s <= cat.val ? 'var(--coin-yellow)' : 'none'} color="var(--coin-yellow)" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button className="game-btn primary" onClick={() => setPage('challenge3')}>
            Seterusnya: Kira Baki <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

const Challenge3Scene = ({ setPage, soundOn, triggerCoinShower }) => {
  const [selected, setSelected] = useState(null);
  const correct = selected !== null && challenge3.options[selected].correct;

  const handleSelect = (idx) => {
    setSelected(idx);
    if (challenge3.options[idx].correct) triggerCoinShower();
  };

  return (
    <div className="screen">
      <div className="wooden-board" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Cabaran 3: Kira Baki Wang</h2>
        <div style={{ background: 'var(--soft-cream)', padding: '20px', border: '2px dashed var(--brick-orange)', borderRadius: '8px', margin: '20px 0' }}>
          <p style={{ fontSize: '1.5rem', color: 'black' }}>{challenge3.question}</p>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {challenge3.options.map((opt, i) => (
            <button key={i} className={`game-btn ${selected === i ? 'primary' : ''}`} onClick={() => handleSelect(i)} style={{ padding: '20px' }}>
              {opt.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="wooden-board" style={{ marginTop: '30px', background: correct ? 'var(--grass-green)' : 'var(--alert-red)', color: 'white' }}>
            {challenge3.options[selected].feedback}
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className={`game-btn primary ${!correct ? 'disabled' : ''}`} disabled={!correct} onClick={() => setPage('reflection')}>
            Selesaikan Misi <ArrowRight />
          </button>
          <button className="game-btn secondary" onClick={() => speak(challenge3.question, soundOn)}>
            <Volume2 />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReflectionScene = ({ setPage, soundOn, progress, setProgress }) => {
  const [selected, setSelected] = useState(progress.reflection || null);

  const handleSelect = (val) => {
    setSelected(val);
    setProgress({ ...progress, reflection: val });
  };

  return (
    <div className="screen">
      <div className="wooden-board" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Refleksi Agen Didi</h2>
        <DidiDuit bouncing={false} />
        <p style={{ fontSize: '1.4rem', margin: '20px 0' }}>Bagaimana perasaan kamu hari ini?</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
          {[
            { val: 'faham', label: '😊 Saya faham', msg: 'Hebat! Kamu sudah pandai berbelanja.' },
            { val: 'hampir', label: '😐 Saya hampir faham', msg: 'Bagus! Latihan lagi akan buat kamu lebih hebat.' },
            { val: 'bantuan', label: '😟 Saya perlukan bantuan', msg: 'Jangan risau, mari kita belajar lagi bersama-sama.' }
          ].map(opt => (
            <button
              key={opt.val}
              className={`game-btn ${selected === opt.val ? 'primary' : ''}`}
              onClick={() => handleSelect(opt.val)}
              style={{ justifyContent: 'flex-start' }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selected && (
          <div className="wooden-board" style={{ marginTop: '20px', background: 'var(--sky-blue)', color: 'white' }}>
            {selected === 'faham' && 'Hebat! Kamu sudah pandai berbelanja.'}
            {selected === 'hampir' && 'Bagus! Latihan lagi akan buat kamu lebih hebat.'}
            {selected === 'bantuan' && 'Jangan risau, mari kita belajar lagi bersama-sama.'}
          </div>
        )}

        <button className={`game-btn primary ${!selected ? 'disabled' : ''}`} style={{ marginTop: '30px' }} disabled={!selected} onClick={() => setPage('summary')}>
          Tamat Misi <ArrowRight />
        </button>
      </div>
    </div>
  );
};

const SummaryScene = ({ setPage, progress, resetProgress, triggerCoinShower }) => {
  useEffect(() => {
    triggerCoinShower();
  }, []);

  return (
    <div className="screen">
      <div className="brick-panel" style={{ textAlign: 'center' }}>
        <div className="flagpole-container" style={{ margin: '0 auto 20px' }}>
          <div className="flag" style={{ bottom: '160px', background: 'red' }}></div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem' }}>MISI BERJAYA!</h1>
        <DidiDuit size="large" />

        <div style={{ margin: '30px 0' }}>
          <p style={{ fontSize: '1.2rem' }}>Tahniah! Kamu sudah belajar memilih barang, mengira wang, dan membuat keputusan bijak.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {progress.badges.map(b => (
            <div key={b} className="wooden-board" style={{ padding: '10px', color: 'black', minWidth: '120px' }}>
              <Trophy size={30} color="var(--coin-yellow)" style={{ margin: '0 auto 5px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{b}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="game-btn" style={{ background: 'var(--white)', color: 'black' }} onClick={() => window.print()}>
            Simpan Sijil
          </button>
          <button className="game-btn primary" onClick={resetProgress}>
            Misi Baru
          </button>
        </div>
      </div>
    </div>
  );
};

const TeacherPanel = ({ setPage }) => (
  <div className="screen">
    <div className="wooden-board" style={{ maxWidth: '800px', color: 'black' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)' }}>Panduan Guru</h2>
      <div style={{ fontSize: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
        <p><strong>Objektif:</strong> Mengajar murid MBPK cara menggunakan RM5 secara berkesan di kedai mini.</p>
        <p><strong>Elemen KPPB:</strong> Pemikiran Kritikal (memilih keperluan), Sahsiah (kejujuran dalam baki).</p>
        <p><strong>Thinking Tools:</strong> Peta Alir (urutan), Carta Bijak (penilaian).</p>
        <p><strong>Aksesibiliti:</strong> Butang besar, teks mudah, arahan audio, mod kontras tinggi.</p>
      </div>
      <button className="game-btn primary" onClick={() => setPage('home')} style={{ marginTop: '30px' }}>
        Kembali ke Utama
      </button>
    </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [progress, setProgress] = useState(loadProgress());
  const [page, setPage] = useState(progress.scene || 'home');
  const [soundOn, setSoundOn] = useState(true);
  const [textLarge, setTextLarge] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    saveProgress({ ...progress, scene: page });
  }, [page, progress]);

  const addBadge = (badge) => {
    if (!progress.badges.includes(badge)) {
      setProgress({ ...progress, badges: [...progress.badges, badge] });
    }
  };

  const triggerCoinShower = () => {
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 3000);
  };

  const collectBonus = () => {
    setProgress(prev => ({ ...prev, bonusCoins: prev.bonusCoins + 1 }));
  };

  const changePage = (nextPage) => {
    setIsWalking(true);
    speak("", soundOn); // Cancel current speech
    setTimeout(() => {
      setPage(nextPage);
      setIsWalking(false);
    }, 1000);
  };

  const resetProgress = () => {
    if (window.confirm("Mula semula misi?")) {
      const init = {
        badges: [],
        scene: 'home',
        basket: [],
        bonusCoins: 0,
        reason1: '',
        reason2: '',
        reflection: '',
        unlockedScenes: ['home']
      };
      setProgress(init);
      setPage('home');
    }
  };

  const shellClass = [
    'app-container',
    textLarge ? 'text-large' : '',
    highContrast ? 'high-contrast' : '',
    reduceMotion ? 'reduce-motion' : ''
  ].join(' ');

  return (
    <div className={shellClass}>
      <WorldBackground />
      <CoinShower active={showCoins} />

      {page !== 'home' && page !== 'summary' && (
        <nav className="top-nav">
          <div className="logo" onClick={() => changePage('home')} style={{ cursor: 'pointer' }}>
            <DidiDuit size="small" bouncing={false} />
            <span>Dunia Syiling RM5</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="game-btn secondary" style={{ padding: '5px 10px', fontSize: '1rem' }} onClick={() => setSoundOn(!soundOn)}>
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button className="game-btn secondary" style={{ padding: '5px 10px', fontSize: '1rem' }} onClick={() => setHighContrast(!highContrast)}>
              🌓
            </button>
            <button className="game-btn secondary" style={{ padding: '5px 10px', fontSize: '1rem' }} onClick={() => setTextLarge(!textLarge)}>
              A+
            </button>
            <button className="game-btn secondary" style={{ padding: '5px 10px', fontSize: '1rem' }} onClick={resetProgress}>
              <RefreshCcw size={20} />
            </button>
          </div>
        </nav>
      )}

      {isWalking ? (
        <div className="screen">
          <div className="walk-path">
            <DidiDuit className="walking" style={{ position: 'absolute', left: '10%', animation: 'walk 1s linear infinite' }} />
          </div>
          <style>{`
            @keyframes walk {
              0% { left: 0%; transform: rotate(-5deg); }
              50% { left: 50%; transform: rotate(5deg); }
              100% { left: 100%; transform: rotate(-5deg); }
            }
          `}</style>
        </div>
      ) : (
        <>
          {page === 'home' && <TitleScreen setPage={changePage} soundOn={soundOn} bonusCoins={progress.bonusCoins} />}
          {page === 'briefing' && <BriefingScene setPage={changePage} soundOn={soundOn} />}
          {page === 'money' && <MoneyScene setPage={changePage} soundOn={soundOn} addBadge={addBadge} triggerCoinShower={triggerCoinShower} />}
          {page === 'flow' && <FlowScene setPage={changePage} soundOn={soundOn} addBadge={addBadge} />}
          {page === 'shop' && <ShopScene setPage={changePage} soundOn={soundOn} addBadge={addBadge} progress={progress} setProgress={setProgress} />}
          {page === 'challenge1' && <Challenge1Scene setPage={changePage} soundOn={soundOn} triggerCoinShower={triggerCoinShower} />}
          {page === 'challenge2' && <Challenge2Scene setPage={changePage} soundOn={soundOn} progress={progress} setProgress={setProgress} />}
          {page === 'radar' && <RadarScene setPage={changePage} soundOn={soundOn} addBadge={addBadge} progress={progress} setProgress={setProgress} />}
          {page === 'challenge3' && <Challenge3Scene setPage={changePage} soundOn={soundOn} triggerCoinShower={triggerCoinShower} />}
          {page === 'reflection' && <ReflectionScene setPage={changePage} soundOn={soundOn} progress={progress} setProgress={setProgress} />}
          {page === 'summary' && <SummaryScene setPage={changePage} progress={progress} resetProgress={resetProgress} triggerCoinShower={triggerCoinShower} />}
          {page === 'teacher' && <TeacherPanel setPage={changePage} />}

          {page !== 'home' && page !== 'summary' && Math.random() > 0.7 && <BonusCoin onCollect={collectBonus} />}
        </>
      )}

      <footer style={{ position: 'fixed', bottom: 10, left: 10, fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
        &copy; 2025 Dunia Syiling RM5 | Misi Bijak MBPK
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
