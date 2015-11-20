export default class ClientError extends Error {
  public constructor(message: string) {
    super(message);
    this.message = message;
  }

  public toString(): string {
    return this.message;
  }
}