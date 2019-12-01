import Global from "./Global";
import GroundPhysicsOverLay from "./GroundPhysicsOverLay";

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
export default class GroundPhysicsUnit extends cc.Component {

    public groundPhysicsOverLay : GroundPhysicsOverLay;
    public positionInGrid : cc.Vec2 = new cc.Vec2();
    onCollisionEnter(other)
    {
        if(Global.groundPhysicDebugger)
        {
            this.node.color = cc.Color.RED;
            this.node.opacity = 255;
        }
        this.groundPhysicsOverLay.block(this.positionInGrid);
    }




    
}
