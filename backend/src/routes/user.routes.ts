import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../types/types";

const router = Router();
const prisma = new PrismaClient();

router.get("/users", async (req: Request, res: Response) => {
    try {
        const users: User[] = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.post("/users", async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Name and email are required" });
            return;
        }

        const newUser: User = await prisma.user.create({
            data: { name, email },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

const userRoutes = router;
export default userRoutes;
