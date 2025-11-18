// Initialize map centered on Fès
const map = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: true
}).setView([34.02, -5.00], 8);

// Light tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CartoDB',
  maxZoom: 18
}).addTo(map);

// --- data points ---
const mapPoints = [
  { Name: "Bensouda Zouagha", Lat: 34.00136, Lng: -5.06265, Color: "red", Description: "0101" },
  { Name: "Merja Oued Fes Douakarrat", Lat: 34.04000000, Lng: -4.87000000, Color: "red", Description: "0102" },
  { Name: "Bendebab Benslimane Belkhayat Ain Haroun Ain Kadous", Lat: 34.06434, Lng: -5.01259, Color: "red", Description: "0103" },
  { Name: "Bab fetouh Micella Sahb louard Sidi hrazem", Lat: 34.06102, Lng: -4.96648, Color: "red", Description: "0104" },
  { Name: "Centre ville Hay tarik", Lat: 34.02680, Lng: -5.02194, Color: "red", Description: "0105" },
  { Name: "RTE ain chkef al adarissa", Lat: 34.0117, Lng: -5.01087, Color: "red", Description: "0106" },
  { Name: "Bouremmana mont fleuri", Lat: 34.00579, Lng: -4.98344, Color: "red", Description: "0107" },
  { Name: "Narjiss Aouinat al hajjaj Bouhayrat saiss", Lat: 34.0537, Lng: -4.9457, Color: "red", Description: "0108" },
  { Name: "Ribate al khayr Tahla Elmenzal", Lat: 33.8237978, Lng: -4.4130648, Color: "green", Description: "0109" },
  { Name: "Ouled tayeb Ain chkef", Lat: 33.9598, Lng: -4.9954, Color: "orange", Description: "0110" },
  { Name: "Dhar El mahraz Bab elghoul", Lat: 34.04015, Lng: -4.98991, Color: "red", Description: "0111" },
  { Name: "Hoceima", Lat: 35.23761, Lng: -3.93856, Color: "yellow", Description: "0200" },
  { Name: "Azrou Ifran Mrirt Mouzzar Sidi Addi", Lat: 33.53167, Lng: -5.11599, Color: "green", Description: "0201" },
  { Name: "Meknes", Lat: 33.88290, Lng: -5.54563, Color: "green", Description: "0202 - 0206 - 0207 - 0208 - 0210 - 0214" },
  { Name: "Taza", Lat: 34.22466, Lng: -4.00171, Color: "green", Description: "0204" },
  { Name: "EL hajeb Bouderbala Taoujdate", Lat: 33.68012, Lng: -5.37260, Color: "green", Description: "0205" },
  { Name: "Taourirt", Lat: 34.40630, Lng: -2.89834, Color: "green", Description: "0209" },
  { Name: "Ain chguag", Lat: 33.92411, Lng: -4.99593, Color: "green", Description: "0213" },
  { Name: "Tanger", Lat: 35.72733, Lng: -5.81075, Color: "yellow", Description: "0800 - 0806 - 0807" },
  { Name: "Rabat - Salé", Lat: 34.0196, Lng: -6.8375, Color: "yellow", Description: "0801 - 0813" },
  { Name: "Larache", Lat: 35.18603, Lng: -6.14998, Color: "yellow", Description: "0802" },
  { Name: "Fnideq Mdieq", Lat: 35.84152, Lng: -5.35917, Color: "yellow", Description: "0803" },
  { Name: "Sidi Slimane", Lat: 34.25825, Lng: -5.92495, Color: "green", Description: "0805" },
  { Name: "Midelt Itzer Zaida", Lat: 32.68354, Lng: -4.73725, Color: "yellow", Description: "0809" },
  { Name: "Chefchaouen", Lat: 35.17106, Lng: -5.26920, Color: "yellow", Description: "0812" },
  { Name: "Taounate Ghafsai Beni Walid", Lat: 34.53745, Lng: -4.64107, Color: "green", Description: "0900" },
  { Name: "Errachidia Arfoud Rissani Merzouga", Lat: 31.93094, Lng: -4.44233, Color: "yellow", Description: "0902" },
  { Name: "Missour - Outat El Haj - Boulmane - Marmoucha - Talsint", Lat: 33.04605, Lng: -3.99820, Color: "yellow", Description: "0903" },
  { Name: "Sidi kacem", Lat: 34.22673, Lng: -5.71526, Color: "green", Description: "0904" },
  { Name: "Tetouane", Lat: 35.57776, Lng: -5.36229, Color: "yellow", Description: "0905" },
  { Name: "Ouazzane", Lat: 34.79726, Lng: -5.57862, Color: "green", Description: "0906" },
  { Name: "Belksiri Souk larbaa", Lat: 34.57645, Lng: -5.95652, Color: "yellow", Description: "0907" },
  { Name: "Kenitra", Lat: 34.25597, Lng: -6.59422, Color: "yellow", Description: "0909" },
  { Name: "Berkane", Lat: 34.92231, Lng: -2.32397, Color: "yellow", Description: "0913" },
  { Name: "Jorf almelha", Lat: 34.49077, Lng: -5.51074, Color: "green", Description: "0915" },
  { Name: "Oujda", Lat: 34.67948, Lng: -1.90969, Color: "yellow", Description: "0901 - 0910 -0911 - 0914" },
  { Name: "Laayoune orientale", Lat: 34.58409, Lng: -2.48820, Color: "yellow", Description: "0912" }
];

// --- Create and add the circle markers ---
mapPoints.forEach(point => {
  const marker = L.circleMarker([point.Lat, point.Lng], {
    color: point.Color,
    fillColor: point.Color,
    fillOpacity: 0.8,
    radius: 7,
    weight: 2
  })
    .bindPopup(`
      <strong>${point.Name}</strong><br>
      <span style="color:#ff5a8a;">Code:</span> ${point.Description}
    `)
    .addTo(map);

  marker.on('add', function () {
    const svg = marker._path;
    if (svg) {
      svg.style.animation = "pulse 2s infinite ease-in-out";
      svg.style.transformOrigin = "center";
    }
  });
});

// Auto-fit to all points
const bounds = L.latLngBounds(mapPoints.map(p => [p.Lat, p.Lng]));
map.fitBounds(bounds, { padding: [30, 30] });

// --- Add collapsible legend ---
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <h4>Légende ▼</h4>
    <div class="legend-items">
      <div class="legend-item"><div class="legend-color" style="background:red;"></div>Livraison chaque 30 min</div>
      <div class="legend-item"><div class="legend-color" style="background:orange;"></div>Chaque 1 h</div>
      <div class="legend-item"><div class="legend-color" style="background:green;"></div>2 fois par jour</div>
      <div class="legend-item"><div class="legend-color" style="background:yellow;"></div>1 fois par jour</div>
    </div>
  `;

  // Toggle collapsed state on click
  div.addEventListener("click", () => {
    div.classList.toggle("collapsed");
    const arrow = div.querySelector("h4");
    if (div.classList.contains("collapsed")) arrow.innerText = "Légende ►";
    else arrow.innerText = "Légende ▼";
  });

  return div;
};

legend.addTo(map);
