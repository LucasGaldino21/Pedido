"use client";
import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Music2,
  Sparkles,
} from "lucide-react";

type Food = "Sushi" | "Pizza" | "Hambúrguer" | "Massas" | "Tacos" | "Sorvete";
type Vibe = "Cinema" | "Jantar" | "Parque" | "Natureza" | "Boliche" | "Noite";
const foods: { name: Food; icon: string }[] = [
  { name: "Sushi", icon: "🍣" },
  { name: "Pizza", icon: "🍕" },
  { name: "Hambúrguer", icon: "🍔" },
  { name: "Massas", icon: "🍝" },
  { name: "Tacos", icon: "🌮" },
  { name: "Sorvete", icon: "🍦" },
];
const vibes: { name: Vibe; icon: string }[] = [
  { name: "Cinema", icon: "🎬" },
  { name: "Jantar", icon: "🍽️" },
  { name: "Parque", icon: "🎢" },
  { name: "Natureza", icon: "🌲" },
  { name: "Boliche", icon: "🎳" },
  { name: "Noite", icon: "🌙" },
];
// Cole aqui o link do formulário, ex.: https://formspree.io/f/abc123
const FORMSPREE_URL = "https://formspree.io/f/mljjvpzw";
function Avatar({
  name,
  className = "avatar",
}: {
  name: string;
  className?: string;
}) {
  return (
    <Image
      className={className}
      src={`${process.env.NEXT_PUBLIC_BASE_PATH}/genmoji/${name}.png`}
      alt="Genmoji personalizado"
      width={240}
      height={240}
      priority
    />
  );
}
export default function Home() {
  const [step, setStep] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [food, setFood] = useState<Food>("Sushi");
  const [vibe, setVibe] = useState<Vibe>("Cinema");
  const [note, setNote] = useState("");
  const dodge = () => {
    setNoPos({
      x: Math.round((Math.random() - 0.5) * 230),
      y: Math.round((Math.random() - 0.5) * 150),
    });
  };
  const dateLabel = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR")
    : "A combinar";
  const finish = () => {
    setStep(3);
    if (!FORMSPREE_URL) return;
    // Uma falha no envio não pode atrapalhar a tela final.
    fetch(FORMSPREE_URL, {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: dateLabel,
        horario: time,
        comida: food,
        programa: vibe,
        detalhe: note,
      }),
    }).catch(() => {});
  };
  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <Heart size={15} fill="currentColor" />
          </span>{" "}
          <span className="brand-dot"></span>
        </div>
        <span className="top-note"></span>
      </header>
      <section className="card-wrap">
        <div className="progress">
          <span style={{ width: `${[25, 50, 75, 100][step]}%` }} />
        </div>
        {step === 0 && (
          <div className="screen intro">
            <div className="eyebrow">
              <Sparkles size={14} /> uma perguntinha especial
            </div>
            <Avatar name="carente" className="hero-avatar" />
            <p className="kicker">Gabi, desde que você chegou...</p>
            <h1>
              tem uma coisa
              <br />
              que eu quero te perguntar<span className="pink">.</span>
            </h1>
            <p className="subcopy">
              E dessa vez eu preparei algo um pouquinho diferente. 💙
            </p>
            <div className="question-box">
              <span className="tiny-label">A PERGUNTA É</span>
              <h2>Quer namorar comigo?</h2>
            </div>
            <div className="actions">
              <button className="btn btn-yes" onClick={() => setStep(1)}>
                SIM, EU ACEITO <Heart size={17} fill="currentColor" />
              </button>
              <button
                className="btn btn-no"
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                onMouseEnter={dodge}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodge();
                }}
                onClick={dodge}
              >
                não 🥺
              </button>
            </div>
            <p className="hint">ps: o botão “não” é meio tímido...</p>
          </div>
        )}
        {step === 1 && (
          <div className="screen celebrate">
            <div className="eyebrow">
              <Sparkles size={14} /> AAAAA!
            </div>
            <Avatar
              name="confiante"
              className="hero-avatar celebration-avatar"
            />
            <h1>
              Você disse <span className="pink">SIM ?</span>
            </h1>
            <p className="subcopy">Eu estava esperando você dizer não kkkkk</p>
            <div className="love-note">
              Prometo cuidar desse “sim” com muito carinho.
            </div>
            <button className="btn btn-yes full" onClick={() => setStep(2)}>
              AGORA VAMOS PLANEJAR O DATE <span>→</span>
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="screen planner">
            <div className="eyebrow">
              <CalendarDays size={14} /> nosso primeiro date
            </div>
            <Avatar name="apaixonado" className="small-avatar" />
            <h1>
              Vamos marcar
              <br />
              nosso date<span className="pink">?</span>
            </h1>
            <p className="subcopy">
              Escolhe com calma. O importante é ser com você.
            </p>
            <label className="field-label">
              {" "}
              <CalendarDays size={15} /> QUANDO VOCÊ TÁ LIVRE?
            </label>
            <input
              className="field"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
            <label className="field-label">
              <Clock3 size={15} /> E QUE HORAS?
            </label>
            <input
              className="field"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="choice-heading">O QUE VAMOS COMER?</div>
            <div className="choices">
              {foods.map((f) => (
                <button
                  key={f.name}
                  className={`choice ${food === f.name ? "selected" : ""}`}
                  onClick={() => setFood(f.name)}
                >
                  <span>{f.icon}</span>
                  {f.name}
                </button>
              ))}
            </div>
            <div className="choice-heading">QUAL É A VIBE?</div>
            <div className="choices">
              {vibes.map((v) => (
                <button
                  key={v.name}
                  className={`choice ${vibe === v.name ? "selected" : ""}`}
                  onClick={() => setVibe(v.name)}
                >
                  <span>{v.icon}</span>
                  {v.name}
                </button>
              ))}
            </div>
            <label className="field-label">ALGUM DETALHE? (OPCIONAL)</label>
            <input
              className="field"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Uma observação, um lugar..."
            />
            <button className="btn btn-yes full" onClick={finish}>
              FECHAR NOSSO COMBINADO <Heart size={16} fill="currentColor" />
            </button>
          </div>
        )}
        {step === 3 && (
          <div className="screen final-screen">
            <div className="eyebrow">
              <Heart size={14} fill="currentColor" /> combinado então!
            </div>
            <Avatar name="rindo" className="hero-avatar" />
            <h1>
              Tô contigo,
              <br />
              <span className="pink">meu amor.</span>
            </h1>
            <p className="subcopy">
              Já estou contando os minutos. Espero que não me dê um bolo dessa
              vez kkkkk
            </p>
            <div className="summary">
              <div>
                <CalendarDays />
                <span>
                  <small>DATA</small>
                  <b>{dateLabel}</b>
                </span>
              </div>
              <div>
                <Clock3 />
                <span>
                  <small>HORÁRIO</small>
                  <b>{time}</b>
                </span>
              </div>
              <div>
                <span className="summary-emoji">
                  {foods.find((f) => f.name === food)?.icon}
                </span>
                <span>
                  <small>COMIDA</small>
                  <b>{food}</b>
                </span>
              </div>
              <div>
                <MapPin />
                <span>
                  <small>PROGRAMA</small>
                  <b>{vibe}</b>
                </span>
              </div>
              {note && (
                <div>
                  <Music2 />
                  <span>
                    <small>DETALHE</small>
                    <b>{note}</b>
                  </span>
                </div>
              )}
            </div>
            <div className="final-sign">
              Com carinho, de alguém que gosta muito de você. <span>💙</span>
            </div>
            <button
              className="btn btn-ghost full"
              onClick={() => {
                setStep(0);
                setNoPos({ x: 0, y: 0 });
              }}
            >
              VER DE NOVO ↺
            </button>
          </div>
        )}
        <footer className="card-footer">
          <span>feito especialmente para Gabi</span>
          <span>✦</span>
          <span>com carinho, Lucas</span>
        </footer>
      </section>
      <div className="bottom-hearts" aria-hidden="true">
        ♡　✦　♡
      </div>
    </main>
  );
}
