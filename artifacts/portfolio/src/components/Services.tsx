import { motion } from 'framer-motion';
import { MaskedHeading, WordReveal } from './AnimatedHelpers';

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export default function Services() {
  const serviceList = [
    {
      num: "01",
      title: "Full-Stack Development",
      description: "I build modern, scalable web applications from responsive frontends to powerful backend systems. I enjoy transforming ideas into functional products with clean architecture and seamless user experiences.",
      skills: ["React, Next.js, Node.js, Express.js", "MongoDB, REST APIs, Firebase", "Git, GitHub, Postman"]
    },
    {
      num: "02",
      title: "Frontend & UI Designing",
      description: "I create responsive, visually engaging interfaces that combine thoughtful design with smooth interactions. Every project is built with usability, performance, and attention to detail at its core.",
      skills: ["Next.js, React, Tailwind CSS", "Figma → Pixel-perfect Development", "HTML, CSS, JavaScript, GSAP"]
    },
    {
      num: "03",
      title: "Computer Science Foundations",
      description: "Beyond writing code, I focus on building efficient, reliable applications using strong computer science fundamentals. I continuously improve my problem-solving skills to create scalable and maintainable software.",
      skills: ["Data Structures & Algorithms", "DBMS, OOP, Operating Systems", "System Design Fundamentals & Problem Solving"]
    }
  ];

  return (
    <section id="services" className="w-full bg-[#1C1B1A] text-[#E6E4E0] py-20 px-6 md:py-32 md:px-12 rounded-t-[2.5rem] relative z-10" style={{ marginTop: '-2rem' }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-20">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-4 border-b border-neutral-800 pb-12">
          <MaskedHeading 
            text="What I Do" 
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
              (Services)
            </span>
            <WordReveal 
              text="I build modern web applications that blend thoughtful design, clean engineering, and seamless user experiences—always striving to create solutions that are both functional and impactful." 
              className="font-sans text-neutral-400 text-[1.1rem] md:text-[1.25rem] leading-relaxed max-w-[500px]" 
            />
          </motion.div>
        </div>

        {/* Cards list */}
        <div className="flex flex-col divide-y divide-neutral-800">
          {serviceList.map((service, idx) => (
            <motion.div 
              key={service.num}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-12 py-10 md:py-16 gap-6 md:gap-4 items-start"
            >
              <div className="col-span-1 md:col-span-2 font-sans font-extrabold text-[1.5rem] md:text-[2rem] text-neutral-600">
                ({service.num})
              </div>
              <div className="col-span-1 md:col-span-3 font-sans font-black text-[1.8rem] md:text-[2.2rem] text-[#E6E4E0] tracking-tight leading-none">
                {service.title}
              </div>
              <div className="col-span-1 md:col-span-7 flex flex-col gap-8">
                <WordReveal 
                  text={service.description} 
                  className="font-sans text-neutral-400 text-[1rem] md:text-[1.1rem] leading-relaxed max-w-[550px]" 
                />
                <div className="flex flex-col divide-y divide-neutral-900 border-t border-neutral-900">
                  {service.skills.map((skill, sIdx) => (
                    <div key={skill} className="flex gap-4 py-3 items-center text-[0.95rem] md:text-[1rem] font-sans font-semibold text-[#E6E4E0]">
                      <span className="font-mono text-neutral-600 text-[0.8rem]">{`0${sIdx + 1}`}</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
