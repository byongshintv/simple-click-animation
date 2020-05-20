import CanvasObject from "./CanvasObject";
import anime from "animejs";

export interface CanvasPolyhedronParam {
    x:number,
    y:number,
    radius:number,
    lineWidth?:number,
    angle:number;
    lineAmount:number;
    distanceInterval:number;
}

export interface CanvasPolyhedronInitParam{
    distanceInterval?:number;
    lineAmount?:number;
}

const defaultCanvasPolyhedronInitParam:CanvasPolyhedronInitParam = {
    distanceInterval:200,
    lineAmount:3,
}

export default class CanvasPolyhedron extends CanvasObject{
    protected params :CanvasPolyhedronParam;
    

    constructor(e: MouseEvent,initParam: CanvasPolyhedronInitParam = {}) {
        initParam = { ...defaultCanvasPolyhedronInitParam, ...initParam};
        const { distanceInterval,lineAmount } = initParam;
        super();
        this.params = {
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            lineWidth: 5,
            lineAmount,
            angle:0,
            distanceInterval:initParam.distanceInterval
        };


        var startAngle = anime.random(0,360);
        anime({
            targets: this.params,
            easing: 'easeOutQuint',
            duration: 1000,
            lineWidth:[3,0],
            
            x: anime.random(e.clientX - distanceInterval, e.clientX + distanceInterval),
            y: anime.random(e.clientY - distanceInterval, e.clientY + distanceInterval),
            angle:{
                value:[startAngle,startAngle + 360],
                easing:"linear"
            },
            complete: this.onComplete.bind(this)
        });
    }

    render(ctx:CanvasRenderingContext2D){
        const {x, y, radius,angle, lineWidth, lineAmount} = this.params;

        const angles: number[] = new Array( lineAmount).fill(1).map((v,i) => 360/lineAmount * i + angle)
        const points: Axis[] = angles.map( angle => getAxis({x,y},radius,angle));
        ctx.beginPath();
        points.forEach((axis,i) => {
            if( i === 0 ) ctx.moveTo(axis.x,axis.y);
             else ctx.lineTo(axis.x,axis.y);
        })
        ctx.closePath();
        ctx.strokeStyle="#fff";
        ctx.lineWidth = lineWidth
        ctx.stroke();
    }
}

interface Axis{ x:number, y:number}

/**
 * 좌표 x에서 특정 거리만큼 떨어져있는곳의 좌표 취득
 * @param axis 좌표x
 * @param distance 거리
 * @param angle 각도
 */
function getAxis(axis:Axis,radius:number,angle:number){
    return {
        x:axis.x + Math.cos(Math.PI/180 * angle) * radius,
        y:axis.y + Math.sin(Math.PI/180 * angle) * radius
    }

}