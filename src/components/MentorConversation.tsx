import React from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  User, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Languages,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { StudentProfile, SubjectPerformance, ChatMessage, PersonalizedRoadmap } from '../types';
import { INITIAL_ROADMAP } from '../mockData';

interface MentorConversationProps {
  student: StudentProfile;
  prioritySubject: SubjectPerformance;
  onRoadmapGenerated: (roadmap: PersonalizedRoadmap) => void;
  language: 'en' | 'hi';
}

export const MentorConversation: React.FC<MentorConversationProps> = ({
  student,
  prioritySubject,
  onRoadmapGenerated,
  language
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: language === 'en'
        ? `Welcome back, ${student.name}. Your recent assessment data in ${prioritySubject.name} (${prioritySubject.code}) suggests Trees and Graphs may need more focused practice. Would you like to review this subject?`
        : `नमस्ते ${student.name}। ${prioritySubject.name} में आपके हालिया मूल्यांकन परिणाम बताते हैं कि ट्री और ग्राफ़ पर अभ्यास की आवश्यकता है। क्या आप इस विषय की समीक्षा करना चाहेंगे?`,
      timestamp: '11:20 AM',
      suggestions: [
        'Yes, I find Trees and Graphs difficult.',
        'Can we focus on Graph BFS & DFS?',
        'I only have 45 minutes daily.'
      ]
    }
  ]);

  const [input, setInput] = React.useState('');
  const [isVoiceListening, setIsVoiceListening] = React.useState(false);
  const [speechEnabled, setSpeechEnabled] = React.useState(true);
  const [isTyping, setIsTyping] = React.useState(false);
  const [stage, setStage] = React.useState<number>(1);
  const chatBottomRef = React.useRef<HTMLDivElement>(null);

  // Auto scroll
  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle TTS
  const speakText = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'student',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Natural multi-turn response flow based on Section 7 illustrative conversation
    setTimeout(() => {
      let aiResponseText = '';
      let nextSuggestions: string[] = [];

      if (stage === 1) {
        aiResponseText = language === 'en'
          ? "Which part is most challenging: tree traversals, binary search trees, graph representation, or BFS/DFS?"
          : "इनमें से सबसे कठिन कौन सा भाग लगता है: ट्री ट्रैवर्सल, बाइनरी सर्च ट्री, ग्राफ़ रिप्रेज़ेंटेशन या BFS/DFS?";
        nextSuggestions = ['BFS and DFS algorithms', 'Binary search trees and AVL', 'Graph representations'];
        setStage(2);
      } else if (stage === 2) {
        aiResponseText = language === 'en'
          ? "I can create an actionable two-week practice plan. How much time can you realistically spend each day?"
          : "मैं दो सप्ताह का अभ्यास रोडमैप तैयार कर सकता हूँ। आप प्रतिदिन कितना समय दे सकते हैं?";
        nextSuggestions = ['Around 1 hour daily', '45 minutes after classes', '1.5 hours in the evening'];
        setStage(3);
      } else {
        aiResponseText = language === 'en'
          ? "Understood. I have prepared a 14-day roadmap with short concept reviews, interactive coding exercises, and a checkpoint quiz. You can review the plan right now."
          : "समझ गया। मैंने 14 दिनों का रोडमैप तैयार किया है जिसमें संक्षिप्त रिवीज़न, कोडिंग अभ्यास और चेकपॉइंट क्विज़ शामिल हैं। आप इसे देख सकते हैं।";
        nextSuggestions = ['Review My 14-Day Roadmap'];
        setStage(4);
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: nextSuggestions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(aiResponseText);
    }, 1000);
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is not directly supported in this sandbox browser. Simulating voice input!");
      simulateVoice();
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      if (!isVoiceListening) {
        recognition.start();
        setIsVoiceListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsVoiceListening(false);
        };
        recognition.onerror = () => setIsVoiceListening(false);
        recognition.onend = () => setIsVoiceListening(false);
      } else {
        setIsVoiceListening(false);
      }
    } catch {
      simulateVoice();
    }
  };

  const simulateVoice = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setIsVoiceListening(false);
      if (stage === 1) handleSend('I find Trees and Graphs difficult.');
      else if (stage === 2) handleSend('BFS and DFS.');
      else handleSend('Around one hour.');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-2">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[76vh]">
        {/* Header Bar */}
        <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Campus AI Academic Mentor</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Grounded in SIS Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Active Topic: <span className="text-indigo-300 font-semibold">{prioritySubject.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              title={speechEnabled ? 'Mute AI voice output' : 'Enable AI voice output'}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {speechEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <div className="text-xs text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              Lang: <strong className="text-indigo-400">{language === 'en' ? 'English' : 'Hindi'}</strong>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div 
                key={m.id} 
                className={`flex gap-3 max-w-2xl ${isAi ? 'self-start' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isAi ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isAi 
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-sm' 
                      : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                  }`}>
                    {m.text}
                  </div>

                  {/* Suggestion Chips */}
                  {isAi && m.suggestions && m.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {m.suggestions.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (chip === 'Review My 14-Day Roadmap') {
                              onRoadmapGenerated(INITIAL_ROADMAP);
                            } else {
                              handleSend(chip);
                            }
                          }}
                          className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 px-1 block">{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
              <span>AI Mentor is thinking and consulting verified curriculum resources...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Final Trigger if ready */}
        {stage >= 4 && (
          <div className="px-6 py-3 bg-emerald-950/40 border-t border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Personalized Roadmap synthesised from diagnostic & stated study commitments.</span>
            </div>
            <button
              onClick={() => onRoadmapGenerated(INITIAL_ROADMAP)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>View Generated 14-Day Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Bar with Mic */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
          <button
            onClick={toggleMic}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-center ${
              isVoiceListening 
                ? 'bg-rose-600 border-rose-500 text-white animate-pulse' 
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title="Speech-to-text voice input"
          >
            {isVoiceListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-indigo-400" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isVoiceListening
                ? 'Listening to microphone array... speak now'
                : language === 'en'
                  ? 'Type your reply or question, or tap mic for voice interaction...'
                  : 'उत्तर टाइप करें या वॉयस इंटरेक्शन के लिए माइक दबाएं...'
            }
            className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`p-3.5 rounded-2xl font-bold transition-all cursor-pointer flex items-center justify-center ${
              input.trim() 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
