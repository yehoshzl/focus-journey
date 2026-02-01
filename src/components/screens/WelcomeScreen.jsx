import { useFocusStore } from '../../stores/focusStore'

export function WelcomeScreen() {
  const setScreen = useFocusStore((state) => state.setScreen)

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h1 className="text-4xl font-bold text-stone-100 mb-4">
        Focus Journey
      </h1>
      <p className="text-stone-200 text-center mb-8 max-w-md">
        Build beautiful scenes while you focus. Each moment of concentration reveals a new piece of your story.
      </p>
      <button
        onClick={() => setScreen('setup')}
        className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
      >
        Begin Your Journey
      </button>
    </div>
  )
}
