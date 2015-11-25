import Action from "./Action";
import {IArgument} from "../Models/Arguments/IArgument";

export class LoadedAllAction extends Action {
  private arguments: IArgument[];

  public get Arguments(): IArgument[] {
    return this.arguments;
  }

  public constructor(args: IArgument[]) {
    super();
    this.arguments = args;
  }
}

export class LoadAllAction extends Action {
}

export default { LoadAllAction, LoadedAllAction }