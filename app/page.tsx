"use client";

import { useEffect, useState } from "react";

const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["PHP", "Python", "Java", "C#", "Django", "MySQL", "SQL"],
  },
  {
    title: "AI & Tools",
    items: ["AI Fundamentals", "Botpress", "Prompt Engineering Basics", "Git & GitHub", "VS Code", "Data Modeling"],
  },
];

const journeyTimeline = [
  {
    stage: "College",
    school: "PHINMA - SJCDC",
    credential: "BS Computer Science",
    focus: "Focused on software engineering, web development, and database systems.",
  },
  {
    stage: "Senior High",
    school: "Rosario Institute",
    credential: "ICT Strand",
    focus: "Built core technical foundations and strengthened practical computing skills.",
  },
  {
    stage: "Junior High",
    school: "Bagbag National High School",
    credential: "Secondary Education",
    focus: "Developed consistent study habits and an early interest in technology.",
  },
  {
    stage: "Elementary",
    school: "Silangan Elementary School",
    credential: "Primary Education",
    focus: "Started the learning journey with strong fundamentals and discipline.",
  },
];

const selectedWorks = [
  {
    title: "Social Clinic System",
    summary:
      "Contributed to login and frontend flows, improving usability for patient data handling.",
    tags: ["Frontend", "JavaScript", "Clinic Workflow"],
    type: "Patient workflow",
    visual: "clinic",
  },
  {
    title: "Academic Portfolio Site",
    summary:
      "Built a personal web portfolio with responsive layout, section-based navigation, and custom styling.",
    tags: ["Next.js", "Tailwind", "UI"],
    type: "Personal website",
    visual: "portfolio",
  },
  {
    title: "Smart Library System",
    summary:
      "An AI-powered full-stack library system for school self-service. It supports book search, availability checking, borrowing, receipts, active loan tracking, personalized recommendations, admin management, fines, reports, and analytics.",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "XAMPP", "SQL"],
    type: "Full-stack system",
    visual: "library",
  },
];

const certificates = [
  {
    title: "New Generation of Thaddean Servant Leaders",
    year: "2024",
    focus: "Leadership",
    detail: "Recognized for servant leadership, character, and campus involvement.",
  },
  {
    title: "Chasing Dreams with Grit & Determination",
    year: "2025",
    focus: "Personal Growth",
    detail: "Completed a development program centered on resilience, ambition, and discipline.",
  },
  {
    title:
      'IN2ITION 2026: 5th Philippine Youth Internet Governance Forum (PhYIGF), with the theme "Empowering Filipino Youth in Shaping a trusted digital future"',
    year: "2026",
    focus: "Digital Future",
    detail: "Joined youth-focused discussions on internet governance and trusted digital spaces.",
  },
];

