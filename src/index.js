// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import path from "path";

// import { connectDB } from "./lib/db.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";

// dotenv.config();

// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: "https://chat-frontend-io9e.vercel.app",
//   credentials: true   
// }));


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("*", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// //   });
// // }

// server.listen(PORT, () => {
//   console.log("server is running on PORT:" + PORT);
//   connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const WHITELIST = process.env.FRONTEND_ORIGINS.split(",").map((url) => url.trim());

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: WHITELIST,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Static‐serving block removed/commented out
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//   );
// }

(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();




