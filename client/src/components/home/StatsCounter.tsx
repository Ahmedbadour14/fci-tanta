import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import api from '../../services/api';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  color: string;
}

const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatsCounter = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'طالب مسجل', value: 5000, suffix: '+', color: 'from-blue-500 to-blue-600' },
    { label: 'عضو هيئة تدريس', value: 150, suffix: '+', color: 'from-violet-500 to-violet-600' },
    { label: 'برنامج أكاديمي', value: 12, color: 'from-emerald-500 to-emerald-600' },
    { label: 'ورقة بحثية', value: 1500, suffix: '+', color: 'from-orange-500 to-orange-600' },
  ]);

  useEffect(() => {
    api.get('/stats').then(({ data }) => {
      setStats([
        { label: 'طالب مسجل', value: data.totalStudents || 5000, suffix: '+', color: 'from-blue-500 to-blue-600' },
        { label: 'عضو هيئة تدريس', value: data.totalStaff || 150, suffix: '+', color: 'from-violet-500 to-violet-600' },
        { label: 'قسم أكاديمي', value: data.totalDepartments || 4, color: 'from-emerald-500 to-emerald-600' },
        { label: 'ورقة بحثية', value: data.totalResearch || 1500, suffix: '+', color: 'from-orange-500 to-orange-600' },
      ]);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700 overflow-hidden card-hover">
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl`} />
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
