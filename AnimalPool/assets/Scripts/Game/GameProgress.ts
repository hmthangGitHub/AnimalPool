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
export default class GameProgress {
    public currentMoney : number = 5000;
    public currentStar : number = 500;
    public currentTipRate : number = 5.0;
    public currentUnlockedItem : Map<string, number> = new Map<string, number>();
    public unlockItem(id : string, level : number)
    {
        this.currentUnlockedItem.set(id, level);
    }
    getCurrentLevelUnlockItem(id : string)
    {
        if(this.currentUnlockedItem.has(id))
        {
            return this.currentUnlockedItem.get(id);
        }
        else
        {
            return -1;
        }
    }
}

