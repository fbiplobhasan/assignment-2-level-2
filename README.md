# 🚗 Vehicle Rental System (Backend API)

Project Description
This system handles everything a person need for managing a vehicle rental service. I use Node.js, Express, PostgreSQL, and TypeScript to built this system. Users can create accounts, sign in, browse the available vehicles, and book the ones which they want. Admins get extra tools to manage vehicles, users, and all bookings. This system keeps track of which vehicles are available so the rental process stays easy and organized.

Features
Account system with signup and login
Role-based access for admins and customers
Full vehicle management (add, update, delete, view)
Booking system that allows users to create and cancel bookings
Admin can mark vehicles as returned
Automatic handling of expired bookings
Proper validation and clear error responses
Real-time availability tracking for every vehicle
PostgreSQL database with solid relational structure
Technology Stack
Node.js
Express.js
PostgreSQL
JWT Authentication
bcrypt.js
Neon
Setup & Usage

Clone the repository
git clone https://github.com/Tsar365/B6A2
cd B6A2
Install dependencies
npm install
Configure Environment Variables
Create a .env file in the root directory:

env PORT=5000 CONNECTION_STRING=<PostgreSQL_Connection_String> SECRET_JWT=<Secret_JWT_Key>

Run the Project
npm run dev
The server will start at http://localhost:5000.
API Endpoints
Auth

Signup: POST /api/v1/auth/signup (Register new user account)

Signin: POST /api/v1/auth/signin (Login and receive JWT token)
Users

Get All Users: GET /api/v1/users (Admin View all users in the system)

Update User: PUT /api/v1/users/:id (Admin Update any user's role or details & Customer Update own profile only)

Delete User: DELETE /api/v1/users/:id (Admin Delete user (only if no active bookings exist))
Vehicles

Create Vehicle: POST /api/v1/vehicles (Admin Add new vehicle with name, type, registration, daily rent price and availability status)

Get All Vehicles: GET /api/v1/vehicles (Public View all vehicles in the system)

Get Single Vehicle: GET /api/v1/vehicles/:id (Public View specific vehicle details)

Update Vehicle: PUT /api/v1/vehicles/:id ( Admin  Update vehicle details, daily rent price or availability status)

Delete Vehicle: DELETE /api/v1/vehicles/:id (Admin Delete vehicle (only if no active bookings exist))
Bookings

Create Booking: POST /api/v1/bookings ( Customer or Admin ,Admin & Customer Create booking with start/end dates *• Validates vehicle availability *• Calculates total price (daily rate × duration) *• Updates vehicle status to "booked")

Get All Bookings: GET /api/v1/bookings (Role-based, Admin: View all bookings, Customer: View own bookings only)

Update Booking: PUT /api/v1/bookings/:id ( Role-based, Customer: Cancel booking (before start date only) Admin: Mark as "returned" (updates vehicle to "available") System: Auto-mark as "returned" when period ends)

Auto Return Bookings: PUT /api/v1/bookings/auto-return (Admin)
Submission

The end
