import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StaggerContainer = ({
  children,
  staggerDelay = 0.15,
  mobileChildReveal = false,
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

  const resolvedStaggerDelay = isMobile ? Math.min(staggerDelay * 0.35, 0.08) : staggerDelay;
  const delayChildren = isMobile ? 0.04 : 0.2;

  const containerVariants = {
    hidden: { opacity: isMobile && mobileChildReveal ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: resolvedStaggerDelay,
        delayChildren,
        ease: isMobile ? "easeIn" : "easeOut"
      }
    }
  };

  const mobileItemVariants = {
    hidden: {
      opacity: mobileChildReveal ? 1 : 0,
      y: mobileChildReveal ? 0 : 18
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: mobileChildReveal ? 0.16 : 0.34,
        ease: "easeIn"
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
      initial={false}
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={itemVariants}
        >
          <div
            className={[
              "motion-inner",
              isMobile && mobileChildReveal ? "motion-inner--mobile-stagger" : "",
              isMobile && isVisible && mobileChildReveal ? "is-visible" : ""
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {child}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerContainer;
