import Dispatcher from "../Dispatcher/Dispatcher";
import {LoadAction, LoadedAction} from "../Actions/ArgumentActions";
import {ErrorAction} from "../Actions/GlobalErrorActions";
import ArgumentsApiUtils from "../Api/ArgumentsApiUtils";
import {IArgument} from "../Models/Arguments/IArgument";

class ArgumentsActionCreator {
  Load(id: string): void {
    Dispatcher.dispatch(new LoadAction(id));

    ArgumentsApiUtils.LoadArgument(id, (err, argument) => {
      if (err) {
        return Dispatcher.dispatch(new ErrorAction(err));
      }

      Dispatcher.dispatch(new LoadedAction(argument));
    });
  }
}

export default new ArgumentsActionCreator();
