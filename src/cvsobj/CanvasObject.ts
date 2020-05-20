
import hash from 'object-hash'
import CanvasRenderPool from '../render/CanvasRendererPool'

export default abstract class CanvasObject{
    protected pool:CanvasRenderPool
    protected hash:string

    constructor(){
        this.hash = hash({test:Math.random()})    
    }

    /**
     * 애니메이션 종료시 애니메이션을 풀에서 지우기 위한 정의, render 시행전에 이 메서드가 정의되어야함
     * 보통 pool.add 메서드에서 정의됨
     * @param pool 
     */
    public setPool(pool:CanvasRenderPool){
        this.pool = pool
    }

    public getHash():string{
        return this.hash
    }

    public onComplete(){
        var hash = this.getHash();
        this.pool.remove( hash )
    }

    public abstract render(ctx:CanvasRenderingContext2D):void
}