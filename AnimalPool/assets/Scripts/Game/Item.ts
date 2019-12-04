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
export enum Direction 
{
    UP,
    DOWN,
    LEFT,
    RIGHT
}
@ccclass
export default class Item extends cc.Component {
    @property(cc.String)
    itemName : string = "itemName";
    @property(cc.Node)
    interactSpotContainer : cc.Node = null;
    @property({type:cc.Enum(Direction)})
    direction : Direction = Direction.UP;
    
    availableSpot : boolean[] = [];

    onLoad()
    {
        for (let index = 0; index < this.interactSpotContainer.childrenCount; index++) {
            this.availableSpot[index] = true;
        }
    }

    getInteractSpotInMapSpace() : cc.Vec2
    {
        let index = this.availableSpot.findIndex((element) => {
            return element;
        });
        if(index < 0)
            return null;
        let interactSpot = this.interactSpotContainer.children[index];
        let worldSpacePos :cc.Vec2 = interactSpot.parent.convertToWorldSpaceAR(interactSpot.position);
        let mapSpace = this.node.parent.convertToNodeSpaceAR(worldSpacePos);
        return mapSpace;
    }

    getWaitingSpotInMapSpace() : cc.Vec2
    {
        let interactSpot = this.interactSpotContainer.children[0];
        if(interactSpot)
            return null;
        let worldSpacePos :cc.Vec2 = interactSpot.parent.convertToWorldSpaceAR(interactSpot.position);
        let mapSpace = this.node.parent.convertToWorldSpaceAR(worldSpacePos);
        return mapSpace;
    }

    getAvailableIndex() : number
    {
        let index = this.availableSpot.findIndex((element) => {
            return element;
        });
        return index;
    }

    getDirectionAsVector() : cc.Vec2
    {
        switch(this.direction)
        {
            case Direction.UP:
            {
                return new cc.Vec2(-1, 0);
            }
            case Direction.DOWN:
            {
                return new cc.Vec2(1, 0);
            }
            case Direction.LEFT:
            {
                return new cc.Vec2(0, -1);
            }
            case Direction.RIGHT:
            {
                return new cc.Vec2(0, 1);
            }
            default:
                return new cc.Vec2(0, 0);
                break;
        }
    }

    holdSpot(index : number )
    {
        this.availableSpot[index] = false;
    }

    releaseSpot(index : number)
    {
        this.availableSpot[index] = true;
    }
}
