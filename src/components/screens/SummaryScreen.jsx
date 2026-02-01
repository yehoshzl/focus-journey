import { useEffect } from 'react'
import { useFocusStore } from '../../stores/focusStore'
import { LANDSCAPE_CONFIG } from '../../lib/scene/landscapeConfig'
import { LandscapeOverlay } from '../scene/LandscapeOverlay'

export function SummaryScreen() {
  const { sessionConfig, scene, story, resetSession } = useFocusStore()
  const landscape = LANDSCAPE_CONFIG.landscape_1

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        resetSession()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [resetSession])

  return (
    <LandscapeOverlay landscape={landscape} debugMode={true}>
      {/* Floating Card - Top Right */}
      <div className="absolute top-6 right-6 max-w-sm p-6 backdrop-blur-md bg-stone-900/70 border border-stone-700/50 rounded-xl">
        <h2 className="text-2xl font-bold text-stone-100 mb-3">
          Session Complete!
        </h2>

        <div className="mb-4">
          <p className="text-stone-300 text-sm mb-1">
            You focused for <span className="text-teal-400 font-semibold">{sessionConfig.duration} minutes</span>
          </p>
          {sessionConfig.goal && (
            <p className="text-stone-400 text-sm">
              Working on: {sessionConfig.goal}
            </p>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex gap-6 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{scene.revealedCount}</div>
            <div className="text-stone-400 text-xs">Pieces Revealed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-400">{story.fragments.length}</div>
            <div className="text-stone-400 text-xs">Story Fragments</div>
          </div>
        </div>

        {/* Story Display */}
        {story.fragments.length > 0 && (
          <div className="mb-4 p-3 bg-forest-800/50 rounded-lg max-h-32 overflow-y-auto">
            <h3 className="text-stone-200 font-medium text-sm mb-1">Your Story</h3>
            <p className="text-stone-300 text-xs italic leading-relaxed">
              {story.fragments.join(' ')}
            </p>
          </div>
        )}

        <button
          onClick={resetSession}
          className="w-full px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
        >
          Start New Session
        </button>
      </div>
    </LandscapeOverlay>
  )
}
