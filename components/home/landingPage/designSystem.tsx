// designSystem.ts - 디자인 시스템 상수와 공통 컴포넌트

import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

export const DESIGN_SYSTEM = {
  animations: {
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
      viewport: { once: true, amount: 0.1 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      viewport: { once: true, amount: 0.1 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      viewport: { once: true, amount: 0.1 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
      viewport: { once: true, amount: 0.1 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
      viewport: { once: true, amount: 0.1 },
    },
  },
};

// scaleIn 애니메이션 섹션
export const SectionScale = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}>(({ children, className = "", ...props }, ref) => (
  <motion.section
    {...DESIGN_SYSTEM.animations.scaleIn}
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </motion.section>
));

SectionScale.displayName = "SectionScale";

// fadeInUp 애니메이션 섹션
export const SectionUp = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}>(({ children, className = "", ...props }, ref) => (
  <motion.section
    {...DESIGN_SYSTEM.animations.fadeInUp}
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </motion.section>
));

SectionUp.displayName = "SectionUp";

// fadeInDown 애니메이션 섹션
export const SectionDown = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}>(({ children, className = "", ...props }, ref) => (
  <motion.section
    {...DESIGN_SYSTEM.animations.fadeInDown}
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </motion.section>
));

SectionDown.displayName = "SectionDown";

// fadeInLeft 애니메이션 섹션
export const SectionLeft = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}>(({ children, className = "", ...props }, ref) => (
  <motion.section
    {...DESIGN_SYSTEM.animations.fadeInLeft}
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </motion.section>
));

SectionLeft.displayName = "SectionLeft";

// fadeInRight 애니메이션 섹션
export const SectionRight = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}>(({ children, className = "", ...props }, ref) => (
  <motion.section
    {...DESIGN_SYSTEM.animations.fadeInRight}
    className={className}
    ref={ref}
    {...props}
  >
    {children}
  </motion.section>
));

SectionRight.displayName = "SectionRight";