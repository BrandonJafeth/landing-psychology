import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import siteData from '../data/site.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigation, meta } = siteData;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.25, 0.8, 0.25, 1] }}
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-text-primary leading-tight">{meta.siteName}</span>
            <span className="text-sm text-primary font-medium">{meta.author}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <motion.a 
              key={item.label}
              href={item.href} 
              className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <motion.a 
            href="#contacto" 
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold inline-block transition-shadow hover:shadow-lg hover:shadow-primary/30"
            whileHover={{ scale: 1.05, backgroundColor: "#4A8A85" }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar sesión
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 items-center">
              {navigation.map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="text-text-secondary hover:text-primary font-medium text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="#contacto" 
                className="bg-primary text-white px-8 py-3 rounded-xl font-semibold text-center w-full max-w-xs shadow-lg shadow-primary/20"
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
