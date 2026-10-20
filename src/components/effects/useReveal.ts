import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".reveal-item"),
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );
      gsap.fromTo(
        root.querySelectorAll(".reveal-card"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.13,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return ref;
}
