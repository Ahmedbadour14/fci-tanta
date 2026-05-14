import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, Clock, Users, BookOpen, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FacultyPortal = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-8 pb-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold mb-4">
              <ArrowLeft size={16} className="rtl:rotate-180" /> العودة
            </button>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Faculty Portal
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Manage your courses, students, and research.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2">
              <Upload size={18} /> Upload Material
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Active Courses', value: '4', icon: BookOpen, color: 'text-blue-500 bg-blue-100' },
                { title: 'Total Students', value: '240', icon: Users, color: 'text-emerald-500 bg-emerald-100' },
                { title: 'Publications', value: '12', icon: FileText, color: 'text-purple-500 bg-purple-100' },
                { title: 'Office Hours', value: '6', icon: Clock, color: 'text-orange-500 bg-orange-100' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center"
                  >
                    <div className={`p-3 rounded-full mb-3 ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Current Courses */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">My Courses (Fall 2026)</h2>
              <div className="space-y-4">
                {[
                  { code: 'CS311', name: 'Data Structures', students: 85, time: 'Mon 09:00 AM' },
                  { code: 'CS412', name: 'Machine Learning', students: 60, time: 'Wed 11:30 AM' },
                ].map((course, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-primary dark:text-accent">{course.code}</span>
                        <h4 className="font-bold text-slate-800 dark:text-white">{course.name}</h4>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Clock size={14} /> {course.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center px-4 border-r border-slate-200 dark:border-slate-700">
                        <span className="block font-bold text-slate-800 dark:text-white">{course.students}</span>
                        <span className="text-xs text-slate-500">Students</span>
                      </div>
                      <button className="text-primary font-medium hover:underline text-sm">Manage</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center">
              <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{user?.firstName} {user?.lastName}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Professor of Computer Science</p>
              <button className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
                <Settings size={18} /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPortal;
