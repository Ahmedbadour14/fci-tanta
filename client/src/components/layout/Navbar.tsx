import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Search, X, Menu, ChevronDown, ChevronRight,
  Building2, Monitor, Database, Wifi, Code2, BookOpen,
  Calendar, GraduationCap, Briefcase, Users, FileText,
  BookMarked, Award as AwardIcon, LayoutDashboard, ClipboardList,
  BarChart2, Archive, FileQuestion, ShoppingBag, HeartHandshake,
  Laptop, UserCheck, ShieldAlert, Newspaper, CalendarCheck,
  Image, Clock, Eye, User, Network, Award, LogIn
} from 'lucide-react';
import AnnouncementBanner from '../ui/AnnouncementBanner';

// ─── Color themes per group ───────────────────────────────────────────────────
const COLOR_MAP: Record<string, { accent: string; light: string; text: string; border: string; hover: string }> = {
  about:           { accent: 'from-blue-500 to-blue-700',    light: 'bg-blue-50 dark:bg-blue-900/20',    text: 'text-blue-600 dark:text-blue-400',   border: 'border-blue-500',   hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
  departments:     { accent: 'from-violet-500 to-violet-700', light: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500', hover: 'hover:bg-violet-50 dark:hover:bg-violet-900/20' },
  academic:        { accent: 'from-emerald-500 to-emerald-700', light: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500', hover: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20' },
  research:        { accent: 'from-orange-500 to-orange-700', light: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-500', hover: 'hover:bg-orange-50 dark:hover:bg-orange-900/20' },
  studentServices: { accent: 'from-cyan-500 to-cyan-700',    light: 'bg-cyan-50 dark:bg-cyan-900/20',    text: 'text-cyan-600 dark:text-cyan-400',   border: 'border-cyan-500',   hover: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20' },
  community:       { accent: 'from-pink-500 to-pink-700',    light: 'bg-pink-50 dark:bg-pink-900/20',    text: 'text-pink-600 dark:text-pink-400',   border: 'border-pink-500',   hover: 'hover:bg-pink-50 dark:hover:bg-pink-900/20' },
  news:            { accent: 'from-amber-500 to-amber-700',  light: 'bg-amber-50 dark:bg-amber-900/20',  text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500',  hover: 'hover:bg-amber-50 dark:hover:bg-amber-900/20' },
};

// ─── Static menu data (paths, icons, keys) ────────────────────────────────────
const MENU_DATA = [
  {
    id: 'about', labelKey: 'megaMenu.about.label', icon: Building2,
    items: [
      { icon: Clock,     labelKey: 'megaMenu.about.history',      descKey: 'megaMenu.about.historyDesc',      path: '/about' },
      { icon: Eye,       labelKey: 'megaMenu.about.vision',       descKey: 'megaMenu.about.visionDesc',       path: '/about' },
      { icon: User,      labelKey: 'megaMenu.about.dean',         descKey: 'megaMenu.about.deanDesc',         path: '/about' },
      { icon: Network,   labelKey: 'megaMenu.about.orgChart',     descKey: 'megaMenu.about.orgChartDesc',     path: '/about' },
      { icon: Award,     labelKey: 'megaMenu.about.accreditation',descKey: 'megaMenu.about.accreditationDesc',path: '/about' },
    ],
  },
  {
    id: 'departments', labelKey: 'megaMenu.departments.label', icon: LayoutDashboard,
    items: [
      { icon: Monitor,  labelKey: 'megaMenu.departments.cs', descKey: 'megaMenu.departments.csDesc', path: '/departments' },
      { icon: Database, labelKey: 'megaMenu.departments.is', descKey: 'megaMenu.departments.isDesc', path: '/departments' },
      { icon: Wifi,     labelKey: 'megaMenu.departments.it', descKey: 'megaMenu.departments.itDesc', path: '/departments' },
      { icon: Code2,    labelKey: 'megaMenu.departments.se', descKey: 'megaMenu.departments.seDesc', path: '/departments' },
    ],
  },
  {
    id: 'academic', labelKey: 'megaMenu.academic.label', icon: GraduationCap,
    items: [
      { icon: BookOpen,  labelKey: 'megaMenu.academic.programs',      descKey: 'megaMenu.academic.programsDesc',      path: '/programs' },
      { icon: Calendar,  labelKey: 'megaMenu.academic.schedules',     descKey: 'megaMenu.academic.schedulesDesc',     path: '/programs' },
      { icon: AwardIcon, labelKey: 'megaMenu.academic.postgraduate',  descKey: 'megaMenu.academic.postgraduateDesc',  path: '/programs' },
      { icon: Briefcase, labelKey: 'megaMenu.academic.fieldTraining', descKey: 'megaMenu.academic.fieldTrainingDesc', path: '/programs' },
    ],
  },
  {
    id: 'research', labelKey: 'megaMenu.research.label', icon: BookMarked,
    items: [
      { icon: Users,       labelKey: 'megaMenu.research.groups',      descKey: 'megaMenu.research.groupsDesc',      path: '/research' },
      { icon: FileText,    labelKey: 'megaMenu.research.papers',      descKey: 'megaMenu.research.papersDesc',      path: '/research' },
      { icon: GraduationCap, labelKey: 'megaMenu.research.graduation',descKey: 'megaMenu.research.graduationDesc',  path: '/research' },
      { icon: CalendarCheck, labelKey: 'megaMenu.research.conferences',descKey: 'megaMenu.research.conferencesDesc',path: '/research' },
    ],
  },
  {
    id: 'studentServices', labelKey: 'megaMenu.studentServices.label', icon: ClipboardList,
    items: [
      { icon: LayoutDashboard, labelKey: 'megaMenu.studentServices.portal',       descKey: 'megaMenu.studentServices.portalDesc',       path: '/portal/student' },
      { icon: ClipboardList,   labelKey: 'megaMenu.studentServices.registration', descKey: 'megaMenu.studentServices.registrationDesc', path: '/portal/student/registration' },
      { icon: BarChart2,       labelKey: 'megaMenu.studentServices.grades',       descKey: 'megaMenu.studentServices.gradesDesc',       path: '/portal/student/grades' },
      { icon: Archive,         labelKey: 'megaMenu.studentServices.exams',        descKey: 'megaMenu.studentServices.examsDesc',        path: '/exams' },
      { icon: FileQuestion,    labelKey: 'megaMenu.studentServices.excuse',       descKey: 'megaMenu.studentServices.excuseDesc',       path: '/portal/student' },
      { icon: ShoppingBag,     labelKey: 'megaMenu.studentServices.store',        descKey: 'megaMenu.studentServices.storeDesc',        path: '/store' },
    ],
  },
  {
    id: 'community', labelKey: 'megaMenu.community.label', icon: HeartHandshake,
    items: [
      { icon: HeartHandshake, labelKey: 'megaMenu.community.service',  descKey: 'megaMenu.community.serviceDesc',  path: '/community' },
      { icon: Laptop,         labelKey: 'megaMenu.community.training', descKey: 'megaMenu.community.trainingDesc', path: '/community' },
      { icon: UserCheck,      labelKey: 'megaMenu.community.alumni',   descKey: 'megaMenu.community.alumniDesc',   path: '/community' },
      { icon: ShieldAlert,    labelKey: 'megaMenu.community.crisis',   descKey: 'megaMenu.community.crisisDesc',   path: '/community' },
    ],
  },
  {
    id: 'news', labelKey: 'megaMenu.news.label', icon: Newspaper,
    items: [
      { icon: Newspaper,     labelKey: 'megaMenu.news.latest', descKey: 'megaMenu.news.latestDesc', path: '/news' },
      { icon: CalendarCheck, labelKey: 'megaMenu.news.events', descKey: 'megaMenu.news.eventsDesc', path: '/news' },
      { icon: Image,         labelKey: 'megaMenu.news.gallery',descKey: 'megaMenu.news.galleryDesc',path: '/news' },
    ],
  },
];

// ─── Mega Menu Dropdown ────────────────────────────────────────────────────────
const MegaDropdown: React.FC<{ groupId: string; items: typeof MENU_DATA[0]['items']; onClose: () => void }> = ({ groupId, items, onClose }) => {
  const { t } = useTranslation();
  const c = COLOR_MAP[groupId];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-0 right-0 z-40 shadow-2xl"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${c.accent}`} />
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className={`grid gap-2 ${items.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-150 group ${c.hover}`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${c.light} ${c.text} group-hover:scale-110 transition-transform`}>
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm text-slate-800 dark:text-white group-hover:${c.text.split(' ')[0]} transition-colors`}>
                        {t(item.labelKey)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
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
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  // Scroll detection
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
    setShowSearch(false);
  }, [location]);

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openMenu = useCallback((id: string) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('fci_theme', next ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
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

  return (
    <div className="fixed top-0 w-full z-50" ref={navRef}>
      <AnnouncementBanner />

      {/* Main header */}
      <header className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg shadow-lg' : 'bg-white dark:bg-slate-950'} border-b border-slate-200/60 dark:border-slate-800/60`}>
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 me-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}>
              FCI
            </div>
            <div className="hidden lg:block">
              <p className="font-black text-slate-900 dark:text-white text-sm leading-tight">{t('nav.brand')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{t('nav.brandSub')}</p>
            </div>
          </Link>

          {/* ── Desktop mega menu triggers ─────────────────────── */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {MENU_DATA.map(group => {
              const c = COLOR_MAP[group.id];
              const isActive = activeMenu === group.id;
              return (
                <div
                  key={group.id}
                  onMouseEnter={() => openMenu(group.id)}
                  onMouseLeave={scheduleClose}
                  className="relative"
                >
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? `${c.text} ${c.light}`
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {t(group.labelKey)}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* ── Action buttons ──────────────────────────────────── */}
          <div className="flex items-center gap-1.5 ms-auto shrink-0">
            {/* Search */}
            <button onClick={() => setShowSearch(s => !s)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors">
              {showSearch ? <X size={17} /> : <Search size={17} />}
            </button>

            {/* Language toggle */}
            <button onClick={toggleLanguage}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors font-bold text-sm">
              {i18n.language === 'ar' ? 'EN' : 'ع'}
            </button>

            {/* Dark mode */}
            <button onClick={toggleDark}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Student Portal */}
            <Link to="/portal/student"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-bold shadow-md hover:opacity-90 hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}>
              <LogIn size={15} />
              {t('nav.portal')}
            </Link>

            {/* Mobile hamburger */}
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
              className="overflow-hidden border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSearch} className="container mx-auto px-4 py-3 flex items-center gap-3">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('nav.searchPlaceholder')}
                  className="flex-1 bg-transparent text-slate-800 dark:text-white placeholder:text-slate-400 outline-none text-sm"
                />
                <button type="submit" className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                  {t('nav.search')}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Desktop Mega Menu Dropdown ─────────────────────────────── */}
      <AnimatePresence>
        {activeMenu && activeGroup && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <MegaDropdown
              groupId={activeMenu}
              items={activeGroup.items}
              onClose={() => setActiveMenu(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[80vh] shadow-xl"
          >
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mx-4 my-3 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white outline-none placeholder:text-slate-400" />
            </form>

            {/* Accordion groups */}
            <div className="px-4 pb-4 space-y-1">
              {MENU_DATA.map(group => {
                const GroupIcon = group.icon;
                const c = COLOR_MAP[group.id];
                const isExpanded = mobileExpanded === group.id;
                return (
                  <div key={group.id} className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : group.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 font-semibold text-sm transition-colors ${
                        isExpanded ? `${c.light} ${c.text}` : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <GroupIcon size={17} />
                        {t(group.labelKey)}
                      </div>
                      <ChevronDown size={15} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-2 space-y-1">
                            {group.items.map(item => {
                              const ItemIcon = item.icon;
                              return (
                                <Link
                                  key={item.labelKey}
                                  to={item.path}
                                  onClick={() => setMobileOpen(false)}
                                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${c.hover}`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.light} ${c.text}`}>
                                    <ItemIcon size={15} />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{t(item.labelKey)}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t(item.descKey)}</p>
                                  </div>
                                  <ChevronRight size={13} className={`ms-auto ${c.text} opacity-0 group-hover:opacity-100 rtl:rotate-180 transition-all`} />
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

              {/* Mobile portal button */}
              <Link to="/portal/student" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm mt-2 shadow-md"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)' }}>
                <LogIn size={16} />
                {t('nav.portal')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
