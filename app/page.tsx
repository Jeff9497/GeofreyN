'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const NAV_ITEMS = ['Home', 'Projects', 'Skills', 'Blog', 'Contact'];

interface Project {
  title: string;
  emoji: string;
  description: string;
  tags: string[];
  accentColor: string;
  github?: string;
  link?: string;
  status: 'live' | 'active' | 'research' | 'coming-soon';
}

const PROJECTS: Project[] = [
  {
    title: 'Kroniqo',
    emoji: '🧠',
    description:
      'AI agent that "ages" via a SQLite Consequence Graph with recency decay (e^−0.03×days). Multi-backend LLM routing across 7 providers, proactive outreach, sub-agent system, and a FastAPI analytics dashboard with Chart.js.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Groq', 'Telegram'],
    accentColor: '#00D4A8',
    github: 'https://github.com/Jeff9497/Kroniq09',
    status: 'active',
  },
  {
    title: 'CircuitLens',
    emoji: '🔬',
    description:
      'Full-stack mechanistic interpretability platform on TransformerLens + FastAPI + Next.js. Key findings: L11·H31 confirmed as Llama-3.2-1B\'s IOI name-mover head; parametric memory collapses from 98% → 1.6% under adversarial repetition.',
    tags: ['TransformerLens', 'FastAPI', 'Next.js', 'PyTorch'],
    accentColor: '#7C3AED',
    github: 'https://github.com/Jeff9497/Circuit6',
    status: 'research',
  },
  {
    title: 'Dev Blog',
    emoji: '✍️',
    description:
      'Research blog documenting mechanistic interpretability findings — 4 published posts. Built with Next.js 15, MDX, KaTeX for math rendering, and rehype-pretty-code for syntax. Tagging @NeelNanda5 for research reach.',
    tags: ['Next.js 15', 'MDX', 'TailwindCSS', 'KaTeX'],
    accentColor: '#3B82F6',
    link: 'https://blog.geofreynjoroge.com',
    github: 'https://github.com/Jeff9497/Blog',
    status: 'live',
  },
  {
    title: 'Gattai',
    emoji: '⚡',
    description:
      'Unified AI orchestration layer — combining specialised agents for seamless multi-task execution across complex, multi-step workflows. Designed for scenarios where single agents fall short.',
    tags: ['Python', 'Multi-Agent', 'Orchestration'],
    accentColor: '#06B6D4',
    status: 'coming-soon',
  },
];

interface Skill { name: string; level: number }

const FRAMEWORK_SKILLS: Skill[] = [
  { name: 'FastAPI', level: 90 },
  { name: 'Next.js / React', level: 85 },
  { name: 'TransformerLens', level: 82 },
  { name: 'PyTorch', level: 78 },
  { name: 'TailwindCSS', level: 88 },
  { name: 'SQLite / PostgreSQL', level: 80 },
];

const LANGUAGE_SKILLS: Skill[] = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript / TypeScript', level: 82 },
  { name: 'MQL5', level: 78 },
  { name: 'SQL', level: 75 },
  { name: 'Bash / Shell', level: 72 },
  { name: 'C++', level: 65 },
];

const TOOLS = [
  'Git', 'GitHub', 'Groq API', 'Ollama', 'llama.cpp', 'Cloudflare',
  'Vercel', 'Google Colab', 'Tailscale', 'Telegram Bot API',
  'Discord Webhooks', 'Supabase', 'Docker', 'Jupyter', 'MT5 / Deriv',
];

