import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface ColorPalette {
  name: string;
  hex: string;
  reason: string;
}

export const AICreator = () => {
  const [keywords, setKeywords] = useState('');
  const [palette, setPalette] = useState<ColorPalette[] | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePalette = async () => {
    if (!keywords.trim()) return;

    // API Key Selection Check
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a professional brand color palette based on these keywords: ${keywords}. Return exactly 4 colors. Make sure the colors look good together and fit the keywords perfectly.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "A creative and evocative name for the color (in Chinese)" },
                hex: { type: Type.STRING, description: "The hex code of the color, e.g., #FF0000" },
                reason: { type: Type.STRING, description: "Why this color fits the brand keywords (in Chinese, short sentence)" }
              },
              required: ["name", "hex", "reason"]
            }
          }
        }
      });
      
      if (response.text) {
        const data = JSON.parse(response.text);
        setPalette(data);
      }
    } catch (error) {
      console.error('Error generating palette:', error);
      if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
        toast.error("API Key 无效，请重新选择有效的 API Key。");
      } else {
        toast.error("生成失败，请稍后重试。");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`已复制色值: ${text}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[400px]">
      {/* Input Side */}
      <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02] md:w-1/2 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className="text-primary">✨</span> AI 品牌配色生成器
        </h3>
        <p className="text-white/50 text-sm mb-6">
          输入您的品牌关键词，AI 将为您生成专属的色彩美学方案。
        </p>
        <div className="space-y-4">
          <textarea 
            value={keywords} 
            onChange={(e) => setKeywords(e.target.value)} 
            placeholder="例如：科技、极简、未来感、环保..." 
            className="w-full p-4 rounded-[12px] bg-white/5 border border-white/10 text-white resize-none h-32 focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button 
            onClick={generatePalette} 
            disabled={loading || !keywords.trim()}
            className="w-full py-3 bg-primary text-white rounded-[12px] font-bold hover:bg-primary/80 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <span className="animate-spin">⏳</span> : <span>✨</span>}
            {loading ? '正在生成...' : '生成配色方案'}
          </button>
        </div>
      </div>

      {/* Preview Side */}
      <div className="md:w-1/2 bg-black/40 flex items-center justify-center relative overflow-hidden p-8">
        <AnimatePresence mode="wait">
          {!palette && !loading && (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-white/10"
            >
              <span className="text-5xl">🎨</span>
              <span className="text-[10px] font-mono uppercase tracking-widest">Waiting for keywords</span>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 text-primary/50"
            >
              <span className="text-5xl animate-pulse">✨</span>
              <span className="text-[10px] font-mono uppercase tracking-widest animate-pulse">Analyzing vibes...</span>
            </motion.div>
          )}

          {palette && !loading && (
            <motion.div 
              key="palette"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col gap-3"
            >
              {palette.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 rounded-[8px] flex items-center justify-between p-4 cursor-pointer group relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex)}
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white font-bold tracking-wider text-sm drop-shadow-md">点击复制 {color.hex}</span>
                  </div>

                  <div className="relative z-10">
                    <h4 className="font-bold text-white drop-shadow-md text-lg">{color.name}</h4>
                    <p className="text-white/80 text-xs drop-shadow-md max-w-[200px] truncate">{color.reason}</p>
                  </div>
                  <div className="relative z-10 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    <span className="font-mono text-sm text-white font-bold">{color.hex}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

