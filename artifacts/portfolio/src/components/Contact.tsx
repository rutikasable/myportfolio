import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TextRoll, MaskedHeading } from './AnimatedHelpers';

export default function Contact() {
  const [timeStr, setTimeStr] = useState("Loading...");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      };
      // Format Indian Standard Time or Local user time
      const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="w-full bg-[#1C1B1A] text-[#E6E4E0] py-20 px-6 md:py-32 md:px-12 rounded-t-[2.5rem] relative z-10 border-t border-neutral-900 mt-[-2rem]">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Top CTA */}
        <div className="flex flex-col items-start gap-6">
          <MaskedHeading 
            text="Have a project in mind?"
            className="font-sans font-black text-[6.5vw] sm:text-[4rem] md:text-[5rem] tracking-tight leading-none text-[#E6E4E0] uppercase whitespace-nowrap"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a href="mailto:sablerutika@gmail.com" className="inline-block mt-4">
              <button className="group relative overflow-hidden px-8 py-5 bg-[#E6E4E0] text-[#1C1B1A] rounded-full font-sans text-[1.1rem] font-bold tracking-wide inline-flex items-center justify-center gap-3 cursor-pointer select-none shadow-md border border-transparent">
                {/* Sweeping background fill */}
                <span className="absolute inset-0 z-10 block overflow-hidden rounded-full pointer-events-none">
                  <span className="block h-full w-full translate-y-full rounded-t-[10rem] bg-[#1C1B1A] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:rounded-none" />
                </span>
                {/* Sliding text */}
                <span className="relative z-20 block overflow-hidden h-fit transition-colors duration-300">
                  <span className="flex items-center gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] translate-y-0 group-hover:-translate-y-full text-[#1C1B1A] group-hover:text-[#E6E4E0]">
                    Get a quote <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                  <span aria-hidden="true" className="absolute top-0 left-0 w-full flex items-center gap-1.5 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] translate-y-full group-hover:translate-y-0 text-[#E6E4E0]">
                    Get a quote <span className="inline-block">↗</span>
                  </span>
                </span>
              </button>
            </a>
          </motion.div>
        </div>

        {/* Navigation, Socials and Local Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-12 border-t border-neutral-800 pt-16 mt-8">
          
          {/* Menu */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-neutral-500 text-[0.75rem] tracking-[0.2em] uppercase font-bold">
              Menu
            </span>
            <ul className="flex flex-col gap-3 font-sans font-semibold text-[1rem]">
              {[
                { name: 'Home', link: '#' },
                { name: 'Services', link: '#services' },
                { name: 'Works', link: '#works' },
                { name: 'About', link: '#about' },
                { name: 'Contact', link: '#contact' }
              ].map((item) => (
                <li key={item.name}>
                  <TextRoll 
                    text={item.name} 
                    href={item.link} 
                    className="text-neutral-400 hover:text-white transition-colors duration-200" 
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-neutral-500 text-[0.75rem] tracking-[0.2em] uppercase font-bold">
              Socials
            </span>
            <ul className="flex flex-col gap-3 font-sans font-semibold text-[1rem]">
              {[
                { name: 'LinkedIn ↗', url: 'https://www.linkedin.com/in/rutika-sable-321390321/' },
                { name: 'Instagram ↗', url: 'https://www.instagram.com/rutikasable_19/' },
                { name: 'GitHub ↗', url: 'https://github.com/rutikasable' }
              ].map((item) => (
                <li key={item.name}>
                  <TextRoll 
                    text={item.name} 
                    href={item.url} 
                    className="text-neutral-400 hover:text-white transition-colors duration-200" 
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Local Time Info */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4 text-left md:text-right md:items-end">
            <span className="font-mono text-neutral-500 text-[0.75rem] tracking-[0.2em] uppercase font-bold">
              Local Time
            </span>
            <span className="font-mono text-[#E6E4E0] text-[1.1rem] font-bold">
              {timeStr}
            </span>
          </div>

        </div>

        {/* Footer Credit Line */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-neutral-900 pt-8 mt-4 text-[0.85rem] font-mono text-neutral-600">
          <span>&copy; {new Date().getFullYear()} RUTIKA SABLE</span>
          <span className="mt-2 sm:mt-0">Designed &amp; Built by Rutika Sable</span>
        </div>

      </div>
    </footer>
  );
}
