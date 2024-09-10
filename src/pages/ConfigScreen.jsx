'use client'

import { useState } from 'react'
import { ArrowLeft, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { gradientOptions, visualGeniusCategories } from '@/lib/const'


export function ConfigScreen({ onClose, onSave, initialConfig }) {
  const [config, setConfig] = useState(initialConfig)

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value })
  }

  const handleOptionChange = (name, value) => {
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(config)
    onClose()
  }

  return (
    <div className="flex flex-col h-full p-3 bg-white/90 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Back to Main Screen">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-2xl font-bold">Configure Buddy</h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 m-1 flex-grow overflow-y-auto">
        <div className='m-1'>
          <div>
            <Label htmlFor="name">Name</Label>
            <div className="grid grid-cols-7 gap-4">
              {/* Smile icon with 20% width */}
              <div className="col-span-1 flex items-center justify-center">
                <Smile className="w-8 h-8 text-blue-500" />
              </div>

              {/* Input with 80% width */}
              <div className="col-span-6">
                <Input id="name" name="name" value={config.name} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={config.description}
              onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="personality">Personality</Label>
            <Select value={config.personality} onValueChange={(value) => handleOptionChange("personality", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Humorous">Humorous</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={config.gender} onValueChange={(value) => handleOptionChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Neutral">Neutral</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="voice">Voice</Label>
            <Select value={config.voice} onValueChange={(value) => handleOptionChange("voice", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="Voice 1">Voice 1</SelectItem>
                <SelectItem value="Voice 2">Voice 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Add Section for Visual Genius Customizing.  */}
          <div className="border-t border-gray-300 my-4"></div>
          <Label htmlFor="visualGeniusOptions">Visual Genius Options</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="visualGeniusCategories">Stored Topics</Label>
              <Select value={config.visualGeniusDefaultCategoryValue} onValueChange={(value) => handleOptionChange("visualGeniusDefaultCategoryValue", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Topics" />
                </SelectTrigger>
                <SelectContent>
                  {visualGeniusCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="visualGeniusCards">Number of Cards</Label>
              <Input
                id="visualGeniusCards"
                name="visualGeniusCards"
                type="number"
                value={config.visualGeniusNoCards}
                onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="visualGeniusPromptTitle">Topics</Label>
            <Input
              id="visualGeniusPromptTitle"
              name="visualGeniusPromptTitle"
              value={config.visualGeniusPromptTitle}
              onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="visualGeniusPrompt">Visual Genius Prompt</Label>
            <Textarea
              id="visualGeniusPrompt"
              name="visualGeniusPrompt"
              className="h-24"
              value={config.visualGeniusPrompt}
              onChange={handleChange} />
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div>
            <Label>Background Gradient</Label>
            <RadioGroup
              name="backgroundGradient"
              value={config.backgroundGradient}
              onValueChange={(value) => handleChange({ target: { name: 'backgroundGradient', value } })}
              className="grid grid-cols-4 gap-2">
              {gradientOptions.map((gradient) => (
                <div key={gradient.value} className="flex items-center">
                  <RadioGroupItem
                    value={gradient.value}
                    id={`gradient-${gradient.value}`}
                    className="sr-only" />
                  <Label
                    htmlFor={`gradient-${gradient.value}`}
                    className={`w-full h-8 rounded-md cursor-pointer ${gradient.class} ${config.backgroundGradient === gradient.value ? 'ring-2 ring-offset-2 ring-black' : ''
                      }`}>
                    <span className="sr-only">{gradient.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex space-x-4 mt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
