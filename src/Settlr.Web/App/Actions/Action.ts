import uuid = require("uuid");
export abstract class Action {
  private correlationId: string;

  public get CorrelationId(): string {
    return this.correlationId;
  }

  constructor(correlationId?: string) {
    this.correlationId = correlationId || uuid.v4();
  }
}
export default Action;