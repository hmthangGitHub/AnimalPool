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
export default class ServicesPopUp extends cc.Component {

    @property(cc.Node)
    contentContainer : cc.Node = null;
   show()
   {
       this.node.active = true;
   }
   hide()
   {
       this.node.active = false;
   }

   public checkEvent(target, customEvent)
   {

        this.contentContainer.children.forEach(content => {
            if(content.name === target.node.name)
            {
                content.active = true;
            }
            else
            {
                content.active = false;
            }
        });
        
   }
}
