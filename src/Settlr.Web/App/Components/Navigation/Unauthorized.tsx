import React = require("react");

interface IUnauthorizedProps extends React.Props<Unauthorized> {
}

export default class Unauthorized
  extends React.Component<IUnauthorizedProps, {}> {

  public constructor(props: IUnauthorizedProps) {
    super(props);
  }

  public render(): React.ReactElement<{}> {
    return (<div className="content-container">Unauthorized</div>);
  }
};