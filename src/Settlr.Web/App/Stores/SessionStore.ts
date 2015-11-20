import BaseStore from "./BaseStore";
import Action from "./../Actions/Action";
import Dispatcher from "../Dispatcher/Dispatcher";
import {SignInAction, SignOutAction} from "../Actions/SessionActions";
import jwtDecode = require("jwt-decode");
import History from "../History";

class SessionStore extends BaseStore {
  private static tenantName: string = process.env.TENANT_NAME;
  private user: IUser = null;
  private accessToken: string = null;

  public constructor() {
    super();
    this.LoadData();
    Dispatcher.register((action: Action) => this.ProcessAction(action));

    this.VerifyToken();
  }

  public GetIsLoggedIn(): boolean {
    return this.user != null;
  };

  public GetAccessToken(): string {
    return this.accessToken;
  };

  public GetCurrentUser(): IUser {
    return this.user;
  };

  private ProcessAction(action: Action): void {
    if (action instanceof SignInAction) {
      this.SignIn(action);
    } else if (action instanceof SignOutAction) {
      this.user = null;
      this.accessToken = null;
      this.StoreData();

      this.emitChange();
    }
  }

  private VerifyToken(): void {
    if (this.accessToken) {
      // TODO: This should refresh the token server-side instead.
      const tokenData = jwtDecode(this.accessToken);
      const expiresAt = new Date(tokenData.exp * 1000);
      if (expiresAt < new Date()) {
        this.accessToken = null;
        this.user = null;
        this.StoreData();
      }

      var tenants = tokenData["tenants"] || [];
      if (tenants.indexOf(SessionStore.tenantName) < 0) {
        History.replaceState(null, "/unauthorized");
        throw new Error("Unauthorized");
      }

      // Ensure the when the token expires, we revisit this code.
      var willExpireInMilliseconds = expiresAt.valueOf() - new Date().valueOf();
      setTimeout(() => this.VerifyToken(), willExpireInMilliseconds + 1000);
    }
  }

  private SignIn(action: SignInAction): void {
    this.user = action.Profile;
    this.accessToken = action.AccessToken;
    this.VerifyToken();
    this.StoreData();

    this.emitChange();
  }

  private StoreData(): void {
    localStorage.setItem("concludely-auth", JSON.stringify({
      user: this.user,
      accessToken: this.accessToken
    }));
  }

  private LoadData(): void {
    var data = localStorage.getItem("concludely-auth");
    if (data) {
      var parsed = JSON.parse(data);
      this.user = parsed.user;
      this.accessToken = parsed.accessToken;
    }
  }
}

export default new SessionStore();