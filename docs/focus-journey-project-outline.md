# Focus Journey — Project Outline

## 1. Vision & Core Concept

**One-liner:** A focus timer app where each session reveals a piece of a procedurally-generated story told through illustrated scenes.

**Core loop:**
1. User sets a daily focus goal (e.g., 2 hours)
2. User starts a focus session with a chosen duration
3. While focusing (in background), a hidden scene gradually reveals via jigsaw puzzle pieces
4. When timer completes, user returns to see the revealed scene with narrative text
5. Each session = one scene in a continuous daily story
6. When cumulative focus time reaches the daily goal, the story concludes
7. If users continue after their daily goal, the story continues 
8. User can view the complete story in a recap screen

**Primary motivation model:** Internal motivation supported by beautiful design, smooth UX, and extrinsic reward of story progression.

**Design aesthetic:** "Gamified minimalism" — soft gradients, nature-focused visuals, isometric 3D scenes with 2D illustrated sprites, calming color palette (greens, teals, soft blues).

---

## 2. Terminology

| Term | Definition |
|------|------------|
| **Daily Goal** | Total focus time target for the day (e.g., 120 minutes) |
| **Session** | A single timed focus period with a specific duration |
| **Scene** | One illustrated moment in the story, revealed during a session |
| **Story** | The complete narrative for a day, composed of multiple scenes |
| **Theme** | The environment/setting for a day's story (e.g., Forest, Mountains, Coast) |
| **Journey** | A completed day's worth of focus sessions and their story |
| **Fog of War** | Jigsaw puzzle overlay that hides the scene, pieces fade as timer progresses |

---

## 3. User Flow & Screens

### Screen 1: Welcome / Daily Goal Setting

**Purpose:** Greet user, set intention for the day

**Elements:**
- Greeting based on time of day ("Good morning", "Good afternoon", etc.)
- Slider to set daily focus goal (30m to 10h, in 20m increments)
- "Begin Journey" button

**State created:**
- `dailyGoal`: number (minutes)
- `theme`: randomly selected or user-chosen
- `storyContext`: initial LLM prompt context for story generation

---

### Screen 2: Session Setup

**Purpose:** Configure the upcoming focus session

**Elements:**
- Progress indicator ("Session X • Ym remaining to goal")
- Fogged scene preview (90% hidden, teaser)
- Duration picker
- Back button
- "Start Focus" button

**Variations:**
- If goal already reached: "Bonus session" framing with different messaging
- If this session will complete the goal: Highlight that fact

**State created:**
- `sessionDuration`: number (minutes)
- `sessionNumber`: incremented from previous

---

### Screen 3: Active Focus (Timer)

**Purpose:** Display timer, show progress, hint at scene reveal

**Layout:** Timer-dominant, centered. Small scene card below.

**Elements:**
- Session indicator pill ("Ym focused today")
- Large timer display (MM:SS format, countdown)
- Progress bar
- Small scene preview card:
  - Jigsaw puzzle scene with pieces fading based on progress
- "+25% demo" button (development only)
- "End Early" button (red, secondary)
- When timer reaches 0 session automatically ends

**Background behavior:**
- Store `sessionStartTime` and `sessionDuration` in localStorage
- When user returns, calculate elapsed time and update progress
- Timer continues even if tab is closed/backgrounded

**State updates:**
- `focusProgress`: calculated from elapsed time (0-100%)
- `puzzlePieces`: array with opacity values based on progress

---

### Screen 4: Cinematic Reveal (Overlay)

**Purpose:** Celebrate completion, reveal the scene dramatically

**Trigger:** When timer is done

**Elements:**
- Dimmed background (everything else fades)
- Sparkle emoji or particle effect
- Full-size scene (expanded from small preview)
- Narrative text in styled card below scene
- "Press Enter ↵ or click to continue" prompt

**Behavior:**
- Overlay stays visible until user presses Enter or clicks
- This is the "moment" — let user savor the reveal

**Transition:** On dismiss → Screen 2 (Session Setup). If this is the last session of the journey → Screen 6 (Daily Recap)

---

### Screen 5: Scene Revealed / Session Complete

**Purpose:** Summary of completed session, decide next action

**Elements:**
- Completion emoji (✨ or 🏆 if goal just reached)
- Title ("Scene Revealed" or "Journey Complete!")
- Subtitle (session duration or goal achievement)
- Full-size revealed scene
- Narrative text card
- Progress dots (filled for completed sessions, empty for remaining)
- Stats bar:
  - Scenes completed
  - Total focus time
  - Time to goal (or "Goal reached" checkmark)
