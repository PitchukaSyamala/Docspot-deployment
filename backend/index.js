// === backend/index.js ===
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("./config/connectToDB");

// ✅ Load environment variables as early as possible
dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectToDB();

// ✅ Set port
const PORT = process.env.PORT || 5002;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled error:", err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
