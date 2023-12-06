import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snake',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeComponent implements OnInit {
  @ViewChild('snakeCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D;
  private gridSize = 20;
  private boardWidth!: number;
  private boardHeight!: number;
  private snake: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  private food: { x: number; y: number } = { x: 0, y: 0 };
  private direction: string = 'right';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.boardWidth = this.canvas.nativeElement.width / this.gridSize;
    this.boardHeight = this.canvas.nativeElement.height / this.gridSize;

    this.generateFood();
    this.draw();
    this.startGameLoop();
  }

  private generateFood() {
    this.food = {
      x: Math.floor(Math.random() * this.boardWidth),
      y: Math.floor(Math.random() * this.boardHeight)
    };
  }

  private move() {
    const head = { ...this.snake[0] };

    switch (this.direction) {
      case 'up':
        head.y = (head.y - 1 + this.boardHeight) % this.boardHeight;
        break;
      case 'down':
        head.y = (head.y + 1) % this.boardHeight;
        break;
      case 'left':
        head.x = (head.x - 1 + this.boardWidth) % this.boardWidth;
        break;
      case 'right':
        head.x = (head.x + 1) % this.boardWidth;
        break;
    }

    this.snake.unshift(head);

    // Check for collision with food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // Draw the snake
    this.snake.forEach(segment => {
      this.context.fillStyle = 'green';
      this.context.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
    });

    // Draw the food
    this.context.fillStyle = 'red';
    this.context.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
  }

  private startGameLoop() {
    setInterval(() => {
      this.move();
      this.draw();
    }, 100);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.direction = 'up';
        break;
      case 'ArrowDown':
        this.direction = 'down';
        break;
      case 'ArrowLeft':
        this.direction = 'left';
        break;
      case 'ArrowRight':
        this.direction = 'right';
        break;
    }
  }
}
