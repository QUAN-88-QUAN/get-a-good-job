const imgs = document.querySelectorAll(".container img");
const pointer = document.querySelector(".pointer");
for (const img of imgs) {
  img.addEventListener("mouseenter", function () {
    const s = img.offsetWidth;
    const x = img.offsetLeft;
    const y = img.offsetTop;
    pointer.style.setProperty("--x", x + "px");
    pointer.style.setProperty("--y", y + "px");
    pointer.style.setProperty("--s", s + "px");
  });
}
