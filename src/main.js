import "./main.css";

import WebApp from "./components/web-app";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import WebBar from "./components/web-bar";
import WebPlate from "./components/web-view/views/web-plate";
import WebThemeButton from "./components/web-theme-button";
import WebPowerButton from "./components/web-power-button";

customElements.define("web-app", WebApp);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-view", WebView);
customElements.define("web-navigation", WebNavigation);
customElements.define("web-navigation-item", WebNavigationItem);
customElements.define("web-bar", WebBar);
customElements.define("web-plate", WebPlate);
customElements.define("web-theme-button", WebThemeButton);
customElements.define("web-power-button", WebPowerButton);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");

webApp.view = "plate-check";
webApp.enterprise = "Los Santos Police Department";

app?.append(webApp);
