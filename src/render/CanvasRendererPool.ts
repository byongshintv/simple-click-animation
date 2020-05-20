import CanvasObject from "../cvsobj/CanvasObject";

export default class CanvasRenderPool{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private renderPool: {[hash:string] : CanvasObject};


    constructor(canvas:HTMLCanvasElement,onClick: (e:MouseEvent,pool:CanvasRenderPool) => void = () => {}){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.renderPool = {}
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        this.initEventListener(onClick)
    }
    private initEventListener(onClick: (e:MouseEvent,pool:CanvasRenderPool) => void = () => {}){
        document.querySelector("canvas").addEventListener("click",(e) => {
            onClick(e,this)
        });
    }

    public animate(){
        const { ctx } = this;
        this.canvasClear();
        Object.values(this.renderPool).forEach( obj => {
            obj.render(ctx)
        })
        requestAnimationFrame(this.animate.bind(this))
    }

    private canvasClear(){
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    /**
     * 애니메이션 오브젝트를 풀에 추가
     * @param getObject 풀에 추가할 오브젝트를 획득하는 함수
     * @param amount 풀에 추가할 횟수
     */
    public add(getObject:() => CanvasObject, amount: number = 1):CanvasRenderPool{
        for( let i = 0; i < amount; i++){
            const obj:CanvasObject = getObject();
            obj.setPool(this);
            const hash = obj.getHash();
            this.renderPool[hash] = obj
        } 

        return this;
    }

    /**
     * 풀에서 오브젝트 하나를 삭제, 보통 애니메이션 하나가 종료되었을때 풀에서 지우는 용도로 사용함
     * @param hash 애니메이션의 해쉬키
     */
    public remove(hash:string){
        delete this.renderPool[hash]
    }
}
