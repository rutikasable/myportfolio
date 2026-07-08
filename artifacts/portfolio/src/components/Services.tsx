
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MaskedHeading, WordReveal } from './AnimatedHelpers';

const services = [
  {
    num: "01",
    title: "Full-Stack Development",
    description: "I build modern, scalable web applications from responsive frontends to powerful backend systems. I enjoy transforming ideas into functional products with clean architecture and seamless user experiences.",
    skills: ["React, Next.js, Node.js, Express.js", "MongoDB, REST APIs, Firebase", "Git, GitHub, Postman"],
  },
  {
    num: "02",
    title: "Frontend & UI Designing",
    description: "I create responsive, visually engaging interfaces that combine thoughtful design with smooth interactions. Every project is built with usability, performance, and attention to detail at its core.",
    skills: ["Next.js, React, Tailwind CSS", "Figma → Pixel-perfect Development", "HTML, CSS, JavaScript, GSAP"],
  },
  {
    num: "03",
    title: "Computer Science Foundations",
    description: "Beyond writing code, I focus on building efficient, reliable applications using strong computer science fundamentals. I continuously improve my problem-solving skills to create scalable and maintainable software.",
    skills: ["Data Structures & Algorithms", "DBMS, OOP, Operating Systems", "System Design Fundamentals & Problem Solving"],
  },
];

const BG = '#1C1B1A';

