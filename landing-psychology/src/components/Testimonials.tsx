import { motion } from 'framer-motion';
import testimonialsData from '../data/testimonials.json';

interface Testimonial {
  id: number;
  name: string;
  age: string;
  text: string;
  image: string;
}

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1]
      }
    }
  };

  return (
    <section id="testimonios" className="relative py-12 md:py-20 px-6 bg-white overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-bold text-[#F5F5F5] select-none leading-none whitespace-nowrap px-4">
          {testimonialsData.section.background}
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#2C2C2C] mb-3">
            {testimonialsData.section.title}{' '}
            <span className="text-[#559A95]">{testimonialsData.section.subtitle}</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonialsData.testimonials.map((testimonial: Testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
                {/* Quote Icon */}
                <motion.div 
                  className="absolute -top-3 -left-3 w-10 h-10 bg-[#559A95] rounded-full flex items-center justify-center shadow-md"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </motion.div>

                {/* Image */}
                <div className="flex justify-center mb-4 mt-4">
                  <motion.div 
                    className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#559A95]/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#559A95] to-[#61B39C] flex items-center justify-center text-white text-2xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <p className="text-[#666666] text-sm md:text-base leading-relaxed mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <p className="font-semibold text-[#2C2C2C] text-base">
                      {testimonial.name}
                    </p>
                  </div>
                </div>

                {/* Hover Accent */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#559A95] to-[#61B39C] rounded-b-2xl"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-16 h-16 bg-[#CDE4DE] rounded-full opacity-60"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-10 w-20 h-20 bg-[#9CCBC6] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60"
      />
    </section>
  );
};

export default Testimonials;
