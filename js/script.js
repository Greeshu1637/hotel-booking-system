// ==================== DATA MODELS ====================

// HOTEL MODEL
// Each hotel has: id, name, location, rating, price, image, amenities
const hotels = [
    {
        id: 1,
        name: "Grand Palace Hotel",
        location: "Hyderabad",
        rating: 4.5,
        price: 2500,
        image: "https://via.placeholder.com/400x200/3498db/ffffff?text=Grand+Palace+Hotel",
        amenities: ["WiFi", "Parking", "Breakfast", "Pool"]
    },
    {
        id: 2,
        name: "Sunshine Resort",
        location: "Bangalore",
        rating: 4.2,
        price: 3000,
        image: "https://via.placeholder.com/400x200/e74c3c/ffffff?text=Sunshine+Resort",
        amenities: ["WiFi", "Gym", "Restaurant", "Spa"]
    },
    {
        id: 3,
        name: "Beach View Hotel",
        location: "Chennai",
        rating: 4.7,
        price: 3500,
        image: "https://via.placeholder.com/400x200/27ae60/ffffff?text=Beach+View+Hotel",
        amenities: ["WiFi", "Beach Access", "Breakfast", "Pool"]
    },
    {
        id: 4,
        name: "City Center Inn",
        location: "Vijayawada",
        rating: 4.0,
        price: 2000,
        image: "https://via.placeholder.com/400x200/f39c12/ffffff?text=City+Center+Inn",
        amenities: ["WiFi", "Parking", "Restaurant"]
    }
];

// ROOM MODEL
// Each room has: id, hotelId, roomNumber, roomType, price, status
let rooms = [
    // Grand Palace Hotel rooms
    { id: 1, hotelId: 1, roomNumber: "101", roomType: "Deluxe", price: 2500, status: "Available" },
    { id: 2, hotelId: 1, roomNumber: "102", roomType: "Suite", price: 3500, status: "Available" },
    { id: 3, hotelId: 1, roomNumber: "103", roomType: "Standard", price: 2000, status: "Available" },
    
    // Sunshine Resort rooms
    { id: 4, hotelId: 2, roomNumber: "201", roomType: "Deluxe", price: 3000, status: "Available" },
    { id: 5, hotelId: 2, roomNumber: "202", roomType: "Suite", price: 4000, status: "Available" },
    { id: 6, hotelId: 2, roomNumber: "203", roomType: "Standard", price: 2500, status: "Available" },
    
    // Beach View Hotel rooms
    { id: 7, hotelId: 3, roomNumber: "301", roomType: "Sea View", price: 3500, status: "Available" },
    { id: 8, hotelId: 3, roomNumber: "302", roomType: "Deluxe", price: 3000, status: "Available" },
    
    // City Center Inn rooms
    { id: 9, hotelId: 4, roomNumber: "401", roomType: "Standard", price: 2000, status: "Available" },
    { id: 10, hotelId: 4, roomNumber: "402", roomType: "Deluxe", price: 2500, status: "Available" }
];

// BOOKING MODEL
// Each booking has: id, userId, hotelId, roomId, checkIn, checkOut, guests, totalAmount, status
// Bookings are stored in localStorage

// ==================== HELPER FUNCTIONS ====================

// Get hotel by ID
function getHotelById(hotelId) {
    return hotels.find(hotel => hotel.id == hotelId);
}

// Get room by ID
function getRoomById(roomId) {
    return rooms.find(room => room.id == roomId);
}

// Get rooms by hotel ID
function getRoomsByHotelId(hotelId) {
    return rooms.filter(room => room.hotelId == hotelId);
}

// Get all bookings from localStorage
function getBookings() {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
}

// Save bookings to localStorage
function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Update room status
function updateRoomStatus(roomId, status) {
    const room = rooms.find(r => r.id == roomId);
    if (room) {
        room.status = status;
    }
}

// ==================== HOTELS PAGE FUNCTIONS ====================

// Display all hotels
function displayHotels(hotelsToDisplay = hotels) {
    const container = document.getElementById('hotelsContainer');
    
    if (!container) return;
    
    if (hotelsToDisplay.length === 0) {
        container.innerHTML = '<p class="no-bookings">No hotels found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    hotelsToDisplay.forEach(hotel => {
        const hotelCard = `
            <div class="hotel-card">
                <div class="hotel-image" style="background-color: #3498db;">
                    ${hotel.name}
                </div>
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p class="hotel-location">📍 ${hotel.location}</p>
                    <p class="hotel-rating">⭐ ${hotel.rating} / 5.0</p>
                    <p class="hotel-price">₹${hotel.price} / night</p>
                    <div class="hotel-amenities">
                        ${hotel.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                    </div>
                    <a href="hotel-details.html?id=${hotel.id}" class="btn btn-primary">View Hotel</a>
                </div>
            </div>
        `;
        container.innerHTML += hotelCard;
    });
}

