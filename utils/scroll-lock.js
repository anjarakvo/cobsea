let scrollPosition = 0;
let body;
const DISABLE_SCROLLING_CLASS = "scroll-disabled";
const bodyScrollLock = {
  enable() {
    scrollPosition = window.pageYOffset;

    body = document.querySelector("body");
    body.classList.add(DISABLE_SCROLLING_CLASS);
    body.style.top = `-${scrollPosition}px`;
  },
  disable() {
    if (!body) {
      return;
    }

    body.classList.remove(DISABLE_SCROLLING_CLASS);
    body.style.removeProperty("top");

    window.scrollTo(0, scrollPosition);
  },
};
export default bodyScrollLock