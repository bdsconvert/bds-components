export class BDSSignon extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .signon {
          display: grid;
          margin: 1rem;
        }
      </style>
      <h2>Sign On</h2>
      <form class="signon">
        <label for="email">Email:</label>
        <input type="email" name="email" placeholder="Your Registered Email" required />
        <br />
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="Your Password" required />
        <br />
        <button>Submit</button>
      </form>
    `;

    this.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Submit Clicked");
    });
  }
} // Class End
window.customElements.define("bds-signon", BDSSignon);
