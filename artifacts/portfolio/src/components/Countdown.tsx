import { motion, useAnimationControls } from 'framer-motion';

export default function Countdown({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          animate: {
            opacity: 1,
            // Duration covers all 3 digits: last digit starts at 2.0s, runs 0.9s → 2.9s total
            transition: { duration: 2.9 }
          }
        }}
        className="relative flex items-center justify-center"
      >
        <Number digit="3" delay={0} />
        <Number digit="2" delay={1.0} />
        <Number digit="1" delay={2.0} />
      </motion.div>
    </div>
  );
}

function Number({ digit, delay }: { digit: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      variants={{
        animate: {
          opacity: [0, 1, 0],
          scale: [0.85, 1, 1],
          transition: {
            duration: 0.9,
            times: [0, 0.5, 1],
            delay: delay,
            ease: "easeInOut"
          }
        }
      }}
      className="absolute text-white font-serif font-light text-[8rem] md:text-[12rem] tracking-tight leading-none"
    >
      {digit}
    </motion.div>
  );
}