- "Continue Journey" button → Session Setup
- "View Full Story" button (if goal reached) → Recap

**Variations:**
- Normal completion: "Continue Journey →"
- Goal just reached: Celebration framing, both "View Full Story" and "Bonus Session →" options
- Already past goal: "Bonus Session →" framing

---

### Screen 6: Daily Recap

**Purpose:** View the complete story from the day

**Elements:**
- Book emoji and title ("Today's Journey")
- Subtitle (session count, total time)
- Story timeline grid:
  - Each card shows scene thumbnail, duration, scene number, narrative excerpt
  - Grid adapts to number of sessions (1-4 columns)
- Final stats panel:
  - Scenes unlocked
  - Total focus time
  - Goal achievement percentage
- "Start New Day →" button (resets everything)

---

## 4. Technical Architecture

### 4.1 Stack

```
Frontend Framework:    React 18+ (Vite)
3D Rendering:          React Three Fiber (R3F) + Drei
State Management:      Zustand (lightweight, persistent)
Styling:               Tailwind CSS + custom CSS for animations
Persistence:           localStorage (phase 1), backend sync (future)
Story Generation:      Anthropic Claude API via serverless proxy
Hosting:               Vercel (frontend + serverless functions)
```

### 4.2 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── TimerDisplay.jsx
│   │   │   ├── DurationPicker.jsx
│   │   │   └── GoalSlider.jsx
│   │   ├── screens/
│   │   │   ├── WelcomeScreen.jsx
│   │   │   ├── SessionSetupScreen.jsx
│   │   │   ├── FocusScreen.jsx
│   │   │   ├── RevealOverlay.jsx
│   │   │   ├── SessionCompleteScreen.jsx
│   │   │   └── RecapScreen.jsx
│   │   └── scene/
│   │       ├── SceneCanvas.jsx         # R3F Canvas wrapper
│   │       ├── IsometricCamera.jsx     # Orthographic camera setup
│   │       ├── Sprite.jsx              # Billboard sprite component
│   │       ├── SceneComposer.jsx       # Assembles sprites based on theme
│   │       ├── JigsawFog.jsx           # Puzzle piece overlay (shader or DOM)
│   │       └── Ground.jsx              # Isometric platform base
│   │
│   ├── hooks/
│   │   ├── useTimer.js                 # Timer logic with background support
│   │   ├── useJigsawPuzzle.js          # Puzzle piece generation & reveal
│   │   ├── useStory.js                 # Story generation orchestration
│   │   └── useLocalStorage.js          # Persistence wrapper
│   │
│   ├── stores/
│   │   └── focusStore.js               # Zustand store for all app state
│   │
│   ├── lib/
│   │   ├── story/
│   │   │   ├── prompts.js              # LLM prompt templates
│   │   │   ├── generator.js            # API call logic
│   │   │   └── themes.js               # Theme definitions
│   │   ├── scene/
│   │   │   ├── composer.js             # Scene composition rules
│   │   │   └── sprites.js              # Sprite registry
│   │   └── timer/
│   │       └── calculator.js           # Time calculations
│   │
│   ├── assets/
│   │   ├── sprites/
│   │   │   ├── forest/
│   │   │   │   ├── tree-pine-1.png
│   │   │   │   ├── tree-oak-1.png
│   │   │   │   ├── flower-pink-1.png
│   │   │   │   ├── rock-mossy-1.png
│   │   │   │   └── ...
│   │   │   ├── meadow/
│   │   │   ├── mountain/
│   │   │   └── coast/
│   │   └── ui/
│   │       └── icons/
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── api/                                 # Vercel serverless functions
│   └── generate-story.js               # Proxy for Claude API
│
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

### 4.3 State Management (Zustand Store)

