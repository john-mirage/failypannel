import "./main.css";

import WebApp from "./components/web-app";
import WebBar from "./components/web-bar";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import WebThemeSwitch from "./components/web-theme-switch";

import WebCarPlate from "./views/web-car-plate";
import WebInvestigation from "./views/web-investigation";

import WebDispatch from "./views/web-dispatch";
import WebDispatchToolbar from "./views/web-dispatch/web-dispatch-toolbar";
import WebDispatchCategory from "./views/web-dispatch/web-dispatch-category";
import WebDispatchGroup from "./views/web-dispatch/web-dispatch-group";
import WebDispatchUnit from "./views/web-dispatch/web-dispatch-unit";

customElements.define("web-app", WebApp);
customElements.define("web-bar", WebBar);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-view", WebView);
customElements.define("web-navigation", WebNavigation);
customElements.define("web-navigation-item", WebNavigationItem);
customElements.define("web-theme-switch", WebThemeSwitch);

customElements.define("web-car-plate", WebCarPlate);
customElements.define("web-investigation", WebInvestigation);

customElements.define("web-dispatch", WebDispatch);
customElements.define("web-dispatch-toolbar", WebDispatchToolbar);
customElements.define("web-dispatch-category", WebDispatchCategory);
customElements.define("web-dispatch-group", WebDispatchGroup);
customElements.define("web-dispatch-unit", WebDispatchUnit);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");

app.replaceChildren(webApp);
