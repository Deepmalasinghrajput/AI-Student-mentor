import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Send, Volume2, VolumeX, Bot, User,
  ArrowRight, CheckCircle2, Sparkles, Loader2, Clock
} from 'lucide-react';
import { StudentProfile, SubjectPerformance, ChatMessage, PersonalizedRoadmap } from '../types';
import { INITIAL_ROADMAP } from '../mockData';

interface MentorConversationProps {
  student: StudentProfile;
  prioritySubject: SubjectPerformance;
  onRoadmapGenerated: (roadmap: PersonalizedRoadmap) => void;
  language: 'en' | 'hi';
}

const CONVERSATION_FLOW = [
  {
    aiText: (name: string, subject: string) =>
      `Welcome back, ${name}. Your recent assessment data in ${subject} suggests that Trees and Graphs may need more focused practice. Would you like to review this subject?`,
    suggestions: [
      'Yes, I find Trees and Graphs difficult.',
      'Can we focus on Graph BFS & DFS?',
      'I want to understand where I went wrong.',
    ],
  },
  {
    aiText: () => 'Which part is most challenging: tree traversal, binary search trees, graph representation, or BFS and DFS?',
    suggestions: ['BFS and DFS algorithms', 'Binary search trees and AVL', 'Graph representations', 'Tree traversals'],
  },
  {
    aiText: () => 'I can create a two-week practice plan. How much time can you realistically spend each day?',
    suggestions: ['Around 1 hour daily', '45 minutes after classes', '1.5 hours in the evening'],
  },
  {
    aiText: () => 'I will prepare a plan with short concept reviews, coding exercises and a checkpoint quiz. You can review it before saving.',
    suggestions: ['Review My 14-Day Roadmap →'],
  },
];

export const MentorConversation: React.FC<MentorConversationProps> = ({
  student,
  prioritySubject,
  onRoadmapGenerated,
  language,
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'm0',
      sender: 'ai',
      text: CONVERSATION_FLOW[0].aiText(student.name, prioritySubject.name),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: CONVERSATION_FLOW[0].suggestions,
    },
  ]);

  const [input, setInput] = React.useState('');
  const [speechEnabled, setSpeechEnabled] = React.useState(true);
  const [isListening, setIsListening] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textOverride?: string) => {
    const text = (textOverride || input).trim();
    if (!text) return;

    setMessages(prev => [...prev, {
      id: `u-${Date.now()}`,
      sender: 'student',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
    setIsTyping(true);

    const nextStage = stage + 1;
    setTimeout(() => {
      const flow = CONVERSATION_FLOW[nextStage] || CONVERSATION_FLOW[CONVERSATION_FLOW.length - 1];
      const aiText = flow.aiText('', '');
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: flow.suggestions,
      }]);
      setIsTyping(false);
      setStage(nextStage);
      speakText(aiText);
    }, 1000 + Math.random() * 400);
  };

  const handleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const autoInputs = ['Trees and Graphs are most difficult.', 'BFS and DFS.', 'About one hour daily.'];
        handleSend(autoInputs[Math.min(stage, autoInputs.length - 1)]);
      }, 1800);
      return;
    }
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.start();
    setIsListening(true);
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      {/* Chat Window */}
      <div className="glass rounded-2xl overflow-hidden flex flex-col h-[72vh] shadow-2xl">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 status-live" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Campus AI Academic Mentor</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  SIS Grounded
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Active topic: <strong className="text-indigo-300">{prioritySubject.name}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-400">
              {language === 'en' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    isAI
                      ? 'bg-gradient-to-br from-indigo-600 to-cyan-500'
                      : 'bg-slate-700'
                  }`}>
                    {isAI ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-200" />}
                  </div>

                  <div className={`max-w-lg space-y-2 ${isAI ? '' : 'items-end flex flex-col'}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isAI
                        ? 'bg-slate-800/80 border border-slate-700/40 text-slate-200 rounded-tl-sm'
                        : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                    }`}>
                      {msg.text}
                    </div>

                    {/* Suggestion chips */}
                    {isAI && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.suggestions.map((s, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.08 }}
                            onClick={() => {
                              if (s.includes('Roadmap')) {
                                onRoadmapGenerated(INITIAL_ROADMAP);
                              } else {
                                handleSend(s);
                              }
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-indigo-500/40 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                            {s}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-slate-600 px-1">{msg.timestamp}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-800/80 border border-slate-700/40 flex items-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Roadmap CTA when stage complete */}
          {stage >= 3 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Personalized 14-day roadmap synthesized from your diagnostic and study commitments.</span>
              </div>
              <button
                onClick={() => onRoadmapGenerated(INITIAL_ROADMAP)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm cursor-pointer transition-all"
              >
                View Plan <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-900/30">
          {/* Voice listening indicator */}
          {isListening && (
            <div className="flex items-center justify-center gap-3 py-2 mb-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <div className="flex items-center gap-1">
                {[0.3, 0.6, 1, 0.6, 0.3].map((h, i) => (
                  <div key={i} className="voice-bar w-1 rounded-full bg-rose-400" style={{ height: `${h * 20}px` }} />
                ))}
              </div>
              <span className="text-sm text-rose-300 font-medium">Listening… speak now</span>
            </div>
          )}

          <div className="flex gap-3 items-center">
            <button
              onClick={handleMic}
              className={`w-11 h-11 rounded-xl flex-shrink-0 border flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse'
                  : 'bg-slate-800 border-slate-700/60 text-slate-300 hover:border-indigo-500/40 hover:text-indigo-300'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={
                isListening
                  ? 'Listening to microphone array…'
                  : language === 'en'
                    ? 'Type your reply, or tap the mic for voice input…'
                    : 'अपना उत्तर टाइप करें या माइक दबाएं…'
              }
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                input.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
