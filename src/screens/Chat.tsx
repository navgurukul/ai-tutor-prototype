import { PanelLeftOpen } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Drawer from '../components/Drawer.tsx'
import IconButton from '../components/IconButton.tsx'
import Sidebar from '../components/Sidebar.tsx'
import VoiceControl from '../components/VoiceControl.tsx'
import { animalOf } from '../data/animals.ts'
import { chatsOf, useStore } from '../state/storeContext.ts'
import styles from './Chat.module.css'
import Conversation from './Conversation.tsx'
import { useSidebarMode } from './useSidebarMode.ts'
import { useTitles } from './useTitles.ts'

// The chat screen: the sidebar, the voice control, and one conversation.
export default function Chat() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const profile = state.profiles.find((item) => item.id === state.activeProfileId)

  // Every profile entry and every New chat starts on an empty chat, which
  // has no id until its first question is sent.
  const [chatId, setChatId] = useState<string | null>(null)
  // Changes when the student moves to another chat, so nothing typed or
  // heard in the last one carries over.
  const [visit, setVisit] = useState(0)

  const [screen, setScreen] = useState<HTMLDivElement | null>(null)
  const mode = useSidebarMode(screen)
  const [drawerWanted, setDrawerWanted] = useState(false)
  const drawerOpen = drawerWanted && mode !== 'full'
  const closeDrawer = useCallback(() => setDrawerWanted(false), [setDrawerWanted])

  const titles = useTitles()

  // Nobody is signed in after a relaunch, so the app starts again from the top.
  if (!profile) return <Navigate to="/" replace />

  const chats = chatsOf(state, profile.id)
  const chat = chats.find((item) => item.id === chatId)

  function open(id: string | null) {
    // Leaving a chat cuts its answer short, which is as finished as it gets.
    if (chat) titles.request(chat)
    setChatId(id)
    setVisit(visit + 1)
    setDrawerWanted(false)
  }

  // Switch and the idle return both end here. The speech stops as the chat
  // closes, and the next student starts from the picker.
  function leave() {
    dispatch({ type: 'profile/enter', profileId: null })
    navigate('/')
  }

  const sidebar = {
    profile: { name: profile.name, animal: animalOf(profile.animalId) },
    chats,
    activeChatId: chat?.id,
    onNewChat: () => open(null),
    onOpenChat: open,
    onSwitch: leave,
  }

  return (
    <div className={styles.chat} ref={setScreen}>
      {mode !== 'drawer' && <Sidebar {...sidebar} variant={mode} onExpand={() => setDrawerWanted(true)} />}

      <main className={styles.main}>
        <div className={styles.top}>
          {mode === 'drawer' && (
            <IconButton label="Show recent chats" className={styles.menu} onClick={() => setDrawerWanted(true)}>
              <PanelLeftOpen aria-hidden="true" />
            </IconButton>
          )}
          <VoiceControl
            voiceOn={state.settings.voiceOn}
            speed={state.settings.speed}
            onVoice={(voiceOn) => dispatch({ type: 'settings/set', settings: { voiceOn } })}
            onSpeed={(speed) => dispatch({ type: 'settings/set', settings: { speed } })}
          />
        </div>
        <Conversation
          key={visit}
          profile={profile}
          chat={chat}
          onCreated={setChatId}
          onAsk={titles.drop}
          onSettled={titles.request}
          onIdle={leave}
        />
      </main>

      <Drawer open={drawerOpen} onClose={closeDrawer} label="Chats and profile">
        <Sidebar {...sidebar} />
      </Drawer>
    </div>
  )
}
