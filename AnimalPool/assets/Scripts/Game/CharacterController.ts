import GroundPhysicsOverLay from "./GroundPhysicsOverLay";
import GroundPhysicsUnit from "./GroundPhysicsUnit";
import AstarPathFinding from "./AstarPathFinding";
import Logger from "../Common/Logger";

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
   start()
   {
        this.pathFinder = cc.find("Canvas/Map/GroundPhysics").getComponent(AstarPathFinding);
        let path = this.pathFinder.findPathInGrid(new cc.Vec2(0, 0), new cc.Vec2(1, 1));
        Logger.log("CharacterController", path);
   }



   
}
