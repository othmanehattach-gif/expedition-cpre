// Initialize map centered on Fès
const map = L.map('map', {
  zoomControl: true,
  scrollWheelZoom: true
}).setView([34.02, -5.00], 6);

// Light tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CartoDB',
  maxZoom: 18
}).addTo(map);

// --- data points ---
const mapPoints = [
  { Name: "Casablanca Centre", Lat: 33.57311, Lng: -7.58984, Color: "red", Description: "0101" },
  { Name: "Marrakech Medina", Lat: 31.62947, Lng: -7.98108, Color: "red", Description: "0102" },
  { Name: "Agdal Rabat", Lat: 34.02088, Lng: -6.84165, Color: "red", Description: "0103" },
  { Name: "Fes El Bali", Lat: 34.06110, Lng: -4.97358, Color: "red", Description: "0104" },
  { Name: "Hay Mohammadi", Lat: 33.99056, Lng: -6.85125, Color: "red", Description: "0105" },
  { Name: "Ain Diab Corniche", Lat: 33.59172, Lng: -7.68725, Color: "red", Description: "0106" },
  { Name: "Gueliz Marrakech", Lat: 31.63657, Lng: -8.01036, Color: "red", Description: "0107" },
  { Name: "Sala Al Jadida", Lat: 34.03351, Lng: -6.78745, Color: "red", Description: "0108" },
  { Name: "Ifrane Atlas", Lat: 33.52639, Lng: -5.11073, Color: "green", Description: "0109" },
  { Name: "Ouarzazate Centre", Lat: 30.91894, Lng: -6.89341, Color: "orange", Description: "0110" },
  { Name: "Temara Plage", Lat: 33.92845, Lng: -6.95824, Color: "red", Description: "0111" },
  { Name: "Al Hoceima Bay", Lat: 35.25129, Lng: -3.93711, Color: "yellow", Description: "0200" },
  { Name: "Azrou Cedar Forest", Lat: 33.43405, Lng: -5.22136, Color: "green", Description: "0201" },
  { Name: "Meknes Imperial", Lat: 33.89478, Lng: -5.54728, Color: "green", Description: "0202 - 0206 - 0207 - 0208 - 0210 - 0214" },
  { Name: "Taza Gorge", Lat: 34.21425, Lng: -4.00876, Color: "green", Description: "0204" },
  { Name: "El Hajeb Plains", Lat: 33.72481, Lng: -5.37210, Color: "green", Description: "0205" },
  { Name: "Taourirt Oasis", Lat: 34.41265, Lng: -2.89327, Color: "green", Description: "0209" },
  { Name: "Ain Leuh Valley", Lat: 33.29234, Lng: -5.33891, Color: "green", Description: "0213" },
  { Name: "Tangier Port", Lat: 35.78451, Lng: -5.81274, Color: "yellow", Description: "0800 - 0806 - 0807" },
  { Name: "Rabat Hassan", Lat: 34.02029, Lng: -6.83550, Color: "yellow", Description: "0801 - 0813" },
  { Name: "Larache Coast", Lat: 35.19304, Lng: -6.14789, Color: "yellow", Description: "0802" },
  { Name: "Tetouan Mountains", Lat: 35.57687, Lng: -5.36842, Color: "yellow", Description: "0803" },
  { Name: "Sidi Kacem Plains", Lat: 34.22976, Lng: -5.70748, Color: "green", Description: "0805" },
  { Name: "Midelt Atlas", Lat: 32.68845, Lng: -4.74512, Color: "yellow", Description: "0809" },
  { Name: "Chefchaouen Blue", Lat: 35.17133, Lng: -5.26978, Color: "yellow", Description: "0812" },
  { Name: "Taounate Fields", Lat: 34.54219, Lng: -4.64723, Color: "green", Description: "0900" },
  { Name: "Errachidia Desert", Lat: 31.93193, Lng: -4.42461, Color: "yellow", Description: "0902" },
  { Name: "Missour Plateau", Lat: 33.05236, Lng: -3.99274, Color: "yellow", Description: "0903" },
  { Name: "Sidi Slimane Rural", Lat: 34.26478, Lng: -5.92604, Color: "green", Description: "0904" },
  { Name: "Tetouan Medina", Lat: 35.57645, Lng: -5.36891, Color: "yellow", Description: "0905" },
  { Name: "Ouazzane Sacred", Lat: 34.79835, Lng: -5.58347, Color: "green", Description: "0906" },
  { Name: "Souk Larbaa Market", Lat: 34.68234, Lng: -5.98256, Color: "yellow", Description: "0907" },
  { Name: "Kenitra Atlantic", Lat: 34.26289, Lng: -6.57933, Color: "yellow", Description: "0909" },
  { Name: "Berkane Orange", Lat: 34.92105, Lng: -2.31987, Color: "yellow", Description: "0913" },
  { Name: "Jorf Fishing Port", Lat: 34.48562, Lng: -5.52389, Color: "green", Description: "0915" },
  { Name: "Oujda Eastern", Lat: 34.68127, Lng: -1.90765, Color: "yellow", Description: "0901 - 0910 - 0911 - 0914" },
  { Name: "Figuig Oasis", Lat: 32.10971, Lng: -1.22839, Color: "yellow", Description: "0912" }
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

// Fit map to points
const bounds = L.latLngBounds(mapPoints.map(p => [p.Lat, p.Lng]));
map.fitBounds(bounds, { padding: [30, 30] });


// --- Add collapsible legend ---
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "legend");
  div.innerHTML = `
    <h4>Légende ▼</h4>
    <div class="legend-items">
    <div class="legend-item"><div class="legend-color" style="background:red;"></div>Zone prioritaire</div>
    <div class="legend-item"><div class="legend-color" style="background:orange;"></div>Zone secondaire</div>
    <div class="legend-item"><div class="legend-color" style="background:green;"></div>Zone standard</div>
    <div class="legend-item"><div class="legend-color" style="background:yellow;"></div>Zone informative</div>
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




