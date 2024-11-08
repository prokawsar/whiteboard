import type { Socket } from 'socket.io-client';

export default class Drawing {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private isPainting: boolean = false;
	private lineWidth: number = 5;
	private strokeColor: string = '#000000';
	private socket: Socket;

	constructor(canvas: HTMLCanvasElement, socket: Socket) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.socket = socket;

		const canvasOffsetX = this.canvas.offsetLeft;
		const canvasOffsetY = this.canvas.offsetTop;

		this.canvas.width = window.innerWidth - canvasOffsetX;
		this.canvas.height = window.innerHeight - canvasOffsetY;

		this.addCanvasListeners();
		this.addSocketListeners();
	}

	private addCanvasListeners() {
		this.canvas.addEventListener('mousedown', this.startPainting.bind(this));
		this.canvas.addEventListener('mouseup', this.stopPainting.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
	}

	private addSocketListeners() {
		// Listen for drawing data from server and render it
		this.socket.on(
			'draw',
			(data: { x: number; y: number; lineWidth: number; strokeColor: string }) => {
				this.ctx.lineWidth = data.lineWidth;
				this.ctx.strokeStyle = data.strokeColor;
				this.ctx.lineCap = 'round';
				this.ctx.lineTo(data.x, data.y);
				this.ctx.stroke();
				this.ctx.beginPath();
				this.ctx.moveTo(data.x, data.y);
			}
		);

		this.socket.on('clear', () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		});
	}

	private startPainting(e: MouseEvent) {
		this.isPainting = true;
		this.ctx.beginPath();
		this.ctx.moveTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
	}

	private stopPainting() {
		this.isPainting = false;
		this.ctx.stroke();
		this.ctx.beginPath();
	}

	private draw(e: MouseEvent) {
		if (!this.isPainting) return;
		const x = e.clientX - this.canvas.offsetLeft;
		const y = e.clientY - this.canvas.offsetTop;

		this.ctx.lineWidth = this.lineWidth;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineCap = 'round';

		this.ctx.lineTo(x, y);
		this.ctx.stroke();

		// Emit the drawing data to the server
		this.socket.emit('draw', {
			x,
			y,
			lineWidth: this.lineWidth,
			strokeColor: this.strokeColor
		});
	}

	public clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.socket.emit('clear');
	}

	public setStrokeColor(color: string) {
		this.strokeColor = color;
	}

	public setLineWidth(width: number) {
		this.lineWidth = width;
	}
}

// Usage example:
// const canvasElement = document.getElementById('drawing-board') as HTMLCanvasElement;
// const drawingBoard = new DrawingBoard(canvasElement);

// Setting color and line width from outside the class
// drawingBoard.setStrokeColor('#ff0000'); // Set stroke color to red
// drawingBoard.setLineWidth(10); // Set line width to 10
