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

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = carousel.querySelector(".carousel-dots");
  let currentSlide = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === currentSlide));
    dots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentSlide);
      dot.setAttribute("aria-selected", String(dotIndex === currentSlide));
    });
  };

  slides.forEach((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Ir para foto ${slideIndex + 1}`);
    dot.addEventListener("click", () => showSlide(slideIndex));
    dots.append(dot);
  });

  carousel.querySelector(".carousel-prev").addEventListener("click", () => showSlide(currentSlide - 1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => showSlide(currentSlide + 1));
  showSlide(0);
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll(".brand strong").forEach((brandName) => {
  brandName.textContent = "Daiane Melo";
});
const footerCopyright = document.querySelector("footer .footer-content > small");
if (footerCopyright) {
  footerCopyright.textContent = `© ${new Date().getFullYear()} Daiane Melo Odontologia. Todos os direitos reservados.`;
}
