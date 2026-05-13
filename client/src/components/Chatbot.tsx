import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, User, Loader2, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Removed API key from env to hardcode per user request

const Chatbot: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasNewMsg, setHasNewMsg] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMsg(false);
    }
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: "You are a helpful assistant for Faculty of Computers and Information, Tanta University. Answer in the same language the user writes in." },
              ...newHistory.map(msg => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
              }))
            ]
          })
        }
      );

      const rawText = await response.text();
      console.log('[Chatbot] Response status:', response.status);
      console.log('[Chatbot] Response body:', rawText);

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = JSON.parse(rawText);
      const reply = data.choices[0].message.content;

      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!open) setHasNewMsg(true);
    } catch (err) {
      setError(isRTL ? "عذراً، حدث خطأ في الاتصال" : "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const greeting = isRTL
    ? 'مرحباً! أنا مساعد كلية الحاسبات والمعلومات. كيف يمكنني مساعدتك؟'
    : 'Hi! I\'m the FCI Tanta assistant. How can I help you today?';

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 end-6 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white focus:outline-none"
        style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
      >
        <AnimatePresence mode="wait">
          {open ? <X key="close" size={22} /> : <MessageCircle key="chat" size={22} />}
        </AnimatePresence>
        {hasNewMsg && !open && (
          <span className="absolute top-0 end-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="fixed bottom-24 end-6 z-[60] w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            style={{ height: '520px' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0 text-white">
                <p className="font-bold text-sm leading-tight">{isRTL ? 'مساعد كلية الحاسبات' : 'FCI Assistant'}</p>
                <p className="text-blue-200 text-xs">{isRTL ? 'متصل الآن' : 'Online now'}</p>
              </div>
              {history.length > 0 && (
                <button onClick={() => setHistory([])} className="text-white/80 hover:text-white"><Trash2 size={14} /></button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-900">
              {history.length === 0 && (
                <div className={`flex items-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mb-0.5"><Bot size={13} className="text-white" /></div>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 text-sm shadow-sm border border-slate-100 dark:border-slate-700">{greeting}</div>
                </div>
              )}

              {history.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 ${isUser ? (isRTL ? 'flex-row' : 'flex-row-reverse') : (isRTL ? 'flex-row-reverse' : 'flex-row')}`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5 ${isUser
                      ? 'bg-slate-200 dark:bg-slate-700'
                      : 'bg-gradient-to-br from-blue-600 to-purple-600'
                      }`}>
                      {isUser
                        ? <User size={13} className="text-slate-600 dark:text-slate-300" />
                        : <Bot size={13} className="text-white" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${isUser
                      ? 'rounded-br-sm text-white'
                      : 'rounded-bl-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700'
                      }`}
                      style={isUser ? { background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' } : {}}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading indicator */}
              {loading && <Loader2 size={20} className="animate-spin text-blue-600 mx-auto" />}
              {error && <p className="text-center text-xs text-red-500 bg-red-50 p-2 rounded-lg">{error}</p>}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-3 bg-white dark:bg-slate-950 border-t flex items-end gap-2 shrink-0">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder={isRTL ? 'اكتب رسالتك...' : 'Type a message...'}
                className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm px-3 py-2 outline-none focus:border-blue-500 transition-colors"
              />
              <button onClick={sendMessage} disabled={!input.trim() || loading} className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
                <Send size={16} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;