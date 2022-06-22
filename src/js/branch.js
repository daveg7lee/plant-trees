export class Branch {
  constructor(startX, startY, endX, endY, lineWidth, color) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.lineWidth = lineWidth;
    this.colors = [
      `rgba(255, ${lineWidth * 21.25}, ${lineWidth * 21.25})`,
      `rgba(${lineWidth * 21.25}, ${lineWidth * 21.25}, 255)`,
      `rgba(${lineWidth * 21.25}, 255, ${lineWidth * 21.25})`,
      `rgba(255, 255, ${lineWidth * 21.25})`,
      `rgba(255, ${lineWidth * 21.25} ,255)`,
    ];
    this.color = this.colors[color];

    this.frame = 8;
    this.cntFrame = 0;

    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  draw(ctx) {
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    return false;
  }
}
