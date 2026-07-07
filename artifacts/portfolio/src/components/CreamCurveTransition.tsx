import { motion, useAnimationControls } from 'framer-motion';

export default function CreamCurveTransition({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  return (
    <motion.div
      // Starts with bottom of SVG just above the viewport top.
      initial={{ y: "-135vh" }}
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
      className="fixed inset-0 z-40 flex flex-col pointer-events-none"
    >
      <div className="w-full h-[120vh] bg-[#F6F1E8]" />
      <svg 
        className="w-full h-[15vh] fill-[#F6F1E8] absolute top-full left-0 transform -translate-y-[1px]" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d="M0 0 Q 50 100 100 0 Z" />
      </svg>
    </motion.div>
  );
}