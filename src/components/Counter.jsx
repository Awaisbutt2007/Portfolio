import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value, label, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(typeof value === 'number' ? value : parseFloat(value));
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        if(typeof value === 'string' && isNaN(parseFloat(value))) {
            ref.current.textContent = value; 
        } else {
            ref.current.textContent = prefix + Math.floor(latest) + suffix;
        }
      }
    })
  }, [springValue, value, prefix, suffix]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem' }}>
        <span className="text-gradient" ref={ref}>{prefix}0{suffix}</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
};

export default Counter;
