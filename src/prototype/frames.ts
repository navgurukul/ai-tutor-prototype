export type Frame = { id: string; label: string; width?: number; height?: number }

// "Fit window" lets the app fill the window. A fixed size draws the app in a
// frame of exactly that size, centred, to check a layout at that size.
export const frames: Frame[] = [
  { id: 'fit', label: 'Fit window' },
  { id: '1366x768', label: '1366 × 768', width: 1366, height: 768 },
  { id: '1280x720', label: '1280 × 720', width: 1280, height: 720 },
  { id: '1920x1080', label: '1920 × 1080', width: 1920, height: 1080 },
  { id: '1024x640', label: '1024 × 640', width: 1024, height: 640 },
]

