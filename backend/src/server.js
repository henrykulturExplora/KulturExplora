"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_js_1 = __importDefault(require("./routes/user.routes.js"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.use("/api", user_routes_js_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
