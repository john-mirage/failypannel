import "./main.css";

import WebApp from "./components/web-app";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebNavigation from "./components/web-navigation";
import WebBar from "./components/web-bar";

customElements.define("web-app", WebApp);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-view", WebView);
customElements.define("web-navigation", WebNavigation);
customElements.define("web-bar", WebBar);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");

webApp.view = "plate-check";
webApp.enterprise = "Los Santos Police Department";

app?.append(webApp);
