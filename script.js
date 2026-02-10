document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("valentine-card");
  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");
  const page1 = document.getElementById("page-1");
  const page2 = document.getElementById("page-2");

  if (!card || !yesButton || !noButton || !page1 || !page2) return;

  // Open the card like a book when clicking the cover
  card.addEventListener("click", (event) => {
    if (event.target.closest(".card-cover") && !card.classList.contains("open")) {
      card.classList.add("open");
    }
  });

  // Yes button: go to page 2
  yesButton.addEventListener("click", (event) => {
    event.stopPropagation();
    page1.classList.remove("active");
    page2.classList.add("active");
  });

  // No button: show popup GIF next to button
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    // remove any existing popup
    const old = document.querySelector(".no-popup");
    if (old) {
      clearTimeout(old._removeTimer);
      old.remove();
    }

    const img = document.createElement("img");
    img.src = "assets/angrydudu.gif"; // make sure this path is correct
    img.alt = "reaction";
    img.className = "no-popup";

    // key changes: fixed position + high z-index
    img.style.position = "fixed";
    img.style.pointerEvents = "none";
    img.style.zIndex = 10000;
    img.style.opacity = 0;
    img.style.transition = "opacity 0.25s ease";

    document.body.appendChild(img);

    const place = () => {
      const b = noButton.getBoundingClientRect();
      const i = img.getBoundingClientRect();

      img.style.top = `${b.top + (b.height - i.height) / 1}px`;
      img.style.left = `${b.left +( b.width - i.height) /3}px`;

      requestAnimationFrame(() => img.style.opacity = 1);
    };

    img.complete ? place() : img.onload = place;

    // auto-remove after 3 seconds
    img._removeTimer = setTimeout(() => {
      img.style.opacity = 0;
      setTimeout(() => img.remove(), 250);
    }, 3000);
  });

  yesButton.addEventListener("click", (event) => {
  event.stopPropagation();
  page1.classList.remove("active");
  page2.classList.add("active");

  // Confetti effect
  confetti({
    particleCount: 500,        // number of confetti pieces
    spread: 100,                // how wide they spread
    origin: { y: 1 },          // start at the top
    colors: ['#ff4f7b', '#ffe9f2', '#ff758c', '#fad0c4'] // matching your card theme
  });
});
});
