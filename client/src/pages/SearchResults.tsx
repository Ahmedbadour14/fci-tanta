import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, BookOpen, User, Calendar, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { Skeleton } from '../components/ui/SkeletonLoader';

interface SearchResults {
  query: string;
  total: number;
  results: {
    news: any[];
    research: any[];
    staff: any[];
  };
}

const SearchResults = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!q || q.length < 2) return;
    setLoading(true);
    setError('');
    api.get(`/search?q=${encodeURIComponent(q)}`)
      .then(({ data }) => setResults(data))
      .catch(() => setError(t('search.error')))
      .finally(() => setLoading(false));
  }, [q, t]);

  const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; count: number }> = ({ title, icon, children, count }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <span className="text-blue-500">{icon}</span>
        <h2 className="font-bold text-slate-800 dark:text-white">{title}</h2>
        <span className="ms-auto bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">

        {/* Search bar */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm mb-6 transition-colors w-fit">
            <ArrowLeft size={15} className="rtl:rotate-180" /> {t('search.backHome')}
          </Link>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-1">
            {t('search.resultsFor')} <span className="gradient-text">"{q}"</span>
          </h1>
          {results && <p className="text-slate-500 text-sm">{results.total} {t('search.results')}</p>}
        </div>

        {loading && (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-slate-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p>{error}</p>
          </div>
        )}

        {!loading && results && results.total === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{t('search.noResults')}</h2>
            <p className="text-slate-500">{t('search.noResultsDesc').replace('{q}', q)}</p>
          </div>
        )}

        {!loading && results && results.total > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

            {results.results.news.length > 0 && (
              <Section title={t('search.news')} icon={<FileText size={18} />} count={results.results.news.length}>
                {results.results.news.map((item: any) => (
                  <Link key={item.id} to="/news"
                    className="flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{item.title}</p>
                      <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(item.publishedAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}
                        <span className="mx-1">·</span>
                        {item.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </Section>
            )}

            {results.results.research.length > 0 && (
              <Section title={t('search.researchPapers')} icon={<BookOpen size={18} />} count={results.results.research.length}>
                {results.results.research.map((item: any) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm line-clamp-1">{item.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.authors}</p>
                  </div>
                ))}
              </Section>
            )}

            {results.results.staff.length > 0 && (
              <Section title={t('search.faculty')} icon={<User size={18} />} count={results.results.staff.length}>
                {results.results.staff.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                      {item.user?.firstName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">
                        {item.user?.firstName} {item.user?.lastName}
                      </p>
                      <p className="text-slate-400 text-xs">{item.title} · {item.department?.name}</p>
                    </div>
                  </div>
                ))}
              </Section>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
