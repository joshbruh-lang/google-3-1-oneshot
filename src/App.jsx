import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowDownRight, Circle, Cpu, Zap, Code2, Globe } from 'lucide-react';
// --- Utility Hooks & Components ---
// Smooth trailing cursor
const CustomCursor = () => {
const cursorRef = useRef(null);
const trailingRef = useRef(null);
  useEffect(() => {
let mouseX = 0, mouseY = 0;
let trailingX = 0, trailingY = 0;
const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}
};
const animate = () => {
      trailingX += (mouseX - trailingX) * 0.15;
      trailingY += (mouseY - trailingY) * 0.15;
if (trailingRef.current) {
        trailingRef.current.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
}
      requestAnimationFrame(animate);
};
    window.addEventListener('mousemove', onMouseMove);
    animate();
return () => window.removeEventListener('mousemove', onMouseMove);
}, []);
return (
    <>
<div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference"
      />
<div
        ref={trailingRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
);
};
// Scrambling Text Effect
const ScrambleText = ({ text }) => {
const [displayText, setDisplayText] = useState(text);
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  useEffect(() => {
let iterations = 0;
const interval = setInterval(() => {
      setDisplayText(prev =>
        text.split("").map((letter, index) => {
if (index < iterations) return text[index];
return letters[Math.floor(Math.random() * letters.length)];
}).join("")
);
if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
}, 30);
return () => clearInterval(interval);
}, [text]);
return <span>{displayText}</span>;
};
// Typewriter Effect Hook
const useTypewriter = (text, speed = 50, delay = 0) => {
const [displayText, setDisplayText] = useState('');
const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
let timeout;
let currentIndex = 0;
const startTyping = () => {
      setIsTyping(true);
const interval = setInterval(() => {
if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
} else {
          clearInterval(interval);
          setIsTyping(false);
}
}, speed);
return interval;
};
    timeout = setTimeout(() => {
const interval = startTyping();
return () => clearInterval(interval);
}, delay);
return () => clearTimeout(timeout);
}, [text, speed, delay]);
return { displayText, isTyping };
};
// Magnetic Button
const MagneticButton = ({ children, className = "", onClick }) => {
const buttonRef = useRef(null);
const [position, setPosition] = useState({ x: 0, y: 0 });
const handleMouseMove = (e) => {
const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
const x = (e.clientX - (left + width / 2)) * 0.3;
const y = (e.clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
};
const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
};
return (
<button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
>
{children}
</button>
);
};
// Brutalist Sticker
const Sticker = ({ children, color, className, rotation = "-rotate-12" }) => (
<div className={`absolute transform ${rotation} hover:rotate-0 hover:scale-110 transition-all duration-300 border-2 border-black px-4 py-2 font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${color} ${className} select-none`}>
{children}
</div>
);
// --- Page Sections ---
const NavBar = () => (
<nav className="fixed top-0 w-full z-50 p-6 mix-blend-difference text-white">
<div className="container mx-auto flex justify-between items-center">
<div className="text-xl font-bold tracking-tighter uppercase">
Google <span className="font-light">AI</span>
</div>
<div className="hidden md:flex space-x-12 text-sm font-medium uppercase tracking-widest">
<a href="#manifesto" className="hover:italic transition-all">Manifesto</a>
<a href="#models" className="hover:italic transition-all">Models</a>
<a href="#playground" className="hover:italic transition-all">Playground</a>
</div>
<div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform cursor-pointer">
G
</div>
</div>
</nav>
);
const Hero = () => {
return (
<section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20 relative overflow-hidden bg-[#E8E8E3]">
<div className="z-10 w-full max-w-7xl mx-auto">
<div className="overflow-hidden mb-4">
<p className="text-sm md:text-base uppercase tracking-widest font-semibold text-black/50 animate-slide-up">
[ Gen-03 Architecture ]
</p>
</div>
<h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase text-black mb-12">
<div className="overflow-hidden">
<div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
<ScrambleText text="Machine" />
</div>
</div>
<div className="overflow-hidden flex items-center gap-4">
<div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
<ScrambleText text="Intelligence" />
</div>
<div className="hidden md:block w-32 h-4 bg-black animate-expand-x" style={{ animationDelay: '0.5s' }} />
</div>
<div className="overflow-hidden text-transparent [-webkit-text-stroke:2px_black] hover:[-webkit-text-stroke:2px_#FF3366] transition-all duration-500">
<div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
<ScrambleText text="Redefined." />
</div>
</div>
</h1>
<div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full animate-fade-in" style={{ animationDelay: '0.8s' }}>
<p className="max-w-md text-xl md:text-2xl font-medium leading-tight text-black/80 mb-8 md:mb-0 border-l-4 border-black pl-6">
Moving away from black boxes. We build tactile, explicit, and multimodal reasoning engines for the modern web.
</p>
<MagneticButton className="group px-8 py-5 bg-black text-white text-lg font-bold uppercase tracking-wider rounded-full hover:bg-[#00E5FF] hover:text-black transition-colors duration-300">
Explore 3.1
<ArrowDownRight className="ml-3 w-6 h-6 group-hover:rotate-[-45deg] transition-transform duration-300" />
</MagneticButton>
</div>
</div>
{/* Abstract Background Elements */}
<div className="absolute right-[-10%] top-[-10%] w-[50vw] h-[50vw] rounded-full border-[2px] border-black/10 animate-spin-slow pointer-events-none flex items-center justify-center">
<div className="w-[80%] h-[80%] rounded-full border-[2px] border-black/10 flex items-center justify-center">
<div className="w-[60%] h-[60%] rounded-full border-[2px] border-black/10" />
</div>
</div>
</section>
);
};
const Manifesto = () => {
return (
<section id="manifesto" className="py-32 px-6 lg:px-12 bg-[#FF3366] border-y-4 border-black relative overflow-hidden">
<div className="max-w-7xl mx-auto relative z-10">
<h2 className="text-[7vw] md:text-[6vw] leading-[0.9] font-black uppercase text-black">
We don't just <br/>
<span className="text-transparent [-webkit-text-stroke:2px_black] hover:text-white transition-colors duration-300">predict</span> the next <br/>
          word. We <span className="underline decoration-8 underline-offset-8 decoration-black hover:decoration-white transition-colors duration-300">compute</span> <br/>
          reality.
</h2>
</div>
<Sticker color="bg-[#CCFF00]" className="top-[10%] right-[10%] rotate-6 md:right-[20%]">
1M Context
</Sticker>
<Sticker color="bg-[#00E5FF]" className="bottom-[20%] left-[10%] -rotate-12 md:left-[40%]">
Multimodal
</Sticker>
<Sticker color="bg-white" className="bottom-[10%] right-[5%] rotate-12 text-black">
Zero Latency
</Sticker>
{/* Background Marquee */}
<div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -rotate-3 opacity-20 pointer-events-none">
<div className="animate-marquee whitespace-nowrap flex">
<span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
<span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
<span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
</div>
</div>
</section>
);
};
const ModelsAccordion = () => {
const [hoveredIndex, setHoveredIndex] = useState(0);
const models = [
{ name: "Gemini Pro", role: "Reasoning", color: "bg-[#E8E8E3]", text: "text-black", desc: "1M Token Context. Logical deduction." },
{ name: "Veo", role: "Video Engine", color: "bg-[#00E5FF]", text: "text-black", desc: "Cinematic generation. Physics grounded." },
{ name: "Imagen", role: "Visual Synthesis", color: "bg-[#CCFF00]", text: "text-black", desc: "4K native. Typographically perfect." },
{ name: "Antigravity", role: "Agentic Code", color: "bg-black", text: "text-white", desc: "Self-correcting development environments." }
];
return (
<section id="models" className="py-24 px-6 lg:px-12 bg-white">
<div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
<h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">The Fleet</h2>
<p className="hidden md:block text-xl font-bold uppercase text-black">[ Hover to expand ]</p>
</div>
<div className="flex flex-col md:flex-row h-[70vh] md:h-[65vh] w-full max-w-7xl mx-auto gap-4">
{models.map((model, index) => (
<div
            key={model.name}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-[2rem] cursor-pointer flex flex-col justify-between p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 ${
              hoveredIndex === index ? `flex-[4] md:flex-[4] ${model.color}` : 'flex-[1] md:flex-[1] bg-white'
}`}
>
{/* Top info */}
<div className={`flex justify-between items-start transition-opacity duration-300 ${hoveredIndex === index ? model.text : 'text-black'}`}>
<span className="font-mono text-sm uppercase tracking-widest font-bold rotate-0 md:rotate-90 md:origin-top-left md:translate-x-4 md:translate-y-4 md:whitespace-nowrap absolute top-8 left-8">
{model.role}
</span>
{hoveredIndex === index && (
<ArrowRight className="w-8 h-8 ml-auto animate-fade-in" />
)}
</div>
{/* Bottom info */}
<div className={`mt-auto ${hoveredIndex === index ? model.text : 'text-black md:-rotate-90 md:origin-bottom-left md:translate-x-6 md:-translate-y-24 md:whitespace-nowrap absolute bottom-8 left-8 md:bottom-32 md:left-12'}`}>
<h3 className={`font-black uppercase tracking-tighter transition-all duration-500 ${hoveredIndex === index ? 'text-5xl md:text-7xl mb-4' : 'text-3xl md:text-4xl'}`}>
{model.name}
</h3>
<div className={`overflow-hidden transition-all duration-500 ease-in-out ${hoveredIndex === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
<p className="text-xl md:text-2xl font-medium">
{model.desc}
</p>
</div>
</div>
</div>
))}
</div>
</section>
);
};
const UseCasesBento = () => {
return (
<section className="py-24 px-6 lg:px-12 bg-[#CCFF00] border-y-4 border-black">
<div className="max-w-7xl mx-auto">
<div className="mb-12">
<h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">Applications</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Card 1 */}
<div className="col-span-1 md:col-span-2 bg-[#FF3366] p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl relative overflow-hidden group">
<div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-full">Active</div>
<h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-4 relative z-10 group-hover:italic transition-all">Synthetic Biology</h3>
<p className="text-xl font-bold text-black/80 max-w-md relative z-10">Protein folding simulations accelerated by 10,000x via distributed agentic workflows.</p>
<Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-black opacity-10 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700" />
</div>
{/* Card 2 */}
<div className="col-span-1 bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex flex-col justify-between group">
<Cpu className="w-12 h-12 text-black mb-12 group-hover:animate-spin-slow" />
<div>
<h3 className="text-3xl font-black uppercase text-black mb-2">Automated Data</h3>
<p className="font-bold text-black/60 uppercase text-sm">Self-Cleaning Pipelines</p>
</div>
</div>
{/* Card 3 */}
<div className="col-span-1 bg-black text-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl group cursor-pointer hover:bg-[#00E5FF] hover:text-black transition-colors duration-300">
<div className="h-full flex flex-col justify-end">
<Zap className="w-12 h-12 mb-auto" />
<h3 className="text-3xl font-black uppercase mb-2">Real-time Audio</h3>
<p className="font-bold opacity-70 uppercase text-sm">Sub-100ms Latency</p>
</div>
</div>
{/* Card 4 */}
<div className="col-span-1 md:col-span-2 bg-[#E8E8E3] p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex items-center justify-between group overflow-hidden relative">
<div className="relative z-10">
<h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-2">Generative UI</h3>
<p className="text-xl font-bold text-black/80">Interfaces that build themselves.</p>
</div>
<div className="w-32 h-32 bg-[#CCFF00] border-4 border-black rounded-full flex items-center justify-center relative z-10 group-hover:scale-125 transition-transform duration-500">
<Code2 className="w-12 h-12 text-black" />
</div>
{/* Marquee bg */}
<div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
<div className="animate-marquee whitespace-nowrap flex">
<span className="text-[6vw] font-black uppercase mx-4">REACT NODE PYTHON RUST</span>
<span className="text-[6vw] font-black uppercase mx-4">REACT NODE PYTHON RUST</span>
</div>
</div>
</div>
</div>
</div>
</section>
);
};
const TerminalBlock = () => {
const [startTyping, setStartTyping] = useState(false);
const terminalRef = useRef(null);
const text1 = useTypewriter("> Accessing Core Systems...", 30, startTyping ? 0 : 999999);
const text2 = useTypewriter("> Loading Gemini Context window [1,048,576 tokens]...", 20, startTyping ? 1500 : 999999);
const text3 = useTypewriter("> CONNECTION ESTABLISHED. READY.", 30, startTyping ? 3000 : 999999);
  useEffect(() => {
const observer = new IntersectionObserver(
([entry]) => {
if (entry.isIntersecting) {
          setStartTyping(true);
}
},
{ threshold: 0.5 }
);
if (terminalRef.current) observer.observe(terminalRef.current);
return () => observer.disconnect();
}, []);
return (
<section className="py-24 px-6 lg:px-12 bg-white">
<div className="max-w-4xl mx-auto">
<div
          ref={terminalRef}
          className="bg-black border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,51,102,1)] rounded-xl overflow-hidden font-mono text-[#CCFF00] p-6 min-h-[300px]"
>
<div className="flex items-center space-x-2 mb-6 border-b border-[#CCFF00]/30 pb-4">
<div className="w-3 h-3 rounded-full bg-[#FF3366]"></div>
<div className="w-3 h-3 rounded-full bg-[#CCFF00]"></div>
<div className="w-3 h-3 rounded-full bg-[#00E5FF]"></div>
<span className="ml-4 text-xs font-bold uppercase text-[#CCFF00]/50 tracking-widest">Antigravity_Terminal_v3.1</span>
</div>
<div className="space-y-4 text-sm md:text-base font-bold">
<div>{text1.displayText}</div>
<div>{text2.displayText}</div>
<div className="text-[#00E5FF]">{text3.displayText}
{text3.displayText.length > 0 && <span className="inline-block w-3 h-5 bg-[#00E5FF] ml-2 animate-blink align-middle"></span>}
</div>
</div>
</div>
</div>
</section>
);
};
const TactileGrid = () => {
const [blocks, setBlocks] = useState(Array.from({ length: 150 }).map(() => false));
const handleMouseEnter = (index) => {
    setBlocks(prev => {
const newBlocks = [...prev];
      newBlocks[index] = true;
return newBlocks;
});
    setTimeout(() => {
      setBlocks(prev => {
const newBlocks = [...prev];
        newBlocks[index] = false;
return newBlocks;
});
}, 600);
};
return (
<section id="playground" className="py-32 bg-[#E8E8E3] border-y-4 border-black overflow-hidden relative">
<div className="absolute inset-0 flex flex-wrap content-start">
{blocks.map((isActive, i) => (
<div
            key={i}
            onMouseEnter={() => handleMouseEnter(i)}
            className={`w-[10%] h-[10vh] md:w-[5%] md:h-[12vh] border-[0.5px] border-black/10 transition-colors duration-500 ease-out ${
              isActive ? 'bg-[#FF3366] duration-0' : 'bg-transparent'
}`}
          />
))}
</div>
<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center pointer-events-none">
<div className="bg-[#E8E8E3]/90 p-12 backdrop-blur-md border-4 border-black rounded-3xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] pointer-events-auto max-w-3xl">
<h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-6">
Tactile Intelligence
</h2>
<p className="text-xl font-bold max-w-2xl mx-auto text-black/80 mb-8 uppercase tracking-wide">
Interact with the background. Our models process intent instantly, shifting from abstract computations to visceral, immediate feedback.
</p>
<MagneticButton className="px-10 py-5 bg-[#CCFF00] border-4 border-black text-black text-xl font-black uppercase tracking-widest hover:bg-black hover:text-[#CCFF00] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
Open Playground
</MagneticButton>
</div>
</div>
</section>
);
};
const MarqueeFooter = () => (
<footer className="bg-black py-12 overflow-hidden border-t-4 border-black">
<div className="relative flex overflow-x-hidden border-b border-white/20 pb-12 mb-12">
<div className="animate-marquee whitespace-nowrap flex items-center">
<span className="text-[10vw] font-black text-transparent [-webkit-text-stroke:2px_white] uppercase mx-8">
Build the future
</span>
<Circle className="w-16 h-16 text-[#FF3366] fill-[#FF3366]" />
<span className="text-[10vw] font-black text-white uppercase mx-8">
With Gemini
</span>
<Circle className="w-16 h-16 text-[#00E5FF] fill-[#00E5FF]" />
{/* Duplicate for seamless loop */}
<span className="text-[10vw] font-black text-transparent [-webkit-text-stroke:2px_white] uppercase mx-8">
Build the future
</span>
<Circle className="w-16 h-16 text-[#FF3366] fill-[#FF3366]" />
<span className="text-[10vw] font-black text-white uppercase mx-8">
With Gemini
</span>
<Circle className="w-16 h-16 text-[#00E5FF] fill-[#00E5FF]" />
</div>
</div>
<div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-white/50 uppercase text-sm font-bold tracking-widest">
<div className="mb-6 md:mb-0">© 2026 Google DeepMind</div>
<div className="flex space-x-8">
<a href="#" className="hover:text-white hover:underline transition-all">Twitter</a>
<a href="#" className="hover:text-white hover:underline transition-all">GitHub</a>
<a href="#" className="hover:text-white hover:underline transition-all">Paper</a>
</div>
</div>
</footer>
);
// --- Main Application ---
export default function App() {
return (
<div className="min-h-screen bg-[#E8E8E3] text-black font-sans cursor-none selection:bg-[#CCFF00] selection:text-black">
{/* Global CSS for strict custom animations */}
<style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; cursor: none; overflow-x: hidden; }
        a, button { cursor: none !important; }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes expand-x {
          from { width: 0; }
          to { width: 8rem; }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.76, 0, 0.24, 1) forwards; }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; opacity: 0; }
        .animate-expand-x { animation: expand-x 1s cubic-bezier(0.76, 0, 0.24, 1) forwards; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-spin-slow { animation: spin 30s linear infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}} />
<CustomCursor />
<NavBar />
<Hero />
<Manifesto />
<ModelsAccordion />
<UseCasesBento />
<TerminalBlock />
<TactileGrid />
<MarqueeFooter />
</div>
);
}
