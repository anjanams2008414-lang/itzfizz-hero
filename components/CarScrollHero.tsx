"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 58, description: "Increase in pick up point use" },
  { value: 23, description: "Decrease in customer phone calls" },
  { value: 27, description: "Increase in pick up point use" },
  { value: 40, description: "Decrease in customer phone calls" },
];

const headline = "WELCOMEITZFIZZ";

export default function CarScrollHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".headline-letter");
      const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
      const statContents = gsap.utils.toArray<HTMLElement>(".stat-content");
      const values = gsap.utils.toArray<HTMLElement>(".stat-value");
      const carArt = gsap.utils.toArray<HTMLElement>(".car-art");
      const statRules = gsap.utils.toArray<HTMLElement>(".stat-rule");
      const statFlares = gsap.utils.toArray<HTMLElement>(".stat-flare");
      const highlightLetters =
        gsap.utils.toArray<HTMLElement>(".headline-highlight");
      const road = hero.querySelector<HTMLElement>(".road");
      const carTrack = hero.querySelector<HTMLElement>(".car-track");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([letters, cards, statContents, carArt], { clearProps: "all" });
        gsap.set(cards, { opacity: 1 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          ".eyebrow",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          0,
        )
        .fromTo(
          letters,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.04 },
          0.08,
        )
        .fromTo(
          statContents,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.13 },
          0.5,
        )
        .fromTo(
          carArt,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 1 },
          0.3,
        );

      const drive = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      drive.to(
        ".car-track",
        {
          x: () =>
            (road?.clientWidth ?? 0) -
            (carTrack?.offsetLeft ?? 0) -
            (carTrack?.offsetWidth ?? 0) -
            18,
          duration: 1,
        },
        0,
      );
      drive.to(".road-lanes", { xPercent: -27, duration: 1 }, 0);
      drive.to(".road-glow", { xPercent: 92, opacity: 0.9, duration: 1 }, 0);
      drive.to(
        highlightLetters,
        {
          opacity: 1,
          stagger: { each: 0.045 },
          duration: 0.48,
        },
        0.04,
      );

      stats.forEach((stat, index) => {
        const position = 0.08 + index * 0.21;
        drive.fromTo(
          values[index],
          { textContent: "0" },
          {
            textContent: String(stat.value),
            snap: { textContent: 1 },
            duration: 0.2,
          },
          position,
        );
        drive.fromTo(
          statRules[index],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.2, ease: "power2.out" },
          position,
        );
        drive.fromTo(
          statFlares[index],
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" },
          position,
        );
      });
      drive.fromTo(
        ".journey-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: 1 },
        0,
      );
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <section className="hero" ref={heroRef} aria-label="ITZFIZZ customer impact">
        <header className="site-header">
          <a className="brand" href="#home" aria-label="ITZFIZZ home">
            ITZ<span>FIZZ</span>
          </a>
          <span className="header-note">
            <span className="header-mark" aria-hidden="true" />
            A better way to get there
          </span>
          <span className="scroll-cue">
            <span className="scroll-dot" aria-hidden="true" />
            SCROLL TO DRIVE
            <span className="scroll-arrow" aria-hidden="true">
              ↘
            </span>
          </span>
        </header>

        <div className="hero-content" id="home">
          <div className="headline-wrap">
            <p className="eyebrow">SMALL STOPS. BIG DIFFERENCE.</p>
            <h1 className="headline" aria-label="Welcome ITZFIZZ">
              {Array.from(headline).map((letter, index) => (
                <span
                  aria-hidden="true"
                  className={`headline-letter${index === 6 ? " word-gap" : ""}`}
                  key={`${letter}-${index}`}
                >
                  <span className="headline-base">{letter}</span>
                  <span className="headline-highlight">{letter}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="road" aria-hidden="true">
            <div className="road-edge road-edge-top" />
            <div className="road-glow" />
            <div className="road-lanes">
              <span />
            </div>
            <div className="road-centerline" />
            <div className="road-edge road-edge-bottom" />
            <div className="car-track">
              <Image
                className="car-art"
                src="/car-scroll-animation/car.png"
                alt=""
                width={1400}
                height={800}
                priority
              />
            </div>
          </div>

          <div className="impact-row" aria-label="Customer impact statistics">
            {stats.map((stat, index) => (
              <article className="stat-card" key={`${stat.value}-${index}`}>
                <div className="stat-content">
                  <p className="stat-number">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-percent">%</span>
                  </p>
                  <p className="stat-description">{stat.description}</p>
                  <span className="stat-rule" aria-hidden="true" />
                  <span className="stat-flare" aria-hidden="true" />
                  <span className="stat-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="hero-footer">
          <span>MADE FOR THE WAY FORWARD</span>
          <span>01 — 04</span>
        </footer>
        <span className="journey-progress" aria-hidden="true" />
      </section>
    </main>
  );
}
