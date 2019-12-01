import GroundPhysicsOverLay from "./GroundPhysicsOverLay";
import GroundPhysicsUnit from "./GroundPhysicsUnit";
import AstarPathFinding from "./AstarPathFinding";
import Logger from "../Common/Logger";
import Global from "./Global";
import StateMachine from "./StateMachine";

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
export default class CharacterController extends cc.Component {

   @property(cc.Float)
   timePerTile : number = 1.0;
   @property(cc.Vec2)
   targetInGrid : cc.Vec2 = new cc.Vec2();

   pathFinder : AstarPathFinding;
   currentPath : cc.Vec2[] = [];
   //@property(StateMachine)
   
// currentState : State = State.IDLE;
//    start()
//    {
//         // this.pathFinder = cc.find("Canvas/Map/GroundPhysics").getComponent(AstarPathFinding);
//    }

//    update(dt)
//    {
//     //    if(this.currentState == State.IDLE)
//     //    {
//     //         this.currentState = State.MOVING;
//     //         this.scheduleOnce(()=>{
//     //             this.currentPath = this.pathFinder.findPathInGrid(new cc.Vec2(25, 14), new cc.Vec2(29, 14));
//     //         }, 0.5);
//     //    }
//     //    else if(this.currentState == State.MOVING)
//     //    {
            
//     //         if(Global.enablePathDebug)
//     //         {
//     //             cc.find("Canvas/Map/GroundPhysics").getComponent(GroundPhysicsOverLay).debugPath(this.currentPath);
//     //         }
//     //    }
//    }   
}
// export enum State {
//     IDLE,
//     MOVING,
//     SWIMMING,
//     RIGHT
// }
