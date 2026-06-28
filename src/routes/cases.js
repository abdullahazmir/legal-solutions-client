// // routes/cases.js
// const express = require("express");
// const router = express.Router();
// const { ObjectId } = require("mongodb");

// module.exports = (db) => {

//   router.get("/", async (req, res) => {
//     try {
//       const { search, specialization, location, availability, maxFee } = req.query;

//       const query = {};

//       if (search) {
//         query.$or = [
//           { name:           { $regex: search, $options: "i" } },
//           { specialization: { $regex: search, $options: "i" } },
//           { location:       { $regex: search, $options: "i" } },
//           { bio:            { $regex: search, $options: "i" } },
//         ];
//       }

//       if (specialization) query.specialization = specialization;
//       if (location)       query.location       = location;
//       if (availability)   query.availability   = { $regex: availability, $options: "i" };
//       if (maxFee)         query.consultationFee = { $lte: Number(maxFee) };

//       const cases = await db.collection("cases").find(query).toArray();
//       res.json(cases);
//     } catch (err) {
//       console.error("GET /api/cases error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   return router;
// };