```javascript
// stores/focusStore.js

const useFocusStore = create(
  persist(
    (set, get) => ({
      // Daily state
      dailyGoal: 120,                    // minutes
      totalFocusedTime: 0,               // minutes accumulated today
      currentSession: 1,
      completedSessions: [],             // array of session objects
      theme: 'forest',
      storyContext: null,                // LLM context for continuity
      
      // Active session state
      sessionDuration: 30,               // minutes
      sessionStartTime: null,            // timestamp when session started
      sessionStatus: 'idle',             // 'idle' | 'active' | 'completed'
      
      // UI state
      currentScreen: 'welcome',
      showRevealOverlay: false,
      
      // Puzzle state
      puzzlePieces: [],
      
      // Actions
      setDailyGoal: (goal) => set({ dailyGoal: goal }),
      setSessionDuration: (duration) => set({ sessionDuration: duration }),
      startSession: () => set({ 
        sessionStartTime: Date.now(), 
        sessionStatus: 'active',
        currentScreen: 'focus'
      }),
      completeSession: (sceneData) => {
        const { completedSessions, currentSession, sessionDuration, totalFocusedTime } = get();
        set({
          completedSessions: [...completedSessions, {
            session: currentSession,
            duration: sessionDuration,
            scene: sceneData,
            completedAt: Date.now()
          }],
          totalFocusedTime: totalFocusedTime + sessionDuration,
          currentSession: currentSession + 1,
          sessionStatus: 'completed',
          sessionStartTime: null
        });
      },
      resetDay: () => set({
        totalFocusedTime: 0,
        currentSession: 1,
        completedSessions: [],
        storyContext: null,
        sessionStatus: 'idle',
        currentScreen: 'welcome'
      }),
      // ... more actions
    }),
    {
      name: 'focus-journey-storage',
      partialize: (state) => ({
        // Only persist certain fields
        dailyGoal: state.dailyGoal,
        totalFocusedTime: state.totalFocusedTime,
        currentSession: state.currentSession,
        completedSessions: state.completedSessions,
        theme: state.theme,
        storyContext: state.storyContext,
        sessionDuration: state.sessionDuration,
        sessionStartTime: state.sessionStartTime,
        sessionStatus: state.sessionStatus,
      })
    }
  )
);
```

### 4.4 Timer Logic (Background-Aware)

```javascript
// hooks/useTimer.js

function useTimer() {
  const { sessionStartTime, sessionDuration, sessionStatus } = useFocusStore();
  const [progress, setProgress] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  
  useEffect(() => {
    if (sessionStatus !== 'active' || !sessionStartTime) {
      return;
    }
    
    const calculateProgress = () => {
      const elapsed = (Date.now() - sessionStartTime) / 1000 / 60; // minutes
      const pct = Math.min(100, (elapsed / sessionDuration) * 100);
      const remaining = Math.max(0, sessionDuration * 60 - elapsed * 60);
      
      setProgress(pct);
      setRemainingSeconds(Math.ceil(remaining));
    };
    
    // Calculate immediately (handles returning to tab)
    calculateProgress();
    
    // Update every second
    const interval = setInterval(calculateProgress, 1000);
    
    return () => clearInterval(interval);
  }, [sessionStartTime, sessionDuration, sessionStatus]);
  
  const isComplete = progress >= 100;
  
  return { progress, remainingSeconds, isComplete };
}
```

---

## 5. Data Models

### 5.1 Session Object

```typescript
interface Session {
  session: number;           // Session number (1, 2, 3...)
  duration: number;          // Duration in minutes
  scene: SceneData;          // The revealed scene
  completedAt: number;       // Timestamp
}
```

### 5.2 Scene Data

```typescript
interface SceneData {
  narrative: string;         // The story text for this scene
  position: string;          // 'arrival' | 'traversal' | 'discovery' | 'destination' | 'bonus'
  elements: SceneElement[];  // Sprites to render
  palette: ColorPalette;     // Time-of-day / mood colors
}

interface SceneElement {
  sprite: string;            // Sprite asset path
  position: [number, number, number];  // 3D position
  scale: number;
  rotation?: number;
}
```

### 5.3 Theme Definition

```typescript
interface Theme {
  id: string;                // 'forest', 'meadow', 'mountain', 'coast'
  name: string;              // Display name
  sprites: {
    trees: string[];         // Array of sprite paths
    flowers: string[];
    rocks: string[];
    special: string[];       // Theme-specific elements
  };
  groundColor: string;
  skyGradient: [string, string];
  narrativeKeywords: string[];  // For LLM prompt
}
```

### 5.4 Puzzle Piece

```typescript
interface PuzzlePiece {
  id: string;                // "row-col"
  row: number;
  col: number;
  revealIndex: number;       // Order in which to reveal (randomized)
  opacity: number;           // 0-1, animated based on progress
  tabs: {
    top: boolean | null;     // true = outward, false = inward, null = edge
    right: boolean | null;
    bottom: boolean | null;
    left: boolean | null;
  };
}
```

---

## 6. Asset System

### 6.1 Sprite Library Structure

Each theme has a folder with categorized sprites:

