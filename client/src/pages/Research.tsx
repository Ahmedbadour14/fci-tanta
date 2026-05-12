import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, BookOpen, Users, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import { ResearchCardSkeleton } from '../components/ui/SkeletonLoader';

interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  publishedAt: string;
  url?: string;
  staff?: { department?: { name: string } };
}

const Research = () => {
  const { t } = useTranslation();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPapers = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '6' });
    if (search) params.append('search', search);
    api.get(`/research?${params}`).then(({ data }) => {
      setPapers(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page, search]);

  useEffect(() => { fetchPapers(); }, [fetchPapers]);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title={t('research.title')} subtitle={t('research.subtitle')} breadcrumb={t('research.breadcrumb')} />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Users, labelKey: 'research.groups', value: '12', color: 'blue' },
            { icon: BookOpen, labelKey: 'research.papers', value: '+1,500', color: 'emerald' },
            { icon: Lightbulb, labelKey: 'research.funded', value: '+25', color: 'orange' },
          ].map(({ icon: Icon, labelKey, value, color }) => (
            <motion.div key={labelKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center card-hover">
              <div className={`w-14 h-14 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <Icon size={28} />
              </div>
              <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">{value}</div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t(labelKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Papers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t('research.latestPublications')}</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); }} className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('research.search')} className="input-field ps-9 text-sm !py-2 w-56" />
            </form>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {loading
              ? [1,2,3,4,5,6].map(i => <ResearchCardSkeleton key={i} />)
              : papers.length === 0
                ? <div className="text-center py-16 text-slate-400">{t('research.noResults')}</div>
                : papers.map((paper, idx) => (
                  <motion.div key={paper.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {paper.staff?.department && (
                          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-lg">
                            {paper.staff.department.name}
                          </span>
                        )}
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2 py-1 rounded-lg">
                          {new Date(paper.publishedAt).getFullYear()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 leading-snug">{paper.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-1">{paper.abstract}</p>
                      <p className="text-xs text-slate-400 font-medium">{paper.authors}</p>
                    </div>
                    {paper.url && (
                      <a href={paper.url} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shrink-0">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </motion.div>
                ))
            }
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronRight size={20} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === p ? 'text-white' : 'bg-white dark:bg-slate-900 text-slate-600 border border-slate-200 dark:border-slate-700'}`}
                style={page === p ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
                {p}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
