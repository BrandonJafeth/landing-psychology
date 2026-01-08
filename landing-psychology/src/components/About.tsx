import React from 'react';
import { motion } from 'framer-motion';
import siteData from '../data/site.json';

const About = () => {
  const { about } = siteData;

  return (
    <section id="sobre-mi" className="relative w-full py-12 md:py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Column - Creative Layout */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end min-h-[500px] md:min-h-[600px]">
            {/* Abstract Background Shapes */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-[#61B39C]/10 rounded-full blur-3xl z-0"
            />
            
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-10 -right-10 w-40 h-40 bg-[#559A95]/5 rounded-full blur-2xl z-0"
            />
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
              className="relative z-10 flex items-end justify-center lg:justify-end w-full max-w-[500px] lg:max-w-[550px]"
            >
              {/* Main Image Wrapper */}
                <div className="relative w-full h-[500px] md:h-[600px] flex items-end overflow-hidden">
                <img 
                  src={about.image} 
                  alt={`Psicóloga ${about.titleHighlight}`} 
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10"></div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-4 left-4 md:left-8 bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-100 max-w-[170px] z-20"
                >
                  <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#559A95]"></div>
                  <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">{about.experience.badgeTitle}</span>
                  </div>
                  <p className="text-[#2C2C2C] font-bold text-lg md:text-xl leading-tight">
                  {about.experience.years} <br/>
                  <span className="text-xs md:text-sm font-normal text-gray-500">{about.experience.label}</span>
                  </p>
                </motion.div>
                </div>
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.25, 0.8, 0.25, 1], delay: 0.2 }}
            >
              <h2 className="text-sm font-bold text-[#559A95] uppercase tracking-widest mb-2">{about.sectionTag}</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6">
                {about.titlePrefix} <span className="text-[#559A95]">{about.titleHighlight}</span>
              </h3>
              <p className="text-[#666666] text-lg leading-relaxed mb-8">
                {about.description}
              </p>

              {/* Modalities Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {about.modalities.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                    className={`p-6 rounded-2xl border border-gray-100 transition-all duration-300 ${item.color} bg-opacity-40`}
                  >
                    <h4 className="font-bold text-[#2C2C2C] mb-2 text-lg">{item.title}</h4>
                    <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Specializations Tags */}
              <div className="mt-8">
                <h4 className="font-semibold text-[#2C2C2C] mb-6 flex items-center gap-2">
                  {about.specializations.title}
                </h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
                  {about.specializations.items.map((spec, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 text-[#666666] group select-none"
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3 min-w-[12px] text-[#559A95] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" fill="currentColor">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                      </svg>
                      <span className="text-sm md:text-lg relative leading-tight">
                        {spec}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#559A95] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
