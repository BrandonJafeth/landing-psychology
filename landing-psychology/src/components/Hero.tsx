import React from 'react';
import { motion } from 'framer-motion';
import siteData from '../data/site.json';

const Hero = () => {
  const { hero } = siteData;

  return (
    <section id='hero' className="relative w-full py-32 md:py-0 md:min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Blobs */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-[#559A95]/30 rounded-full blur-xl opacity-60"
      />
      <motion.div 
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-48 h-48 bg-[#61B39C]/30 rounded-full blur-2xl opacity-60"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#559A95]/20 rounded-full blur-lg"
      />

      {/* Decorative Shapes from Image */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-1/4 w-16 h-16 bg-[#CDE4DE] rounded-full opacity-80"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-48 left-1/4 w-20 h-16 bg-[#9CCBC6] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80"
      />
      <motion.div 
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-32 left-1/3 w-16 h-16 bg-[#CDE4DE] rounded-full opacity-80"
      />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 right-1/3 w-32 h-24 bg-[#A8D5CD] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-80"
      />

      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.8, 0.25, 1], delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight"
        >
          {hero.titleLine1} <br />
          {hero.titleLine2Prefix} <span className="text-[#559A95]">{hero.titleHighlight}</span> {hero.titleLine2Suffix}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.8, 0.25, 1], delay: 0.4 }}
          className="text-lg md:text-xl text-[#666666] mb-10 max-w-2xl mx-auto"
        >
          {hero.subtitle}
        </motion.p>

       <motion.a 
            href={hero.ctaLink}
            className="inline-block bg-[#559A95] text-white px-8 py-3 rounded-lg font-semibold text-base"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(85, 154, 149, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {hero.ctaText}
          </motion.a>
      </div>
    </section>
  );
};

export default Hero;
