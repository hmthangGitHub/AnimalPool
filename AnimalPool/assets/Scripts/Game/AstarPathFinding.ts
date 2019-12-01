import GroundPhysicsOverLay from "./GroundPhysicsOverLay";
import Logger from "../Common/Logger";

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
export default class AstarPathFinding extends cc.Component {
    @property(GroundPhysicsOverLay)
    ground : GroundPhysicsOverLay  = null;
    public mapSizeInGrid : boolean[][];
    public nodeInGrid : NodeInGrid[][] = [];
    private rootSquareOfTwo = Math.sqrt(2);


    onLoad()
    {
        this.initNodeGrid();
    }

    initNodeGrid()
    {
        //this.nodeInGrid = [];
        this.mapSizeInGrid = this.ground.mapAsSimpleGrid;
        for (let row = 0; row < this.mapSizeInGrid.length; row++) {
                this.nodeInGrid[row] = [];
                for (let col = 0; col < this.mapSizeInGrid[row].length; col++) {
                    // const isBlocked = this.mapSizeInGrid[row][col];
                    this.nodeInGrid[row][col]= new NodeInGrid(row, col, false);
                }
        }
    }

    updateNodeGrid()
    {
        this.mapSizeInGrid = this.ground.mapAsSimpleGrid;
        for (let row = 0; row < this.mapSizeInGrid.length; row++) {
            for (let col = 0; col < this.mapSizeInGrid[row].length; col++) {
                const isBlocked = this.mapSizeInGrid[row][col];
                if(!this.nodeInGrid[row][col])
                {
                    Logger.logError("AstarPathFinding", "Not found row , col " + row + " "+ col);
                }
                this.nodeInGrid[row][col].isBlocked = isBlocked;
            }
        }
    }
    public findPathInGrid(start : cc.Vec2, target : cc.Vec2) : cc.Vec2[]
    {
        this.updateNodeGrid();
        let path : cc.Vec2[] = [];
        let openSet : NodeInGrid[] = [];
        let closedSet : NodeInGrid[] = [];
        openSet.push(this.nodeInGrid[start.x][start.y]);
        let targetAsNode = this.nodeInGrid[target.x][target.y]

        while(openSet.length > 0)
        {
            let bestOptionIndex = this.findBestOptionIndex(openSet);
            let bestOption = openSet[bestOptionIndex];
            if(bestOption.pos.equals(targetAsNode.pos))
            {
                
                targetAsNode.cameFrome = bestOption;
                path = this.reconstructPath( targetAsNode);
                break;
            }
            else
            {
                openSet.splice(bestOptionIndex, 1);
                closedSet.push(bestOption);
                this.addNeighBorToOpenSet(openSet, closedSet, bestOption, targetAsNode);
            }
        }
        return path;
    }
    addNeighBorToOpenSet(openSet : NodeInGrid[], closedSet : NodeInGrid[], currentNode : NodeInGrid, target : NodeInGrid)
    {   
        // 0 - 1 -  2
        // '        '
        // 7  curr  3
        // '        '
        // 6 - 5 -  4
        let relatingPos : cc.Vec2[] = [];//{new cc.Vec2(-1, -1), new cc.Vec2(-1, 0)};
        relatingPos.push(new cc.Vec2(-1, -1));
        relatingPos.push(new cc.Vec2(-1, 0));
        relatingPos.push(new cc.Vec2(-1, 1));
        relatingPos.push(new cc.Vec2(0, 1));
        relatingPos.push(new cc.Vec2(1, 1));
        relatingPos.push(new cc.Vec2(1, 0));
        relatingPos.push(new cc.Vec2(1, -1));
        relatingPos.push(new cc.Vec2(0, 1));

        relatingPos.forEach(element => {
            this.addToOpenSetByRelatingPos(openSet, closedSet, currentNode, target, element);
        });
    }

    addToOpenSetByRelatingPos(openSet : NodeInGrid[], closedSet : NodeInGrid[] , currentNode : NodeInGrid, target : NodeInGrid, relatingPos : cc.Vec2)
    {
        let newPos = currentNode.pos.add(relatingPos);
        let newG = currentNode.g +  relatingPos.mag();
        if(newPos.x < 0 || newPos.y < 0 || newPos.x >= this.mapSizeInGrid.length || newPos.y >= this.mapSizeInGrid[0].length)
        {
            return;
        }
        this.addToOpenSet(openSet, closedSet, newPos, newG, currentNode, target);
    }

    addToOpenSet(openSet : NodeInGrid[], closedSet : NodeInGrid[], nodePos : cc.Vec2, newG : number , currentNode : NodeInGrid, target : NodeInGrid)
    {
        let nodeInCloseSet = closedSet.find((element)=>{
            element.pos.equals(nodePos);
        });
        if(nodeInCloseSet)
            return; // if it in closeset dont do anything

        let nodeInOpenSet = openSet.find((element)=>{
            element.pos.equals(nodePos);
        });
        if(nodeInOpenSet)
        {
            if(nodeInOpenSet.g > newG)
            {
                nodeInOpenSet.g = newG;
                nodeInOpenSet.cameFrome = currentNode;
            }
        }
        else
        {
            let newNode = this.nodeInGrid[nodePos.x][nodePos.y];
            newNode.g = newG;
            newNode.h = nodePos.sub(target.pos).mag();
            newNode.cameFrome = currentNode;
            openSet.push(newNode);
        }
    }

    private findBestOptionIndex(array : NodeInGrid[])
    {
        let best = 0;
        for (let index = 1; index < array.length; index++) {
            const element = array[index];
            if(element.getEvaluate() < array[best].getEvaluate())
            {
                best = index;
            }
        }
        return best;
    }

    private reconstructPath(node : NodeInGrid) : cc.Vec2[]
    {
        let path : cc.Vec2[] = [];
        
        while(node.cameFrome !== null)
        {
            path.push(node.pos);
            node = node.cameFrome;
        }
        return path;
    }
}

class NodeInGrid
{
    constructor(row : number, col : number, isBlocked : boolean)
    {
        this.row = row;
        this.col = col;
        this.pos = new cc.Vec2(row, col);
        this.isBlocked = isBlocked;
    }
    public pos : cc.Vec2;
    public row : number = 0;
    public col : number = 0;
    private f : number = 0;
    public g : number = 0;
    public h : number = 0;
    public cameFrome : NodeInGrid = null;
    public isBlocked : boolean = false;

    getEvaluate()
    {
        this.f = this.g + this.h;
        return this.f;
    }
}
