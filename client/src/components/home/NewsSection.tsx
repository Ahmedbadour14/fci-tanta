import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { NewsCardSkeleton } from '../ui/SkeletonLoader';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishedAt: string;
}

const NewsSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/news?limit=3').then(({ data }) => {
      setNews(data.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categoryColors: Record<string, string> = {
    Achievements: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Academics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Events: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    Partnership: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Community: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    Infrastructure: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-title mb-2"
            >
              آخر الأخبار والفعاليات
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-16 h-1 rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', transformOrigin: 'left' }}
            />
          </div>
          <Link
            to="/news"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all text-sm"
          >
            عرض الكل
            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <NewsCardSkeleton key={i} />)
            : news.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 start-3 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[item.category] || 'bg-slate-100 text-slate-700'}`}>
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                    <Calendar size={13} />
                    {new Date(item.publishedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white leading-snug line-clamp-2 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
