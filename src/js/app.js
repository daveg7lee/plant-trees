import { Tree } from './tree.js';

class App {
  constructor() {
    this.canvas = document.querySelector('canvas');

    this.ctx = this.canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio > 1 ? 1 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('click', this.click.bind(this), false);
    this.resize();
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }

  click(event) {
    const { clientX } = event;
    this.draw(clientX);
  }

  draw(clientX) {
    new Tree(this.ctx, clientX, this.stageHeight);
  }
}

window.onload = () => {
  new App();
};
