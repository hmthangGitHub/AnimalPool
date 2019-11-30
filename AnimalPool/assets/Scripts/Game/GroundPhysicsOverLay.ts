import MathUlti from "../Common/MathUlti";

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
export default class GroundPhysicsOverLay extends cc.Component {

    @property(cc.Vec2)
    designedResolution : cc.Vec2 = new cc.Vec2();
    @property(cc.Vec2)
    backgroundResolution : cc.Vec2 = new cc.Vec2();
    @property(cc.Vec2)
    tileSize : cc.Vec2 = new cc.Vec2();
    @property(cc.Prefab)
    groundUnit : cc.Prefab = null;

    public offset : cc.Vec2 = new cc.Vec2();
    public mapSizeInTiles : cc.Vec2 = new cc.Vec2();


    start () {
        this.mapSizeInTiles = new cc.Vec2(Math.ceil(this.backgroundResolution.x / this.tileSize.x),Math.ceil(this.backgroundResolution.y / this.tileSize.y));
        this.offset = this.backgroundResolution.mul(-0.5).add(MathUlti.mulVector2(this.tileSize, new cc.Vec2(0.5, -0.5)));
        for(let row = 0; row < this.mapSizeInTiles.y; row++)
        {
            for(let col = 0; col < this.mapSizeInTiles.x ; col++)
            {   
                let newNode = cc.instantiate(this.groundUnit);
                this.node.addChild(newNode);
                newNode.x = this.offset.x + col * this.tileSize.x;
                newNode.y = this.offset.y + row * this.tileSize.y;
            }
        }
    }





}
