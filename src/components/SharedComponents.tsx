import React from 'react';
import { motion, useInView } from 'motion/react';

export const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = React.useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 60);
    
    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className={className}>{displayText}</span>;
};
