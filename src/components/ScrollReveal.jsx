import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 30,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mobile = window.innerWidth <= 768;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: mobile ? 0.14 : 0.1,
        rootMargin: mobile ? "0px 0px -40px 0px" : "0px 0px -100px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const resolvedDelay = isMobile ? Math.min(delay * 0.2, 0.14) : delay;
  const resolvedDuration = isMobile ? Math.min(duration, 0.34) : duration;
  const resolvedDistance = isMobile ? Math.min(distance, 20) : distance;
  const resolvedEase = isMobile ? "easeIn" : "easeInOut";

  const variants = {
    hidden: {
      opacity: 0,
      y:
        direction === "up"
          ? resolvedDistance
          : direction === "down"
            ? -resolvedDistance
            : 0,
      x:
        direction === "left"
          ? resolvedDistance
          : direction === "right"
            ? -resolvedDistance
            : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: resolvedDuration,
        delay: resolvedDelay,
        ease: resolvedEase
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
