export class BDSIdlewatch extends HTMLElement {
  constructor() {
    super();
    let signedin = this.getAttribute("signedin");
    const idletimeout = this.getAttribute("bds-idletimeout");
    let countdown = 60;
    let intrvlid;

    if (signedin === "true") setIdleTimer(onIdle, () => {});

    function onIdle() {
      document.querySelector("bds-modal").innerHTML = `
      <h2>Session Timed Out!</h2>
      <h3>Close this Modal to Extend the Session?</h3>
      <h1>Will Logoff in <span id="countdown">${countdown}</span> Secs!</h1>
    `;
      document.querySelector("bds-modal").open = true;
      document.querySelector("bds-nav").style.pointerEvents = "none";
      // setup countdown logoff interval timer
      if (!intrvlid) {
        countdown = 10;
        intrvlid = setInterval(() => {
          document.querySelector("#countdown").innerText = countdown--;
          if (countdown === 0) {
            signedin = "false";
            clearInterval(intrvlid);
            intrvlid = null;
            document.querySelector("bds-modal").open = false;
            //setIdleTimer(onIdle, () => {});
            document.querySelector("main").innerHTML =
              "<h1>You are now logged off due to inactivity!</h1>";
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
    document
      .querySelector("bds-modal")
      .addEventListener("bds-modal-closed", (e) => {
        console.log("BDSModal Closed - Restarting Idle Timer...", signedin);
        document.querySelector("bds-nav").style.pointerEvents = "auto";
        if (signedin === "true") setIdleTimer(onIdle, () => {});
        clearInterval(intrvlid);
        intrvlid = null;
      });
  } // constructor end
  disconnectedCallback() {
    clearInterval(this.intrvlid);
    this.intrvlid = null;
    this.signedin = false;
  }
} // class end
window.customElements.define("bds-idlewatch", BDSIdlewatch);
