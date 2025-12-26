// map.js
document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([-2.5489, 118.0149], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // ===== 1. LOAD DATA DARI JSON =====
  fetch("database/alumni_data.json")
    .then((response) => response.json())
    .then((alumniList) => {
      alumniList.forEach((alumni) => {
        if (alumni.lokasi && alumni.lokasi.length === 2) {
          L.marker(alumni.lokasi).addTo(map).bindPopup(alumni.popupInfo);
        }
      });
      console.log(`✅ ${alumniList.length} marker alumni berhasil dimuat.`);
    })
    .catch((error) => {
      console.error("❌ Gagal memuat data alumni:", error);
      // Fallback: tampilkan pesan atau marker default jika diperlukan
      L.marker([-7.782075679850813, 110.41510201165303])
        .addTo(map)
        .bindPopup("<b>Data Alumni</b><br>Sedang dalam pengembangan.");
    });

  // ===== 2. KODE FILTER PANEL (tetap sama) =====
  const filterToggle = document.querySelector(".filter-toggle");
  const filterPanel = document.querySelector(".filter-panel");
  const closeFilter = document.querySelector(".close-filter");

  if (filterToggle) {
    filterToggle.addEventListener("click", function () {
      filterPanel.classList.toggle("active");
    });
  }

  if (closeFilter) {
    closeFilter.addEventListener("click", function () {
      filterPanel.classList.remove("active");
    });
  }
});
