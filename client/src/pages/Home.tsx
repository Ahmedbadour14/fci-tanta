import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/home/Hero';
import StatsCounter from '../components/home/StatsCounter';
import QuickAccess from '../components/home/QuickAccess';
import NewsSection from '../components/home/NewsSection';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Hero />
      <StatsCounter />
      <QuickAccess />
      <NewsSection />

      {/* Dean's Message */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt={t('home.deanName')}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">{t('home.deanMessage')}</h2>
              <div className="w-24 h-1 bg-accent rounded-full mb-8" />
              <blockquote className="text-xl md:text-2xl italic text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                "{t('home.deanQuote')}"
              </blockquote>
              <div>
                <h4 className="font-bold text-xl text-slate-800 dark:text-white">{t('home.deanName')}</h4>
                <p className="text-primary dark:text-accent font-medium">{t('home.deanTitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Bar */}
      <section className="py-12 bg-neutral dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">{t('home.partners')}</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <h3 className="text-2xl font-black">Huawei Academy</h3>
            <h3 className="text-2xl font-black">Cisco</h3>
            <h3 className="text-2xl font-black">Microsoft</h3>
            <h3 className="text-2xl font-black">AWS Educate</h3>
            <h3 className="text-2xl font-black">IBM</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
