import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Database, Network, Code2, ArrowRight, ArrowLeft } from 'lucide-react';

const Departments = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const depts = [
    {
      id: 'cs',
      nameKey: 'departments.cs.name',
      icon: Monitor,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      descKey: 'departments.cs.desc',
      stats: { staff: 24, courses: 45, labs: 6 }
    },
    {
      id: 'is',
      nameKey: 'departments.is.name',
      icon: Database,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
      descKey: 'departments.is.desc',
      stats: { staff: 18, courses: 38, labs: 4 }
    },
    {
      id: 'it',
      nameKey: 'departments.it.name',
      icon: Network,
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/10',
      descKey: 'departments.it.desc',
      stats: { staff: 15, courses: 32, labs: 5 }
    },
    {
      id: 'se',
      nameKey: 'departments.se.name',
      icon: Code2,
      color: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      descKey: 'departments.se.desc',
      stats: { staff: 20, courses: 40, labs: 4 }
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
      <section className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('nav.departments')}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-accent mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-200 max-w-2xl mx-auto"
          >
            {t('departments.intro')}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {depts.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className={`p-6 rounded-2xl ${dept.bgColor} ${dept.textColor} shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon size={48} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                      {t(dept.nameKey)}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                      {t(dept.descKey)}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="block text-xl font-bold text-slate-800 dark:text-white">{dept.stats.staff}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{t('departments.faculty')}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="block text-xl font-bold text-slate-800 dark:text-white">{dept.stats.courses}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{t('departments.courses')}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="block text-xl font-bold text-slate-800 dark:text-white">{dept.stats.labs}</span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{t('departments.labs')}</span>
                      </div>
                    </div>

                    <Link
                      to={`/departments/${dept.id}`}
                      className={`inline-flex items-center gap-2 font-bold ${dept.textColor} hover:underline`}
                    >
                      {t('departments.explore')} {!isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
