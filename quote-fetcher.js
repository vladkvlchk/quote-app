const template = `
<style>
@import url('./quote-fetcher.css');
</style>
<h1 data-author></h1>
<blockquote data-content>The quote</blockquote>
`;

class QuoteFetcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
  }

  connectedCallback() {
    this.refresh();

    document.body.addEventListener("click", () => this.refresh());
  }

  refresh() {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((json) => {
        Object.assign(this.dataset, json);
      });
  }

  static get observedAttributes() {
    return ["data-author", "data-content"];
  }

  attributeChangedCallback(attr, prev, value) {
    this[attr](value, this.shadowRoot.querySelector(`[${attr}]`));
  }

  ["data-author"](value, el) {
    el.textContent = value;
  }
  ["data-content"](value, el) {
    el.textContent = value;
  }
}

customElements.define("quote-fetcher", QuoteFetcher);
