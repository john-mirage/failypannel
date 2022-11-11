import "./main.css";

import WebApp from "./components/web-app";
import WebSidebar from "./components/web-sidebar";
import WebNavigation from "./components/web-navigation";

customElements.define("web-app", WebApp);
customElements.define("web-sidebar", WebSidebar);
customElements.define("web-navigation", WebNavigation);

const app = document.getElementById("app");
const webApp = document.createElement("web-app");
app?.append(webApp);
