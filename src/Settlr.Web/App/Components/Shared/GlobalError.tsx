import React = require("react");
import GlobalErrorStore from "../../Stores/GlobalErrorStore";

interface IGlobalErrorState {
  errorMessage: string;
}

export default class GlobalError extends React.Component<{}, IGlobalErrorState> {
  public constructor() {
    super();

    this.state = {
      errorMessage: ""
    };

    this.storeChanged = this.storeChanged.bind(this);
  }

  public componentDidMount(): void {
    GlobalErrorStore.addListener(this.storeChanged);
  }

  public componentWillUnmount(): void {
    GlobalErrorStore.removeListener(this.storeChanged);
  }

  public render(): React.ReactElement<{}> {
    return null;
  }

  private storeChanged(): void {
    const message = GlobalErrorStore.GetErrorMessage();
    this.setState({
      errorMessage: message
    });

    if (message) {
      var node = document.createElement("div");
      node.innerHTML = message;
      document.body.appendChild(node);
    }
  }
};