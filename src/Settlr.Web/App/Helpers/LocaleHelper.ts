import cookie = require("cookie");

export default class LocaleHelper {
  public static GetLocaleFromCookie(): string {
    var currentCookies = cookie.parse(document.cookie);
    return currentCookies["locale"];
  }

  public static SetLocaleInCookie(locale: string): void {
    var currentCookies = cookie.parse(document.cookie);
    if (currentCookies["locale"]) {
      document.cookie = cookie.serialize("locale", currentCookies["locale"], { expires: new Date(1950, 0, 0) });
    }
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    var cookieValue = cookie.serialize("locale", locale, {
      path: "/",
      expires: expires
    });
    document.cookie = cookieValue;
  }
}