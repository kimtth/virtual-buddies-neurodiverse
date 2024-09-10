'use client'

import { useState, createContext } from 'react'
import { SkillSpeakingScreen } from './SkillSpeakingScreen'
import { ConfigScreen } from './ConfigScreen'
import { SkillVisualGeniusScreen } from './SkillVisualGeniusScreen'
import { SkillKidsWikiScreen } from './SkillKidsWikiScreen'
import { SkillMusicScreen } from './SkillMusicScreen'
import { SkillTemplateScreen } from './SkillTemplateScreen'
import { gradientOptions, INIT_MAIN_SCREEN_NAME, defaultConfig } from '@/lib/const'

export const ChatbotContext = createContext(defaultConfig);

export default function ChatCanvas() {
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(INIT_MAIN_SCREEN_NAME)
  const [config, setConfig] = useState(ChatbotContext._currentValue)

  return (
    <ChatbotContext.Provider value={config}>
      <div
        className={`flex flex-col h-screen w-full ${gradientOptions.find(g => g.value === config.backgroundGradient).class}`}>
        {isConfigOpen ? (
          <ConfigScreen
            onClose={() => setIsConfigOpen(false)}
            onSave={setConfig}
            initialConfig={config} />
        ) : (
          <>
            {selectedSkill === 'language' && (
              <SkillVisualGeniusScreen onOpenSkill={setSelectedSkill} />
            )}
            {selectedSkill === 'speaking' && ( // Main screen
              <SkillSpeakingScreen onOpenConfig={() => setIsConfigOpen(true)} onOpenSkill={setSelectedSkill} />
            )}
            {selectedSkill === 'music' && (
              <SkillMusicScreen onOpenSkill={setSelectedSkill} />
            )}
            {selectedSkill === 'wiki' && (
              <SkillKidsWikiScreen onOpenSkill={setSelectedSkill} />
            )}
            {selectedSkill === 'test' && (
              <SkillTemplateScreen onOpenSkill={setSelectedSkill} />
            )}
          </>
        )}
      </div>
    </ChatbotContext.Provider>
  );
}
