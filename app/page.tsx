"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

// Hand-drawn stand-ins for concepts/standards with no official product logo
// at all (WebSockets, SQL, AI Fundamentals, Tkinter, Data Modeling).
const skillGlyphs = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13,2 4,14 11,14 9,22 20,10 12,10" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
      <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="3" />
      <path d="M7 16l-1.5 4 5-4" />
      <circle cx="8" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z" />
    </svg>
  ),
  window: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.2" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="5.5" rx="1.4" />
      <rect x="3" y="9.25" width="18" height="5.5" rx="1.4" />
      <rect x="3" y="15.5" width="18" height="5.5" rx="1.4" />
      <circle cx="6.6" cy="5.75" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="6.6" cy="12" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="6.6" cy="18.25" r="0.65" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Three source tables feeding into one modeled, gear-framed store — the
  // same idea as the classic "data modeling" clip-art mark, redrawn as
  // original line art (that mark itself is stock art we can't hotlink).
  datamodel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="5.4" cy="3.4" rx="2" ry="0.8" />
      <ellipse cx="12" cy="3.4" rx="2" ry="0.8" />
      <ellipse cx="18.6" cy="3.4" rx="2" ry="0.8" />
      <path d="M5.4 4.2c0 2.2 3.2 3.9 6.6 4.8" />
      <path d="M12 4.2v4.8" />
      <path d="M18.6 4.2c0 2.2-3.2 3.9-6.6 4.8" />
      <circle cx="12" cy="16" r="4.3" />
      <path d="M12 10.7v1.1M12 20.2v1.1M17.3 16h-1.1M6.8 16h-1.1M15.85 12.35l-.8.8M8.95 19.65l-.8.8M15.85 19.65l-.8-.8M8.95 12.35l-.8-.8" />
      <ellipse cx="12" cy="14.8" rx="2.1" ry="0.75" />
      <path d="M9.9 14.8v2.4c0 .5.94.9 2.1.9s2.1-.4 2.1-.9v-2.4" />
    </svg>
  ),
};

// A single flat stack instead of Frontend/Backend/AI & Tools buckets.
// `icon` is a skillicons.dev slug (https://skillicons.dev). `iconUrls` are
// direct logo URLs, tried in order if `icon` is absent or fails to load
// (skillicons.dev doesn't carry Botpress, XAMPP, or a WebSocket mark, and
// its own "apache" glyph renders as a solid dark block, so those go straight
// to a verified direct source instead). `invertIcon` flips a black-only
// logo to white so it reads against the dark card. `glyph` names a
// hand-drawn icon from `skillGlyphs` above for concepts/standards that don't
// have an official product logo at all — used directly, or as the last
// resort after every image source fails, before ever falling back to a
// plain monogram.
const skills = [
  { name: "HTML5", icon: "html" },
  { name: "CSS3", icon: "css" },
  { name: "JavaScript", icon: "js" },
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  {
    name: "Next.js",
    iconUrls: ["/skills/nextjs.png", "https://skillicons.dev/icons?i=next"],
  },
  { name: "Tailwind CSS", icon: "tailwind" },
  {
    name: "PHP",
    iconUrls: ["/skills/php.png", "https://skillicons.dev/icons?i=php"],
  },
  { name: "Python", icon: "py" },
  { name: "FastAPI", icon: "fastapi" },
  {
    name: "WebSockets",
    iconUrls: ["/skills/websockets.png"],
    glyph: "bolt",
  },
  { name: "Java", icon: "java" },
  {
    name: "C#",
    iconUrls: ["/skills/csharp.png", "https://skillicons.dev/icons?i=cs"],
  },
  { name: "Django", icon: "django" },
  { name: "MySQL", icon: "mysql" },
  { name: "SQLite", icon: "sqlite" },
  { name: "SQL", glyph: "database" },
  {
    name: "Botpress",
    iconUrls: [
      "/skills/botpress.png",
      "https://www.vectorlogo.zone/logos/botpressio/botpressio-icon.svg",
    ],
    glyph: "chat",
  },
  { name: "AI Fundamentals", glyph: "sparkle" },
  { name: "Git/GitHub", icon: "git" },
  {
    name: "Apache/XAMPP",
    iconUrls: [
      "/skills/xampp.png",
      "https://cdn.simpleicons.org/xampp",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    ],
    glyph: "server",
  },
  { name: "Tkinter", icon: "py", glyph: "window" },
  {
    name: "VS Code",
    iconUrls: ["/skills/vscode.png", "https://skillicons.dev/icons?i=vscode"],
  },
  { name: "Data Modeling", glyph: "datamodel" },
] satisfies {
  name: string;
  icon?: string;
  iconUrls?: string[];
  invertIcon?: boolean;
  glyph?: keyof typeof skillGlyphs;
}[];

