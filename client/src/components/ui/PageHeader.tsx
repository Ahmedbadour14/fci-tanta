import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumb }) => (
  <section className="relative pt-4 pb-4 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1e3a5f] dark:to-[#1a1040]">
    {/* Decorative orbs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
    </div>

    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.03] dark:opacity-5"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    <div className="container mx-auto px-4 text-center relative z-10">
      {breadcrumb && (
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 dark:text-blue-300 text-sm font-medium uppercase tracking-widest mb-3"
        >
          {breadcrumb}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-20 h-1 mx-auto mt-6 rounded-full"
        style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
      />
    </div>
  </section>
);

export default PageHeader;
