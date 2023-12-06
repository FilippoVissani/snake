import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css'],
})
export class SnakeGameComponent implements OnInit {
  snake: any[] = []; // Snake body
  food: any = {}; // Food position
  direction: string = 'right'; // Initial direction
  interval: number = 200; // Time interval in milliseconds
  gameSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.snake = [{ x: 10, y: 10 }]; // Initial position
    this.generateFood();
    this.gameSubscription = interval(this.interval)
      .pipe(
        take(10000), // Adjust the number of iterations as needed
        map(() => this.move())
      )
      .subscribe();
  }

  move(): void {
    const head = { ...this.snake[0] }; // Copy the head's position

    // Update the head's position based on the direction
    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // Check for collision with the food
    if (this.checkCollision(head, this.food)) {
      this.snake.unshift({ ...head }); // Add new head
      this.generateFood(); // Generate new food
    } else {
      this.snake.unshift({ ...head }); // Add new head
      this.snake.pop(); // Remove the tail
    }

    // Check for collision with the walls or itself and end the game if needed
    if (
      this.checkCollisionWithWalls(head) ||
      this.checkCollisionWithItself(head)
    ) {
      this.gameSubscription?.unsubscribe(); // End the game
      alert('Game Over!');
    }
  }

  generateFood(): void {
    this.food = {
      x: Math.floor(Math.random() * 20), // Random x-coordinate within the game area
      y: Math.floor(Math.random() * 20), // Random y-coordinate within the game area
    };
  }

  changeDirection(newDirection: string): void {
    // Update the direction based on user input, but prevent opposite direction change
    switch (newDirection) {
      case 'up':
        if (this.direction !== 'down') {
          this.direction = newDirection;
        }
        break;
      case 'down':
        if (this.direction !== 'up') {
          this.direction = newDirection;
        }
        break;
      case 'left':
        if (this.direction !== 'right') {
          this.direction = newDirection;
        }
        break;
      case 'right':
        if (this.direction !== 'left') {
          this.direction = newDirection;
        }
        break;
    }
  }

  checkCollision(point1: any, point2: any): boolean {
    // Check if two points collide
    return point1.x === point2.x && point1.y === point2.y;
  }

  checkCollisionWithWalls(point: any): boolean {
    // Check if the point collides with the walls
    return point.x < 0 || point.x >= 20 || point.y < 0 || point.y >= 20;
  }

  checkCollisionWithItself(head: any): boolean {
    // Check if the head collides with the snake body
    return this.snake.slice(1).some(segment => this.checkCollision(head, segment));
  }
}
