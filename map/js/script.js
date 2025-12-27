// Toggle filter panel
const filterToggle = document.querySelector(".filter-toggle");
const filterPanel = document.querySelector(".filter-panel");
const closeFilter = document.querySelector(".close-filter");

filterToggle.addEventListener("click", function () {
  filterPanel.classList.toggle("active");
});

closeFilter.addEventListener("click", function () {
  filterPanel.classList.remove("active");
});

// Filter functionality (nanti diisi)
document.querySelector(".apply-filter").addEventListener("click", function () {
  console.log("Filter diterapkan!");
  filterPanel.classList.remove("active");
});
