import Action from "./Action";

export class SignInAction extends Action {
  private profile: IUser;
  private accessToken: string;

  public get Profile(): IUser {
    return this.profile;
  }

  public get AccessToken(): string {
    return this.accessToken;
  }

  public constructor(profile: IUser, accessToken: string) {
    super();
    this.profile = profile;
    this.accessToken = accessToken;
  }
}

export class SignOutAction extends Action {
}

export default { SignInAction, SignOutAction }