import request = require("superagent");
import async = require("async");
import BaseApiUtils from "./BaseApiUtils";
import {IArgument} from "../Models/Arguments/IArgument";

class ArgumentsApiUtils extends BaseApiUtils {
  private argumentsUrl: string = `${BaseApiUtils.rootUrl}/arguments`;

  public LoadArgument(id: string, callback: INodeCallback<IArgument>): void {
    request
      .get(this.argumentsUrl + "/" + id)
      .set(BaseApiUtils.GetAuthorization())
      .end((err: Error, res: request.Response) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });
  }

  public LoadRecentItems(callback: INodeCallback<IArgument[]>): void {
    request
      .get(this.argumentsUrl)
      .set(BaseApiUtils.GetAuthorization())
      .end((err: Error, res: request.Response) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body.data);
      });
  }
}

export default new ArgumentsApiUtils();