import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';
import {
  BookOpen, Calendar, Clock, GraduationCap,
  Bell, AlertCircle, User, LogOut, TrendingUp, ArrowLeft
} from 'lucide-react';
import api from '../services/api';

const Portal = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/stats').then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };
  if (!user) return null;

  const gradeData = [
    { subject: t('studentPortalPage.grades.algorithms'), grade: 88 },
    { subject: t('studentPortalPage.grades.databases'), grade: 92 },
    { subject: t('studentPortalPage.grades.networks'), grade: 75 },
    { subject: t('studentPortalPage.grades.ai'), grade: 95 },
    { subject: t('studentPortalPage.grades.softwareEng'), grade: 80 },
    { subject: t('studentPortalPage.grades.cyberSec'), grade: 85 },
  ];

  const quickLinks = [
    {
      titleKey: 'studentPortalPage.quickLinks.courseReg',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      descKey: 'studentPortalPage.quickLinks.courseRegDesc',
      path: '/portal/student/registration'
    },
    {
      titleKey: 'studentPortalPage.quickLinks.schedule',
      icon: Calendar,
      color: 'from-emerald-500 to-emerald-600',
      descKey: 'studentPortalPage.quickLinks.scheduleDesc',
      path: '/portal/student/schedule'
    },
    {
      titleKey: 'studentPortalPage.quickLinks.grades',
      icon: GraduationCap,
      color: 'from-violet-500 to-violet-600',
      descKey: 'studentPortalPage.quickLinks.gradesDesc',
      path: '/portal/student/grades'
    },
    {
      titleKey: 'studentPortalPage.quickLinks.absenceReq',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
      descKey: 'studentPortalPage.quickLinks.absenceReqDesc',
      path: '/portal/student/excuse'
    },
  ];

  const notifications = [
    { titleKey: 'studentPortalPage.notif1Title', descKey: 'studentPortalPage.notif1Desc', timeKey: 'studentPortalPage.notif1Time', type: 'warning' },
    { titleKey: 'studentPortalPage.notif2Title', descKey: 'studentPortalPage.notif2Desc', timeKey: 'studentPortalPage.notif2Time', type: 'info' },
    { titleKey: 'studentPortalPage.notif3Title', descKey: 'studentPortalPage.notif3Desc', timeKey: 'studentPortalPage.notif3Time', type: 'normal' },
  ];

  const schedule = [
    { timeStr: '09:00 - 11:00', courseKey: 'studentPortalPage.schedule.cs311', roomKey: 'studentPortalPage.schedule.hallA', color: 'border-blue-500' },
    { timeStr: '11:30 - 01:30', courseKey: 'studentPortalPage.schedule.is312', roomKey: 'studentPortalPage.schedule.lab3', color: 'border-emerald-500' },
    { timeStr: '02:00 - 04:00', courseKey: 'studentPortalPage.schedule.it313', roomKey: 'studentPortalPage.schedule.hallB', color: 'border-violet-500' },
  ];

  return (
    <div className="min-h-screen pt-8 pb-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-4">
              <ArrowLeft size={16} className="rtl:rotate-180" /> {t('studentPortalPage.back')}
            </button>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
              <User size={14} className="inline me-1" />
              {user.email} — {user.role === 'student' ? t('studentPortalPage.role_student') : user.role}
            </p>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white">
              {t('studentPortalPage.greeting')} <span className="gradient-text">{user.firstName}!</span>
            </h1>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            <LogOut size={16} /> {t('studentPortalPage.logout')}
          </button>
        </motion.div>

        {/* Quick Actions — navigable cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={idx}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(link.path);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-3 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center bg-gradient-to-br ${link.color} shadow-lg`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">{t(link.titleKey)}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t(link.descKey)}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Schedule + Grades */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" /> {t('studentPortalPage.todaySchedule')}
                </h2>
                <button
                  onClick={() => navigate('/portal/student/schedule')}
                  className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline"
                >
                  {t('studentPortalPage.viewFull')}
                </button>
              </div>
              <div className="space-y-3">
                {schedule.map((cls, idx) => (
                  <div key={idx} className={`flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-s-4 ${cls.color}`}>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium w-36 shrink-0">
                      <Clock size={13} className="text-blue-500" /> {cls.timeStr}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white text-sm">{t(cls.courseKey)}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t(cls.roomKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-violet-500" /> {t('studentPortalPage.coursePerformance')}
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={gradeData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name={t('studentPortalPage.gradeTooltip')} dataKey="grade" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip formatter={(v: any) => [`${v}%`, t('studentPortalPage.gradeTooltip')]} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right: Notifications + Progress */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5">
                <Bell size={18} className="text-orange-500" /> {t('studentPortalPage.notifications')}
              </h2>
              <div className="space-y-3">
                {notifications.map((n, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border-s-4 text-sm ${n.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10' : 'border-blue-500 bg-slate-50 dark:bg-slate-800/50'}`}>
                    <p className="font-bold text-slate-800 dark:text-white">{t(n.titleKey)}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{t(n.descKey)}</p>
                    <p className="text-slate-400 text-[10px] uppercase font-bold mt-1.5">{t(n.timeKey)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-5">
                <GraduationCap size={18} className="text-emerald-500" /> {t('studentPortalPage.academicProgress')}
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t('studentPortalPage.creditHours')}</span>
                    <span className="font-bold text-slate-800 dark:text-white">85 / 132</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '64%' }}
                      transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
                  </div>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">3.42</p>
                    <p className="text-slate-500 text-xs mt-1">{t('studentPortalPage.cumulativeGPA')}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-2xl font-black text-slate-800 dark:text-white">3</p>
                    <p className="text-slate-500 text-xs mt-1">{t('studentPortalPage.studyLevel')}</p>
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
