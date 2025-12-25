// Initialize map
const map = L.map("map").setView([-2.5489, 118.0149], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

// Sample alumni markers
const alumniData = [
  {
    name: "John Doe",
    angkatan: 2018,
    posisi: "Surveyor",
    instansi: "PT. Survey Kita",
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    name: "Jane Smith",
    angkatan: 2020,
    posisi: "GIS Specialist",
    instansi: "Badan Pertanahan",
    lat: -7.2575,
    lng: 112.7521,
  },
];

// Add markers to map
alumniData.forEach((alumni) => {
  L.marker([alumni.lat, alumni.lng]).addTo(map).bindPopup(`
            <b>${alumni.name}</b><br>
            Angkatan: ${alumni.angkatan}<br>
            Posisi: ${alumni.posisi}<br>
            Instansi: ${alumni.instansi}
        `);
});