// Search hotels by name
function searchHotels(searchTerm) {
    return hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Filter hotels by location and price
function filterHotels() {
    const searchTerm = document.getElementById('searchInput').value;
    const location = document.getElementById('locationFilter').value;
    const maxPrice = document.getElementById('priceFilter').value;
    
    let filteredHotels = hotels;
    
    // Filter by search term
    if (searchTerm) {
        filteredHotels = filteredHotels.filter(hotel => 
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Filter by location
    if (location) {
        filteredHotels = filteredHotels.filter(hotel => hotel.location === location);
    }
    
    // Filter by price
    if (maxPrice) {
        filteredHotels = filteredHotels.filter(hotel => hotel.price <= maxPrice);
    }
    
    displayHotels(filteredHotels);
}

// ==================== HOTEL DETAILS PAGE FUNCTIONS ====================

// Display hotel details
function displayHotelDetails() {
    const container = document.getElementById('hotelDetails');
    
    if (!container) return;
    
    // Get hotel ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    
    // Find the hotel
    const hotel = getHotelById(hotelId);
    
    if (!hotel) {
        container.innerHTML = '<p class="no-bookings">Hotel not found.</p>';
        return;
    }
    
    // Display hotel details
    container.innerHTML = `
        <div class="hotel-details-card">
            <h2>${hotel.name}</h2>
            <p class="hotel-location">📍 ${hotel.location}</p>
            <p class="hotel-rating">⭐ ${hotel.rating} / 5.0</p>
            <p class="hotel-price">₹${hotel.price} / night</p>
            <div class="hotel-amenities">
                <strong>Amenities:</strong>
                ${hotel.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
            </div>
        </div>
    `;
}

// Display available rooms
function displayRooms() {
    const container = document.getElementById('roomsContainer');
    
    if (!container) return;
    
    // Get hotel ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    
    // Get rooms for this hotel
    const hotelRooms = getRoomsByHotelId(hotelId);
    
    if (hotelRooms.length === 0) {
        container.innerHTML = '<p class="no-bookings">No rooms available.</p>';
        return;
    }
    
    container.innerHTML = '<div class="rooms-grid"></div>';
    const roomsGrid = container.querySelector('.rooms-grid');
    
    hotelRooms.forEach(room => {
        const roomCard = `
            <div class="room-card">
                <div class="room-info">
                    <h4>Room ${room.roomNumber}</h4>
                    <p><strong>Type:</strong> ${room.roomType}</p>
                    <p><strong>Price:</strong> ₹${room.price} / night</p>
                    <span class="room-status ${room.status.toLowerCase()}">${room.status}</span>
                </div>
                <div class="room-actions">
                    ${room.status === 'Available' 
                        ? `<a href="booking.html?hotelId=${hotelId}&roomId=${room.id}" class="btn btn-primary">Book Now</a>`
                        : '<button class="btn btn-secondary" disabled>Not Available</button>'
                    }
                </div>
            </div>
        `;
        roomsGrid.innerHTML += roomCard;
    });
}

// ==================== BOOKING PAGE FUNCTIONS ====================

// Display booking info
function displayBookingInfo() {
    const container = document.getElementById('bookingInfo');
    
    if (!container) return;
    
    // Get hotel ID and room ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotelId');
    const roomId = urlParams.get('roomId');
    
    // Find hotel and room
    const hotel = getHotelById(hotelId);
    const room = getRoomById(roomId);
    
    if (!hotel || !room) {
        container.innerHTML = '<p class="no-bookings">Hotel or room not found.</p>';
        return;
    }
    
    // Display booking info
    container.innerHTML = `
        <h3>Selected Hotel & Room</h3>
        <p><strong>Hotel:</strong> ${hotel.name}</p>
        <p><strong>Location:</strong> ${hotel.location}</p>
        <p><strong>Room Number:</strong> ${room.roomNumber}</p>
        <p><strong>Room Type:</strong> ${room.roomType}</p>
        <p><strong>Price:</strong> ₹${room.price} / night</p>
    `;
}

// Calculate total amount
function calculateTotal() {
    // Get dates and room info
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    
    if (!checkInDate || !checkOutDate) {
        alert('Please select check-in and check-out dates.');
        return;
    }
    
    // Calculate number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut - checkIn;
    const nights = timeDifference / (1000 * 3600 * 24);
    
    if (nights <= 0) {
        alert('Check-out date must be after check-in date.');
        return;
    }
    
    // Get room price
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    const room = getRoomById(roomId);
    
    // Calculate total
    const total = nights * room.price;
    
    // Display total
    const totalContainer = document.getElementById('totalAmount');
    totalContainer.innerHTML = `
        <p>Number of Nights: ${nights}</p>
        <p>Price per Night: ₹${room.price}</p>
        <p><strong>Total Amount: ₹${total}</strong></p>
    `;
    
    // Store total for booking confirmation
    totalContainer.setAttribute('data-total', total);
}

// Confirm booking
function confirmBooking() {
    // Get form values
    const userId = document.getElementById('userId').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const guests = document.getElementById('guests').value;
    const totalContainer = document.getElementById('totalAmount');
    const total = totalContainer.getAttribute('data-total');
    
    // Validate form
    if (!userId || !checkInDate || !checkOutDate || !guests) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!total) {
        alert('Please calculate the total amount first.');
        return;
    }
    
    // Get hotel and room IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotelId');
    const roomId = urlParams.get('roomId');
    
    // Get existing bookings
    const bookings = getBookings();
    
    // Create new booking
    const newBooking = {
        id: bookings.length + 1,
        userId: parseInt(userId),
        hotelId: parseInt(hotelId),
        roomId: parseInt(roomId),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalAmount: parseInt(total),
        status: "Confirmed"
    };
    
    // Add booking to array
    bookings.push(newBooking);
    
    // Save to localStorage
    saveBookings(bookings);
    
    // Update room status to Booked
    updateRoomStatus(roomId, 'Booked');
    
    // Show success message
    alert('Booking confirmed successfully!');
    
    // Redirect to bookings page
    window.location.href = 'bookings.html';
}

// ==================== BOOKINGS PAGE FUNCTIONS ====================

// Display all bookings
function displayBookings() {
    const container = document.getElementById('bookingsContainer');
    
    if (!container) return;
    
    // Get bookings from localStorage
    const bookings = getBookings();
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">No bookings found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    bookings.forEach(booking => {
        // Get hotel and room details
        const hotel = getHotelById(booking.hotelId);
        const room = getRoomById(booking.roomId);
        
        const bookingCard = `
            <div class="booking-card">
                <h3>Booking #${booking.id}</h3>
                <div class="booking-details">
                    <div class="booking-detail-item">
                        <strong>Hotel:</strong> ${hotel ? hotel.name : 'N/A'}
                    </div>
                    <div class="booking-detail-item">
                        <strong>Room:</strong> ${room ? room.roomNumber : 'N/A'} (${room ? room.roomType : 'N/A'})
                    </div>
                    <div class="booking-detail-item">
                        <strong>Check-in:</strong> ${booking.checkIn}
                    </div>
                    <div class="booking-detail-item">
                        <strong>Check-out:</strong> ${booking.checkOut}
                    </div>
                    <div class="booking-detail-item">
                        <strong>Guests:</strong> ${booking.guests}
                    </div>
                    <div class="booking-detail-item">
                        <strong>Total Amount:</strong> ₹${booking.totalAmount}
                    </div>
                </div>
                <span class="booking-status ${booking.status.toLowerCase()}">${booking.status}</span>
                ${booking.status === 'Confirmed' 
                    ? `<button onclick="cancelBooking(${booking.id})" class="btn btn-danger">Cancel Booking</button>`
                    : ''
                }
            </div>
        `;
        container.innerHTML += bookingCard;
    });
}

// Cancel booking
function cancelBooking(bookingId) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
        return;
    }
    
    // Get bookings
    const bookings = getBookings();
    
    // Find the booking
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
        alert('Booking not found.');
        return;
    }
    
    // Update booking status to Cancelled
    booking.status = 'Cancelled';
    
    // Update room status back to Available
    updateRoomStatus(booking.roomId, 'Available');
    
    // Save updated bookings
    saveBookings(bookings);
    
    // Refresh the display
    displayBookings();
    
    alert('Booking cancelled successfully!');
}
