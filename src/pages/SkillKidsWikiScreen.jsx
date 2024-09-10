'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ReactMarkdown from 'react-markdown'
import { INIT_MAIN_SCREEN_NAME } from '@/lib/const'

export function SkillKidsWikiScreen({ onOpenSkill }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleBacktoMainScreen = () => {
        onOpenSkill(INIT_MAIN_SCREEN_NAME);
        window.history.pushState(null, '', '/');
    }

    const handleSearch = async () => {
        if (!searchTerm) return;
        // Trigger search in backend and get summarized results
        const response = await fetch(`/api/search-wikipedia?query=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data.summary);
    }

    return (
        <div className="flex flex-col h-full p-4 relative">
            <div className="flex justify-between items-center mb-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBacktoMainScreen}
                    aria-label="Back to Main Screen">
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <h2 className="text-2xl font-bold">Kid-Friendly Wikipedia</h2>
                <div className="w-10"></div> {/* Spacer for alignment */}
            </div>

            {/* Search Bar */}
            <div className="flex items-center mb-4 w-11/12 mx-auto">
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Wikipedia..."
                    className="mr-2"
                />
                <Button variant="primary" onClick={handleSearch}>Search</Button>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto w-11/12 mx-auto">
                <div className="p-3 bg-gray-100 rounded-lg w-full h-full ">
                    <h3 className="text-lg font-semibold mb-2">Summary:</h3>
                    {searchResults ? (
                        <ReactMarkdown>{searchResults}</ReactMarkdown>
                    ) : (
                        <p>No search results yet. Try searching something!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
