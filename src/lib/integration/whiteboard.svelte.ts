import { SOCKET_EVENTS } from '$lib/utils/contstants';
import type { Socket } from 'socket.io-client';

export default class Whiteboard {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private isPainting: boolean = false;
	private lineWidth: number = 3;
	private strokeColor: string = '#000000';
	private socket: Socket;
	private backgroundColor: string = '#f8fafc';
	private boxHeightWeight = 80;
	public activeTool = 'pen';
	public history: Array<any> = $state([]);
	public historyIndex: number = $state(-1);

	constructor(canvas: HTMLCanvasElement, socket: Socket) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.socket = socket;

		const canvasOffsetX = this.canvas.offsetLeft;
		const canvasOffsetY = this.canvas.offsetTop;

		this.canvas.width = window.innerWidth - canvasOffsetX;
		this.canvas.height = window.innerHeight - canvasOffsetY;

		this.addCanvasListeners();
		this.addSocketListeners();
		this.setBackground();
	}

	private resizeCanvas() {
		this.canvas.width = window.innerWidth - this.canvas.offsetLeft;
		this.canvas.height = window.innerHeight - this.canvas.offsetTop;
		this.setBackground();
		// this.applyZoom();
	}

	private saveHistory() {
		const canvasData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		// Ensure we only keep the history up to the current index
		this.history = [...this.history.slice(0, this.historyIndex + 1), canvasData];
		this.historyIndex++;
	}

	public undo() {
		if (this.historyIndex > 0) {
			this.historyIndex--;
			this.restoreHistory(this.history[this.historyIndex]);
		} else {
			this.historyIndex = -1;
			this.clearCanvas();
		}
	}

	public redo() {
		if (this.historyIndex < this.history.length - 1) {
			this.historyIndex++;
			this.restoreHistory(this.history[this.historyIndex]);
		}
	}

	private restoreHistory(canvasData: ImageData) {
		this.context.putImageData(canvasData, 0, 0);
	}

	private setBackground() {
		this.context.fillStyle = this.backgroundColor;

		for (let y = 0; y < this.canvas.height; y += this.boxHeightWeight) {
			for (let x = 0; x < this.canvas.width; x += this.boxHeightWeight) {
				this.context.fillRect(x, y, this.boxHeightWeight, this.boxHeightWeight);

				this.context.strokeStyle = '#000';
				this.context.lineWidth = 0.02;
				this.context.strokeRect(x, y, this.boxHeightWeight, this.boxHeightWeight);
			}
		}
	}

	private addCanvasListeners() {
		this.canvas.addEventListener('mousedown', this.startPainting.bind(this));
		this.canvas.addEventListener('mouseup', this.stopPainting.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
		this.canvas.addEventListener('click', this.placeText.bind(this));
		window.addEventListener('resize', this.resizeCanvas.bind(this));
	}

	private addSocketListeners() {
		// Listen for drawing data from server and render it
		this.socket.on(
			SOCKET_EVENTS.DRAW,
			(data: { x: number; y: number; lineWidth: number; strokeColor: string }) => {
				this.context.lineWidth = data.lineWidth;
				this.context.strokeStyle = data.strokeColor;
				this.context.lineCap = 'round';
				this.context.lineTo(data.x, data.y);
				this.context.stroke();
				this.context.beginPath();
				this.context.moveTo(data.x, data.y);
				this.isPainting = false;
			}
		);

		this.socket.on(SOCKET_EVENTS.CLEAR, () => {
			this.clearReact();
			this.setBackground();
		});

		this.socket.on(SOCKET_EVENTS.BEGIN_PATH, (data: { x: number; y: number }) => {
			this.isPainting = true;
			this.context.beginPath();
			this.context.moveTo(data.x, data.y);
		});

		this.socket.on(SOCKET_EVENTS.TEXT, (data: { text: string; x: number; y: number }) => {
			this.context.font = '16px Arial';
			this.context.fillStyle = 'black'; // Set desired text color
			this.context.fillText(data.text, data.x, data.y);
		});
	}

	private startPainting(e: MouseEvent) {
		if (this.activeTool !== 'pen') return;

		const x = e.clientX - this.canvas.offsetLeft;
		const y = e.clientY - this.canvas.offsetTop;

		this.isPainting = true;
		this.context.beginPath();
		this.context.moveTo(x, y);

		this.socket.emit(SOCKET_EVENTS.BEGIN_PATH, { x, y });
	}

	private stopPainting() {
		this.isPainting = false;
		this.context.stroke();
		this.context.beginPath();
		this.saveHistory();
	}

	private draw(e: MouseEvent) {
		if (!this.isPainting) return;
		const x = e.clientX - this.canvas.offsetLeft;
		const y = e.clientY - this.canvas.offsetTop;

		this.context.lineWidth = this.lineWidth;
		this.context.strokeStyle = this.strokeColor;
		this.context.lineCap = 'round';

		this.context.lineTo(x, y);
		this.context.stroke();

		// Emit the drawing data to the server
		this.socket.emit(SOCKET_EVENTS.DRAW, {
			x,
			y,
			lineWidth: this.lineWidth,
			strokeColor: this.strokeColor
		});
	}
	private clearReact() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
			this.context.font = '16px Arial';
			this.context.fillStyle = 'black'; // Set desired text color
			this.context.fillText(text, x, y);

			this.socket.emit(SOCKET_EVENTS.TEXT, { text, x, y });
			this.saveHistory();
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
