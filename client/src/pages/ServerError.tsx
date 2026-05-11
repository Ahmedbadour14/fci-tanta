import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServerCrash, Home, RefreshCw } from 'lucide-react';

const ServerError = () => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[linear-gradient(135deg,#0f172a,#1e1b4b)]">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
      style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }} />

    <div className="relative z-10 text-center px-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        className="w-28 h-28 rounded-3xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
        <ServerCrash size={52} className="text-red-400" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-red-500 dark:text-red-400 font-bold text-sm uppercase tracking-widest mb-3">خطأ في الخادم</p>
        <h1 className="text-8xl font-black text-slate-900 dark:text-white mb-3">500</h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-300 mb-3">حدث خطأ داخلي</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed">
          عذرًا، حدث خطأ غير متوقع. فريقنا يعمل على الإصلاح.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-white/20 transition-all">
            <RefreshCw size={17} /> إعادة المحاولة
          </button>
          <Link to="/" className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
            <Home size={17} /> الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ServerError;
