import React from "react"

const GlassCard = ({ children, className = "", title = "" }) => {
  return (
    <div className={`glass-card ${className}`} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {title && <h3 style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px", opacity: 0.7, color: "var(--accent-blue)" }}>{title}</h3>}
      {children}
    </div>
  )
}

export default GlassCard
