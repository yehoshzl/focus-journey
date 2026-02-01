import { useEffect } from 'react'
import { useFocusStore } from '../../stores/focusStore'
import { SceneCanvas } from '../scene/SceneCanvas'
import { CircularTimer } from '../ui/CircularTimer'

export function FocusScreen() {
  const { timer, tick, pauseTimer, resumeTimer, giveUpSession, setScreen } = useFocusStore()

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

  return (
    <div className="relative w-full h-full">
      {/* 3D Scene */}
      <SceneCanvas />

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
    </div>
  )
}
