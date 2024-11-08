export default class Drawing {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private isPainting: boolean = false;
	private lineWidth: number = 5;
	private strokeColor: string = '#000000';

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		const canvasOffsetX = this.canvas.offsetLeft;
		const canvasOffsetY = this.canvas.offsetTop;

		this.canvas.width = window.innerWidth - canvasOffsetX;
		this.canvas.height = window.innerHeight - canvasOffsetY;

		this.addCanvasListeners();
	}

	private addCanvasListeners() {
		this.canvas.addEventListener('mousedown', this.startPainting.bind(this));
		this.canvas.addEventListener('mouseup', this.stopPainting.bind(this));
		this.canvas.addEventListener('mousemove', this.draw.bind(this));
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

		this.ctx.lineWidth = this.lineWidth;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineCap = 'round';

		this.ctx.lineTo(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
		this.ctx.stroke();
	}

	public clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
