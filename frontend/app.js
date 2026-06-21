// Function for loading the constituencies 
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

// Function to keep the map focussed on the UK
function centreOnUK(){
    map.panInsideBounds(ukBounds, {animate: false});
}

// Function to map the colour of the constituency to the winning party's colour
function mapColours(party){
    if (party === "Lab"){
        return "#E4003B";
    }
    if (party === "Con"){
        return "#0087DC";
    }
    if (party === "Reform"){
        return "#12B6CF";
    }
    if (party === "Lib Dem"){
        return "#FF6400";
    }
    if (party === "Green"){
        return "#02A95B";
    }
    if (party === "SNP"){
        return "#FFE300";
    }
}

// Setting bound for where the map shows and centring on the uk 
const ukBounds = [[49.5, -10.5],[59.5, 2.5]];

// Creating the minimum and maximum zoom for the map
const map = L.map("map", {
    minZoom: 6,
    maxZoom: 15,
    inertia: false
}).setView([54.5,-2.5],6);


map.setMaxBounds(ukBounds);
map.options.maxBoundsViscosity = 1;
map.on("drag", centreOnUK);

// Creating the map to be viewed 
const mapDisplay = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: "&copy; OpenStreetMap contributors"}
    )
mapDisplay.addTo(map);
    
loadConstituencies();

