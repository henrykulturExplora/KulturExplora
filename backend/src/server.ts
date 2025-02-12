import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { supabase } from "./config/supabase.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// DataBase

console.log("Loaded ENV Variables:");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);
async function testDBConnection() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) console.error("Supabase connection failed: ", error);
    else console.log("Supabase connected! ", data);
}
testDBConnection();

// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
