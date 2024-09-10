'use client'

import { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Search, Save, Palette, FileX2, ChevronLeft, ChevronRight } from 'lucide-react'
import { INIT_MAIN_SCREEN_NAME, languageCards } from '@/lib/const'
import { ChatbotContext } from './ChatCanvas'
import { visualGeniusCategories } from '@/lib/const'


export function SkillVisualGeniusScreen({ onOpenSkill }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const config = useContext(ChatbotContext)

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % languageCards.length)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + languageCards.length) % languageCards.length)
  }

  const handleBacktoMainScreen = () => {
    onOpenSkill(INIT_MAIN_SCREEN_NAME);
    window.history.pushState(null, '', '/');
  }

  // Inline styles
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    // background: 'linear-gradient(to bottom right, #9f7aea, #4f46e5)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  }

  const handleSave = () => {
    console.log('Save button clicked');
  }

  const handleDelete = () => {
    console.log('Delete button clicked');
  }

  const handleSearch = () => {
    console.log('Search button clicked');
    // Add your search functionality here
  }

  const handleGenerate = () => {
    console.log('Generate button clicked');
    // Add your generate functionality here
  }

  return (
    <div style={containerStyle}>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBacktoMainScreen}
          aria-label="Back to Main Screen">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold">{`Visual Genius (${visualGeniusCategories.find(g => g.id === config.visualGeniusDefaultCategoryValue).name})`}</h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="relative w-4/5 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white p-6 rounded-xl shadow-xl">
                <img
                  src={languageCards[currentCardIndex].image}
                  alt={languageCards[currentCardIndex].word}
                  className="w-full h-58 object-cover rounded-lg mb-4"
                  style={{ objectFit: 'contain' }}
                />
                <h2 className="text-2xl font-bold text-center mb-8">
                  {languageCards[currentCardIndex].word}
                </h2>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleSave}>
                    <Save className="h-6 w-6" /> 
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleDelete}>
                    <FileX2 className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleSearch}>
                    <Search className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleGenerate}>
                    <Palette className="h-6 w-6" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full"
            onClick={prevCard}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full"
            onClick={nextCard}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}