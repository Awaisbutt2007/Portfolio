import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import { stats } from '../data/projects';

/* ------------------------------------------------------------------ */
/*  Typewriter                                                        */
/* ------------------------------------------------------------------ */
const Typewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((p) => (p + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSubIndex((p) => p + (reverse ? -1 : 1)), reverse ? 45 : 90);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className="caret">|</span>
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Particle shapes (normalised coordinates, roughly -1..1)           */
/* ------------------------------------------------------------------ */
const sampleCanvas = (w, h, draw, count) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  draw(ctx);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push([(x - w / 2) / (w / 2), (y - h / 2) / (w / 2)]);
    }
  }
  const out = [];
  for (let i = 0; i < count; i++) {
    const p = pts[Math.floor(Math.random() * pts.length)] || [0, 0];
    out.push([p[0], p[1], (Math.random() - 0.5) * 0.08]);
  }
  return out;
};

const buildShapes = (n) => {
  // 0. loose star field
  const field = Array.from({ length: n }, () => [
    (Math.random() - 0.5) * 3.4,
    (Math.random() - 0.5) * 2.2,
    (Math.random() - 0.5) * 2,
  ]);

  // 1. name
  const name = sampleCanvas(
    800,
    260,
    (ctx) => {
      ctx.font = '900 190px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AWAIS', 400, 135);
    },
    n,
  );

  // 2. laptop with </>
  const laptop = sampleCanvas(
    600,
    380,
    (ctx) => {
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.roundRect(120, 30, 360, 230, 18);
      ctx.stroke();
      ctx.font = '800 110px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('</>', 300, 148);
      ctx.beginPath();
      ctx.moveTo(70, 285);
      ctx.lineTo(530, 285);
      ctx.lineTo(575, 318);
      ctx.lineTo(25, 318);
      ctx.closePath();
      ctx.fill();
    },
    n,
  );

  // 3. globe (fibonacci sphere)
  const globe = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    globe.push([Math.cos(th) * r * 0.62, y * 0.62, Math.sin(th) * r * 0.62]);
  }

  return [field, name, laptop, globe];
};

// scroll progress -> continuous shape index (holds between morphs)
const STOPS = [
  [0, 0],
  [0.1, 0],
  [0.26, 1],
  [0.38, 1],
  [0.54, 2],
  [0.64, 2],
  [0.8, 3],
  [1, 3],
];
const shapeAt = (p) => {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [a, sa] = STOPS[i];
    const [b, sb] = STOPS[i + 1];
    if (p <= b) {
      const t = b === a ? 0 : (p - a) / (b - a);
      return sa + (sb - sa) * t;
    }
  }
  return 3;
};
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#22d3ee'];

