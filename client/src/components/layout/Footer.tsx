import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4">
              FCI
            </div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">{t('home.heroTitle')}</h3>
            <p className="text-sm leading-relaxed mb-6 text-slate-600 dark:text-slate-400">
              A leading institution in computer science and information technology education, research, and community service in the Middle East.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><span className="text-sm font-bold">f</span></a>
              <a href="#" className="hover:text-accent transition-colors"><span className="text-sm font-bold">𝕏</span></a>
              <a href="#" className="hover:text-accent transition-colors text-sm font-bold">in</a>
              <a href="#" className="hover:text-accent transition-colors text-sm font-bold">yt</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/departments" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.departments')}</Link></li>
              <li><Link to="/programs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.programs')}</Link></li>
              <li><Link to="/research" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.research')}</Link></li>
              <li><Link to="/news" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.news')}</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Departments</h3>
            <ul className="space-y-2">
              <li><Link to="/departments/cs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Computer Science</Link></li>
              <li><Link to="/departments/is" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Information Systems</Link></li>
              <li><Link to="/departments/it" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Information Technology</Link></li>
              <li><Link to="/departments/se" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Software Engineering</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-1" size={20} />
                <span>Medical Campus, Tanta University, El Geish Street, Tanta, Gharbia, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={20} />
                <span dir="ltr">+20 40 3450536</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={20} />
                <span>info@fci.tanta.edu.eg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Tanta University, Faculty of Computers & Information. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
