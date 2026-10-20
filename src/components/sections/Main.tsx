import { ArrowDown, ArrowRight} from "lucide-react";
import BrainPortal from "./BrainPortal";
import { useReveal } from "../effects/useReveal";
import "./Main.css";

export default function Main() {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="main-hero section-wrap" id="home" ref={ref}>
      <div className="main-copy reveal-item">
        <div className="eyebrow">
          <span /> A curious mind, learning to listen
        </div>
        <h1>
          The mind is a world.
          <br />
          <em>Let’s understand</em>
          <br />
          it a little better.
        </h1>
        <p className="main-intro">
          I’m Monika Mittal, an aspiring clinical psychologist interested in the stories
          behind human behaviour, the science of our emotions, and the small
          things that make us who we are.
        </p>
        <div className="main-actions">
          <a className="button button-primary" href="#about">
            Get to know me <ArrowRight size={17} />
          </a>
          <a className="text-link" href="#explore">
            Explore psychology <ArrowDown size={15} />
          </a>
        </div>
      </div>
      <div className="main-art reveal-item">
        <BrainPortal />
      </div>
      <a className="main-scroll" href="#bloom">
        <span /> SCROLL A LITTLE
      </a>
    </section>
  );
}
