import BaseStore from "./BaseStore";
import Action from "./../Actions/Action";
import Dispatcher from "../Dispatcher/Dispatcher";
import {ErrorAction} from "../Actions/GlobalErrorActions";

class GlobalErrorStore extends BaseStore {
  private error: Error;

  public constructor() {
    super();
    Dispatcher.register((action: Action) => this.ProcessAction(action));
  }

  public HasError(): boolean {
    return this.error != null;
  };

  public GetErrorMessage(): string {
    if (this.error) {
      var message = "";
      if (this.error["status"]) {
        message += this.error["status"] + " - ";
      }

      if (this.error["response"]) {
        try {
          const json = JSON.parse(this.error["response"].text);
          if (json.Message) {
            message += json.Message;
          } else if (typeof json.Error === "string") {
            message += json.Error;
          } else if (typeof json.Error === "object" && json.Error.name && json.Error.message) {
            message += json.Error.name + " - " + json.Error.message;
          } else {
            message += this.error.toString();
          }
        } catch (e) {
          console.error("response text should be JSON.");
        }
      } else {
        message += this.error.toString();
      }

      return message;
    }

    return "";
  };

  private ProcessAction(action: Action): void {
    if (action instanceof ErrorAction) {
      this.error = action.Error;

      this.emitChange();
    }
  }
}

export default new GlobalErrorStore();