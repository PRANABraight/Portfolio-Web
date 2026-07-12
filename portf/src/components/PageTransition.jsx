// Page load transition — 6 deep-toned rainbow columns sweep top→bottom,
// then primary overlay fades out
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Deep amber→orange→rust blend (brand triad, muted)
const COLUMN_COLORS = ['#78350f', '#7c2d12', '#9a3412', '#b45309', '#92400e', '#5c2413'];

const columnVariants = {
  initial: { top: '0%' },
  animate: (i) => ({
    top: '100%',
    transition: {
      duration: 0.22,
      ease: 'easeInOut',
      delay: 0.07 * (5 - i),
    },
  }),
};

const PageTransition = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 6 rainbow columns */}
          <div
            style={{
              position: 'fixed', inset: 0, zIndex: 9998,
              display: 'flex', pointerEvents: 'none', overflow: 'hidden',
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={columnVariants}
                initial="initial"
                animate="animate"
                style={{
                  height: '100%',
                  flex: 1,
                  background: COLUMN_COLORS[i],
                  position: 'relative',
                }}
              />
            ))}
          </div>

          {/* Primary overlay fades out */}
          <motion.div
            style={{
              position: 'fixed', inset: 0,
              background: '#14100d',
              zIndex: 9997,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { delay: 0.35, duration: 0.2, ease: 'easeInOut' } }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
