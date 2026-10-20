import { useState } from "react";
import {
  Brain,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useReveal } from "../effects/useReveal";
import "./CuriousCorner.css";
const stroopRounds = [
  { word: "GREEN", ink: "Blue", hex: "#4a6c9d" },
  { word: "PURPLE", ink: "Red", hex: "#bf6d68" },
  { word: "ORANGE", ink: "Green", hex: "#6b8966" },
  { word: "BLUE", ink: "Purple", hex: "#9272a8" },
  { word: "RED", ink: "Orange", hex: "#c7834f" },
  { word: "YELLOW", ink: "Blue", hex: "#4a6c9d" },
];
const biases = [
  {
    number: "01",
    title: "Confirmation bias",
    question: "Do we look for evidence that proves us right?",
    answer:
      "Confirmation bias is the tendency to notice or favour information that supports what we already believe. A useful pause: “What evidence might change my mind?”",
  },
  {
    number: "02",
    title: "The spotlight effect",
    question: "Do other people notice every little thing we do?",
    answer:
      "We can overestimate how much other people notice our appearance or mistakes. Most people are also busy thinking about their own experiences.",
  },
  {
    number: "03",
    title: "Availability heuristic",
    question: "Does a memorable example feel more common?",
    answer:
      "Events that come easily to mind can feel more likely than they really are. Vivid stories can shape our judgement even when they are not representative.",
  },
];
export default function CuriousCorner() {
  const ref = useReveal<HTMLElement>();
  const [choice, setChoice] = useState("");
  const [answer, setAnswer] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [open, setOpen] = useState<string | null>("01");
  const round = stroopRounds[roundIndex];
  const refreshRound = () => {
    setRoundIndex((current) => (current + 1) % stroopRounds.length);
    setChoice("");
    setAnswer(false);
  };
  return (
    <section className="curious-section section-space" id="explore" ref={ref}>
      <div className="section-wrap">
        <div className="curious-heading reveal-item">
          <div>
            <div className="section-kicker">
              THE CURIOUS CORNER <span>✹</span>
            </div>
            <h2>
              Little discoveries.
              <br />
              <em>Big perspective shifts.</em>
            </h2>
          </div>
          <p>
            Psychology shows up in everyday life—in what we notice, what we
            remember, and the stories we tell ourselves. Here are a few ideas to
            try on.
          </p>
        </div>
        <div className="learning-grid">
          <article className="learning-card stroop-card reveal-card">
            <div className="card-topline">
              <span className="card-number">01 / TRY IT</span>
              <div className="stroop-card-actions">
                <button
                  type="button"
                  className="round-refresh"
                  onClick={refreshRound}
                  aria-label="Try a different colour round"
                  title="Try another colour"
                >
                  <RefreshCw size={14} />
                </button>
                <span className="card-icon">
                  <Brain size={19} />
                </span>
              </div>
            </div>
            <h3>
              Can you trust
              <br />
              your first instinct?
            </h3>
            <p>
              Choose the <strong>ink colour</strong>, not the word itself.
            </p>
            <div className="stroop-stage">
              <span
                className="stroop-word"
                style={{ color: round.hex }}
                aria-label={`The word ${round.word.toLowerCase()} written in ${round.ink.toLowerCase()} ink`}
              >
                {round.word}
              </span>
              <div
                className="colour-options"
                role="group"
                aria-label="Choose the ink colour"
              >
                {["Blue", "Green", "Red", "Purple", "Orange"].map((c) => (
                  <button
                    key={c}
                    className={
                      choice === c.toLowerCase()
                        ? "colour-choice selected"
                        : "colour-choice"
                    }
                    onClick={() => {
                      setChoice(c.toLowerCase());
                      setAnswer(false);
                    }}
                    aria-pressed={choice === c.toLowerCase()}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                className="button button-dark button-full"
                disabled={!choice}
                onClick={() => setAnswer(true)}
              >
                Reveal the insight →
              </button>
              {answer && (
                <div className="insight-result" role="status">
                  <strong>
                    {choice === round.ink.toLowerCase()
                      ? `Exactly — the ink is ${round.ink.toLowerCase()}.`
                      : `The ink is ${round.ink.toLowerCase()}, even though the word says “${round.word.toLowerCase()}”.`}
                  </strong>
                  <p>
                    {choice === round.ink.toLowerCase()
                      ? `You focused on the ink colour despite the word “${round.word.toLowerCase()}” pulling your attention elsewhere. That tug-of-war is the Stroop effect.`
                      : `Your brain may read the word “${round.word.toLowerCase()}” automatically, competing with the task of naming the ${round.ink.toLowerCase()} ink. This interference is called the Stroop effect.`}{" "}
                    Try the refresh button for a new colour pairing. This is a
                    small demonstration, not a test of intelligence or mental
                    health.
                  </p>
                </div>
              )}
            </div>
            <span className="card-footnote">
              <CircleHelp size={13} /> A classic attention experiment
            </span>
          </article>
          <article className="learning-card bias-card reveal-card">
            <div className="card-topline">
              <span className="card-number">02 / NOTICE IT</span>
              <span className="card-icon">
                <Sparkles size={19} />
              </span>
            </div>
            <h3>
              The mind has
              <br />
              its shortcuts.
            </h3>
            <p>
              Cognitive biases are patterns that can shape our judgement. Tap a
              card to learn more.
            </p>
            <div className="bias-list">
              {biases.map((b) => (
                <div
                  className={
                    open === b.number ? "bias-item expanded" : "bias-item"
                  }
                  key={b.number}
                >
                  <button
                    className="bias-trigger"
                    onClick={() => setOpen(open === b.number ? null : b.number)}
                    aria-expanded={open === b.number}
                  >
                    <span className="bias-index">{b.number}</span>
                    <span className="bias-question">
                      <strong>{b.title}</strong>
                      <small>{b.question}</small>
                    </span>
                    <ChevronDown size={17} />
                  </button>
                  {open === b.number && (
                    <div className="bias-answer">{b.answer}</div>
                  )}
                </div>
              ))}
            </div>
            <span className="card-footnote">
              <Check size={13} /> Knowledge is a starting point, not a diagnosis
            </span>
          </article>
          <article className="learning-card pause-card reveal-card">
            <div className="card-topline">
              <span className="card-number">03 / TAKE A PAUSE</span>
              <span className="card-icon">
                <Heart size={19} />
              </span>
            </div>
            <div className="pause-art">
              <div className="pause-ring ring-a" />
              <div className="pause-ring ring-b" />
              <span>
                inhale
                <br />
                <em>exhale</em>
              </span>
              <i className="pause-star star-a">✹</i>
              <i className="pause-star star-b">✦</i>
            </div>
            <h3>
              A tiny moment
              <br />
              to check in.
            </h3>
            <p>
              Pause for a breath. Notice one thing you can see, one thing you
              can hear, and one sensation in your body. No need to change
              anything—just notice.
            </p>
            <span className="card-footnote">
              <Heart size={13} /> A reflection prompt, not therapy
            </span>
          </article>
        </div>
        <p className="education-note">
          These activities are for general education and self-reflection only.
          They do not assess, diagnose, or treat mental-health conditions.
        </p>
      </div>
    </section>
  );
}