```
/assets/sprites/forest/
  /trees/
    tree-pine-large.png      # 512x512, transparent
    tree-pine-small.png
    tree-oak-1.png
    tree-willow-1.png
  /flowers/
    flower-pink-cluster.png
    flower-purple-single.png
    flower-yellow-patch.png
  /rocks/
    rock-mossy-large.png
    rock-small.png
    rock-cluster.png
  /special/
    mushroom-red.png
    fallen-log.png
    stream-segment.png
  /ground/
    grass-tile.png
    path-dirt.png
```

### 6.2 Sprite Requirements

- **Format:** PNG with transparency
- **Size:** Base resolution of 256x256 or 512x512
- **Style:** Soft illustrated look, consistent with reference aesthetic
- **Normalization:** Each sprite should be centered, with consistent "ground level"

### 6.3 Scene Composition Rules

The `SceneComposer` assembles sprites based on:

1. **Theme:** Determines available sprite pool
2. **Scene position in journey:**
   - Arrival: More open, fewer elements, "edge" feeling
   - Traversal: Dense, immersive, surrounded
   - Discovery: Focal point element (special sprite)
   - Destination: Open again, sense of completion
3. **Randomization:** Within rules, positions/sprites vary
4. **Density:** Number of elements based on scene type

```javascript
// Example composition rule
const compositionRules = {
  arrival: {
    trees: { count: [2, 4], positions: 'perimeter' },
    flowers: { count: [1, 3], positions: 'scattered' },
    rocks: { count: [0, 2], positions: 'scattered' },
    special: { count: 0 }
  },
  traversal: {
    trees: { count: [4, 7], positions: 'dense' },
    flowers: { count: [2, 5], positions: 'clusters' },
    rocks: { count: [1, 3], positions: 'scattered' },
    special: { count: [0, 1] }
  },
  // ...
};
```

---

## 7. Story Generation System

### 7.1 LLM Integration

**API Endpoint:** `/api/generate-story.js` (Vercel serverless)

**Request:**
```javascript
{
  theme: 'forest',
  sceneNumber: 2,
  totalScenes: 4,              // Estimated based on goal/typical session length
  previousScenes: [
    { narrative: "You arrive at the edge..." }
  ],
  isNearGoal: false,
  isPastGoal: false,
  dailyGoalMinutes: 120,
  completedMinutes: 30
}
```

**Response:**
```javascript
{
  narrative: "The quiet is disturbed only by chirping birds...",
  position: "traversal",
  mood: "contemplative",
  suggestedElements: ["dense trees", "small stream", "wildflowers"]
}
```

### 7.2 Prompt Template

```
You are a narrative designer creating ambient, atmospheric micro-stories for a focus timer app.

Theme: {theme}
Scene: {sceneNumber} of approximately {totalScenes}
Journey progress: {completedMinutes} of {dailyGoalMinutes} minutes

Previous scenes:
{previousScenes}

Write a single short narrative passage (1-2 sentences) for this scene. 

Guidelines:
- Second person ("You...") perspective
- Evocative and sensory, not action-heavy
- Match the theme's environment ({theme})
- Build on previous scenes if provided
- If this is near the goal, begin wrapping up the journey
- If this is past the goal, treat as a "bonus" discovery
- Tone: peaceful, slightly mysterious, rewarding

Return JSON:
{
  "narrative": "Your passage here...",
  "position": "arrival|traversal|discovery|destination|bonus",
  "mood": "one word mood descriptor"
}
```

### 7.3 Story Continuity

The `storyContext` in state maintains:
- Theme for the day
- Summary of previous scenes
- Any "threads" introduced (e.g., "the distant sound of water" can lead to "discovering a stream")

This context is passed to each generation call to maintain coherence.

---

## 8. Scene Rendering (R3F)

### 8.1 Canvas Setup

```jsx
// components/scene/SceneCanvas.jsx

function SceneCanvas({ sceneData, fogProgress, small = false }) {
  return (
    <div className={small ? 'w-[280px] h-[160px]' : 'w-[600px] h-[340px]'}>
      <Canvas>
        <IsometricCamera />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.5} />
        
        <Ground theme={sceneData.theme} />
        
        {sceneData.elements.map((element, i) => (
          <Sprite
            key={i}
            texture={element.sprite}
            position={element.position}
            scale={element.scale}
          />
        ))}
        
        <JigsawFog progress={fogProgress} />
      </Canvas>
    </div>
  );
}
```

### 8.2 Isometric Camera

