"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  viewportMargin = "-80px",
  ...rest
}) {
  const Tag = motion[as];
  const mergedClass = className ? `${className} sr-reveal` : "sr-reveal";

  return (
    <Tag
      className={mergedClass}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
