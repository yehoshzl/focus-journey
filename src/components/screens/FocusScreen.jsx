import { useEffect } from 'react'
import { useFocusStore } from '../../stores/focusStore'
import { SceneCanvas } from '../scene/SceneCanvas'
import { CircularTimer } from '../ui/CircularTimer'
import { LandscapeReveal } from '../scene/LandscapeReveal'

export function FocusScreen() {
  const { timer, tick, pauseTimer, resumeTimer, giveUpSession, skipToEnd, setScreen } = useFocusStore()

  useEffect(() => {
    if (!timer.isRunning) return

    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [timer.isRunning, tick])

  useEffect(() => {
    if (timer.remaining <= 0 && timer.total > 0) {
      setScreen('summary')
    }
  }, [timer.remaining, timer.total, setScreen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        giveUpSession()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (timer.isPaused) {
          resumeTimer()
        } else {
          pauseTimer()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [giveUpSession, timer.isPaused, pauseTimer, resumeTimer])

  // Calculate progress (0-1) based on elapsed time
  const progress = timer.total > 0 ? (timer.total - timer.remaining) / timer.total : 0

  return (
    <div className="relative w-full h-full">
      {/* 3D Scene */}
      <SceneCanvas />

      {/* Landscape Card - Upper Right */}
      <div className="absolute top-4 right-4">
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ width: 280, height: 200 }}>
          <LandscapeReveal imageSrc="/assets/landscape 1.png" progress={progress} />
        </div>
      </div>

      {/* Timer Overlay - Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <CircularTimer
            remaining={timer.remaining}
            total={timer.total}
            isPaused={timer.isPaused}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onGiveUp={giveUpSession}
          />
        </div>
      </div>

      {/* Debug Button */}
      <button
        onClick={skipToEnd}
        className="absolute bottom-4 right-4 px-3 py-1 text-xs bg-stone-800/80 hover:bg-stone-700 text-stone-400 rounded border border-stone-600"
      >
        Skip to End
      </button>
    </div>
  )
}
