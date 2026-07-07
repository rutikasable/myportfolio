import { motion, useAnimationControls } from 'framer-motion';

export default function BlackCurveTransition({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  return (
    <motion.div
      // 100vh of body + 15vh of SVG curve sticking up.
      // Top of SVG starts at 100vh (just off bottom of screen)
      initial={{ y: "115vh" }}
      animate={controls}
      variants={{
        animate: {
          y: "0vh",
          transition: {
            duration: 1.2,
            ease: "easeInOut"
          }
        }
      }}
      className="fixed inset-0 z-20 flex flex-col pointer-events-none"
    >
      <svg 
        className="w-full h-[15vh] fill-[#111111] absolute bottom-full left-0 transform translate-y-[1px]" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d="M0 100 Q 50 0 100 100 Z" />
      </svg>
      <div className="w-full h-[120vh] bg-[#111111]" />
    </motion.div>
  );
}