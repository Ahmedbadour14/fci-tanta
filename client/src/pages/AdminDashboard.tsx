import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import {
  Users, FileText, Image as ImageIcon, BarChart2,
  Plus, Edit, Trash2, TrendingUp, BookOpen, Mail, RefreshCw, ArrowLeft
} from 'lucide-react';
import api from '../services/api';
import { TableRowSkeleton } from '../components/ui/SkeletonLoader';
import toast from 'react-hot-toast';

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, newsRes] = await Promise.all([
        api.get('/stats'),
        api.get('/news?limit=10'),
      ]);
      setStats(statsRes.data);
      setNews(newsRes.data.data || []);
    } catch {
      toast.error('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return;
    try {
      await api.delete(`/news/${id}`);
      setNews(prev => prev.filter(n => n.id !== id));
      toast.success('تم حذف الخبر');
    } catch {
      toast.error('فشل حذف الخبر');
    }
  };

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart2 },
    { id: 'news', label: 'إدارة الأخبار', icon: FileText },
    { id: 'users', label: 'المستخدمون', icon: Users },
    { id: 'contacts', label: 'الرسائل', icon: Mail },
    { id: 'gallery', label: 'المعرض', icon: ImageIcon },
  ];

  const overviewCards = stats ? [
    { label: 'الطلاب', value: stats.totalStudents, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'أعضاء التدريس', value: stats.totalStaff, icon: BookOpen, color: 'from-violet-500 to-violet-600' },
    { label: 'الأخبار', value: stats.totalNews, icon: FileText, color: 'from-emerald-500 to-emerald-600' },
    { label: 'الأبحاث', value: stats.totalResearch, icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ] : [];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-e border-slate-200 dark:border-slate-800 p-5 shrink-0">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-6">
          <ArrowLeft size={16} className="rtl:rotate-180" /> العودة
        </button>
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <p className="text-white/70 text-xs font-medium mb-1">مرحبًا،</p>
          <p className="text-white font-bold text-lg">{user?.firstName} {user?.lastName}</p>
          <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded-full mt-1">مدير النظام</span>
        </div>
        <nav className="space-y-1 flex-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <button onClick={() => loadData()} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm px-4 py-2 hover:text-blue-600 transition-colors mt-4">
          <RefreshCw size={15} /> تحديث البيانات
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 md:p-8 overflow-hidden">
        {/* Mobile tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto md:hidden pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'text-white' : 'bg-white dark:bg-slate-900 text-slate-600 border border-slate-200 dark:border-slate-700'}`}
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' } : {}}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {loading
                ? [1,2,3,4].map(i => <div key={i} className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)
                : overviewCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`rounded-2xl p-5 text-white bg-gradient-to-br ${card.color} shadow-lg`}>
                      <Icon size={24} className="mb-3 opacity-80" />
                      <div className="text-3xl font-black">{card.value}</div>
                      <div className="text-sm opacity-80 mt-1">{card.label}</div>
                    </motion.div>
                  );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Area Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">المنشورات الشهرية</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={stats?.monthlyPublications?.length ? stats.monthlyPublications : [
                    { month: '2025-11', count: 2 }, { month: '2025-12', count: 3 },
                    { month: '2026-01', count: 1 }, { month: '2026-02', count: 4 },
                    { month: '2026-03', count: 2 }, { month: '2026-04', count: 5 },
                  ]}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4">توزيع المستخدمين</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={stats?.usersByRole?.length ? stats.usersByRole.map((r: any) => ({ name: r.role, value: r.count })) : [
                        { name: 'student', value: 60 }, { name: 'staff', value: 25 }, { name: 'admin', value: 15 },
                      ]}
                      cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {(stats?.usersByRole || [{},{},{}]).map((_: any, index: number) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">إدارة الأخبار</h2>
              <button className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2">
                <Plus size={16} /> خبر جديد
              </button>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      {['العنوان', 'الفئة', 'التاريخ', 'إجراءات'].map(h => (
                        <th key={h} className="text-start p-4 font-bold text-slate-700 dark:text-slate-300">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? [1,2,3,4,5].map(i => <TableRowSkeleton key={i} />)
                      : news.map(item => (
                        <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-medium text-slate-800 dark:text-white max-w-xs truncate">{item.title}</td>
                          <td className="p-4">
                            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-lg">{item.category}</span>
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400">
                            {new Date(item.publishedAt).toLocaleDateString('ar-EG')}
                          </td>
                          <td className="p-4 flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                              <Edit size={15} />
                            </button>
                            <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">رسائل التواصل</h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                <Mail size={40} className="mx-auto mb-3 opacity-30" />
                <p>لا توجد رسائل حتى الآن</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">إدارة المستخدمين</h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-center text-slate-400 shadow-sm">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p>قسم إدارة المستخدمين قيد التطوير</p>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">إدارة المعرض</h2>
              <button className="btn-primary flex items-center gap-2 text-sm !px-4 !py-2">
                <Plus size={16} /> رفع صورة
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="relative rounded-xl overflow-hidden h-40 group">
                  <img src={`https://images.unsplash.com/photo-${['1531482615713-2afd69097998','1551288049-bebda4e38f71','1540575467063-178a50c2df87','1523050854058-8df90110c9f1','1461749280684-dccba630e2f6','1504384308090-c894fdcc538d'][i-1]}?w=400&q=80`}
                    alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/80 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
