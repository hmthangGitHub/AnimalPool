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
export default class ItemContainer extends cc.Component {
    @property(cc.Integer)
    public currentLevel : number = 0;
    start()
    {
        if(this.currentLevel <= this.node.childrenCount - 1 && this.currentLevel >= 0)
        {
            for (let index = 0; index < this.node.childrenCount; index++) {
                const element = this.node.children[index];
                if(index == this.currentLevel)
                {
                    element.active = true;
                }
                else
                {
                    element.active = false;
                }
            }
            this.node.children[this.currentLevel].active = true;
        }
    }
    public upgrade()
    {
        this.currentLevel++;
        if(this.currentLevel <= this.node.childrenCount - 1)
        {
            this.node.children[this.currentLevel - 1].active = false;
            this.node.children[this.currentLevel].active = true;
        }
    }
}
