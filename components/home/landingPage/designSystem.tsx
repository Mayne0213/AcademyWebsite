// designSystem.ts - 디자인 시스템 상수와 공통 컴포넌트

import { motion } from "framer-motion";
import { ReactNode } from "react";

export const DESIGN_SYSTEM = {
  // 통일된 애니메이션
  animations: {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      viewport: { once: true, amount: 0.3 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6 },
      viewport: { once: true, amount: 0.3 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6 },
      viewport: { once: true, amount: 0.3 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
      viewport: { once: true, amount: 0.3 },
    },
  },

  // 통일된 간격
  spacing: {
    section: "py-16 md:py-24",
    container: "max-w-7xl mx-auto px-4 md:px-6",
    cardPadding: "p-6 md:p-8",
  },
};

// ============================================
// 공통 컴포넌트들
// ============================================

// 섹션 래퍼 컴포넌트
export const Section = ({
  children,
  className = "",
  background = "bg-white",
  ...props
}: {
  children: ReactNode;
  className?: string;
  background?: string;
  [key: string]: any;
}) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className={`${background} ${DESIGN_SYSTEM.spacing.section} ${className}`}
    {...props}
  >
    <div className={DESIGN_SYSTEM.spacing.container}>{children}</div>
  </motion.section>
);
