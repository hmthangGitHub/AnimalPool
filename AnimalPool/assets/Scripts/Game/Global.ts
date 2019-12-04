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

class GameConfigs
{

    designedResolution : cc.Vec2 = new cc.Vec2();

    backgroundResolution : cc.Vec2 = new cc.Vec2();

    tileSize : cc.Vec2 = new cc.Vec2();
};

@ccclass
export default class Global {
    static  physicDebugger : boolean = false;
    static groundPhysicDebugger : boolean = false;
    static enablePathDebug : boolean = false;
    static gameConfig : GameConfigs = new GameConfigs();
    
}


