import { useEffect, useRef } from 'react'
import { useFocusStore } from '../../stores/focusStore'
import { DurationPreviewTimer } from '../ui/DurationPreviewTimer'
import { LandscapeReveal } from '../scene/LandscapeReveal'

export function SessionSetupScreen() {
  const { sessionConfig, setSessionConfig, startSession, setScreen } = useFocusStore()
  const digitBuffer = useRef('')
  const digitTimeout = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSessionConfig({ duration: Math.min(sessionConfig.duration + 1, 120) })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSessionConfig({ duration: Math.max(sessionConfig.duration - 1, 1) })
      } else if (e.key === 'Enter') {
        e.preventDefault()
        startSession()
      } else if (e.key >= '0' && e.key <= '9') {
        e.preventDefault()
        clearTimeout(digitTimeout.current)
        digitBuffer.current += e.key
        const value = parseInt(digitBuffer.current, 10)
        if (value >= 1 && value <= 120) {
          setSessionConfig({ duration: value })
        }
        digitTimeout.current = setTimeout(() => {
          digitBuffer.current = ''
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sessionConfig.duration, setSessionConfig, startSession])

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <button
        onClick={() => setScreen('welcome')}
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200"
      >
        &larr; Back
      </button>

      {/* Landscape Teaser - Upper Right */}
      <div className="absolute top-4 right-4">
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ width: 280, height: 200 }}>
          <LandscapeReveal imageSrc="/assets/landscape 1.png" progress={0} />
        </div>
      </div>

      <DurationPreviewTimer minutes={sessionConfig.duration} />

      {/* Goal Input */}
      <div className="mt-8 w-full max-w-md">
        <input
          type="text"
          value={sessionConfig.goal}
          onChange={(e) => setSessionConfig({ goal: e.target.value })}
          placeholder="What will you focus on?"
          className="w-full px-4 py-3 bg-forest-800 text-stone-100 rounded-lg border border-forest-700 focus:border-teal-500 focus:outline-none"
        />
      </div>

      <button
        onClick={startSession}
        className="mt-6 px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
      >
        Start Focus Session
      </button>
    </div>
  )
}
