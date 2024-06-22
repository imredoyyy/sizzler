"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ start = 0, end, duration = 2000, suffix, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [count, setCount] = useState(start);

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const newCount = Math.min(
          start + (progress / duration) * (end - start),
          end,
        );
        setCount(newCount);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, start, end, duration]);

  return (
    <div ref={ref} className={className}>
      {Math.floor(count)}
      {suffix}
    </div>
  );
};

export default Counter;
