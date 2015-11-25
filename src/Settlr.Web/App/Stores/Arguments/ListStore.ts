import BaseStore from "../BaseStore";
import Action from "../../Actions/Action";
import Dispatcher from "../../Dispatcher/Dispatcher";
import {LoadAllAction, LoadedAllAction} from "../../Actions/ArgumentActions";
import {IArgument} from "../../Models/Arguments/IArgument";

class ListStore extends BaseStore {
  private arguments: IArgument[] = [];

  private isLoading: boolean = false;

  public constructor() {
    super();
    Dispatcher.register((action: Action) => this.ProcessAction(action));
  }

  public get Arguments(): IArgument[] {
    return this.arguments;
  };

  public get IsLoading(): boolean {
    return this.isLoading;
  };

  private ProcessAction(action: Action): void {
    if (action instanceof LoadAllAction) {
      this.isLoading = true;
      this.emitChange();
    } else if (action instanceof LoadedAllAction) {
      this.isLoading = false;
      this.arguments = action.Arguments;

      this.emitChange();
    }
  }
}

export default new ListStore();