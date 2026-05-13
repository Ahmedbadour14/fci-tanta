import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, User, Loader2, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_KEY = 'sk-rzvi8079bAwJ3yBL1uBLY3Hgg8T5Omfi3ymyA5XwAoFgTXCJ';

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

  // Scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  // Focus input when chat opens
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
      console.log('[Chatbot] Sending request to Gemini…', newHistory);

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDlCdmDCvooypLz4bLVvdPigO0l5IIN1pU',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: newHistory.map(msg => ({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }],
            })),
            systemInstruction: {
              parts: [{
                text: 'You are a helpful assistant for Faculty of Computers and Information, Tanta University. Answer in the same language the user writes in. Be concise and friendly.',
              }],
            },
          }),
        }
      );

      const rawText = await response.text();
      console.log(`[Chatbot] Response status: ${response.status}`);
      console.log('[Chatbot] Response body (raw):', rawText);

      if (!response.ok) {
        let parsed: unknown;
        try { parsed = JSON.parse(rawText); } catch { parsed = rawText; }
        console.error('[Chatbot] API Error:', response.status, parsed);
        throw new Error(`HTTP ${response.status}: ${rawText.slice(0, 200)}`);
      }

      const data = JSON.parse(rawText);
      console.log('[Chatbot] Parsed response:', data);

      const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      if (!reply) throw new Error('Empty reply from Gemini');

      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!open) setHasNewMsg(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Chatbot] Caught error:', msg);
      setError(
        isRTL
          ? `حدث خطأ: ${msg.slice(0, 80)}`
          : `Error: ${msg.slice(0, 100)}`
      );
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

  const clearChat = () => {
    setHistory([]);
    setError(null);
  };

  const greeting = isRTL
    ? 'مرحباً! أنا مساعد كلية الحاسبات والمعلومات. كيف يمكنني مساعدتك؟'
    : 'Hi! I\'m the FCI Tanta assistant. How can I help you today?';

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="chatbot-toggle"
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 end-6 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white focus:outline-none focus:ring-4 focus:ring-blue-400/40"
        style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
        aria-label="Open AI Chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread indicator */}
        {hasNewMsg && !open && (
          <span className="absolute top-0 end-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="fixed bottom-24 end-6 z-[60] w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/30 border border-slate-200/60 dark:border-slate-700/60"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm leading-tight">
                  {isRTL ? 'مساعد كلية الحاسبات' : 'FCI Assistant'}
                </p>
                <p className="text-blue-200 text-xs">
                  {isRTL ? 'متصل الآن' : 'Online now'}
                </p>
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearChat}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  title={isRTL ? 'مسح المحادثة' : 'Clear chat'}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50 dark:bg-slate-900 scrollbar-thin">
              {/* Greeting bubble */}
              {history.length === 0 && (
                <div className={`flex items-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm shadow-sm border border-slate-100 dark:border-slate-700 leading-relaxed">
                    {greeting}
                  </div>
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
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-0.5 ${
                      isUser
                        ? 'bg-slate-200 dark:bg-slate-700'
                        : 'bg-gradient-to-br from-blue-600 to-purple-600'
                    }`}>
                      {isUser
                        ? <User size={13} className="text-slate-600 dark:text-slate-300" />
                        : <Bot size={13} className="text-white" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                      isUser
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
              {loading && (
                <div className={`flex items-end gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="text-center text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts (shown only when empty) */}
            {history.length === 0 && (
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
                {(isRTL
                  ? ['ما هي الأقسام؟', 'موعد التسجيل?', 'كيف أتواصل؟']
                  : ['What departments?', 'Registration dates?', 'Contact info?']
                ).map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800/50 whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-end gap-2 shrink-0">
              <textarea
                ref={inputRef}
                id="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder={isRTL ? 'اكتب رسالتك...' : 'Type a message...'}
                className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm px-3 py-2.5 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors leading-relaxed max-h-28 overflow-y-auto"
                style={{ minHeight: '40px' }}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = 'auto';
                  el.style.height = Math.min(el.scrollHeight, 112) + 'px';
                }}
              />
              <button
                id="chatbot-send"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 hover:shadow-lg shrink-0"
                style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
                aria-label="Send"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className={isRTL ? 'rotate-180' : ''} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
