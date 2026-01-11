import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import siteData from '../data/site.json';

const Hero = () => {
  const { hero } = siteData;
  const container = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    // Background Blobs
    gsap.to('.blob-1', { y: -20, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to('.blob-2', { y: -30, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    gsap.to('.blob-3', { scale: 1.1, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Decorative Shapes from Image
    gsap.to('.shape-1', { y: -15, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to('.shape-2', { y: 20, rotation: -5, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
    gsap.to('.shape-3', { x: 10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
    gsap.to('.shape-4', { scale: 1.05, rotation: 3, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

    // Text Entrance
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    tl.fromTo('.hero-title', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }, 
      "-=0.8"
    );

    // Button interactions
    const button = buttonRef.current as HTMLAnchorElement | null;
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, boxShadow: "0px 10px 20px rgba(85, 154, 149, 0.3)", duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, boxShadow: "none", duration: 0.3 });
      });
      button.addEventListener('mousedown', () => {
        gsap.to(button, { scale: 0.95, duration: 0.1 });
      });
      button.addEventListener('mouseup', () => {
        gsap.to(button, { scale: 1.05, duration: 0.1 });
      });
    }

  }, { scope: container });

  return (
    <section ref={container} id='hero' className="relative w-full py-32 md:py-0 md:min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Blobs */}
      <div 
        className="blob-1 absolute top-20 left-10 w-32 h-32 bg-[#559A95]/30 rounded-full blur-xl opacity-60"
      />
      <div 
        className="blob-2 absolute bottom-20 right-10 w-48 h-48 bg-[#61B39C]/30 rounded-full blur-2xl opacity-60"
      />
      <div 
        className="blob-3 absolute top-1/3 right-1/4 w-24 h-24 bg-[#559A95]/20 rounded-full blur-lg"
      />

      {/* Decorative Shapes from Image */}
      <div 
        className="shape-1 absolute top-32 right-1/4 w-16 h-16 bg-[#CDE4DE] rounded-full opacity-80"
      />
      <div 
        className="shape-2 absolute top-48 left-1/4 w-20 h-16 bg-[#9CCBC6] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80"
      />
      <div 
        className="shape-3 absolute bottom-32 left-1/3 w-16 h-16 bg-[#CDE4DE] rounded-full opacity-80"
      />
      <div 
        className="shape-4 absolute bottom-40 right-1/3 w-32 h-24 bg-[#A8D5CD] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] opacity-80"
      />

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 
          className="hero-title text-4xl md:text-6xl font-bold text-[#2C2C2C] mb-6 leading-tight"
        >
          {hero.titleLine1} <br />
          {hero.titleLine2Prefix} <span className="text-[#559A95]">{hero.titleHighlight}</span> {hero.titleLine2Suffix}
        </h1>
        
        <p 
          className="hero-subtitle text-lg md:text-xl text-[#666666] mb-10 max-w-2xl mx-auto"
        >
          {hero.subtitle}
        </p>

       <a 
            ref={buttonRef}
            href={hero.ctaLink}
            className="inline-block bg-[#559A95] text-white px-8 py-3 rounded-lg font-semibold text-base"
          >
            {hero.ctaText}
          </a>
      </div>
    </section>
  );
};

export default Hero;
