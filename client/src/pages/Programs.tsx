import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, FileDown, CheckCircle2, ArrowRight } from 'lucide-react';

const Programs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('bachelor');

  const bachelorPrograms = t('programs.bachelor', { returnObjects: true }) as Array<{ title: string; duration: string; credits: string; path: string }>;
  const postgradPrograms = t('programs.postgrad', { returnObjects: true }) as Array<{ title: string; duration: string; credits: string; path: string }>;

  const currentPrograms = activeTab === 'bachelor' ? bachelorPrograms : postgradPrograms;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
      <section className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('programs.title')}
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

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('bachelor')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'bachelor' ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {t('programs.undergraduate')}
            </button>
            <button
              onClick={() => setActiveTab('postgrad')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'postgrad' ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {t('programs.postgraduate')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            {Array.isArray(currentPrograms) && currentPrograms.map((prog, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{prog.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 md:mb-0">
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{prog.duration}</span>
                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{prog.credits}</span>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">{t('programs.career')}: {prog.path}</span>
                  </div>
                </div>
                <button className="shrink-0 flex items-center gap-2 text-primary font-bold hover:underline">
                  <FileDown size={18} /> {t('programs.curriculum')}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{t('programs.admissionRequirements')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">{t('programs.admissionReq1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">{t('programs.admissionReq2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-600 dark:text-slate-400">{t('programs.admissionReq3')}</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-sm">
              <GraduationCap size={40} className="mb-4 opacity-80" />
              <h3 className="text-xl font-bold mb-2">{t('programs.readyToApply')}</h3>
              <p className="text-blue-100 mb-6">{t('programs.readyToApplyDesc')}</p>
              <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                {t('home.applyNow')} <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Programs;
