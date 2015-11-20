import Action from "./Action";

export class ErrorAction extends Action {
  private error: Error;

  public get Error(): Error {
    return this.error;
  }

  public constructor(error: Error, correlationId?: string) {
    super(correlationId);
    this.error = error;
  }
}

export default { ErrorAction }