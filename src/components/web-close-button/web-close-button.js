import WebButton from "../web-button";

class WebCloseButton extends WebButton {
  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

export default WebCloseButton;