const totalSkillCount = skills.length;

// Three even-ish rows for the scrolling "stack" marquee.
const skillMarqueeRows = [skills.slice(0, 8), skills.slice(8, 16), skills.slice(16, 24)];

function SkillChip({
  name,
  icon,
  iconUrls,
  invertIcon,
  glyph,
  duplicate,
}: {
  name: string;
  icon?: string;
  iconUrls?: string[];
  invertIcon?: boolean;
  glyph?: keyof typeof skillGlyphs;
  duplicate?: boolean;
}) {
  // Try the image sources in order (skillicons.dev, then any direct logo
  // URLs given); once all are exhausted, fall back to the hand-drawn glyph
  // if there is one, and only then to a bare monogram.
  const imageSources = [
    icon ? `https://skillicons.dev/icons?i=${icon}` : null,
    ...(iconUrls ?? []),
  ].filter((src): src is string => Boolean(src));

  const [attempt, setAttempt] = useState(0);
  const currentSrc = imageSources[attempt];
  const advance = () => setAttempt((value) => value + 1);

  return (
    <span
      className={`skill-chip${duplicate ? " skill-chip-duplicate" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {currentSrc ? (
        <img
          src={currentSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`skill-chip-icon${invertIcon ? " skill-chip-icon-invert" : ""}`}
          onError={advance}
          onLoad={(event) => {
            // Some logo CDNs return a 200 with an empty/blank SVG for an
            // unrecognized slug instead of a real HTTP error, so onError
            // alone won't catch it — treat a zero-size image as a failure.
            if (event.currentTarget.naturalWidth === 0) advance();
          }}
        />
      ) : glyph ? (
        <span className="skill-chip-glyph" aria-hidden="true">
          {skillGlyphs[glyph]}
        </span>
      ) : (
        <span className="skill-chip-fallback" aria-hidden="true">
          {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
        </span>
      )}
      {name}
    </span>
  );
}

const journeyTimeline = [
  {
    label: "College",
    heading: "PHINMA - SJCDC",
    subheading: "BS Computer Science",
    description: "Focused on software engineering, web development, and database systems.",
  },
  {
    label: "First Project",
    heading: "SmartLib",
    subheading: "Full-stack library system",
    description:
      "A self-service library kiosk built for PHINMA - SJCDC — role-based sign-in, live checkout, and a homegrown recommendation engine, hand-rolled without third-party libraries.",
  },
  {
    label: "Current",
    heading: "Secret Grounds System",
    subheading: "Full-stack POS system",
    description:
      "A self-hosted management platform for a gaming lounge — real-time session control, billing, and remote PC commands across a LAN, no cloud service required.",
  },
];

const selectedWorks = [
  {
    title: "Secret Grounds System",
    summary:
      "A self-hosted management platform for a gaming lounge — a cashier PC runs the server that owns billing and member accounts, while each customer PC runs a locked-down client that starts, tracks, and stops paid sessions. Built for staff to manage walk-in and member customers, timed sessions, pricing and promos, and remote PC control across a LAN, with no cloud service in the loop.",
    tags: ["Python", "FastAPI", "WebSockets", "SQLite", "Next.js", "React", "TypeScript", "Tkinter"],
    type: "Full-stack POS system",
    visual: "lounge",
  },
  {
    title: "SmartLib",
    summary:
      "A self-service library kiosk built for PHINMA - SJCDC, letting students, faculty, and librarians search the catalog, sign in with role-based accounts, and check out or renew books without a staff member at the desk. A companion admin back office handles the catalog, borrowers, fines, reports, and CSV exports, with personalized book recommendations generated entirely from local borrowing and search data — no external API involved.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Apache/XAMPP", "Git", "SQL"],
    type: "Full-stack library system",
    visual: "library",
  },
  {
    title: "Academic Portfolio Site",
    summary:
      "Portfolio AI Agent: an intelligent Botpress-powered chatbot integrated into my React portfolio to answer resume and profile questions automatically, alongside responsive sections for skills, certificates, projects, and contact links.",
    tags: [
      "Portfolio AI Agent",
      "Botpress Webchat",
      "Botpress Cloud",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    type: "Personal website",
    visual: "portfolio",
  },
];

const certificates = [
  {
    title: "Python Developer Certification",
    year: "2026",
    focus: "Software Development",
    detail:
      "300+ hours of hands-on Python — fundamentals, object-oriented programming, data structures, and file handling — turned into real, working programs built from scratch. Officially certified by freeCodeCamp.",
    image: "/certificates/freecodecamp-python.png",
  },
  {
    title: "2nd Innovex 2026: International Student Conference",
    year: "2026",
    focus: "International Conference",
    detail:
      "Showcased my Smart Library System on an international stage, presenting a transformative technology project built for smarter access, learning, and innovation.",
    image: "/certificates/innovex-2026.png",
  },
  {
    title:
      'IN2ITION 2026: 5th Philippine Youth Internet Governance Forum (PhYIGF), with the theme "Empowering Filipino Youth in Shaping a trusted digital future"',
    year: "2026",
    focus: "Digital Future",
    detail: "Joined youth-focused discussions on internet governance and trusted digital spaces.",
    image: "/certificates/phyigf.png",
  },
  {
    title: "Chasing Dreams with Grit & Determination",
    year: "2025",
    focus: "Personal Growth",
    detail: "Completed a development program centered on resilience, ambition, and discipline.",
    image: "/certificates/chasing-dreams.png",
  },
  {
    title: "New Generation of Thaddean Servant Leaders",
    year: "2024",
    focus: "Leadership",
    detail: "Recognized for servant leadership, character, and campus involvement.",
    image: "/certificates/thaddean-servant-leaders.png",
  },
];

const botpressThemeConfig = {
  botName: "cinie ୨୧",
  botDescription: "An AI portfolio assistant for Kin Ira's personal details. Ask cinie ୨୧ about her!",
  composerPlaceholder: "Type what you want to know....",
  color: "#ec4899",
  radius: 2,
  themeMode: "dark",
  variant: "soft",
  headerVariant: "glass",
  fontFamily: "inter",
  showPoweredBy: false,
  additionalStylesheet: `
    .bpWebchat {
      width: min(360px, calc(100vw - 2rem)) !important;
      height: min(580px, calc(100vh - 7rem)) !important;
      max-height: 580px !important;
      right: 1.35rem !important;
      bottom: 6rem !important;
      border: 1px solid rgba(244, 114, 182, 0.34) !important;
      border-radius: 20px !important;
      background:
        radial-gradient(120% 92% at 10% 0%, rgba(236, 72, 153, 0.16) 0%, rgba(236, 72, 153, 0) 70%),
        radial-gradient(95% 88% at 100% 12%, rgba(251, 113, 133, 0.11) 0%, rgba(251, 113, 133, 0) 72%),
        linear-gradient(165deg, rgba(38, 22, 46, 0.96) 0%, rgba(20, 13, 27, 0.98) 100%) !important;
      box-shadow:
        0 24px 70px rgba(1, 5, 17, 0.58),
        0 0 44px rgba(236, 72, 153, 0.16) !important;
    }

    .bpContainer,
    .bpMessageListContainer,
    .bpMessageListViewport {
      background: transparent !important;
      color: #f8f7ff !important;
    }

    .bpHeaderContainer {
      min-height: 60px !important;
      border-bottom: 1px solid rgba(244, 114, 182, 0.24) !important;
      background:
        radial-gradient(100% 120% at 0% 0%, rgba(244, 114, 182, 0.24) 0%, transparent 66%),
        linear-gradient(180deg, rgba(36, 21, 44, 0.9) 0%, rgba(23, 15, 32, 0.88) 100%) !important;
      color: #fce7f3 !important;
    }

    .bpHeaderContentTitle,
    .bpHeaderContentDescription,
    .bpHeaderContentActionsIcons {
      color: #fce7f3 !important;
    }

    .bpHeaderContentTitle {
      display: flex !important;
      align-items: center !important;
      font-size: 0.92rem !important;
      line-height: 1 !important;
      margin: 0 !important;
      min-height: 2.1rem !important;
      padding-top: 0.08rem !important;
    }

    .bpHeaderContentTitleContainer {
      align-items: center !important;
      display: flex !important;
    }

    .bpHeaderContentDescription {
      display: none !important;
    }

    .bpHeaderContentAvatarFallback,
    .bpMessageAvatarFallback,
    .bpFabContainer {
      background:
        radial-gradient(circle at 32% 20%, rgba(255, 255, 255, 0.95) 0 13%, transparent 14%),
        radial-gradient(circle at 72% 76%, rgba(251, 113, 133, 0.54) 0%, transparent 38%),
        linear-gradient(145deg, rgba(244, 114, 182, 0.95) 0%, rgba(236, 72, 153, 0.9) 100%) !important;
      color: #ffffff !important;
    }

    .bpFabContainer {
      width: 52px !important;
      height: 52px !important;
      border: 1px solid rgba(244, 114, 182, 0.48) !important;
      box-shadow:
        0 14px 32px rgba(5, 10, 28, 0.45),
        0 0 22px rgba(236, 72, 153, 0.32) !important;
    }

    .bpFabWrapper {
      right: 1.35rem !important;
      bottom: 1.25rem !important;
    }

    .bpMessageBlocksBubble {
      border: 1px solid rgba(244, 114, 182, 0.22) !important;
      border-radius: 15px !important;
      background:
        linear-gradient(165deg, rgba(36, 21, 44, 0.76) 0%, rgba(23, 15, 32, 0.86) 100%) !important;
      color: rgba(248, 250, 252, 0.94) !important;
      box-shadow: 0 10px 24px rgba(3, 6, 23, 0.18) !important;
    }

    .bpComposerWrapper {
      border-top: 1px solid rgba(244, 114, 182, 0.16) !important;
      background: rgba(20, 12, 26, 0.34) !important;
    }

    .bpComposerContainer {
      border: 1px solid rgba(244, 114, 182, 0.34) !important;
      border-radius: 999px !important;
      background: rgba(20, 12, 26, 0.68) !important;
      box-shadow: 0 10px 26px rgba(3, 6, 23, 0.24) !important;
    }

    @media (max-width: 767px) {
      .bpWebchat {
        width: min(340px, calc(100vw - 1.5rem)) !important;
        height: min(540px, calc(100vh - 6.25rem)) !important;
        right: 0.75rem !important;
        bottom: 5.45rem !important;
      }

      .bpFabWrapper {
        right: 0.9rem !important;
        bottom: 0.9rem !important;
      }

      .bpFabContainer {
        width: 48px !important;
        height: 48px !important;
      }
    }

    .bpComposerInput,
    .bpComposerInputContainer {
      color: rgba(248, 250, 252, 0.96) !important;
      background: transparent !important;
    }

    .bpComposerInput::placeholder {
      color: rgba(148, 163, 184, 0.78) !important;
    }

    .bpComposerSendButton {
      color: #ffffff !important;
      background: linear-gradient(135deg, #f472b6 0%, #ec4899 82%, #fb7185 160%) !important;
    }
  `,
};

const botpressInjectScriptUrl = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
const botpressConfigScriptUrl =
  "https://files.bpcontent.cloud/2026/05/25/22/20260525220919-6XQCO6RS.js";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);
  const certificateRailRef = useRef<HTMLDivElement>(null);
  const [canScrollCertificatesPrev, setCanScrollCertificatesPrev] = useState(false);
  const [canScrollCertificatesNext, setCanScrollCertificatesNext] = useState(false);

  const updateCertificateScrollState = () => {
    const rail = certificateRailRef.current;
    if (!rail) return;
    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanScrollCertificatesPrev(rail.scrollLeft > 8);
    setCanScrollCertificatesNext(rail.scrollLeft < maxScrollLeft - 8);
  };

  const scrollCertificates = (direction: number) => {
    const rail = certificateRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.86, behavior: "smooth" });
  };

  useEffect(() => {
    updateCertificateScrollState();
    window.addEventListener("resize", updateCertificateScrollState);
    return () => window.removeEventListener("resize", updateCertificateScrollState);
  }, []);

  const openContactModal = () => {
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setIsPhoneNumberVisible(false);
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.getAttribute("href");
    if (!hash || !hash.startsWith("#") || hash.length < 2) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const panel = target.classList.contains("showcase-panel")
      ? target
      : target.closest(".showcase-panel") ?? target.querySelector(".showcase-panel");

    if (!panel) return;

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (panel as HTMLElement).scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });

    panel.classList.remove("panel-pop");
    // Force a reflow so the animation restarts even if the same panel was just popped.
    void (panel as HTMLElement).offsetWidth;
    panel.classList.add("panel-pop");
    window.setTimeout(() => panel.classList.remove("panel-pop"), 700);
  };

  useEffect(() => {
    type BotpressWindow = Window & {
      botpress?: {
        config?: (options: { configuration: typeof botpressThemeConfig }) => void;
        on?: (eventName: string, callback: () => void) => void;
      };
    };

    const botpressWindow = window as BotpressWindow;

    const applyTheme = () => {
      try {
        botpressWindow.botpress?.config?.({ configuration: botpressThemeConfig });
      } catch {
        window.setTimeout(applyTheme, 250);
      }
    };

    const loadScript = (id: string, src: string, onLoad: () => void) => {
      const existingScript = document.getElementById(id) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener("load", onLoad, { once: true });

        if (id === "botpress-inject-script" && botpressWindow.botpress) {
          onLoad();
        }

        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      script.onerror = () => {
        console.warn(`Unable to load ${src}`);
      };

      document.body.appendChild(script);
    };

    const loadConfig = () => {
      loadScript("botpress-config-script", botpressConfigScriptUrl, () => {
        botpressWindow.botpress?.on?.("webchat:initialized", applyTheme);
        botpressWindow.botpress?.on?.("webchat:opened", applyTheme);
        applyTheme();

        let attempts = 0;
        const themeInterval = window.setInterval(() => {
          applyTheme();
          attempts += 1;

          if (attempts >= 20) {
            window.clearInterval(themeInterval);
          }
        }, 500);
      });
    };

    loadScript("botpress-inject-script", botpressInjectScriptUrl, loadConfig);
  }, []);

  useEffect(() => {
    if (!isContactOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContactModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isContactOpen]);

  return (
    <main className="portfolio-shell min-h-screen w-full">
      <header className="glass-panel sticky top-0 z-30 border-x-0 border-t-0 rounded-none px-5 py-3.5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-4">
          <a href="#" className="brand-mark-link" aria-label="Kin Ira J. Bantiling home">
            <Image
              src="/kin-logo.png"
              alt="Kin Ira J. Bantiling"
              width={40}
              height={44}
              priority
              className="brand-mark"
            />
          </a>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/95 sm:gap-7">
            <a href="#about" onClick={handleNavClick} className="transition hover:text-pink-300">
              About
            </a>
            <a href="#journey" onClick={handleNavClick} className="transition hover:text-pink-300">
              Journey
            </a>
            <a href="#skills" onClick={handleNavClick} className="transition hover:text-pink-300">
              Skills
            </a>
            <a href="#work" onClick={handleNavClick} className="transition hover:text-pink-300">
              Work
            </a>
            <a href="#certificates" onClick={handleNavClick} className="transition hover:text-pink-300">
              Certificates
            </a>
            <button
              type="button"
              onClick={openContactModal}
              className="cursor-pointer transition hover:text-pink-300"
            >
              Contact
            </button>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="hero-orb hero-orb-pink" aria-hidden="true" />
        <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-[1700px] -translate-y-8 items-center gap-10 sm:-translate-y-10 lg:-translate-y-16 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden gap-10 lg:grid">
            <div className="hero-float glass-panel reveal rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🤖 Future Software Engineer
            </div>
            <div className="hero-float hero-float-delay glass-panel reveal reveal-delay-1 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              💻 Full-Stack Learner
            </div>
          </div>

          <div className="reveal text-center">
            <p className="accent-ring mb-4 inline-block rounded-full border px-4 py-1 text-xs uppercase tracking-[0.18em] accent-text">
              BS Computer Science Student | PHINMA - SJCDC
            </p>
            <h1 className="display-text text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl">
              Engineering
            </h1>
            <h2 className="display-text hero-glow text-balance text-5xl font-bold leading-[1.02] text-pink-300 sm:text-7xl lg:text-8xl">
              Digital Confidence
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200/85 sm:text-2xl">
              Hi, I&apos;m <span className="font-semibold text-white">Kin Ira J. Bantiling</span>. I
              build practical software experiences and continuously improve through real development
              projects.
            </p>
            <a
              href="#work"
              className="pink-button mt-9 inline-flex rounded-full px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5"
            >
              View Projects
            </a>

            <div className="hero-stats mt-10">
              <div className="hero-stat">
                <p className="hero-stat-value">{selectedWorks.length}</p>
                <p className="hero-stat-label">Projects Built</p>
              </div>
              <div className="hero-stat">
                <p className="hero-stat-value">{certificates.length}</p>
                <p className="hero-stat-label">Certifications</p>
              </div>
              <div className="hero-stat">
                <p className="hero-stat-value">{totalSkillCount}</p>
                <p className="hero-stat-label">Technologies</p>
              </div>
            </div>
          </div>

          <div className="hidden gap-10 lg:grid">
            <div className="hero-float hero-float-delay glass-panel reveal reveal-delay-2 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🚀 Strong Work Ethic
            </div>
            <div className="hero-float glass-panel reveal reveal-delay-3 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🎯 Focused on Growth
            </div>
          </div>
        </div>

        <a href="#about" className="hero-scroll-cue" aria-label="Scroll to About section">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <section id="about" className="px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="showcase-panel reveal rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="split-panel">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-pink-200/90">Introduction</p>
                <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">About</h3>
                <p className="mt-4 text-slate-100/90">
                  I&apos;m Kin Ira J. Bantiling, a BS Computer Science student at PHINMA - SJCDC
                  building practical, real-world systems — from self-service kiosks to real-time
                  management platforms. I focus on web development, databases, and the small UX
                  details that make software genuinely pleasant to use.
                </p>
                <p className="mt-3 text-slate-100/90">
                  I like taking on projects that force me to solve problems end-to-end —
                  authentication and security, live data sync, and interfaces people don&apos;t
                  have to think twice about. My goal is to grow into a dependable Software Engineer
                  or AI Engineer who builds technology people can trust.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="project-chip">Full-Stack Development</span>
                  <span className="project-chip">Systems Design</span>
                  <span className="project-chip">Security-Conscious Builds</span>
                </div>
                <button
                  type="button"
                  onClick={openContactModal}
                  className="pink-button mt-7 inline-flex items-center justify-center rounded-full px-9 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Contact Me
                </button>
              </div>

              <div className="about-facts">
                <div className="about-fact">
                  <p className="about-fact-label">Role</p>
                  <p className="about-fact-value">BS Computer Science Student</p>
                </div>
                <div className="about-fact">
                  <p className="about-fact-label">School</p>
                  <p className="about-fact-value">PHINMA - SJCDC</p>
                </div>
                <div className="about-fact">
                  <p className="about-fact-label">Focus</p>
                  <p className="about-fact-value">Full-Stack Development &amp; Systems Design</p>
                </div>
                <div className="about-fact">
                  <p className="about-fact-label">Currently Building</p>
                  <p className="about-fact-value">Secret Grounds System</p>
                </div>
                <div className="about-fact">
                  <p className="about-fact-label">Goal</p>
                  <p className="about-fact-value">Software / AI Engineer</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="journey" className="section-ambient section-journey px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="showcase-panel rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="split-panel">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-rose-200/85">The Path</p>
                <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">Journey</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-300/60">
                  How I got here
                </p>
                <div className="journey-timeline mt-6">
                  {journeyTimeline.map((item) => (
                    <div key={item.label} className="journey-node">
                      <span className="journey-marker" aria-hidden />
                      <p className="text-xs uppercase tracking-[0.16em] text-pink-300/90">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{item.heading}</p>
                      <p className="mt-1 text-base font-semibold text-slate-300/90 sm:text-lg">
                        {item.subheading}
                      </p>
                      <p className="mt-3 text-sm text-slate-200/85">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div id="skills" className="skills-panel">
                <p className="text-xs uppercase tracking-[0.18em] text-rose-200/85">Capabilities</p>
                <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">Stack</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-300/60">
                  Languages, frameworks &amp; tools I build with
                </p>
                <div className="skill-marquee-group mt-6">
                  {skillMarqueeRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`skill-marquee${rowIndex % 2 === 1 ? " skill-marquee-reverse" : ""}`}
                    >
                      <div
                        className="skill-marquee-track"
                        style={{ "--marquee-duration": `${26 + rowIndex * 5}s` } as CSSProperties}
                      >
                        {[...row, ...row].map((skill, itemIndex) => (
                          <SkillChip
                            key={`${skill.name}-${itemIndex}`}
                            name={skill.name}
                            icon={skill.icon}
                            iconUrls={skill.iconUrls}
                            invertIcon={"invertIcon" in skill && skill.invertIcon === true}
                            glyph={skill.glyph}
                            duplicate={itemIndex >= row.length}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="work" className="section-ambient section-work px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="showcase-panel rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="work-heading">
              <p className="text-xs uppercase tracking-[0.18em] text-rose-200/85">Selected work</p>
              <h3 className="display-text text-3xl font-semibold sm:text-4xl">My Projects</h3>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-300/60">
                Systems, sites &amp; tools I&apos;ve designed and shipped
              </p>
            </div>
            <div className="project-grid mt-7">
              {selectedWorks.map((work) => (
              <article key={work.title} className="project-card">
                <div className={`project-visual project-visual-${work.visual}`} aria-hidden="true">
                  <div className="project-window">
                    <div className="project-window-bar">
                      <span />
                      <span />
                      <span />
                    </div>
                    {work.visual === "lounge" ? (
                      <div className="lounge-preview">
                        <div className="lounge-ring">
                          <span>PC-04</span>
                        </div>
                        <div className="lounge-status">
                          <span className="lounge-pill">LOCKED</span>
                          <span className="lounge-time">01:24:00</span>
                        </div>
                        <div className="lounge-bar" />
                      </div>
                    ) : null}
                    {work.visual === "portfolio" ? (
                      <div className="portfolio-preview">
                        <span className="portfolio-hero" />
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                    {work.visual === "library" ? (
                      <div className="library-preview">
                        <span className="library-search" />
                        <div>
                          <span />
                          <span />
                          <span />
                        </div>
                        <strong>AI</strong>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="project-type">{work.type}</p>
                <h4 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {work.title}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-100/86 sm:text-base">{work.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span key={tag} className="project-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="certificates" className="section-ambient px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="showcase-panel rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="certificate-header">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-pink-200/90">
                  Recognition
                </p>
                <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">
                  Certificates
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-300/60">
                  Milestones &amp; Achievements
                </p>
              </div>

              <div className="certificate-nav-group">
                <button
                  type="button"
                  onClick={() => scrollCertificates(-1)}
                  className="certificate-nav"
                  aria-label="Scroll to previous certificate"
                  disabled={!canScrollCertificatesPrev}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M15 6l-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCertificates(1)}
                  className="certificate-nav"
                  aria-label="Scroll to next certificate"
                  disabled={!canScrollCertificatesNext}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="certificate-rail-wrap mt-7">
              <div
                className={`certificate-fade certificate-fade-left${canScrollCertificatesPrev ? " is-visible" : ""}`}
                aria-hidden="true"
              />
              <div
                className={`certificate-fade certificate-fade-right${canScrollCertificatesNext ? " is-visible" : ""}`}
                aria-hidden="true"
              />

              <div
                ref={certificateRailRef}
                onScroll={updateCertificateScrollState}
                className="certificate-grid"
              >
                {certificates.map((certificate, index) => (
                  <article key={certificate.title} className="certificate-card" tabIndex={0}>
                    <div className="certificate-card-inner">
                      <div className="certificate-card-face certificate-card-front">
                        <div className="flex items-start justify-between gap-4">
                          <span className="certificate-index">{String(index + 1).padStart(2, "0")}</span>
                          <span className="certificate-year">{certificate.year}</span>
                        </div>
                        <p className="mt-5 text-xs uppercase tracking-[0.16em] text-rose-200/85">
                          {certificate.focus}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold leading-tight text-white">
                          {certificate.title}
                        </h4>
                        <p className="mt-4 text-sm leading-6 text-slate-200/78">{certificate.detail}</p>
                      </div>
                      <div className="certificate-card-face certificate-card-back">
                        <Image
                          src={certificate.image}
                          alt={`${certificate.title} certificate`}
                          fill
                          sizes="(min-width: 1024px) 340px, 84vw"
                          className="certificate-image"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="footer-shell px-5 pb-10 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center justify-center gap-4">
          <p className="w-full pr-14 text-center text-sm text-slate-300/85 sm:pr-0">
            &copy; 2026 Kin Ira | Built with React + Next.js
          </p>
        </div>
      </footer>

      {isContactOpen ? (
        <div className="contact-modal-backdrop" onClick={closeContactModal}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="contact-modal-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-pink-200/90">Contact</p>
                <h3 id="contact-modal-title" className="display-text mt-2 text-3xl font-semibold">
                  Let&apos;s Connect
                </h3>
              </div>
              <button
                type="button"
                onClick={closeContactModal}
                className="contact-modal-close"
                aria-label="Close contact dialog"
              >
                &times;
              </button>
            </div>
            <p className="mt-3 text-justify text-slate-100/90">
              Open to internships, collaborations, and growth opportunities.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="mailto:kinairahx@gmail.com"
                className="pink-button shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                kinairahx@gmail.com
              </a>
              <div className="flex shrink-0 items-center gap-3">
                <div
                  className="phone-reveal"
                  data-open={isPhoneNumberVisible ? "true" : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setIsPhoneNumberVisible((value) => !value)}
                    aria-expanded={isPhoneNumberVisible}
                    aria-controls="contact-phone-number"
                    aria-label="Show phone number"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/35 bg-pink-300/8 text-pink-100 transition hover:bg-pink-300/16"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-5 w-5 fill-current"
                    >
                      <path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>
                  </button>
                  <a
                    id="contact-phone-number"
                    href="tel:+639609309425"
                    className="phone-number-badge rounded-full border border-pink-200/35 bg-pink-300/10 px-4 py-2 text-sm font-semibold text-pink-100"
                  >
                    +63 960 930 9425
                  </a>
                </div>
                <a
                  href="https://www.linkedin.com/in/kin-ira-bantiling-38a0b6410"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/35 bg-pink-300/8 text-pink-100 transition hover:bg-pink-300/16"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/k-kinairah"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/35 bg-pink-300/8 text-pink-100 transition hover:bg-pink-300/16"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </a>
                <a
                  href="https://discord.com/users/863089308390653982"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord profile: kinairah"
                  title="Discord: kinairah"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-pink-200/35 bg-pink-300/8 text-pink-100 transition hover:bg-pink-300/16"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </main>
  );
}
