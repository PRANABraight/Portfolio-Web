// src/hooks/useTypingEffect.js
import { useState, useEffect } from 'react';

// This hook simulates a typing and deleting effect for an array of text lines.
export const useTypingEffect = (lines, speed = 50, pause = 2000) => {
  const [displayedLines, setDisplayedLines] = useState(['']);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const handleTyping = () => {
      const currentLine = lines[lineIndex];
      // Typing forward
      if (!isDeleting) {
        if (charIndex < currentLine.length) {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
            return newLines;
          });
          setCharIndex(prev => prev + 1);
        } else {
          // Move to the next line or start deleting
          if (lineIndex < lines.length - 1) {
            setLineIndex(prev => prev + 1);
            setCharIndex(0);
            setDisplayedLines(prev => [...prev, '']);
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(true);
              setIsPaused(false);
            }, pause);
          }
        }
      } else { // Deleting
        if (charIndex > 0) {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = lines[lineIndex].substring(0, charIndex - 1);
            return newLines;
          });
          setCharIndex(prev => prev - 1);
        } else {
          // Move to the previous line or restart
          if (lineIndex > 0) {
            setDisplayedLines(prev => prev.slice(0, -1));
            setLineIndex(prev => prev - 1);
            setCharIndex(lines[lineIndex - 1].length);
          } else {
            // Reset to start the loop again
            setIsPaused(true);
            setTimeout(() => {
              setIsDeleting(false);
              setLineIndex(0);
              setCharIndex(0);
              setDisplayedLines(['']);
              setIsPaused(false);
            }, speed);
          }
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeoutId);
  }, [charIndex, lineIndex, isDeleting, isPaused, lines, speed, pause]);

  return { displayedLines, isComplete: isPaused && !isDeleting };
};