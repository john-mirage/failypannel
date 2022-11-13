const LOCAL_STORAGE_KEY = "failyv-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

class WebThemeButton extends HTMLElement {
  #isMounted = false;
  #template;
  #inputElement;

  static get observedAttributes() {
    return ["data-theme"];
  }

  get localTheme() {
    const localstorageTheme = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    const userThemeIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (
      localstorageTheme === DARK_THEME ||
      (!localstorageTheme && userThemeIsDark)
    ) {
      return DARK_THEME;
    } else {
      return LIGHT_THEME;
    }
  }

  set localTheme(newLocalTheme) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newLocalTheme === DARK_THEME ? DARK_THEME : LIGHT_THEME)
    );
  }

  get theme() {
    return this.dataset.theme;
  }

  set theme(newTheme) {
    if (typeof newTheme === "string") {
      this.dataset.theme = newTheme;
    } else {
      this.removeAttribute("data-theme");
    }
  }

  constructor() {
    super();
    const template = document.getElementById("template-web-theme-button");
    this.#template = template.content.cloneNode(true);
    this.#inputElement = this.#template.querySelector('[data-js="input"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  connectedCallback() {
    if (!this.#isMounted) {
      this.classList.add("webThemeButton");
      this.append(this.#template);
      this.#isMounted = true;
    }
    this.upgradeProperty("theme");
    this.theme = this.localTheme;
    if (this.theme === DARK_THEME) this.#inputElement.checked = true;
    this.#inputElement.addEventListener("change", this.handleInputChange);
  }

  upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    switch (name) {
      case "data-theme":
        if (newValue === DARK_THEME) {
          document.documentElement.dataset.theme = DARK_THEME;
          this.localTheme = DARK_THEME;
        } else {
          document.documentElement.dataset.theme = LIGHT_THEME;
          this.localTheme = LIGHT_THEME;
        }
        break;
    }
  }

  handleInputChange() {
    if (this.#inputElement.checked) {
      this.theme = DARK_THEME;
    } else {
      this.theme = LIGHT_THEME;
    }
  }
}

export default WebThemeButton;
