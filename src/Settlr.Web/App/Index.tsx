/* tslint:disable:no-unused-variable */
require("./main.less");
import React = require("react");
/* tslint:disable:no-unused-variable */
import {Router, Route} from "react-router";
import {IntlProvider, addLocaleData} from "react-intl";
import reactIntlFr = require("react-intl/lib/locale-data/fr");
import ReactDOM = require("react-dom");
import Home from "./Components/Home";
import AboutHome from "./Components/About/Home";
import ContactHome from "./Components/Contact/Home";
import ArgumentsHome from "./Components/Arguments/Home";
import ArgumentShow from "./Components/Arguments/Show";
import SessionStore from "./Stores/SessionStore";
import SignIn from "./Components/Navigation/SignIn";
import SignOut from "./Components/Navigation/SignOut";
import Unauthorized from "./Components/Navigation/Unauthorized";
import fr = require("./messages.fr");
import en = require("./messages.en");
import LocaleHelper from "./Helpers/LocaleHelper";
import History from "./History";

addLocaleData(reactIntlFr);

const supported = ["en", "fr"];
var locale: string = LocaleHelper.GetLocaleFromCookie() || navigator.language;
if (supported.indexOf(locale) < 0) {
  locale = "en"; // Default value;
}
window["locale"] = locale;
let messages = en;
if (locale === "fr") {
  messages = fr;
}
(document.body.parentNode as any).setAttribute("lang", locale);

const app = <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
  <Router history={History}>
    <Route path="/" component={Home}>
      <Route path="arguments" component={ArgumentsHome}>
        <Route path=":argumentId" component={ArgumentShow} />
        </Route>
      <Route path="about" component={AboutHome} />
      <Route path="contact" component={ContactHome} />
      </Route>
    </Router>
  </IntlProvider>;
ReactDOM.render(app, document.getElementById("root"));