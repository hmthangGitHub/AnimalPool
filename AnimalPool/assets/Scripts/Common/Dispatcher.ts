export class Dispatcher {
    static events: any = {};
  
    // constructor() {
    //     Dispatcher.events = {};
    // }
  
    static addListener(event: string, callback: (...param) => any) {
      // Create the event if not exists
      if (this.events[event] === undefined) {
        this.events[event] = {
          listeners: []
        };
      }
      this.events[event].listeners.push(callback);
    }
  
    static removeListener(event: string, callback: (...param) => any) {
      // Check if this event not exists
      if (this.events[event] === undefined) {
        return false;
      }
      this.events[event].listeners = this.events[event].listeners.filter(
        (listener: string) => {
          return listener.toString() !== callback.toString();
        }
      );
    }
  
    static dispatch(event: string, ...param) {
      // Check if this event not exists
      if (this.events[event] === undefined) {
        return false;
      }
      this.events[event].listeners.forEach((listener: any) => {
        listener(param);
      });
    }
  }
  