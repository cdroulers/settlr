import request = require("superagent");
import async = require("async");
import BaseApiUtils from "./BaseApiUtils";
import {IDebate} from "../Models/Debates/IDebate";

class ItemsApiUtils extends BaseApiUtils {
  private debatesUrl: string = `${BaseApiUtils.rootUrl}/debates`;

  public LoadItem(id: string, callback: INodeCallback<IDebate>): void {
    request
      .get(this.debatesUrl + "/" + id)
      .set(BaseApiUtils.GetAuthorization())
      .end((err: Error, res: request.Response) => {
        if (err) {
          return callback(err);
        }

        callback(null, res.body);
      });
  }
}

export default new ItemsApiUtils();