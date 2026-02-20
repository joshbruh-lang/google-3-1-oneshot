import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowDownRight, Circle, Cpu, Zap, Code2, Globe, Play, RotateCcw, Thermometer, Hash, ChevronRight, Film, ImageIcon, Terminal } from 'lucide-react';

// --- Utility Hooks & Components ---

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
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference" />
      <div ref={trailingRef} className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
    </>
  );
};

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

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3;
    const y = (e.clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };
  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });
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
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform cursor-pointer">G</div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-20 relative overflow-hidden bg-[#E8E8E3]">
    <div className="z-10 w-full max-w-7xl mx-auto">
      <div className="overflow-hidden mb-4">
        <p className="text-sm md:text-base uppercase tracking-widest font-semibold text-black/50 animate-slide-up">[ Gen-03 Architecture ]</p>
      </div>
      <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter uppercase text-black mb-12">
        <div className="overflow-hidden">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}><ScrambleText text="Machine" /></div>
        </div>
        <div className="overflow-hidden flex items-center gap-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}><ScrambleText text="Intelligence" /></div>
          <div className="hidden md:block w-32 h-4 bg-black animate-expand-x" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="overflow-hidden text-transparent [-webkit-text-stroke:2px_black] hover:[-webkit-text-stroke:2px_#FF3366] transition-all duration-500">
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}><ScrambleText text="Redefined." /></div>
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
    <div className="absolute right-[-10%] top-[-10%] w-[50vw] h-[50vw] rounded-full border-[2px] border-black/10 animate-spin-slow pointer-events-none flex items-center justify-center">
      <div className="w-[80%] h-[80%] rounded-full border-[2px] border-black/10 flex items-center justify-center">
        <div className="w-[60%] h-[60%] rounded-full border-[2px] border-black/10" />
      </div>
    </div>
  </section>
);

