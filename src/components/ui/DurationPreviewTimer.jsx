import { colors, colorWithOpacity } from '../../lib/theme/timerColors'

function formatDuration(minutes) {
  return `${minutes.toString().padStart(2, '0')}:00`
}

function PreviewCircle({ minutes }) {
  const size = 200
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const gradientId = 'previewTimerGradient'

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          width: size - 20,
          height: size - 20,
          borderRadius: '50%',
          backgroundColor: colors.light,
          opacity: 0.15,
          filter: 'blur(30px)',
        }}
      />

      {/* Inner circle background */}
      <div
        style={{
          position: 'absolute',
          width: size - 20,
          height: size - 20,
          borderRadius: '50%',
          backgroundColor: colorWithOpacity(colors.darker, 0.5),
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      <svg width={size} height={size} style={{ position: 'relative', transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.light} />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.dark} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />

        {/* Full progress arc (100% - showing full session ahead) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          style={{
            filter: `drop-shadow(0 0 6px ${colorWithOpacity(colors.primary, 0.5)})`,
          }}
        />
      </svg>

      {/* Timer display in center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '0.05em',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          {formatDuration(minutes)}
        </span>
      </div>
    </div>
  )
}

export function DurationPreviewTimer({ minutes }) {
  return <PreviewCircle minutes={minutes} />
}
