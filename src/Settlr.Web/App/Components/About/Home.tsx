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
      <h1>About Settlr</h1>
      <p>A small project to have fun in my spare time.</p>
      <p>Create sily debates on the most important things in life and get the world's
      opinion on it!</p>
      <h1>Development</h1>
      <h2>UI</h2>
      <ul>
        <li>React</li>
        <li>Bootstrap</li>
        </ul>
      <h2>Backend</h2>
      <ul>
        <li>.NET CORE</li>
        </ul>
      </div>);
  }

  private getStateFromStores(): IHomeState {
    return { };
  }
};