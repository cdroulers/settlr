import Dispatcher from "../Dispatcher/Dispatcher";
import SessionActions from "../Actions/SessionActions";

class SessionViewActionCreator {
  SignIn(profile: IUser, accessToken: string): void {
    Dispatcher.dispatch(new SessionActions.SignInAction(profile, accessToken));
  }

  SignOut(): void {
    Dispatcher.dispatch(new SessionActions.SignOutAction());
  }
}

export default new SessionViewActionCreator();
