import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Eye, Users, Award, MapPin } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const timeline = [
    { year: '1995', title: 'Establishment', desc: 'Faculty established by presidential decree to meet the growing demand for IT professionals.' },
    { year: '2005', title: 'Postgraduate Programs', desc: 'Introduction of Masters and PhD programs in Computer Science and Information Systems.' },
    { year: '2015', title: 'New Departments', desc: 'Added Software Engineering and Information Technology departments.' },
    { year: '2023', title: 'National Accreditation', desc: 'Received full academic accreditation from NAQAAE for all undergraduate programs.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
      {/* Hero Header */}
      <section className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('nav.about')}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto rounded-full" 
          />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 space-y-24">
        
        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-primary group-hover:scale-110 transition-transform">
              <Eye size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                <Eye size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                To be a regional and international leader in computer science and information technology education, research, and community service, contributing effectively to the digital transformation and sustainable development of society.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-accent group-hover:scale-110 transition-transform">
              <Target size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Our Mission</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Providing distinguished academic programs to prepare highly qualified professionals capable of meeting labor market demands. Conducting innovative scientific research and offering specialized consulting to serve the community.
              </p>
            </div>
          </motion.div>
        </section>

        {/* History Timeline */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Our History</h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-200 dark:bg-slate-800" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-5/12" />
                  <div className="w-2/12 flex justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold border-4 border-white dark:border-slate-950 shadow-md">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div className={`w-5/12 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <span className="text-accent font-bold text-xl block mb-2">{item.year}</span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dean's Message */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dean" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Dean's Word</h2>
              <div className="w-16 h-1 bg-accent mb-8" />
              <blockquote className="text-lg italic text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                "It is my great pleasure to welcome you to the Faculty of Computers and Information at Tanta University. As we stand on the brink of the fourth industrial revolution, our faculty is dedicated to equipping students with the cutting-edge knowledge and practical skills required to thrive in the dynamic world of technology. We are proud of our distinguished faculty members, state-of-the-art facilities, and strong industry partnerships."
              </blockquote>
              <div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-white">Prof. Dr. Ahmed Youssef</h4>
                <p className="text-primary dark:text-accent font-medium">Dean of the Faculty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditations */}
        <section className="text-center pb-12">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Accreditations & Partnerships</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-32 h-32 bg-white dark:bg-slate-900 rounded-full shadow-sm flex items-center justify-center border-4 border-slate-50 dark:border-slate-800 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Award size={48} className="text-slate-400" />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
