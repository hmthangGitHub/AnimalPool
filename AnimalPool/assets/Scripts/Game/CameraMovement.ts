import MathUlti from "../Common/MathUlti";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraMovement extends cc.Component {
    @property([cc.Vec2])
    cameraPosition : cc.Vec2[] = [];
    @property(cc.Float)
    duration : number = 0.5;
    @property(cc.Vec2)
    screenSize : cc.Vec2 = new cc.Vec2();

    @property([cc.Button])
    cameraButton : cc.Button[] = [];

    currentCameraPosition : CameraPosition;
    start()
    {
        this.init();
        this.currentCameraPosition = CameraPosition.UP;
    }
    init()
    {
        let offset = this.screenSize;
        this.cameraPosition[CameraPosition.UP] = this.node.position;
        this.cameraPosition[CameraPosition.LEFT] = this.node.position.add(MathUlti.mulVector2(offset, new cc.Vec2(-1, 0)));
        this.cameraPosition[CameraPosition.RIGHT] = this.node.position.add(MathUlti.mulVector2(offset, new cc.Vec2(1, 0)));
        this.cameraPosition[CameraPosition.DOWN] = this.node.position.add(MathUlti.mulVector2(offset, new cc.Vec2(0, -1)));
    }
    moveto( target , direction : string)
    {
        let mulVector = new cc.Vec2();
        let directionAsEnum : CameraPosition = parseInt(direction) as CameraPosition;
        switch (directionAsEnum) {
            case CameraPosition.UP:
                mulVector = new cc.Vec2(0, 1);
                this.currentCameraPosition = CameraPosition.UP;
                break;
            case CameraPosition.DOWN:
                mulVector = new cc.Vec2(0, -1);
                this.currentCameraPosition = CameraPosition.DOWN;
                break;
            case CameraPosition.LEFT:
                mulVector = new cc.Vec2(-1, 0);
                if(this.currentCameraPosition == CameraPosition.UP)
                {
                    this.currentCameraPosition = CameraPosition.LEFT;
                }
                else if(this.currentCameraPosition == CameraPosition.RIGHT)
                {
                    this.currentCameraPosition = CameraPosition.UP;
                }
                break;
            case CameraPosition.RIGHT:
                    if(this.currentCameraPosition == CameraPosition.UP)
                    {
                        this.currentCameraPosition = CameraPosition.RIGHT;
                    }
                    else if(this.currentCameraPosition == CameraPosition.LEFT)
                    {
                        this.currentCameraPosition = CameraPosition.UP;
                    }
                mulVector = new cc.Vec2(1, 0);
                break;
            default:
                break;
        }
        let offset = MathUlti.mulVector2(this.screenSize, mulVector );
        let moveTo = new cc.Tween();
        //cc.easeQuadraticActionOut;
        moveTo.target(this.node);
        moveTo.to(this.duration, { position: this.node.position.add(offset)}, {progress : null , easing : 'quadOut'});//,"  {(progress: Function); easing: Function|string; })
        moveTo.call(()=>{
            // console.log("Done!");
            switch (this.currentCameraPosition) {
                case CameraPosition.UP:
                    this.cameraButton[CameraPosition.RIGHT].node.active = true;
                    this.cameraButton[CameraPosition.LEFT].node.active = true;
                    this.cameraButton[CameraPosition.DOWN].node.active = true;
                    break;
                case CameraPosition.DOWN:
                    this.cameraButton[CameraPosition.UP].node.active = true;
                    break;
                case CameraPosition.LEFT:
                    this.cameraButton[CameraPosition.RIGHT].node.active = true;              
                    break;
                case CameraPosition.RIGHT:
                    this.cameraButton[CameraPosition.LEFT].node.active = true;    
                    break;
                default:
                    break;
            }
        });
        moveTo.start();
        this.cameraButton.forEach(button => {
            button.node.active = false;
        });
    }
}

export enum CameraPosition {
    UP,
    DOWN,
    LEFT,
    RIGHT
    
}