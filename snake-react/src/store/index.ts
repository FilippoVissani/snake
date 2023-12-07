import create from 'zustand';

interface State {
    snake: { x: number; y: number }[];
    food: { x: number; y: number };
    direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    moveSnake: (direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
    generateFood: () => void;
}

export const useStore = create<State>((set) => ({
    snake: [{ x: 0, y: 0 }],
    food: { x: 0, y: 0 },
    direction: 'RIGHT',
    moveSnake: (direction) => {
        set((state) => {
            const newSnake = [...state.snake];
            const head = { ...newSnake[0] };

            // Update the direction if a new direction is provided
            if (direction) {
                state.direction = direction;
            }

            // Move the head of the snake based on the direction
            switch (state.direction) {
                case 'UP':
                    head.y -= 20;
                    break;
                case 'DOWN':
                    head.y += 20;
                    break;
                case 'LEFT':
                    head.x -= 20;
                    break;
                case 'RIGHT':
                    head.x += 20;
                    break;
            }

            // Update the snake array
            newSnake.unshift(head);

            // Remove the last segment of the snake if it's not the food
            if (head.x !== state.food.x || head.y !== state.food.y) {
                newSnake.pop();
            } else {
                // If the snake eats the food, generate new food
                state.generateFood();
            }

            return { snake: newSnake, food: state.food, direction: state.direction };
        });
    },
    generateFood: () => {
        set((state) => {
            // Generate random coordinates for the new food
            let newFood: { x: any; y: any; };
            do {
                newFood = {
                    x: Math.floor(Math.random() * 20) * 20,
                    y: Math.floor(Math.random() * 20) * 20,
                };
            } while (state.snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));

            return { snake: state.snake, food: newFood, direction: state.direction };
        });
    },
}));