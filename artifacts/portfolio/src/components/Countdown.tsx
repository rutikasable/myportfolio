import { motion, useAnimationControls } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

export default function Countdown({ controls }: { controls: ReturnType<typeof useAnimationControls> }) {
  const [animating, setAnimating] = useState(false);

  // Detect when animation starts by wrapping controls
  // We use onAnimationStart on the container to know when to begin the percentage count
  const handleAnimationStart = useCallback(() => {
    setAnimating(true);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          animate: {
            opacity: [0, 1, 1, 0],
            transition: {
              duration: 3.2,
              times: [0, 0.05, 0.9, 1],
              ease: 'easeInOut'
            }
          }
        }}
        onAnimationStart={handleAnimationStart}
        className="flex flex-col items-center gap-5 w-[260px] md:w-[360px]"
      >
        {/* Label + percentage */}
        <div className="flex items-baseline justify-between w-full px-0.5">
          <span className="text-white/60 text-[10px] md:text-xs font-mono tracking-[0.35em] uppercase">
            Loading
          </span>
          <PercentageCounter running={animating} />
        </div>

        {/* Progress track */}
        <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-white/90"
            initial={{ width: '0%' }}
            variants={{
              animate: {
                width: '100%',
                transition: { duration: 2.9, ease: [0.25, 0.1, 0.25, 1] }
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function PercentageCounter({ running }: { running: boolean }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!running) return;

    const duration = 2900;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <span className="text-white/80 text-[10px] md:text-xs font-mono tabular-nums">
      {pct}%
    </span>
  );
}