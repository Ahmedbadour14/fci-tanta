import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Plus, Minus, Trash2, Book, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';

interface BookItem {
  id: string;
  title: string;
  author: string;
  price: number;
  department: string;
  semester: number;
  stock: number;
  coverColor: string;
}

interface CartItem extends BookItem { qty: number }

const BOOKS: BookItem[] = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Cormen et al.', price: 180, department: 'CS', semester: 1, stock: 12, coverColor: '#1d4ed8' },
  { id: '2', title: 'Data Structures in C++', author: 'Weiss M.A.', price: 150, department: 'CS', semester: 2, stock: 8, coverColor: '#7c3aed' },
  { id: '3', title: 'Database Systems', author: 'Elmasri & Navathe', price: 200, department: 'IS', semester: 3, stock: 5, coverColor: '#0891b2' },
  { id: '4', title: 'Software Engineering', author: 'Sommerville', price: 220, department: 'SE', semester: 4, stock: 0, coverColor: '#059669' },
  { id: '5', title: 'Computer Networks', author: 'Tanenbaum', price: 195, department: 'IT', semester: 3, stock: 15, coverColor: '#d97706' },
  { id: '6', title: 'Operating Systems', author: 'Silberschatz', price: 170, department: 'CS', semester: 4, stock: 7, coverColor: '#dc2626' },
  { id: '7', title: 'Artificial Intelligence', author: 'Russell & Norvig', price: 250, department: 'CS', semester: 6, stock: 3, coverColor: '#7c3aed' },
  { id: '8', title: 'Information Systems Analysis', author: 'Valacich', price: 165, department: 'IS', semester: 2, stock: 10, coverColor: '#0891b2' },
  { id: '9', title: 'Web Development Fundamentals', author: 'Duckett J.', price: 140, department: 'IT', semester: 1, stock: 20, coverColor: '#ea580c' },
  { id: '10', title: 'Design Patterns', author: 'Gang of Four', price: 210, department: 'SE', semester: 5, stock: 4, coverColor: '#0f766e' },
  { id: '11', title: 'Discrete Mathematics', author: 'Kenneth Rosen', price: 155, department: 'CS', semester: 1, stock: 18, coverColor: '#1d4ed8' },
  { id: '12', title: 'Human Computer Interaction', author: 'Dix et al.', price: 175, department: 'IS', semester: 5, stock: 6, coverColor: '#9333ea' },
];

const DEPTS = ['All', 'CS', 'IS', 'IT', 'SE'];
const SEMESTERS = ['All', 1, 2, 3, 4, 5, 6];

const BookCover: React.FC<{ book: BookItem; size?: 'sm' | 'lg' }> = ({ book, size = 'lg' }) => (
  <div
    className={`relative ${size === 'lg' ? 'h-44' : 'h-16 w-12'} rounded-lg flex flex-col items-center justify-center p-2 overflow-hidden`}
    style={{ background: `linear-gradient(135deg, ${book.coverColor}cc, ${book.coverColor})` }}
  >
    <Book className="text-white/30" size={size === 'lg' ? 36 : 18} />
    {size === 'lg' && (
      <span className="absolute bottom-2 left-0 right-0 text-center text-white/80 text-xs font-bold px-2 line-clamp-2">{book.title}</span>
    )}
  </div>
);

