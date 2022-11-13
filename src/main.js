import "./main.css";

import WebApp from "./components/web-app";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebBar from "./components/web-bar";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import WebThemeSwitch from "./components/web-switch/web-theme-switch";
import WebScreenSwitch from "./components/web-switch/web-screen-switch";

import WebPlateView from "./components/web-view/views/web-plate-view";
import WebInvestigationView from "./components/web-view/views/web-investigation-view";
import WebDispatchView from "./components/web-view/views/web-dispatch-view";

customElements.define("web-app", WebApp);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-view", WebView);
customElements.define("web-bar", WebBar);
customElements.define("web-navigation", WebNavigation);
customElements.define("web-navigation-item", WebNavigationItem);
customElements.define("web-theme-switch", WebThemeSwitch);
customElements.define("web-screen-switch", WebScreenSwitch);

customElements.define("web-plate-view", WebPlateView);
customElements.define("web-investigation-view", WebInvestigationView);
customElements.define("web-dispatch-view", WebDispatchView);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");

webApp.enterprise = "Los Santos Police Department";

app?.append(webApp);
