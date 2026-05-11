import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 opacity-5"
      style={{ backgroundImage: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)', backgroundSize: '200% 200%' }} />

    <div className="relative z-10 text-center px-4">
      <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 150 }}>
        <div className="text-[10rem] font-black leading-none mb-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">الصفحة غير موجودة</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-10">
          عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/search" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-white/20 transition-all">
            <Search size={17} /> ابحث في الموقع
          </Link>
          <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
            <Home size={17} /> العودة للرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default NotFound;
