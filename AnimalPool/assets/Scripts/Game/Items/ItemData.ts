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
export default class ItemData extends cc.Component {
    @property(cc.String)
    itemName : string = "item_name";
    @property(cc.String)
    itemFullName : string = "item_full_name";
    @property(cc.Integer)
    addingStar : number = 2;
    @property(cc.Integer)
    addingStarEachLevel : number = 2;

    @property(cc.Integer)
    bonusTips : number = 5;


    //requirement
    @property(cc.Integer)
    startPrice : number = 100;
    @property(cc.Integer)
    addingEachLevel : number = 200;

    @property(cc.Integer)
    currentLevel : number = 0;
    
}
