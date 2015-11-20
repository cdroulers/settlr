import SessionStore from "../Stores/SessionStore";

export default class BaseApiUtils {
  protected static rootUrl: string = process.env.API_URL_ROOT + process.env.API_URL_PATH;

  protected static GetAuthorization(): {} {
    return {
      Authorization: "Bearer " + SessionStore.GetAccessToken()
    };
  }

  protected static GetAuthorizationQueryString(): string {
    return "&token=" + SessionStore.GetAccessToken();
  }

  protected static StringToDateTime(dateTime: string, isOnlyDate: boolean = false): Date {
    if (!dateTime) {
      return null;
    }

    if (isOnlyDate) {
      var newDate = new Date(dateTime);

      if (typeof dateTime !== "object") {
        newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
      }

      newDate.setHours(0, 0, 0, 0);

      return newDate;
    }

    return new Date(dateTime);
  }
}