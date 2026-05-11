import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import PageHeader from '../components/ui/PageHeader';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await api.post('/contact', data);
      setSubmitted(true);
      reset();
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
    } catch {
      toast.error('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'العنوان', value: 'الحرم الطبي، جامعة طنطا، شارع الجيش، طنطا، الغربية، مصر', color: 'text-blue-500' },
    { icon: Phone, title: 'الهاتف', value: '+20 40 3450536', color: 'text-emerald-500', dir: 'ltr' },
    { icon: Mail, title: 'البريد الإلكتروني', value: 'info@fci.tanta.edu.eg', color: 'text-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title="تواصل معنا" subtitle="نحن هنا للإجابة على استفساراتكم" breadcrumb="اتصل بنا" />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Info + Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">معلومات التواصل</h2>
              <ul className="space-y-5">
                {contactInfo.map(({ icon: Icon, title, value, color, dir }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 shrink-0 ${color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-0.5">{title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm" dir={dir}>{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.1637775986877!2d30.993414915132335!3d30.76991098162464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c95a5f4c4a4f%3A0xc6a8270ebc64b5!2sFaculty%20of%20Computers%20and%20Information%2C%20Tanta%20University!5e0!3m2!1sen!2seg!4v1683900000000!5m2!1sen!2seg"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">

            {submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">شكرًا لتواصلك معنا. سنرد عليك في أقرب وقت.</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">إرسال رسالة أخرى</button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">الاسم الكامل *</label>
                      <input {...register('name', { required: 'الاسم مطلوب' })}
                        className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                        placeholder="محمد أحمد" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">البريد الإلكتروني *</label>
                      <input {...register('email', { required: 'البريد مطلوب', pattern: { value: /^\S+@\S+$/i, message: 'بريد إلكتروني غير صالح' } })}
                        type="email" className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                        placeholder="example@gmail.com" dir="ltr" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">الموضوع *</label>
                    <input {...register('subject', { required: 'الموضوع مطلوب' })}
                      className={`input-field ${errors.subject ? 'border-red-400' : ''}`}
                      placeholder="كيف يمكننا مساعدتك؟" />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">الرسالة *</label>
                    <textarea {...register('message', { required: 'الرسالة مطلوبة', minLength: { value: 10, message: 'يجب أن تكون الرسالة 10 أحرف على الأقل' } })}
                      rows={5} className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                      placeholder="اكتب رسالتك هنا..." />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full flex justify-center items-center gap-2 !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري الإرسال...</>
                    ) : (
                      <><Send size={18} /> إرسال الرسالة</>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
