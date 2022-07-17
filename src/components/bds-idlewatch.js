export class BDSIdlewatch extends HTMLElement {
  constructor() {
    super();
    let signedin = this.getAttribute("signedin");
    const idletimeout = this.getAttribute("bds-idletimeout");
    let countdown = 60;
    let intrvlid;
console.log(signedin)    
    if (this.signedin === "true") setIdleTimer(onIdle, () => {});

    function onIdle() {
      bdsModal.innerHTML = `
      <h2>Session Timed Out!</h2><br/>
      <h3>Close this Window to Extend the Session?</h3><br/>
      <h2>Will Logoff in <span id="countdown">${this.countdown}</span> Secs!</h2>
    `;
      //document.querySelector("bds-modal").open = true;
      //document.querySelector("bds-nav").style.pointerEvents = "none";
      bdsModal.open = true;
      bdsNav.style.pointerEvents = "none";
      // setup countdown logoff interval timer
      if (!intrvlid) {
        countdown = 10;
        intrvlid = setInterval(() => {
          document.querySelector("#countdown").innerText = countdown--;
          if (countdown === 0) {
            signedin = "false";
            clearInterval(intrvlid);
            intrvlid = null;
            bdsModal.open = false;
            //setIdleTimer(onIdle, () => {});
            bdsContent.innerHTML = "<br/><h2>You are now logged off due to inactivity!</h2>";
            bdsNav.setAttribute("loggedin", "false");          
          }
        }, 1000);
      }
    }

    // set idle timer closure function
    function setIdleTimer(onIdle, onNotIdle) {
      let timeout = 0;
      startTimer();
      function startTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(onExpires, idletimeout);
        setupIdleEvents("add");
      }

      function onExpires() {
        timeout = 0;
        setupIdleEvents("remove");
        //setTimeout(startTimer, 1000);
        onIdle();
      }

      function onActivity() {
        console.log(timeout);
        if (timeout) {
          clearTimeout(timeout);
        } else {
          onNotIdle();
        }
        // Since the mouse is moving, we turn off our event hooks for a second
        setupIdleEvents("remove");
        setTimeout(startTimer, 1000);
      }
      function setupIdleEvents(addremove) {
        ["click", "mousemove", "keypress", "scroll"].forEach((event) => {
          if (addremove === "add") {
            document.addEventListener(event, onActivity);
          } else {
            document.removeEventListener(event, onActivity);
          }
        });
      }
    }

    // Reset Idle Timer when IdleTimer modal is closed.
    //document.querySelector("bds-modal")
      bdsModal.addEventListener("bds-modal-closed", (e) => {
        console.log("BDSModal Closed - Restarting Idle Timer...", signedin);
        bdsNav.style.pointerEvents = "auto";
        if (signedin === "true") setIdleTimer(onIdle, () => {});
        clearInterval(this.intrvlid);
        intrvlid = null;
      });

      // function observedAttributes() {
      //   return ["signedin"];
      // }
    
      // function attributeChangedCallback(name, oldValue, newValue) {
      //   signedin = newValue;
      //   if (signedin === "true") this.setIdleTimer(onIdle, () => {});
      // }
    
  } // constructor end

  disconnectedCallback() {
    clearInterval(this.intrvlid);
    this.intrvlid = null;
    this.signedin = false;
  }
} // class end
window.customElements.define("bds-idlewatch", BDSIdlewatch);
