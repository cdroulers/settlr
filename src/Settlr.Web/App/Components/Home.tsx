import React = require("react");
import Navigation from "../Components/Navigation/Navigation";
import GlobalError from "../Components/Shared/GlobalError";
import SessionStore from "../Stores/SessionStore";

interface IHomeProps extends React.Props<Home> {

}

interface IHomeState {
  IsLoggedIn: boolean;
  User: IUser;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  public constructor() {
    super();
    this.state = this.getStateFromStores();

    this.onChange = this.onChange.bind(this);
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className="container">
        <Navigation user={this.state.User} />

        { this.props.children ? this.props.children : this.renderDefault() }

        <footer className="footer">
          <p>© 2016 Settlr, Inc.</p>
          </footer>

        <GlobalError />
        </div>);
  }

  public componentDidMount(): void {
    SessionStore.addListener(this.onChange);
  }

  public componentWillUnmount(): void {
    SessionStore.removeListener(this.onChange);
  }

  private onChange(): void {
    this.setState(this.getStateFromStores());
  }

  private getStateFromStores(): IHomeState {
    return {
      IsLoggedIn: SessionStore.GetIsLoggedIn(),
      User: SessionStore.GetCurrentUser()
    };
  }

  private renderDefault(): React.ReactElement<{}> {
    return (<div className="jumbotron">
          <h1>Welcome to Settlr!</h1>
          <p className="lead">Settle stupid, useless debates. The right way.</p>
          <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
          </div>);
  }
};