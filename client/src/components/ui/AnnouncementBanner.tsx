import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';

const DISMISS_KEY = 'fci_announcement_dismissed_v1';
const MESSAGE = 'يسعدنا الإعلان عن فتح باب القبول في برامج الماجستير الجديدة! 🎓 — سارع بالتقديم قبل 30 يونيو 2026';

const AnnouncementBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-40 overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #1d4ed8, #7c3aed)' }}
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Megaphone size={16} className="text-white/80 shrink-0" />
              <p className="text-white text-sm font-medium truncate">{MESSAGE}</p>
            </div>
            <button
              onClick={dismiss}
              className="text-white/70 hover:text-white shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
