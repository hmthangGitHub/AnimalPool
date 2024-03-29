import Global from "./Global";

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
export default class Debugger extends cc.Component {
    @property(cc.Boolean)
    enablePhysicsDebugger : boolean  = false;
    @property(cc.Boolean)
    enableGroundPhysics : boolean = false;
    @property(cc.Boolean)
    enablePathDebug : boolean = false;
    start()
    {
        Global.groundPhysicDebugger = this.enableGroundPhysics;
        Global.physicDebugger = this.enablePhysicsDebugger;
        Global.enablePathDebug = this.enablePathDebug;
    }
}
