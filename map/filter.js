// filter.js
document.querySelector(".filter-toggle").addEventListener("click", () => {
  document.querySelector(".filter-panel").classList.add("active");
});

document.querySelector(".close-filter").addEventListener("click", () => {
  document.querySelector(".filter-panel").classList.remove("active");
});

// Filter logic nanti disini
