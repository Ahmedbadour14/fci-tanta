import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Search, X, Menu, ChevronDown, ChevronRight,
  LogIn, Building2, GraduationCap, BookMarked, ClipboardList,
  HeartHandshake, Newspaper, Monitor, Database, Wifi, Code2,
  BookOpen, Calendar, Award, Briefcase, Users, FileText,
  BarChart2, Archive, FileQuestion, ShoppingBag, Laptop,
  UserCheck, ShieldAlert, CalendarCheck, Image, Clock,
  Eye, User, Network, LayoutDashboard
} from 'lucide-react';
import AnnouncementBanner from '../ui/AnnouncementBanner';

// ─── Color themes ─────────────────────────────────────────────────────────────
const COLORS: Record<string, { text: string; bg: string; icon: string; bar: string }> = {
  about:           { text: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/25',    icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',   bar: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  departments:     { text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/25', icon: 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400', bar: 'bg-gradient-to-r from-violet-500 to-violet-700' },
  academic:        { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/25', icon: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400', bar: 'bg-gradient-to-r from-emerald-500 to-emerald-700' },
  research:        { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/25', icon: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400', bar: 'bg-gradient-to-r from-orange-500 to-orange-700' },
  studentServices: { text: 'text-cyan-600 dark:text-cyan-400',    bg: 'bg-cyan-50 dark:bg-cyan-900/25',    icon: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400',   bar: 'bg-gradient-to-r from-cyan-500 to-cyan-700' },
  community:       { text: 'text-pink-600 dark:text-pink-400',    bg: 'bg-pink-50 dark:bg-pink-900/25',    icon: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400',   bar: 'bg-gradient-to-r from-pink-500 to-pink-700' },
  news:            { text: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/25',  icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400', bar: 'bg-gradient-to-r from-amber-500 to-amber-700' },
};

// ─── Menu data ────────────────────────────────────────────────────────────────
const MENU_DATA = [
  {
    id: 'about', labelKey: 'megaMenu.about.label',
    items: [
      { icon: Clock,       labelKey: 'megaMenu.about.history',       descKey: 'megaMenu.about.historyDesc',       path: '/about' },
      { icon: Eye,         labelKey: 'megaMenu.about.vision',        descKey: 'megaMenu.about.visionDesc',        path: '/about' },
      { icon: User,        labelKey: 'megaMenu.about.dean',          descKey: 'megaMenu.about.deanDesc',          path: '/about' },
      { icon: Network,     labelKey: 'megaMenu.about.orgChart',      descKey: 'megaMenu.about.orgChartDesc',      path: '/about' },
      { icon: BookMarked,  labelKey: 'megaMenu.about.accreditation', descKey: 'megaMenu.about.accreditationDesc', path: '/about' },
    ],
  },
  {
    id: 'departments', labelKey: 'megaMenu.departments.label',
    items: [
      { icon: Monitor,  labelKey: 'megaMenu.departments.cs', descKey: 'megaMenu.departments.csDesc', path: '/departments' },
      { icon: Database, labelKey: 'megaMenu.departments.is', descKey: 'megaMenu.departments.isDesc', path: '/departments' },
      { icon: Wifi,     labelKey: 'megaMenu.departments.it', descKey: 'megaMenu.departments.itDesc', path: '/departments' },
      { icon: Code2,    labelKey: 'megaMenu.departments.se', descKey: 'megaMenu.departments.seDesc', path: '/departments' },
    ],
  },
  {
    id: 'academic', labelKey: 'megaMenu.academic.label',
    items: [
      { icon: BookOpen,  labelKey: 'megaMenu.academic.programs',      descKey: 'megaMenu.academic.programsDesc',      path: '/programs' },
      { icon: Calendar,  labelKey: 'megaMenu.academic.schedules',     descKey: 'megaMenu.academic.schedulesDesc',     path: '/programs' },
      { icon: Award,     labelKey: 'megaMenu.academic.postgraduate',  descKey: 'megaMenu.academic.postgraduateDesc',  path: '/programs' },
      { icon: Briefcase, labelKey: 'megaMenu.academic.fieldTraining', descKey: 'megaMenu.academic.fieldTrainingDesc', path: '/programs' },
    ],
  },
  {
    id: 'research', labelKey: 'megaMenu.research.label',
    items: [
      { icon: Users,        labelKey: 'megaMenu.research.groups',      descKey: 'megaMenu.research.groupsDesc',      path: '/research' },
      { icon: FileText,     labelKey: 'megaMenu.research.papers',      descKey: 'megaMenu.research.papersDesc',      path: '/research' },
      { icon: GraduationCap,labelKey: 'megaMenu.research.graduation',  descKey: 'megaMenu.research.graduationDesc',  path: '/research' },
      { icon: CalendarCheck,labelKey: 'megaMenu.research.conferences', descKey: 'megaMenu.research.conferencesDesc', path: '/research' },
    ],
  },
  {
    id: 'studentServices', labelKey: 'megaMenu.studentServices.label',
    items: [
      { icon: LayoutDashboard, labelKey: 'megaMenu.studentServices.portal',       descKey: 'megaMenu.studentServices.portalDesc',       path: '/portal/student' },
      { icon: ClipboardList,   labelKey: 'megaMenu.studentServices.registration', descKey: 'megaMenu.studentServices.registrationDesc', path: '/portal/student/registration' },
      { icon: BarChart2,       labelKey: 'megaMenu.studentServices.grades',       descKey: 'megaMenu.studentServices.gradesDesc',       path: '/portal/student/grades' },
      { icon: Archive,         labelKey: 'megaMenu.studentServices.exams',        descKey: 'megaMenu.studentServices.examsDesc',        path: '/exams' },
      { icon: FileQuestion,    labelKey: 'megaMenu.studentServices.excuse',       descKey: 'megaMenu.studentServices.excuseDesc',       path: '/portal/student/excuse' },
      { icon: ShoppingBag,     labelKey: 'megaMenu.studentServices.store',        descKey: 'megaMenu.studentServices.storeDesc',        path: '/store' },
    ],
  },
  {
    id: 'community', labelKey: 'megaMenu.community.label',
    items: [
      { icon: HeartHandshake, labelKey: 'megaMenu.community.service',  descKey: 'megaMenu.community.serviceDesc',  path: '/community' },
      { icon: Laptop,         labelKey: 'megaMenu.community.training', descKey: 'megaMenu.community.trainingDesc', path: '/community' },
      { icon: UserCheck,      labelKey: 'megaMenu.community.alumni',   descKey: 'megaMenu.community.alumniDesc',   path: '/community' },
      { icon: ShieldAlert,    labelKey: 'megaMenu.community.crisis',   descKey: 'megaMenu.community.crisisDesc',   path: '/community' },
    ],
  },
  {
    id: 'news', labelKey: 'megaMenu.news.label',
    items: [
      { icon: Newspaper,     labelKey: 'megaMenu.news.latest', descKey: 'megaMenu.news.latestDesc', path: '/news' },
      { icon: CalendarCheck, labelKey: 'megaMenu.news.events', descKey: 'megaMenu.news.eventsDesc', path: '/news' },
      { icon: Image,         labelKey: 'megaMenu.news.gallery',descKey: 'megaMenu.news.galleryDesc',path: '/news' },
    ],
  },
];

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
    setShowSearch(false);
  }, [location.pathname]);

  // Hover helpers (desktop)
  const openMenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // Toggle helpers
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('fci_theme', next ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
    localStorage.setItem('fci_language', next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const activeGroup = MENU_DATA.find(g => g.id === activeMenu);
  const c = activeMenu ? COLORS[activeMenu] : null;

  // Navbar glass style
  const navBg = isScrolled
    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-slate-200/40 dark:shadow-slate-900/60'
    : 'bg-white dark:bg-slate-950';

  return (
    <div className="fixed top-0 w-full z-50">
      <AnnouncementBanner />

      {/* ── Header ── */}
      <header className={`transition-all duration-300 border-b border-slate-200/70 dark:border-slate-800/70 ${navBg}`}>
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md"
              style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
              FCI
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-black text-sm text-slate-900 dark:text-white">{t('nav.brand')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('nav.brandSub')}</p>
            </div>
          </Link>

          {/* ── Desktop Nav (centered) ── */}
          <nav className="hidden lg:flex items-center gap-0.5 mx-auto">
            {/* Home — plain link */}
            <Link to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
              {t('nav.home')}
            </Link>

            {/* Mega menu triggers */}
            {MENU_DATA.map(group => {
              const isActive = activeMenu === group.id;
              const gc = COLORS[group.id];
              return (
                <div
                  key={group.id}
                  onMouseEnter={() => openMenu(group.id)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${isActive
                      ? `${gc.text} ${gc.bg}`
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {t(group.labelKey)}
                    <ChevronDown size={13} className={`transition-transform duration-200 opacity-70 ${isActive ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1 ms-auto lg:ms-0 shrink-0">
            <button onClick={() => setShowSearch(s => !s)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
              {showSearch ? <X size={16} /> : <Search size={16} />}
            </button>

            <button onClick={toggleLang}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-bold text-sm">
              {i18n.language === 'ar' ? 'EN' : 'ع'}
            </button>

            <button onClick={toggleDark}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 transition-colors">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link to="/portal/student"
              className="hidden md:flex items-center gap-1.5 ms-1 px-4 py-2 rounded-xl text-white text-sm font-bold shadow hover:opacity-90 hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
              <LogIn size={14} />
              <span className="hidden xl:inline">{t('nav.portal')}</span>
              <span className="xl:hidden">Portal</span>
            </Link>

            <button onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-100 dark:border-slate-800/80">
              <form onSubmit={handleSearch} className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-3">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="flex-1 bg-transparent text-slate-800 dark:text-white placeholder:text-slate-400 outline-none text-sm" />
                <button type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                  {t('nav.search')}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Desktop Mega Menu Dropdown ── */}
      <AnimatePresence>
        {activeMenu && activeGroup && c && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="hidden lg:block absolute w-full z-40 shadow-2xl shadow-slate-300/30 dark:shadow-slate-900/60"
          >
            {/* Color accent bar */}
            <div className={`h-0.5 w-full ${c.bar}`} />

            {/* Dropdown panel */}
            <div className="bg-white/98 dark:bg-slate-950/98 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="container mx-auto px-6 py-6">
                <div className={`grid gap-1.5 ${activeGroup.items.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {activeGroup.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div key={item.labelKey}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.18 }}>
                        <Link to={item.path} onClick={() => setActiveMenu(null)}
                          className={`group flex items-start gap-3 p-3.5 rounded-xl transition-all duration-150 hover:${c.bg}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.icon} group-hover:scale-110 transition-transform duration-150`}>
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className={`font-semibold text-sm text-slate-800 dark:text-white group-hover:${c.text.split(' ')[0]} transition-colors`}>
                              {t(item.labelKey)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                              {t(item.descKey)}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-y-auto max-h-[82vh] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl"
          >
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mx-4 mt-3 mb-2 flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl px-3 py-2.5">
              <Search size={15} className="text-slate-400 shrink-0" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white outline-none placeholder:text-slate-400" />
            </form>

            <div className="px-3 pb-4 space-y-1">
              {/* Home link */}
              <Link to="/" onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
                {t('nav.home')}
              </Link>

              {/* Mega menu accordion groups */}
              {MENU_DATA.map(group => {
                const gc = COLORS[group.id];
                const isOpen = mobileExpanded === group.id;
                return (
                  <div key={group.id} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setMobileExpanded(isOpen ? null : group.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors rounded-xl ${isOpen
                        ? `${gc.text} ${gc.bg}`
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}>
                      {t(group.labelKey)}
                      <ChevronDown size={15} className={`transition-transform duration-200 opacity-70 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-1 ps-2 pe-2 space-y-0.5">
                            {group.items.map(item => {
                              const Icon = item.icon;
                              return (
                                <Link key={item.labelKey} to={item.path}
                                  onClick={() => setMobileOpen(false)}
                                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors group hover:${gc.bg}`}>
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${gc.icon}`}>
                                    <Icon size={15} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{t(item.labelKey)}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{t(item.descKey)}</p>
                                  </div>
                                  <ChevronRight size={13} className={`${gc.text} opacity-50 rtl:rotate-180 shrink-0`} />
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Portal button */}
              <Link to="/portal/student" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm mt-1 shadow-md"
                style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
                <LogIn size={15} /> {t('nav.portal')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
