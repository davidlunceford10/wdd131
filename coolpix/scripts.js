const menuText = document.querySelector(".menu-text");
const nav = document.querySelector(".navbar");

function toggleMenu() {
  nav.classList.toggle("open");
}

function closeMenu() {
  nav.classList.remove("open");
}

if (menuText && nav) {
 
  menuText.addEventListener("click", toggleMenu);


  menuText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) closeMenu();
  });
}

function buildFullImageSrc(src) {
  try {
    const url = new URL(src, window.location.href);
    const path = url.pathname;
    const dot = path.lastIndexOf(".");
    if (dot > -1) {
      const withFull = path.slice(0, dot) + "-full" + path.slice(dot);
      return url.href; 
    }
    return url.href;
  } catch {
    return src;
  }
}

function openModal(imgEl) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const content = document.createElement("div");
  content.className = "modal-content";

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "✕";

  const modalImg = document.createElement("img");
  modalImg.src = buildFullImageSrc(imgEl.src);
  modalImg.alt = imgEl.alt || "Expanded image";

  content.appendChild(closeBtn);
  content.appendChild(modalImg);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  function closeModal() {
    document.removeEventListener("keydown", onKeyDown);
    overlay.remove();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closeModal();
  }


  closeBtn.addEventListener("click", closeModal);


  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });


  document.addEventListener("keydown", onKeyDown);
}

document.querySelectorAll(".card img").forEach((img) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => openModal(img));
});
