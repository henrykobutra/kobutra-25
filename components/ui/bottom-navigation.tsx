"use client"

import { useState } from "react"
import EnhancedLiquidGlass from "@/components/ui/enhanced-liquid-glass"

interface NavigationItem {
  id: string
  label: string
  icon?: string
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "notes", label: "Notes", icon: "📝" },
  { id: "sides", label: "Sides", icon: "🎯" },
]

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <EnhancedLiquidGlass
        displacementScale={15}
        blurAmount={6}
        saturation={140}
        aberrationIntensity={1.5}
        cornerRadius={24}
        padding="12px 16px"
        className="backdrop-blur-xl"
      >
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                activeItem === item.id
                  ? "text-white bg-white/20"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>

              {/* Active indicator */}
              {activeItem === item.id && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/20 border border-white/20" />
              )}
            </button>
          ))}
        </nav>
      </EnhancedLiquidGlass>
    </div>
  )
}