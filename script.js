const dot = document.querySelector(".active-dot");

const buttons = document.querySelectorAll(".page-links button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Get the top position of the clicked button relative to its container
    const offsetTop = button.offsetTop + button.offsetHeight / 2 - 4; // center dot vertically (4 = dot radius)

    dot.style.top = `${offsetTop}px`;

    // Handle active class swap
    buttons.forEach(btn => btn.classList.remove("btn-active"));
    button.classList.add("btn-active");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const active = document.querySelector(".btn-active");
  const offsetTop = active.offsetTop + active.offsetHeight / 2 - 4;
  dot.style.top = `${offsetTop}px`;
});