/* ------------------------------------------------------------------ */
/*  Canvas: a scroll-scrubbed "video" rendered in real time            */
/* ------------------------------------------------------------------ */
const ParticleFilm = ({ progress }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const isSmall = window.innerWidth < 768;
    const N = isSmall ? 900 : 1700;
    const shapes = buildShapes(N);
    const jitter = Array.from({ length: N }, () => [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
    ]);
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    let smooth = progress.get();
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < N; i++) {
      px[i] = w / 2;
      py[i] = h / 2;
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const frame = (time) => {
      if (!running) return;
      const t = time / 1000;
      smooth += (progress.get() - smooth) * 0.09;

      const s = shapeAt(smooth);
      const from = Math.min(Math.floor(s), 2);
      const k = ease(Math.min(Math.max(s - from, 0), 1));
      const burst = Math.sin(Math.PI * k) * 0.45; // particles scatter mid-morph
      const A = shapes[from];
      const B = shapes[from + 1];

      const globeW = Math.max(0, s - 2);
      const rot = Math.sin(t * 0.5) * 0.18 * (1 - globeW) + (t * 0.35 + smooth * 3) * globeW;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      // after the intro, shapes move aside so the captions stay readable:
      // right half on desktop, upper half on mobile
      const m = Math.min(1, s);
      const wide = w > 900;
      const fullScale = Math.min(w * 0.42, h * 0.62);
      const sideScale = wide ? Math.min(w * 0.27, h * 0.6) : Math.min(w * 0.42, h * 0.32);
      const scale = fullScale + (sideScale - fullScale) * m;
      const cx = wide ? w * (0.5 + 0.2 * m) : w / 2;
      const cy = wide ? h * 0.52 : h * (0.5 - 0.2 * m);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < N; i++) {
        const a = A[i];
        const b = B[i];
        const j = jitter[i];
        let x = a[0] + (b[0] - a[0]) * k + j[0] * burst;
        let y = a[1] + (b[1] - a[1]) * k + j[1] * burst;
        let z = a[2] + (b[2] - a[2]) * k + j[2] * burst;

        // gentle idle float
        x += Math.sin(t * 0.8 + i) * 0.006;
        y += Math.cos(t * 0.7 + i * 1.3) * 0.006;

        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        const f = 2.4 / (2.4 + rz);

        let tx = cx + rx * scale * f;
        let ty = cy + y * scale * f;

        // cursor repulsion
        const dx = tx - mouse.x;
        const dy = ty - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          const push = (1 - d2 / 12000) * 38;
          const d = Math.sqrt(d2) || 1;
          tx += (dx / d) * push;
          ty += (dy / d) * push;
        }

        px[i] += (tx - px[i]) * 0.18;
        py[i] += (ty - py[i]) * 0.18;

        const size = Math.max(0.6, 1.7 * f);
        ctx.globalAlpha = Math.min(1, 0.35 + 0.6 * f * (from === 0 && k < 0.5 ? 0.6 : 1));
        ctx.fillStyle = COLORS[i % 4];
        ctx.fillRect(px[i], py[i], size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
const Caption = ({ progress, range, kicker, title, children }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [60, 0, 0, -60]);
  const blur = useTransform(progress, range, ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']);
  return (
    <motion.div className="hero-caption" style={{ opacity, y, filter: blur }}>
      <span className="hero-kicker">{kicker}</span>
      <h2>{title}</h2>
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const introOpacity = useTransform(progress, [0, 0.08, 0.14], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.14], [0, -120]);
  const introScale = useTransform(progress, [0, 0.14], [1, 0.92]);
  const photoX = useTransform(progress, [0, 0.14], [0, 160]);
  const photoRotate = useTransform(progress, [0, 0.14], [0, 8]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(progress, [0, 0.05], [1, 0]);

  const finalRange = [0.76, 0.84, 1, 1.01];

  return (
    <section ref={sectionRef} id="home" className="scroll-hero">
      <div className="scroll-hero-sticky">
        <div className="hero-glow" />
        <ParticleFilm progress={progress} />

        {/* Stage 0: intro */}
        <motion.div className="container hero-intro" style={{ opacity: introOpacity, y: introY, scale: introScale }}>
          <div className="hero-intro-text">
            <div className="hero-badge">
              <span className="pulse-dot" />
              Available for freelance & full-time work
            </div>
            <h1 className="hero-title">
              Awais Butt.
              <br />
              <span className="text-gradient-color">
                <Typewriter
                  words={['Full-Stack Developer.', 'SaaS Builder.', 'Desktop App Developer.', '3D Web Experiences.']}
                />
              </span>
            </h1>
            <p className="hero-sub">
              I design and ship complete products: booking SaaS platforms, social media automation,
              desktop software for clinics, restaurants and shops, and 3D animated websites.
            </p>
            <div className="hero-ctas">
              <Magnetic>
                <a href="#projects" className="btn-primary" style={{ gap: '0.5rem' }}>
                  Explore {stats.total}+ Projects <ArrowRight size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn-secondary" style={{ gap: '0.5rem' }}>
                  <Mail size={18} /> Hire Me
                </Link>
              </Magnetic>
            </div>
          </div>

          <motion.div className="hero-photo" style={{ x: photoX, rotate: photoRotate }}>
            <div className="hero-photo-ring" />
            <img src="/profile.jpg.JPG" alt="Awais Butt" />
          </motion.div>
        </motion.div>

        {/* Stage 1-3: story captions */}
        <Caption progress={progress} range={[0.2, 0.27, 0.36, 0.42]} kicker="01 — Who" title="Self-taught. Product-minded.">
          <p>From a Matric pass and Hifz-e-Quran to shipping real software for real businesses, one project at a time.</p>
        </Caption>

        <Caption progress={progress} range={[0.47, 0.54, 0.62, 0.68]} kicker="02 — What" title="Web apps. Desktop apps. Platforms.">
          <p>React & Next.js front ends, Node.js & Supabase back ends, and Electron apps that run offline.</p>
        </Caption>

        <Caption progress={progress} range={finalRange} kicker="03 — Shipped" title="Built end to end.">
          <div className="hero-stats">
            <div><strong>{stats.total}+</strong><span>Projects</span></div>
            <div><strong>{stats.platforms}</strong><span>SaaS / Platforms</span></div>
            <div><strong>{stats.desktop}</strong><span>Desktop Apps</span></div>
            <div><strong>{stats.websites}</strong><span>3D Websites</span></div>
          </div>
        </Caption>

        <motion.div className="scroll-hint" style={{ opacity: hintOpacity }}>
          <span>Scroll</span>
          <ChevronDown size={18} />
        </motion.div>

        <div className="hero-progress">
          <motion.div style={{ scaleX: barScale }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
