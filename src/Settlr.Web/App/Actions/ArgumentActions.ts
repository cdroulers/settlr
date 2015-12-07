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

export class LoadAction extends Action {
  private id: string;

  public get Id(): string {
    return this.id;
  }

  public constructor(id: string) {
    super();
    this.id = id;
  }
}

export class LoadedAction extends Action {
  private argument: IArgument;

  public get Argument(): IArgument {
    return this.argument;
  }

  public constructor(argument: IArgument) {
    super();
    this.argument = argument;
  }
}

export default { LoadAllAction, LoadedAllAction, LoadAction, LoadedAction }