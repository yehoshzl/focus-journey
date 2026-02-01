import { useFocusStore } from './stores/focusStore'
import {
  WelcomeScreen,
  SessionSetupScreen,
  FocusScreen,
  SummaryScreen,
} from './components/screens'

function App() {
  const currentScreen = useFocusStore((state) => state.currentScreen)

  return (
    <div className="w-full h-full bg-forest-900">
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'setup' && <SessionSetupScreen />}
      {currentScreen === 'focus' && <FocusScreen />}
      {currentScreen === 'summary' && <SummaryScreen />}
    </div>
  )
}

export default App
