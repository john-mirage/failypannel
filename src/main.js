import "./main.css";
import WebApp from "./components/web-app";
import WebBar from "./components/web-bar";
import WebSidebar from "./components/web-sidebar";
import WebView from "./components/web-view";
import WebNavigation from "./components/web-navigation";
import WebNavigationItem from "./components/web-navigation-item";
import { WebModeSwitch, WebThemeSwitch } from "./components/web-switch";
import { WebCloseButton } from "./components/web-button";
import WebToolbar from "./components/web-toolbar";
import CarView from "./views/car/components/car-view";
import DocumentView from "./views/document/components/document-view";
import DocumentCardSection from "./views/document/components/document-section/document-card-section";
import DocumentEditorSection from "./views/document/components/document-section/document-editor-section";
import DocumentCommentSection from "./views/document/components/document-section/document-comment-section";
import DocumentEditor from "./views/document/components/document-editor";
import DocumentToolbar from "./views/document/components/document-toolbar";
import DispatchView from "./views/dispatch/components/dispatch-view";
import DispatchToolbar from "./views/dispatch/components/dispatch-toolbar";
import { DispatchGroupCategory, DispatchUnitCategory } from "./views/dispatch/components/dispatch-category";
import DispatchGroup from "./views/dispatch/components/dispatch-group";
import DispatchUnit from "./views/dispatch/components/dispatch-unit";
import DispatchIconButton from "./views/dispatch/components/dispatch-icon-button";
import Trix from "trix";

/**
 * global components
 */
customElements.define("web-app", WebApp, { extends: "div" });
customElements.define("web-bar", WebBar, { extends: "header" });
customElements.define("web-sidebar", WebSidebar, { extends: "aside" });
customElements.define("web-view", WebView, { extends: "main" });
customElements.define("web-navigation", WebNavigation, { extends: "nav" });
customElements.define("web-navigation-item", WebNavigationItem, { extends: "li" });
customElements.define("web-theme-switch", WebThemeSwitch, { extends: "label" });
customElements.define("web-mode-switch", WebModeSwitch, { extends: "label" });
customElements.define("web-close-button", WebCloseButton, { extends: "button" });
customElements.define("web-toolbar", WebToolbar, { extends: "header" });

/**
 * car plate view
 */
customElements.define("car-view", CarView, { extends: "article" });

/**
 * document view
 */
customElements.define("document-view", DocumentView, { extends: "article" });
customElements.define("document-toolbar", DocumentToolbar, { extends: "header" });
customElements.define("document-card-section", DocumentCardSection, { extends: "section" });
customElements.define("document-editor-section", DocumentEditorSection, { extends: "section" });
customElements.define("document-comment-section", DocumentCommentSection, { extends: "section" });
customElements.define("document-editor", DocumentEditor, { extends: "form" });

/**
 * dispatch view
 */
customElements.define("dispatch-view", DispatchView, { extends: "article" });
customElements.define("dispatch-toolbar", DispatchToolbar, { extends: "header" });
customElements.define("dispatch-group-category", DispatchGroupCategory, { extends: "li" });
customElements.define("dispatch-unit-category", DispatchUnitCategory, { extends: "li" });
customElements.define("dispatch-group", DispatchGroup, { extends: "li" });
customElements.define("dispatch-unit", DispatchUnit, { extends: "li" });
customElements.define("dispatch-icon-button", DispatchIconButton, { extends: "button" });

document.addEventListener("trix-file-accept", (event) => {
  event.preventDefault();
});

/**
 * app mount
 */

window.addEventListener("load", () => {
  const app = document.getElementById("app");
  const webApp = document.createElement("div", { is: "web-app" });

  app.replaceChildren(webApp);
  /*
  document.addEventListener("keyup", (keyboardEvent) => {
    if (keyboardEvent.key === "e") {
      if (app.children.length <= 0) {
        app.replaceChildren(webApp);
      }
    }
  });
  */
});
