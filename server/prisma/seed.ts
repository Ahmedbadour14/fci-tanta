import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with rich Egyptian university data...');

  // Clean up
  await prisma.courseRegistration.deleteMany();
  await prisma.excuseRequest.deleteMany();
  await prisma.researchPaper.deleteMany();
  await prisma.course.deleteMany();
  await prisma.program.deleteMany();
  await prisma.student.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.department.deleteMany();
  await prisma.news.deleteMany();
  await prisma.event.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.user.deleteMany();

  // ── Departments ──────────────────────────────────────────────────────────
  const cs = await prisma.department.create({
    data: {
      name: 'Computer Science',
      description: 'يُعنى قسم علوم الحاسوب بالأسس النظرية للحوسبة وتطبيقاتها العملية، ويضم مجموعة من أبرز الأكاديميين في مجالات الذكاء الاصطناعي وأمن المعلومات وعلوم البيانات.',
    },
  });
  const is = await prisma.department.create({
    data: {
      name: 'Information Systems',
      description: 'يجمع قسم نظم المعلومات بين إدارة الأعمال وتقنية المعلومات، مع التركيز على تصميم الأنظمة المؤسسية وتحليل البيانات لدعم القرار.',
    },
  });
  const it = await prisma.department.create({
    data: {
      name: 'Information Technology',
      description: 'يُركز قسم تقنية المعلومات على البنية التحتية الرقمية وإدارة الشبكات والأمن السيبراني وتقنيات الحوسبة السحابية.',
    },
  });
  const se = await prisma.department.create({
    data: {
      name: 'Software Engineering',
      description: 'يطبق قسم هندسة البرمجيات مبادئ الهندسة على تطوير البرمجيات، مع التركيز على جودة الكود وأساليب التطوير الرشيق وهندسة المتطلبات.',
    },
  });

  const hash = await bcrypt.hash('password123', 10);

  // ── Admin ─────────────────────────────────────────────────────────────────
  await prisma.user.create({
    data: {
      email: 'admin@fci.tanta.edu.eg',
      password: hash,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'FCI',
    },
  });

  // ── Staff Members ─────────────────────────────────────────────────────────
  const staffData = [
    { firstName: 'أحمد', lastName: 'يوسف', email: 'ahmed.youssef@fci.tanta.edu.eg', title: 'Professor', dept: cs, hours: 'السبت والاثنين 10 ص - 12 م' },
    { firstName: 'فاطمة', lastName: 'حسن', email: 'fatma.hassan@fci.tanta.edu.eg', title: 'Associate Professor', dept: is, hours: 'الثلاثاء والخميس 12 م - 2 م' },
    { firstName: 'محمد', lastName: 'إبراهيم', email: 'mohamed.ibrahim@fci.tanta.edu.eg', title: 'Assistant Professor', dept: it, hours: 'الأحد والثلاثاء 9 ص - 11 ص' },
    { firstName: 'سلمى', lastName: 'عبد الله', email: 'salma.abdallah@fci.tanta.edu.eg', title: 'Professor', dept: se, hours: 'الاثنين والأربعاء 1 م - 3 م' },
    { firstName: 'طارق', lastName: 'مصطفى', email: 'tarek.mostafa@fci.tanta.edu.eg', title: 'Lecturer', dept: cs, hours: 'الأحد والثلاثاء 11 ص - 1 م' },
    { firstName: 'منى', lastName: 'علي', email: 'mona.ali@fci.tanta.edu.eg', title: 'Associate Professor', dept: is, hours: 'الخميس 10 ص - 12 م' },
    { firstName: 'خالد', lastName: 'عمر', email: 'khaled.omar@fci.tanta.edu.eg', title: 'Assistant Professor', dept: it, hours: 'الاثنين والأربعاء 9 ص - 11 ص' },
    { firstName: 'نهى', lastName: 'سعيد', email: 'noha.saeed@fci.tanta.edu.eg', title: 'Lecturer', dept: se, hours: 'السبت 10 ص - 12 م' },
    { firstName: 'عمر', lastName: 'شريف', email: 'omar.sherif@fci.tanta.edu.eg', title: 'Professor', dept: cs, hours: 'الثلاثاء والخميس 9 ص - 11 ص' },
    { firstName: 'ريم', lastName: 'الزهراء', email: 'reem.alzahraa@fci.tanta.edu.eg', title: 'Lecturer', dept: it, hours: 'الأحد 1 م - 3 م' },
  ];

  const createdStaff = [];
  for (const s of staffData) {
    const u = await prisma.user.create({
      data: {
        email: s.email,
        password: hash,
        role: 'staff',
        firstName: s.firstName,
        lastName: s.lastName,
        staffProfile: {
          create: { title: s.title, departmentId: s.dept.id, officeHours: s.hours },
        },
      },
      include: { staffProfile: true },
    });
    createdStaff.push(u);
  }

  // Update dept heads
  const head1 = await prisma.staffMember.findUnique({ where: { userId: createdStaff[0].id } });
  const head2 = await prisma.staffMember.findUnique({ where: { userId: createdStaff[1].id } });
  if (head1) await prisma.department.update({ where: { id: cs.id }, data: { headId: head1.id } });
  if (head2) await prisma.department.update({ where: { id: is.id }, data: { headId: head2.id } });

  // ── Students ──────────────────────────────────────────────────────────────
  const studentData = [
    { firstName: 'عمر', lastName: 'خالد', email: 'student@fci.tanta.edu.eg', level: 3, gpa: 3.5, dept: cs },
    { firstName: 'يارا', lastName: 'محمد', email: 'yara.m@fci.tanta.edu.eg', level: 2, gpa: 3.8, dept: is },
    { firstName: 'أدم', lastName: 'حسام', email: 'adam.h@fci.tanta.edu.eg', level: 4, gpa: 3.2, dept: se },
    { firstName: 'نور', lastName: 'أحمد', email: 'nour.a@fci.tanta.edu.eg', level: 1, gpa: 3.9, dept: it },
  ];

  for (const s of studentData) {
    await prisma.user.create({
      data: {
        email: s.email,
        password: hash,
        role: 'student',
        firstName: s.firstName,
        lastName: s.lastName,
        studentProfile: {
          create: { level: s.level, gpa: s.gpa, departmentId: s.dept.id },
        },
      },
    });
  }

  // ── Courses ───────────────────────────────────────────────────────────────
  const courses = [
    { code: 'CS301', name: 'خوارزميات وهياكل البيانات', creditHours: 3, dept: cs },
    { code: 'CS302', name: 'الذكاء الاصطناعي', creditHours: 3, dept: cs },
    { code: 'CS401', name: 'التعلم الآلي', creditHours: 3, dept: cs },
    { code: 'IS301', name: 'قواعد البيانات المتقدمة', creditHours: 3, dept: is },
    { code: 'IS302', name: 'نظم دعم القرار', creditHours: 3, dept: is },
    { code: 'IT301', name: 'شبكات الحاسوب', creditHours: 3, dept: it },
    { code: 'IT302', name: 'الأمن السيبراني', creditHours: 3, dept: it },
    { code: 'SE301', name: 'هندسة البرمجيات', creditHours: 3, dept: se },
    { code: 'SE401', name: 'اختبار البرمجيات', creditHours: 3, dept: se },
  ];
  for (const c of courses) {
    await prisma.course.create({
      data: { code: c.code, name: c.name, creditHours: c.creditHours, departmentId: c.dept.id },
    });
  }

  // ── News ──────────────────────────────────────────────────────────────────
  const newsItems = [
    { title: 'فريق كلية الحاسبات يفوز بالمركز الأول في هاكاثون الذكاء الاصطناعي الوطني', content: 'حقق فريق من طلاب كلية الحاسبات والمعلومات بجامعة طنطا المركز الأول في المسابقة الوطنية للذكاء الاصطناعي، متغلبًا على أكثر من 50 فريقًا من مختلف الجامعات المصرية بمشروع مبتكر لتشخيص الأمراض باستخدام الرؤية الحاسوبية.', category: 'Achievements', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', daysAgo: 5 },
    { title: 'إطلاق برنامج ماجستير جديد في تحليل البيانات والذكاء الاصطناعي', content: 'أعلنت الكلية عن إطلاق برنامج ماجستير متخصص في تحليل البيانات والذكاء الاصطناعي بالتعاون مع شركة IBM العالمية، ويستهدف البرنامج خريجي علوم الحاسوب ونظم المعلومات.', category: 'Academics', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', daysAgo: 12 },
    { title: 'المؤتمر الدولي للحوسبة والمعلومات (ICC 2026) ينطلق في طنطا', content: 'تستضيف الكلية النسخة الثالثة عشرة من المؤتمر الدولي للحوسبة والمعلومات بمشاركة أكثر من 300 باحث من 25 دولة، وسيتناول المؤتمر أحدث الأبحاث في مجالات الذكاء الاصطناعي والأمن السيبراني وإنترنت الأشياء.', category: 'Events', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', daysAgo: 20 },
    { title: 'توقيع بروتوكول تعاون مع شركة هواوي أكاديمي', content: 'وقّعت الكلية بروتوكول تعاون مع أكاديمية هواوي لتدريب أعضاء هيئة التدريس والطلاب على تقنيات الشبكات والحوسبة السحابية، وتوفير شهادات معتمدة دوليًا للخريجين.', category: 'Partnership', img: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=800&q=80', daysAgo: 30 },
    { title: 'الكلية تُطلق مبادرة "كود للجميع" لتعليم البرمجة للأطفال', content: 'أطلقت الكلية مبادرة مجتمعية لتعليم أساسيات البرمجة لأبناء مدينة طنطا من الفئة العمرية 10-16 سنة، وذلك في إطار مسؤولية الكلية الاجتماعية ونشر ثقافة التكنولوجيا.', category: 'Community', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', daysAgo: 45 },
    { title: 'افتتاح مختبر الحوسبة السحابية والذكاء الاصطناعي الجديد', content: 'افتتحت الكلية مختبرًا متطورًا للحوسبة السحابية والذكاء الاصطناعي مجهزًا بأحدث وحدات معالجة الرسومات (GPU) بالتعاون مع شركة NVIDIA، ليتيح للطلاب العمل على مشاريع حقيقية في التعلم العميق.', category: 'Infrastructure', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', daysAgo: 60 },
    { title: 'طلاب الكلية يحصدون جوائز مسابقة ICPC الإقليمية', content: 'نجح فريقان من طلاب كلية الحاسبات في التأهل للمرحلة العالمية من مسابقة ICPC للبرمجة التنافسية، بعد تحقيقهم مراكز متقدمة في النسخة الإقليمية الأفريقية.', category: 'Achievements', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', daysAgo: 75 },
    { title: 'انطلاق الفصل الدراسي الثاني وتسجيل المقررات', content: 'يُعلن مكتب شؤون الطلاب عن فتح باب تسجيل المقررات للفصل الدراسي الثاني 2025/2026 للطلاب الحاليين، ويُرجى الالتزام بالمواعيد المحددة تجنبًا للمشكلات الإدارية.', category: 'Academics', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', daysAgo: 90 },
  ];

  for (const n of newsItems) {
    const d = new Date();
    d.setDate(d.getDate() - n.daysAgo);
    await prisma.news.create({
      data: { title: n.title, content: n.content, category: n.category, imageUrl: n.img, publishedAt: d },
    });
  }

  // ── Research Papers ────────────────────────────────────────────────────────
  const staffProfiles = await prisma.staffMember.findMany({ take: 4 });
  const researchItems = [
    { title: 'A Novel Deep Learning Approach for Medical Image Segmentation in Egyptian Radiology', abstract: 'We propose an enhanced U-Net architecture fine-tuned on a dataset of Egyptian medical scans, achieving 94.3% Dice coefficient on chest CT segmentation, outperforming baseline models by 7%.', authors: 'أ.د. أحمد يوسف, م. سارة علي, م. ياسر خالد', year: 2025, citations: 42 },
    { title: 'Blockchain-Based Secure Framework for IoT Device Management in Smart Cities', abstract: 'A lightweight blockchain consensus protocol designed for resource-constrained IoT environments, achieving 40% lower energy consumption vs. PoW while maintaining Byzantine fault tolerance.', authors: 'أ.د. طارق مصطفى, أ.م.د. خالد عمر', year: 2024, citations: 89 },
    { title: 'Optimizing Enterprise ERP Systems Using Predictive Data Mining', abstract: 'We apply XGBoost and SHAP explainability to ERP transaction logs from 15 Egyptian manufacturing companies, identifying root causes of inventory discrepancies with 91% accuracy.', authors: 'أ.م.د. فاطمة حسن, د. منى علي', year: 2025, citations: 15 },
    { title: 'Automated Testing Strategies for Arabic NLP Microservices', abstract: 'A testing framework combining property-based testing and metamorphic relations for Arabic NLP APIs, detecting 83% of semantic regression bugs missed by conventional unit tests.', authors: 'أ.د. سلمى عبد الله, م. نهى سعيد', year: 2024, citations: 56 },
    { title: 'Federated Learning for Privacy-Preserving Healthcare Analytics in Egypt', abstract: 'A federated learning system enabling multi-hospital collaboration without sharing raw patient data, applied to predict diabetic complications across 8 Egyptian hospitals.', authors: 'أ.د. عمر شريف, م. ريم الزهراء', year: 2025, citations: 28 },
    { title: 'Adaptive Cybersecurity Incident Response Using Reinforcement Learning', abstract: 'A DQN-based agent that learns optimal response playbooks for network intrusion scenarios, reducing mean time-to-contain (MTTC) by 34% in simulated enterprise environments.', authors: 'د. محمد إبراهيم, أ.م.د. خالد عمر', year: 2024, citations: 71 },
    { title: 'Arabic Sentiment Analysis of Social Media During Egyptian Political Events', abstract: 'A transformer-based model fine-tuned on 2M Arabic tweets with dialect-aware tokenization, achieving F1=0.89 on sentiment classification, with application to crisis communication monitoring.', authors: 'أ.م.د. فاطمة حسن, د. نهى سعيد', year: 2025, citations: 33 },
  ];

  for (let i = 0; i < researchItems.length; i++) {
    const r = researchItems[i];
    const pubDate = new Date();
    pubDate.setFullYear(r.year);
    await prisma.researchPaper.create({
      data: {
        title: r.title,
        abstract: r.abstract,
        authors: r.authors,
        publishedAt: pubDate,
        staffId: staffProfiles[i % staffProfiles.length]?.id,
      },
    });
  }

  // ── Events ────────────────────────────────────────────────────────────────
  const events = [
    { title: 'يوم التوظيف السنوي 2026', description: 'يستضيف الحرم الجامعي أكثر من 40 شركة تقنية بارزة للتوظيف المباشر وعروض التدريب الصيفي.', location: 'القاعة الكبرى، كلية الحاسبات' },
    { title: 'ورشة عمل: البرمجة التنافسية مع ICPC', description: 'ورشة مكثفة لمدة يومين لتحضير الطلاب لمسابقات البرمجة التنافسية الإقليمية.', location: 'معمل الحاسب رقم 3' },
    { title: 'محاضرة مفتوحة: مستقبل الذكاء الاصطناعي التوليدي', description: 'يستضيف أ.د. أحمد يوسف خبيرًا دوليًا من Google DeepMind لمناقشة توجهات الذكاء الاصطناعي التوليدي وأثره على سوق العمل.', location: 'قاعة المحاضرات الكبرى' },
  ];
  for (const ev of events) {
    const d = new Date();
    d.setDate(d.getDate() + Math.floor(Math.random() * 60) + 7);
    await prisma.event.create({ data: { ...ev, date: d } });
  }

  // ── Gallery ───────────────────────────────────────────────────────────────
  const gallery = [
    { title: 'حفل تخرج الدفعة 2025', category: 'Graduation', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80' },
    { title: 'مختبر الذكاء الاصطناعي الجديد', category: 'Infrastructure', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { title: 'يوم التوظيف السنوي', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
    { title: 'فريق الهاكاثون الفائز', category: 'Achievements', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80' },
    { title: 'مبادرة كود للجميع', category: 'Community', imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80' },
    { title: 'مؤتمر ICC 2026', category: 'Conference', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80' },
  ];
  for (const g of gallery) {
    await prisma.gallery.create({ data: g });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Login: admin@fci.tanta.edu.eg / password123');
  console.log('🎓 Student: student@fci.tanta.edu.eg / password123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
