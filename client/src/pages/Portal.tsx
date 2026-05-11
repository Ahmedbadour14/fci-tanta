import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import {
  BookOpen, Calendar, Clock, GraduationCap,
  Bell, AlertCircle, User, LogOut, TrendingUp, ArrowLeft
} from 'lucide-react';
import api from '../services/api';

const gradeData = [
  { subject: 'خوارزميات', grade: 88 },
  { subject: 'قواعد البيانات', grade: 92 },
  { subject: 'الشبكات', grade: 75 },
  { subject: 'الذكاء الاصطناعي', grade: 95 },
  { subject: 'هندسة البرمجيات', grade: 80 },
  { subject: 'الأمن السيبراني', grade: 85 },
];

const Portal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/stats').then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };
  if (!user) return null;

  const quickLinks = [
    { title: 'تسجيل المقررات', icon: BookOpen, color: 'from-blue-500 to-blue-600', desc: 'سجل مقرراتك' },
    { title: 'الجدول الدراسي', icon: Calendar, color: 'from-emerald-500 to-emerald-600', desc: 'اعرض جدولك' },
    { title: 'الدرجات والسجل', icon: GraduationCap, color: 'from-violet-500 to-violet-600', desc: 'درجاتك ومعدلك' },
    { title: 'طلب إذن غياب', icon: AlertCircle, color: 'from-orange-500 to-orange-600', desc: 'قدّم طلبًا' },
  ];

  const notifications = [
    { title: 'موعد سداد الرسوم', desc: 'يرجى إتمام السداد قبل 15 أكتوبر.', time: 'منذ ساعتين', type: 'warning' },
    { title: 'تم تصحيح الواجب', desc: 'تم رصد درجة مادة IS312.', time: 'منذ يوم', type: 'info' },
    { title: 'إجازة رسمية', desc: 'الجامعة مغلقة يوم الخميس القادم.', time: 'منذ يومين', type: 'normal' },
  ];

  const schedule = [
    { time: '09:00 - 11:00 ص', course: 'CS311 - هياكل البيانات', room: 'قاعة أ', color: 'border-blue-500' },
    { time: '11:30 - 01:30 م', course: 'IS312 - قواعد البيانات', room: 'معمل 3', color: 'border-emerald-500' },
    { time: '02:00 - 04:00 م', course: 'IT313 - شبكات الحاسوب', room: 'قاعة ب', color: 'border-violet-500' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-4">
              <ArrowLeft size={16} className="rtl:rotate-180" /> العودة
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
              <User size={14} className="inline me-1" />
              {user.email} — {user.role === 'student' ? 'طالب' : user.role}
            </p>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white">
              أهلاً، <span className="gradient-text">{user.firstName}!</span>
            </h1>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            <LogOut size={16} /> تسجيل الخروج
          </button>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.button key={idx}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center bg-gradient-to-br ${link.color} shadow-lg`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">{link.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{link.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column: Schedule + Grades */}
          <div className="lg:col-span-2 space-y-6">

            {/* Today's Schedule */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" /> جدول اليوم
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline">عرض الكامل</button>
              </div>
              <div className="space-y-3">
                {schedule.map((cls, idx) => (
                  <div key={idx} className={`flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-s-4 ${cls.color}`}>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium w-36 shrink-0">
                      <Clock size={13} className="text-blue-500" /> {cls.time}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white text-sm">{cls.course}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Grade Radar Chart */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-violet-500" /> أداء المقررات
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={gradeData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="الدرجات" dataKey="grade" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip formatter={(v: any) => [`${v}%`, 'الدرجة']} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right column: Notifications + Progress */}
          <div className="space-y-6">

            {/* Notifications */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5">
                <Bell size={18} className="text-orange-500" /> الإشعارات
              </h2>
              <div className="space-y-3">
                {notifications.map((n, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border-s-4 text-sm ${n.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-blue-500 bg-slate-50 dark:bg-slate-800/50'}`}>
                    <p className="font-bold text-slate-800 dark:text-white">{n.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{n.desc}</p>
                    <p className="text-slate-400 text-[10px] uppercase font-bold mt-1.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Academic Progress */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5">
                <GraduationCap size={18} className="text-emerald-500" /> التقدم الأكاديمي
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">الساعات المعتمدة</span>
                    <span className="font-bold text-slate-800 dark:text-white">85 / 132</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '64%' }}
                      transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                    />
                  </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">3.42</p>
                    <p className="text-slate-500 text-xs mt-1">المعدل التراكمي</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">3</p>
                    <p className="text-slate-500 text-xs mt-1">المستوى الدراسي</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
