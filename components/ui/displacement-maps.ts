// Simple displacement map for glass refraction effects
// This creates a radial gradient that simulates glass thickness variation
export const createDisplacementMap = (): string => {
  const canvas = document.createElement('canvas')
  const size = 200
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext('2d')!
  const imageData = ctx.createImageData(size, size)
  const data = imageData.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const centerX = size / 2
      const centerY = size / 2

      // Distance from center
      const dx = (x - centerX) / centerX
      const dy = (y - centerY) / centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Create a smooth radial displacement
      const intensity = Math.max(0, 1 - distance)
      const displacement = intensity * 0.3 // Scale displacement

      // Calculate displacement directions
      const dispX = dx * displacement
      const dispY = dy * displacement

      const pixelIndex = (y * size + x) * 4

      // Store displacement in R and G channels, normalized to 0-255
      data[pixelIndex] = (dispX + 0.5) * 255     // Red: X displacement
      data[pixelIndex + 1] = (dispY + 0.5) * 255 // Green: Y displacement
      data[pixelIndex + 2] = (dispY + 0.5) * 255 // Blue: Y displacement (for compatibility)
      data[pixelIndex + 3] = 255                 // Alpha: fully opaque
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas.toDataURL()
}

// Cached displacement map
let cachedDisplacementMap: string | null = null

export const getDisplacementMap = (): string => {
  if (!cachedDisplacementMap) {
    cachedDisplacementMap = createDisplacementMap()
  }
  return cachedDisplacementMap
}