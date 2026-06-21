// Fix into my style
const ukBounds = [
    [49.5, -10.5],
    [59.5, 2.5]
];


const map = L.map("map", {
    minZoom: 6,
    maxZoom: 15,
    inertia: false
}).setView([54.5,-2.5],6);


map.setMaxBounds(ukBounds);
map.options.maxBoundsViscosity = 1;


map.on("drag", function () {
    map.panInsideBounds(ukBounds, {
        animate:false
    });
});

// Creating the map to be viewed 
const mapDisplay = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: "&copy; OpenStreetMap contributors"}
    )
mapDisplay.addTo(map);
    
// Loading the constituencies 
async function loadConstituencies(){
    const response = await fetch("../constituencies/constituency_map.geojson");
    const data = await response.json();
    const constituencyOutlines = L.geoJSON(data, {
        style:{
            color:"#000000",
            fillColor:"#BB0000",
            weight:1,
            fillOpacity:0.5,
        }
    }
    )
    console.log(data);
    console.log(response);
    constituencyOutlines.addTo(map);
}

loadConstituencies();

