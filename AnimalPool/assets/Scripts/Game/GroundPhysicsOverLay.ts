import MathUlti from "../Common/MathUlti";
import GroundPhysicsUnit from "./GroundPhysicsUnit";

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

    public gridBlockMap : boolean[][] = [];
    start () {

        this.mapSizeInTiles = new cc.Vec2(Math.ceil(this.backgroundResolution.x / this.tileSize.x),Math.ceil(this.backgroundResolution.y / this.tileSize.y));
        this.offset = MathUlti.mulVector2(this.backgroundResolution, new cc.Vec2(-0.5, 0.5)).add(MathUlti.mulVector2(this.tileSize, new cc.Vec2(0.5, -0.5)));
        this.generateGrid();
        this.generateBlockMap();

    }

    generateBlockMap()
    {
        for(let row = 0; row < this.mapSizeInTiles.y; row++)
        {
            this.gridBlockMap[row] = [];
            for(let col = 0; col < this.mapSizeInTiles.x ; col++)
            {   
                this.gridBlockMap[row][col] = true;
            }
        }
    }

    generateGrid()
    {
        for(let row = 0; row < this.mapSizeInTiles.y; row++)
        {
            for(let col = 0; col < this.mapSizeInTiles.x ; col++)
            {   
                let newNode = cc.instantiate(this.groundUnit);
                this.node.addChild(newNode);
                let unitScript = newNode.getComponent(GroundPhysicsUnit);
                unitScript.positionInGrid = new cc.Vec2(col, row);
                unitScript.groundPhysicsOverLay = this;
                newNode.setPosition(this.getWorldPositionByIndexes(col, row));
            }
        }
    }

    public block(positionInGrid : cc.Vec2)
    {
        this.gridBlockMap[positionInGrid.y][positionInGrid.x] = false; // row major
    }

    public getWorldPositionByGrid(positionInGrid : cc.Vec2) // x for col, y for row
    {
        return this.getWorldPositionByIndexes(positionInGrid.x, positionInGrid.y);
    }

    public getWorldPositionByIndexes(col, row) // x for col, y for row
    {
        let pos : cc.Vec2 = new cc.Vec2();
        pos.x = this.offset.x + col * this.tileSize.x;
        pos.y = this.offset.y + -row * this.tileSize.y;
        return pos;
    }

    







}
