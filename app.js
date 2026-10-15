"use strict";

const projects = {
  paris: {
    title: "Paris Secrets",
    category: "01 / BRAND IDENTITY & PACKAGING",
    image: "paris",
    alt: "Lavender perfume packaging and bottle for Paris Secrets",
    intro:
      "An intimate fragrance identity that captures the quieter, more mysterious side of Paris.",
    idea: "Explore a fragrance brand that feels personal rather than performative. The concept balances old-world romance with a clean, contemporary point of view.",
    approach:
      "A lavender palette, expressive serif typography, and a distinctive monogram create a cohesive world across the bottle, carton, and supporting brand materials.",
    tags: [
      "Visual identity",
      "Art direction",
      "Packaging design",
      "Typography",
    ],
  },
  ocean: {
    title: "Oceanic Feeling",
    category: "02 / WEB DESIGN & DIGITAL EXPERIENCE",
    image: "ocean",
    alt: "A blue editorial website concept for Oceanic Feeling",
    intro:
      "A slower kind of digital experience. An invitation to pause, explore, and reconnect with the sea.",
    idea: "Translate the feeling of standing at the edge of the ocean into an editorial website: expansive, calming, and full of possibility.",
    approach:
      "Oversized typography meets layered coastal shapes and a restrained blue palette. Clear navigation and generous spacing keep the experience intuitive on every screen.",
    tags: [
      "Web design",
      "Art direction",
      "Responsive layouts",
      "Interaction design",
    ],
  },
  garden: {
    title: "Pure Summer Garden",
    category: "03 / BRAND STRATEGY & IDENTITY",
    image: "garden",
    alt: "Botanical green skincare packaging for Pure Summer Garden",
    intro:
      "A botanical brand world that brings a little more nature into the everyday.",
    idea: "Create a considered skincare concept rooted in simplicity. Fresh, approachable, and quietly confident, with the garden as a starting point.",
    approach:
      "Herbaceous greens, warm cream, and hand-drawn botanical shapes form a flexible visual system. Considered packaging gives each product a clear place in the collection.",
    tags: ["Brand positioning", "Visual identity", "Packaging", "Illustration"],
  },
  fairy: {
    title: "Fairy Tales",
    category: "04 / UI/UX & PRODUCT DESIGN",
    image: "fairy",
    alt: "Warm illustrated mobile reading app screens for Fairy Tales",
    intro:
      "A playful reading companion for curious minds and the stories they haven’t discovered yet.",
    idea: "Imagine a reading app that makes discovering the next story feel as inviting as opening a favorite book. A little magic, with usability at its heart.",
    approach:
      "Warm colors and original story illustrations invite exploration. A simple browsing structure, clear reading hierarchy, and friendly components keep the focus on the stories.",
    tags: ["Product thinking", "UX design", "UI design", "Prototyping"],
  },
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const motionButton = document.getElementById("motion-toggle");
let motionPaused = reduceMotion.matches;
function setMotion(paused) {
  motionPaused = paused;
  document.body.classList.toggle("motion-paused", paused);
  document.documentElement.style.scrollBehavior = paused ? "auto" : "";
  motionButton.disabled = reduceMotion.matches;
  motionButton.textContent = reduceMotion.matches
    ? "Reduced motion enabled"
    : paused
      ? "Resume motion"
      : "Pause motion";
  motionButton.setAttribute("aria-pressed", String(paused));
}
setMotion(motionPaused);
motionButton.addEventListener("click", () => setMotion(!motionPaused));
reduceMotion.addEventListener("change", (event) => setMotion(event.matches));

// Content stays visible if JavaScript or IntersectionObserver is unavailable.
if ("IntersectionObserver" in window) {
  document.body.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
}

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
function closeMenu(returnFocus = false) {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (
    !mobileNav.hidden &&
    !mobileNav.contains(event.target) &&
    !menuToggle.contains(event.target)
  )
    closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const cards = [...document.querySelectorAll(".project-card")];
document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => {
      const active = item === filter;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    cards.forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
      card.classList.remove("filter-enter");
      if (!card.hidden) {
        card.classList.add("visible");
        card.style.animationDelay = `${count * 65}ms`;
        // Restart the entrance without moving the user's scroll position.
        void card.offsetWidth;
        card.classList.add("filter-enter");
        count += 1;
      }
    });
    document.getElementById("filter-status").textContent =
      `Showing ${count} ${category === "all" ? "" : category + " "}project${count === 1 ? "" : "s"}`;
  });
});

