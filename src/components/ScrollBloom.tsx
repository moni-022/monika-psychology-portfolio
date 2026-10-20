import { useLayoutEffect, useRef } from "react";
import { ArrowDown, Sprout } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollBloom.css";

gsap.registerPlugin(ScrollTrigger);
const PETAL_ANGLES = [-90, -45, 0, 45, 90, 135, 180, 225];

/** Scroll-controlled brain-to-flower story. Petal groups use the flower centre as their local origin. */
export default function ScrollBloom() {
  const sectionRef = useRef<HTMLElement>(null);
  const brainRef = useRef<SVGGElement>(null);
  const petalRefs = useRef<(SVGGElement | null)[]>([]);
  const seedRef = useRef<SVGGElement>(null);
  const stemRef = useRef<SVGPathElement>(null);
  const leftLeafRef = useRef<SVGGElement>(null);
  const rightLeafRef = useRef<SVGGElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const brain = brainRef.current;
    const stem = stemRef.current;
    const seed = seedRef.current;
    if (!section || !brain || !stem || !seed) return;

    const petals = petalRefs.current.filter(
      (el): el is SVGGElement => el !== null,
    );
    const leaves = [leftLeafRef.current, rightLeafRef.current].filter(
      (el): el is SVGGElement => el !== null,
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Reset every target explicitly so refreshes and React StrictMode are deterministic.
      gsap.set(brain, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(petals, {
        autoAlpha: 0,
        scale: 0.02,
        transformOrigin: "0px 0px",
      });
      gsap.set(seed, {
        autoAlpha: 0,
        scale: 0.1,
        transformOrigin: "180px 122px",
      });
      const stemLength = stem.getTotalLength();
      gsap.set(stem, {
        strokeDasharray: stemLength,
        strokeDashoffset: stemLength,
      });
      gsap.set(leaves, {
        autoAlpha: 0,
        scale: 0.1,
        transformOrigin: "50% 50%",
      });
      if (captionRef.current)
        gsap.set(captionRef.current, { autoAlpha: 0, y: 12 });

      if (reduceMotion) {
        gsap.set(brain, { autoAlpha: 0 });
        gsap.set(petals, { autoAlpha: 1, scale: 1 });
        gsap.set(seed, { autoAlpha: 1, scale: 1 });
        gsap.set(stem, { strokeDashoffset: 0 });
        gsap.set(leaves, { autoAlpha: 1, scale: 1 });
        if (captionRef.current)
          gsap.set(captionRef.current, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1000",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".bloom-orbit", { rotation: 18, scale: 1.04, duration: 1 }, 0)
        .to(
          brain,
          {
            scale: 0.72,
            y: -5,
            autoAlpha: 0,
            duration: 1.1,
            ease: "power1.in",
          },
          0.25,
        )
        .to(
          petals,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            stagger: { each: 0.09, from: "center" },
            ease: "back.out(1.25)",
          },
          0.45,
        )
        .to(
          seed,
          { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" },
          1.2,
        )
        .to(stem, { strokeDashoffset: 0, duration: 1.05, ease: "none" }, 1.15)
        .to(
          leaves,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.18,
            ease: "back.out(1.4)",
          },
          1.65,
        )
        .to(".bloom-orbit", { rotation: 30, scale: 1.08, duration: 0.8 }, 1.7)
        .to(captionRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.0);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="scroll-bloom"
      ref={sectionRef}
      aria-labelledby="bloom-title"
    >
      <div className="scroll-bloom-inner">
        <div className="bloom-copy">
          <div className="section-kicker">
            A METAPHOR FOR GROWTH <span>✳</span>
          </div>
          <h2 id="bloom-title">
            Understanding the mind
            <br />
            <em>helps us grow.</em>
          </h2>
          <p>
            As we learn about our thoughts, emotions, and patterns, new
            possibilities can take root. Scroll slowly and watch this little
            visual story unfold.
          </p>
          <div className="bloom-scroll-hint">
            <ArrowDown size={15} aria-hidden="true" /> Scroll to help it bloom
          </div>
          <div className="bloom-caption" ref={captionRef}>
            <Sprout size={18} aria-hidden="true" />
            <span>
              <strong>Curiosity can be a beginning.</strong>
              <small>Learning is a process, not a finish line.</small>
            </span>
          </div>
        </div>

        <div
          className="bloom-art"
          aria-label="An illustration of a brain transforming into a flower as you scroll"
        >
          <div className="bloom-orbit orbit-a" />
          <div className="bloom-orbit orbit-b" />
          <svg
            className="bloom-svg"
            viewBox="0 0 360 360"
            role="img"
            aria-labelledby="bloom-svg-title bloom-svg-desc"
          >
            <title id="bloom-svg-title">From mind to bloom</title>
            <desc id="bloom-svg-desc">
              A brain gradually fades away as a flower opens, grows a stem, and
              unfolds leaves.
            </desc>
            <g ref={brainRef} className="brain-cross-section">
              <path
                className="brain-outline"
                d="M178 228 C159 237 142 224 139 210 C119 211 106 196 111 178 C91 164 99 141 115 132 C111 112 129 99 145 104 C151 83 176 79 190 94 C209 79 234 91 235 111 C255 113 266 132 255 149 C272 165 264 188 245 195 C242 215 222 228 205 219 C196 231 187 232 178 228Z"
                fill="#E5E9D9"
                stroke="#607B62"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M180 97 C170 111 181 121 170 132 C158 142 169 154 158 166 C148 178 159 190 151 204 M194 98 C207 109 194 122 209 133 C223 143 208 155 224 166 C237 176 225 188 239 194 M143 111 C154 118 148 130 136 135 M126 145 C143 148 142 159 128 168 M139 187 C154 182 165 194 158 208 M223 115 C216 126 229 134 244 137 M238 153 C224 158 230 173 248 177 M199 190 C187 181 178 194 187 211"
                fill="none"
                stroke="#8DA084"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M177 228 C177 239 181 244 187 251"
                fill="none"
                stroke="#607B62"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M175 120 C181 114 187 114 193 120 M171 159 C180 151 192 154 198 163 M173 187 C182 181 194 184 201 192"
                fill="none"
                stroke="#C2CDB6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>

            <g className="bloom-flower">
              {PETAL_ANGLES.map((angle, index) => (
                <g
                  key={angle}
                  ref={(el) => {
                    petalRefs.current[index] = el;
                  }}
                  className="bloom-petal"
                  transform={`translate(180 122) rotate(${angle})`}
                >
                  <path
                    d="M0 0 C-24 -13 -26 -43 0 -63 C26 -43 24 -13 0 0Z"
                    fill={
                      index % 3 === 0
                        ? "#C98770"
                        : index % 3 === 1
                          ? "#D9B4A0"
                          : "#9EAF91"
                    }
                    stroke="#6C866A"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
              <g ref={seedRef} className="bloom-seed">
                <circle
                  cx="180"
                  cy="122"
                  r="17"
                  fill="#F0D9A7"
                  stroke="#A67A55"
                  strokeWidth="2"
                />
                {Array.from({ length: 9 }, (_, i) => (
                  <circle
                    key={i}
                    cx={180 + Math.cos((i * Math.PI * 2) / 9) * 9}
                    cy={122 + Math.sin((i * Math.PI * 2) / 9) * 9}
                    r="1.8"
                    fill="#A67A55"
                  />
                ))}
              </g>
            </g>

            <path
              ref={stemRef}
              className="bloom-stem"
              d="M180 139 C181 183 177 221 182 284"
              fill="none"
              stroke="#607B62"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <g ref={leftLeafRef} className="bloom-leaf-group">
              <path
                d="M180 225 C148 218 137 235 143 251 C162 251 175 242 180 225Z"
                fill="#91A887"
                stroke="#607B62"
                strokeWidth="1.5"
              />
              <path
                d="M177 230 Q161 237 148 245"
                fill="none"
                stroke="#607B62"
                strokeWidth="1"
              />
            </g>
            <g ref={rightLeafRef} className="bloom-leaf-group">
              <path
                d="M181 250 C208 232 227 243 225 260 C205 269 189 262 181 250Z"
                fill="#B6C3A8"
                stroke="#607B62"
                strokeWidth="1.5"
              />
              <path
                d="M187 253 Q205 253 220 257"
                fill="none"
                stroke="#607B62"
                strokeWidth="1"
              />
            </g>
            <path
              className="bloom-ground"
              d="M153 305 C163 284 174 280 180 280 C197 283 205 293 208 305"
              fill="none"
              stroke="#A7B89B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="bloom-side-note note-left">THOUGHTS</span>
          <span className="bloom-side-note note-right">POSSIBILITY</span>
        </div>
      </div>
    </section>
  );
}
