"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { getDisplacementMap } from "./displacement-maps"

interface EnhancedLiquidGlassProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  cornerRadius?: number
  padding?: string
  overLight?: boolean
  onClick?: () => void
}

const EnhancedGlassFilter = ({
  id,
  displacementScale,
  aberrationIntensity,
  width,
  height
}: {
  id: string
  displacementScale: number
  aberrationIntensity: number
  width: number
  height: number
}) => {
  const [displacementMapUrl, setDisplacementMapUrl] = useState<string>("")

  useEffect(() => {
    // Generate displacement map on client side
    const mapUrl = getDisplacementMap()
    setDisplacementMapUrl(mapUrl)
  }, [])

  return (
    <svg style={{ position: "absolute", width, height }} aria-hidden="true">
      <defs>
        {/* Edge mask for chromatic aberration */}
        <radialGradient id={`${id}-edge-mask`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset={`${Math.max(30, 80 - aberrationIntensity * 2)}%`} stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>

        <filter id={id} x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          {/* Load displacement map */}
          {displacementMapUrl && (
            <feImage
              id="displacement-image"
              x="0" y="0" width="100%" height="100%"
              result="DISPLACEMENT_MAP"
              href={displacementMapUrl}
              preserveAspectRatio="xMidYMid slice"
            />
          )}
          {!displacementMapUrl && (
            <feImage
              id="displacement-image"
              x="0" y="0" width="100%" height="100%"
              result="DISPLACEMENT_MAP"
              href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23808080'/%3E%3C/svg%3E"
              preserveAspectRatio="xMidYMid slice"
            />
          )}

          {/* Create edge mask using the displacement map */}
          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0.3 0.3 0.3 0 0
                   0 0 0 1 0"
            result="EDGE_INTENSITY"
          />
          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
          </feComponentTransfer>

          {/* Original undisplaced image for center */}
          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

          {/* Red channel displacement with slight offset */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale * 0.9}
            xChannelSelector="R"
            yChannelSelector="B"
            result="RED_DISPLACED"
          />
          <feGaussianBlur in="RED_DISPLACED" stdDeviation="0.5" result="RED_BLURRED" />
          <feColorMatrix
            in="RED_BLURRED"
            type="matrix"
            values="0.8 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="RED_CHANNEL"
          />

          {/* Green channel displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale * (0.95 - aberrationIntensity * 0.03)}
            xChannelSelector="R"
            yChannelSelector="B"
            result="GREEN_DISPLACED"
          />
          <feGaussianBlur in="GREEN_DISPLACED" stdDeviation="0.3" result="GREEN_BLURRED" />
          <feColorMatrix
            in="GREEN_BLURRED"
            type="matrix"
            values="0 0 0 0 0
                   0 0.9 0 0 0
                   0 0 0 0 0
                   0 0 0 1 0"
            result="GREEN_CHANNEL"
          />

          {/* Blue channel displacement with different offset */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="DISPLACEMENT_MAP"
            scale={displacementScale * (0.85 - aberrationIntensity * 0.05)}
            xChannelSelector="R"
            yChannelSelector="B"
            result="BLUE_DISPLACED"
          />
          <feGaussianBlur in="BLUE_DISPLACED" stdDeviation="0.7" result="BLUE_BLURRED" />
          <feColorMatrix
            in="BLUE_BLURRED"
            type="matrix"
            values="0 0 0 0 0
                   0 0 0 0 0
                   0 0 0.8 0 0
                   0 0 0 1 0"
            result="BLUE_CHANNEL"
          />

          {/* Combine all channels with softer blend mode for chromatic aberration */}
          <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="multiply" result="GB_COMBINED" />
          <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />

          {/* Add significant blur to smooth sharp transitions */}
          <feGaussianBlur
            in="RGB_COMBINED"
            stdDeviation={Math.max(0.8, 1.2 - aberrationIntensity * 0.02)}
            result="ABERRATED_BLURRED"
          />

          {/* Apply edge mask to aberration effect */}
          <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

          {/* Create inverted mask for center */}
          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />

          {/* Combine edge aberration with clean center */}
          <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export default function EnhancedLiquidGlass({
  children,
  className = "",
  style = {},
  displacementScale = 25,
  blurAmount = 8,
  saturation = 150,
  aberrationIntensity = 2,
  cornerRadius = 16,
  padding = "24px 32px",
  overLight = false,
  onClick,
}: EnhancedLiquidGlassProps) {
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

    setMousePos({
      x: ((e.clientX - centerX) / rect.width) * 50,
      y: 0, // Lock Y-axis to eliminate vertical mouse following
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

  const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes("firefox")

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
      style={{
        ...glassStyle,
        borderRadius: `${cornerRadius}px`,
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <EnhancedGlassFilter
        id={filterId}
        displacementScale={displacementScale}
        aberrationIntensity={aberrationIntensity}
        width={glassSize.width}
        height={glassSize.height}
      />

      <div
        className="enhanced-glass-container"
        style={{
          borderRadius: `${cornerRadius}px`,
          padding,
          overflow: "hidden",
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "16px",
          transition: "all 0.2s ease-out",
          boxShadow: overLight
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(0, 0, 0, 0.25)",
          isolation: "isolate",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        {/* Backdrop with refraction effects */}
        <div
          className="enhanced-glass-backdrop"
          style={{
            position: "absolute",
            inset: 0,
            filter: isFirefox ? undefined : `url(#${filterId})`,
            backdropFilter: `blur(${(overLight ? 12 : 4) + blurAmount}px) saturate(${saturation}%)`,
            backgroundColor: overLight
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.05)",
            borderRadius: `${cornerRadius}px`,
          }}
        />

        {/* Enhanced dynamic highlight with chromatic aberration feel */}
        <div
          className="enhanced-glass-highlight"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `${cornerRadius}px`,
            background: `linear-gradient(${90 + mousePos.x * 0.5}deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, ${0.08 + Math.abs(mousePos.x) * 0.003}) 40%,
              rgba(255, 255, 255, ${0.2 + Math.abs(mousePos.x) * 0.006}) 60%,
              rgba(255, 255, 255, 0) 100%)`,
            opacity: isHovered ? 1 : 0.7,
            transition: "opacity 0.3s ease-out",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Border effects */}
        <div
          className="enhanced-glass-border"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `${cornerRadius}px`,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `
              0 0 0 0.5px rgba(255, 255, 255, 0.5) inset,
              0 1px 3px rgba(255, 255, 255, 0.25) inset,
              0 1px 4px rgba(0, 0, 0, 0.35)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          className="enhanced-glass-content"
          style={{
            position: "relative",
            zIndex: 1,
            color: "white",
            textShadow: overLight
              ? "0px 2px 12px rgba(0, 0, 0, 0)"
              : "0px 2px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          {children}
        </div>

        {/* Click effect overlay */}
        {onClick && (
          <div
            className="enhanced-glass-click-effect"
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