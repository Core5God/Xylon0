import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal, ScrambleText } from './SharedComponents';

export const BrandDetails = ({ activeTab, setActiveTab, handleCopyColor }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void; 
  handleCopyColor: (color: string) => void;
}) => {
  return (
    <div className="max-w-7xl w-full mx-auto z-10 px-4 flex flex-col h-full">
      {/* Header & Tabs */}
      <div className="relative w-full mb-16 flex flex-col md:block">
        {/* Tabs in Upper Right Corner (Desktop) / Top (Mobile) */}
        <motion.div 
          className="flex flex-row flex-wrap gap-4 z-20 mb-8 md:mb-0 md:absolute md:top-0 md:right-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              }
            }
          }}
        >
          {[
            { id: 'elements', label: '要素提炼', icon: '✨' },
            { id: 'colors', label: '颜色释义', icon: '🎨' },
            { id: 'interpretation', label: '设计理念', icon: '💡' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variants={{
                hidden: { opacity: 0, y: -20, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 300, damping: 24 } },
                hover: { scale: 1.05, y: -2 },
                tap: { scale: 0.95 }
              }}
              whileHover="hover"
              whileTap="tap"
              className={`relative px-6 py-4 border rounded-[12px] backdrop-blur-md transition-colors duration-300 flex items-center justify-center gap-2 flex-1 md:flex-none md:min-w-[140px] group overflow-hidden ${
                activeTab === tab.id 
                  ? 'border-primary bg-primary/20 text-white shadow-[0_0_20px_rgba(52,58,150,0.4)]' 
                  : 'border-white/10 bg-black/40 text-white/50 hover:border-white/30 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              }`}
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span className="text-sm font-bold tracking-widest relative z-10 flex items-center gap-2">
                <motion.span 
                  variants={{
                    visible: { 
                      scale: activeTab === tab.id ? 1.2 : 0.9,
                      opacity: activeTab === tab.id ? 1 : 0.7,
                      y: activeTab === tab.id ? [0, -4, 0] : 0,
                      transition: activeTab === tab.id 
                        ? { y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }, scale: { duration: 0.3 } } 
                        : { duration: 0.3 }
                    },
                    hover: { 
                      scale: 1.2,
                      opacity: 1,
                      y: [0, -4, 0],
                      transition: { y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }, scale: { duration: 0.3 } }
                    }
                  }}
                  className="inline-block origin-bottom"
                >
                  {tab.icon}
                </motion.span>
                {tab.label}
              </span>
              
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeBoxIndicator"
                  className="absolute inset-0 border-2 border-primary rounded-[12px] pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Header */}
        <div className="md:pt-4">
          <Reveal className="text-4xl md:text-5xl font-black uppercase mb-4">
            <ScrambleText text={activeTab === 'elements' ? '要素提炼' : activeTab === 'colors' ? '颜色释义' : '设计理念'} />
          </Reveal>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            className="h-1 bg-primary" 
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-1 w-full min-h-[500px]">
        <AnimatePresence mode="wait">
          {activeTab === 'elements' && (
            <motion.div
              key="elements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <p className="text-white/60 max-w-md text-sm leading-relaxed mb-12">
                提取彝族传统文化中的核心符号，通过现代几何重构，赋予品牌深厚的文化底蕴与当代审美。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { src: "https://i.postimg.cc/Pqv3KL2t/tu-ceng-17.png", alt: "火把节", title: "火把节", desc: "象征热情与生生不息的品牌生命力，提取火焰跳跃的动态美感。" },
                  { src: "https://i.postimg.cc/903gSyJP/zu-30-kao-bei.png", alt: "彝绣", title: "传统彝绣", desc: "几何化的纹理交织，代表着品牌对细节的极致追求与匠心传承。" },
                  { src: "https://i.postimg.cc/4xM6Bs8W/zu-31-kao-bei-2.png", alt: "羊角图腾", title: "羊角图腾", desc: "坚韧与力量的象征，转化为极简的线条结构，构建稳固的视觉基石。" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    className="group relative bg-white/5 border border-white/10 rounded-[12px] p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col items-center text-center"
                    style={{ perspective: 1000 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors duration-500" />
                    
                    <motion.div 
                      className="relative w-full aspect-square mb-6 flex items-center justify-center rounded-[12px] overflow-hidden"
                      whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img src={item.src} alt={item.alt} className="w-3/4 h-auto object-contain relative z-10 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3 drop-shadow-2xl" referrerPolicy="no-referrer" loading="lazy" />
                      
                      {/* Hover Description Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center p-6 rounded-[12px]">
                        <p className="text-white text-sm leading-relaxed font-medium transform scale-90 group-hover:scale-100 transition-transform duration-500">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'colors' && (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { name: "热烈红", color: "#C42E2E", cmyk: ["c:28", "m:91", "y:99", "k:0"], img: "https://i.postimg.cc/QCns19fC/2431699721927.png", darkText: false },
                  { name: "深邃蓝", color: "#1A3A6E", cmyk: ["c:92", "m:77", "y:20", "k:0"], img: "https://i.postimg.cc/SsMtDXQL/2411699721926.png", darkText: false },
                  { name: "活力橙", color: "#E69C4A", cmyk: ["c:4", "m:44", "y:69", "k:0"], img: "https://i.postimg.cc/DZkcfxFy/2421699721927.png", darkText: false },
                  { name: "象牙白", color: "#F2E6D4", cmyk: ["c:4", "m:18", "y:27", "k:0"], img: "https://i.postimg.cc/tTqYz6NB/2441699721928.png", darkText: true }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col group cursor-pointer relative overflow-hidden rounded-[12px] shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 bg-white/5 border border-white/10" onClick={() => handleCopyColor(item.color)}>
                    <div className="aspect-square overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-3xl">📋</span>
                          <span className="text-white font-bold text-sm tracking-wider drop-shadow-md">复制色值</span>
                        </div>
                      </div>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" loading="lazy" />
                    </div>
                    <div className="p-8 flex flex-col justify-center min-h-[180px] relative" style={{ backgroundColor: item.color }}>
                      <div className={`space-y-1 ${item.darkText ? 'text-black/80' : 'text-white'}`}>
                        <p className="text-xl font-bold mb-2">{item.name}</p>
                        {item.cmyk.map((val, idx) => (
                          <p key={idx} className="text-sm font-mono font-bold tracking-wider leading-none opacity-80">{val}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'interpretation' && (
            <motion.div
              key="interpretation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
                {/* Left: Visual Display */}
                <div className="lg:w-1/2 relative rounded-[12px] bg-primary/5 border border-white/10 p-8 flex items-center justify-center overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-primary/40 rounded-tl-[12px] opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                  <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-primary/40 rounded-br-[12px] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
