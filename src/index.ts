import './style.css'
import CanvasSplashArc from './cvsobj/CanvasSplashArc';
import CanvasWaveArc from './cvsobj/CanvasWaveArc';
import CanvasRenderPool from './render/CanvasRendererPool';
import anime from 'animejs';
import CanvasPolyhedron from './cvsobj/CanvasPolyhedron';

function onClick(e:MouseEvent,pool:CanvasRenderPool){

    pool
        .add( () => new CanvasSplashArc(e), 10 )
        .add( () => new CanvasWaveArc(e))
        .add( () => new CanvasPolyhedron(e,{lineAmount:anime.random(3,6) }),20)
}

var canvas:HTMLCanvasElement =document.querySelector("#main");
const pool = new CanvasRenderPool( canvas,onClick );
pool.animate();


function click(x:number, y:number)
{
    var ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y,
        'clientX': x,
        'clientY': y,
    });

    var el = document.elementFromPoint(x, y);

    el.dispatchEvent(ev);
}
console.log(anime.random(0,innerWidth))
//setInterval(() => click(anime.random(0,innerWidth),anime.random(0,innerHeight)) ,500)
