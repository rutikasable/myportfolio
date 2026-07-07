import { motion, useAnimationControls } from 'framer-motion';

export default function NameReveal({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  const name = "Rutika Sable";
  const letters = name.split('');
  
  // Calculate timing so the subtitle starts exactly 0.6s after the last letter's animation begins
  const lastLetterDelay = (letters.length - 1) * 0.06;
  const subtitleDelay = lastLetterDelay + 0.6; 

  return (
    <div className="flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial="initial"
        animate={controls}
        className="flex text-[#111111] font-serif font-light text-[3.5rem] sm:text-[5rem] md:text-[7rem] tracking-[0.08em] leading-none"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={{
              initial: { y: 25, opacity: 0, filter: 'blur(4px)' },
              animate: {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: "easeOut"
                }
              }
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={controls}
        variants={{
          animate: {
            opacity: 0.7,
            y: 0,
            transition: {
              duration: 0.6,
              delay: subtitleDelay,
              ease: "easeOut"
            }
          }
        }}
        className="mt-4 md:mt-6 text-[#111111] font-sans font-light text-[0.8rem] md:text-[1rem] tracking-[0.25em] uppercase"
      >
        Full Stack Developer
      </motion.div>
    </div>
  );
}