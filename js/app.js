/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");
const nav = document.getElementById("menuList");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function removeActiveFromlinks() {
  if (document.querySelectorAll("#menuList li.active")) {
    document.querySelectorAll("#menuList li.active").forEach(function (el) {
      el.classList.remove("active");
    });
  }
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
function buildNav() {
  for (section of sections) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = section.getAttribute("data-nav");
    li.appendChild(a);
    a.setAttribute("link-section", section.getAttribute("id"));
    nav.appendChild(li);
  }
}
// Add class 'active' to section when near top of viewport

function viewPort() {
  for (section of sections) {
    if (
      section.getBoundingClientRect().top > -200 &&
      section.getBoundingClientRect().top + 300 < window.innerHeight
    ) {
      removeActiveFromlinks();
      section.classList.add("active");
      document
        .querySelector(`[link-section ='${section.getAttribute("id")}']`)
        .parentElement.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
  if (event.target.nodeName === "A") {
    removeActiveFromlinks();
    event.target.parentElement.classList.toggle("active");
    const section = document.getElementById(
      `${event.target.getAttribute("link-section")}`
    );
    section.scrollIntoView({ behavior: "smooth", block: "end" });
  }
}
/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
document.addEventListener("DOMContentLoaded", buildNav);
// Scroll to section on link click
setTimeout(function () {
  nav.addEventListener("click", scrollToSection);
}, 0);
// Set sections as active
document.addEventListener("scroll", viewPort);
