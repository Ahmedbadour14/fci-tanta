import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Moon, Sun, Search, BookOpen, GraduationCap, ClipboardList, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBanner from '../ui/AnnouncementBanner';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('fci_dark_mode');
    return stored ? stored === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('fci_dark_mode', String(isDark));
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.departments'), path: '/departments' },
    { name: t('nav.programs'), path: '/programs' },
    { name: 'بحوث', path: '/research' },
    { name: t('nav.news'), path: '/news' },
    { name: 'متجر', path: '/store' },
    { name: 'امتحانات', path: '/exams' },
    { name: 'تواصل', path: '/contact' },
  ];

  const scrolled = isScrolled || location.pathname !== '/';

  return (
    <div className="fixed top-0 w-full z-50">
      <AnnouncementBanner />
      <header
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'py-2 shadow-xl border-b backdrop-blur-2xl'
            : 'bg-transparent py-4'
        } ${
          scrolled
            ? isDark
              ? 'bg-slate-900/85 border-slate-700/40 shadow-slate-900/50'
              : 'bg-white/85 border-slate-200/60 shadow-slate-200/40'
            : ''
        }`}
        style={scrolled ? {
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        } : undefined}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-lg group-hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
              >
                FCI
              </div>
              <div className={`font-bold leading-tight hidden sm:block text-slate-900 dark:text-white ${!scrolled && 'dark:drop-shadow-md'}`}>
                <span className="block text-sm font-extrabold">كلية الحاسبات</span>
                <span className="block text-xs opacity-70">جامعة طنطا</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all relative ${
                    location.pathname === link.path
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-blue-500"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-1.5">
              <AnimatePresence>
                {showSearch && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث..."
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </motion.form>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg transition-colors font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Toggle language"
              >
                {i18n.language === 'ar' ? 'EN' : 'ع'}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link to="/portal" className="btn-primary text-sm !px-4 !py-2 ms-1">
                {t('nav.portal')}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
              style={{
                background: isDark ? 'rgba(15,23,42,0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-colors ${
                        location.pathname === link.path
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3 flex items-center justify-between px-2">
                  <button onClick={() => setIsDark(!isDark)} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    {isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
                  </button>
                  <button onClick={toggleLanguage} className="text-slate-600 dark:text-slate-400 text-sm font-bold border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-lg">
                    {i18n.language === 'ar' ? 'EN' : 'عربي'}
                  </button>
                </div>
                <Link
                  to="/portal"
                  onClick={() => setIsOpen(false)}
                  className="block mt-2 btn-primary text-center !py-3"
                >
                  {t('nav.portal')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
