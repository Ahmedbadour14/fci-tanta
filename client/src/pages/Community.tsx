import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Briefcase, GraduationCap, Laptop } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
      <section className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Community Service
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto rounded-full mb-6" 
          />
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-xl">
                <Laptop size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">IT Training Unit</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              We offer specialized training courses in programming, networking, graphic design, and ICDL for both university students and the local community to bridge the digital divide.
            </p>
            <button className="text-orange-600 font-bold hover:underline">View Available Courses &rarr;</button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Alumni & Follow-up Unit</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              We maintain strong ties with our graduates, offering career counseling, organizing employment fairs, and providing ongoing professional development opportunities.
            </p>
            <button className="text-blue-600 font-bold hover:underline">Alumni Portal &rarr;</button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Community;
