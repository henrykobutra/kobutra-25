"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  cornerRadius?: number
  padding?: string
  overLight?: boolean
  onClick?: () => void
}

const GlassFilter = ({
  id,
  displacementScale,
  width,
  height
}: {
  id: string
  displacementScale: number
  width: number
  height: number
}) => (
  <svg style={{ position: "absolute", width, height }} aria-hidden="true">
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          baseFrequency="0.02 0.03"
          numOctaves="3"
          result="noise"
          seed="2"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={displacementScale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
)

export default function LiquidGlass({
  children,
  className = "",
  style = {},
  displacementScale = 15,
  blurAmount = 8,
  saturation = 150,
  cornerRadius = 16,
  padding = "24px 32px",
  overLight = false,
  onClick,
}: LiquidGlassProps) {
  const filterId = useId()
  const glassRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [glassSize, setGlassSize] = useState({ width: 200, height: 60 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!glassRef.current) return

    const rect = glassRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setMousePos({
      x: ((e.clientX - centerX) / rect.width) * 50,
      y: ((e.clientY - centerY) / rect.height) * 50,
    })
  }, [])

  useEffect(() => {
    const updateSize = () => {
      if (glassRef.current) {
        const rect = glassRef.current.getBoundingClientRect()
        setGlassSize({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateSize)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove])

  const transformStyle = `translate(-50%, -50%) ${
    isActive && onClick ? "scale(0.96)" : "scale(1)"
  }`

  const glassStyle = {
    position: "relative" as const,
    top: "50%",
    left: "50%",
    transform: transformStyle,
    transition: "all 0.2s ease-out",
    ...style,
  }

  return (
    <div
      ref={glassRef}
      className={`relative ${className} ${onClick ? "cursor-pointer" : ""}`}
      style={glassStyle}
      onClick={onClick}
    >
      <GlassFilter
        id={filterId}
        displacementScale={displacementScale}
        width={glassSize.width}
        height={glassSize.height}
      />

      <div
        className="glass-container"
        style={{
          borderRadius: `${cornerRadius}px`,
          padding,
          overflow: "hidden",
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "16px",
          backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
          backgroundColor: overLight
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: overLight
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 24px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        {/* Backdrop with displacement effect */}
        <div
          className="glass-backdrop"
          style={{
            position: "absolute",
            inset: 0,
            filter: `url(#${filterId})`,
            backdropFilter: `blur(${blurAmount + 4}px) saturate(${saturation}%)`,
            borderRadius: `${cornerRadius}px`,
          }}
        />

        {/* Dynamic highlight based on mouse position */}
        <div
          className="glass-highlight"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `${cornerRadius}px`,
            background: `linear-gradient(${135 + mousePos.x}deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, ${0.1 + Math.abs(mousePos.x) * 0.002}) 50%,
              rgba(255, 255, 255, 0) 100%)`,
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.2s ease-out",
          }}
        />

        {/* Content */}
        <div
          className="glass-content"
          style={{
            position: "relative",
            zIndex: 1,
            color: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {children}
        </div>

        {/* Click effect overlay */}
        {onClick && (
          <div
            className="glass-click-effect"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: `${cornerRadius}px`,
              background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.1s ease-out",
            }}
          />
        )}
      </div>
    </div>
  )
}