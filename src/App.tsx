import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Sparkles,
  Facebook,
  Instagram,
  Twitter,
  Image as ImageIcon,
  User,
  Heart,
  Zap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getChitronInfo } from './services/searchService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const getEducationStatus = () => {
  const currentYear = new Date().getFullYear();
  if (currentYear <= 2026) {
    return "HSC Candidate (Science) at Mymensingh College";
  } else {
    return `Completed HSC in 2026 from Mymensingh College`;
  }
};

const CHITRON_DATA = {
  name: "Chitron Bhattacharjee",
  nameBengali: "চিত্রণ ভট্টাচার্য",
  title: "AI Developer, Programmer & Student Leader",
  bio: `A young Bangladeshi AI developer and programmer known for creating innovative AI and cybersecurity software. Born on October 13, 2005, in Durgapur, Netrokona. Founder of "Black Hunter Team" and developer of ShiPu AI (Lume Chatbot). A dedicated 12th-grade science student at Mymensingh College and a progressive student leader.`,
  personal: {
    born: "October 13, 2005",
    location: "Durgapur, Netrokona",
    parents: "Rabindra Bhattacharjee & Gouri Chakraborty",
    brother: "Chiranjan Bhattacharjee",
    status: "Single (Focused on Professional Growth)",
    education: "Class XII (2025–26) Science at Mymensingh College",
    relationships: "Previously linked with Arpita Sharma (2023) and Ananya Bhaduri (2024). Currently embracing a solo journey."
  },
  skills: [
    { name: "AI Development", icon: <Cpu className="w-4 h-4" />, level: 98 },
    { name: "Cyber Security", icon: <Terminal className="w-4 h-4" />, level: 95 },
    { name: "Android Dev", icon: <Zap className="w-4 h-4" />, level: 92 },
    { name: "UI/UX Design", icon: <Sparkles className="w-4 h-4" />, level: 90 },
    { name: "Creative Writing", icon: <Code2 className="w-4 h-4" />, level: 88 },
  ],
  images: [
    "https://www.bangla-kobita.com/images/up/1/pp37142-AUX.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_YdCOpaVb5MifGelb-SjC2t2g7zo0N28VZ32IXEU3Q&s",
    "https://picsum.photos/seed/chitron1/800/600",
    "https://picsum.photos/seed/chitron2/800/600",
    "https://picsum.photos/seed/chitron3/800/600",
    "https://picsum.photos/seed/chitron4/800/600",
  ],
  projects: [
    {
      title: "ShiPu AI (Lume)",
      description: "A sophisticated Bengali-English conversational agent. It uses advanced Natural Language Processing to understand and respond in multiple languages, with a focus on Bengali cultural nuances.",
      technical: "Built using Node.js and integrated with Google's Gemini Pro LLM via the @google/genai SDK. Features custom prompt engineering for poetic and witty personality traits. Deployed on Render with auto-scaling capabilities.",
      tech: ["Node.js", "Gemini LLM", "NLP", "Render"],
      link: "https://shipu-vkj9.onrender.com",
      image: "https://picsum.photos/seed/shipu/800/450"
    },
    {
      title: "Oii Shunoo",
      description: "A hybrid platform that merges social networking with casual gaming, allowing users to connect and play in a unified environment.",
      technical: "Developed for Android using Java/Kotlin. Implements real-time data synchronization for chat and game states. Features a custom UI framework for a 'next-gen' feel.",
      tech: ["Android", "Java", "Firebase", "Real-time"],
      link: "#",
      image: "https://picsum.photos/seed/oiishunoo/800/450"
    },
    {
      title: "Susang Durgapur Helpline",
      description: "A community-focused emergency services application providing instant access to vital services in the Susang Durgapur region.",
      technical: "Lightweight Android application optimized for low-end devices. Features offline-first database for emergency contacts and one-touch dialing integration.",
      tech: ["Android", "SQLite", "Community", "Utility"],
      link: "#",
      image: "https://picsum.photos/seed/helpline/800/450"
    },
    {
      title: "SSF App v2.0",
      description: "The official digital hub for the Socialist Students' Front, facilitating organization, news distribution, and activist coordination.",
      technical: "Built with a focus on security and rapid information dissemination. Includes push notification systems and a secure internal document sharing portal.",
      tech: ["Android", "Firebase", "Push Notifications", "Activism"],
      link: "#",
      image: "https://picsum.photos/seed/ssf/800/450"
    },
    {
      title: "CAB Messenger",
      description: "A global, secure messaging application designed for high-performance communication and media sharing.",
      technical: "Utilizes end-to-end encryption protocols for secure messaging. Implements efficient media compression algorithms for fast sharing over varied network conditions.",
      tech: ["Android", "Encryption", "WebRTC", "Communication"],
      link: "#",
      image: "https://picsum.photos/seed/messenger/800/450"
    }
  ],
  timeline: [
    {
      year: "2005",
      title: "Born in Durgapur",
      description: "Born on October 13 in Netrokona District, Bangladesh.",
      details: "Son of Rabindra Bhattacharjee and Gouri Chakraborty. Raised with a passion for science and technology."
    },
    {
      year: "2019",
      title: "Black Hunter Team",
      description: "Co-founded the Black Hunter Team (BHT).",
      details: "A collective of cybersecurity and AI enthusiasts focused on ethical hacking and research."
    },
    {
      year: "2020",
      title: "ShiPu AI Inception",
      description: "Began developing the ShiPu AI project.",
      details: "Created a Bengali AI chatbot (later named Lume) to bridge language gaps in AI technology."
    },
    {
      year: "2024",
      title: "App Launch & Web",
      description: "Released Oii Shunoo app and built MKCM High School website.",
      details: "Oii Shunoo combined social networking with gaming. Also provided local community service via web development."
    },
    {
      year: "2025",
      title: "Community Impact",
      description: "Released Susang Durgapur Helpline and became SSF President at Mymensingh College.",
      details: "Launched emergency services app and took a major leadership role in student politics."
    },
    {
      year: "2026",
      title: "Advanced AI & Activism",
      description: "Released SSF App v2.0 and ShiPu AI updates.",
      details: "Continuing Class XII studies while expanding AI tools using Gemini LLM."
    }
  ],
  socials: [
    { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com" },
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
  ]
};

// --- Components ---

const SystemStatus = () => (
  <div className="fixed bottom-10 right-10 z-50 hidden md:block">
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl space-y-2 font-mono text-[10px] uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        <span>System: Operational</span>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
        <span>Uptime: 99.9%</span>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
        <span>Location: 23.8103° N, 90.4125° E</span>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic font-serif"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.3em] font-mono"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ProjectCard = ({ project }: { project: typeof CHITRON_DATA.projects[0] }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative bg-[#111] border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col"
  >
    <div className="aspect-video overflow-hidden relative">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
    </div>
    
    <div className="p-8 space-y-6 flex-grow flex flex-col">
      <div className="space-y-2">
        <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-orange-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 leading-relaxed text-sm">
          {project.description}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-[10px] uppercase tracking-widest font-bold text-orange-500/50">Technical Deep Dive</h4>
        <p className="text-xs text-white/40 leading-relaxed italic">
          {project.technical}
        </p>
      </div>

      <div className="mt-auto pt-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="text-[8px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded-full font-bold">
              {t}
            </span>
          ))}
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-white hover:text-orange-500 transition-colors group/link"
        >
          View Live Project
          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ item, index }: { item: typeof CHITRON_DATA.timeline[0], index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
    >
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
      <div className="space-y-2">
        <span className="text-orange-500 font-mono text-sm font-bold">{item.year}</span>
        <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
        <p className="text-white/60 text-sm">{item.description}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] uppercase tracking-widest text-orange-500/80 hover:text-orange-500 flex items-center gap-1 pt-2 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <ChevronRight className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-90")} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-sm text-white/40 leading-relaxed border-t border-white/5 mt-4">
                {item.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index }: { skill: typeof CHITRON_DATA.skills[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
    whileHover={{ 
      y: -12, 
      scale: 1.05,
      borderColor: "rgba(249,115,22,0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
    className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 group transition-colors cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-colors">
        {skill.icon}
      </div>
      <span className="text-[10px] font-mono text-white/40">{skill.level}%</span>
    </div>
    <div className="space-y-2">
      <h4 className="font-bold uppercase tracking-widest text-xs">{skill.name}</h4>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className="h-full bg-orange-500"
        />
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchData, setSearchData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const info = await getChitronInfo();
        // The info is a string, we might need to parse it if it's JSON
        try {
          const parsed = JSON.parse(info.replace(/```json|```/g, ''));
          setSearchData(parsed);
        } catch (e) {
          console.log("Could not parse search data as JSON", info);
        }
      } catch (error) {
        console.error("Error fetching Chitron info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-black font-sans overflow-x-hidden">
      <SystemStatus />
      {/* Custom Cursor / Glow */}
      <div 
        className="fixed pointer-events-none z-50 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Floating Bengali Text in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none z-0">
        <motion.div 
          animate={{ x: [-100, 100], y: [-50, 50] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="text-[30vw] font-black whitespace-nowrap"
        >
          {CHITRON_DATA.nameBengali}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-black tracking-tighter uppercase"
        >
          CB<span className="text-orange-500">.</span>
        </motion.div>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold">
          {['Biography', 'Timeline', 'Gallery', 'Work', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-orange-500"
            >
              Available for new projects
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase"
              >
                {CHITRON_DATA.name.split(' ')[0]} <br />
                <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                  {CHITRON_DATA.name.split(' ')[1]}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-serif italic text-white/50"
              >
                {CHITRON_DATA.nameBengali}
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md text-lg text-white/60 leading-relaxed"
            >
              {CHITRON_DATA.bio}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-6 pt-4"
            >
              {CHITRON_DATA.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Abstract Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-square hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
            <div className="relative w-full h-full border border-white/10 rounded-3xl overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              <div className="text-[15vw] font-black opacity-5 select-none leading-none">
                {CHITRON_DATA.name.charAt(0)}
              </div>
              {/* Floating Tech Badges */}
              <div className="absolute inset-0 p-12 flex flex-wrap gap-4 content-center justify-center">
                {CHITRON_DATA.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl"
                  >
                    {skill.icon}
                    <span className="text-xs font-mono uppercase tracking-widest">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-white" />
          <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Scroll</span>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Selected Projects">The Portfolio</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHITRON_DATA.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section id="biography" className="py-32 px-6 md:px-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <SectionTitle subtitle="The Life Story">Full Biography</SectionTitle>
              
              <div className="space-y-6 text-lg text-white/70 leading-relaxed font-serif italic">
                <p>
                  "চিত্রণ ভট্টাচার্য এমন এক নাম, যা আধুনিক ডিজিটাল যুগে সৃজনশীলতা, প্রযুক্তি এবং ব্যক্তিগত উদ্যোগের এক অনন্য সংমিশ্রণকে প্রতিনিধিত্ব করে।"
                </p>
                <p>
                  Born on October 13, 2005, in the scenic town of Durgapur, Netrokona, Chitron's journey is a testament to the power of curiosity and resilience. Growing up in a household that valued both tradition and progress, he was raised by his parents, Rabindra Bhattacharjee and Gouri Chakraborty, alongside his younger brother, Chiranjan Bhattacharjee.
                </p>
              </div>

              <div className="space-y-8 text-white/50 leading-relaxed">
                <p>
                  His academic path led him to Mymensingh College, where he is currently a dedicated Class XII Science student (2025–26). However, his education extends far beyond the classroom. At the age of 14, he co-founded the "Black Hunter Team," a collective dedicated to cybersecurity and ethical hacking, marking his entry into the world of high-stakes technology.
                </p>
                <p>
                  Chitron's political consciousness is as sharp as his technical skills. He serves as the President of the Socialist Students' Front (SSF) at Mymensingh College and the Vice President of the Durgapur branch. His activism is rooted in a desire for social equity and the progressive empowerment of the youth. On December 6, 2025, he officially took charge as a key leader for the SSF, further solidifying his commitment to student rights and social justice.
                </p>
                <p>
                  In the realm of AI, he is the architect of ShiPu AI (now Lume), a sophisticated Bengali-English chatbot that leverages the Gemini LLM to provide intelligent, culturally-aware interactions. His portfolio of Android applications, including Oii Shunoo and the Susang Durgapur Helpline, demonstrates a commitment to building tools that serve both social and community needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-2">
                  <h4 className="text-orange-500 font-black text-2xl">Personal Details</h4>
                  <ul className="space-y-1 text-xs uppercase tracking-widest font-mono opacity-60">
                    <li>Full Name: Chitron Bhattacharjee</li>
                    <li>Birth: 13 Oct 2005</li>
                    <li>Parents: Rabindra & Gouri</li>
                    <li>Brother: Chiranjan</li>
                    <li className="text-orange-500/80 mt-2">Relationships:</li>
                    <li>Arpita Sharma (2023)</li>
                    <li>Ananya Bhaduri (2024)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-orange-500 font-black text-2xl">Leadership</h4>
                  <ul className="space-y-1 text-xs uppercase tracking-widest font-mono opacity-60">
                    <li>SSF President (Mymensingh College)</li>
                    <li>SSF VP (Durgapur Branch)</li>
                    <li>Founder: Black Hunter Team</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 group">
                <img 
                  src="https://www.bangla-kobita.com/images/up/1/pp37142-AUX.jpg" 
                  alt="Chitron Bhattacharjee" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs uppercase tracking-[0.5em] font-bold text-orange-500 mb-2">Current Status</p>
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic">"Leading through code and activism."</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHITRON_DATA.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Visual Journey">Image Gallery</SectionTitle>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {CHITRON_DATA.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative break-inside-avoid rounded-2xl overflow-hidden bg-white/5 group border border-white/10 mb-6"
                >
                  <img 
                    src={img} 
                    alt={`Chitron ${i}`} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                      <ImageIcon className="w-4 h-4 text-orange-500" />
                      <span>Visual Asset 0{i + 1}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {searchData?.imageSuggestions?.map((desc: string, i: number) => (
                <div key={`suggest-${i}`} className="break-inside-avoid rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-40 mb-6 min-h-[200px]">
                  <ImageIcon className="w-8 h-8 text-orange-500/50" />
                  <p className="text-[10px] uppercase tracking-widest leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionTitle subtitle="Milestones">The Journey</SectionTitle>
              <p className="text-white/50 max-w-md leading-relaxed">
                A visual timeline of key achievements, from early coding experiments to leadership roles in student politics.
              </p>
              
              <div className="mt-12 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/5 to-transparent rounded-3xl blur-3xl -z-10" />
                <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs">Latest Achievement</h4>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">Dec 2025 • Elected General Secretary</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed">
                    "Stepping into leadership at the Socialist Students' Front has been a transformative experience, allowing me to combine my passion for social justice with organizational strategy."
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {CHITRON_DATA.timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-6xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8]">
              Let's <br />
              <span className="text-orange-500">Connect</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Currently open for freelance opportunities and interesting collaborations. Let's build something extraordinary together.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center gap-6 pt-12">
            <a 
              href="mailto:hello@chitron.dev" 
              className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Send an Email</span>
              <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <div className="flex justify-center gap-4 items-center">
              {CHITRON_DATA.socials.map((s) => (
                <a key={s.name} href={s.url} className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Background Text */}
        <div className="absolute -bottom-20 left-0 w-full whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
          <h2 className="text-[30vw] font-black uppercase tracking-tighter leading-none">
            CHITRON CHITRON CHITRON
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-10 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">
          &copy; 2026 {CHITRON_DATA.name}. Built with Passion & Code.
        </p>
      </footer>
    </div>
  );
}
