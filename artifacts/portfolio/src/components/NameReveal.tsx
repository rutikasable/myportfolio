import { motion, useAnimationControls, useScroll, useTransform } from 'framer-motion';
import mapImage from '@assets/map_shadows_bw.png';
import { TextRoll, WordReveal } from './AnimatedHelpers';

export default function NameReveal({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  const name = "RUTIKA SABLE";
  const letters = name.split('');
  
  // Stagger timing for letters
  const lastLetterDelay = (letters.length - 1) * 0.05;
  const contentRevealDelay = lastLetterDelay + 0.5;

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: contentRevealDelay,
        ease: [0.16, 1, 0.3, 1] as const // Custom easeOutExpo
      }
    }
  };

  // Scroll-driven sticky effect: reads from window scroll
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 0.88]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const borderRadius = useTransform(scrollY, [0, 500], [0, 24]);

  return (
    <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
      <motion.div 
        initial="initial"
        animate={controls}
        style={{ scale, opacity, borderRadius }}
        className="relative h-full w-full flex flex-col justify-between p-6 md:p-10 select-none text-[#111111] bg-[#E6E4E0] origin-top"
      >
      {/* Header / Navbar */}
      <motion.header 
        variants={contentVariants}
        className="w-full flex justify-between items-center pt-2"
      >
        <span className="font-sans text-[0.9rem] md:text-[0.95rem] font-medium text-neutral-800">
          Web Developer & Designer
        </span>
        <nav className="flex gap-6 md:gap-8">
          {['Services', 'Works', 'About', 'Contact'].map((item) => (
            <TextRoll 
              key={item} 
              text={item}
              href={`#${item.toLowerCase()}`}
              className="text-[0.9rem] md:text-[0.95rem] font-medium text-neutral-800 hover:text-neutral-500 font-sans"
            />
          ))}
        </nav>
      </motion.header>

      {/* Main Big Title: ZUNED AALIM */}
      <div className="flex-1 flex flex-col justify-center items-center my-6 md:my-10">
        <motion.h1 
          className="flex flex-wrap justify-center font-sans font-black text-[9.5vw] md:text-[9.8vw] tracking-[-0.03em] leading-[0.85] text-neutral-900"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={{
                initial: { y: 40, opacity: 0, filter: 'blur(8px)' },
                animate: {
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1] as const
                  }
                }
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* Bottom Section (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-end pb-2">
        {/* Left Column: Arrow + Description + Contact Button */}
        <motion.div 
          variants={contentVariants}
          className="flex flex-col items-start text-left"
        >
          {/* Custom SVG Diagonal Arrow down-left */}
          <div className="text-neutral-700">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M24 8L8 24M8 24H20M8 24V12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <WordReveal 
            text="Designing and developing immersive digital experiences where creativity meets clean, modern engineering." 
            className="mt-4 font-sans text-neutral-700 text-[0.95rem] md:text-[1rem] leading-relaxed max-w-[290px]"
            delay={contentRevealDelay + 0.15}
          />
          <a href="mailto:contact@rutikasable.com" className="mt-6">
            <button className="group relative overflow-hidden px-7 py-4 bg-[#262524] text-white rounded-full font-sans text-[0.9rem] font-bold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer select-none border border-transparent shadow-sm">
              {/* Sweeping background fill */}
              <span className="absolute inset-0 z-10 block overflow-hidden rounded-full pointer-events-none">
                <span className="block h-full w-full translate-y-full rounded-t-[10rem] bg-[#E6E4E0] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:rounded-none" />
              </span>
              {/* Sliding text */}
              <span className="relative z-20 block overflow-hidden h-fit transition-colors duration-300">
                <span className="flex items-center gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] translate-y-0 group-hover:-translate-y-full text-[#E6E4E0] group-hover:text-[#262524]">
                  CONTACT <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
                <span aria-hidden="true" className="absolute top-0 left-0 w-full flex items-center gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] translate-y-full group-hover:translate-y-0 text-[#262524]">
                  CONTACT <span className="inline-block">↗</span>
                </span>
              </span>
            </button>
          </a>
        </motion.div>

        {/* Center Column: Black & White Map Image */}
        <motion.div 
          variants={contentVariants}
          className="flex justify-center items-center"
        >
          <div className="relative group overflow-hidden rounded-xl bg-neutral-300/40 border border-neutral-300/20 shadow-sm">
            <img 
              src={mapImage} 
              alt="Vintage Map on Wall with Window Shadows"
              className="w-[200px] md:w-[230px] aspect-[4/5] object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[800ms] ease-out"
            />
          </div>
        </motion.div>

        {/* Right Column: Availability Badge + Date */}
        <motion.div 
          variants={contentVariants}
          className="flex flex-col items-start md:items-end justify-end h-full text-left md:text-right"
        >
          <span className="font-mono text-neutral-500 text-[0.75rem] tracking-[0.2em] uppercase font-bold">
            AVAILABLE FOR WORK
          </span>
          <span className="font-sans font-black text-[2.8rem] md:text-[4rem] leading-none text-neutral-800 mt-1">
            JUL'26
          </span>
        </motion.div>
      </div>
      </motion.div>
    </div>
  );
}