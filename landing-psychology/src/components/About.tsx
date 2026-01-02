import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const modalities = [
    {
      title: "Terapia Presencial",
      description: "Un espacio físico seguro, cálido y confidencial diseñado para tu tranquilidad y desconexión del ruido exterior.",
      color: "bg-[#E0F2F1]" // Very light teal
    },
    {
      title: "Terapia Online",
      description: "Sesiones flexibles desde la comodidad de tu hogar, manteniendo la misma cercanía y profesionalismo.",
      color: "bg-[#E8F5E9]" // Very light green
    }
  ];

  const specializations = [
    "Ansiedad y Estrés", "Depresión", "Autoestima", "Duelo", "Relaciones", "Crecimiento Personal"
  ];

  return (
    <section id="sobre-mi" className="relative w-full py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Image Column - Creative Layout */}
          <div className="w-full md:w-1/2 relative flex justify-center md:justify-end">
            {/* Abstract Background Shapes */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-10 w-72 h-72 bg-[#61B39C]/10 rounded-full blur-3xl z-0"
            />
            
            {/* Image Container */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Placeholder for Transparent PNG */}
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
                {/* Image without container background */}
                <div className="w-full h-full flex items-end justify-center">
                   <img 
                    src="/pexels-cottonbro-4098274-removebg-preview.png" 
                    alt="Psicóloga Daniela Rodriguez" 
                    className="w-full h-full object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                   />
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#559A95]"></div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Experiencia</span>
                  </div>
                  <p className="text-[#2C2C2C] font-bold text-lg leading-tight">+8 Años <br/><span className="text-sm font-normal text-gray-500">de trayectoria</span></p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-[#559A95] uppercase tracking-widest mb-2">Sobre Mí</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6">
                Hola, soy <span className="text-[#559A95]">Daniela Rodriguez</span>
              </h3>
              <p className="text-[#666666] text-lg leading-relaxed mb-8">
                Mi enfoque terapéutico se basa en crear un vínculo de confianza genuina. Entiendo que cada historia es única, por lo que adapto mis herramientas para acompañarte en tu proceso de autodescubrimiento y sanación.
              </p>

              {/* Modalities Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {modalities.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                    className={`p-6 rounded-2xl border border-gray-100 transition-all duration-300 ${item.color} bg-opacity-40`}
                  >
                    <h4 className="font-bold text-[#2C2C2C] mb-2 text-lg">{item.title}</h4>
                    <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Specializations Tags */}
              <div>
                <h4 className="font-semibold text-[#2C2C2C] mb-4">
                  Especialidades
                </h4>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-50 text-[#666666] text-sm rounded-full border border-gray-100 hover:border-[#559A95] hover:text-[#559A95] transition-colors cursor-default">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
