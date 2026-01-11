import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteData from '../data/site.json';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: React.ReactNode } = {
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  )
};

const Services = () => {
  const { services } = siteData;
  const container = useRef(null);

  useGSAP(() => {
    // Background Organic Blobs
    const blobs = [
      { selector: '.blob-1', y: -10, rot: 5, dur: 8, delay: 0 },
      { selector: '.blob-2', y: 15, rot: -5, dur: 9, delay: 1 },
      { selector: '.blob-3', y: -10, rot: 3, dur: 10, delay: 2, scale: 1.05 },
      { selector: '.blob-4', y: -10, rot: -3, dur: 11, delay: 0.5, scale: 1.1 }
    ];

    blobs.forEach((b) => {
      gsap.to(b.selector, {
        y: b.y,
        rotation: b.rot,
        scale: b.scale || 1,
        duration: b.dur,
        delay: b.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Content Animations
    gsap.fromTo('.services-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.services-title',
          start: "top 85%",
          once: true
        }
      }
    );

    gsap.fromTo('.service-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.service-card-grid',
          start: "top 85%",
          once: true
        }
      }
    );
    
    // Hover effects for cards
    const cards = gsap.utils.toArray('.service-card');
    cards.forEach((card: any) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, boxShadow: "0 20px 25px -5px rgba(85, 154, 149, 0.1)", duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", duration: 0.3 });
      });
    });

  }, { scope: container });

  return (
    <section ref={container} id="servicios" className="relative w-full py-16 md:py-32 bg-background overflow-hidden">
      {/* Background Organic Blobs */}
       <div 
        className="blob-1 absolute top-10 left-[-20px] md:left-10 w-24 h-24 bg-primary/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0"
      />
       <div 
        className="blob-2 absolute top-20 right-[-20px] md:right-20 w-32 h-28 bg-primary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] z-0"
      />
       <div 
        className="blob-3 absolute bottom-10 left-[-30px] md:left-10 w-28 h-28 bg-secondary/10 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] z-0"
      />
       <div 
        className="blob-4 absolute bottom-20 right-[-30px] md:right-10 w-40 h-36 bg-secondary/15 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-60 z-0"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div 
          className="services-title text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase tracking-wide">
            {services.titlePrefix} <span className="text-primary">{services.titleHighlight}</span>
          </h2>
        </div>

        <div className="service-card-grid grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {services.items.map((item, index) => (
            <div
              key={index}
              className="service-card bg-white rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 border border-gray-100 flex flex-col items-center text-center lg:items-start lg:text-left h-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                {iconMap[item.icon as keyof typeof iconMap]}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4">
                {item.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
