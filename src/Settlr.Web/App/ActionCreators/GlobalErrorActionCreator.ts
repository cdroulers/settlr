import Dispatcher from "../Dispatcher/Dispatcher";
import GlobalErrorActions from "../Actions/GlobalErrorActions";

class GlobalErrorActionCreator {
  Error(error: Error): void {
    Dispatcher.dispatch(new GlobalErrorActions.ErrorAction(error));
  }
}

export default new GlobalErrorActionCreator();
