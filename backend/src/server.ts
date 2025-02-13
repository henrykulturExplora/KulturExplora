import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { supabase } from "./config/supabase";
import { prisma } from "./db/prisma";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// DataBase
// TODO: Implement Error Handling
//TODO: create routes for IMAGES, OPERATORS and TOURS
//TODO: save and retrieve data from the DB for each route

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
