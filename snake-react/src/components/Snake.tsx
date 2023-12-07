"use client";

import React from 'react';
import { useStore } from '@/store';
import GameLogic from './GameLogic';

const Snake: React.FC = () => {
    const { snake } = useStore();

    return (
        <GameLogic>
            <div>
                {snake.map((segment, index) => (
                    <div key={index} style={{ position: 'absolute', top: segment.y, left: segment.x, width: '20px', height: '20px', backgroundColor: 'green' }} />
                ))}
            </div>
        </GameLogic>
    );
};

export default Snake;