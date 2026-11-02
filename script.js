document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
    });
  }

  document.querySelectorAll(".photo-shell").forEach(function (shell) {
    const img = shell.querySelector("img");
    if (!img) {
      shell.classList.add("is-empty");
      return;
    }
    function checkImage() {
      if (!img.complete || img.naturalWidth === 0) {
        shell.classList.add("is-empty");
      } else {
        shell.classList.remove("is-empty");
      }
    }
    img.addEventListener("load", checkImage);
    img.addEventListener("error", checkImage);
    checkImage();
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const items = Array.from(document.querySelectorAll(".gallery-item"));
    const image = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    let current = 0;

    function showPhoto(index) {
      current = (index + items.length) % items.length;
      const item = items[current];
      image.src = item.dataset.image;
      caption.textContent = item.dataset.caption || "";
    }
    function openPhoto(index) {
      showPhoto(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeButton.focus();
    }
    function closePhoto() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      image.src = "";
    }

    items.forEach(function (item, index) {
      item.addEventListener("click", function () { openPhoto(index); });
    });
    closeButton.addEventListener("click", closePhoto);
    previousButton.addEventListener("click", function () { showPhoto(current - 1); });
    nextButton.addEventListener("click", function () { showPhoto(current + 1); });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closePhoto();
    });
    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("open")) return;
      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") showPhoto(current - 1);
      if (event.key === "ArrowRight") showPhoto(current + 1);
    });
  }
});
