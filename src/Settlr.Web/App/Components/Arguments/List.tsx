import React = require("react");
import {IArgument} from "../../Models/Arguments/IArgument";
import ListStore from "../../Stores/Arguments/ListStore";
import {bindAllThis} from "../../Helpers/ComponentHelper";
import ArgumentsActionCreator from "../../ActionCreators/ArgumentsActionCreator";
import {Link} from "react-router";

interface IListProps extends React.Props<List> {

}

interface IListState {
  arguments: IArgument[];
  isLoading: boolean;
}

export default class List extends React.Component<IListProps, IListState> {
  public constructor() {
    super();
    this.state = this.getStateFromStores();

    bindAllThis(this);
  }

  public render(): React.ReactElement<{}> {
    return (
      <ul className="arguments">
        {this.state.arguments.map(this.renderArgument) }
        </ul>);
  }

  public componentDidMount(): void {
    ListStore.addListener(this.onChange);
    ArgumentsActionCreator.LoadAll();
  }

  public componentWillUnmount(): void {
    ListStore.removeListener(this.onChange);
  }

  private onChange(): void {
    this.setState(this.getStateFromStores());
  }

  private renderArgument(argument: IArgument): React.ReactElement<{}> {
    return <li key={argument.Id}>
      <Link to={ "/arguments/" + argument.Id }>{argument.Title}</Link>
      </li>;
  }

  private getStateFromStores(): IListState {
    return {
      arguments: ListStore.Arguments,
      isLoading: ListStore.IsLoading
    };
  }
};