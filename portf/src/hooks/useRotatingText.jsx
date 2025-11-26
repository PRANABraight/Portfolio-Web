import { useState, useEffect } from "react";

/**
 * A custom hook that cycles through an array of text strings at a regular interval.
 * @param {string[]} texts - An array of strings to rotate through.
 * @param {number} [interval=2000] - The time in milliseconds between text changes.
 * @returns {string} The current text string to display.
 */
export const useRotatingText = (texts, interval = 2000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up a timer that updates the index at the specified interval
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    // Clean up the timer when the component unmounts to prevent memory leaks
    return () => clearInterval(timer);
  }, [texts, interval]); // Re-run the effect if the texts or interval change

  return texts[currentIndex];
};