document.getElementById("year").textContent = new Date().getFullYear();

const emailLink = document.getElementById("email-link");
const linkedinLink = document.getElementById("linkedin-link");

if (emailLink) {
  emailLink.href = `mailto:${SITE.email}`;
  emailLink.querySelector("span").textContent = SITE.email;
}

if (linkedinLink) {
  linkedinLink.href = SITE.linkedin;
}

initAwsBackground({ hoverTarget: document.querySelector(".hero") });
