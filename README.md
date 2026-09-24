# StayEasy – Hotel Booking System

🌐 **Live Demo:** [Visit StayEasy Hotel Booking System](https://brilliant-taffy-be5d3c.netlify.app)
# 🏨 Hotel Booking System

A simple and beginner-friendly hotel booking website built as a college project. This system demonstrates core concepts of hotel management, room booking, and user interaction using vanilla HTML, CSS, and JavaScript.

## 📋 Project Overview

**StayEasy** is a hotel booking system that allows users to:
- Search and filter hotels by name, location, and price
- View detailed hotel information and available rooms
- Book rooms with automatic price calculation
- View booking history
- Cancel bookings

## 🎯 Academic Purpose

This project is designed for educational purposes to demonstrate:
- **Data Models**: Hotel, Room, and Booking models
- **CRUD Operations**: Create, Read, Update bookings
- **DOM Manipulation**: Dynamic content rendering with JavaScript
- **Local Storage**: Persistent data storage in the browser
- **User Interaction**: Forms, filters, and event handling

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **Vanilla JavaScript**: Logic and interactivity
- **LocalStorage**: Data persistence

**No frameworks or backend required** - runs entirely in the browser!

## 📁 Project Structure

```
hotel-booking-system/
│
├── index.html              # Home page
├── hotels.html            # Hotels listing page
├── hotel-details.html     # Individual hotel details
├── booking.html           # Booking form page
├── bookings.html          # Booking history page
│
├── css/
│   └── style.css          # All styling
│
└── js/
    └── script.js          # All JavaScript code and data models
```

## 🚀 How to Run

### Option 1: Direct Opening
1. Download or clone the repository
2. Navigate to the project folder
3. Double-click `index.html` to open in your browser

### Option 2: Using VS Code Live Server
1. Open the project folder in VS Code
2. Install the "Live Server" extension (if not already installed)
3. Right-click on `index.html`
4. Select "Open with Live Server"

## 📊 Data Models

### 1. Hotel Model
```javascript
{
    id: 1,
    name: "Grand Palace Hotel",
    location: "Hyderabad",
    rating: 4.5,
    price: 2500,
    image: "image-url",
    amenities: ["WiFi", "Parking", "Breakfast", "Pool"]
}
```

### 2. Room Model
```javascript
{
    id: 1,
    hotelId: 1,
    roomNumber: "101",
    roomType: "Deluxe",
    price: 2500,
    status: "Available" // or "Booked"
}
```

### 3. Booking Model
```javascript
{
    id: 1,
    userId: 101,
    hotelId: 1,
    roomId: 1,
    checkIn: "2026-09-25",
    checkOut: "2026-09-27",
    guests: 2,
    totalAmount: 5000,
    status: "Confirmed" // or "Cancelled"
}
```

## ✨ Features

### 🏠 Home Page
- Welcome hero section
- Quick navigation to hotels
- Feature highlights

### 🏨 Hotels Page
- Display all available hotels
- **Search**: Find hotels by name
- **Location Filter**: Filter by city
- **Price Filter**: Filter by maximum price
- View detailed information for each hotel

### 🛏️ Hotel Details Page
- Complete hotel information
- Display all rooms with availability status
- Book available rooms instantly

### 📝 Booking Page
- Select check-in and check-out dates
- Enter number of guests
- **Automatic calculation** of total amount based on:
  - Number of nights
  - Room price per night
- Confirm booking with one click

### 📜 My Bookings Page
- View all booking history
- See booking details (hotel, room, dates, amount)
- Cancel confirmed bookings
- Cancelled bookings are clearly marked

## 🔄 How It Works

### Booking Process
1. Browse hotels → Select a hotel → View rooms
2. Choose an available room → Click "Book Now"
3. Enter booking details (dates, guests)
4. Calculate total amount
5. Confirm booking → Saved to localStorage
6. Room status changes to "Booked"

### Cancellation Process
1. Go to "My Bookings"
2. Click "Cancel Booking" on any confirmed booking
3. Booking status changes to "Cancelled"
4. Room becomes available again
5. Changes saved to localStorage

### Search & Filter
- **Search by name**: Type hotel name → Click Search
- **Filter by location**: Select city from dropdown
- **Filter by price**: Enter maximum price
- All filters work together

## 💾 Data Storage

This project uses **localStorage** to store bookings:
- Bookings persist even after closing the browser
- Data is stored in JSON format
- No backend or database required

### LocalStorage Functions
```javascript
// Get bookings
const bookings = localStorage.getItem('bookings');

// Save bookings
localStorage.setItem('bookings', JSON.stringify(bookings));
```

## 🎓 Key Concepts Demonstrated

1. **Object-Oriented Data Modeling**
   - Hotel, Room, and Booking objects
   - Relationships between models (hotelId, roomId)

2. **Array Methods**
   - `.filter()` for searching and filtering
   - `.find()` for finding specific items
   - `.map()` for transforming data

3. **DOM Manipulation**
   - `getElementById()`, `querySelector()`
   - Dynamic HTML generation
   - Event listeners

4. **URL Parameters**
   - Passing data between pages
   - `URLSearchParams` API

5. **Date Calculations**
   - Calculate number of nights
   - Date difference calculations

6. **Local Storage**
   - Persistent data storage
   - JSON serialization

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Design Features

- Clean and professional layout
- Simple color scheme (Blue and White)
- Card-based design for hotels and bookings
- Easy-to-read typography
- Intuitive navigation

## 🔧 Customization

### Adding More Hotels
Edit the `hotels` array in `js/script.js`:
```javascript
const hotels = [
    {
        id: 5,
        name: "Your Hotel Name",
        location: "City Name",
        rating: 4.5,
        price: 3000,
        image: "image-url",
        amenities: ["WiFi", "Parking"]
    }
];
```

### Adding More Rooms
Edit the `rooms` array in `js/script.js`:
```javascript
let rooms = [
    {
        id: 11,
        hotelId: 5,
        roomNumber: "501",
        roomType: "Deluxe",
        price: 3000,
        status: "Available"
    }
];
```

## 📝 Sample Data Included

- **4 Hotels** across different cities
- **10 Rooms** with various types (Standard, Deluxe, Suite, Sea View)
- Sample locations: Hyderabad, Bangalore, Chennai, Vijayawada

## 🎯 Project Requirements Met

✅ Hotel Model implementation  
✅ Room Model implementation  
✅ Booking Model implementation  
✅ Search hotels functionality  
✅ Filter by location  
✅ Filter by price  
✅ View hotel details  
✅ View rooms with availability  
✅ Book rooms  
✅ Automatic price calculation  
✅ Cancel bookings  
✅ View booking history  
✅ Room status management  

## 🤔 FAQ for Viva/Presentation

**Q: Why use localStorage instead of a database?**  
A: This is a frontend-only project designed for learning. localStorage provides a simple way to store data without requiring a backend server or database setup.

**Q: How do you maintain the relationship between hotels and rooms?**  
A: Each room has a `hotelId` property that references the hotel it belongs to. This is similar to a foreign key in databases.

**Q: What happens if two people book the same room?**  
A: Once a room is booked, its status changes to "Booked" and the booking button is disabled, preventing duplicate bookings.

**Q: Can you add payment integration?**  
A: Yes, but this project focuses on core booking logic. Payment gateways (like Razorpay or Stripe) can be added in future enhancements.

## 🚀 Future Enhancements

- User authentication system
- Payment gateway integration
- Email confirmation
- Review and rating system
- Admin panel for hotel management
- Backend API with real database
- Image upload functionality
- Advanced search filters

## 👨‍💻 Author

Created as a college mini-project to demonstrate web development fundamentals.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Project created for academic learning
- Designed to be beginner-friendly and easy to understand
- Perfect for presentations and viva demonstrations

---

**Made with ❤️ for learning purposes**

*Happy Coding! 🎓*