/*
 * ════════════════════════════════════════════════════════════════════════
 *  STACKING ARCHITECTURE — "Books on a table"
 * ════════════════════════════════════════════════════════════════════════
 *
 *  ┌─ .svc-card (position: sticky; top: 0; z-index: 10) ──────────┐
 *  │  .svc-row  (header — number + title)                          │
 *  │  .svc-body (description + skills)                             │
 *  └───────────────────────────────────────────────────────────────┘
 *  ┌─ .svc-card (position: sticky; top: h1; z-index: 11) ─────────┐
 *  │  .svc-row                                                     │
 *  │  .svc-body                                                    │
 *  └───────────────────────────────────────────────────────────────┘
 *  ┌─ .svc-card (position: sticky; top: h1+h2; z-index: 12) ──────┐
 *  │  .svc-row                                                     │
 *  │  .svc-body                                                    │
 *  └───────────────────────────────────────────────────────────────┘
 *  <div style={{ height: '60vh' }} />  ← scroll-space sentinel
 *
 *  How it works:
 *  • Each FULL card (header + body) is sticky. Nothing inside the card moves.
 *  • Card N sticks at top: (h₁ + h₂ + … + hₙ₋₁), i.e., right below every
 *    previous card's header row.
 *  • z-index increases with each card, so the incoming card always paints
 *    ON TOP of every card before it.
 *  • The opaque background (#1C1B1A) means the incoming card COVERS the
 *    previous card's body — the body does not move, it is simply hidden.
 *  • The previous card's header (0px to hₙ) is above the incoming card's
 *    top edge (hₙ), so it stays permanently visible.
 *  • The 60vh sentinel at the bottom gives enough scroll-space for the last
 *    stacked state to remain comfortable on screen before the section ends.
 *
 * ════════════════════════════════════════════════════════════════════════
 */

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });
  const exitY = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"]);

  // Ref to each header row so we can measure its rendered height
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // topOffsets[i] = sum of all previous header heights
  // = the `top` value where card i will stick
  const [topOffsets, setTopOffsets] = useState<number[]>(
    services.map(() => 0),
  );

  const recalcOffsets = useCallback(() => {
    const offsets: number[] = [];
    let cumulative = 0;
    rowRefs.current.forEach((el) => {
      offsets.push(cumulative);
      if (el) cumulative += el.getBoundingClientRect().height;
    });
    setTopOffsets(offsets);
  }, []);

  useLayoutEffect(() => {
    recalcOffsets();
    window.addEventListener('resize', recalcOffsets);
    return () => window.removeEventListener('resize', recalcOffsets);
  }, [recalcOffsets]);

  return (
    <>
      <style>{`
        /* ─────────────────────────────────────────────────────────────
         * .svc-card — the sticky unit.
         * The ENTIRE card (header + body) sticks together.
         * This is the key difference from the old broken approach
         * (which only made .svc-row sticky, causing the body to
         * scroll away and headers to push each other).
         * ─────────────────────────────────────────────────────────────*/
        .svc-card {
          position: sticky;
          background: ${BG};
        }

        /* ─────────────────────────────────────────────────────────────
         * .svc-row — header row: number + title.
         * NOT individually sticky. The parent .svc-card handles that.
         * ─────────────────────────────────────────────────────────────*/
        .svc-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem 0;
          background: ${BG};
          border-top: 1px solid rgba(255,255,255,0.08);
          box-sizing: border-box;
        }

        .svc-num {
          font-family: sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #525252;
          line-height: 1;
          white-space: nowrap;
        }

        .svc-title {
          font-family: sans-serif;
          font-weight: 900;
          font-size: 2.5rem;
          color: #E6E4E0;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 639px) {
          .svc-row {
            grid-template-columns: 60px 1fr;
            gap: 0.75rem;
            padding: 1.1rem 0;
          }
          .svc-num   { font-size: 0.95rem; }
          .svc-title {
            font-size: 1.55rem;
            white-space: normal;
          }
        }
        @media (min-width: 768px) {
          .svc-num   { font-size: 1.75rem; }
          .svc-title { font-size: 3rem; }
        }
        @media (min-width: 1024px) {
          .svc-title { font-size: 3.6rem; }
        }

        /* ── Body: description + skills ── */
        .svc-body {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.5rem;
          padding: 2.5rem 0 5rem;
          background: ${BG};
          position: relative;
        }
        @media (max-width: 639px) {
          .svc-body {
            grid-template-columns: 1fr;
            padding: 1.5rem 0 4rem;
          }
        }

        /* ── Skills list ── */
        .svc-skills-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 1.5rem;
        }
        .svc-skill-item {
          display: flex;
          gap: 1.25rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          align-items: center;
          font-size: 1rem;
          font-weight: 700;
          color: #E6E4E0;
        }
        .svc-skill-num {
          font-family: monospace;
          font-size: 0.75rem;
          color: #525252;
          min-width: 1.6rem;
        }
      `}</style>

      <section
        id="services"
        className="w-full bg-[#1C1B1A] text-[#E6E4E0] rounded-t-[2.5rem] relative z-10"
        style={{
          marginTop: '-2rem',
          paddingTop: '5rem',
          paddingBottom: '0px',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col">

          {/* ── Section header ── */}
          <div
            className="flex flex-col items-start gap-6"
            style={{
              marginBottom: '5rem',
            }}
          >
            <MaskedHeading
              text="What I Do"
              className="font-sans font-black text-[2.5rem] md:text-[3.5rem] leading-none uppercase tracking-tight text-[#E6E4E0]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4 text-left"
            >
              <span className="font-mono text-neutral-500 text-[0.8rem] tracking-[0.2em] uppercase font-bold">
                (Services)
              </span>
              <WordReveal
                text="I build modern web applications that blend thoughtful design, clean engineering, and seamless user experiences—always striving to create solutions that are both functional and impactful."
                className="font-sans text-neutral-400 text-[1.1rem] md:text-[1.25rem] leading-relaxed max-w-[650px]"
              />
            </motion.div>
          </div>

          {/* ── Stacking card list ──────────────────────────────────────
           *
           *  Each card is a standalone sticky block.
           *  Cards stack progressively as the user scrolls.
           *  The inner div (position: relative) acts as the containing
           *  block so each sticky card is bounded to this section and
           *  does not "escape" into the next section below.
           *
           * ──────────────────────────────────────────────────────────── */}
          <div ref={containerRef} style={{ position: 'relative' }}>

            {services.map((service, idx) => (
              <motion.div
                key={service.num}
                className="svc-card"
                style={{
                  // Each card sticks immediately below all previous headers
                  top: `${topOffsets[idx] ?? 0}px`,
                  // Higher z-index = incoming card paints over previous card's body
                  zIndex: 10 + idx,
                  y: exitY,
                }}
              >
                {/* Header: ref'd so we can measure its height for the next card's top */}
                <div
                  ref={(el) => { rowRefs.current[idx] = el; }}
                  className="svc-row"
                >
                  <motion.span 
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="svc-num"
                  >
                    ({service.num})
                  </motion.span>
                  <MaskedHeading 
                    text={service.title} 
                    className="svc-title" 
                  />
                </div>

                {/* Body: static — NEVER translated, NEVER moved.
                 *  It disappears only because the next card slides over it. */}
                <div className="svc-body">
                  {/* Spacer column: pushes content into the title column */}
                  <div aria-hidden="true" />
                  <div>
                    <WordReveal
                      text={service.description}
                      className="font-sans text-neutral-400 text-[1rem] md:text-[1.05rem] leading-relaxed max-w-[580px]"
                    />
                    <div className="svc-skills-list">
                      {services[idx].skills.map((skill, sIdx) => (
                        <motion.div 
                          key={skill} 
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ duration: 0.5, delay: sIdx * 0.1 }}
                          className="svc-skill-item"
                        >
                          <span className="svc-skill-num">0{sIdx + 1}</span>
                          <span>{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div aria-hidden="true" style={{ height: '100vh' }} />

          </div>
        </div>
      </section>
    </>
  );
}