```jsx
// components/scene/IsometricCamera.jsx

function IsometricCamera() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    camera.zoom = 50;
    camera.updateProjectionMatrix();
  }, [camera]);
  
  return <OrthographicCamera makeDefault />;
}
```

### 8.3 Sprite Component

```jsx
// components/scene/Sprite.jsx

function Sprite({ texture, position, scale = 1 }) {
  const tex = useTexture(texture);
  
  return (
    <Billboard position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial map={tex} transparent alphaTest={0.5} />
    </Billboard>
  );
}
```

### 8.4 Jigsaw Fog Options

**Option A: DOM Overlay (simpler)**
- Render SVG jigsaw pieces as a DOM layer over the canvas
- Easier to implement, matches wireframe approach
- Pieces fade via CSS opacity transitions

**Option B: Shader-based (more advanced)**
- Custom shader material that renders fog with jigsaw cutouts
- Better integration with 3D scene
- More complex to implement

**Recommendation:** Start with DOM overlay (Option A), upgrade later if needed.

---

## 9. Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Project setup (Vite, React, Tailwind, R3F)
- [ ] Zustand store with localStorage persistence
- [ ] All screens implemented (static, no 3D yet)
- [ ] Timer logic with background support
- [ ] Basic jigsaw fog (DOM-based)
- [ ] Hardcoded scenes (no LLM yet)

**Deliverable:** Functional timer app with placeholder scenes

### Phase 2: Scene Rendering
- [ ] R3F canvas integration
- [ ] Isometric camera setup
- [ ] Sprite component with Billboard
- [ ] Ground/platform component
- [ ] Scene composer (assembles sprites from rules)
- [ ] First theme asset set (Forest)

**Deliverable:** Dynamic 3D scenes with 2D sprites

### Phase 3: Story Generation
- [ ] Vercel serverless function for Claude API
- [ ] Prompt templates
- [ ] Story context management
- [ ] Scene-to-element mapping (LLM suggests, composer interprets)

**Deliverable:** Unique generated stories each day

### Phase 4: Polish
- [ ] Animations (screen transitions, reveals)
- [ ] Sound design (ambient, completion chime)
- [ ] Additional themes (Meadow, Mountain, Coast)
- [ ] Responsive design (mobile support)
- [ ] PWA setup (installable, offline-capable)

### Phase 5: Future Features
- [ ] Browser notifications (permission-based)
- [ ] User accounts + cloud sync
- [ ] Journey history (past days)
- [ ] Theme selection
- [ ] Custom session durations
- [ ] Social sharing of stories
- [ ] Statistics and streaks

---

## 10. Open Questions & Decisions

### Resolved
- ✅ Timer runs in background → Store start time, calculate on return
- ✅ Session = Scene model → Story length varies with session count
- ✅ PNG sprites for illustrated style
- ✅ Jigsaw reveals randomly with fade effect
- ✅ Reveal waits for user input (Enter/click)
- ✅ localStorage for MVP, backend later
- ✅ localStorage for MVP, backend later
- ✅ theme is chosen daily, randomly based on a preset logic (either based on number of assets or randomly generated)
- ✅ If a user doesn’t finish their daily goal the story is left incomplete
- ✅ No pause feature
- ✅ Day rollover: resets at 2AM local time
- ✅ 1 min minimum session length time

---

## 11. Reference & Inspiration

**Visual reference:** Flora app (uploaded image) — isometric illustrated scenes, nature themes, gamified focus

**Aesthetic keywords:**
- Gamified minimalism
- Cozy game aesthetic
- Soft gradients
- Nature-focused
- Isometric 2.5D
- Kawaii-influenced illustration

**Color palette (from wireframe):**
- Primary greens: `#065f46`, `#047857`, `#059669`, `#10b981`, `#4ade80`, `#86efac`, `#a7f3d0`
- Accent teals: `#0d9488`, `#14b8a6`, `#22d3ee`
- Neutrals: `#2d3748`, `#64748b`, `#94a3b8`, `#e2e8f0`, `#f8fafc`
- Accent flowers: `#f9a8d4` (pink), `#c4b5fd` (purple), `#fcd34d` (yellow)

---

## 12. Success Metrics

**User goals:**
- Complete daily focus goals consistently
- Feel rewarded and motivated by story progression
- Enter flow states during focus sessions

**Product metrics:**
- Daily active users
- Sessions per day
- Goal completion rate
- Retention (7-day, 30-day)
- Session duration distribution

---

*Document version: 1.0*
*Last updated: January 2026*
