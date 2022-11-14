import WebButton from "../../../components/web-button";

class WebDispatchAddGroupButton extends WebButton {
  #isMounted = false;

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  constructor() {
    super();
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.#isMounted) {
      this.icon = "add";
      this.label = "Ajouter un équipage";
      this.#isMounted = true;
    }
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    super.attributeChangedCallback(name, _oldValue, newValue);
  }

  handleButtonClick() {
    console.log("send click event");
  }
}

export default WebDispatchAddGroupButton;
