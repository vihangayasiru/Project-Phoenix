const firebaseConfig = {
  apiKey: "AIzaSyBN7sKIYRoc79fu4k2O7X-QNz2VDnGLRdU",
  authDomain: "bus-tracking-system-232fa.firebaseapp.com",
  projectId: "bus-tracking-system-232fa",
  storageBucket: "bus-tracking-system-232fa.firebasestorage.app",
  messagingSenderId: "316118169441",
  appId: "1:316118169441:web:5d9bf3f5a73a589a603720"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const map = L.map('map').setView([7.0, 81.0], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markers = [];

function clearMarkers() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
}

async function loadBusLocations() {
  clearMarkers();

  try {
    const querySnapshot = await db.collection("buses").get();
    if (querySnapshot.empty) {
      alert("No bus data found!");
      return;
    }

    querySnapshot.forEach(doc => {
      const busData = doc.data();
      const lat = busData.latitude;
      const lng = busData.longitude;

      if (lat && lng) {
        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${doc.id}</b><br>Lat: ${lat}<br>Lng: ${lng}`);
        markers.push(marker);
      }
    });
  } catch (error) {
    console.error("Error getting buses:", error);
  }
}


loadBusLocations();


document.getElementById("refreshBtn").addEventListener("click", loadBusLocations);