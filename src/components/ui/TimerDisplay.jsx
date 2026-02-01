export function TimerDisplay({ remaining, total, isPaused, onPause, onResume }) {
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const progress = total > 0 ? ((total - remaining) / total) * 100 : 0

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-forest-800/90 backdrop-blur-sm rounded-2xl">
      {/* Time Display */}
      <div className="text-5xl font-mono font-bold text-stone-100">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-forest-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Pause/Resume Button */}
      <button
        onClick={isPaused ? onResume : onPause}
        className="px-6 py-2 bg-forest-700 hover:bg-forest-600 text-stone-200 rounded-lg transition-colors"
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}
