"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({
  start = 1,
  target,
  duration = 1500,
  suffix = "",
  className,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const [count, setCount] = useState(start);

  useEffect(() => {
    const increment = () => {
      const stepTime = Math.abs(Math.floor(duration / target));

      if (start < target) {
        start++;
        setCount(start);

        setTimeout(() => {
          increment();
        }, stepTime);
      }
    };

    // Run increment function if it's in view
    if (inView) {
      increment();
    }
  }, [inView, start, target, duration]);

  return (
    <div ref={ref} className={className}>
      {count.toString() + suffix}
    </div>
  );
};

export default Counter;
