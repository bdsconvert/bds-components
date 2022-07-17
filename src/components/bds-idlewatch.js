export class BDSIdlewatch extends HTMLElement {
  constructor() {
    super();
    let signedin = this.getAttribute("signedin");
    const idletimeout = this.getAttribute("bds-idletimeout");
    const onIdle = () => {
      bdsNav.setAttribute("loggedin", "false"); 
      IdleTimer("stop");
      console.log("Your time is up!!!");
      clearTimeout(timeout);
      timeout = 0;
      console.log("Idle detected: Removing idle timer!!!")
      bdsContent.innerHTML = "<br/><h2>You are now logged off due to inactivity!</h2>";
    }
    const onActivity = () => {
      console.log("Activity detected: Resetting idle timer!!!")
      clearTimeout(timeout);
      timeout = setTimeout(onIdle, idletimeout);
    }  
    const IdleTimer = (startstop) => {
      clearTimeout(timeout);
      ["click", "mousemove" , "keypress", "scroll"].forEach((event) => {
        startstop === 'start' ? document.addEventListener(event, onActivity) : document.removeEventListener(event, onActivity); 
      });
    }
  }
  
  static get observedAttributes() {
    return ["signedin"]; // array of attr to observe for changes
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "signedin") {
      newValue === "true" ? IdleTimer("start") : IdleTimer("stop");
    }
  }

} // class end
window.customElements.define("bds-idlewatch", BDSIdlewatch);
