"use client"

import { useState } from "react"
import { IconHome, IconNotes, IconTarget } from "@tabler/icons-react"
import EnhancedLiquidGlass from "@/components/ui/enhanced-liquid-glass"

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "notes", label: "Notes", icon: IconNotes },
  { id: "sides", label: "Sides", icon: IconTarget },
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
        className="backdrop-blur-xl bg-orange-600/70"
      >
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative px-4 py-2 rounded-full transition-all duration-200 ${
                activeItem === item.id
                  ? "text-white bg-white/20 shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon size={18} className="text-current drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                <span className="text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{item.label}</span>
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