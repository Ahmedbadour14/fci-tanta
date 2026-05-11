import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Clock, Users, BookOpen, Save, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

interface Course {
  id: string;
  code: string;
  name: string;
  creditHours: number;
  professor: string;
  schedule: { day: string; start: number; end: number; room: string }[];
  seats: number;
  enrolled: number;
  department: string;
}

const COURSES: Course[] = [
  { id: 'c1', code: 'CS401', name: 'Machine Learning', creditHours: 3, professor: 'د. أحمد محمد', schedule: [{ day: 'السبت', start: 9, end: 11, room: 'C101' }, { day: 'الثلاثاء', start: 9, end: 10, room: 'C101' }], seats: 40, enrolled: 28, department: 'CS' },
  { id: 'c2', code: 'CS402', name: 'Computer Vision', creditHours: 3, professor: 'د. سارة علي', schedule: [{ day: 'الأحد', start: 11, end: 13, room: 'C102' }, { day: 'الأربعاء', start: 11, end: 12, room: 'C102' }], seats: 35, enrolled: 35, department: 'CS' },
  { id: 'c3', code: 'IS401', name: 'Enterprise Systems', creditHours: 3, professor: 'د. محمود خالد', schedule: [{ day: 'السبت', start: 11, end: 13, room: 'B201' }, { day: 'الثلاثاء', start: 11, end: 12, room: 'B201' }], seats: 45, enrolled: 20, department: 'IS' },
  { id: 'c4', code: 'IT401', name: 'Network Security', creditHours: 3, professor: 'د. نهى حسن', schedule: [{ day: 'الأحد', start: 9, end: 11, room: 'A301' }, { day: 'الخميس', start: 9, end: 10, room: 'A301' }], seats: 40, enrolled: 38, department: 'IT' },
  { id: 'c5', code: 'SE401', name: 'Software Architecture', creditHours: 3, professor: 'د. عمرو سالم', schedule: [{ day: 'الاثنين', start: 9, end: 11, room: 'D401' }, { day: 'الأربعاء', start: 9, end: 10, room: 'D401' }], seats: 30, enrolled: 22, department: 'SE' },
  { id: 'c6', code: 'CS403', name: 'Natural Language Processing', creditHours: 2, professor: 'د. منى إبراهيم', schedule: [{ day: 'الاثنين', start: 11, end: 13, room: 'C103' }], seats: 25, enrolled: 18, department: 'CS' },
  { id: 'c7', code: 'IS402', name: 'Decision Support Systems', creditHours: 3, professor: 'د. هشام فاروق', schedule: [{ day: 'السبت', start: 9, end: 11, room: 'B202' }, { day: 'الثلاثاء', start: 13, end: 14, room: 'B202' }], seats: 40, enrolled: 30, department: 'IS' },
  { id: 'c8', code: 'GEN401', name: 'Professional Ethics', creditHours: 2, professor: 'د. رانيا يوسف', schedule: [{ day: 'الخميس', start: 11, end: 13, room: 'A101' }], seats: 80, enrolled: 45, department: 'GEN' },
  { id: 'c9', code: 'CS404', name: 'Parallel Computing', creditHours: 3, professor: 'د. ياسر حلمي', schedule: [{ day: 'الأحد', start: 13, end: 15, room: 'C104' }, { day: 'الأربعاء', start: 13, end: 14, room: 'C104' }], seats: 30, enrolled: 12, department: 'CS' },
  { id: 'c10', code: 'IT402', name: 'Cloud Computing', creditHours: 3, professor: 'د. شيرين مصطفى', schedule: [{ day: 'الاثنين', start: 13, end: 15, room: 'A302' }, { day: 'الخميس', start: 13, end: 14, room: 'A302' }], seats: 35, enrolled: 28, department: 'IT' },
];

const MAX_HOURS = 18;
const DAYS = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

function hasConflict(a: Course, b: Course): boolean {
  for (const sa of a.schedule) {
    for (const sb of b.schedule) {
      if (sa.day === sb.day && sa.start < sb.end && sb.start < sa.end) return true;
    }
  }
  return false;
}

