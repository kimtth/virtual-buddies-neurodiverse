'use client'

import { useState, useEffect, useRef, useContext } from 'react'
import { Mic, Settings, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ChatbotContext } from './ChatCanvas'
import { Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SKILLS } from '@/lib/const'


export function SkillSpeakingScreen({ onOpenConfig, onOpenSkill }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [caption, setCaption] = useState('')
  const [isSkillMenuOpen, setIsSkillMenuOpen] = useState(false)
  const config = useContext(ChatbotContext)

  const recognition = useRef(null)
  const toggleSkillMenu = () => setIsSkillMenuOpen(!isSkillMenuOpen)

  const selectSkill = (skillId) => {
    onOpenSkill(skillId)
    setIsSkillMenuOpen(false)
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  }

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new window.webkitSpeechRecognition()
      recognition.current.continuous = true
      recognition.current.interimResults = true

      recognition.current.onresult = (event) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
        setCaption(transcript)
      }

      recognition.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop()
      }
    };
  }, [config])

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop()
    } else {
      setTranscript('')
      setResponse('')
      setCaption('')
      recognition.current.start()
    }
    setIsListening(!isListening)
  }

  const handleSend = () => {
    if (caption.trim()) {
      // Simulate chatbot response
      setResponse(`Processing: "${caption}"`)
      setTimeout(() => {
        setResponse(
          // `Hello! ${config.name}, ${config.description}. \n You said: "${caption}". `
          `You said: "${caption}". `
        )
        speak(
          `"${caption}". `
        )
      }, 1000)
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col h-full p-4 relative">
      <header style={headerStyle}>
        <Button variant="ghost" size="icon" onClick={toggleSkillMenu}>
            <Menu className="h-8"/>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white/90"
          onClick={onOpenConfig}
          aria-label="Open Configuration">
          <Settings className="h-8"/>
        </Button>
      </header>

      <AnimatePresence>
        {isSkillMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-16 left-4 bg-white rounded-lg shadow-lg p-4 z-10"
          >
            {SKILLS.map((skill) => (
              <Button
                key={skill.id}
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => selectSkill(skill.id)}
              >
                <skill.icon className="mr-2 h-6 w-6" />
                {skill.name}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div
          className={`w-48 h-48 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer mb-4 ${
            isListening ? 'scale-105' : ''
          }`}
          onClick={toggleListening}>
          <Mic className={`w-12 h-12 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
        </div>
        <p className="mt-4 text-white text-center text-shadow">{transcript}</p>
        <p className="mt-4 text-white text-center text-shadow">{response}</p>
      </div>
      <div className="mt-auto">
        <div className="flex items-center space-x-2">
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Edit your message here..."
            className="flex-grow bg-white/80 backdrop-blur-sm border-none"
            rows={2} />
          <Button onClick={handleSend} className="bg-black/80 hover:bg-white/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
