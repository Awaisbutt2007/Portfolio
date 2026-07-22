import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!isVisible) setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isVisible]);

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default MouseGlow;
