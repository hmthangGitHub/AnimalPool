import State from "./State";
import AstarPathFinding from "../AstarPathFinding";
import Global from "../Global";
import GroundPhysicsOverLay from "../GroundPhysicsOverLay";
import Logger from "../../Common/Logger";
import MathUlti from "../../Common/MathUlti";

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
        this.stateName = "Moving";
        this.pathFinder = cc.find("Canvas/Map/GroundPhysics").getComponent(AstarPathFinding);
        this.ground = cc.find("Canvas/Map/GroundPhysics").getComponent(GroundPhysicsOverLay);
    }

    awakeState(fromState : string)
    {
        super.awakeState(fromState);
        this.currentPath = [];
        if(fromState == "Idle")
        {
            let currentGridPos = this.ground.getGridPosByWorldPosition(this.node.position);
            while(this.currentPath.length == 0)
            {
                this.currentPath = this.pathFinder.findPathInGrid(currentGridPos, new cc.Vec2(MathUlti.randomRange(15, 20),MathUlti.randomRange(5, 15)));
            }
            
            // Logger.log("Moving State", this.currentPath);
        }
        let moveToPath = new cc.Tween();
        moveToPath.target(this.node);
        this.currentPathIndex = -1;
        for (let index = 0; index < this.currentPath.length; index++) {
            const pos = this.ground.getWorldPositionByGrid(this.currentPath[index]);
            moveToPath.to(this.timePerTiles, { position: pos}, null);//,"  {(progress: Function); easing: Function|string; })
            moveToPath.call(()=>{               
                this.currentPathIndex++;
                if(this.currentPathIndex >= this.currentPath.length -  1)
                {
                    Logger.log("Moving", "Reached the target!!");
                    this.scheduleOnce(()=>{
                        this.changeToState("Idle");
                    }, 1.0);
                }
                
            });

        }
        moveToPath.start();
    }

    update (dt) 
    {
        if(Global.enablePathDebug)
        {
            this.ground.debugPath(this.currentPath, this.currentPathIndex);   
        }
    }
}
