import { ArrowRight } from "lucide-react";
import { useReveal } from "../effects/useReveal";
import "./AboutMe.css";
export default function AboutMe() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      className="about-section section-wrap section-space"
      id="about"
      ref={ref}
    >
      <div className="section-kicker reveal-item">
        A LITTLE ABOUT ME <span>✹</span>
      </div>
      <div className="about-grid">
        <div className="portrait-wrap reveal-item">
          <div className="portrait-frame">
            <img
              src="/images/moni.jpeg"
              alt="Illustrated placeholder for Monika Mittal's approved professional portrait"
            />
          </div>
          <span className="portrait-caption">
            A soul that feels deeply, dreams endlessly, grows through everything, and finds beauty in becoming.
          </span>
          <div className="portrait-doodle">
            growing
            <br />
            through
            <br />
            curiosity ↗
          </div>
        </div>
        <div className="about-copy reveal-item">
          <h2>
            Understanding people
            <br />
            starts with <em>being curious.</em>
          </h2>
          <p className="lead">
            I’m drawn to the complexity of the human mind and the many ways our
            experiences shape how we think, feel, and connect.
          </p>
          <p>
            Passionate about the human mind and the art of expression, I’m committed to promoting mental well-being through empathy and connection. I’ve gained hands-on experience in hospitals, clinics, rehabilitation centers, and inclusive learning spaces-working with diverse individuals and psychological needs.
          </p>
          <p>
            Alongside my clinical journey, I’m also a painter and content creator, blending psychology with creativity to foster awareness and healing. Whether through conversations, art, or digital platforms, I strive to help people feel seen, heard, and supported.  Let’s connect if you're passionate about mental health, creativity, or making a meaningful impact!
          </p>
          <div className="signature">
            With curiosity, <span>Monika</span>
          </div>
          <a href="#journey" className="underlined-link">
            A look at my journey <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
