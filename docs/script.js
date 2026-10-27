const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll(".brand strong").forEach((brandName) => {
  brandName.textContent = "Daiane Melo";
});
const footerCopyright = document.querySelector("footer .footer-content > small");
if (footerCopyright) {
  footerCopyright.textContent = `© ${new Date().getFullYear()} Daiane Melo Odontologia. Todos os direitos reservados.`;
}
