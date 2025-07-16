const timetableData = {
    'colombo-kandy': [
        { time: '06:00', busNo: 'K001', type: 'Semi-Luxury', duration: '3h 30m' },
        { time: '07:30', busNo: 'K002', type: 'Luxury', duration: '3h 15m' },
        { time: '09:00', busNo: 'K003', type: 'Normal', duration: '4h 00m' },
        { time: '10:30', busNo: 'K004', type: 'AC', duration: '3h 00m' },
        { time: '12:00', busNo: 'K005', type: 'Semi-Luxury', duration: '3h 30m' },
        { time: '14:00', busNo: 'K006', type: 'Normal', duration: '4h 00m' },
        { time: '16:00', busNo: 'K007', type: 'Luxury', duration: '3h 15m' },
        { time: '18:00', busNo: 'K008', type: 'AC', duration: '3h 00m' }
    ],
    'colombo-galle': [
        { time: '06:30', busNo: 'G001', type: 'Semi-Luxury', duration: '2h 30m' },
        { time: '08:00', busNo: 'G002', type: 'Normal', duration: '3h 00m' },
        { time: '10:00', busNo: 'G003', type: 'Luxury', duration: '2h 15m' },
        { time: '12:00', busNo: 'G004', type: 'AC', duration: '2h 00m' },
        { time: '14:00', busNo: 'G005', type: 'Semi-Luxury', duration: '2h 30m' },
        { time: '16:00', busNo: 'G006', type: 'Normal', duration: '3h 00m' },
        { time: '18:00', busNo: 'G007', type: 'Luxury', duration: '2h 15m' }
    ],
    'colombo-jaffna': [
        { time: '06:00', busNo: 'J001', type: 'Luxury', duration: '8h 00m' },
        { time: '08:00', busNo: 'J002', type: 'AC', duration: '7h 30m' },
        { time: '10:00', busNo: 'J003', type: 'Semi-Luxury', duration: '8h 30m' },
        { time: '14:00', busNo: 'J004', type: 'AC', duration: '7h 30m' },
        { time: '20:00', busNo: 'J005', type: 'Luxury', duration: '8h 00m' }
    ],
    'kandy-nuwara-eliya': [
        { time: '07:00', busNo: 'N001', type: 'Semi-Luxury', duration: '1h 30m' },
        { time: '09:00', busNo: 'N002', type: 'Normal', duration: '2h 00m' },
        { time: '11:00', busNo: 'N003', type: 'Luxury', duration: '1h 15m' },
        { time: '13:00', busNo: 'N004', type: 'AC', duration: '1h 00m' },
        { time: '15:00', busNo: 'N005', type: 'Semi-Luxury', duration: '1h 30m' },
        { time: '17:00', busNo: 'N006', type: 'Normal', duration: '2h 00m' }
    ],
    'galle-matara': [
        { time: '07:00', busNo: 'M001', type: 'Normal', duration: '1h 00m' },
        { time: '09:00', busNo: 'M002', type: 'Semi-Luxury', duration: '45m' },
        { time: '11:00', busNo: 'M003', type: 'Luxury', duration: '40m' },
        { time: '13:00', busNo: 'M004', type: 'Normal', duration: '1h 00m' },
        { time: '15:00', busNo: 'M005', type: 'Semi-Luxury', duration: '45m' },
        { time: '17:00', busNo: 'M006', type: 'Luxury', duration: '40m' }
    ]
};

const priceData = {
    'colombo-kandy': { normal: 250, 'semi-luxury': 350, luxury: 450, ac: 550 },
    'colombo-galle': { normal: 180, 'semi-luxury': 250, luxury: 320, ac: 400 },
    'colombo-jaffna': { normal: 800, 'semi-luxury': 1100, luxury: 1400, ac: 1700 },
    'kandy-nuwara-eliya': { normal: 120, 'semi-luxury': 180, luxury: 240, ac: 300 },
    'galle-matara': { normal: 80, 'semi-luxury': 120, luxury: 160, ac: 200 }
};

// Set today's date as default
document.getElementById('departureDate').value = new Date().toISOString().split('T')[0];

// Quick route selection
document.querySelectorAll('.quick-route').forEach(route => {
    route.addEventListener('click', function () {
        const routeValue = this.getAttribute('data-route');
        document.getElementById('timetableSelect').value = routeValue;
        document.getElementById('priceSelect').value = routeValue;
    });
});

// Show timetable
document.getElementById('showTimetableBtn').addEventListener('click', function () {
    const selectedRoute = document.getElementById('timetableSelect').value;
    const selectedDate = document.getElementById('departureDate').value;
    const container = document.getElementById('timetableContainer');

    if (!selectedRoute) {
        alert('Please select a route');
        return;
    }

    // Show loading
    container.innerHTML = '<div class="loading">Loading timetable...</div>';
    container.classList.add('show');

    // Simulate loading delay
    setTimeout(() => {
        const schedules = timetableData[selectedRoute];
        const routeName = selectedRoute.replace('-', ' - ').replace(/\b\w/g, l => l.toUpperCase());
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let html = `
          <h3>Timetable for ${routeName}</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <table class="timetable-table">
            <thead>
              <tr>
                <th>Departure Time</th>
                <th>Bus Number</th>
                <th>Bus Type</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
        `;

        schedules.forEach(schedule => {
            html += `
            <tr>
              <td>${schedule.time}</td>
              <td>${schedule.busNo}</td>
              <td>${schedule.type}</td>
              <td>${schedule.duration}</td>
            </tr>
          `;
        });

        html += `
            </tbody>
          </table>
        `;

        container.innerHTML = html;
    }, 1000);
});

// Show price
document.getElementById('showPriceBtn').addEventListener('click', function () {
    const selectedRoute = document.getElementById('priceSelect').value;
    const selectedBusType = document.getElementById('busType').value;
    const container = document.getElementById('priceContainer');

    if (!selectedRoute) {
        alert('Please select a route');
        return;
    }

    // Show loading
    container.innerHTML = '<div class="loading">Loading price information...</div>';
    container.classList.add('show');

    // Simulate loading delay
    setTimeout(() => {
        const price = priceData[selectedRoute][selectedBusType];
        const routeName = selectedRoute.replace('-', ' - ').replace(/\b\w/g, l => l.toUpperCase());
        const busTypeName = selectedBusType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

        const html = `
          <h3>Ticket Price for ${routeName}</h3>
          <div class="price-card">
            <div class="price-amount">LKR ${price}</div>
            <div class="price-details">
              <p><strong>Bus Type:</strong> ${busTypeName}</p>
              <p><strong>Route:</strong> ${routeName}</p>
              <p>One-way ticket price</p>
            </div>
          </div>
        `;

        container.innerHTML = html;
    }, 800);
});