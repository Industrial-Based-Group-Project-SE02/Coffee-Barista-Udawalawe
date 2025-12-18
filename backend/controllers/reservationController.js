
import Reservation from "../models/Reservation.js";
import User from "../models/user.js";
import { isAdmin, isCoustomer, isCashier } from "./userController.js";




// Helpers
const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const isValidPhone = (phone = "") => /^[0-9+\-\s]{7,15}$/.test(phone.trim());

// Convert "YYYY-MM-DD" -> Date at midnight (local)
function toDateOnly(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function saveReservation(req, res) {
  try {

    if (!isCoustomer(req)) {
      return res.status(403).json({ message: "Access denied. Customers only." });
    }

    // Required fields from body
    const { table_id, date, In_time, Out_time, guests, note, name, phone } = req.body;

    if (!table_id || !date || !In_time || !Out_time || !guests) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const dateOnly = toDateOnly(date);
    if (!dateOnly) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Generate reserve_id (schema requires reserve_id)
    let reserve_id = "RES00001";
    const last = await Reservation.findOne().sort({ createdAt: -1 }).select("reserve_id");

    if (last?.reserve_id) {
      const lastNum = parseInt(last.reserve_id.replace("RES", ""), 10);
      reserve_id = "RES" + String(lastNum + 1).padStart(5, "0");
    }

    const fullName =
      (name && String(name).trim()) ||
      `${req.user.firstname || ""} ${req.user.lastname || ""}`.trim();

    const newReservation = new Reservation({
      reserve_id,                 // ✅ required
      table_id: String(table_id), // ✅ required
      name: fullName,             // ✅ required
      email: req.user.email,
      phone: phone || "",

      date: dateOnly,
      In_time: String(In_time),
      Out_time: String(Out_time),
      guests: Number(guests),
      note: note || "",
      status: "pending",
    });

    const saved = await newReservation.save();

    return res.status(201).json({
      message: "Reservation created successfully",
      reservation: saved,
    });
  } catch (error) {
    console.error("saveReservation error:", error);
    return res.status(500).json({
      message: "Error creating reservation",
      error: error.message,
    });
  }
}



  export async function approveReservation(req, res) {
    if (!isAdmin(req.user) && !isCashier(req.user)) {
      return res.status(403).json({
        message: "Access denied. Admins and Cashiers only.",
      });
      return
    }

    try {
      await Reservation.updateOne(
        { reservation_id: req.params.reservation_id },
        { status: "approved" }
      );
      res.status(200).json({
        success: true,
        message: "Reservation approved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error approving reservation",
        error: error.message,
      });
    }
  }

export async function rejectReservation(req, res) {
  if (!isAdmin(req.user) && !isCashier(req.user)) {
    return res.status(403).json({
      message: "Access denied. Admins and Cashiers only.",
    });
    return
  }
  try {
    await Reservation.updateOne(
      { reservation_id: req.params.reservation_id },
      { status: "rejected" }
    );
    res.status(200).json({
      success: true,
      message: "Reservation rejected successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error rejecting reservation",
      error: error.message,
    });
  }
}

export async function getPendingReservations(req, res) {

  try {
    const getPendingReservations = await Reservation.find({ status: "pending" });
    res.json(getPendingReservations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending reservations",
      error: error.message,
    });
  }

}

export async function getApprovedReservations(req, res) {
  try {
    const ApprovedReservations = await Reservation.find({ status: "approved" });
    
    const filteredReservations = [];

    for ( const reservation of ApprovedReservations) {
      const user = await User.findOne({ email: reservation.email });
      if (user){
        filteredReservations.push(reservation);
      }
    }

    res.json(filteredReservations);
  } catch (error) { 
    res.status(500).json({
      message: "Error fetching approved reservations",
      error: error.message,
    });
  }
}

export async function getReservationsByEmail(req, res) {
  const email = req.params.email;

  try {
    const reservations = await Reservation.find({email: email});

    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservations",
      error: error.message,
    });
  }

}

export async function updateReservation(req, res) {
  if (!isCoustomer(req)) {
    return res.status(403).json({
      message: "Access denied. Customers only."
    });
  }

  try {
    await Reservation.updateOne(
      { reserve_id: req.params.reservation_id },   // ✅ match your schema field
      { $set: req.body }                           // ✅ safer update
    );

    res.status(200).json({
      success: true,
      message: "Reservation updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reservation",
      error: error.message,
    });
  }
}


export async function deleteReservation(req, res) {
  if (!isCoustomer(req)) {
    return res.status(403).json({
      message: "Access denied. Customers only."
    });
  }

  try {
    const result = await Reservation.deleteOne({
      reserve_id: req.params.reservation_id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Reservation not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting reservation",
      error: error.message
    });
  }
}


export async function getAllReservations(req, res) {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservations",
      error: error.message,
    });
  }
}

export async function getReservationCount(req, res) {

  const {email} = req.params;

  if(!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
    return;
  }
  try {
    const count = await Reservation.countDocuments({ email: email });
    res.status(200).json({
      success: true,
      message: "Reservation count fetched successfully",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reservation count",
      error: error.message,
    });
  }
}

export async function getPendingReservationsCount(req, res) {
  try {
    const count = await Reservation.countDocuments({ status: "pending" });
    res.status(200).json({
      success: true,
      message: "Pending reservation count fetched successfully",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pending reservation count",
      error: error.message,
    });
  }
}

export async function getAllReservationsCount(req, res) {
  try {
    const count = await Reservation.countDocuments();
    res.status(200).json({
      success: true,
      message: "Total reservation count fetched successfully",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching total reservation count",
      error: error.message,
    });
  }
}
export async function getReservationById(req, res) {
  try {
    const reservation_id = req.params.reservation_id;
    const reservation = await Reservation.findOne({ reservation_id: reservation_id });

    res.json(reservation);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reservation",
      error: error.message,
    });
  }
}
export async function getReservationByReserveId(req, res) {
  try {
    const reserve_id = req.params.reserve_id;

    const reservation = await Reservation.findOne({ reserve_id });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    return res.status(200).json(reservation);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching reservation",
      error: error.message,
    });
  }
}









