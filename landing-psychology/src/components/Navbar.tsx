import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: "Sobre Mi", href: "#sobre-mi" },
  { name: "Servicios", href: "#servicios" },
  { name: "Testimonios", href: "#testimonios" },
  { name: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.8, 0.25, 1] }}
      className="w-full bg-white/90 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-between items-center shadow-sm fixed top-0 z-50"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-10 h-10 rounded-full bg-[#559A95] flex items-center justify-center text-white shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </motion.div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-[#2C2C2C] leading-tight">Psicologa</span>
          <span className="text-sm text-[#559A95] font-medium">Daniela Rodriguez</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <motion.a 
            key={item.name}
            href={item.href} 
            className="text-[#666666] hover:text-[#559A95] transition-colors duration-300 font-medium relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#559A95] transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
        ))}
      </div>

      <div className="hidden md:block">
        <motion.a 
          href="#agendar" 
          className="bg-[#559A95] text-white px-6 py-2.5 rounded-lg font-semibold inline-block"
          whileHover={{ scale: 1.05, backgroundColor: "#4A8A85", boxShadow: "0px 5px 15px rgba(85, 154, 149, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          Agendar sesión
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden text-[#2C2C2C]"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
        </svg>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="text-[#666666] hover:text-[#559A95] font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#agendar" 
                className="bg-[#559A95] text-white px-6 py-3 rounded-lg font-semibold text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                Agendar sesión
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