interface BlogPost { title: string; tags: string[]; excerpt: string }

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'IOI Name-Mover Head in Llama-3.2-1B: L11·H31',
    tags: ['Mechanistic Interp', 'Llama', 'IOI'],
    excerpt:
      'Confirming L11·H31 as the IOI name-mover head through 8 experiments including cross-lingual tests with Kikuyu (Kamau/Wanjiru) and Swahili (Amani/Baraka) names.',
  },
  {
    title: 'Parametric Memory Collapse Under Adversarial Repetition',
    tags: ['Memory', 'Adversarial', 'Attention'],
    excerpt:
      'LLM confidence drops from 98% to 1.6% under adversarial repetition — and what this reveals about parametric vs in-context knowledge retrieval.',
  },
  {
    title: 'OPT-1.3b Stores France→Paris in a Single Head (L21·H0)',
    tags: ['OPT', 'Factual Recall', 'Knowledge'],
    excerpt:
      'A single dominant attention head encodes the France→Paris factual association — revealing concentrated versus distributed knowledge across model families.',
  },
  {
    title: 'Jailbreak Token-Copying in Transformer Models',
    tags: ['Safety', 'Jailbreak', 'Circuits'],
    excerpt:
      'Documenting how jailbreak attempts create token-copying circuits that bypass normal safety mechanisms in auto-regressive transformer models.',
  },
];

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.scroll-reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useSkillAnimation(ref: React.RefObject<HTMLElement | null>) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setGo(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return go;
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.35s ease, border-color 0.35s ease',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1.1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            fontSize: '1.15rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: 'white',
          }}
        >
          <span style={{ color: '#00D4A8' }}>G</span>N
          <span style={{ color: '#00D4A8', fontSize: '1.3rem' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2.25rem', alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
          <a
            href="https://blog.geofreynjoroge.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 1.2rem',
              border: '1px solid rgba(0,212,168,0.4)',
              borderRadius: '6px',
              color: '#00D4A8',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00D4A8';
              e.currentTarget.style.color = '#080808';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#00D4A8';
            }}
          >
            Blog ↗
          </a>
          <a
            href="https://portfolio.geofreynjoroge.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.45rem 1.2rem',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: '6px',
              color: '#A855F7',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#7C3AED';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#A855F7';
            }}
          >
            Portfolio ↗
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#00D4A8',
                borderRadius: '2px',
                transition: 'all 0.2s',
                opacity: open && i === 1 ? 0 : 1,
                transform:
                  open && i === 0
                    ? 'rotate(45deg) translate(5px,5px)'
                    : open && i === 2
                    ? 'rotate(-45deg) translate(5px,-5px)'
                    : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            background: 'rgba(8,8,8,0.98)',
            padding: '1.5rem 2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '1.1rem' }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://blog.geofreynjoroge.com"
            style={{ color: '#00D4A8', textDecoration: 'none', fontSize: '1.1rem' }}
          >
            Blog ↗
          </a>
          <a
            href="https://portfolio.geofreynjoroge.com"
            style={{ color: '#A855F7', textDecoration: 'none', fontSize: '1.1rem' }}
          >
            Portfolio ↗
          </a>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '7rem 2rem 5rem',
      }}
    >
      {/* Gradient orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: 'clamp(240px, 38vw, 540px)',
          height: 'clamp(240px, 38vw, 540px)',
          background: 'radial-gradient(circle, rgba(124,58,237,0.38) 0%, transparent 68%)',
          borderRadius: '50%',
          animation: 'float1 13s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '28%',
          width: 'clamp(180px, 28vw, 380px)',
          height: 'clamp(180px, 28vw, 380px)',
          background: 'radial-gradient(circle, rgba(0,212,168,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float2 17s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '42%',
          left: '-4%',
          width: 'clamp(160px, 22vw, 320px)',
          height: 'clamp(160px, 22vw, 320px)',
          background: 'radial-gradient(circle, rgba(79,70,229,0.22) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float3 11s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* ── Name block ── */}
        <div style={{ marginBottom: '2.25rem' }}>
          {/* "Geofrey" — eyebrow label */}
          <p
            style={{
              color: 'rgba(255,255,255,0.38)',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 300,
              marginBottom: '0.3rem',
              animation: 'heroSlide 0.8s ease both',
            }}
          >
            Geofrey
          </p>

          {/* "NJOROGE" — creative hero text */}
          <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0.88 }}>
            <h1
              style={{
                fontSize: 'clamp(3.6rem, 14vw, 11.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: 'white',
                textTransform: 'uppercase',
                position: 'relative',
                zIndex: 2,
                animation: 'heroSlide 0.8s ease 0.1s both',
                userSelect: 'none',
              }}
            >
              NJOROGE
            </h1>
            {/* Purple orb bleeding through via mix-blend-mode: screen */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '48%',
                transform: 'translate(-50%, -50%)',
                width: '55%',
                height: '220%',
                background:
                  'radial-gradient(ellipse, rgba(139,92,246,0.8) 0%, rgba(79,70,229,0.55) 35%, transparent 68%)',
                borderRadius: '50%',
                zIndex: 3,
                mixBlendMode: 'screen',
                animation: 'pulsOrb 5s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* "Kamau." — trailing text */}
          <p
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(1.4rem, 4vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '0.08em',
              textAlign: 'right',
              marginTop: '0.4rem',
              animation: 'heroSlide 0.8s ease 0.2s both',
            }}
          >
            Kamau
            <span style={{ color: '#00D4A8', fontWeight: 700 }}>.</span>
          </p>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            lineHeight: 1.8,
            maxWidth: '520px',
            marginBottom: '2.5rem',
            animation: 'heroSlide 0.8s ease 0.3s both',
          }}
        >
          Computer Scientist & AI Researcher from{' '}
          <span style={{ color: '#00D4A8', fontWeight: 500 }}>Nairobi, Kenya</span>. I study
          what AI systems actually know versus what they claim to know — and build systems
          that behave honestly under uncertainty.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            flexWrap: 'wrap',
            marginBottom: '4.5rem',
            animation: 'heroSlide 0.8s ease 0.4s both',
          }}
        >
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="https://blog.geofreynjoroge.com" className="btn-outline">Read Blog</a>
          <a href="https://github.com/Jeff9497" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            GitHub ↗
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(2rem, 5vw, 5rem)',
            flexWrap: 'wrap',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            animation: 'heroSlide 0.8s ease 0.5s both',
          }}
        >
          {[
            { v: '6+', label: 'Projects Built', accent: false },
            { v: '4',  label: 'Research Posts', accent: true },
            { v: '75.4%', label: 'EA Win Rate', accent: false },
            { v: '2025', label: 'CS Graduate', accent: false },
          ].map(({ v, label, accent }) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: accent ? '#00D4A8' : 'white',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}
              >
                {v}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.73rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {label}
              </p>
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
  const map: Record<Project['status'], { cls: string; label: string }> = {
    live:           { cls: 'badge-live',     label: '● Live' },
    active:         { cls: 'badge-active',   label: '● Active' },
    research:       { cls: 'badge-research', label: '● Research' },
    'coming-soon':  { cls: 'badge-soon',     label: 'Soon' },
  };
  const { cls, label } = map[status];
  return (
    <span
      className={cls}
      style={{ padding: '0.22rem 0.65rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className="project-card scroll-reveal"
      style={{ display: 'flex', flexDirection: 'column' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${p.accentColor}35`;
        e.currentTarget.style.boxShadow = `0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px ${p.accentColor}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gradient header bar */}
      <div
        style={{
          height: '4px',
          background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}60)`,
        }}
      />

      <div style={{ padding: '1.6rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {/* Icon + title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>{p.title}</h3>
          </div>
          <StatusBadge status={p.status} />
        </div>

        {/* Description */}
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1 }}>
          {p.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {p.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              ⌥ GitHub
            </a>
          )}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.8rem',
                color: p.accentColor,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ↗ Visit
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 2rem', maxWidth: '1280px', margin: '0 auto' }}
    >
      {/* Section header */}
      <div className="scroll-reveal" style={{ marginBottom: '3.5rem' }}>
        <p style={{ color: '#00D4A8', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
          Work
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800 }}>
          My{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00D4A8 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Portfolio
          </span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', maxWidth: '480px', lineHeight: 1.7, fontSize: '0.9rem' }}>
          Research tools, live trading systems, and AI agents — built to actually run in the real world.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '1.35rem',
        }}
      >
        {PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>

      {/* Portfolio link */}
      <div className="scroll-reveal" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a
          href="https://portfolio.geofreynjoroge.com"
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: '2px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#00D4A8'; e.currentTarget.style.borderColor = '#00D4A8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
        >
          View full portfolio archive →
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SKILLS — Languages & Tools
// ─────────────────────────────────────────────────────────────

function SkillBar({ skill, go }: { skill: Skill; go: boolean }) {
  return (
    <div style={{ marginBottom: '1.35rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>{skill.name}</span>
        <span style={{ fontSize: '0.8rem', color: '#00D4A8', fontWeight: 600 }}>{skill.level}%</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          className={`skill-fill ${go ? 'go' : ''}`}
          style={{ '--w': `${skill.level}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const go = useSkillAnimation(ref);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 2rem',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div className="scroll-reveal" style={{ marginBottom: '3.5rem' }}>
          <p style={{ color: '#7C3AED', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Capabilities
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800 }}>
            Languages{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4A8, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              & Tools
            </span>
          </h2>
        </div>

        {/* Two-column skill bars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem 5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Left — Frameworks */}
          <div className="scroll-reveal">
            <p
              style={{
                color: '#00D4A8',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '1.75rem',
              }}
            >
              Frameworks & Libraries
            </p>
            {FRAMEWORK_SKILLS.map((s) => <SkillBar key={s.name} skill={s} go={go} />)}
          </div>

          {/* Right — Languages */}
          <div className="scroll-reveal">
            <p
              style={{
                color: '#7C3AED',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '1.75rem',
              }}
            >
              Languages & Tools
            </p>
            {LANGUAGE_SKILLS.map((s) => <SkillBar key={s.name} skill={s} go={go} />)}
          </div>
        </div>

        {/* Tools & Platforms pills */}
        <div className="scroll-reveal">
          <p
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.25rem',
            }}
          >
            Tools & Platforms
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {TOOLS.map((t) => (
              <span key={t} className="tool-pill">{t}</span>
            ))}
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
    <section
      id="blog"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 2rem', maxWidth: '1280px', margin: '0 auto' }}
    >
      {/* Header */}
      <div className="scroll-reveal" style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ color: '#00D4A8', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Writing
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800 }}>
            Research{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4A8, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Posts
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', maxWidth: '440px', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Mechanistic interpretability findings — circuits, memory, and what transformers actually know.
          </p>
        </div>
        <a
          href="https://blog.geofreynjoroge.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#00D4A8',
            fontSize: '0.875rem',
            textDecoration: 'none',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          All posts ↗
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1.25rem',
        }}
      >
        {BLOG_POSTS.map((post, i) => (
          <a
            key={i}
            href="https://blog.geofreynjoroge.com"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card scroll-reveal"
          >
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
              {post.tags.map((t) => (
                <span key={t} className="tag" style={{ color: '#00D4A8', borderColor: 'rgba(0,212,168,0.2)', background: 'rgba(0,212,168,0.06)' }}>
                  {t}
                </span>
              ))}
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', lineHeight: 1.45, marginBottom: '0.75rem' }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>
              {post.excerpt}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#00D4A8', marginTop: '1rem', fontWeight: 500 }}>
              Read on blog ↗
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

function Contact() {
  const links = [
    { label: 'GitHub',        href: 'https://github.com/Jeff9497',           color: 'rgba(255,255,255,0.75)' },
    { label: 'HuggingFace',   href: 'https://huggingface.co/Jeff28',         color: '#FF9D00' },
    { label: 'Email',         href: 'mailto:jeffkamau9497@gmail.com',         color: '#00D4A8' },
    { label: 'Dev Blog',      href: 'https://blog.geofreynjoroge.com',        color: '#7C3AED' },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) 2rem',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <div className="scroll-reveal">
          <p style={{ color: '#00D4A8', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Get in touch
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, marginBottom: '1.25rem' }}>
            Let's{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00D4A8, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Connect
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.75rem' }}>
            Open to research collaborations, ML engineering roles, and interesting problems at the
            intersection of interpretability and real-world AI systems.
          </p>

          {/* Location */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.82rem',
              marginBottom: '2.5rem',
            }}
          >
            📍 Nairobi, Kenya (EAT, UTC+3)
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {links.map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                style={{
                  padding: '0.7rem 1.5rem',
                  borderRadius: '8px',
                  border: `1px solid ${color}35`,
                  color,
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  transition: 'background 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}12`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {label} ↗
              </a>
            ))}
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
  return (
    <footer
      style={{
        padding: '2.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Geofrey Njoroge Kamau — Nairobi, Kenya
        </p>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Jeff9497' },
            { label: 'Blog', href: 'https://blog.geofreynjoroge.com' },
            { label: 'HuggingFace', href: 'https://huggingface.co/Jeff28' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '0.8rem',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00D4A8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
            >
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
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <hr className="divider" />
        <Projects />
        <Skills />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
