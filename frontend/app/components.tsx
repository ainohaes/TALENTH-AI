"use client";

import { useEffect, useState } from "react";

const people = [
  { name: "Haroun Hickman", role: "Co Founder & CEO", initials: "HH", tone: "gold" },
  { name: "Poppy Reid", role: "Product Design Lead", initials: "PR", tone: "lilac" },
  { name: "Joel Kang", role: "Co Founder & CTO", initials: "JK", tone: "mint" },
];

export function DalaLogo() {
  return (
    <a className="dala-logo" href="#inicio" aria-label="Dala, home">
      <svg className="dala-mark" viewBox="0 0 34 34" aria-hidden="true">
        <defs><linearGradient id="dala-mark-gradient" x1="18" y1="1" x2="17" y2="33" gradientUnits="userSpaceOnUse"><stop stopColor="#74E2D4"/><stop offset=".42" stopColor="#8361F4"/><stop offset=".72" stopColor="#AC54ED"/><stop offset="1" stopColor="#F5C66C"/></linearGradient></defs>
        <path d="M5 1h10.5a16 16 0 0 1 0 32H5V1Z" fill="url(#dala-mark-gradient)" />
      </svg>
      <span>Dala</span>
    </a>
  );
}

export function DalaHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="dala-header">
        <div className="header-logo-wrap" onClick={closeMenu}><DalaLogo /></div>
        <nav className={menuOpen ? "dala-nav is-open" : "dala-nav"} aria-label="Main navigation">
          <a href="#manifesto" onClick={closeMenu}>Manifesto</a>
          <a href="#team" onClick={closeMenu}>Team</a>
          <a href="https://medium.com/dala-ai" target="_blank" rel="noreferrer">Blog <span aria-hidden="true">↗</span></a>
          <a className="dala-button nav-mobile-cta" href="https://askdala.typeform.com/to/lSujgyr8" target="_blank" rel="noreferrer">Request access <span aria-hidden="true">↗</span></a>
        </nav>
        <a className="dala-button nav-desktop-cta" href="https://askdala.typeform.com/to/lSujgyr8" target="_blank" rel="noreferrer">Request access <span aria-hidden="true">↗</span></a>
        <button className={menuOpen ? "dala-menu-toggle is-open" : "dala-menu-toggle"} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </header>
      <div className="header-blur" aria-hidden="true" />
    </>
  );
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(window.localStorage.getItem("dala-cookie-choice") !== "accepted");
  }, []);
  if (!visible) return null;
  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <p>This website uses cookies. <a href="#privacy">Learn more</a></p>
      <button type="button" onClick={() => { window.localStorage.setItem("dala-cookie-choice", "accepted"); setVisible(false); }}>Accept</button>
    </aside>
  );
}

export function TeamSlider() {
  const [active, setActive] = useState(0);
  const change = (step: number) => setActive((current) => (current + step + people.length) % people.length);
  const person = people[active];
  return (
    <div className="team-carousel" aria-roledescription="carousel" aria-label="Dala team">
      <div className="team-portrait-wrap">
        <div className={`team-portrait portrait-${person.tone}`} role="img" aria-label={`Portrait placeholder for ${person.name}`}>
          <span>{person.initials}</span>
          <i className="portrait-orbit orbit-one" /><i className="portrait-orbit orbit-two" />
        </div>
      </div>
      <div className="team-person" aria-live="polite">
        <p className="eyebrow team-role">{person.role}</p>
        <h3>{person.name}</h3>
        <div className="team-controls">
          <button type="button" aria-label="Previous team member" onClick={() => change(-1)}><span>←</span></button>
          <span className="team-count">0{active + 1} <i /> 0{people.length}</span>
          <button type="button" aria-label="Next team member" onClick={() => change(1)}><span>→</span></button>
        </div>
      </div>
    </div>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    document.documentElement.classList.add("has-js");
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-js");
    };
  }, []);
  return null;
}
