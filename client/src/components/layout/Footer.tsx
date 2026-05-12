import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Send, Share2, Rss, Globe, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.departments'), path: '/departments' },
    { label: t('nav.programs'), path: '/programs' },
    { label: t('nav.research'), path: '/research' },
    { label: t('nav.news'), path: '/news' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const studentLinks = [
    { label: t('footer.studentPortal'), path: '/portal' },
    { label: t('footer.bookStore'), path: '/store' },
    { label: t('footer.courseRegistration'), path: '/portal/student/registration' },
    { label: t('footer.gradesResults'), path: '/portal/student/grades' },
    { label: t('footer.examArchive'), path: '/exams' },
    { label: t('footer.adminPanel'), path: '/admin' },
  ];

  const socials = [
    { icon: <Share2 size={18} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Rss size={18} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Globe size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Video size={18} />, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/uni-logo.png"
                alt="Tanta University Logo"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20 shadow-lg shrink-0"
              />
              <img
                src="/images/fci-logo.png"
                alt="FCI Logo"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white/20 shadow-lg shrink-0"
              />
              <div>
                <p className="text-white font-extrabold leading-tight">{t('footer.brand')}</p>
                <p className="text-slate-400 text-xs">{t('footer.university')}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              {t('footer.brandDesc')}
            </p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:w-2 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">{t('footer.studentServices')}</h3>
            <ul className="space-y-2.5">
              {studentLinks.map(l => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">{t('footer.contactUs')}</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-400 shrink-0 mt-0.5" size={16} />
                <span className="text-sm text-slate-400">{t('contact.addressValue')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-blue-400 shrink-0" size={16} />
                <span className="text-sm text-slate-400" dir="ltr">+20 40 3450536</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-blue-400 shrink-0" size={16} />
                <span className="text-sm text-slate-400">info@fci.tanta.edu.eg</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{t('footer.newsletter')}</h4>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm font-medium"
                >
                  {t('footer.subscribed')}
                </motion.p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t('footer.newsletterPlaceholder')}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-500 text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="/privacy-policy" className="hover:text-slate-300 transition-colors">{t('footer.privacy')}</a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">{t('footer.terms')}</a>
            <a href="/sitemap.xml" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              {t('footer.sitemap')} <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
