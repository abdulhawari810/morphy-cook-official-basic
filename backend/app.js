import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import multer from "multer";
import { globalLimiter } from "./middleware/security.js";
import {
  UsersRoute,
  AuthRoute,
  RecipeRoute,
  FavouriteRoute,
  CategoriesRoute,
  UploadRouter,
  ProfileRoutes,
  QrCodeRoute,
  ReviewRoute,
} from "./routes/initialize.route.js";
import path from "path";

dotenv.config();

const productionENV = process.env.APP_ENVIRONMENT === "production";
const originENV = process.env.APP_ORIGIN || "http://localhost:5173";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use("/api", globalLimiter);

app.use(cookieParser());

app.use(
  cors({
    origin: originENV,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "storage/uploads")),
);

app.use(
  session({
    secret: process.env.APP_SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: productionENV,
      sameSite: productionENV ? "none" : "lax",
    },
  }),
);

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UsersRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/recipes", RecipeRoute);
app.use("/api/favourite", FavouriteRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/profile", ProfileRoutes);
app.use("/api/upload", UploadRouter);
app.use("/api/2fas", QrCodeRoute);
app.use("/api/reviews", ReviewRoute);

// check backend server

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server good" });
});

// 404 JSON untuk route yang tidak dikenal
app.use((req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan." });
});

// Error handler global (termasuk Multer -> 400 JSON, bukan HTML)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  if (err && err.message === "Format file tidak didukung.") {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Server error" });
});

app.listen(process.env.APP_PORT, () =>
  console.log("Server berjalan dengan baik dan tangguh..."),
);
