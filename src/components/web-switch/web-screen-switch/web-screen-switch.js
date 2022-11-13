import WebSwitch from "../web-switch";

const LOCAL_STORAGE_KEY = "failyv-screen";
const WINDOW_SCREEN_SIZE = "window";
const FULL_SCREEN_SIZE = "full";

class WebScreenSwitch extends WebSwitch {
  #labelElement;
  #inputElement;

  static get observedAttributes() {
    return ["data-label", "data-screen"];
  }

  constructor() {
    super();
    this.#labelElement = this.template.querySelector('[data-js="label"]');
    this.#inputElement = this.template.querySelector('[data-js="input"]');
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  get localScreen() {
    const localstorageTheme = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (localstorageTheme === FULL_SCREEN_SIZE) {
      return FULL_SCREEN_SIZE;
    } else {
      return WINDOW_SCREEN_SIZE;
    }
  }

  set localScreen(newLocalScreen) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        newLocalScreen === FULL_SCREEN_SIZE
          ? FULL_SCREEN_SIZE
          : WINDOW_SCREEN_SIZE
      )
    );
  }

  get label() {
    return this.dataset.label;
  }

  set label(newLabel) {
    if (typeof newLabel === "string") {
      this.dataset.label = newLabel;
    } else {
      this.removeAttribute("data-label");
    }
  }

  get screen() {
    return this.dataset.screen;
  }

  set screen(newScreen) {
    if (typeof newScreen === "string") {
      this.dataset.screen = newScreen;
    } else {
      this.removeAttribute("data-screen");
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.upgradeProperty("label");
    this.upgradeProperty("screen");
    this.screen = this.localScreen;
    if (this.screen === FULL_SCREEN_SIZE) this.#inputElement.checked = true;
    this.#inputElement.addEventListener("change", this.handleInputChange);
  }

  disconnectedCallback() {
    this.#inputElement.removeEventListener("change", this.handleInputChange);
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
      case "data-label":
        this.#labelElement.textContent = newValue ?? "";
        break;
      case "data-screen":
        if (newValue === FULL_SCREEN_SIZE) {
          document.documentElement.dataset.screen = FULL_SCREEN_SIZE;
          this.localScreen = FULL_SCREEN_SIZE;
        } else {
          document.documentElement.dataset.screen = WINDOW_SCREEN_SIZE;
          this.localScreen = WINDOW_SCREEN_SIZE;
        }
        break;
    }
  }

  handleInputChange() {
    if (this.#inputElement.checked) {
      this.screen = FULL_SCREEN_SIZE;
    } else {
      this.screen = WINDOW_SCREEN_SIZE;
    }
  }
}

export default WebScreenSwitch;
