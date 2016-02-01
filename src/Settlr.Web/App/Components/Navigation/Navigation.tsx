import React = require("react");
import reactMixin = require("react-mixin");
import {History as HistoryMixin} from "react-router";
import LocaleHelper from "../../Helpers/LocaleHelper";
import {bindAllThis} from "../../Helpers/ComponentHelper";
import {Link} from "react-router";

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
    return (<header className="clearfix">
      { this.renderSignedIn() }
      <h3 className="text-muted">Settlr {version}</h3>
      </header>);
  }

  private renderSignedIn(): React.ReactElement<{}> {
    return (<nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation"><Link to="/" activeClassName="active">Home</Link></li>
            <li role="presentation"><Link to="/arguments" activeClassName="active">Arguments</Link></li>
            <li role="presentation"><Link to="/about" activeClassName="active">About</Link></li>
            <li role="presentation"><Link to="/contact" activeClassName="active">Contact</Link></li>
            </ul>
      </nav>);
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