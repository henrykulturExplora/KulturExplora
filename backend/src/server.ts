import express from "express";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const port = process.env.PORT || 3000;
import userRoutes from "./routes/user.routes";

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
