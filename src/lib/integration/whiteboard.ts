import { SOCKET_EVENTS } from '$lib/utils/contstants';
import type { Socket } from 'socket.io-client';

export default class Whiteboard {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private isPainting: boolean = false;
	private lineWidth: number = 3;
	private strokeColor: string = '#000000';
	private socket: Socket;
	private backgroundColor: string = '#f8fafc';
	private boxHeightWeight = 80;
	public activeTool = 'pen';

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
		this.setBackground();
	}

	private setBackground() {
		this.ctx.fillStyle = this.backgroundColor;

		for (let y = 0; y < this.canvas.height; y += this.boxHeightWeight) {
			for (let x = 0; x < this.canvas.width; x += this.boxHeightWeight) {
				this.ctx.fillRect(x, y, this.boxHeightWeight, this.boxHeightWeight);

				this.ctx.strokeStyle = '#000';
				this.ctx.lineWidth = 0.02;
				this.ctx.strokeRect(x, y, this.boxHeightWeight, this.boxHeightWeight);
			}
		}
	}

	private addCanvasListeners() {
		this.canvas.addEventListener('mousedown', this.startPainting.bind(this));
		this.canvas.addEventListener('mouseup', this.stopPainting.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
		this.canvas.addEventListener('click', this.placeText.bind(this));
	}

	private addSocketListeners() {
		// Listen for drawing data from server and render it
		this.socket.on(
			SOCKET_EVENTS.DRAW,
			(data: { x: number; y: number; lineWidth: number; strokeColor: string }) => {
				this.ctx.lineWidth = data.lineWidth;
				this.ctx.strokeStyle = data.strokeColor;
				this.ctx.lineCap = 'round';
				this.ctx.lineTo(data.x, data.y);
				this.ctx.stroke();
				this.ctx.beginPath();
				this.ctx.moveTo(data.x, data.y);
				this.isPainting = false;
			}
		);

		this.socket.on(SOCKET_EVENTS.CLEAR, () => {
			this.clearReact();
			this.setBackground();
		});

		this.socket.on(SOCKET_EVENTS.BEGIN_PATH, (data: { x: number; y: number }) => {
			this.isPainting = true;
			this.ctx.beginPath();
			this.ctx.moveTo(data.x, data.y);
		});

		this.socket.on(SOCKET_EVENTS.TEXT, (data: { text: string; x: number; y: number }) => {
			this.ctx.font = '16px Arial';
			this.ctx.fillStyle = 'black'; // Set desired text color
			this.ctx.fillText(data.text, data.x, data.y);
		});
	}

	private startPainting(e: MouseEvent) {
		if (this.activeTool !== 'pen') return;

		const x = e.clientX - this.canvas.offsetLeft;
		const y = e.clientY - this.canvas.offsetTop;

		this.isPainting = true;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);

		this.socket.emit(SOCKET_EVENTS.BEGIN_PATH, { x, y });
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
		this.socket.emit(SOCKET_EVENTS.DRAW, {
			x,
			y,
			lineWidth: this.lineWidth,
			strokeColor: this.strokeColor
		});
	}
	private clearReact() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public clearCanvas() {
		this.clearReact();
		this.socket.emit(SOCKET_EVENTS.CLEAR);
		this.setBackground();
	}

	private async placeText(event: MouseEvent) {
		if (this.activeTool !== 'text') return;
		const x = event.clientX - this.canvas.offsetLeft;
		const y = event.clientY - this.canvas.offsetTop;

		const text = prompt('Enter text:');
		if (text) {
			this.ctx.font = '16px Arial';
			this.ctx.fillStyle = 'black'; // Set desired text color
			this.ctx.fillText(text, x, y);

			this.socket.emit(SOCKET_EVENTS.TEXT, { text, x, y });
		}
	}

	public getStrokeColor() {
		return this.strokeColor;
	}
	public setStrokeColor(color: string) {
		this.strokeColor = color;
	}

	public setLineWidth(width: number) {
		this.lineWidth = width;
	}

	public setActiveTool(toolName: string) {
		this.activeTool = toolName;
	}
}
