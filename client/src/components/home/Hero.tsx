import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, GraduationCap, BookOpen, Users } from 'lucide-react';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    { icon: GraduationCap, value: '+5,000', label: t('home.stats.students') },
    { icon: BookOpen, value: '+1,500', label: t('home.stats.papers') },
    { icon: Users, value: '+150', label: t('home.stats.staff') },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_40%,#1a1040_100%)]">
        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 dark:bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 px-4 py-2 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {t('home.heroTagline')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`font-black leading-tight mb-6 text-slate-900 dark:text-white ${isRTL ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}
          >
            <span className="block dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:to-slate-300">
              {t('home.heroTitle')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t('home.heroDesc')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 text-base !px-8 !py-4">
              {t('home.heroStartJourney')}
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
            <Link
              to="/programs"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border border-slate-300 dark:border-white/30 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/20 transition-all shadow-sm"
            >
              {t('home.explore')}
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-400 dark:to-white/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
