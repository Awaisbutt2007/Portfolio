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
// Soft, warm-white core with a tinted halo: reads as light, not as pixels
const PALETTE = [
  [255, 255, 255],
  [167, 243, 208], // mint
  [125, 211, 252], // sky
  [196, 181, 253], // lavender
  [110, 231, 183], // emerald
  [147, 197, 253], // blue
];

const makeSprite = ([r, g, b]) => {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const x = c.getContext('2d');
  const grd = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.12, `rgba(${r},${g},${b},0.95)`);
  grd.addColorStop(0.35, `rgba(${r},${g},${b},0.28)`);
  grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = grd;
  x.fillRect(0, 0, s, s);
  return c;
};

/* ------------------------------------------------------------------ */
/*  Canvas: a scroll-scrubbed "film" rendered in real time             */
/* ------------------------------------------------------------------ */
const ParticleFilm = ({ progress }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const isSmall = window.innerWidth < 768;
    const N = isSmall ? 1300 : 2600;
    const DUST = isSmall ? 120 : 260;
    const shapes = buildShapes(N);
    const sprites = PALETTE.map(makeSprite);

    // per-particle constants
    const jitter = Array.from({ length: N }, () => {
      // random direction on a sphere for a soft, round burst
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u) * (0.4 + Math.random() * 0.6);
      return [Math.cos(th) * r, u * (0.4 + Math.random() * 0.6), Math.sin(th) * r];
    });
    const tint = Uint8Array.from({ length: N }, () => {
      const r = Math.random();
      return r < 0.35 ? 0 : 1 + Math.floor(Math.random() * (PALETTE.length - 1));
    });
    const sizeK = Float32Array.from({ length: N }, () => 0.55 + Math.pow(Math.random(), 3) * 1.6);
    const phase = Float32Array.from({ length: N }, () => Math.random() * Math.PI * 2);
    const delay = Float32Array.from({ length: N }, () => Math.random() * 0.35); // staggered arrival

    // background dust for depth (slow parallax)
    const dust = Array.from({ length: DUST }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      t: Math.floor(Math.random() * PALETTE.length),
      p: Math.random() * Math.PI * 2,
    }));

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
      px[i] = Math.random() * w;
      py[i] = Math.random() * h;
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

    const frame = (time) => {
      if (!running) return;
      const t = time / 1000;
      smooth += (progress.get() - smooth) * 0.1;

      const s = shapeAt(smooth);
      const from = Math.min(Math.floor(s), 2);
      const raw = clamp01(s - from);
      const A = shapes[from];
      const B = shapes[from + 1];

      const m = Math.min(1, s);
      const wide = w > 900;
      const fullScale = Math.min(w * 0.42, h * 0.62);
      const sideScale = wide ? Math.min(w * 0.27, h * 0.6) : Math.min(w * 0.42, h * 0.32);
      const scale = fullScale + (sideScale - fullScale) * m;
      const cx = wide ? w * (0.5 + 0.2 * m) : w / 2;
      const cy = wide ? h * 0.52 : h * (0.5 - 0.2 * m);

      const globeW = Math.max(0, s - 2);
      const rot = Math.sin(t * 0.45) * 0.22 * (1 - globeW) + (t * 0.3 + smooth * 3) * globeW;
      const tilt = 0.25 * globeW;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // dust layer
      const drift = smooth * 0.25;
      for (const d of dust) {
        const x = ((d.x + t * 0.004 * d.z) % 1) * w;
        const y = (((d.y - drift * d.z) % 1) + 1) % 1 * h;
        const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + d.p);
        const sz = 2 + d.z * 4;
        ctx.globalAlpha = 0.12 + 0.25 * tw * d.z;
        ctx.drawImage(sprites[d.t], x - sz / 2, y - sz / 2, sz, sz);
      }

      for (let i = 0; i < N; i++) {
        // staggered, eased progress per particle so the shape "assembles"
        const k = ease(clamp01((raw - delay[i]) / 0.65));
        const swirl = Math.sin(Math.PI * k);
        const a = A[i];
        const b = B[i];
        const j = jitter[i];

        let x = a[0] + (b[0] - a[0]) * k;
        let y = a[1] + (b[1] - a[1]) * k;
        let z = a[2] + (b[2] - a[2]) * k;

        // mid-morph: particles bloom outward and swirl around the centre
        const ang = swirl * 1.2;
        const ca = Math.cos(ang);
        const sa = Math.sin(ang);
        const bx = x * ca - z * sa;
        const bz = x * sa + z * ca;
        x = bx + j[0] * swirl * 0.35;
        y = y + j[1] * swirl * 0.35;
        z = bz + j[2] * swirl * 0.35;

        // idle breathing
        const ph = phase[i];
        x += Math.sin(t * 0.7 + ph) * 0.004;
        y += Math.cos(t * 0.6 + ph * 1.3) * 0.004;

        // rotate (Y) + tilt (X)
        const rx = x * cosR - z * sinR;
        let rz = x * sinR + z * cosR;
        const ry = y * cosT - rz * sinT;
        rz = y * sinT + rz * cosT;
        const f = 2.6 / (2.6 + rz);

        let tx = cx + rx * scale * f;
        let ty = cy + ry * scale * f;

        // cursor: soft push
        const dx = tx - mouse.x;
        const dy = ty - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const push = (1 - d2 / 14000) * 42;
          const d = Math.sqrt(d2) || 1;
          tx += (dx / d) * push;
          ty += (dy / d) * push;
        }

        px[i] += (tx - px[i]) * 0.14;
        py[i] += (ty - py[i]) * 0.14;

        // depth: near = bigger & brighter, far = small & faint
        const depth = clamp01((f - 0.7) / 0.7);
        const twinkle = 0.75 + 0.25 * Math.sin(t * 2.2 + ph * 3);
        const stage0 = from === 0 ? 1 - raw * 0.6 : 0; // star-field is dimmer
        const size = (3.2 + depth * 5.5) * sizeK[i] * (1 - stage0 * 0.35);
        ctx.globalAlpha = clamp01((0.22 + depth * 0.7) * twinkle * (1 - stage0 * 0.45));
        ctx.drawImage(sprites[tint[i]], px[i] - size / 2, py[i] - size / 2, size, size);
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
