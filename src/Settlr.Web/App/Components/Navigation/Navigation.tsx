import React = require("react");
import reactMixin = require("react-mixin");
import {History as HistoryMixin} from "react-router";
import LocaleHelper from "../../Helpers/LocaleHelper";
import {bindAllThis} from "../../Helpers/ComponentHelper";

interface INavigationProps {
  user: IUser;
}

interface INavigationState {
  hovering: boolean;
}

export default class Navigation extends React.Component<INavigationProps, INavigationState> implements ReactRouter.HistoryMixin {
  public history: ReactRouter.History;

  public constructor(props: INavigationProps) {
    super(props);

    this.state = {
      hovering: false
    };

    bindAllThis(this);
  }

  public render(): React.ReactElement<{}> {
    const version = document.getElementById("root").getAttribute("data-version");
    return <div>{version} { this.props.user ? this.renderSignedIn() : this.renderSignedOut() }</div>;
  }

  private renderSignedIn(): React.ReactElement<{}> {
    return (<div>signed in <img src={this.props.user.AvatarUrl} /></div>);
  }

  private renderSignedOut(): React.ReactElement<{}> {
    return <div>sign in plz</div>;
  }

  private switchLanguage(lang: string): void {
    LocaleHelper.SetLocaleInCookie(lang);
    window.location.reload();
  }
};

reactMixin.onClass(Navigation, HistoryMixin);