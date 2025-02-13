"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});
const userRoutes = router;
exports.default = userRoutes;
