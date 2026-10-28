const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const ideaForm = document.getElementById("ideaForm");
const formMessage = document.getElementById("formMessage");
const ideaCount = document.getElementById("ideaCount");
const pendingCount = document.getElementById("pendingCount");
let submittedIdeas = [];

function updateIdeaCounts() {
  ideaCount.innerHTML = `${submittedIdeas.length} <small>ideas</small>`;
  pendingCount.textContent = String(submittedIdeas.length);
}

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!ideaForm.reportValidity()) return;

  const formData = new FormData(ideaForm);
  const idea = {
    name: String(formData.get("studentName")).trim(),
    category: String(formData.get("resourceType")),
    problem: String(formData.get("problem")).trim(),
    solution: String(formData.get("solution")).trim(),
    submittedAt: new Date().toISOString()
  };

  submittedIdeas.push(idea);
  updateIdeaCounts();
  formMessage.textContent = `Thanks, ${idea.name}! Your ${idea.category.toLowerCase()} idea has been added to this demo session.`;
  ideaForm.reset();
});

// Demo data only: values are illustrative and should be replaced with measured campus data.
updateIdeaCounts();


// Front-end demo login. This is NOT secure authentication and has no server/database.
const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");
const fillDemo = document.getElementById("fillDemo");
const logoutButton = document.getElementById("logoutButton");
const appMain = document.getElementById("appMain");
const siteHeader = document.querySelector(".site-header");
const siteFooter = document.querySelector(".site-footer");
const DEMO_EMAIL = "student@campus.com";
const DEMO_PASSWORD = "campus123";

function setSignedIn(isSignedIn) {
  loginScreen.hidden = isSignedIn;
  document.body.classList.toggle("login-active", !isSignedIn);
  [appMain, siteHeader, siteFooter].forEach((element) => {
    if (element) element.classList.toggle("is-locked", !isSignedIn);
  });
  if (isSignedIn) {
    loginMessage.textContent = "";
    loginMessage.classList.remove("success");
  } else {
    loginPassword.value = "";
  }
}

togglePassword.addEventListener("click", () => {
  const show = loginPassword.type === "password";
  loginPassword.type = show ? "text" : "password";
  togglePassword.textContent = show ? "Hide" : "Show";
  togglePassword.setAttribute("aria-label", show ? "Hide password" : "Show password");
});

fillDemo.addEventListener("click", () => {
  loginEmail.value = DEMO_EMAIL;
  loginPassword.value = DEMO_PASSWORD;
  loginMessage.textContent = "Demo credentials filled in. Click Sign in to continue.";
  loginMessage.classList.remove("success");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    loginMessage.textContent = "Sign-in successful. Welcome!";
    loginMessage.classList.add("success");
    setSignedIn(true);
    if (rememberMe && rememberMe.checked) sessionStorage.setItem("resourceHubDemoSignedIn", "true");
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    loginMessage.textContent = "Those details don't match the demo account. Use the demo credentials shown below.";
    loginMessage.classList.remove("success");
  }
});

logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("resourceHubDemoSignedIn");
  setSignedIn(false);
  loginEmail.focus();
});

// Optional convenience only: remembers the signed-in state in this tab if selected.
// This is not an authentication/security feature.
const rememberMe = document.getElementById("rememberMe");
if (rememberMe) {
  rememberMe.addEventListener("change", () => {
    if (!rememberMe.checked) sessionStorage.removeItem("resourceHubDemoSignedIn");
  });
}

if (sessionStorage.getItem("resourceHubDemoSignedIn") === "true") setSignedIn(true);


// Lightweight scroll reveal: native browser API, no external animation library required.
const revealTargets = document.querySelectorAll(
  ".resource-card, .metric-card, .workflow article, .outcome-list div"
);
if ("IntersectionObserver" in window) {
  revealTargets.forEach((element) => element.classList.add("reveal-ready"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}
