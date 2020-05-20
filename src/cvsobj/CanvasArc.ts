import CanvasObject from "./CanvasObject";

export interface CanvasArcsParam {
    x:number,
    y:number,
    radius:number,
    lineWidth?:number,
}

export default class CanvasArc extends CanvasObject{
    protected params :CanvasArcsParam;
    


    render(ctx:CanvasRenderingContext2D){
        const {x, y, radius} = this.params;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2)
        ctx.fillStyle="#fff";
        ctx.closePath();
        ctx.fill();
    }
}