import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const COOKIE_KEY = 'fci_cookie_consent';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setTimeout(() => setVisible(true), 2000);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                <Cookie size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                  {t('cookie.title')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  {t('cookie.desc')}{' '}
                  <button className="text-primary hover:underline font-medium">{t('cookie.privacy')}</button>
                </p>
              </div>
              <button onClick={decline} className="text-slate-400 hover:text-slate-600 shrink-0">
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-3 mt-4 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
              >
                <Check size={14} />
                {t('cookie.acceptAll')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
