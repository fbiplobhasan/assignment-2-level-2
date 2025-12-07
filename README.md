# 🚗 Vehicle Rental System (Backend API)

A complete vehicle rental management backend system built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.

---

## 📌 Features

### 🔐 Authentication
- JWT based secure login system.
- Role-based authorization (Admin & Customer).
- Protected routes using middleware.
- Admin Or Owner permission for sensitive operations.

### 👤 User Management
- Register new users.
- Login and receive JWT token.
- Update profile (Admin or profile Owner only).
- Admin can see all users.

### 🚘 Vehicle Management
- Add new vehicles (Admin only).
- Update vehicle information.
- View all vehicles.
- Only available vehicles can be booked.
- Vehicle status changes automatically when booked or returned.

### 📅 Booking Management
- Customer/Admin can create a booking.
- Total rent price automatically calculated.
- Customer can view own bookings.
- Admin can view all bookings.
- Customer can cancel a booking.
- Admin can mark a booking as returned → Vehicle becomes available again.

---

