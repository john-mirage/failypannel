import "./main.css";

import WebApp from "./components/web-app";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebBar from "./components/web-bar";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import WebThemeSwitch from "./components/web-theme-switch";
import WebScreenSwitch from "./components/web-screen-switch";

import WebCarPlate from "./views/web-car-plate";
import WebInvestigation from "./views/web-investigation";

import WebDispatch from "./views/web-dispatch";
import WebDispatchCategory from "./views/web-dispatch/web-dispatch-category";
import WebDispatchGroup from "./views/web-dispatch/web-dispatch-group";
import WebDispatchUnit from "./views/web-dispatch/web-dispatch-unit";
import WebDispatchGroupButton from "./views/web-dispatch/web-dispatch-group-button";

customElements.define("web-app", WebApp);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-view", WebView);
customElements.define("web-bar", WebBar);
customElements.define("web-navigation", WebNavigation);
customElements.define("web-navigation-item", WebNavigationItem);
customElements.define("web-theme-switch", WebThemeSwitch);
customElements.define("web-screen-switch", WebScreenSwitch);

customElements.define("web-car-plate", WebCarPlate);
customElements.define("web-investigation", WebInvestigation);

customElements.define("web-dispatch", WebDispatch);
customElements.define("web-dispatch-category", WebDispatchCategory);
customElements.define("web-dispatch-group", WebDispatchGroup);
customElements.define("web-dispatch-unit", WebDispatchUnit);
customElements.define("web-dispatch-group-button", WebDispatchGroupButton);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");

webApp.enterprise = "Los Santos Police Department";

app?.append(webApp);
