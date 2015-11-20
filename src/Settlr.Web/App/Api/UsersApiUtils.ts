import request = require("superagent");
import BaseApiUtils from "./BaseApiUtils";

class UsersApiUtils extends BaseApiUtils {
  private usersUrl: string = `${BaseApiUtils.rootUrl}/users`;

  public GetAll(callback: INodeCallback<IUser[]>): void {

    request
      .get(this.usersUrl)
      .set(BaseApiUtils.GetAuthorization())
      .end((err: Error, res: request.Response) => {
        if (err) {
          return callback(err);
        }

        return callback(null, res.body);
      });
  }
}

export default new UsersApiUtils();