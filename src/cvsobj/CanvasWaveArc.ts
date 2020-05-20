import anime from 'animejs';
import CanvasArc from './CanvasArc';
export default class CanvasWaveArc extends CanvasArc {
    constructor(e: MouseEvent) {
        super();
        this.params = {
            x: e.clientX,
            y: e.clientY,
            radius: 1,
            lineWidth: 1
        };
        anime({
            targets: this.params,
            radius: [0, 300],
            lineWidth: [10, 0],
            easing: 'easeOutQuint',
            duration: 1000,
            complete: this.onComplete.bind(this)
        });
    }
    render(ctx: CanvasRenderingContext2D) {
        const { x, y, radius, lineWidth } = this.params;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = lineWidth;
        ctx.closePath();
        ctx.stroke();
    }
}
