"use client"

import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IconHome, IconNotes, IconTarget } from "@tabler/icons-react"

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

// Animation variants
const containerVariants = {
  hidden: {
    y: 100,
    opacity: 0,
    scale: 0.9
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}



export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeItemId, setActiveItemId] = useState<string>(() => {
    // Initialize with correct state immediately
    const exactMatch = navigationItems.find(item => item.path === pathname)
    if (exactMatch) return exactMatch.id
    if (pathname.startsWith("/notes")) return "notes"
    if (pathname.startsWith("/sides")) return "sides"
    return "home"
  })

  const getActiveItem = (currentPath: string) => {
    // Handle exact path matches first
    const exactMatch = navigationItems.find(item => item.path === currentPath)
    if (exactMatch) {
      return exactMatch.id
    }

    // Handle path-based matching for nested routes
    if (currentPath.startsWith("/notes")) {
      return "notes"
    }
    if (currentPath.startsWith("/sides")) {
      return "sides"
    }

    // Default to home for root path or any unmatched path
    return "home"
  }

  // Update active item when pathname changes
  useEffect(() => {
    const newActiveItem = getActiveItem(pathname)
    if (newActiveItem !== activeItemId) {
      setActiveItemId(newActiveItem)
    }
  }, [pathname, activeItemId])

  const activeIndex = navigationItems.findIndex(item => item.id === activeItemId)


  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="backdrop-blur-xl bg-white/20 border border-white/40 rounded-3xl px-3 py-2 shadow-2xl" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <nav className="flex items-center gap-0 relative">
            {/* Smooth sliding active background */}
            <motion.div
              key="active-indicator"
              className="absolute top-0 bottom-0 rounded-full shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,79,0,0.9) 0%, rgba(255,79,0,0.8) 100%)',
                border: '1px solid rgba(255,79,0,0.3)',
                boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.3), 0 4px 12px rgba(255,79,0,0.3)'
              }}
              animate={{
                x: activeIndex * 82,
                width: 82
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
            />

            {navigationItems.map((item, index) => {
              const isActive = activeItemId === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`relative flex items-center gap-2 px-3 py-2.5 rounded-full cursor-pointer transition-all duration-200 min-w-[82px] justify-center ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-900 hover:text-black font-semibold"
                  }`}
                  style={{
                    textShadow: isActive 
                      ? '0 1px 2px rgba(0,0,0,0.3)' 
                      : '0 1px 3px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.6)'
                  }}
                  whileHover={!isActive ? {
                    scale: 1.02,
                    transition: { duration: 0.15 }
                  } : {}}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.08 + 0.2 }
                  }}
                >
                  {/* Subtle hover glow for non-active items */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gray-200/50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative flex items-center gap-2 z-10">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        transition: { duration: 0.2 }
                      }}
                      whileHover={{
                        y: isActive ? 0 : -1,
                        transition: { duration: 0.15 }
                      }}
                      whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <item.icon
                        size={16}
                        className={`${
                          isActive 
                            ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" 
                            : "text-current drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        }`}
                      />
                    </motion.div>

                    <motion.span
                      className={`text-xs whitespace-nowrap ${
                        isActive 
                          ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" 
                          : "text-current drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      }`}
                      animate={{
                        scale: isActive ? 1.02 : 1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </div>

                  {/* Click ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-orange-300/40"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{
                      scale: [0, 1.1],
                      opacity: [0.6, 0],
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.button>
              )
            })}
          </nav>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <motion.div
        className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"
        animate={{
          y: [-10, -20, -10],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -top-1 right-4 w-0.5 h-0.5 bg-white/20 rounded-full"
        animate={{
          y: [-5, -15, -5],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </motion.div>
  )
}