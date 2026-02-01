import { colors, colorWithOpacity } from '../../lib/theme/timerColors'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function CircleTimer({ remaining, total, isPaused }) {
  const size = 280
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const progress = total > 0 ? (total - remaining) / total : 0
  const strokeDashoffset = circumference * (1 - progress)
  const gradientId = 'timerGradient'

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
          opacity: Math.max(0.15, progress * 0.25),
          filter: 'blur(40px)',
          transition: 'opacity 0.7s ease',
        }}
      />

      {/* Inner circle background */}
      <div
        style={{
          position: 'absolute',
          width: size - 24,
          height: size - 24,
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

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
            filter: `drop-shadow(0 0 8px ${colorWithOpacity(colors.primary, 0.6)})`,
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
            fontSize: '3.5rem',
            fontWeight: 300,
            color: colors.text,
            letterSpacing: '0.05em',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          {formatTime(remaining)}
        </span>
        <span
          style={{
            fontSize: '0.875rem',
            marginTop: '0.5rem',
            letterSpacing: '0.05em',
            color: colorWithOpacity(colors.light, 0.7),
          }}
        >
          {isPaused ? 'paused' : 'focusing...'}
        </span>
      </div>
    </div>
  )
}

export function CircularTimer({ remaining, total, isPaused, onPause, onResume, onGiveUp }) {
  const cardStyle = {
    padding: '32px',
    borderRadius: '24px',
    backdropFilter: 'blur(16px)',
    background: `linear-gradient(145deg, ${colorWithOpacity(colors.darker, 0.9)}, ${colorWithOpacity(colors.darkest, 0.95)})`,
    boxShadow: `0 8px 32px ${colorWithOpacity(colors.darkest, 0.5)}, inset 0 1px 0 rgba(255,255,255,0.05)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  }

  const primaryButtonStyle = {
    padding: '16px 32px',
    borderRadius: '12px',
    fontWeight: 500,
    color: colors.text,
    border: 'none',
    cursor: 'pointer',
    background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.dark} 100%)`,
    boxShadow: `0 4px 24px ${colorWithOpacity(colors.primary, 0.3)}, inset 0 1px 0 rgba(255,255,255,0.15)`,
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    fontSize: '1rem',
  }

  const pauseButtonStyle = {
    ...primaryButtonStyle,
    color: colors.darkest,
    background: `linear-gradient(135deg, ${colors.warningLight} 0%, ${colors.warning} 100%)`,
    boxShadow: `0 4px 24px ${colorWithOpacity(colors.warning, 0.4)}, inset 0 1px 0 rgba(255,255,255,0.2)`,
  }

  const ghostButtonStyle = {
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: 500,
    color: colorWithOpacity(colors.danger, 0.8),
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `1px solid ${colorWithOpacity(colors.danger, 0.3)}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '1rem',
  }

  return (
    <div style={cardStyle}>
      <CircleTimer remaining={remaining} total={total} isPaused={isPaused} />

      <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
        {!isPaused ? (
          <button onClick={onPause} style={{ ...pauseButtonStyle, width: '100%' }}>
            Pause
          </button>
        ) : (
          <>
            <button onClick={onResume} style={{ ...primaryButtonStyle, flex: 1 }}>
              Resume
            </button>
            <button onClick={onGiveUp} style={ghostButtonStyle}>
              Give Up
            </button>
          </>
        )}
      </div>
    </div>
  )
}
