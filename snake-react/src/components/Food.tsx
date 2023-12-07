"use client";

import React, { useEffect } from 'react';
import { useStore } from '@/store';

const Food: React.FC = () => {
    const { food, generateFood } = useStore();

    useEffect(() => {
        const handleFoodCollision = () => {
            // Add logic to check for collision between snake and food
            const head = { ...useStore.getState().snake[0] };

            if (head.x === food.x && head.y === food.y) {
                generateFood();
            }
        };

        handleFoodCollision();
    }, [food, generateFood]);

    return (
        <div style={{ position: 'absolute', top: food.y, left: food.x, width: '20px', height: '20px', backgroundColor: 'red' }} />
    );
};

export default Food;