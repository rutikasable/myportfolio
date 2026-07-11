import React from 'react';
import { motion } from 'framer-motion';
import { MaskedHeading, WordReveal } from './AnimatedHelpers';

export default function About({ containerRef }: { containerRef?: React.RefObject<HTMLDivElement> }) {
  const skillsData = [
    {
      category: "Languages & Tools",
      skills: ["Python", "SQL", "C++", "Java", "Typescript", "JavaScript", "Git", "Postman", "Docker", "Firebase", "Kubernetes"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Node.js", "Express.js", "Redux", "SupaBase", "TailwindCSS", "Framer Motion", "GSAP"]
    },
    {
      category: "Core CS Concepts",
      skills: ["DSA", "DBMS", "OOP", "Operating Systems", "System Design"]
    }
  ];

  return (
    <section ref={containerRef} id="about" className="w-full bg-[#E6E4E0] text-[#111111] py-20 px-6 md:py-32 md:px-12 rounded-t-[2.5rem] relative z-10 mt-[-2rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">

        {/* Animated Headline */}
        <div className="flex flex-col select-none overflow-hidden pb-4">
          {["DEVELOPER", "DESIGNER", "ARTIST"].map((word, wIdx) => (
            <MaskedHeading
              key={word}
              text={word}
              className={`font-sans font-black text-[12vw] md:text-[8vw] leading-[0.85] tracking-tight uppercase ${wIdx === 1 ? 'text-neutral-400' : 'text-neutral-900'
                }`}
            />
          ))}
        </div>

        {/* Narrative & Biography Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-4"
          >
            <span className="font-mono text-neutral-500 text-[0.8rem] tracking-[0.2em] uppercase font-bold">
              (About Me)
            </span>
          </motion.div>
          <div className="col-span-1 md:col-span-8 flex flex-col gap-8 text-[1.15rem] md:text-[1.3rem] font-sans font-medium text-neutral-800 leading-relaxed max-w-[650px]">
            <WordReveal
              text="I believe the best experiences are built by understanding the details others overlook. I enjoy diving deep into complex systems and refining them until they feel simple and effortless. That's the kind of engineering that inspires me."
              className="text-neutral-900 font-bold text-[1.3rem] md:text-[1.6rem]"
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 border-t border-neutral-300/40 pt-16 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-4"
          >
            <MaskedHeading
              text="Skills"
              className="font-sans font-black text-[2.5rem] leading-none uppercase tracking-tight text-neutral-900"
            />
          </motion.div>
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category, catIdx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="flex flex-col gap-4"
              >
                <h4 className="font-sans font-bold text-[1.1rem] text-neutral-500 uppercase tracking-wider">
                  {category.category}
                </h4>
                <ul className="flex flex-wrap gap-2 md:flex-col md:items-start md:gap-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-sans font-semibold text-[0.95rem] md:text-[1.05rem] text-neutral-800 bg-neutral-300/20 px-3 py-1.5 rounded-md border border-neutral-300/40 md:bg-transparent md:p-0 md:border-0 hover:text-neutral-500 transition-colors duration-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
