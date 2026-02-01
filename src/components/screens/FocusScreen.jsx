import { useEffect } from 'react'
import { useFocusStore } from '../../stores/focusStore'
import { SceneCanvas } from '../scene/SceneCanvas'
import { CircularTimer } from '../ui/CircularTimer'

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
