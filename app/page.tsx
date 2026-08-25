'use client';

import React, {
  useEffect, useRef, useState, useContext, createContext,
} from 'react';

// ─────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext(true); // true = dark
function useTheme() { return useContext(ThemeCtx); }

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────
function IconSun({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  );
}

function IconMoon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function IconGitHub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function IconMail({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-10 7L2 7"/>
    </svg>
  );
}

function IconBook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}

function IconHF({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="10" r="7"/>
      <circle cx="9.5"  cy="9" r="1.1" fill="currentColor" stroke="none"/>
      <circle cx="14.5" cy="9" r="1.1" fill="currentColor" stroke="none"/>
      <path d="M8.5 13.5 Q12 16.5 15.5 13.5"/>
      <path d="M5 19.5 Q8.5 17 12 19.5 Q15.5 17 19 19.5"/>
    </svg>
  );
}

function IconExternalLink({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const NAV_ITEMS = ['Home','Projects','Skills','Blog','Contact'];

interface Project {
  title: string; description: string; tags: string[];
  accentColor: string; github?: string; link?: string;
  status: 'live'|'active'|'research'|'coming-soon';
}

const PROJECTS: Project[] = [
  {
    title: 'Kroniqo',
    description: 'AI agent that "ages" via a SQLite Consequence Graph with recency decay (e^−0.03×days). Multi-backend LLM routing across 7 providers, proactive outreach, sub-agent system, and a FastAPI analytics dashboard with Chart.js.',
    tags: ['Python','FastAPI','SQLite','Groq','Telegram'],
    accentColor: '#00D4A8',
    github: 'https://github.com/Jeff9497/Kroniq09',
    status: 'active',
  },
  {
    title: 'CircuitLens',
    description: "Full-stack mechanistic interpretability platform on TransformerLens + FastAPI + Next.js. Key findings: L11·H31 confirmed as Llama-3.2-1B's IOI name-mover head; parametric memory collapses from 98% → 1.6% under adversarial repetition.",
    tags: ['TransformerLens','FastAPI','Next.js','PyTorch'],
    accentColor: '#7C3AED',
    github: 'https://github.com/Jeff9497/Circuit6',
    status: 'research',
  },
  {
    title: 'Gattai',
    description: 'Unified AI orchestration layer — combining specialised agents for seamless multi-task execution across complex, multi-step workflows. Designed for scenarios where single agents fall short.',
    tags: ['Python','Multi-Agent','Orchestration'],
    accentColor: '#06B6D4',
    github: 'https://github.com/Jeff9497/Gattai-LM',
    status: 'active',
  },
  {
    title: 'Dev Blog',
    description: 'Research blog documenting mechanistic interpretability findings — 4 published posts. Built with Next.js 15, MDX, KaTeX for math rendering, and rehype-pretty-code for syntax.',
    tags: ['Next.js 15','MDX','TailwindCSS','KaTeX'],
    accentColor: '#3B82F6',
    link: 'https://blog.geofreynjoroge.com',
    github: 'https://github.com/Jeff9497/Blog',
    status: 'live',
  },
];

interface Skill { name: string; level: number }

const FRAMEWORK_SKILLS: Skill[] = [
  { name: 'FastAPI',           level: 90 },
  { name: 'Next.js / React',   level: 85 },
  { name: 'TransformerLens',   level: 82 },
  { name: 'PyTorch',           level: 78 },
  { name: 'TailwindCSS',       level: 88 },
  { name: 'SQLite / PostgreSQL', level: 80 },
];

const LANGUAGE_SKILLS: Skill[] = [
  { name: 'Python',                  level: 95 },
  { name: 'JavaScript / TypeScript', level: 82 },
  { name: 'MQL5',                    level: 78 },
  { name: 'SQL',                     level: 84 },
  { name: 'Bash / Shell',            level: 85 },
  { name: 'C++',                     level: 81 },
];

const TOOLS = [
  'Git','GitHub','Groq API','Ollama','llama.cpp','Cloudflare',
  'Vercel','Google Colab','Tailscale','Telegram Bot API',
  'Discord Webhooks','Supabase','Docker','Jupyter',
];

interface BlogPost { title: string; tags: string[]; excerpt: string }

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'IOI Name-Mover Head in Llama-3.2-1B: L11·H31',
    tags: ['Mechanistic Interp','Llama','IOI'],
    excerpt: 'Confirming L11·H31 as the IOI name-mover head through 8 experiments including cross-lingual tests with Kikuyu and Swahili names.',
  },
  {
    title: 'Parametric Memory Collapse Under Adversarial Repetition',
    tags: ['Memory','Adversarial','Attention'],
    excerpt: 'LLM confidence drops from 98% to 1.6% under adversarial repetition — revealing the boundary between parametric and in-context knowledge.',
  },
  {
    title: 'OPT-1.3b Stores France→Paris in a Single Head (L21·H0)',
    tags: ['OPT','Factual Recall','Knowledge'],
    excerpt: 'A single dominant attention head encodes the France→Paris factual association — concentrated versus distributed knowledge across model families.',
  },
  {
    title: 'Jailbreak Token-Copying in Transformer Models',
    tags: ['Safety','Jailbreak','Circuits'],
    excerpt: 'Documenting how jailbreak attempts create token-copying circuits that bypass normal safety mechanisms in auto-regressive transformer models.',
  },
];

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSkillAnimation(ref: React.RefObject<HTMLElement | null>) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return go;
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
function Navbar({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      transition:'background .35s,border-color .35s',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-s)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'1.1rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration:'none', fontSize:'1.15rem', fontWeight:800, letterSpacing:'.06em', color:'var(--text)' }}>
          <span style={{ color:'#00D4A8' }}>G</span>N<span style={{ color:'#00D4A8' }}>K</span>
        </a>

        {/* Desktop */}
        <div className="desktop-nav" style={{ display:'flex', gap:'2.25rem', alignItems:'center' }}>
          {NAV_ITEMS.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
          ))}
          <a href="https://blog.geofreynjoroge.com" target="_blank" rel="noopener noreferrer"
            style={{ padding:'.45rem 1.2rem', background:'linear-gradient(135deg,#00D4A8,#7C3AED)', border:'none', borderRadius:6, color:'white', textDecoration:'none', fontSize:'.85rem', fontWeight:600, transition:'opacity .2s,transform .15s' }}
            onMouseEnter={e=>{ e.currentTarget.style.opacity='.82'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}>
            Blog
          </a>
          <a href="https://portfolio.geofreynjoroge.com" target="_blank" rel="noopener noreferrer"
            style={{ padding:'.45rem 1.2rem', background:'linear-gradient(135deg,#7C3AED,#00D4A8)', border:'none', borderRadius:6, color:'white', textDecoration:'none', fontSize:'.85rem', fontWeight:600, transition:'opacity .2s,transform .15s' }}
            onMouseEnter={e=>{ e.currentTarget.style.opacity='.82'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(0)'; }}>
            Portfolio
          </a>
          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            style={{ background:'var(--pill)', border:'1px solid var(--border)', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--muted)', transition:'background .2s,color .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='var(--text)'; e.currentTarget.style.background='var(--pill-bd)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='var(--pill)'; }}>
            {isDark ? <IconSun size={16}/> : <IconMoon size={16}/>}
          </button>
        </div>

        {/* Hamburger */}
        <div style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
          <button onClick={toggle} aria-label="Toggle theme" className="hamburger"
            style={{ background:'var(--pill)', border:'1px solid var(--border)', borderRadius:8, width:34, height:34, display:'none', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--muted)' }}>
            {isDark ? <IconSun size={15}/> : <IconMoon size={15}/>}
          </button>
          <button onClick={()=>setOpen(!open)} aria-label="Toggle menu" className="hamburger"
            style={{ background:'none', border:'none', cursor:'pointer', padding:'.4rem', display:'none', flexDirection:'column', gap:5 }}>
            {[0,1,2].map(i=>(
              <span key={i} style={{ display:'block', width:22, height:2, background:'#00D4A8', borderRadius:2, transition:'all .2s',
                opacity: open&&i===1?0:1,
                transform: open&&i===0?'rotate(45deg) translate(5px,5px)':open&&i===2?'rotate(-45deg) translate(5px,-5px)':'none'
              }}/>
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu" style={{ background:'var(--nav-bg)', padding:'1.5rem 2rem 2.5rem', display:'flex', flexDirection:'column', gap:'1.75rem', borderTop:'1px solid var(--border-s)' }}>
          {NAV_ITEMS.map(item=>(
            <a key={item} href={`#${item.toLowerCase()}`} onClick={()=>setOpen(false)}
              style={{ color:'var(--text)', textDecoration:'none', fontSize:'1.1rem' }}>{item}</a>
          ))}
          <a href="https://blog.geofreynjoroge.com"
            style={{ textDecoration:'none', fontSize:'1.1rem', fontWeight:600, background:'linear-gradient(135deg,#00D4A8,#7C3AED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Blog</a>
          <a href="https://portfolio.geofreynjoroge.com"
            style={{ textDecoration:'none', fontSize:'1.1rem', fontWeight:600, background:'linear-gradient(135deg,#7C3AED,#00D4A8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Portfolio</a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────
function Hero() {
  const isDark = useTheme();
  return (
    <section id="home" style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'center', padding:'7rem 2rem 5rem' }}>
      {/* Orbs */}
      {[
        { top:'15%', right:'8%',  w:'clamp(240px,38vw,540px)', h:'clamp(240px,38vw,540px)', bg:'rgba(124,58,237,0.38)', anim:'float1 13s ease-in-out infinite' },
        { bottom:'12%', right:'28%', w:'clamp(180px,28vw,380px)', h:'clamp(180px,28vw,380px)', bg:'rgba(0,212,168,0.18)',  anim:'float2 17s ease-in-out infinite' },
        { top:'42%', left:'-4%', w:'clamp(160px,22vw,320px)', h:'clamp(160px,22vw,320px)', bg:'rgba(79,70,229,0.22)',  anim:'float3 11s ease-in-out infinite' },
      ].map((o,i)=>(
        <div key={i} aria-hidden="true" style={{ position:'absolute', ...o as React.CSSProperties, background:`radial-gradient(circle,${o.bg} 0%,transparent 68%)`, borderRadius:'50%', animation:o.anim, pointerEvents:'none' }}/>
      ))}

      <div style={{ maxWidth:1280, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
        {/* Name block */}
        <div style={{ marginBottom:'2.25rem' }}>
          <p style={{ color:'var(--dim)', fontSize:'clamp(.75rem,1.5vw,1rem)', letterSpacing:'.35em', textTransform:'uppercase', fontWeight:300, marginBottom:'.3rem', animation:'heroSlide .8s ease both' }}>
            Geofrey
          </p>

          {/* NJOROGE */}
          <div style={{ position:'relative', display:'inline-block', lineHeight:.88 }}>
            <h1 style={{ fontSize:'clamp(3.6rem,14vw,11.5rem)', fontWeight:900, letterSpacing:'-.03em', color:'var(--text)', textTransform:'uppercase', position:'relative', zIndex:2, animation:'heroSlide .8s ease .1s both', userSelect:'none' }}>
              NJOROGE
            </h1>
            <div aria-hidden="true" style={{
              position:'absolute', top:'50%', left:'48%',
              transform:'translate(-50%,-50%)',
              width:'55%', height:'220%',
              background:'radial-gradient(ellipse,rgba(139,92,246,.8) 0%,rgba(79,70,229,.55) 35%,transparent 68%)',
              borderRadius:'50%',
              zIndex: isDark ? 3 : 0,
              mixBlendMode: isDark ? 'screen' : 'multiply',
              opacity: isDark ? 1 : 0.25,
              animation:'pulsOrb 5s ease-in-out infinite',
              pointerEvents:'none',
            }}/>
          </div>

          <p style={{ color:'var(--muted)', fontSize:'clamp(1.4rem,4vw,2.75rem)', fontWeight:300, letterSpacing:'.08em', textAlign:'right', marginTop:'.4rem', animation:'heroSlide .8s ease .2s both' }}>
            KAMAU<span style={{ color:'#00D4A8', fontWeight:700 }}>.</span>
          </p>
        </div>

        {/* Tagline */}
        <p style={{ color:'var(--muted)', fontSize:'clamp(.85rem,1.4vw,1rem)', lineHeight:1.8, maxWidth:520, marginBottom:'2.5rem', animation:'heroSlide .8s ease .3s both' }}>
          Computer Scientist from{' '}
          <span style={{ color:'#00D4A8', fontWeight:500 }}>Nairobi, Kenya</span>.
          {' '}I design and build systems from the ground up — research platforms,
          AI agents with long-term memory, full-stack web applications, and distributed
          infrastructure. Clean code, real deployments.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'.85rem', flexWrap:'wrap', marginBottom:'4.5rem', animation:'heroSlide .8s ease .4s both' }}>
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="https://blog.geofreynjoroge.com" className="btn-outline">Read Blog</a>
          <a href="https://github.com/Jeff9497" target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub</a>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', gap:'clamp(2rem,5vw,5rem)', flexWrap:'wrap', paddingTop:'2rem', borderTop:'1px solid var(--border)', animation:'heroSlide .8s ease .5s both' }}>
          {[{ v:'10+', label:'Projects Built', accent:false }, { v:'4', label:'Research Posts', accent:true }, { v:'2025', label:'CS Graduate', accent:false }].map(({ v, label, accent })=>(
            <div key={label}>
              <p style={{ fontSize:'clamp(1.5rem,3.5vw,2.5rem)', fontWeight:800, color: accent ? '#00D4A8' : 'var(--text)', lineHeight:1, marginBottom:'.3rem' }}>{v}</p>
              <p style={{ color:'var(--dim)', fontSize:'.73rem', letterSpacing:'.06em', textTransform:'uppercase' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Project['status'] }) {
  const map: Record<Project['status'],{ cls:string; label:string }> = {
    live:          { cls:'badge-live',     label:'● Live' },
    active:        { cls:'badge-active',   label:'● Active' },
    research:      { cls:'badge-research', label:'● Research' },
    'coming-soon': { cls:'badge-soon',     label:'Soon' },
  };
  const { cls, label } = map[status];
  return <span className={cls} style={{ padding:'.22rem .65rem', borderRadius:100, fontSize:'.7rem', fontWeight:600 }}>{label}</span>;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="project-card scroll-reveal"
      style={{ display:'flex', flexDirection:'column' }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${p.accentColor}35`; e.currentTarget.style.boxShadow=`0 24px 48px rgba(0,0,0,.35),0 0 0 1px ${p.accentColor}18`; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none'; }}>
      <div style={{ height:4, background:`linear-gradient(90deg,${p.accentColor},${p.accentColor}60)` }}/>
      <div style={{ padding:'1.6rem', flex:1, display:'flex', flexDirection:'column', gap:'.9rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'var(--text)', letterSpacing:'-.01em' }}>{p.title}</h3>
          <StatusBadge status={p.status}/>
        </div>
        <p style={{ color:'var(--muted)', fontSize:'.85rem', lineHeight:1.7, flex:1 }}>{p.description}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
          {p.tags.map(t=><span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ display:'flex', gap:'1rem', paddingTop:'.25rem', alignItems:'center' }}>
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:'.8rem', color:'var(--dim)', textDecoration:'none', display:'flex', alignItems:'center', gap:'.4rem', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--dim)'}>
              <IconGitHub size={14}/> GitHub
            </a>
          )}
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:'.8rem', color:p.accentColor, textDecoration:'none', display:'flex', alignItems:'center', gap:'.4rem', transition:'opacity .2s' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='.7'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <IconExternalLink size={13}/> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:'clamp(5rem,10vw,8rem) 2rem', maxWidth:1280, margin:'0 auto' }}>
      <div className="scroll-reveal" style={{ marginBottom:'3.5rem' }}>
        <p style={{ color:'#00D4A8', fontSize:'.8rem', letterSpacing:'.2em', textTransform:'uppercase', fontWeight:600, marginBottom:'.75rem' }}>Work</p>
        <h2 style={{ fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:800, color:'var(--text)' }}>My Portfolio</h2>
        <p style={{ color:'var(--muted)', marginTop:'.75rem', maxWidth:480, lineHeight:1.7, fontSize:'.9rem' }}>
          Research tools and AI agents — built to actually run in the real world.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,340px),1fr))', gap:'1.35rem' }}>
        {PROJECTS.map(p=><ProjectCard key={p.title} p={p}/>)}
      </div>
      <div className="scroll-reveal" style={{ marginTop:'3rem', textAlign:'center' }}>
        <a href="https://portfolio.geofreynjoroge.com" target="_blank" rel="noopener noreferrer"
          style={{ color:'var(--dim)', fontSize:'.85rem', textDecoration:'none', borderBottom:'1px solid var(--border)', paddingBottom:2, transition:'color .2s,border-color .2s' }}
          onMouseEnter={e=>{ e.currentTarget.style.color='#00D4A8'; e.currentTarget.style.borderColor='#00D4A8'; }}
          onMouseLeave={e=>{ e.currentTarget.style.color='var(--dim)'; e.currentTarget.style.borderColor='var(--border)'; }}>
          View full portfolio archive
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────
function SkillBar({ skill, go }: { skill: Skill; go: boolean }) {
  return (
    <div style={{ marginBottom:'1.35rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.5rem' }}>
        <span style={{ fontSize:'.88rem', color:'var(--text)' }}>{skill.name}</span>
        <span style={{ fontSize:'.8rem', color:'#00D4A8', fontWeight:600 }}>{skill.level}%</span>
      </div>
      <div style={{ height:3, background:'var(--track)', borderRadius:3, overflow:'hidden' }}>
        <div className={`skill-fill ${go?'go':''}`} style={{ '--w':`${skill.level}%` } as React.CSSProperties}/>
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const go = useSkillAnimation(ref);
  return (
    <section id="skills" ref={ref} style={{ padding:'clamp(5rem,10vw,8rem) 2rem', background:'var(--bg-alt)', borderTop:'1px solid var(--border-s)', borderBottom:'1px solid var(--border-s)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div className="scroll-reveal" style={{ marginBottom:'3.5rem' }}>
          <p style={{ color:'#7C3AED', fontSize:'.8rem', letterSpacing:'.2em', textTransform:'uppercase', fontWeight:600, marginBottom:'.75rem' }}>Capabilities</p>
          <h2 style={{ fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:800, color:'var(--text)' }}>Languages &amp; Tools</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'3rem 5rem', marginBottom:'3.5rem' }}>
          <div className="scroll-reveal">
            <p style={{ color:'#00D4A8', fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', fontWeight:700, marginBottom:'1.75rem' }}>Frameworks &amp; Libraries</p>
            {FRAMEWORK_SKILLS.map(s=><SkillBar key={s.name} skill={s} go={go}/>)}
          </div>
          <div className="scroll-reveal">
            <p style={{ color:'#7C3AED', fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', fontWeight:700, marginBottom:'1.75rem' }}>Languages</p>
            {LANGUAGE_SKILLS.map(s=><SkillBar key={s.name} skill={s} go={go}/>)}
          </div>
        </div>
        <div className="scroll-reveal">
          <p style={{ color:'var(--dim)', fontSize:'.72rem', letterSpacing:'.18em', textTransform:'uppercase', fontWeight:600, marginBottom:'1.25rem' }}>Tools &amp; Platforms</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem' }}>
            {TOOLS.map(t=><span key={t} className="tool-pill">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────────────────────
function BlogSection() {
  return (
    <section id="blog" style={{ padding:'clamp(5rem,10vw,8rem) 2rem', maxWidth:1280, margin:'0 auto' }}>
      <div className="scroll-reveal" style={{ marginBottom:'3.5rem', display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <p style={{ color:'#00D4A8', fontSize:'.8rem', letterSpacing:'.2em', textTransform:'uppercase', fontWeight:600, marginBottom:'.75rem' }}>Writing</p>
          <h2 style={{ fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:800, color:'var(--text)' }}>Research Posts</h2>
          <p style={{ color:'var(--muted)', marginTop:'.75rem', maxWidth:440, lineHeight:1.7, fontSize:'.9rem' }}>
            Mechanistic interpretability findings — circuits, memory, and what transformers actually know.
          </p>
        </div>
        <a href="https://blog.geofreynjoroge.com" target="_blank" rel="noopener noreferrer"
          style={{ color:'#00D4A8', fontSize:'.875rem', textDecoration:'none', fontWeight:500, whiteSpace:'nowrap', transition:'opacity .2s' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.7'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
          All posts
        </a>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'1.25rem' }}>
        {BLOG_POSTS.map((post,i)=>(
          <a key={i} href="https://blog.geofreynjoroge.com" target="_blank" rel="noopener noreferrer" className="blog-card scroll-reveal">
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.35rem', marginBottom:'.85rem' }}>
              {post.tags.map(t=>(
                <span key={t} className="tag" style={{ color:'#00D4A8', borderColor:'rgba(0,212,168,.2)', background:'rgba(0,212,168,.06)' }}>{t}</span>
              ))}
            </div>
            <h3 style={{ fontSize:'.95rem', fontWeight:700, color:'var(--text)', lineHeight:1.45, marginBottom:'.75rem' }}>{post.title}</h3>
            <p style={{ fontSize:'.82rem', color:'var(--muted)', lineHeight:1.7 }}>{post.excerpt}</p>
            <p style={{ fontSize:'.78rem', color:'#00D4A8', marginTop:'1rem', fontWeight:500, display:'flex', alignItems:'center', gap:'.35rem' }}>
              <IconBook size={13}/> Read post
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
interface ContactLink { label:string; href:string; color:string; borderColor:string; icon:React.ReactNode }

function ContactCard({ link }: { link: ContactLink }) {
  return (
    <a href={link.href}
      target={link.href.startsWith('mailto')?undefined:'_blank'}
      rel={link.href.startsWith('mailto')?undefined:'noopener noreferrer'}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.75rem', padding:'1.75rem 2rem', borderRadius:12, border:`1px solid ${link.borderColor}`, color:link.color, textDecoration:'none', transition:'background .2s,transform .2s,border-color .2s', minWidth:120, flex:'1 1 120px', maxWidth:160 }}
      onMouseEnter={e=>{ e.currentTarget.style.background=`${link.color}0d`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=link.color; }}
      onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor=link.borderColor; }}>
      <span style={{ opacity:.9 }}>{link.icon}</span>
      <span style={{ fontSize:'.82rem', fontWeight:600, letterSpacing:'.02em' }}>{link.label}</span>
    </a>
  );
}

function Contact() {
  const links: ContactLink[] = [
    { label:'GitHub',      href:'https://github.com/Jeff9497',          color:'var(--text)', borderColor:'var(--border)', icon:<IconGitHub size={26}/> },
    { label:'HuggingFace', href:'https://huggingface.co/Jeff28',        color:'#FF9D00',     borderColor:'rgba(255,157,0,.2)', icon:<IconHF size={26}/> },
    { label:'Email',       href:'mailto:kamau@geofreynjoroge.com',      color:'#00D4A8',     borderColor:'rgba(0,212,168,.2)', icon:<IconMail size={26}/> },
    { label:'Dev Blog',    href:'https://blog.geofreynjoroge.com',      color:'#A855F7',     borderColor:'rgba(168,85,247,.2)', icon:<IconBook size={26}/> },
  ];
  return (
    <section id="contact" style={{ padding:'clamp(5rem,10vw,8rem) 2rem', background:'var(--bg-alt)', borderTop:'1px solid var(--border-s)' }}>
      <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
        <div className="scroll-reveal">
          <p style={{ color:'#00D4A8', fontSize:'.8rem', letterSpacing:'.2em', textTransform:'uppercase', fontWeight:600, marginBottom:'.75rem' }}>Get in touch</p>
          <h2 style={{ fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:800, marginBottom:'1.25rem', color:'var(--text)' }}>
            Let&apos;s Connect
          </h2>
          <p style={{ color:'var(--muted)', lineHeight:1.8, fontSize:'.95rem', marginBottom:'2.5rem' }}>
            Open to engineering roles, research collaborations, and interesting problems
            worth building solutions for — and always collaborating.
          </p>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', padding:'.4rem 1.1rem', border:'1px solid var(--border)', borderRadius:100, color:'var(--dim)', fontSize:'.8rem', marginBottom:'2.75rem', letterSpacing:'.03em' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="rgba(0,212,168,0.7)"/></svg>
            Nairobi, Kenya — EAT (UTC+3)
          </div>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            {links.map(link=><ContactCard key={link.label} link={link}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks = [
    { label:'GitHub',      href:'https://github.com/Jeff9497' },
    { label:'Blog',        href:'https://blog.geofreynjoroge.com' },
    { label:'Portfolio',   href:'https://portfolio.geofreynjoroge.com' },
    { label:'HuggingFace', href:'https://huggingface.co/Jeff28' },
  ];
  return (
    <footer style={{ padding:'2.5rem 2rem', borderTop:'1px solid var(--border-s)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
        <p style={{ color:'var(--dim)', fontSize:'.8rem' }}>
          © {new Date().getFullYear()} Geofrey Njoroge Kamau — Nairobi, Kenya
        </p>
        <div style={{ display:'flex', gap:'2rem' }}>
          {footerLinks.map(({ label, href })=>(
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color:'var(--dim)', fontSize:'.8rem', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#00D4A8'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--dim)'}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [isDark, setIsDark] = useState(true);
  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark(d => !d);

  return (
    <ThemeCtx.Provider value={isDark}>
      <Navbar isDark={isDark} toggle={toggle}/>
      <main>
        <Hero/>
        <hr className="divider"/>
        <Projects/>
        <Skills/>
        <BlogSection/>
        <Contact/>
      </main>
      <Footer/>
    </ThemeCtx.Provider>
  );
}
