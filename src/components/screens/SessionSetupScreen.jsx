import { useFocusStore } from '../../stores/focusStore'
import { DurationPreviewTimer } from '../ui/DurationPreviewTimer'
import { colors, colorWithOpacity } from '../../lib/theme/timerColors'

const DURATIONS = [15, 25, 45, 60]
const THEMES = ['forest', 'meadow', 'mountain', 'coast']

export function SessionSetupScreen() {
  const { sessionConfig, setSessionConfig, startSession, setScreen } = useFocusStore()

  const cardStyle = {
    padding: '24px',
    borderRadius: '24px',
    backdropFilter: 'blur(16px)',
    background: `linear-gradient(145deg, ${colorWithOpacity(colors.darker, 0.9)}, ${colorWithOpacity(colors.darkest, 0.95)})`,
    boxShadow: `0 8px 32px ${colorWithOpacity(colors.darkest, 0.5)}, inset 0 1px 0 rgba(255,255,255,0.05)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '320px',
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <button
        onClick={() => setScreen('welcome')}
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200"
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-semibold text-stone-100 mb-6">
        Set Up Your Session
      </h2>

      {/* Timer Preview Card with Duration Selection */}
      <div style={cardStyle}>
        <DurationPreviewTimer minutes={sessionConfig.duration} />

        {/* Duration Preset Buttons */}
        <div className="flex gap-2 w-full">
          {DURATIONS.map((duration) => (
            <button
              key={duration}
              onClick={() => setSessionConfig({ duration })}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: '12px',
                fontWeight: 500,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: sessionConfig.duration === duration
                  ? colors.primary
                  : 'rgba(255,255,255,0.05)',
                color: sessionConfig.duration === duration
                  ? colors.text
                  : colorWithOpacity(colors.text, 0.6),
                boxShadow: sessionConfig.duration === duration
                  ? `0 2px 12px ${colorWithOpacity(colors.primary, 0.4)}`
                  : 'none',
              }}
            >
              {duration}m
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mt-6 w-full max-w-md">
        <label className="block text-stone-300 mb-3">Theme</label>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => setSessionConfig({ theme })}
              className={`py-3 rounded-lg capitalize transition-colors ${
                sessionConfig.theme === theme
                  ? 'bg-teal-600 text-white'
                  : 'bg-forest-800 text-stone-300 hover:bg-forest-700'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Input */}
      <div className="mt-6 w-full max-w-md">
        <label className="block text-stone-300 mb-3">What will you focus on?</label>
        <input
          type="text"
          value={sessionConfig.goal}
          onChange={(e) => setSessionConfig({ goal: e.target.value })}
          placeholder="e.g., Write documentation..."
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
