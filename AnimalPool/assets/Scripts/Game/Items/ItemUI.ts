import { Dispatcher } from "../../Common/Dispatcher";
import EventDefine from "../../Common/EventDefine";
import Requirement from "../../ItemRequirement/Requirement";
import UpgradeItemContainer from "./UpgradeItemContainer";
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
export default class ItemUI extends cc.Component {

    @property(cc.Label)
    public price: cc.Label = null;
    public level : number  = 0;
    public requirements : Requirement[] = [];
    public itemName : string = "";

    start()
    {
        this.requirements = this.node.getComponents(Requirement);
    }
    public clickItem()
    {
        let sucessDispatch : boolean = Dispatcher.dispatch(EventDefine.SHOW_UPGRADE_ITEM_POPUP,this.itemName, this.level, this.price);
        Logger.log("sucessDispatch", sucessDispatch);
    }


}
