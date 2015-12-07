import React = require("react");
import {IArgument} from "../../Models/Arguments/IArgument";
import ShowStore from "../../Stores/Arguments/ShowStore";
import ArgumentsActionCreator from "../../ActionCreators/ArgumentsActionCreator";
import {bindAllThis} from "../../Helpers/ComponentHelper";

interface IShowParams {
  argumentId: string;
}

interface IShowProps extends React.Props<Show> {
  params: IShowParams;
}

interface IShowState {
  argument: IArgument;
  isLoading: boolean;
}

export default class Show extends React.Component<IShowProps, IShowState> {
  public constructor() {
    super();
    this.state = this.getStateFromStores();

    bindAllThis(this);
  }

  public render(): React.ReactElement<{}> {
    return this.state.isLoading ? this.renderLoading() : this.renderArgument();
  }

  public renderLoading(): React.ReactElement<{}> {
    return (<div>loading...</div>);
  }

  public renderArgument(): React.ReactElement<{}> {
    return this.state.argument ? (
      <div>
        <h1>{this.state.argument.Title}</h1>
        <h2>Left</h2>
        <p>{this.state.argument.AnswerLeft}</p>
        <h2>Right</h2>
        <p>{this.state.argument.AnswerRight}</p>
        </div>) :
      <div>Argument not found</div>;
  }

  public componentDidMount(): void {
    ShowStore.addListener(this.onChange);
    ArgumentsActionCreator.Load(this.props.params.argumentId);
  }

  public componentDidUpdate(prevProps: IShowProps): void {
    if (prevProps.params.argumentId !== this.props.params.argumentId) {
      ArgumentsActionCreator.Load(this.props.params.argumentId);
    }
  }

  public componentWillUnmount(): void {
    ShowStore.removeListener(this.onChange);
  }

  private onChange(): void {
    this.setState(this.getStateFromStores());
  }

  private getStateFromStores(): IShowState {
    return {
      argument: ShowStore.Argument,
      isLoading: ShowStore.IsLoading
    };
  }
};