const projectDialog = document.getElementById("project-dialog");
const projectKeys = Object.keys(projects);
let currentProject = "paris";
let projectOriginHash = "";
let dialogOpener = null;
function openDialog(dialog, opener) {
  dialogOpener = opener || document.activeElement;
  closeMenu();
  dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.scrollTop = 0;
  dialog.querySelector(".dialog-close").focus({ preventScroll: true });
}
function renderProject(key) {
  const project = projects[key];
  if (!project) return;
  currentProject = key;
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-detail-category").textContent =
    project.category;
  document.getElementById("project-detail-intro").textContent = project.intro;
  document.getElementById("project-detail-idea").textContent = project.idea;
  document.getElementById("project-detail-approach").textContent =
    project.approach;
  const image = document.getElementById("project-detail-image");
  image.src = `./assets/${project.image}.svg`;
  image.alt = project.alt;
  document.getElementById("project-detail-tags").replaceChildren(
    ...project.tags.map((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }),
  );
  projectDialog.scrollTop = 0;
}
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    projectOriginHash = location.hash;
    renderProject(button.dataset.project);
    openDialog(projectDialog, button);
    history.replaceState(null, "", `#project-${currentProject}`);
  });
});
document.getElementById("next-project").addEventListener("click", () => {
  const next =
    projectKeys[(projectKeys.indexOf(currentProject) + 1) % projectKeys.length];
  renderProject(next);
  history.replaceState(null, "", `#project-${next}`);
  projectDialog.querySelector(".dialog-close").focus({ preventScroll: true });
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    if (dialog === projectDialog && location.hash.startsWith("#project-")) {
      history.replaceState(
        null,
        "",
        location.pathname + location.search + projectOriginHash,
      );
    }
    if (dialogOpener?.isConnected) dialogOpener.focus({ preventScroll: true });
  });
});

const contactDialog = document.getElementById("contact-dialog");
document
  .querySelectorAll("[data-contact]")
  .forEach((button) =>
    button.addEventListener("click", () => openDialog(contactDialog, button)),
  );
const form = document.getElementById("contact-form");
const recipient = "ajalaisrael2015@gmail.com";
let inquiry = "";
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const service = data.get("service");
  const message = data.get("message").trim();
  if (!name || message.length < 15) {
    document.getElementById("form-status").textContent =
      "Please add your name and at least 15 characters about your project.";
    return;
  }
  const subject = `Project inquiry: ${service} — ${name}`;
  inquiry = `Hi Waterways,\n\n${message}\n\nInterested in: ${service}\n\nName: ${name}\nEmail: ${email}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiry)}`;
  const emailLink = document.createElement("a");
  emailLink.href = mailto;
  emailLink.hidden = true;
  document.body.append(emailLink);
  emailLink.click();
  emailLink.remove();
  document.getElementById("form-status").textContent =
    "Your email draft is ready. Review and send it in your email app. If it didn’t open, copy your inquiry below.";
  document.getElementById("email-fallback").hidden = false;
});
document.getElementById("copy-inquiry").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(`To: ${recipient}\n\n${inquiry}`);
    document.getElementById("form-status").textContent =
      "Inquiry copied. Paste it into an email to ajalaisrael2015@gmail.com.";
  } catch {
    // Clipboard permissions vary; a downloadable text file is a reliable fallback.
    const url = URL.createObjectURL(
      new Blob([`To: ${recipient}\n\n${inquiry}`], {
        type: "text/plain;charset=utf-8",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "waterways-project-inquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById("form-status").textContent =
      "Your inquiry was saved as a text file to share with the studio.";
  }
});

// A single animation frame per scroll keeps the progress indicator lightweight.
let framePending = false;
const progress = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".nav-link")];
function updateScroll() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  const current = [...document.querySelectorAll("main > section[id]")]
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 180)?.id;
  navLinks.forEach((link) => {
    const active = link.hash === `#${current}`;
    link.classList.toggle("current", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  framePending = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateScroll, { passive: true });
updateScroll();
document.getElementById("year").textContent = new Date().getFullYear();

function openProjectFromHash() {
  const key = location.hash.replace("#project-", "");
  if (location.hash.startsWith("#project-") && projects[key]) {
    projectOriginHash = "#work";
    renderProject(key);
    if (!projectDialog.open) openDialog(projectDialog);
  } else if (projectDialog.open) {
    projectDialog.close();
  }
}
window.addEventListener("hashchange", openProjectFromHash);
openProjectFromHash();
