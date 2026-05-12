import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Download, TrendingUp, Award, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

interface CourseGrade { code: string; name: string; creditHours: number; midterm: number | null; final: number | null; practical: number | null; total: number | null; grade: string; }
interface Semester { labelKey: string; courses: CourseGrade[]; }

const GRADE_COLORS: Record<string, string> = {
  'A+': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400',
  'A': 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400',
  'B+': 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400',
  'B': 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400',
  'C+': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400',
  'C': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400',
  'D': 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-400',
  'F': 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400',
  'N/A': 'text-slate-400 bg-slate-100 dark:bg-slate-800',
};
const GP: Record<string, number> = { 'A+': 4, 'A': 4, 'B+': 3.5, 'B': 3, 'C+': 2.5, 'C': 2, 'D': 1, 'F': 0 };

const SEMESTERS: Semester[] = [
  { labelKey: 'gradesPage.semesters.y1s1', courses: [
    { code: 'CS101', name: 'Intro to Computing', creditHours: 3, midterm: 28, final: 52, practical: 14, total: 94, grade: 'A+' },
    { code: 'MATH101', name: 'Calculus I', creditHours: 3, midterm: 25, final: 45, practical: null, total: 70, grade: 'B+' },
    { code: 'CS102', name: 'Programming Fundamentals', creditHours: 4, midterm: 30, final: 55, practical: 15, total: 100, grade: 'A+' },
    { code: 'ENG101', name: 'English I', creditHours: 2, midterm: 18, final: 40, practical: null, total: 58, grade: 'C+' },
  ]},
  { labelKey: 'gradesPage.semesters.y1s2', courses: [
    { code: 'CS103', name: 'Data Structures', creditHours: 3, midterm: 27, final: 50, practical: 13, total: 90, grade: 'A+' },
    { code: 'MATH102', name: 'Calculus II', creditHours: 3, midterm: 24, final: 44, practical: null, total: 68, grade: 'B' },
    { code: 'CS104', name: 'Digital Logic', creditHours: 3, midterm: 26, final: 48, practical: 14, total: 88, grade: 'A' },
  ]},
  { labelKey: 'gradesPage.semesters.y2s1', courses: [
    { code: 'CS201', name: 'Algorithms', creditHours: 3, midterm: 29, final: 53, practical: 15, total: 97, grade: 'A+' },
    { code: 'CS202', name: 'Database Systems', creditHours: 3, midterm: 25, final: 47, practical: 13, total: 85, grade: 'A' },
    { code: 'CS203', name: 'Operating Systems', creditHours: 3, midterm: 23, final: 44, practical: 12, total: 79, grade: 'B+' },
  ]},
  { labelKey: 'gradesPage.semesters.y2s2', courses: [
    { code: 'CS204', name: 'Computer Networks', creditHours: 3, midterm: 26, final: null, practical: null, total: null, grade: 'N/A' },
    { code: 'CS205', name: 'Software Engineering', creditHours: 3, midterm: 28, final: null, practical: null, total: null, grade: 'N/A' },
  ]},
];

function calcGPA(courses: CourseGrade[]) {
  const g = courses.filter(c => c.total !== null);
  if (!g.length) return 0;
  return g.reduce((s, c) => s + (GP[c.grade] || 0) * c.creditHours, 0) / g.reduce((s, c) => s + c.creditHours, 0);
}

