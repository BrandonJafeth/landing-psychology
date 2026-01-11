import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteData from '../data/site.json';
import { validateForm } from '../utils/validators';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { form } = siteData.contact;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const container = useRef(null);

  useEffect(() => {
    const { valid } = validateForm(formData);
    setIsValid(valid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Implement form submission logic here
      console.log('Form submitted:', formData);
    }
  };

  useGSAP(() => {
    // Background Organic Blobs
    gsap.to('.blob-1', {
      y: -10,
      rotation: 5,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to('.blob-2', {
      y: 15,
      rotation: -5,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    gsap.to('.blob-3', {
      scale: 1.05,
      rotation: 3,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });

    gsap.to('.blob-4', {
      scale: 1.1,
      rotation: -3,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    // Content Animations
    gsap.fromTo('.contact-title',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.contact-title',
          start: "top 85%",
          once: true
        }
      }
    );

    gsap.fromTo('.contact-form-container',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: "top 85%",
          once: true
        }
      }
    );

    // Button interactions handled via CSS classes or manual event listeners if complex
    // Simple hover scale can be done with gsap utils if needed, but CSS is often cleaner for simple states
  }, { scope: container });

  // Helper for button hover animation
  const handleButtonHover = (e: React.MouseEvent) => {
    if (isValid) {
      gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 });
    }
  };

  const handleButtonLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
  };

  const handleButtonTap = (e: React.MouseEvent) => {
    if (isValid) {
      gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
    }
  };


  return (
    <section ref={container} id="contacto" className="relative w-full py-16 md:py-32 bg-white overflow-hidden">
        {/* Background Organic Blobs */}
        <div 
            className="blob-1 absolute top-20 left-[-30px] md:left-20 w-32 h-32 bg-primary/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] z-0"
        />
        <div 
            className="blob-2 absolute top-40 right-[-20px] md:right-32 w-24 h-24 bg-secondary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] z-0"
        />
        <div 
            className="blob-3 absolute bottom-20 left-[-20px] md:left-32 w-28 h-28 bg-primary/5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] z-0"
        />
        <div 
            className="blob-4 absolute bottom-10 right-[-20px] md:right-20 w-40 h-36 bg-secondary/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-60 z-0"
        />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <div 
          className="contact-title max-w-2xl text-center mb-12"
        >
          <p className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed">
            {form.title}
          </p>
        </div>

        <div 
            className="contact-form-container w-full max-w-lg bg-white rounded-3xl p-6 md:p-10 border border-secondary/20 shadow-[0_10px_40px_-10px_rgba(85,154,149,0.15)]"
        >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.namePlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-400 text-text-primary"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.emailPlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-400 text-text-primary"
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </div>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.phonePlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-400 text-text-primary"
                    />
                </div>

                <div className="relative">
                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                        <svg className="h-5 w-5 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </div>
                    <textarea 
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={form.messagePlaceholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-gray-400 text-text-primary resize-none"
                    ></textarea>
                </div>

                <button
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    onMouseDown={handleButtonTap}
                    className={`w-full py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isValid 
                        ? "bg-[#559A95] hover:bg-[#4A8A85] text-white cursor-pointer shadow-lg shadow-[#559A95]/30" 
                        : "bg-[#CEDCE0] text-white cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!isValid}
                >
                    {form.buttonText}
                    <svg className={`w-5 h-5 transition-transform ${isValid ? "group-hover:translate-x-1" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <svg className="w-3 h-3 text-[#A1A1AA]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                    </svg>
                    <span>{form.disclaimer}</span>
                </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
