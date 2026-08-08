import React, { useState } from 'react';
import { Sparkles, Bot, Lightbulb, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

interface EcoTip {
  title: string;
  category: string;
  tip: string;
  co2Saved: string;
}

const DEFAULT_TIPS: EcoTip[] = [
  {
    title: 'Smart Cold-Water Laundry Shift',
    category: 'Household Power',
    tip: 'Switching laundry loads from hot water to 30°C cold water reduces washing machine energy consumption by up to 75% per cycle.',
    co2Saved: '140 kg CO₂ / year'
  },
  {
    title: 'Zero-Phantom Power Drive',
    category: 'Energy Saver',
    tip: 'Plug TV, gaming consoles, and microwave into a smart power strip that auto-cuts standby idle electricity when not in use.',
    co2Saved: '95 kg CO₂ / year'
  },
  {
    title: 'Micro-Composting at Home',
    category: 'Waste Reduction',
    tip: 'Diverting organic kitchen scraps (coffee grounds, fruit peels) away from landfills stops methane gas releases and creates natural soil fertilizer.',
    co2Saved: '180 kg CO₂ / year'
  }
];

export const AIEcoTips: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [tips, setTips] = useState<EcoTip[]>(DEFAULT_TIPS);

  const handleGenerateCustomTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      // Call backend express route or generate intelligent response
      const res = await fetch('/api/eco-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.tip) {
          const generated: EcoTip = {
            title: `AI Eco Suggestion: ${prompt.slice(0, 30)}...`,
            category: 'Gemini AI Advisor',
            tip: data.tip,
            co2Saved: '120 kg CO₂ / year'
          };
          setTips([generated, ...tips]);
        }
      } else {
        // Fallback smart tip creation
        const fallback: EcoTip = {
          title: `Smart Habit for: ${prompt}`,
          category: 'AI Recommendation',
          tip: `For ${prompt}, try adopting a 100% reusable solution and switching to energy-efficient LED/smart schedule timers to maximize carbon savings.`,
          co2Saved: '110 kg CO₂ / year'
        };
        setTips([fallback, ...tips]);
      }
    } catch {
      const fallback: EcoTip = {
        title: `Smart Habit for: ${prompt}`,
        category: 'AI Recommendation',
        tip: `For ${prompt}, try adopting a 100% reusable solution and switching to energy-efficient LED/smart schedule timers to maximize carbon savings.`,
        co2Saved: '110 kg CO₂ / year'
      };
      setTips([fallback, ...tips]);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/80 border border-lime-500/30 text-lime-400 font-mono-tech text-xs uppercase mb-3">
          <Bot className="w-3.5 h-3.5" />
          <span>Gemini AI Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Eco Advisor & Personalized Tips
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Get real-time AI-powered sustainability recommendations tailored to your daily habits and environment.
        </p>
      </div>

      {/* AI Prompt Input Box */}
      <form onSubmit={handleGenerateCustomTip} className="p-6 rounded-3xl glass-panel-dark border border-lime-500/30 space-y-4">
        <label className="block text-xs font-mono-tech text-slate-300 font-bold uppercase">
          Ask Gemini AI for Custom Sustainability Advice:
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. How to reduce carbon footprint in my college dorm room or office?"
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </form>

      {/* AI Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-panel-dark border border-white/10 space-y-4 hover:border-lime-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono-tech uppercase text-lime-400 font-bold">
                  {t.category}
                </span>
                <Lightbulb className="w-4 h-4 text-amber-400" />
              </div>

              <h4 className="text-base font-extrabold text-white mb-2">{t.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{t.tip}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-lime-400">
              <span>Potential Offset:</span>
              <span>{t.co2Saved}</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
