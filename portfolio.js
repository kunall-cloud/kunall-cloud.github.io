/**
 * Portfolio page — populates content from config.js
 */
document.getElementById("year").textContent = new Date().getFullYear();

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, href, label) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = href;
  if (label !== undefined) el.textContent = label;
}

setText("nav-name", SITE.name);
setText("hero-name", SITE.name);
setText("hero-role", SITE.role);
setText("hero-tagline", SITE.tagline);
setText("hero-location", SITE.location);
setText("about-text", SITE.about);
setText("footer-name", SITE.name);

setHref("hero-linkedin", SITE.linkedin);
setHref("linkedin-follow", SITE.linkedin);
setHref("contact-email", `mailto:${SITE.email}`, SITE.email);
setHref("contact-linkedin", SITE.linkedin, SITE.linkedinDisplay);

const skillsList = document.getElementById("skills-list");
SITE.skills.forEach((skill) => {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = skill;
  skillsList.appendChild(tag);
});

const certGrid = document.getElementById("cert-grid");
SITE.certifications.forEach((cert) => {
  const card = document.createElement("article");
  card.className = `cert-card${cert.id === "saa" ? " cert-card--featured" : ""}`;
  card.innerHTML = `
    <div class="cert-card__badge">
      <img src="${cert.badge}" alt="" aria-hidden="true">
      <span class="cert-card__aws">AWS</span>
    </div>
    <div class="cert-card__body">
      <span class="cert-card__code">${cert.shortName}</span>
      <h3 class="cert-card__name">${cert.name}</h3>
      <p class="cert-card__meta">${cert.issuer} · ${cert.year}</p>
      <a href="${cert.verifyUrl}" class="cert-card__link" target="_blank" rel="noopener noreferrer">
        Verify credential →
      </a>
    </div>
  `;
  certGrid.appendChild(card);
});

const experienceList = document.getElementById("experience-list");
SITE.experience.forEach((job) => {
  const item = document.createElement("article");
  item.className = "timeline__item";
  item.innerHTML = `
    <div class="timeline__marker"></div>
    <div class="timeline__content">
      <div class="timeline__head">
        <h3>${job.title}</h3>
        <span class="timeline__period">${job.period}</span>
      </div>
      <p class="timeline__company">${job.company}</p>
      <ul class="timeline__points">
        ${job.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </div>
  `;
  experienceList.appendChild(item);
});

const postsGrid = document.getElementById("linkedin-posts");
SITE.linkedinPosts.forEach((post) => {
  const card = document.createElement("a");
  card.href = post.url;
  card.className = "post-card";
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.innerHTML = `
    <div class="post-card__header">
      <div class="post-card__avatar">${SITE.name.charAt(0)}</div>
      <div>
        <p class="post-card__author">${SITE.name}</p>
        <p class="post-card__meta">${SITE.role} · ${post.date}</p>
      </div>
      <svg class="post-card__linkedin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </div>
    <p class="post-card__excerpt">${post.excerpt}</p>
    <div class="post-card__stats">
      <span>${post.likes} reactions</span>
      <span>${post.comments} comments</span>
    </div>
  `;
  postsGrid.appendChild(card);
});

const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const formSubmit = document.getElementById("form-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  formSubmit.disabled = true;
  formSubmit.textContent = "Sending…";

  try {
    if (SITE.formEndpoint) {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
    } else {
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
    }

    formStatus.textContent = "Message sent! I'll get back to you soon.";
    formStatus.classList.add("form-status--success");
    form.reset();
  } catch {
    formStatus.textContent = "Something went wrong. Please email me directly.";
    formStatus.classList.add("form-status--error");
  } finally {
    formSubmit.disabled = false;
    formSubmit.textContent = "Send message";
  }
});

initAwsBackground({ hoverTarget: document.querySelector(".page-shell") });

const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 20);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));
