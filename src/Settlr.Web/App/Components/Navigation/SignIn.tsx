import React = require("react");
import reactMixin = require("react-mixin");
import {History as HistoryMixin} from "react-router";
import SessionActionCreators from "../../ActionCreators/SessionActionCreators";
import GlobalErrorActionCreator from "../../ActionCreators/GlobalErrorActionCreator";
import SessionStore from "../../Stores/SessionStore";

interface ISignInProps extends React.Props<SignIn> {
}

export default class SignIn
  extends React.Component<ISignInProps, {}>
  implements ReactRouter.HistoryMixin {

  public history: ReactRouter.History;
  private lock: Auth0LockStatic;

  public constructor(props: ISignInProps) {
    super(props);

    this.lock = new Auth0Lock("pBlrvvglMB7E4Ej8Z0YBb7NlcOWYBasm", "concludely.auth0.com");
  }

  public render(): React.ReactElement<{}> {
    return (<div>Signing in</div>);
  }

  public componentDidMount(): void {
    if (SessionStore.GetIsLoggedIn()) {
      return this.history.pushState(null, this.props.location.query.return || "/");
    }
    this.lock.show((err: Auth0Error, profile: Auth0UserProfile, accessToken: string) => {
      if (err) {
        // There was an error logging the user in
        return alert(err.message);
      }

      var user: IUser = {
        Id: profile.user_id,
        Name: profile.name,
        Email: profile.email,
        AvatarUrl: profile.picture
      };

      // Couldn't figure out how to get the actual accessToken to be modified in a rule by Auth0...
      accessToken = profile["id_token"];

      try {
        SessionActionCreators.SignIn(user, accessToken);
        this.history.replaceState(null, this.props.location.query.return || "/items");
      } catch (err) {
        GlobalErrorActionCreator.Error(err);
      }
    });
  }
};

reactMixin.onClass(SignIn, HistoryMixin);