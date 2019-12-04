import State from "./State";
import AstarPathFinding from "../AstarPathFinding";
import Global from "../Global";
import GroundPhysicsOverLay from "../GroundPhysicsOverLay";
import Logger from "../../Common/Logger";
import MathUlti from "../../Common/MathUlti";
import LayOuts from "../LayOut";
import { CameraPosition } from "../CameraMovement";

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
export default class Moving extends State {

    ground : GroundPhysicsOverLay = null;
    pathFinder : AstarPathFinding = null;
    currentPath : cc.Vec2[] = [];
    currentPathIndex : number = 0;
    @property(cc.Float)
    timePerTiles = 1.0;

    onLoad()
    {
        super.onLoad();
        this.pathFinder = cc.find("Canvas/Map/GroundPhysics").getComponent(AstarPathFinding);
        this.ground = cc.find("Canvas/Map/GroundPhysics").getComponent(GroundPhysicsOverLay);
    }

    protected moveTo(target : cc.Vec2, callback : Function)
    {
        let currentGridPos = this.ground.getGridPosByWorldPosition(this.node.position);
        this.currentPath = this.pathFinder.findPathInGrid(currentGridPos, target);
        if(this.currentPath.length > 0)
        {
            let moveToPath = new cc.Tween();
            moveToPath.target(this.node);
            this.currentPathIndex = -1;
            let facing = (this.currentPath[0].y -currentGridPos.y);
            if(facing != 0)
            {
                facing = facing < 0 ? -1 : 1;
                this.node.scaleX = facing;
            }
            for (let index = 0; index < this.currentPath.length; index++) {
                const pos = this.ground.getWorldPositionByGrid(this.currentPath[index]);
                moveToPath.to(this.timePerTiles, { position: pos}, null);//,"  {(progress: Function); easing: Function|string; })
                moveToPath.call(()=>{               
                    this.currentPathIndex++;
                    if(this.currentPathIndex < this.currentPath.length -  1)
                    {
                        let nextPathIndex = this.currentPathIndex + 1;
                        let nextPos = this.currentPath[nextPathIndex];
                        let currPos = this.currentPath[this.currentPathIndex];
                        let facing = (nextPos.y - currPos.y);
                        if(facing != 0)
                        {
                            facing = facing < 0 ? -1 : 1;
                            this.node.scaleX = facing;
                        }
                        
                    }
                    
                    if(this.currentPathIndex >= this.currentPath.length -  1)
                    {
                        // Logger.log("Moving", "Reached the target!!");
                        // this.scheduleOnce(()=>{
                        //     this.changeToState("Eating");
                        // }, 1.0);
                        if(callback)
                        {
                            callback();
                        }
                    }
                    
                });
            }
            moveToPath.start();
        }
        else
        {
            if(callback)
            {
                callback();
            }
        } 
    }

    public onAwaken()
    {
        let currentGridPos = this.ground.getGridPosByWorldPosition(this.node.position);
        let target : cc.Vec2;
        do
        {
            target = this.ground.getRandomPointInCameraLayout(CameraPosition.UP);
        }
        while(this.ground.isBlocked(target) || target.equals(currentGridPos));
        this.moveTo(target, ()=>{
            this.scheduleOnce(()=>{
                this.changeToState("Eating");
            }, 1.0);
        });
    }
    
    

    update (dt) 
    {
        if(Global.enablePathDebug)
        {
            this.ground.debugPath(this.currentPath, this.currentPathIndex);
        }
    }
}
