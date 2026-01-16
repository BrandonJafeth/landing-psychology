import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarMobileProps {
  navLinks: NavLink[];
  currentPath: string;
}

export default function NavbarMobile({ navLinks, currentPath }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);


  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);


  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  };


  const menuContent = (
    <div
      className={`fixed inset-0 bg-[#000000] z-50 transition-all duration-500 ease-out ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación móvil"
    >
      {/* Header with Close Button */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-end px-6 py-6 z-50">
        
        {/* Close Button */}
        <button
          onClick={closeMenu}
          className={`w-12 h-12 flex items-center justify-center 
                     transition-colors duration-300 group ${
                       isDark 
                         ? 'text-white hover:text-gray-300'
                         : 'text-white hover:text-gray-300' 
                     }`}
          aria-label="Cerrar menú"
          type="button"
        >
          <div className="relative w-8 h-8">
            <span 
              className="absolute top-1/2 left-0 w-full h-0.5 bg-current 
                         transform -translate-y-1/2 rotate-45 
                         transition-transform duration-300" 
            />
            <span 
              className="absolute top-1/2 left-0 w-full h-0.5 bg-current 
                         transform -translate-y-1/2 -rotate-45 
                         transition-transform duration-300" 
            />
          </div>
        </button>
      </div>

      {/* Gradient Background - Adjusted to match site style if needed, or keep dark aesthetic */}
      <div 
        className={`absolute inset-0 opacity-90 transition-colors duration-300 bg-gradient-to-br from-[#559A95] via-[#4A8A85] to-[#333333]`}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
        
        {/* Main Navigation */}
        <nav className="flex flex-col items-center space-y-8 mb-16">
          {navLinks.map((link, index) => {
            const isActive = currentPath === link.href;
            
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-4xl sm:text-5xl md:text-6xl font-bold font-serif
                          hover:scale-110 origin-center relative group
                          transition-all duration-300
                          text-white
                          ${isActive 
                            ? 'opacity-100'
                            : 'opacity-70 hover:opacity-100'
                          }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                
                {/* Animated Underline */}
                <span 
                  className={`absolute -bottom-2 left-0 h-1 rounded-full
                            transition-all duration-300
                            bg-white
                            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  aria-hidden="true"
                />
              </a>
            );
          })}
           <a 
            href="/contacto" 
            onClick={closeMenu}
            className="text-2xl sm:text-3xl font-bold font-serif text-white/90 hover:text-white mt-8 border-2 border-white/30 px-8 py-3 rounded-full hover:bg-white/10 transition-all"
          >
            Agendar Cita
          </a>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative w-10 h-10 flex items-center justify-center 
                   text-gray-800 focus:outline-none rounded-lg z-50"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen ? true : false}
        type="button"
      >
        <div className="w-8 flex flex-col items-center justify-center gap-1.5">
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-200 ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`} 
          />
          <span 
            className={`w-full h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`} 
          />
        </div>
      </button>

      {/* Portal del menú */}
      {mounted && typeof document !== 'undefined' && createPortal(menuContent, document.body)}
    </>
  );
}