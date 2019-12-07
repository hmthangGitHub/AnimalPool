import ItemData from "./ItemData";
import ItemUI from "./ItemUI";
import { Dispatcher } from "../../Common/Dispatcher";
import EventDefine from "../../Common/EventDefine";
import Logger from "../../Common/Logger";


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
export default class UpgradeItemContainer extends cc.Component {

    @property(cc.Node)
    target : cc.Node = null;
    @property(cc.Label)
    itemName : cc.Label = null;
    @property(cc.Node)
    itemLevel : cc.Node = null;
    @property(ItemData)
    itemData : ItemData = null;

    start () {
        this.itemName.string = this.itemData.itemFullName;
        for (let index = 0; index < this.itemLevel.children.length; index++) {
            const item = this.itemLevel.children[index];
            let ItemUIScript : ItemUI = item.getComponent(ItemUI);
            ItemUIScript.price.string = (this.itemData.startPrice + (index * this.itemData.addingEachLevel)).toString();
            ItemUIScript.level = index;
            ItemUIScript.itemName = this.itemData.itemName;
        }

        Dispatcher.addListener(EventDefine.BUY_ITEM_SUCESS, (level)=>{
            this.onBuyItemSucess(level);
        });
    }

    public itemUIClick(level : number, price : number, itemUI : ItemUI)
    {
        
    }

    public onBuyItemSucess(level : number)
    {
        
        Logger.log("UpgradeItemContainer", "Buy item " + this.itemData.itemName + "at level " + level + "Sucess");
        //Logger.log("UpgradeItemContainer", "Buy item " + this.itemData.itemName + "at level " + level + "Sucess");
    }
    
    

    

    // update (dt) {}
}
