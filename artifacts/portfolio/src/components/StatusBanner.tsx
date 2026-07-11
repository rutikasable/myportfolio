import { motion, useTransform } from 'framer-motion';
import { MaskedHeading, WordReveal } from './AnimatedHelpers';

export default function StatusBanner({ scrollProgress }: { scrollProgress: any }) {
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollProgress, [0, 0.8], [1, 0]);
  const borderRadius = useTransform(scrollProgress, [0, 1], [0, 24]);

  return (
    <div id="works" className="relative w-full h-[180vh] mt-[-100vh] z-20">
      <section 
        className="sticky top-0 h-screen w-full z-0 overflow-hidden bg-[#1C1B1A] flex items-center"
      >
        <motion.div 
          style={{ scale, opacity, borderRadius }}
          className="relative h-full w-full flex flex-col justify-center px-6 md:px-12 bg-[#1C1B1A] origin-top text-[#E6E4E0]"
        >
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-16">
            
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-neutral-800 pb-12">
              <MaskedHeading 
                text="Status" 
                className="font-sans font-black text-[2.5rem] md:text-[3.5rem] leading-none uppercase tracking-tight text-[#E6E4E0]" 
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="font-mono text-neutral-500 text-[0.8rem] tracking-[0.2em] uppercase font-bold">
                  (Current Focus)
                </span>
              </motion.div>
            </div>

            {/* Big Student Statement */}
            <div className="py-6 md:py-12">
              <WordReveal 
                text="Currently pursuing my degree, actively looking for internship opportunities and freelance projects worldwide." 
                className="font-sans font-black text-[1.8rem] sm:text-[2.8rem] md:text-[3.8rem] leading-tight tracking-tight text-[#E6E4E0] max-w-[900px]" 
              />
            </div>

          </div>
        </motion.div>
      </section>
    </div>
  );
}
