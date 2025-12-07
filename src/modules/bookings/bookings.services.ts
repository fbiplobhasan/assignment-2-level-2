import { pool } from "../../config/db";

// Create Booking
const createBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // 1) Vehicle price + name fetch করা
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price 
     FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) throw new Error("Vehicle not found");

  const vehicle = vehicleResult.rows[0];

  // 2) তারিখকে ভালো format এ আনা (YYYY-MM-DD)
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  const formattedStart = start.toISOString().split("T")[0]; // 2024-01-15
  const formattedEnd = end.toISOString().split("T")[0]; // 2024-01-20

  // 3) দিনের হিসাব (ceil দিয়ে up-round করা)
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 4) total price সবসময় number হিসেবে রাখা
  const total_price = vehicle.daily_rent_price * days;

  // 5) Insert booking and return inserted row
  const bookingResult = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1,$2,$3,$4,$5,'active') RETURNING *`,
    [
      customer_id,
      vehicle_id,
      formattedStart,
      formattedEnd,
      total_price, // always number
    ]
  );

  const booking = bookingResult.rows[0];

  // 6) Update vehicle status → booked
  await pool.query(
    "UPDATE vehicles SET availability_status='booked' WHERE id=$1",
    [vehicle_id]
  );

  // 7) Expected output অনুযায়ী vehicle object add করা
  booking.vehicle = {
    vehicle_name: vehicle.vehicle_name,
    daily_rent_price: vehicle.daily_rent_price,
  };

  return booking;
};

const getAllBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

const getAllBookingsAdmin = async () => {
  const result = await pool.query(
    `SELECT b.*, u.name as customer_name, v.vehicle_name
     FROM bookings b
     JOIN users u ON b.customer_id = u.id
     JOIN vehicles v ON b.vehicle_id = v.id`
  );
  return result.rows;
};

const getAllBookingCustomer = async (customer_id: string) => {
  const result = await pool.query(
    `SELECT b.*, v.vehicle_name FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE b.customer_id=$1`,
    [customer_id]
  );
  return result.rows;
};

const updateBooking = async (bookingId: string, status: string) => {
  // If returned → make vehicle available again
  if (status === "returned") {
    const booking = await pool.query(
      "SELECT vehicle_id FROM bookings WHERE id=$1",
      [bookingId]
    );

    if (booking.rows.length === 0) return null;

    await pool.query(
      "UPDATE vehicles SET availability_status='available' WHERE id=$1",
      [booking.rows[0].vehicle_id]
    );
  }

  // Update booking status
  const result = await pool.query(
    "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
    [status, bookingId]
  );

  return result.rows[0] || null;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getAllBookingsAdmin,
  getAllBookingCustomer,
  updateBooking,
};
