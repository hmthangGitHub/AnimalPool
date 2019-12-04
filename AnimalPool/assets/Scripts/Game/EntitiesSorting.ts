import Logger from "../Common/Logger";
import CameraMovement from "./CameraMovement";

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
export default class EntitiesSorting extends cc.Component {
    @property(CameraMovement)
    camera : CameraMovement = null;
    visibleArea : cc.Rect;
    start()
    {
        Logger.log("Winsize", cc.winSize);
    }
    update(dt)
    {
        this.visibleArea = this.camera.getCameraVisibleAreaInWorld();
        // let sortedArray = Array.from(this.node.children.filter(this.isVisible)).sort((a, b) => -a.y + b.y);
        let visibleNodes = this.node.children.filter((node, index)=>{
            return this.isVisible(node);
        });
        let sortedArray = Array.from(visibleNodes).sort((a, b) => -a.y + b.y);

        let depth = 0;
        sortedArray.forEach(node =>{
            node.zIndex = depth;
            depth++;
        });
    }

    isVisible(node : cc.Node)
    {
        let nodeInWorld = node.parent.convertToWorldSpaceAR(node.position);
        let  boundingBoxinWorld = node.getBoundingBox();
        boundingBoxinWorld.center = nodeInWorld;
        


        // Logger.log("Yo", cc.winSize);
        let camBoundingBox = this.visibleArea;

        let camInWorld = this.camera.node.parent.convertToWorldSpaceAR(this.camera.node.position);
        camBoundingBox.center = camInWorld;

        return boundingBoxinWorld.intersects(camBoundingBox);

        //if(this.)
    }



}
