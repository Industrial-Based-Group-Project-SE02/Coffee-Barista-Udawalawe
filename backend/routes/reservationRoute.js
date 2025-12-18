import express from "express";
import {
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  saveReservation,
  approveReservation,
  rejectReservation,
  getPendingReservations,
  getApprovedReservations,
  getReservationsByEmail,
  getReservationCount,
  getAllReservationsCount,
  getReservationByReserveId,
} from "../controllers/reservationController.js";

const reservationRouter = express.Router();


reservationRouter.post("/addreservation", saveReservation);
reservationRouter.put("/approve/:reservation_id", approveReservation);
reservationRouter.put("/reject/:reservation_id", rejectReservation);
reservationRouter.get("/pending", getPendingReservations);
reservationRouter.get("/approved", getApprovedReservations);
reservationRouter.get("/byemail/:email",getReservationsByEmail);
reservationRouter.put("/update/:reservation_id", updateReservation);
reservationRouter.delete("/delete/:reservation_id", deleteReservation);
reservationRouter.get("/all", getAllReservations);
reservationRouter.get("/count/:email", getReservationCount);
reservationRouter.get("/pendingcount", getPendingReservations);
reservationRouter.get("/allcount", getAllReservationsCount);
reservationRouter.get("/getid/:reservation_id", getReservationById);
reservationRouter.get("/reserve/:reserve_id", getReservationByReserveId);




export default reservationRouter;
