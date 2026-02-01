import { useFocusStore } from '../../stores/focusStore'

export function SummaryScreen() {
  const { sessionConfig, scene, story, resetSession } = useFocusStore()

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-3xl font-bold text-stone-100 mb-4">
        Session Complete!
      </h2>

      <div className="text-center mb-8">
        <p className="text-stone-300 mb-2">
          You focused for <span className="text-teal-400 font-semibold">{sessionConfig.duration} minutes</span>
        </p>
        {sessionConfig.goal && (
          <p className="text-stone-400">
            Working on: {sessionConfig.goal}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-400">{scene.revealedCount}</div>
          <div className="text-stone-400 text-sm">Pieces Revealed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-teal-400">{story.fragments.length}</div>
          <div className="text-stone-400 text-sm">Story Fragments</div>
        </div>
      </div>

      {/* Story Display */}
      {story.fragments.length > 0 && (
        <div className="max-w-lg mb-8 p-4 bg-forest-800 rounded-lg">
          <h3 className="text-stone-200 font-medium mb-2">Your Story</h3>
          <p className="text-stone-300 text-sm italic">
            {story.fragments.join(' ')}
          </p>
        </div>
      )}

      <button
        onClick={resetSession}
        className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
      >
        Start New Session
      </button>
    </div>
  )
}
