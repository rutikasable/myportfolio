import { motion, useAnimationControls } from 'framer-motion';

export default function IntroText({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
      {/* Background Layer: Starts black, fades to transparent at 1.8s -> 2.6s */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={controls}
        variants={{
          animate: {
            opacity: [1, 1, 0],
            transition: {
              duration: 2.6,
              times: [0, 1.8/2.6, 1],
              ease: "easeInOut"
            }
          }
        }}
        className="absolute inset-0 bg-[#111111]"
      />
      
      {/* Text Layer: Fades in, holds, fades out in sync with the background */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          animate: {
            opacity: [0, 1, 1, 0],
            transition: {
              duration: 2.6,
              times: [0, 0.8/2.6, 1.8/2.6, 1],
              ease: "easeInOut"
            }
          }
        }}
        className="relative z-10 text-white font-serif font-light text-[2.5rem] md:text-5xl uppercase tracking-[0.15em] text-center px-4"
      >
        Are You Ready?
      </motion.h1>
    </div>
  );
}