import anime from 'animejs';
import CanvasArc from './CanvasArc';
export default class CanvasSplashArc extends CanvasArc {
    constructor(e: MouseEvent) {
        super();
        this.params = {
            x: e.clientX,
            y: e.clientY,
            radius: 4,
        };
        var distanceInterval = 200;
        anime({
            targets: this.params,
            x: anime.random(e.clientX - distanceInterval, e.clientX + distanceInterval),
            y: anime.random(e.clientY - distanceInterval, e.clientY + distanceInterval),
            radius: [8, 0],
            easing: 'easeOutCirc',
            duration: 700,
            complete: this.onComplete.bind(this)
        });
    }
}
