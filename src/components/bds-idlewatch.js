export class BDSIdlewatch extends HTMLElement {
  constructor() {
    super();
    const idletimeout = this.getAttribute("bds-idletimeout");

    setIdleTimer(
      () => {
        //onIdle()
        //document.querySelector(`main`).innerHTML = "<h2>Your are Idle!</h2>";
        //window.confirm("Extend the Session?");
        document.querySelector("bds-modal").innerHTML = `
          <h2>Session Timed Out!</h2>
          <h3>Extend the Session?</h3>
          <button>Ok</button>
        `;
        document.querySelector("bds-modal").open = true;
      },
      () => {
        //onNotIdle()
        document.querySelector(`main`).innerHTML = "<h2>Your are Active!</h2>";
      }
    );

    function setIdleTimer(onIdle, onNotIdle) {
      let timeout = 0;
      startTimer();
      function startTimer() {
        timeout = setTimeout(onExpires, idletimeout);
        document.addEventListener("click", onActivity);
        document.addEventListener("mousemove", onActivity);
        document.addEventListener("keypress", onActivity);
      }

      function onExpires() {
        timeout = 0;
        document.removeEventListener("click", onActivity);
        document.removeEventListener("mousemove", onActivity);
        document.removeEventListener("keypress", onActivity);
        setTimeout(startTimer, 1000);
        onIdle();
      }

      function onActivity() {
        if (timeout) {
          clearTimeout(timeout);
        } else {
          onNotIdle();
        }
        // Since the mouse is moving, we turn off our event hooks for a second
        document.removeEventListener("click", onActivity);
        document.removeEventListener("mousemove", onActivity);
        document.removeEventListener("keypress", onActivity);
        setTimeout(startTimer, 1000);
      }
    }
  } // constructor end
} // class end
window.customElements.define("bds-idlewatch", BDSIdlewatch);
