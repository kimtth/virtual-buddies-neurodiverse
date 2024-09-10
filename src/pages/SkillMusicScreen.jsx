import React from 'react';
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { INIT_MAIN_SCREEN_NAME } from '@/lib/const'

export function SkillMusicScreen({ onOpenSkill }) {

    const handleBacktoMainScreen = () => {
        onOpenSkill(INIT_MAIN_SCREEN_NAME);
        window.history.pushState(null, '', '/');
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
                <h2 className="text-2xl font-bold">Music</h2>
                <div className="w-10"></div> {/* Spacer for alignment */}
            </div>
            <h1>Your code here</h1>
        </div>
    );
}