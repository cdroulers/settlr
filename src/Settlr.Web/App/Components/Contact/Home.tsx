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
      <h1>Contact</h1>
      <p>Author: Christian Droulers</p>
      <p><a href="mailto:christian@droulers.me">christian@droulers.me</a></p>
      </div>);
  }

  private getStateFromStores(): IHomeState {
    return { };
  }
};