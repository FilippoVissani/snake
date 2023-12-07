import React from 'react';
import Snake from './Snake';
import Food from './Food';
import GameLogic from './GameLogic';

const Board: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '400px', height: '400px', border: '1px solid black' }}>
            <GameLogic>
                <Snake />
                <Food />
            </GameLogic>
        </div>
    );
};

export default Board;