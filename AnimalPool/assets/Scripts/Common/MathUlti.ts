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
export default class MathUlti {
    static mulVector2(left : cc.Vec2, right : cc.Vec2)
    {
        let result : cc.Vec2 = new cc.Vec2();
        result.x = left.x * right.x;
        result.y = left.y * right.y;
        return result;
    }

    static randomRange(from : number, to : number) : number
    {
        return Math.floor(Math.random() * to) + from;
    }
}
