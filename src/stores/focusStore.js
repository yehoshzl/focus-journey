import { create } from 'zustand'

export const useFocusStore = create((set, get) => ({
  // App State
  currentScreen: 'welcome', // 'welcome' | 'setup' | 'focus' | 'break' | 'summary'

  // Session Configuration
  sessionConfig: {
    duration: 25, // minutes
    theme: 'forest',
    goal: '',
  },

  // Timer State
  timer: {
    remaining: 0, // seconds
    total: 0, // seconds
    isRunning: false,
    isPaused: false,
  },

  // Scene State
  scene: {
    sprites: [],
    revealedCount: 0,
    totalPieces: 0,
  },

  // Story State
  story: {
    fragments: [],
    currentFragment: null,
  },

  // Actions
  setScreen: (screen) => set({ currentScreen: screen }),

  setSessionConfig: (config) => set((state) => ({
    sessionConfig: { ...state.sessionConfig, ...config }
  })),

  startSession: () => {
    const { sessionConfig } = get()
    const totalSeconds = sessionConfig.duration * 60
    set({
      currentScreen: 'focus',
      timer: {
        remaining: totalSeconds,
        total: totalSeconds,
        isRunning: true,
        isPaused: false,
      }
    })
  },

  pauseTimer: () => set((state) => ({
    timer: { ...state.timer, isRunning: false, isPaused: true }
  })),

  resumeTimer: () => set((state) => ({
    timer: { ...state.timer, isRunning: true, isPaused: false }
  })),

  tick: () => set((state) => {
    if (!state.timer.isRunning || state.timer.remaining <= 0) return state
    return {
      timer: { ...state.timer, remaining: state.timer.remaining - 1 }
    }
  }),

  addSprite: (sprite) => set((state) => ({
    scene: {
      ...state.scene,
      sprites: [...state.scene.sprites, sprite],
      revealedCount: state.scene.revealedCount + 1,
    }
  })),

  addStoryFragment: (fragment) => set((state) => ({
    story: {
      ...state.story,
      fragments: [...state.story.fragments, fragment],
      currentFragment: fragment,
    }
  })),

  giveUpSession: () => set({
    currentScreen: 'summary',
    timer: {
      ...get().timer,
      isRunning: false,
      isPaused: false,
    },
  }),

  resetSession: () => set({
    currentScreen: 'welcome',
    timer: {
      remaining: 0,
      total: 0,
      isRunning: false,
      isPaused: false,
    },
    scene: {
      sprites: [],
      revealedCount: 0,
      totalPieces: 0,
    },
    story: {
      fragments: [],
      currentFragment: null,
    },
  }),
}))