const CourseRegistration: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalHours = selected.reduce((s, id) => s + (COURSES.find(c => c.id === id)?.creditHours || 0), 0);

  const toggle = (course: Course) => {
    if (selected.includes(course.id)) {
      setSelected(prev => prev.filter(id => id !== course.id));
      setConflicts([]);
    } else {
      const selectedCourses = COURSES.filter(c => selected.includes(c.id));
      const conflicting = selectedCourses.filter(s => hasConflict(s, course));
      if (conflicting.length > 0) {
        setConflicts([course.id, ...conflicting.map(c => c.id)]);
        setTimeout(() => setConflicts([]), 3000);
        return;
      }
      if (totalHours + course.creditHours > MAX_HOURS) return;
      setSelected(prev => [...prev, course.id]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedCourses = COURSES.filter(c => selected.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader
        title="تسجيل المواد"
        subtitle="اختر موادك للفصل الدراسي الجاري"
        breadcrumb="البوابة / تسجيل المواد"
      />

      <div className="container mx-auto px-4 py-10">
        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm ${
            totalHours >= MAX_HOURS ? 'bg-red-50 dark:bg-red-900/20 text-red-600' :
            totalHours >= 12 ? 'bg-green-50 dark:bg-green-900/20 text-green-600' :
            'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
          }`}>
            <BookOpen size={16} />
            {totalHours} / {MAX_HOURS} ساعة معتمدة
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-bold text-sm">
            <CheckCircle size={16} />
            {selected.length} مادة مختارة
          </div>
          {conflicts.length > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 font-bold text-sm">
              <AlertTriangle size={16} />
              تعارض في المواعيد!
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course list */}
          <div className="lg:col-span-2 space-y-3">
            {COURSES.map((course) => {
              const isSelected = selected.includes(course.id);
              const isFull = course.enrolled >= course.seats;
              const isConflict = conflicts.includes(course.id);
              const wouldExceed = !isSelected && totalHours + course.creditHours > MAX_HOURS;
              const isExpanded = expanded === course.id;

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border-2 transition-all duration-200 overflow-hidden ${
                    isConflict ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10' :
                    isSelected ? 'border-blue-500 shadow-blue-100 dark:shadow-blue-900/20' :
                    'border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">{course.code}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{course.department}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600">{course.creditHours} ساعات</span>
                          {isFull && <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500">ممتلئة</span>}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{course.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{course.professor}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setExpanded(isExpanded ? null : course.id)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <button
                          onClick={() => !isFull && toggle(course)}
                          disabled={isFull || (wouldExceed)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            isFull || wouldExceed ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400' :
                            isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          }`}
                        >
                          {isSelected ? '✓ مسجلة' : 'تسجيل'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Users size={12} /> {course.enrolled}/{course.seats}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${(course.enrolled / course.seats) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">الجدول الأسبوعي</p>
                          <div className="space-y-1.5">
                            {course.schedule.map((s, i) => (
                              <div key={i} className="flex items-center gap-3 text-sm">
                                <span className="w-20 font-medium text-slate-700 dark:text-slate-300">{s.day}</span>
                                <span className="flex items-center gap-1 text-slate-500"><Clock size={12} /> {s.start}:00 - {s.end}:00</span>
                                <span className="text-slate-400">{s.room}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Panel */}
          <div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">ملخص التسجيل</h3>
              {selectedCourses.length === 0 ? (
                <p className="text-slate-400 text-sm">لم تختر أي مادة بعد</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {selectedCourses.map(c => (
                    <div key={c.id} className="flex items-center justify-between text-sm">
                      <span className="text-slate-700 dark:text-slate-300">{c.name}</span>
                      <span className="font-bold text-blue-600">{c.creditHours}h</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-2 flex justify-between font-bold">
                    <span className="text-slate-900 dark:text-white">الإجمالي</span>
                    <span className="text-blue-600">{totalHours} ساعة</span>
                  </div>
                </div>
              )}

              {saved && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-600 mb-4 text-sm font-medium">
                  <CheckCircle size={16} /> تم حفظ التسجيل!
                </motion.div>
              )}

              <button
                onClick={handleSave}
                disabled={selected.length === 0}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                حفظ التسجيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
