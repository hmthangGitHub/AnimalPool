import State from "./State";
import AstarPathFinding from "../AstarPathFinding";
import Global from "../Global";
import GroundPhysicsOverLay from "../GroundPhysicsOverLay";
import Logger from "../../Common/Logger";
import MathUlti from "../../Common/MathUlti";
import LayOuts from "../LayOut";
import { CameraPosition } from "../CameraMovement";
import Item from "../Item";

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
export default class Ordering extends State {

    @property(cc.Node)
    bubbleTalk : cc.Node = null;
    @property(cc.Float)
    waitingTime : number = 5.0;
    public currentHoldingItem : Item = null;
    public holdingIndex : number = null;
    onEnable()
    {
        this.bubbleTalk.active = true;
        this.scheduleOnce(()=>{
            this.changeToState("Idle");
            this.bubbleTalk.active = false;
        }, this.waitingTime);
    }

    onDisable()
    {
        this.currentHoldingItem.releaseSpot(this.holdingIndex);
    }

    update(dt)
    {

    }
}
