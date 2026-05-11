import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/ui/PageHeader';
import { NewsCardSkeleton } from '../components/ui/SkeletonLoader';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishedAt: string;
}

const CATEGORIES = ['All', 'Achievements', 'Academics', 'Events', 'Partnership', 'Community', 'Infrastructure'];
const categoryColors: Record<string, string> = {
  Achievements: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Academics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Events: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  Partnership: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Community: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Infrastructure: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<'news' | 'gallery'>('news');

  const fetchNews = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '6' });
    if (category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    api.get(`/news?${params}`).then(({ data }) => {
      setNews(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page, category, search]);

  useEffect(() => { fetchNews(); }, [fetchNews]);
  useEffect(() => { setPage(1); }, [category, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title="الأخبار والفعاليات" subtitle="ابق على اطلاع بآخر أخبار الكلية وفعالياتها" breadcrumb="المستجدات" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-between items-center">
          <div className="flex gap-2">
            {(['news', 'gallery'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${activeTab === tab ? 'text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}
                style={activeTab === tab ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
                {tab === 'news' ? '📰 الأخبار' : '🖼 المعرض'}
              </button>
            ))}
          </div>

          {activeTab === 'news' && (
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث في الأخبار..."
                className="input-field ps-9 pe-4 py-2 text-sm w-52"
              />
            </form>
          )}
        </div>

        {activeTab === 'news' && (
          <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${category === cat ? 'text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}
                  style={category === cat ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
                  {cat === 'All' ? 'الكل' : cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? [1,2,3,4,5,6].map(i => <NewsCardSkeleton key={i} />)
                : news.length === 0
                  ? <div className="col-span-3 text-center py-20 text-slate-400">لا توجد نتائج</div>
                  : news.map((item, idx) => (
                    <motion.div key={item.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 group card-hover">
                      <div className="relative h-48 overflow-hidden">
                        <img src={item.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'}
                          alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className={`absolute top-3 start-3 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[item.category] || 'bg-slate-100 text-slate-700'}`}>
                          {item.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                          <Calendar size={12} />
                          {new Date(item.publishedAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{item.content}</p>
                      </div>
                    </motion.div>
                  ))
              }
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <ChevronRight size={20} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === p ? 'text-white shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400'}`}
                    style={page === p ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
                    {p}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <ChevronLeft size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.07 }}
                className="relative rounded-2xl overflow-hidden h-56 group cursor-pointer">
                <img src={`https://images.unsplash.com/photo-${['1531482615713-2afd69097998','1551288049-bebda4e38f71','1540575467063-178a50c2df87','1523050854058-8df90110c9f1','1461749280684-dccba630e2f6','1504384308090-c894fdcc538d'][idx-1]}?w=600&q=80`}
                  alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="text-white" size={40} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
