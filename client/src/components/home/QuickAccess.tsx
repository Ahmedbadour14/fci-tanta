import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserCircle, Briefcase, GraduationCap, LayoutDashboard } from 'lucide-react';

const QuickAccess = () => {
  const { t } = useTranslation();

  const links = [
    { id: 1, title: 'Student Portal', icon: UserCircle, path: '/portal', desc: 'Course registration, grades, and schedule' },
    { id: 2, title: 'Faculty Portal', icon: Briefcase, path: '/portal/staff', desc: 'Manage courses and research publications' },
    { id: 3, title: 'Graduate Studies', icon: GraduationCap, path: '/programs', desc: 'Masters and PhD programs information' },
    { id: 4, title: 'Training Programs', icon: LayoutDashboard, path: '/community', desc: 'Community service and specialized training' },
  ];

  return (
    <section className="py-16 bg-neutral dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Quick Access</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={link.path}
                  className="block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-accent/50 dark:hover:border-accent/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/5 dark:bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {link.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
