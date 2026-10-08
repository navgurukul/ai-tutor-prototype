import { PanelLeftOpen, Plus } from 'lucide-react'
import { useId } from 'react'
import type { Animal } from '../data/animals.ts'
import { Avatar } from './Avatar.tsx'
import Button from './Button.tsx'
import HistoryRow from './HistoryRow.tsx'
import IconButton from './IconButton.tsx'
import styles from './Sidebar.module.css'

type Props = {
  // Full at 1200 and wider, a rail from 1024 to 1199.
  variant?: 'full' | 'rail'
  profile: { name: string; animal: Animal }
  // This profile's chats, newest first.
  chats: { id: string; title: string }[]
  activeChatId?: string
  onNewChat?: () => void
  onOpenChat?: (id: string) => void
  onSwitch?: () => void
  // Rail only: opens the full sidebar over the chat.
  onExpand?: () => void
}

export default function Sidebar({ variant = 'full', profile, chats, activeChatId, onNewChat, onOpenChat, onSwitch, onExpand }: Props) {
  const labelId = useId()

  if (variant === 'rail') {
    return (
      <aside className={`${styles.sidebar} ${styles.rail}`} aria-label="Chats and profile" data-inspect="SidebarRail">
        <IconButton label="Show Recent Chats" onClick={onExpand}>
          <PanelLeftOpen aria-hidden="true" />
        </IconButton>
        <IconButton label="New Chat" onClick={onNewChat}>
          <Plus aria-hidden="true" />
        </IconButton>
        <button type="button" className={styles.railSwitch} onClick={onSwitch} aria-label={`Switch profile. You are ${profile.name}`}>
          <Avatar animal={profile.animal} size="sm" />
          <span className="caption">Switch</span>
        </button>
      </aside>
    )
  }

  return (
    <aside className={styles.sidebar} aria-label="Chats and profile" data-inspect="Sidebar">
      <Button variant="outline" block icon={<Plus aria-hidden="true" />} onClick={onNewChat}>
        New Chat
      </Button>

      <nav className={styles.history} aria-labelledby={labelId}>
        <h2 className={`label ${styles.label}`} id={labelId}>
          Recent chats
        </h2>
        {chats.length === 0 ? (
          <p className={`caption ${styles.empty}`}>Your chats will show up here.</p>
        ) : (
          <ul className={styles.list}>
            {chats.map((chat) => (
              <li key={chat.id}>
                <HistoryRow title={chat.title} active={chat.id === activeChatId} onClick={() => onOpenChat?.(chat.id)} />
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className={styles.profile}>
        <Avatar animal={profile.animal} size="sm" />
        <p className={`text-sm weight-bold ${styles.name}`}>{profile.name}</p>
        <Button variant="ghost" onClick={onSwitch}>
          Switch
        </Button>
      </div>
    </aside>
  )
}
