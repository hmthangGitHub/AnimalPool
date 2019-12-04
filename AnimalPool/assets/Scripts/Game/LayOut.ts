import Global from "./Global";
import { CameraPosition } from "./CameraMovement";

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
export default class LayOuts extends cc.Component {
    screenSize : cc.Vec2 = new cc.Vec2();
    boundingBoxesInMapSpace : cc.Rect[] = [];
    onLoad()
    {
        this.screenSize = Global.gameConfig.designedResolution;
        this.initBoundingBox()
    }
    initBoundingBox()
    {
        let midBox = this.node.getBoundingBox();
        let bottomBox = midBox.clone();
        bottomBox.center = bottomBox.center.add(new cc.Vec2(0, -this.screenSize.y));
        let leftBox = midBox.clone();
        leftBox.center = leftBox.center.add(new cc.Vec2(-this.screenSize.x, 0));
        let rightBox = midBox.clone();
        rightBox.center = rightBox.center.add(new cc.Vec2(this.screenSize.x, 0));
        this.boundingBoxesInMapSpace[CameraPosition.UP] = midBox;
        this.boundingBoxesInMapSpace[CameraPosition.DOWN] = bottomBox;
        this.boundingBoxesInMapSpace[CameraPosition.LEFT] = leftBox;
        this.boundingBoxesInMapSpace[CameraPosition.RIGHT] = bottomBox;
    }

    getBoundingBoxInMapSpace(camPosition : CameraPosition)
    {
        return this.boundingBoxesInMapSpace[camPosition];
    }
}
