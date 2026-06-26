// Page load transition — exact match to radnaabazar.com component 11494
// 6 green columns sweep top→bottom, then primary overlay fades out
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const columnVariants = {
  initial: { top: '0%' },
  animate: (i) => ({
    top: '100%',
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
      delay: 0.1 * (5 - i),
    },
  }),
};

const PageTransition = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 6 green columns */}
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
                  background: 'rgb(6, 78, 59)',
                  position: 'relative',
                }}
              />
            ))}
          </div>

          {/* Primary overlay fades out */}
          <motion.div
            style={{
              position: 'fixed', inset: 0,
              background: '#0f0e1a',
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