const Grades: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const allDone = SEMESTERS.flatMap(s => s.courses).filter(c => c.total !== null);
  const cumGPA = calcGPA(allDone);
  const semGPA = calcGPA(SEMESTERS[activeTab].courses);
  const sem = SEMESTERS[activeTab];

  // standing using translated labels
  const standing = (gpa: number) => {
    if (gpa >= 3.7) return { labelKey: 'gradesPage.standing.excellent', color: 'text-emerald-600' };
    if (gpa >= 3.0) return { labelKey: 'gradesPage.standing.veryGood', color: 'text-blue-600' };
    if (gpa >= 2.0) return { labelKey: 'gradesPage.standing.good', color: 'text-yellow-600' };
    if (gpa >= 1.0) return { labelKey: 'gradesPage.standing.pass', color: 'text-orange-600' };
    return { labelKey: 'gradesPage.standing.fail', color: 'text-red-600' };
  };

  const st = standing(cumGPA);

  const handlePDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('FCI Tanta - Academic Transcript', 14, 18);
    doc.setFontSize(10);
    doc.text(`Cumulative GPA: ${cumGPA.toFixed(2)} | Standing: ${t(st.labelKey)}`, 14, 26);
    SEMESTERS.forEach((s, i) => {
      if (i > 0) doc.addPage();
      doc.setFontSize(12);
      doc.text(t(s.labelKey), 14, i === 0 ? 36 : 18);
      autoTable(doc, {
        startY: i === 0 ? 40 : 24,
        head: [['Code', 'Course', 'Cr.Hrs', 'Midterm', 'Final', 'Practical', 'Total', 'Grade']],
        body: s.courses.map(c => [c.code, c.name, c.creditHours, c.midterm ?? '-', c.final ?? '-', c.practical ?? '-', c.total ?? '-', c.grade]),
        styles: { fontSize: 9 }, headStyles: { fillColor: [37, 99, 235] },
      });
    });
    doc.save('FCI_Transcript.pdf');
  };

  const statsCards = [
    { labelKey: 'gradesPage.cumulativeGPA', value: cumGPA.toFixed(2), icon: <TrendingUp size={20} />, bg: 'bg-blue-50 dark:bg-blue-900/30', ic: 'text-blue-600' },
    { labelKey: 'gradesPage.academicStanding', value: t(st.labelKey), icon: <Award size={20} />, bg: 'bg-purple-50 dark:bg-purple-900/30', ic: 'text-purple-600' },
    { labelKey: 'gradesPage.completedHours', value: `${allDone.reduce((s, c) => s + c.creditHours, 0)}h`, icon: <BookOpen size={20} />, bg: 'bg-emerald-50 dark:bg-emerald-900/30', ic: 'text-emerald-600' },
    { labelKey: 'gradesPage.semesterGPA', value: semGPA > 0 ? semGPA.toFixed(2) : '-', icon: <TrendingUp size={20} />, bg: 'bg-orange-50 dark:bg-orange-900/30', ic: 'text-orange-600' },
  ];

  const tableHeaders = [
    t('gradesPage.tableHeaders.code'),
    t('gradesPage.tableHeaders.course'),
    t('gradesPage.tableHeaders.creditHours'),
    t('gradesPage.tableHeaders.midterm'),
    t('gradesPage.tableHeaders.final'),
    t('gradesPage.tableHeaders.practical'),
    t('gradesPage.tableHeaders.total'),
    t('gradesPage.tableHeaders.grade'),
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title={t('gradesPage.title')} subtitle={t('gradesPage.subtitle')} breadcrumb={t('gradesPage.breadcrumb')} />

      <div className="container mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {t('back')}
        </button>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map(card => (
            <motion.div key={card.labelKey} whileHover={{ y: -3 }} className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg} ${card.ic}`}>{card.icon}</div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{card.value}</p>
              <p className="text-slate-500 text-xs mt-1">{t(card.labelKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Semester Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {SEMESTERS.map((s, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${i === activeTab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
              }`}>
              {t(s.labelKey)}
            </button>
          ))}
        </div>

        {/* Grades Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">{t(sem.labelKey)}</h3>
              <p className="text-slate-500 text-sm">
                {t('gradesPage.gpaLabel')} <span className="font-bold text-blue-600">{semGPA > 0 ? semGPA.toFixed(2) : t('gradesPage.inProgress')}</span>
              </p>
            </div>
            <button onClick={handlePDF} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-colors">
              <Download size={16} /> {t('gradesPage.downloadPDF')}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  {tableHeaders.map(h => (
                    <th key={h} className="px-4 py-3 text-start text-xs font-bold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sem.courses.map((c, i) => (
                  <motion.tr key={c.code} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-bold text-blue-600">{c.code}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{c.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{c.creditHours}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{c.midterm ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{c.final ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{c.practical ?? '—'}</td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-white">{c.total ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${GRADE_COLORS[c.grade] || GRADE_COLORS['N/A']}`}>{c.grade}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
