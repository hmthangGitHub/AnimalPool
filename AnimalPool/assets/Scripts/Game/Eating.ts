import State from "./CharacterState/State";
import GroundPhysicsOverLay from "./GroundPhysicsOverLay";
import AstarPathFinding from "./AstarPathFinding";
import LayOuts from "./LayOut";
import Moving from "./CharacterState/Moving";
import Logger from "../Common/Logger";
import Item, { Direction } from "./Item";
import Global from "./Global";
import MathUlti from "../Common/MathUlti";
import Ordering from "./CharacterState/Ordering";

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
export default class Eating extends Moving {
    onLoad()
    {
        super.onLoad();
    }

    onAwaken()
    {
        let target : cc.Vec2;
        let availableTable : Item = this.ground.getAvailablePlaces("table");
        if(availableTable)
        {
            let holdingIndex = availableTable.getAvailableIndex();
            let target : cc.Vec2 = availableTable.getInteractSpotInMapSpace();
            let targetAsGridPos = this.ground.getGridPosByWorldPosition(target);
            if(this.ground.isBlocked(targetAsGridPos))
            {
                do
                {
                    targetAsGridPos = targetAsGridPos.add(availableTable.getDirectionAsVector());
                    let randomFactor = MathUlti.randomRange(0 , 1);
                    if(randomFactor > 0)
                    {
                        let variationVector = new cc.Vec2(0, 1);
                        switch(availableTable.direction)
                        {
                            case Direction.UP:
                            case Direction.DOWN:
                            {
                                variationVector = new cc.Vec2(0, 1);
                                break;
                            };
                            case Direction.LEFT:
                            case Direction.RIGHT:
                            {
                                variationVector = new cc.Vec2(1, 0);
                                break;
                            };
                        }
                        
                        targetAsGridPos = targetAsGridPos.add(variationVector);
                    }
                }
                while(this.ground.isBlocked(targetAsGridPos));
            }
            availableTable.holdSpot(holdingIndex);
            this.moveTo(targetAsGridPos, ()=>{
                let moveTween = new cc.Tween();
                moveTween.target(this.node);
                moveTween.to(this.timePerTiles, { position: target}, null);
                moveTween.call(()=>{
                    this.scheduleOnce(()=>{
                        this.changeToState("Ordering");
                        this.getComponent(Ordering).currentHoldingItem = availableTable;
                        this.getComponent(Ordering).holdingIndex = holdingIndex;
                    }, 0.5);
                });
                
                moveTween.start();
            });
        }
        else
        {
            // Logger.logError("Eating", "Not Found any available places " + "table");
            this.changeToState("Idle");
        }
    }
    update (dt)
    {
        if(Global.enablePathDebug)
        {
            this.ground.debugPath(this.currentPath, this.currentPathIndex);
        }
    }
}
