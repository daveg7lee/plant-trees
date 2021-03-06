import { Branch } from "./branch.js";

export class Tree {
  constructor(ctx, posX, posY, endY) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.endY = endY;
    this.branches = [];
    this.rand = Math.floor(Math.random() * 5);
    this.depth = 12;
    this.cntDepth = 0;
    this.animation = null;

    this.init();
  }

  init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw(this.ctx);
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    console.log(this.endY);

    const len =
      this.endY < 350
        ? depth === 0
          ? this.random(16, 20)
          : this.random(0, 16)
        : this.posY - this.endY > 250
        ? depth === 0
          ? this.random(
              (this.posY - this.endY) / this.depth - 18,
              (this.posY - this.endY) / this.depth - 10
            )
          : this.random(0, (this.posY - this.endY) / this.depth - 18)
        : depth === 0
        ? this.random(6, 10)
        : this.random(0, 6);

    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);

    this.branches[depth].push(
      new Branch(startX, startY, endX, endY, this.depth - depth, this.rand)
    );

    this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
    this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
  }

  draw() {
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation);
    }

    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      for (let j = 0; j < this.branches[i].length; j++) {
        pass = this.branches[i][j].draw(this.ctx);
      }

      if (!pass) break;
      this.cntDepth++;
    }

    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  cos(angle) {
    return Math.cos(this.degToRad(angle));
  }

  sin(angle) {
    return Math.sin(this.degToRad(angle));
  }

  degToRad(angle) {
    return (angle / 180.0) * Math.PI;
  }

  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}
