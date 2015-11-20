declare interface INodeCallback<T> {
  (err: Error, result?: T): void
}

declare module "uuid" {
    var uuid: __NodeUUID.UUID;
    export = uuid;
}

declare module "react-intl/lib/locale-data/fr" {
    var data: ReactIntl.LocaleData;
    export = data;
}

declare namespace __React {
  interface Props<T> {
    location?: any;
    onTouchTap?: any;
    className?: string;
    style?: __React.CSSProperties;
  }
}

declare module "jwt-decode" {
  interface IJwtToken {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;

    [key: string]: any;
  }

  function decode(token: string): IJwtToken;

  export = decode;
}