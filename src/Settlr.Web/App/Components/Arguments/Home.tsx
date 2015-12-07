import React = require("react");
import {bindAllThis} from "../../Helpers/ComponentHelper";

interface IHomeProps extends React.Props<Home> {

}

interface IHomeState {
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  public constructor() {
    super();
    this.state = this.getStateFromStores();

    bindAllThis(this);
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        {this.props.children}
      </div>);
  }

  private getStateFromStores(): IHomeState {
    return { };
  }
};