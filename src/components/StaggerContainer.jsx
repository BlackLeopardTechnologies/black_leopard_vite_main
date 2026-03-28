import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StaggerContainer = ({
  children,
  staggerDelay = 0.15,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Different animations for mobile vs desktop
  const mobileItemVariants = {
    hidden: {
      opacity: 0,
      x: -40
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const desktopItemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = isMobile ? mobileItemVariants : desktopItemVariants;

  return (
    <motion.div
      ref={ref}
      // initial="hidden"
      initial={false}
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
      style={{
        willChange: "opacity",
        // willChange: "transform, opacity",
        // backfaceVisibility: "hidden",
        // WebkitBackfaceVisibility: "hidden",
        // transform: "translateZ(0)",
        // WebkitTransform: "translateZ(0)",
        // transformStyle: "preserve-3d",
        // WebkitTransformStyle: "preserve-3d"
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={itemVariants}
          style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden"
            // willChange: "transform, opacity",
            // backfaceVisibility: "hidden",
            // WebkitBackfaceVisibility: "hidden",
            // transform: "translateZ(0)",
            // WebkitTransform: "translateZ(0)",
            // transformStyle: "preserve-3d",
            // WebkitTransformStyle: "preserve-3d"
          }}
        >
          <div className="motion-inner">
          {child}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerContainer;