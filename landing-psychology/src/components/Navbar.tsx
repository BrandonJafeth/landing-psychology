import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import siteData from '../data/site.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigation, meta } = siteData;
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Initial entrance animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" }
    );
  }, { scope: navRef });

  useGSAP(() => {
    // Mobile menu animation
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
           height: "auto",
           opacity: 1,
           duration: 0.3,
           ease: "power2.out",
           display: "block"
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          display: "none"
        });
      }
    }
  }, [isOpen]); // Re-run when isOpen changes

  const handleLinkHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
  };

  const handleLinkLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };
    
  const handleLinkTap = (e: React.MouseEvent) => {
      gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  const handleLogoHover = (e: React.MouseEvent) => {
      gsap.to(e.currentTarget, { rotate: 10, scale: 1.1, duration: 0.3 });
  };
  
  const handleLogoLeave = (e: React.MouseEvent) => {
      gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.3 });
  };

  return (
    <nav 
      ref={navRef}
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div 
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-text-primary leading-tight">{meta.siteName}</span>
            <span className="text-sm text-primary font-medium">{meta.author}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium relative group inline-block"
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
              onMouseDown={handleLinkTap}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a 
            href="#contacto" 
            className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold inline-block transition-shadow hover:shadow-lg hover:shadow-primary/30"
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, backgroundColor: "#4A8A85", duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, backgroundColor: "#559A95", duration: 0.2 })}
            onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1 })}
            onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.1 })}
          >
            Agendar sesión
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-text-primary p-2"
          onClick={() => setIsOpen(!isOpen)}
          onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 })}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl md:hidden overflow-hidden h-0 opacity-0 hidden"
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
      </div>
    </nav>
  );
};

export default Navbar;
