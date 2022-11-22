import "./main.css";
import WebApp from "./components/web-app";
import WebBar from "./components/web-bar";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import WebThemeSwitch from "./components/web-theme-switch";
import WebModeSwitch from "./components/web-mode-switch";
import WebButton from "./components/web-button";
import WebCloseButton from "./components/web-close-button";
import CarView from "./views/car/car-view";
import DocumentView from "./views/document/document-view";
import DispatchView from "./views/dispatch/dispatch-view";
import DispatchToolbar from "./views/dispatch/dispatch-toolbar";
import DispatchCategory from "./views/dispatch/dispatch-category";
import DispatchGroup from "./views/dispatch/dispatch-group";
import DispatchUnit from "./views/dispatch/dispatch-unit";
import DispatchIconButton from "./views/dispatch/dispatch-icon-button";

/**
 * global components
 */
customElements.define("web-app", WebApp, { extends: "div" });
customElements.define("web-bar", WebBar, { extends: "header" });
customElements.define("web-button", WebButton, { extends: "button" });
customElements.define("web-sidebar", WebSidebar, { extends: "aside" });
customElements.define("web-view", WebView, { extends: "main" });
customElements.define("web-navigation", WebNavigation, { extends: "nav" });
customElements.define("web-navigation-item", WebNavigationItem, { extends: "li" });
customElements.define("web-theme-switch", WebThemeSwitch, { extends: "label" });
customElements.define("web-mode-switch", WebModeSwitch, { extends: "label" });
customElements.define("web-close-button", WebCloseButton, { extends: "button" });

/**
 * car plate view
 */
customElements.define("car-view", CarView, { extends: "article" });

/**
 * investigation view
 */
customElements.define("document-view", DocumentView, { extends: "article" });

/**
 * dispatch view
 */
customElements.define("dispatch-view", DispatchView, { extends: "article" });
customElements.define("dispatch-toolbar", DispatchToolbar, { extends: "header" });
customElements.define("dispatch-category", DispatchCategory, { extends: "li" });
customElements.define("dispatch-group", DispatchGroup, { extends: "li" });
customElements.define("dispatch-unit", DispatchUnit, { extends: "li" });
customElements.define("dispatch-icon-button", DispatchIconButton, { extends: "button" });

/**
 * app mount
 */

window.addEventListener("load", () => {
  const app = document.getElementById("app");
  const webApp = document.createElement("div", { is: "web-app" });

  document.addEventListener("keyup", (keyboardEvent) => {
    if (keyboardEvent.key === "e") {
      if (app.children.length <= 0) {
        app.replaceChildren(webApp);
      }
    }
  });
});
