import { useEffect, useState } from "react";
import {
  MIN_LETTERS,
  MAX_LETTERS,
  shuffledAlphabet,
  buildRows,
  buildSecondLetters,
  readName,
} from "./game";

const STEP_LABELS = ["Mulai", "Jumlah Huruf", "Ronde 1", "Ronde 2", "Hasil"];

function StepDots({ current }) {
  return (
    <ol className="step-dots" aria-label="Progres permainan">
      {STEP_LABELS.map((label, i) => (
        <li
          key={label}
          className={i === current ? "active" : i < current ? "done" : ""}
          aria-current={i === current ? "step" : undefined}
        >
          <span className="dot">{i < current ? "✓" : i + 1}</span>
          <span className="dot-label">{label}</span>
        </li>
      ))}
    </ol>
  );
}

function Stars() {
  const symbols = ["✦", "✧", "★", "✶", "✷", "✦", "✧", "✩", "✦", "✧", "★", "✶"];
  return (
    <div className="stars" aria-hidden="true">
      {symbols.map((s, i) => (
        <span key={i} className={`star star-${i + 1}`}>{s}</span>
      ))}
    </div>
  );
}

function LetterGrid({ rows, onPick, disabled }) {
  const [hoverCol, setHoverCol] = useState(null);
  const cols = rows[0]?.length ?? 0;

  const colClass = (j) =>
    hoverCol === j && !disabled ? " col-hover" : "";

  return (
    <div className="grid-wrap" onMouseLeave={() => setHoverCol(null)}>
      <table className="letter-grid">
        <thead>
          <tr>
            {Array.from({ length: cols }, (_, j) => (
              <th key={j} className={colClass(j)}>
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={`Pilih kolom ${j + 1}`}
                  onClick={() => onPick(j)}
                  onMouseEnter={() => setHoverCol(j)}
                  onFocus={() => setHoverCol(j)}
                >
                  {j + 1}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((letter, j) => (
                <td
                  key={j}
                  className={colClass(j) + (letter ? "" : " blank")}
                  onClick={() => !disabled && onPick(j)}
                  onMouseEnter={() => setHoverCol(j)}
                >
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Round({ round, rows, count, selections, onSelect, onUndo, onDone, doneLabel }) {
  const current = selections.length;
  const complete = current >= count;

  return (
    <section className="card">
      <p className="round-tag">Ronde {round} dari 2</p>
      <h2>
        {complete
          ? "Semua huruf tercatat ✨"
          : <>Huruf ke-<span className="hl">{current + 1}</span> ada di kolom mana?</>}
      </h2>
      <p className="muted">
        {complete
          ? round === 1
            ? "Bagus. Sekarang aku acak ulang hurufnya — jangan kaget."
            : "Aku sudah merasakan sesuatu… siap dengar jawabannya?"
          : "Cari hurufnya di tabel, lalu klik nomor kolomnya (atau klik sel mana pun di kolom itu)."}
      </p>

      <div className="letter-chips" aria-label="Huruf yang sudah tercatat">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={
              "chip" +
              (i < current ? " chip-done" : i === current ? " chip-current" : "")
            }
          >
            {i < current ? `K${selections[i] + 1}` : i + 1}
          </span>
        ))}
      </div>

      <LetterGrid rows={rows} onPick={onSelect} disabled={complete} />

      <div className="actions">
        {current > 0 && (
          <button className="btn btn-ghost" onClick={onUndo}>
            ↩ Ulangi huruf sebelumnya
          </button>
        )}
        {complete && (
          <button className="btn btn-primary" onClick={onDone}>
            {doneLabel}
          </button>
        )}
      </div>
    </section>
  );
}

function Reveal({ name, onReplay }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShown(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="card reveal">
      {!shown && (
        <>
          <div className="ball thinking" aria-hidden="true">🔮</div>
          <h2 className="pulse-text">Membaca pikiranmu…</h2>
          <p className="muted">Konsentrasi… jangan pikirkan nama lain!</p>
        </>
      )}
      {shown && (
        <>
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <i key={i} className={`c c-${i + 1}`} />
            ))}
          </div>
          <div className="ball" aria-hidden="true">🔮</div>
          <h2>Aku tahu! Nama yang kamu pikirkan adalah…</h2>
          <p className="result" aria-label={`Nama tebakan: ${name}`}>
            {name.split("").map((letter, i) => (
              <span key={i} className="result-letter" style={{ animationDelay: `${i * 0.18}s` }}>
                {letter}
              </span>
            ))}
          </p>
          <p className="muted">Benar, kan? Sulap tidak pernah bohong. 😉</p>
          <div className="actions center">
            <button className="btn btn-primary" onClick={onReplay}>
              🎩 Main Lagi
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default function App() {
  const [step, setStep] = useState(0); // matches STEP_LABELS index
  const [shuffled, setShuffled] = useState(shuffledAlphabet);
  const [nameLength, setNameLength] = useState(null);
  const [sel1, setSel1] = useState([]);
  const [sel2, setSel2] = useState([]);

  const cols1 = nameLength ?? 1;
  const rows1 = buildRows(shuffled, cols1);
  const cols2 = rows1.length;
  const second =
    nameLength && sel1.length === nameLength
      ? buildSecondLetters(shuffled, sel1, cols1)
      : [];
  const rows2 = second.length ? buildRows(second, cols2) : [];

  const replay = () => {
    setShuffled(shuffledAlphabet());
    setNameLength(null);
    setSel1([]);
    setSel2([]);
    setStep(0);
  };

  return (
    <div className="stage">
      <Stars />
      <header className="hero">
        <span className="hero-hat" aria-hidden="true">🎩</span>
        <h1>The Mind Reader</h1>
        <p className="tagline">Permainan tebak nama — aku baca pikiranmu lewat dua tabel ajaib</p>
      </header>

      <StepDots current={step} />

      <main className="board">
        {step === 0 && (
          <section className="card intro">
            <div className="ball float" aria-hidden="true">🔮</div>
            <h2>Berani uji kekuatan sihirku?</h2>
            <p>
              Pikirkan <b>satu nama panggilan</b> — namamu, temanmu, siapa pun
              ({MIN_LETTERS}–{MAX_LETTERS} huruf). Simpan di kepalamu,
              jangan beri tahu siapa-siapa. Aku yang akan menebaknya.
            </p>
            <div className="actions center">
              <button className="btn btn-primary btn-big" onClick={() => setStep(1)}>
                ✨ Sudah, aku punya nama
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="card">
            <h2>Berapa huruf nama itu?</h2>
            <p className="muted">
              Hitung dalam hati, lalu pilih. Contoh: BUDI = 4 huruf.
            </p>
            <div className="length-picker">
              {Array.from(
                { length: MAX_LETTERS - MIN_LETTERS + 1 },
                (_, i) => MIN_LETTERS + i
              ).map((n) => (
                <button
                  key={n}
                  className={"num" + (nameLength === n ? " selected" : "")}
                  onClick={() => setNameLength(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="actions center">
              <button
                className="btn btn-primary"
                disabled={!nameLength}
                onClick={() => setStep(2)}
              >
                Lanjut ke Ronde 1 →
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <Round
            round={1}
            rows={rows1}
            count={nameLength}
            selections={sel1}
            onSelect={(col) =>
              sel1.length < nameLength && setSel1([...sel1, col])
            }
            onUndo={() => setSel1(sel1.slice(0, -1))}
            onDone={() => setStep(3)}
            doneLabel="Acak ulang hurufnya 🌀"
          />
        )}

        {step === 3 && (
          <Round
            round={2}
            rows={rows2}
            count={nameLength}
            selections={sel2}
            onSelect={(col) =>
              sel2.length < nameLength && setSel2([...sel2, col])
            }
            onUndo={() => setSel2(sel2.slice(0, -1))}
            onDone={() => setStep(4)}
            doneLabel="🔮 Baca pikiranku!"
          />
        )}

        {step === 4 && (
          <Reveal name={readName(second, sel2, cols2)} onReplay={replay} />
        )}
      </main>

      <footer className="footer">
        <p>
          Dibuat dengan <span aria-hidden="true">🪄</span> oleh{" "}
          <a href="https://muhardiansyah15.github.io/" target="_blank" rel="noopener noreferrer">
            Muhardiansyah
          </a>
        </p>
        <ul className="footer-social">
          <li><a href="https://github.com/muhardiansyah15" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/muhardiansyah15/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://www.instagram.com/muhardiansyah1597" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </footer>
    </div>
  );
}
