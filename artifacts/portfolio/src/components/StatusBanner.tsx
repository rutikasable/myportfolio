import { motion } from 'framer-motion';
import { MaskedHeading, WordReveal } from './AnimatedHelpers';

export default function StatusBanner() {
  return (
    <section id="works" className="w-full bg-[#1C1B1A] text-[#E6E4E0] py-28 px-6 md:py-40 md:px-12 border-t border-neutral-800 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-4 border-b border-neutral-800 pb-12">
          <MaskedHeading 
            text="Status" 
            className="col-span-1 md:col-span-5 font-sans font-black text-[2.5rem] md:text-[3.5rem] leading-none uppercase tracking-tight text-[#E6E4E0]" 
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-1 md:col-span-7 flex flex-col gap-4 text-left"
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
    </section>
  );
}
