"use client"

import { usePathname, useRouter } from "next/navigation"
import { IconHome, IconNotes, IconTarget } from "@tabler/icons-react"
import EnhancedLiquidGlass from "@/components/ui/enhanced-liquid-glass"

interface NavigationItem {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home", path: "/", icon: IconHome },
  { id: "notes", label: "Notes", path: "/notes", icon: IconNotes },
  { id: "sides", label: "Sides", path: "/sides", icon: IconTarget },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const getActiveItem = () => {
    const item = navigationItems.find(item => item.path === pathname)
    return item?.id || "home"
  }

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
              onClick={() => router.push(item.path)}
              className={`relative px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                getActiveItem() === item.id
                  ? "text-white bg-white/20 shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon size={18} className="text-current drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                <span className="text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{item.label}</span>
              </div>

              {/* Active indicator */}
              {getActiveItem() === item.id && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/20 border border-white/20" />
              )}
            </button>
          ))}
        </nav>
      </EnhancedLiquidGlass>
    </div>
  )
}