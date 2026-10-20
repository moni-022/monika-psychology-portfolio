import { useEffect, useState } from "react";
import { gsap } from "gsap";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import FloatingBackground from "./components/effects/FloatingBackground";
import Main from "./components/sections/Main";
import AnimationSection from "./components/sections/AnimationSection";
import AboutMe from "./components/sections/AboutMe";
import CuriousCorner from "./components/sections/CuriousCorner";
import MyJourney from "./components/sections/MyJourney";
import PsychologyEdit from "./components/sections/PsychologyEdit";
import LetsConnect from "./components/sections/LetsConnect";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loader = document.querySelector<HTMLElement>(".intro-loader");
    if (!loader) {
      setLoading(false);
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(loader, { autoAlpha: 0, display: "none" });
        setLoading(false);
        return;
      }
      gsap
        .timeline({ onComplete: () => setLoading(false) })
        .fromTo(
          ".loader-brain",
          { scale: 0.7, rotation: -9, autoAlpha: 0 },
          {
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
        )
        .fromTo(
          ".loader-wordmark",
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4 },
          "-=.2",
        )
        .to(loader, {
          autoAlpha: 0,
          duration: 0.5,
          delay: 0.25,
          onComplete: () => loader.setAttribute("aria-hidden", "true"),
        });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      {loading && (
        <div
          className="intro-loader"
          role="status"
          aria-label="Loading psychology portfolio"
        >
          <img className="loader-brain" src="/images/brain-icon.png" alt="" />
          <div className="loader-wordmark">
            <span>MONIKA MITTAL</span>
            <small>A MIND IN BLOOM</small>
          </div>
          <span className="loader-progress" />
        </div>
      )}
      <FloatingBackground />
      <div className="announcement">
        ✳ A little space to pause, notice, and understand <span>✳</span>
      </div>
      <SiteHeader />
      <main>
        <Main />
        <AnimationSection />
        <AboutMe />
        <CuriousCorner />
        <MyJourney />
        <PsychologyEdit />
        <LetsConnect />
      </main>
      <SiteFooter />
    </>
  );
}
