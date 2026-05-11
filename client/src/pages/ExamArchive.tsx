import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, FileText, Filter, Eye } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

interface Exam {
  id: string;
  course: string;
  code: string;
  department: string;
  year: number;
  type: 'midterm' | 'final';
  professor: string;
  downloads: number;
  pdfUrl: string;
}

const EXAMS: Exam[] = [
  { id: '1', course: 'Algorithms', code: 'CS301', department: 'CS', year: 2024, type: 'final', professor: 'د. أحمد محمد', downloads: 342, pdfUrl: '#' },
  { id: '2', course: 'Data Structures', code: 'CS201', department: 'CS', year: 2024, type: 'midterm', professor: 'د. سارة علي', downloads: 289, pdfUrl: '#' },
  { id: '3', course: 'Database Systems', code: 'IS301', department: 'IS', year: 2023, type: 'final', professor: 'د. محمود خالد', downloads: 415, pdfUrl: '#' },
  { id: '4', course: 'Computer Networks', code: 'IT301', department: 'IT', year: 2024, type: 'final', professor: 'د. نهى حسن', downloads: 198, pdfUrl: '#' },
  { id: '5', course: 'Software Engineering', code: 'SE301', department: 'SE', year: 2023, type: 'midterm', professor: 'د. عمرو سالم', downloads: 156, pdfUrl: '#' },
  { id: '6', course: 'Operating Systems', code: 'CS302', department: 'CS', year: 2023, type: 'final', professor: 'د. ياسر حلمي', downloads: 378, pdfUrl: '#' },
  { id: '7', course: 'Machine Learning', code: 'CS401', department: 'CS', year: 2024, type: 'midterm', professor: 'د. منى إبراهيم', downloads: 512, pdfUrl: '#' },
  { id: '8', course: 'Information Systems Analysis', code: 'IS201', department: 'IS', year: 2023, type: 'final', professor: 'د. هشام فاروق', downloads: 234, pdfUrl: '#' },
  { id: '9', course: 'Web Development', code: 'IT201', department: 'IT', year: 2024, type: 'final', professor: 'د. شيرين مصطفى', downloads: 445, pdfUrl: '#' },
  { id: '10', course: 'Design Patterns', code: 'SE401', department: 'SE', year: 2023, type: 'midterm', professor: 'د. رانيا يوسف', downloads: 167, pdfUrl: '#' },
  { id: '11', course: 'Computer Vision', code: 'CS402', department: 'CS', year: 2022, type: 'final', professor: 'د. سارة علي', downloads: 298, pdfUrl: '#' },
  { id: '12', course: 'Cloud Computing', code: 'IT402', department: 'IT', year: 2022, type: 'midterm', professor: 'د. شيرين مصطفى', downloads: 189, pdfUrl: '#' },
];

const DEPTS = ['All', 'CS', 'IS', 'IT', 'SE'];
const YEARS = ['All', 2024, 2023, 2022];
const TYPES = ['All', 'midterm', 'final'];

const ExamArchive: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [year, setYear] = useState<string | number>('All');
  const [type, setType] = useState('All');
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  const filtered = EXAMS.filter(e => {
    const q = search.toLowerCase();
    return (
      (!q || e.course.toLowerCase().includes(q) || e.code.toLowerCase().includes(q)) &&
      (dept === 'All' || e.department === dept) &&
      (year === 'All' || e.year === year) &&
      (type === 'All' || e.type === type)
    );
  });

  const handleDownload = (id: string) => {
    setDownloadCounts(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
    // In production this would trigger a real download
    alert('سيتم تحميل الملف قريباً بعد الاتصال بالخادم');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title="أرشيف الامتحانات" subtitle="تصفح وحمّل امتحانات السنوات السابقة" breadcrumb="الرئيسية / الامتحانات" />

      <div className="container mx-auto px-4 py-10">
        {/* Search & Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm mb-8 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث باسم المادة أو الكود..."
              className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select value={dept} onChange={e => setDept(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none">
            {DEPTS.map(d => <option key={d} value={d}>{d === 'All' ? 'كل الأقسام' : d}</option>)}
          </select>
          <select value={year} onChange={e => setYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none">
            {YEARS.map(y => <option key={y} value={y}>{y === 'All' ? 'كل السنوات' : y}</option>)}
          </select>
          <select value={type} onChange={e => setType(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none">
            {TYPES.map(t => <option key={t} value={t}>{t === 'All' ? 'نوع الامتحان' : t === 'midterm' ? 'نصف الفصل' : 'نهائي'}</option>)}
          </select>
          <div className="flex items-center gap-2 text-slate-500 text-sm ms-auto">
            <Filter size={14} />
            <span>{filtered.length} نتيجة</span>
          </div>
        </div>

        {/* Exams Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <FileText size={48} className="mx-auto mb-4 opacity-30" />
            <p>لا توجد امتحانات مطابقة</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((exam, i) => (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden group"
              >
                {/* Header */}
                <div className={`h-2 w-full ${exam.type === 'final' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-orange-500 to-pink-500'}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${exam.type === 'final' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'}`}>
                        {exam.type === 'final' ? 'نهائي' : 'نصف فصل'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{exam.year}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">{exam.course}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{exam.code} · {exam.department}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{exam.professor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Eye size={12} />
                      <span>{(exam.downloads + (downloadCounts[exam.id] || 0)).toLocaleString()}</span>
                    </div>
                    <button onClick={() => handleDownload(exam.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors group-hover:shadow-lg group-hover:shadow-blue-500/20">
                      <Download size={13} /> تحميل PDF
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamArchive;
