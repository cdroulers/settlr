import BaseStore from "../BaseStore";
import Action from "../../Actions/Action";
import Dispatcher from "../../Dispatcher/Dispatcher";
import {LoadAction, LoadedAction} from "../../Actions/ArgumentActions";
import {IArgument} from "../../Models/Arguments/IArgument";

class ShowStore extends BaseStore {
  private argument: IArgument = null;

  private isLoading: boolean = false;

  public constructor() {
    super();
    Dispatcher.register((action: Action) => this.ProcessAction(action));
  }

  public get Argument(): IArgument {
    return this.argument;
  };

  public get IsLoading(): boolean {
    return this.isLoading;
  };

  private ProcessAction(action: Action): void {
    if (action instanceof LoadAction) {
      this.isLoading = true;
      this.emitChange();
    } else if (action instanceof LoadedAction) {
      this.isLoading = false;
      this.argument = action.Argument;

      this.emitChange();
    }
  }
}

export default new ShowStore();