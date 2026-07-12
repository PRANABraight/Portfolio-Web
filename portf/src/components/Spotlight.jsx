// Spotlight — exact match to radnaabazar.com component 56960
import { motion, useReducedMotion } from 'framer-motion';

const Spotlight = ({
  // Beams tinted by the scroll-synced site accent so they follow the section hue
  gradientFirst  = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(var(--site-accent-rgb), .09) 0, rgba(var(--site-accent-rgb), .02) 50%, transparent 80%)',
  gradientSecond = 'radial-gradient(50% 50% at 50% 50%, rgba(var(--site-accent-rgb), .07) 0, rgba(var(--site-accent-rgb), .02) 80%, transparent 100%)',
  gradientThird  = 'radial-gradient(50% 50% at 50% 50%, rgba(var(--site-accent-rgb), .05) 0, rgba(var(--site-accent-rgb), .02) 80%, transparent 100%)',
  translateY = -350,
  width      = 560,
  height     = 1380,
  smallWidth = 240,
  duration   = 7,
  xOffset    = 100,
  className,
}) => {
  const reduced = useReducedMotion();

  return (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    style={{
      position: 'absolute', inset: 0,
      height: '100%', width: '100%',
      maxWidth: '100%', overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
    {/* Left beam */}
    <motion.div
      animate={reduced ? undefined : { x: [0, xOffset, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 40, pointerEvents: 'none' }}
    >
      <div style={{ transform: `translateY(${translateY}px) rotate(-45deg)`, background: gradientFirst, width: `${width}px`, height: `${height}px`, position: 'absolute', top: 0, left: 0 }} />
      <div style={{ transform: 'rotate(-45deg) translate(5%, -50%)', background: gradientSecond, width: `${smallWidth}px`, height: `${height}px`, position: 'absolute', top: 0, left: 0, transformOrigin: 'top left' }} />
      <div style={{ transform: 'rotate(-45deg) translate(-180%, -70%)', background: gradientThird, width: `${smallWidth}px`, height: `${height}px`, position: 'absolute', top: 0, left: 0, transformOrigin: 'top left' }} />
    </motion.div>

    {/* Right beam */}
    <motion.div
      animate={reduced ? undefined : { x: [0, -xOffset, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      style={{ position: 'absolute', top: 0, right: 0, width: '100vw', height: '100vh', zIndex: 40, pointerEvents: 'none' }}
    >
      <div style={{ transform: `translateY(${translateY}px) rotate(45deg)`, background: gradientFirst, width: `${width}px`, height: `${height}px`, position: 'absolute', top: 0, right: 0 }} />
      <div style={{ transform: 'rotate(45deg) translate(-5%, -50%)', background: gradientSecond, width: `${smallWidth}px`, height: `${height}px`, position: 'absolute', top: 0, right: 0, transformOrigin: 'top right' }} />
      <div style={{ transform: 'rotate(45deg) translate(180%, -70%)', background: gradientThird, width: `${smallWidth}px`, height: `${height}px`, position: 'absolute', top: 0, right: 0, transformOrigin: 'top right' }} />
    </motion.div>
  </motion.div>
  );
};

export default Spotlight;
