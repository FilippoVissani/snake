"use client";

import React, { useEffect } from 'react';
import { useStore } from '@/store';

interface GameLogicProps {
    children: React.ReactNode;
}

const GameLogic: React.FC<GameLogicProps> = ({ children }) => {
    const { snake, moveSnake, generateFood } = useStore();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Add logic to change the direction of the snake based on key press
            switch (e.key) {
                case 'ArrowUp':
                    moveSnake('UP');
                    break;
                case 'ArrowDown':
                    moveSnake('DOWN');
                    break;
                case 'ArrowLeft':
                    moveSnake('LEFT');
                    break;
                case 'ArrowRight':
                    moveSnake('RIGHT');
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        const gameLoop = setInterval(() => {
            moveSnake();
        }, 200); // Adjust the interval based on your preference

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            clearInterval(gameLoop);
        };
    }, [snake, moveSnake, generateFood]);

    return <>{children}</>;
};

export default GameLogic;