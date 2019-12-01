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
    public mapAsSimpleGrid : boolean[][] = [];
    public mapAsTilesUnit : cc.Node[][] = [];

    onLoad()
    {
        this.mapSizeInTiles = new cc.Vec2(Math.ceil(this.backgroundResolution.x / this.tileSize.x),Math.ceil(this.backgroundResolution.y / this.tileSize.y));
        this.offset = MathUlti.mulVector2(this.backgroundResolution, new cc.Vec2(-0.5, 0.5)).add(MathUlti.mulVector2(this.tileSize, new cc.Vec2(0.5, -0.5)));
        this.generateGrid();
        this.generateBlockMap();
    }

    generateBlockMap()
    {
        for(let row = 0; row < this.mapSizeInTiles.y; row++)
        {
            this.mapAsSimpleGrid[row] = [];
            for(let col = 0; col < this.mapSizeInTiles.x ; col++)
            {   
                this.mapAsSimpleGrid[row][col] = true;
            }
        }
    }

    generateGrid()
    {
        for(let row = 0; row < this.mapSizeInTiles.y; row++)
        {
            this.mapAsTilesUnit[row] = [];
            for(let col = 0; col < this.mapSizeInTiles.x ; col++)
            {   
                let newNode = cc.instantiate(this.groundUnit);
                this.node.addChild(newNode);
                this.mapAsTilesUnit[row][col] = newNode;
                let unitScript = newNode.getComponent(GroundPhysicsUnit);
                unitScript.positionInGrid = new cc.Vec2(row, col);
                unitScript.groundPhysicsOverLay = this;
                newNode.setPosition(this.getWorldPositionByIndexes(row, col));
            }
        }
    }

    public block(positionInGrid : cc.Vec2)
    {
        this.mapAsSimpleGrid[positionInGrid.x][positionInGrid.y] = false; // row major
    }

    public isBlocked(positionInGrid : cc.Vec2)
    {
        return this.mapAsSimpleGrid[positionInGrid.x][positionInGrid.y];
    }

    public getWorldPositionByGrid(positionInGrid : cc.Vec2) // x for col, y for row
    {
        return this.getWorldPositionByIndexes(positionInGrid.x, positionInGrid.y);
    }

    public getWorldPositionByIndexes(row, col) // x for col, y for row
    {
        let pos : cc.Vec2 = new cc.Vec2();
        pos.x = this.offset.x + col * this.tileSize.x;
        pos.y = this.offset.y + -row * this.tileSize.y;
        return pos;
    }

    public getGridPosByWorldPosition(worldPosition : cc.Vec2)
    {
        let col = Math.ceil((worldPosition.x - this.offset.x) / this.tileSize.x);
        let row = Math.ceil(-(worldPosition.y - this.offset.y)  /this.tileSize.y);
        return new cc.Vec2(row, col);
    }

    public debugPath(path : cc.Vec2[], currentStep : number)
    {
        for (let index = 0; index < path.length; index++) {
            const element = path[index];
            if(index > currentStep)
            {
                this.mapAsTilesUnit[element.x][element.y].color = cc.Color.BLUE;
                this.mapAsTilesUnit[element.x][element.y].opacity = 255;
            }
            else
            {
                this.mapAsTilesUnit[element.x][element.y].opacity = 0;
            }
            
        }
    }

}
