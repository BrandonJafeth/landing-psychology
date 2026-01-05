import { motion, easeInOut } from 'framer-motion';
import siteData from '../data/site.json';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut }
    }
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
      />
      <motion.div 
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-20 w-56 h-56 bg-secondary/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-20 right-1/3 w-48 h-48 bg-accent/15 rounded-full blur-2xl"
      />

      {/* Decorative Shapes */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-1/4 w-20 h-20 bg-white/10 rounded-full"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-60 left-1/4 w-24 h-20 bg-secondary/15 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]"
      />
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-20 w-36 h-28 bg-white/10 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]"
      />

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 py-16 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-light mb-4"
          variants={itemVariants}
        >
          {siteData.meta.tagline}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {siteData.meta.subtitle}
        </motion.p>
      </motion.div>

      {/* Main Footer Content */}
      <motion.div 
        className="relative z-10 border-t border-white/20 py-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">{siteData.meta.siteName}</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteData.meta.description}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <nav className="space-y-2">
              {siteData.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${siteData.contact.email}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm group"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="group-hover:underline">{siteData.contact.email}</span>
              </a>
              
              <a 
                href={`tel:${siteData.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm group"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="group-hover:underline">{siteData.contact.phone}</span>
              </a>
              
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{siteData.contact.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              <motion.a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>

              <motion.a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>

              <motion.a
                href={siteData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </div>
            
            <p className="mt-6 text-sm text-white/60">
              Recibe consejos de bienestar
            </p>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        className="relative z-10 border-t border-white/20 py-6 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-white/60">
          <p>{siteData.footer.copyright}</p>
          <p>{siteData.footer.rights}</p>
        </div>
      </motion.div>
    </footer>
  );
}