const Manifesto = () => (
  <section id="manifesto" className="py-32 px-6 lg:px-12 bg-[#FF3366] border-y-4 border-black relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative z-10">
      <h2 className="text-[7vw] md:text-[6vw] leading-[0.9] font-black uppercase text-black">
        We don't just <br/>
        <span className="text-transparent [-webkit-text-stroke:2px_black] hover:text-white transition-colors duration-300">predict</span> the next <br/>
        word. We <span className="underline decoration-8 underline-offset-8 decoration-black hover:decoration-white transition-colors duration-300">compute</span> <br/>
        reality.
      </h2>
    </div>
    <Sticker color="bg-[#CCFF00]" className="top-[10%] right-[10%] rotate-6 md:right-[20%]">1M Context</Sticker>
    <Sticker color="bg-[#00E5FF]" className="bottom-[20%] left-[10%] -rotate-12 md:left-[40%]">Multimodal</Sticker>
    <Sticker color="bg-white" className="bottom-[10%] right-[5%] rotate-12 text-black">Zero Latency</Sticker>
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -rotate-3 opacity-20 pointer-events-none">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
        <span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
        <span className="text-[15vw] font-black uppercase mx-4">Deep Think</span>
      </div>
    </div>
  </section>
);

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
            className={`relative overflow-hidden transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-[2rem] cursor-pointer flex flex-col justify-between p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 ${hoveredIndex === index ? `flex-[4] md:flex-[4] ${model.color}` : 'flex-[1] md:flex-[1] bg-white'}`}
          >
            <div className={`flex justify-between items-start transition-opacity duration-300 ${hoveredIndex === index ? model.text : 'text-black'}`}>
              <span className="font-mono text-sm uppercase tracking-widest font-bold rotate-0 md:rotate-90 md:origin-top-left md:translate-x-4 md:translate-y-4 md:whitespace-nowrap absolute top-8 left-8">
                {model.role}
              </span>
              {hoveredIndex === index && <ArrowRight className="w-8 h-8 ml-auto animate-fade-in" />}
            </div>
            <div className={`mt-auto ${hoveredIndex === index ? model.text : 'text-black md:-rotate-90 md:origin-bottom-left md:translate-x-6 md:-translate-y-24 md:whitespace-nowrap absolute bottom-8 left-8 md:bottom-32 md:left-12'}`}>
              <h3 className={`font-black uppercase tracking-tighter transition-all duration-500 ${hoveredIndex === index ? 'text-5xl md:text-7xl mb-4' : 'text-3xl md:text-4xl'}`}>
                {model.name}
              </h3>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${hoveredIndex === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xl md:text-2xl font-medium">{model.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const UseCasesBento = () => (
  <section className="py-24 px-6 lg:px-12 bg-[#CCFF00] border-y-4 border-black">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">Applications</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-[#FF3366] p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-full">Active</div>
          <h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-4 relative z-10 group-hover:italic transition-all">Synthetic Biology</h3>
          <p className="text-xl font-bold text-black/80 max-w-md relative z-10">Protein folding simulations accelerated by 10,000x via distributed agentic workflows.</p>
          <Globe className="absolute -bottom-10 -right-10 w-64 h-64 text-black opacity-10 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700" />
        </div>
        <div className="col-span-1 bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex flex-col justify-between group">
          <Cpu className="w-12 h-12 text-black mb-12 group-hover:animate-spin-slow" />
          <div>
            <h3 className="text-3xl font-black uppercase text-black mb-2">Automated Data</h3>
            <p className="font-bold text-black/60 uppercase text-sm">Self-Cleaning Pipelines</p>
          </div>
        </div>
        <div className="col-span-1 bg-black text-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl group cursor-pointer hover:bg-[#00E5FF] hover:text-black transition-colors duration-300">
          <div className="h-full flex flex-col justify-end">
            <Zap className="w-12 h-12 mb-auto" />
            <h3 className="text-3xl font-black uppercase mb-2">Real-time Audio</h3>
            <p className="font-bold opacity-70 uppercase text-sm">Sub-100ms Latency</p>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 bg-[#E8E8E3] p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl flex items-center justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-2">Generative UI</h3>
            <p className="text-xl font-bold text-black/80">Interfaces that build themselves.</p>
          </div>
          <div className="w-32 h-32 bg-[#CCFF00] border-4 border-black rounded-full flex items-center justify-center relative z-10 group-hover:scale-125 transition-transform duration-500">
            <Code2 className="w-12 h-12 text-black" />
          </div>
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

const TerminalBlock = () => {
  const [startTyping, setStartTyping] = useState(false);
  const terminalRef = useRef(null);
  const text1 = useTypewriter("> Accessing Core Systems...", 30, startTyping ? 0 : 999999);
  const text2 = useTypewriter("> Loading Gemini Context window [1,048,576 tokens]...", 20, startTyping ? 1500 : 999999);
  const text3 = useTypewriter("> CONNECTION ESTABLISHED. READY.", 30, startTyping ? 3000 : 999999);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartTyping(true); },
      { threshold: 0.5 }
    );
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="py-24 px-6 lg:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <div ref={terminalRef} className="bg-black border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,51,102,1)] rounded-xl overflow-hidden font-mono text-[#CCFF00] p-6 min-h-[300px]">
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

// --- PLAYGROUND ---

const MODELS = [
  {
    id: 'gemini',
    name: 'Gemini Pro',
    tag: 'Reasoning',
    icon: <Cpu className="w-5 h-5" />,
    accent: '#00E5FF',
    placeholder: 'Explain the thermodynamic arrow of time and its relation to entropy...',
    responses: [
      `The thermodynamic arrow of time emerges from the statistical mechanics of large systems. At its core, the second law of thermodynamics states that entropy — the measure of disorder in a closed system — can only increase or remain constant, never decrease.\n\nConsider a gas molecule in a box. Microscopically, Newton's laws are time-reversible: a movie of two billiard balls colliding looks equally valid forwards or backwards. But aggregate 10²³ molecules, and the statistical improbability of them spontaneously ordering themselves becomes so astronomically large it is effectively zero.\n\nThis is the Boltzmann interpretation: entropy is proportional to the logarithm of the number of microstates. High-entropy states have more available configurations. The future is simply the direction in which configurations become more probable.\n\nThe deep puzzle: why was entropy so low at the Big Bang? This "past hypothesis" remains one of the most profound open questions in cosmology — it suggests the arrow of time is cosmological in origin, not merely thermodynamic.`,
      `Entropy is the universe's ledger of possibilities. Each macrostate — pressure, temperature, volume — corresponds to an enormous number of possible microstates. The arrow of time points toward more microstates, simply because that's where probability lives.\n\nThe Boltzmann brain thought experiment reveals the tension: in an infinitely old universe at thermal equilibrium, random fluctuations should occasionally produce a conscious observer. Yet we observe low entropy everywhere. Penrose's CCC (Conformal Cyclic Cosmology) proposes that our Big Bang was the "conformally rescaled" end of a previous aeon — passing entropy information through cosmic boundaries.\n\nIn quantum mechanics, the Schrödinger equation is also time-symmetric. Wavefunction collapse and the measurement problem reintroduce an arrow, but through observer-dependent mechanics. Some interpretations (MWI) avoid this entirely, leaving the arrow purely thermodynamic.`
    ]
  },
  {
    id: 'veo',
    name: 'Veo',
    tag: 'Video',
    icon: <Film className="w-5 h-5" />,
    accent: '#FF3366',
    placeholder: 'A lone astronaut discovers a monolith on Europa, handheld camera, golden hour...',
    responses: [
      `[ VEO RENDER PIPELINE — INITIALIZING ]\n\nScene breakdown complete. Parsing cinematic intent...\n\n◆ SHOT 01 — WIDE ESTABLISH\n  Duration: 8.2s | Resolution: 4K/120fps\n  Camera: Handheld drift, slight roll axis instability\n  Lighting: Subsurface ice scatter, Jupiter rise at 22° azimuth\n  Atmosphere: Europa particle haze, sodium plume corona\n\n◆ SHOT 02 — MEDIUM APPROACH\n  Duration: 12.4s\n  Physics: Low-gravity locomotion (0.134g), suit pressurization jitter\n  Monolith surface: Obsidian specular, sub-millimeter geometry detail\n  Audio sync: Suit breath, cryo-creak structural expansion\n\n◆ SHOT 03 — EXTREME CLOSE / DISCOVERY\n  Duration: 6.8s | Aspect: 2.35:1 letterbox\n  Face capture: 847 micro-expression vertices mapped\n  Color grade: Teal shadow, amber specular — Lubezki reference applied\n\n[ RENDER ESTIMATE: 2.3 minutes @ TPU v5 cluster ]\n[ PHYSICS VALIDATION: PASSED ✓ ]`,
      `[ VEO 3.1 — CINEMATIC GENERATION ]\n\nPrompt semantics analyzed. Tone: Kubrickian dread + scientific wonder.\n\n◆ SEQUENCE MAP\n  Total runtime: 34 seconds\n  Frames generated: 4,080 @ 120fps\n  Physics engine: Bullet v4 + proprietary fluid dynamics\n\n◆ LIGHTING MODEL\n  Primary: Jupiter reflected albedo (0.52) + internal ice luminescence\n  Secondary: Helmet lamp spill — color temp 3200K\n  Lens: Anamorphic breathing, 2.39:1, chromatic aberration at edges\n\n◆ ENVIRONMENT GENERATION\n  Ice sheet topology: Procedural fractal displacement, 8K heightmap\n  Monolith: Non-Euclidean geometry inference from prompt semantics\n  Sky: Volumetric Jovian cloud simulation, 6-layer atmosphere\n\n◆ OUTPUT FORMATS\n  ProRes 4444XQ / H.265 web / 8K master DCP\n  Spatial audio: Dolby Atmos 7.1.4\n\n[ COHERENCE SCORE: 98.7% ] [ PHYSICS PASS: ✓ ]`
    ]
  },
  {
    id: 'imagen',
    name: 'Imagen',
    tag: 'Image',
    icon: <ImageIcon className="w-5 h-5" />,
    accent: '#CCFF00',
    accentText: 'text-black',
    placeholder: 'Brutalist library interior, brutalist architecture, diffused window light, film grain...',
    responses: [
      `[ IMAGEN 3.1 — SYNTHESIS PIPELINE ]\n\nPrompt parsed. Semantic density: HIGH. Initiating...\n\n◆ COMPOSITION ANALYSIS\n  Rule of thirds: OVERRIDE — brutalist symmetry enforced\n  Perspective: 2-point, 28mm equivalent, slight barrel correction\n  Focal depth: f/2.8 emulation, focus rack mid-stacks\n\n◆ MATERIAL ENGINE\n  Concrete: Béton brut surface — 14 texture layers\n  Paper/book aging: Yellowed cellulose, foxing procedural\n  Glass: Rolled float, ribbed — 1960s institutional spec\n  Light shafts: Volumetric mie scattering, dust particle sim\n\n◆ STYLE REFERENCE SYNTHESIS\n  Influences detected: Brutalist Tadao Ando + Soviet functionalism\n  Film grain: Kodak Ektachrome 100 @ ISO 400 push\n  Tonal range: Low key, ETTR expose, shadow lift +12\n  Color grade: Split-tone — warm shadows / cool highlights\n\n◆ OUTPUT\n  Resolution: 8192 × 5461 (8K)\n  Format: TIFF 16-bit / WebP lossless\n  Typography legibility: PERFECT ✓\n\n[ AESTHETIC COHERENCE: 97.4% ]`,
      `[ IMAGEN 3.1 — 4K NATIVE RENDER ]\n\nBuilding scene graph from language embedding space...\n\n◆ SPATIAL LAYOUT\n  Ceiling height: Inferred 14m — brutalist proportion ratio 1:3.2\n  Columns: Exposed aggregate, chamfered — Stirling reference\n  Stack depth: 7 rows, perspectival compression managed\n\n◆ LIGHTING SIGNATURE\n  Window type: Clerestory slit, north-facing (cool diffuse)\n  Shadow fall: Hard-edged concrete planes, 47° incidence\n  Ambient: Low, musty institutional — exposure bias -0.7 EV\n  Practical lights: Absent — pure natural only\n\n◆ FILM SIMULATION\n  Stock: Fuji Neopan Acros II pushed to 1600\n  Grain structure: Asymmetric clumping, shadow-heavy\n  Halation: Slight highlight bloom on window frames\n\n◆ POST PROCESSING\n  Vignette: Natural optical, not digital\n  Sharpening: Unsharp mask 0.3px radius — period authentic\n\n[ RENDER COMPLETE — 8K TIFF READY ]`
    ]
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    tag: 'Code',
    icon: <Terminal className="w-5 h-5" />,
    accent: '#CCFF00',
    accentText: 'text-black',
    placeholder: 'Build a self-healing distributed key-value store with eventual consistency...',
    responses: [
      `// ANTIGRAVITY v3.1 — AGENTIC CODE SYNTHESIS
// Self-correcting. Zero compilation errors. Guaranteed.

import { DistributedNode, ConsistencyModel, VectorClock } from '@antigravity/core';

class SelfHealingKVStore {
  private nodes: Map<string, DistributedNode> = new Map();
  private vectorClock: VectorClock;
  private repairQueue: AsyncQueue<RepairOp>;

  constructor(private readonly config: ClusterConfig) {
    this.vectorClock = new VectorClock(config.nodeId);
    this.repairQueue = new AsyncQueue({ concurrency: 4 });
    this.initHealthMonitor();
  }

  async set(key: string, value: unknown): Promise<void> {
    const timestamp = this.vectorClock.tick();
    const entry: LogEntry = { key, value, timestamp, checksum: sha256(value) };

    // Optimistic replication — write to quorum + heal stragglers async
    const [primary, ...replicas] = this.getQuorumNodes(key);
    await primary.write(entry);

    Promise.allSettled(replicas.map(r => r.write(entry)))
      .then(results => this.scheduleRepair(results, entry));
  }

  private async detectAndHeal(): Promise<void> {
    const merkleRoots = await this.broadcastMerkleCheck();
    const divergent = this.compareTrees(merkleRoots);
    if (divergent.length) await this.antiEntropySync(divergent);
  }

  // Anti-entropy: background Merkle tree comparison
  // CRDT conflict resolution: Last-Write-Wins with vector clocks
  // Gossip protocol: O(log n) convergence guaranteed
}

// ✓ Compiled — 0 errors, 0 warnings
// ✓ Test suite: 847/847 passing
// ✓ CAP theorem: AP mode (Available + Partition tolerant)`,
      `// ANTIGRAVITY v3.1 — AUTONOMOUS SYNTHESIS COMPLETE
// Iterations: 3 | Self-corrections applied: 7

#!/usr/bin/env python3
"""
Distributed KV store — eventual consistency via gossip protocol
Antigravity auto-generated and self-validated
"""

import asyncio, hashlib, time
from dataclasses import dataclass, field
from typing import Optional
from collections import defaultdict

@dataclass
class Entry:
    key: str
    value: bytes
    timestamp: float = field(default_factory=time.time)
    node_id: str = ""
    checksum: str = field(init=False)

    def __post_init__(self):
        self.checksum = hashlib.sha256(self.value).hexdigest()[:8]

class KVNode:
    def __init__(self, node_id: str, peers: list[str]):
        self.id = node_id
        self.store: dict[str, Entry] = {}
        self.peers = peers
        self.vector_clock: dict[str, int] = defaultdict(int)

    async def put(self, key: str, value: bytes) -> None:
        self.vector_clock[self.id] += 1
        entry = Entry(key, value, node_id=self.id)
        self.store[key] = entry
        asyncio.create_task(self._gossip(entry))  # fire-and-forget

    async def _gossip(self, entry: Entry, fanout: int = 3) -> None:
        """Infect random peers — O(log n) convergence"""
        targets = random.sample(self.peers, min(fanout, len(self.peers)))
        await asyncio.gather(*[self._replicate(t, entry) for t in targets],
                             return_exceptions=True)

# ✓ Self-healed 3 race conditions during generation
# ✓ Benchmarks: 180k ops/sec single node
# ✓ Convergence tested: 99.97% @ 500ms window`
    ]
  }
];

const Playground = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [outputDone, setOutputDone] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const outputRef = useRef(null);
  const textareaRef = useRef(null);
  const intervalRef = useRef(null);

  const model = MODELS[selectedModel];
  const tokenCount = Math.ceil(prompt.length / 4);
  const outputTokens = Math.ceil(output.length / 4);

  const handleRun = () => {
    if (isRunning || !prompt.trim()) return;
    setIsRunning(true);
    setOutput('');
    setOutputDone(false);

    const responses = model.responses;
    const text = responses[runCount % responses.length];
    setRunCount(c => c + 1);

    let i = 0;
    // vary speed slightly with temperature
    const baseSpeed = Math.max(8, 22 - Math.floor(temperature * 14));

    intervalRef.current = setInterval(() => {
      if (i <= text.length) {
        setOutput(text.slice(0, i));
        i += Math.ceil(temperature * 3 + 1);
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      } else {
        clearInterval(intervalRef.current);
        setOutput(text);
        setIsRunning(false);
        setOutputDone(true);
      }
    }, baseSpeed);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setOutput('');
    setOutputDone(false);
    setIsRunning(false);
    setPrompt('');
  };

  const handleModelSwitch = (idx) => {
    setSelectedModel(idx);
    setOutput('');
    setOutputDone(false);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const isCode = model.id === 'antigravity';
  const isVeo = model.id === 'veo';
  const isImagen = model.id === 'imagen';

  return (
    <section id="playground" className="py-24 px-6 lg:px-12 bg-[#E8E8E3] border-y-4 border-black">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest font-bold text-black/40 mb-2">[ Interactive ]</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
              Playground
            </h2>
          </div>
          <p className="text-base font-bold uppercase tracking-wide text-black/50 max-w-xs text-right hidden md:block">
            Real inference.<br/>Mock latency. Full feel.
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {MODELS.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => handleModelSwitch(idx)}
              className={`flex items-center gap-2 px-5 py-3 border-4 border-black font-black uppercase tracking-wider text-sm transition-all duration-200
                ${selectedModel === idx
                  ? 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1'
                  : 'shadow-none bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5'}
              `}
              style={selectedModel === idx ? { backgroundColor: m.accent, color: m.accentText ? '#000' : '#000' } : {}}
            >
              {m.icon}
              {m.name}
              <span className="text-[10px] opacity-60 font-mono">{m.tag}</span>
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Input Panel */}
          <div className="flex flex-col gap-4">

            {/* Prompt Area */}
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="flex items-center justify-between px-5 py-3 border-b-4 border-black bg-black text-white">
                <span className="font-mono text-xs uppercase tracking-widest font-bold">Prompt Input</span>
                <div className="flex items-center gap-2">
                  <Hash className="w-3 h-3 opacity-50" />
                  <span className="font-mono text-xs font-bold" style={{ color: tokenCount > 0 ? model.accent : 'rgba(255,255,255,0.4)' }}>
                    {tokenCount} tokens
                  </span>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder={model.placeholder}
                className="w-full h-52 p-5 text-base font-bold text-black bg-white resize-none focus:outline-none placeholder:text-black/25 placeholder:font-medium font-mono"
                style={{ cursor: 'text' }}
              />
              <div className="px-5 py-2 border-t-2 border-black/10 flex justify-between items-center">
                <span className="text-xs font-mono text-black/30 uppercase tracking-widest">
                  {model.name} · {model.tag}
                </span>
                <span className="text-xs font-mono text-black/30">
                  {prompt.length} chars
                </span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-black" />
                  <span className="font-black uppercase tracking-wider text-sm">Temperature</span>
                </div>
                <span
                  className="font-black text-2xl tabular-nums px-3 py-1 border-2 border-black"
                  style={{ backgroundColor: model.accent, color: '#000' }}
                >
                  {temperature.toFixed(1)}
                </span>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={e => setTemperature(parseFloat(e.target.value))}
                  className="w-full appearance-none h-4 border-2 border-black bg-black/10 rounded-none"
                  style={{
                    cursor: 'pointer',
                    '--thumb-color': model.accent,
                  }}
                />
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-xs font-bold uppercase text-black/40">Precise</span>
                <span className="text-xs font-bold uppercase text-black/40">Balanced</span>
                <span className="text-xs font-bold uppercase text-black/40">Creative</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <MagneticButton
                onClick={handleRun}
                className={`flex-1 py-5 border-4 border-black font-black uppercase tracking-widest text-lg transition-all duration-200
                  ${isRunning || !prompt.trim()
                    ? 'bg-black/20 text-black/40 shadow-none cursor-not-allowed'
                    : 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1'
                  }`}
              >
                {isRunning ? (
                  <span className="flex items-center gap-3 justify-center">
                    <span className="w-3 h-3 bg-[#CCFF00] rounded-full animate-pulse" />
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-3 justify-center">
                    <Play className="w-5 h-5" />
                    Run
                  </span>
                )}
              </MagneticButton>

              <button
                onClick={handleReset}
                className="px-5 py-5 border-4 border-black bg-white font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* RIGHT — Output Panel */}
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col" style={{ minHeight: '520px' }}>

            {/* Output Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b-4 border-black flex-shrink-0"
              style={{ backgroundColor: output ? model.accent : '#000' }}
            >
              <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: output && model.accentText ? '#000' : output ? '#000' : 'rgba(255,255,255,0.5)' }}>
                {isRunning ? '◉ Streaming output...' : outputDone ? '✓ Complete' : 'Awaiting input'}
              </span>
              {outputDone && (
                <span className="font-mono text-xs font-bold flex items-center gap-1" style={{ color: '#000' }}>
                  <Hash className="w-3 h-3" />
                  {outputTokens} tokens
                </span>
              )}
            </div>

            {/* Output Body */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-5 bg-white"
            >
              {!output && !isRunning && (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-30">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center">
                    {model.icon}
                  </div>
                  <p className="font-black uppercase tracking-widest text-sm">
                    Enter a prompt<br/>and hit Run
                  </p>
                </div>
              )}

              {(output || isRunning) && (
                <pre className={`text-sm leading-relaxed font-mono text-black whitespace-pre-wrap break-words ${isCode ? 'text-xs' : ''}`}>
                  {output}
                  {isRunning && (
                    <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-blink"
                      style={{ backgroundColor: model.accent }} />
                  )}
                </pre>
              )}
            </div>

            {/* Output Footer Stats */}
            {outputDone && (
              <div className="border-t-4 border-black px-5 py-3 bg-black flex items-center gap-6 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                    Latency: {Math.floor(Math.random() * 80 + 20)}ms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: model.accent }} />
                  <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                    {model.name}
                  </span>
                </div>
                <div className="ml-auto font-mono text-xs text-white/50 uppercase tracking-widest">
                  Temp: {temperature.toFixed(1)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs font-bold uppercase tracking-widest text-black/30">
          All outputs are simulated demos — no API calls made
        </p>
      </div>

      {/* Slider thumb global style */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 28px;
          height: 28px;
          background: var(--thumb-color, #000);
          border: 3px solid #000;
          border-radius: 0;
          cursor: pointer;
          margin-top: -8px;
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: var(--thumb-color, #000);
          border: 3px solid #000;
          border-radius: 0;
          cursor: pointer;
        }
        input[type='range']::-webkit-slider-runnable-track {
          height: 12px;
          background: rgba(0,0,0,0.12);
          border: 2px solid #000;
        }
      `}</style>
    </section>
  );
};

const MarqueeFooter = () => (
  <footer className="bg-black py-12 overflow-hidden border-t-4 border-black">
    <div className="relative flex overflow-x-hidden border-b border-white/20 pb-12 mb-12">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="text-[10vw] font-black text-transparent [-webkit-text-stroke:2px_white] uppercase mx-8">Build the future</span>
        <Circle className="w-16 h-16 text-[#FF3366] fill-[#FF3366]" />
        <span className="text-[10vw] font-black text-white uppercase mx-8">With Gemini</span>
        <Circle className="w-16 h-16 text-[#00E5FF] fill-[#00E5FF]" />
        <span className="text-[10vw] font-black text-transparent [-webkit-text-stroke:2px_white] uppercase mx-8">Build the future</span>
        <Circle className="w-16 h-16 text-[#FF3366] fill-[#FF3366]" />
        <span className="text-[10vw] font-black text-white uppercase mx-8">With Gemini</span>
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

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#E8E8E3] text-black font-sans cursor-none selection:bg-[#CCFF00] selection:text-black">
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
      <Playground />
      <MarqueeFooter />
    </div>
  );
}
