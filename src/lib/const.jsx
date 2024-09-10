import { Book, Music, Code, Globe, AudioLines } from 'lucide-react'

export const INIT_MAIN_SCREEN_NAME = 'speaking';

export const gradientOptions = [
    { value: 'blue-purple', label: 'Blue to Purple', class: 'bg-gradient-to-br from-blue-500 to-purple-600' },
    { value: 'purple-pink', label: 'Purple to Pink', class: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { value: 'blue-pink', label: 'Blue to Pink', class: 'bg-gradient-to-br from-blue-500 to-pink-500' },
    { value: 'indigo-cyan', label: 'Indigo to Cyan', class: 'bg-gradient-to-br from-indigo-500 to-cyan-400' },
];

export const SKILLS = [
    // { id: 'speaking', name: 'Speaking', icon: AudioLines },
    { id: 'language', name: 'Visual Genius', icon: Book },
    { id: 'wiki', name: 'Kid-Friendly Wikipedia', icon: Globe },
    // { id: 'music', name: 'Music', icon: Music },
];

// Context for chatbot configuration
export const defaultConfig = {
    name: 'Assistant',
    description: 'A helpful AI assistant for kids',
    personality: 'Friendly',
    gender: 'Neutral',
    voice: 'Default',
    backgroundGradient: 'blue-purple',
    visualGeniusDefaultCategoryValue: 'cross-the-walk',
    visualGeniusNoCards: 5,
    visualGeniusPromptTitle: 'Cross the walk',
    visualGeniusPrompt: 'You are walking down the street and you see a crosswalk. What do you do?',
};


export const languageCards = [
    { id: 1, word: 'Look Left', image: 'https://thumbs.dreamstime.com/b/look-left-sign-14355186.jpg' },
    { id: 2, word: 'Look Right', image: 'https://c8.alamy.com/comp/DBX8WB/crosswalks-with-look-right-warning-london-uk-DBX8WB.jpg' },
    { id: 3, word: 'Wait for the signal', image: 'https://i.pinimg.com/736x/65/58/05/65580595cba789bbeaf018ca66113aa1.jpg' },
    { id: 4, word: 'Walk across the crosswalk', image: 'https://th.bing.com/th/id/OIP.2ZY7M1LE35S0pHF-KukskQHaFD?rs=1&pid=ImgDetMain' }
]

export const visualGeniusCategories = [
    { id: 'cross-the-walk', name: 'Cross the walk' },
    { id: 'at-the-park', name: 'At the park' },
    { id: 'in-the-kitchen', name: 'In the kitchen' },
    { id: 'Animals', name: 'Animals' },
    { id: 'Colors', name: 'Colors' },
]
