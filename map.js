// map.js
const map = L.map("map").setView([-2.5489, 118.0149], 5); // Tengah Indonesia

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Contoh marker alumni
L.marker([-6.2088, 106.8456])
  .addTo(map) // Jakarta
  .bindPopup("<b>John Doe</b><br>Geodesi Engineer<br>PT. Survey Kita");

L.marker([-7.2575, 112.7521])
  .addTo(map) // Surabaya
  .bindPopup("<b>Jane Smith</b><br>GIS Specialist<br>Badan Pertanahan");

// Nanti bisa tambah lebih banyak marker dari database
