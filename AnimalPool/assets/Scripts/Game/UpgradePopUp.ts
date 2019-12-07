import { Dispatcher } from "../Common/Dispatcher";
import EventDefine from "../Common/EventDefine";
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
export default class UpgradePopUp extends cc.Component {


    @property(cc.RichText)
    addingMoney : cc.RichText = null;
    @property(cc.RichText)
    addingStar : cc.RichText = null;
    
    // onLoad()
    // {
    //     Dispatcher.addListener(EventDefine.SHOW_UPGRADE_ITEM_POPUP,(itemName, level, price)=>{
    //         Logger.log("UpgradePopUp", "Opening" + itemName +" " + level + " " + price);
    //     });
    // }

    onLoad()
    {
        Logger.log("HMM", "F");
    }

    start()
    {
        Logger.log("HMM", "FUCK?");
    }
    show(money : string, star : string)
    {
        this.node.active = true;
        this.addingMoney.string = this.addingMoney.string.replace("{amouth}", money);
        this.addingStar.string = this.addingStar.string.replace("{amouth}", money);
    }

    hide()
    {
        this.node.active  = false;
    }

    buyItem()
    {
        
    }

    // update (dt) {}
}
