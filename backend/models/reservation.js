import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    reserve_id: {
      type: String,
      required: true,
    },
    table_id: {
        type: String,
        required: true
    },
    name: { type: String,
            required: true
         },

    phone: { type: String,
             required: true
         },
    email: { type: String,
             required: true
         },

    date: { type: Date,
         required: true
         },

    In_time: { type: String,
         required: true
         },
    Out_time: { type: String,
          required: true
          },

    guests: { type: Number,
         required: true,
          min: 1 },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "cancelled"],
    },

    note: { type: String },
  },
  { timestamps: true }
);

// ✅ prevent double booking for same table + date + time
reservationSchema.index(
  { table_id: 1, date: 1, In_time: 1, Out_time: 1 },
  { unique: true }
);


const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
