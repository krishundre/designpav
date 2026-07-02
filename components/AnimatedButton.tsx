"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedButtonProps {
  variant: "primary" | "secondary";
  href?: string;
  disabled?: boolean;
  tooltip?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}

export default function AnimatedButton({
  variant,
  href,
  disabled = false,
  tooltip,
  children,
  icon,
  id,
}: AnimatedButtonProps) {
  const shouldReduce = useReducedMotion();
  const [showTooltip, setShowTooltip] = useState(false);

  const isPrimary = variant === "primary";

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 28px",
    borderRadius: "12px",
    fontSize: "0.9rem",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "box-shadow 0.2s ease, background 0.2s ease",
    textDecoration: "none",
    border: "none",
    outline: "none",
    whiteSpace: "nowrap" as const,
    position: "relative" as const,
    letterSpacing: "0.01em",
  };

  const primaryStyles: React.CSSProperties = {
    ...baseStyles,
    background: "linear-gradient(135deg, #6D5EF8 0%, #8A7CFF 100%)",
    color: "#FFFFFF",
    boxShadow:
      "0 0 20px rgba(109,94,248,0.30), inset 0 1px 0 rgba(255,255,255,0.15)",
  };

  const secondaryStyles: React.CSSProperties = {
    ...baseStyles,
    background: "rgba(255,255,255,0.04)",
    color: disabled ? "#52525B" : "#A1A1AA",
    border: "1px solid rgba(255,255,255,0.08)",
    opacity: disabled ? 0.6 : 1,
  };

  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </>
  );

  const motionProps = {
    whileHover: shouldReduce || disabled
      ? {}
      : {
          scale: 1.03,
          boxShadow: isPrimary
            ? "0 0 35px rgba(109,94,248,0.55), 0 0 60px rgba(109,94,248,0.20), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 0 20px rgba(255,255,255,0.05)",
        },
    whileTap: shouldReduce || disabled ? {} : { scale: 0.97 },
    transition: { duration: 0.15 },
  };

  if (disabled) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <motion.button
          id={id}
          disabled
          aria-disabled="true"
          aria-label={tooltip ? `${String(children)} — ${tooltip}` : String(children)}
          style={secondaryStyles}
          {...motionProps}
        >
          {content}
        </motion.button>

        {/* Tooltip */}
        {tooltip && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={
              showTooltip
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 6, scale: 0.95 }
            }
            transition={{ duration: 0.15 }}
            className="absolute -top-10 left-1/2 z-50 px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none whitespace-nowrap"
            style={{
              transform: "translateX(-50%)",
              background: "rgba(15,15,15,0.95)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#A1A1AA",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            {tooltip}
            {/* Arrow */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 w-2 h-2 rotate-45"
              style={{
                transform: "translateX(-50%) rotate(45deg)",
                background: "rgba(15,15,15,0.95)",
                borderRight: "1px solid rgba(255,255,255,0.10)",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
              }}
            />
          </motion.div>
        )}
      </div>
    );
  }

  if (href) {
    return (
      <motion.a
        id={id}
        href={href}
        style={isPrimary ? primaryStyles : secondaryStyles}
        aria-label={String(children)}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      id={id}
      style={isPrimary ? primaryStyles : secondaryStyles}
      aria-label={String(children)}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
