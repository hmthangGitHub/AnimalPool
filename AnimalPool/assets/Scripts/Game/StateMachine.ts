import State from "./CharacterState/State";
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
export default class StateMachine extends cc.Component {
    
    public states : State[] = [];
    start()
    {
        this.states = this.getComponents(State);
    }
    changeState(fromState : string, toState :string)
    {
        let state = this.states.find((element)=>{
            return element.stateName == toState;
        });
        if(state)
        {
            state.awakeState(fromState);
        }
        else
        {
            Logger.logError("StateMachine", "Could not change from " + fromState + " to state " + toState);
        }
    }
}
