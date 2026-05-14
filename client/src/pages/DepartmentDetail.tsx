import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Database, Network, Code2, Users, BookOpen, FlaskConical, ChevronLeft } from 'lucide-react';

const departmentData: Record<string, any> = {
  cs: {
    name: 'Computer Science',
    image: '/images/dept-cs.jpg',
    icon: Monitor,
    head: 'Prof. Dr. Mahmoud El-Sayed',
    vision: 'To be a center of excellence in computer science education and research locally and internationally.',
    courses: ['Algorithms', 'Data Structures', 'Artificial Intelligence', 'Operating Systems', 'Computer Graphics'],
    research: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
    color: 'bg-blue-500'
  },
  is: {
    name: 'Information Systems',
    image: '/images/dept-is.jpg',
    icon: Database,
    head: 'Prof. Dr. Mona Ali',
    vision: 'To lead in the integration of business processes and technological solutions.',
    courses: ['Database Management', 'Systems Analysis', 'Data Mining', 'E-Business', 'Information Security'],
    research: ['Big Data Analytics', 'Health Informatics', 'Enterprise Systems'],
    color: 'bg-emerald-500'
  },
  it: {
    name: 'Information Technology',
    image: '/images/dept-it.jpg',
    icon: Network,
    head: 'Prof. Dr. Tarek Hassan',
    vision: 'To prepare skilled professionals capable of designing and managing modern IT infrastructure.',
    courses: ['Computer Networks', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Network Administration'],
    research: ['Wireless Networks', 'Information Security', 'Distributed Systems'],
    color: 'bg-orange-500'
  },
  se: {
    name: 'Software Engineering',
    image: '/images/dept-se.jpg',
    icon: Code2,
    head: 'Prof. Dr. Salma Ibrahim',
    vision: 'To engineer reliable, scalable, and secure software systems for the future.',
    courses: ['Software Architecture', 'Agile Development', 'Software Testing', 'Requirements Engineering', 'DevOps'],
    research: ['Software Quality', 'Empirical Software Engineering', 'Automated Testing'],
    color: 'bg-purple-500'
  }
};

const DepartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dept = id ? departmentData[id] : null;

  if (!dept) {
    return <div className="pt-32 text-center text-2xl font-bold">Department not found</div>;
  }

  const Icon = dept.icon;

  return (
    <div className="min-h-screen pt-8 pb-12 bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className={`${dept.color} text-white py-16 mb-12`}>
        <div className="container mx-auto px-4">
          <Link to="/departments" className="inline-flex items-center gap-2 mb-8 hover:underline opacity-80 hover:opacity-100">
            <ChevronLeft size={20} /> Back to Departments
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm overflow-hidden border-2 border-white/30">
              <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {dept.name}
              </motion.h1>
              <p className="text-xl opacity-90">Department</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Vision & Mission</h2>
              <div className="w-12 h-1 bg-accent mb-6" />
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {dept.vision}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className={dept.color.replace('bg-', 'text-')} size={28} />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Core Courses</h2>
              </div>
              <div className="w-12 h-1 bg-accent mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dept.courses.map((course: string, idx: number) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300">
                    {course}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className={dept.color.replace('bg-', 'text-')} size={28} />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Research Areas</h2>
              </div>
              <div className="w-12 h-1 bg-accent mb-6" />
              <ul className="space-y-3">
                {dept.research.map((area: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <div className={`w-2 h-2 rounded-full ${dept.color}`} />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center"
            >
              <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white dark:border-slate-950 shadow-lg">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Head of Department" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{dept.head}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Head of Department</p>
              <button className={`w-full py-2 rounded-lg text-white font-medium ${dept.color} hover:opacity-90 transition-opacity`}>
                Contact Head
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Faculty Members</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-300">Dr. Placeholder {i}</h4>
                      <p className="text-sm text-slate-500">Associate Professor</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full text-center text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                View All Staff
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
