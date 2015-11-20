import React = require("react");
import reactMixin = require("react-mixin");
import {History as HistoryMixin} from "react-router";
import SessionActionCreators from "../../ActionCreators/SessionActionCreators";

export default class Navigation
  extends React.Component<{}, {}>
  implements ReactRouter.HistoryMixin {

  public history: ReactRouter.History;
  public constructor() {
    super();
  }

  public render(): React.ReactElement<{}> {
    return (<div>Signing out</div>);
  }

  public componentDidMount(): void {
    SessionActionCreators.SignOut();
    this.history.pushState(null, "/");
  }
};

reactMixin.onClass(Navigation, HistoryMixin);