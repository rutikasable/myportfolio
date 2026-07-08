import { useEffect, useState, useRef } from 'react';
import { useAnimationControls, AnimatePresence, useScroll } from 'framer-motion';
import IntroText from './IntroText';
import BlackCurveTransition from './BlackCurveTransition';
import Countdown from './Countdown';
import CreamCurveTransition from './CreamCurveTransition';
import NameReveal from './NameReveal';
import Services from './Services';
import StatusBanner from './StatusBanner';
import About from './About';
import Contact from './Contact';

export default function Intro() {
  const introTextControls = useAnimationControls();
  const blackCurveControls = useAnimationControls();
  const countdownControls = useAnimationControls();
  const creamCurveControls = useAnimationControls();
  const nameRevealControls = useAnimationControls();
  
  const [showOverlays, setShowOverlays] = useState(true);

  const aboutRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "start start"]
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const sequence = async () => {
      try {
        // Step 1: "Are You Ready?" on black
        await introTextControls.start('animate');
        // Step 2: Black curve sweeps up
        await blackCurveControls.start('animate');
        // Step 3: Countdown 3 → 2 → 1 (container duration = 2.9s covers all digits)
        await countdownControls.start('animate');
        // Step 4: Cream curve sweeps down
        await creamCurveControls.start('animate');
        // Hide overlays — cream background is fully revealed
        setShowOverlays(false);
        // Step 5: Name + subtitle reveal
        await nameRevealControls.start('animate');
      } finally {
        // Always restore scrolling, even if sequence is interrupted
        document.body.style.overflow = '';
      }
    };

    sequence();

    return () => {
      document.body.style.overflow = '';
    };
  }, [
    introTextControls,
    blackCurveControls,
    countdownControls,
    creamCurveControls,
    nameRevealControls
  ]);

  return (
    <div className={`relative w-full bg-[#E6E4E0] ${showOverlays ? 'h-screen overflow-hidden' : ''}`}>
      {/* Landing Page Content - Only visible fully after intro completes */}
      <NameReveal controls={nameRevealControls} />

      {/* Expanded single-page layout sections */}
      {!showOverlays && (
        <>
          <Services />
          <StatusBanner scrollProgress={aboutScrollProgress} />
          <About containerRef={aboutRef} />
          <Contact />
        </>
      )}
      
      {/* Intro Overlays */}
      <AnimatePresence>
        {showOverlays && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <IntroText controls={introTextControls} />
            <BlackCurveTransition controls={blackCurveControls} />
            <Countdown controls={countdownControls} />
            <CreamCurveTransition controls={creamCurveControls} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}