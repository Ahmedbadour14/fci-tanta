import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/portal');
    } catch (err: any) {
      setError(err.response?.data?.message || t('login.failedLogin'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 start-4 md:start-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
      >
        <ArrowLeft size={20} className="rtl:rotate-180" /> {t('back')}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        <div className="p-8">
          <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center text-blue-500 shadow-sm mx-auto mb-6">
            <LogIn size={28} className="ms-1" />
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-2">
            {t('login.title')}
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            {t('login.subtitle')}
          </p>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('login.emailLabel')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full ps-10 pe-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400"
                  placeholder="name@fci.tanta.edu.eg"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('login.passwordLabel')}
                </label>
                <a href="#" className="text-sm text-primary hover:underline ms-auto">{t('login.forgotPassword')}</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full ps-10 pe-3 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
            >
              {isLoading ? t('login.signingIn') : t('login.signIn')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                {t('login.registerNow')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
