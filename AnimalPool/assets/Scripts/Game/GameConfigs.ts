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
export default class GameConfigs extends cc.Component {

    @property(cc.Vec2)
    designedResolution : cc.Vec2 = new cc.Vec2();
    @property(cc.Vec2)
    backgroundResolution : cc.Vec2 = new cc.Vec2();
    @property(cc.Vec2)
    tileSize : cc.Vec2 = new cc.Vec2();

    onLoad()
    {
        Global.gameConfig.designedResolution = this.designedResolution;
        Global.gameConfig.backgroundResolution = this.backgroundResolution;
        Global.gameConfig.tileSize = this.tileSize;
    }

    // update (dt) {}
}