const botpressThemeConfig = {
  botName: "cinie ୨୧",
  botDescription: "Hi, I'm cinie ୨୧. I can help you get to know Kin!",
  composerPlaceholder: "Type your message...",
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
        radial-gradient(95% 88% at 100% 12%, rgba(56, 189, 248, 0.11) 0%, rgba(56, 189, 248, 0) 72%),
        linear-gradient(165deg, rgba(15, 18, 38, 0.96) 0%, rgba(8, 13, 31, 0.98) 100%) !important;
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
        linear-gradient(180deg, rgba(15, 18, 38, 0.9) 0%, rgba(10, 14, 34, 0.88) 100%) !important;
      color: #fce7f3 !important;
    }

    .bpHeaderContentTitle,
    .bpHeaderContentDescription,
    .bpHeaderContentActionsIcons {
      color: #fce7f3 !important;
    }

    .bpHeaderContentTitle {
      font-size: 0.92rem !important;
    }

    .bpHeaderContentDescription {
      display: none !important;
    }

    .bpHeaderContentAvatarFallback,
    .bpMessageAvatarFallback,
    .bpFabContainer {
      background:
        radial-gradient(circle at 32% 20%, rgba(255, 255, 255, 0.95) 0 13%, transparent 14%),
        radial-gradient(circle at 72% 76%, rgba(56, 189, 248, 0.54) 0%, transparent 38%),
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
        linear-gradient(165deg, rgba(15, 18, 38, 0.76) 0%, rgba(10, 14, 34, 0.86) 100%) !important;
      color: rgba(248, 250, 252, 0.94) !important;
      box-shadow: 0 10px 24px rgba(3, 6, 23, 0.18) !important;
    }

    .bpComposerWrapper {
      border-top: 1px solid rgba(244, 114, 182, 0.16) !important;
      background: rgba(7, 10, 24, 0.34) !important;
    }

    .bpComposerContainer {
      border: 1px solid rgba(244, 114, 182, 0.34) !important;
      border-radius: 999px !important;
      background: rgba(7, 10, 24, 0.68) !important;
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
      background: linear-gradient(135deg, #f472b6 0%, #ec4899 82%, #38bdf8 160%) !important;
    }
  `,
};

const botpressInjectScriptUrl = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
const botpressConfigScriptUrl =
  "https://files.bpcontent.cloud/2026/05/25/22/20260525220919-6XQCO6RS.js";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);

  const openContactModal = () => {
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
    setIsPhoneNumberVisible(false);
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
      <header className="glass-panel sticky top-0 z-30 border-x-0 border-t-0 rounded-none px-5 py-4 sm:px-8 lg:px-12">
        <nav className="mx-auto flex w-full max-w-[1700px] items-center justify-between gap-4">
          <p className="text-base font-semibold tracking-wide sm:text-lg">Kin Ira J. Bantiling</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/95 sm:gap-7">
            <a href="#about" className="transition hover:text-pink-300">
              About
            </a>
            <a href="#journey" className="transition hover:text-pink-300">
              Journey
            </a>
            <a href="#skills" className="transition hover:text-pink-300">
              Skills
            </a>
            <a href="#work" className="transition hover:text-pink-300">
              Work
            </a>
            <a href="#certificates" className="transition hover:text-pink-300">
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

      <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="mx-auto grid w-full max-w-[1700px] items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden gap-10 lg:grid">
            <div className="glass-panel reveal rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🤖 Future Software Engineer
            </div>
            <div className="glass-panel reveal reveal-delay-1 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
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
          </div>

          <div className="hidden gap-10 lg:grid">
            <div className="glass-panel reveal reveal-delay-2 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🚀 Strong Work Ethic
            </div>
            <div className="glass-panel reveal reveal-delay-3 rounded-2xl px-4 py-3 text-sm text-slate-200/95">
              🎯 Focused on Growth
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="glass-panel reveal rounded-3xl border-b-0 p-6 sm:p-8 lg:p-10">
            <h3 className="display-text text-3xl font-semibold">About</h3>
            <p className="mt-4 w-full max-w-none text-justify text-slate-100/90">
              I&apos;m Kin Ira J. Bantiling, a BS Computer Science student at PHINMA - SJCDC and a
              consistent Dean&apos;s Lister. I build practical systems that improve real workflows, with
              hands-on focus on web development, databases, and user experience. My goal is to grow into a
              dependable Software Engineer or AI Engineer who builds technology people can trust and use.
            </p>
            <button
              type="button"
              onClick={openContactModal}
              className="footer-contact-button mt-6 rounded-full px-5 py-2 text-sm font-semibold"
            >
              Contact Me
            </button>
          </article>
        </div>
      </section>

      <section id="journey" className="section-ambient section-journey px-5 py-10 sm:px-8 sm:py-11 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <h3 className="display-text text-center text-3xl font-semibold sm:text-4xl">Journey</h3>
          <div className="journey-timeline mt-8">
            {journeyTimeline.map((item, index) => (
              <article
                key={item.stage}
                className={`journey-node ${index % 2 === 0 ? "journey-node-left" : "journey-node-right"}`}
              >
                <span className="journey-marker" aria-hidden />
                <div className="journey-card-wrap">
                  <div className="journey-card rounded-3xl p-4 sm:p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">{item.stage}</p>
                    <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{item.school}</p>
                    <p className="mt-1 text-base font-semibold text-slate-300/90 sm:text-lg">{item.credential}</p>
                    <p className="mt-3 text-sm text-slate-200/85">{item.focus}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-ambient section-skills px-5 py-10 sm:px-8 sm:py-11 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <h3 className="display-text text-center text-3xl font-semibold sm:text-4xl">
            Technical Proficiency
          </h3>
          <div className="skill-grid mt-6">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                tabIndex={0}
                className="skill-card rounded-3xl p-5 sm:p-6"
              >
                <p className="skill-card-title text-center text-2xl font-semibold sm:text-3xl">
                  {group.title}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip px-3.5 py-1.5 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section-ambient section-work px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <div className="work-heading">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/85">Selected work</p>
              <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">My Projects</h3>
            </div>
          </div>
          <div className="project-grid mt-5">
            {selectedWorks.map((work) => (
              <article key={work.title} className="project-card">
                <div className={`project-visual project-visual-${work.visual}`} aria-hidden="true">
                  <div className="project-window">
                    <div className="project-window-bar">
                      <span />
                      <span />
                      <span />
                    </div>
                    {work.visual === "clinic" ? (
                      <div className="clinic-preview">
                        <div className="clinic-stat">
                          <span />
                          <strong>24</strong>
                        </div>
                        <div className="clinic-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="clinic-pulse" />
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
        </div>
      </section>

      <section id="certificates" className="section-ambient px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1700px]">
          <article className="certificate-showcase rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="certificate-header">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-pink-200/90">
                  Milestones
                </p>
                <h3 className="display-text mt-2 text-3xl font-semibold sm:text-4xl">
                  Certificates
                </h3>
              </div>
            </div>

            <div className="certificate-grid mt-7">
              {certificates.map((certificate, index) => (
                <article
                  key={certificate.title}
                  className={index === 2 ? "certificate-card certificate-card-featured" : "certificate-card"}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="certificate-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="certificate-year">{certificate.year}</span>
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-cyan-200/85">
                    {certificate.focus}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold leading-tight text-white">
                    {certificate.title}
                  </h4>
                  <p className="mt-4 text-sm leading-6 text-slate-200/78">{certificate.detail}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <footer className="footer-shell px-5 pb-10 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col items-center justify-center gap-4">
          <p className="w-full text-center text-sm text-slate-300/85">
            &copy; 2026 Kin Ira J. Bantiling | Built with Next.js.
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
                    href="tel:+639068842737"
                    className="phone-number-badge rounded-full border border-pink-200/35 bg-pink-300/10 px-4 py-2 text-sm font-semibold text-pink-100"
                  >
                    +63 906 884 2737
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