const Store: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('fci_cart') || '[]'); } catch { return []; }
  });
  const [dept, setDept] = useState('All');
  const [semester, setSemester] = useState<string | number>('All');
  const [search, setSearch] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'browse' | 'cart' | 'checkout' | 'confirm'>('browse');
  const [form, setForm] = useState({ name: '', studentId: '', phone: '', address: '' });

  useEffect(() => { localStorage.setItem('fci_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = BOOKS.filter(b => {
    const matchDept = dept === 'All' || b.department === dept;
    const matchSem = semester === 'All' || b.semester === semester;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSem && matchSearch;
  });

  const addToCart = (book: BookItem) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === book.id);
      if (ex) return prev.map(i => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirm');
    setCart([]);
    localStorage.removeItem('fci_cart');
  };

  if (checkoutStep === 'confirm') return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('store.orderConfirmed')}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{t('store.orderConfirmedDesc')}</p>
        <button onClick={() => setCheckoutStep('browse')} className="btn-primary">{t('store.continueShopping')}</button>
      </motion.div>
    </div>
  );

  if (checkoutStep === 'checkout') return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      <PageHeader title={t('store.checkoutTitle')} breadcrumb={t('store.checkoutBreadcrumb')} />
      <div className="container mx-auto px-4 max-w-xl mt-10">
        <form onSubmit={handleCheckout} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg space-y-4">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">{t('store.deliveryInfo')}</h3>
          {[
            { key: 'name', label: t('store.fullName'), type: 'text', placeholder: t('store.fullNamePlaceholder') },
            { key: 'studentId', label: t('store.studentId'), type: 'text', placeholder: t('store.studentIdPlaceholder') },
            { key: 'phone', label: t('store.phone'), type: 'tel', placeholder: t('store.phonePlaceholder') },
            { key: 'address', label: t('store.address'), type: 'text', placeholder: t('store.addressPlaceholder') },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{f.label}</label>
              <input required type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          ))}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-white">{t('store.total')}: {total.toLocaleString()} {t('store.currency')}</span>
            <div className="flex gap-3">
              <button type="button" onClick={() => setCheckoutStep('cart')} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">{t('store.back')}</button>
              <button type="submit" className="btn-primary">{t('store.confirmOrder')}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  if (checkoutStep === 'cart') return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16">
      <PageHeader title={t('store.cartTitle')} breadcrumb={t('store.cartBreadcrumb')} />
      <div className="container mx-auto px-4 max-w-2xl mt-10">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 dark:text-slate-400 mb-4">{t('store.emptyCart')}</p>
            <button onClick={() => setCheckoutStep('browse')} className="btn-primary">{t('store.browseBooks')}</button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm">
                <BookCover book={item} size="sm" />
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.author}</p>
                  <p className="text-blue-600 font-bold text-sm mt-1">{(item.price * item.qty).toLocaleString()} {t('store.currency')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
              </div>
            ))}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 dark:text-slate-400">{t('store.total')}</span>
                <span className="font-bold text-2xl text-slate-900 dark:text-white">{total.toLocaleString()} {t('store.currency')}</span>
              </div>
              <button onClick={() => setCheckoutStep('checkout')} className="w-full btn-primary flex items-center justify-center gap-2">
                {t('store.proceedToCheckout')} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageHeader title={t('store.title')} subtitle={t('store.subtitle')} breadcrumb={t('store.breadcrumb')} />

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
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t('store.searchPlaceholder')}
              className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:border-blue-500 text-sm" />
          </div>
          <select value={dept} onChange={e => setDept(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none">
            {DEPTS.map(d => <option key={d} value={d}>{d === 'All' ? t('store.allDepts') : d}</option>)}
          </select>
          <select value={semester} onChange={e => setSemester(e.target.value === 'All' ? 'All' : Number(e.target.value))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none">
            {SEMESTERS.map(s => <option key={s} value={s}>{s === 'All' ? t('store.allSemesters') : `${t('store.semester')} ${s}`}</option>)}
          </select>
          <button onClick={() => setCheckoutStep('cart')} className="relative btn-primary flex items-center gap-2 !py-2.5">
            <ShoppingCart size={16} />
            {t('store.cart')}
            {cartCount > 0 && (
              <span className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {filtered.map((book, i) => (
              <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="p-3"><BookCover book={book} /></div>
                <div className="px-3 pb-4">
                  <p className="font-bold text-slate-900 dark:text-white text-xs line-clamp-2 mb-1">{book.title}</p>
                  <p className="text-slate-500 text-xs mb-1">{book.author}</p>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">{book.department}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">F{book.semester}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{book.price} {t('store.currency')}</span>
                    {book.stock === 0 ? (
                      <span className="text-red-500 text-xs font-medium">{t('store.outOfStock')}</span>
                    ) : (
                      <button onClick={() => addToCart(book)}
                        className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors">
                        <Plus size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Book size={48} className="mx-auto mb-4 opacity-30" />
            <p>{t('store.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
