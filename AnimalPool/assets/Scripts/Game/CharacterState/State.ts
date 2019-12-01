import StateMachine from "../StateMachine";


// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, requireComponent} = cc._decorator;
@ccclass
@requireComponent(StateMachine)
export default class State extends cc.Component {

    public stateMachine : StateMachine = null;
    public stateName : string = "";
    onLoad()
    {
        this.stateMachine = this.getComponent(StateMachine);
    }
    public sleep()
    {
        this.enabled = false;
    }

    public awakeState(fromeState : string)
    {
        this.enabled = true;
    }
    public changeToState(toState : string)
    {
        this.sleep();
        this.stateMachine.changeState(this.stateName, toState);
    }
}
