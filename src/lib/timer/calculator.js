// Timer calculation utilities placeholder

export function calculateRevealInterval(totalDuration, totalPieces) {
  // Calculate how often to reveal a new piece
  return (totalDuration * 60) / totalPieces // seconds per piece
}

export function calculateProgress(elapsed, total) {
  if (total <= 0) return 0
  return Math.min(elapsed / total, 1)
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}
