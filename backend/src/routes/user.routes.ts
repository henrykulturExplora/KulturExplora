import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";

const router = Router();

// GET Users
router.get("/users", async (req: Request, res: Response) => {
    const result = await UserService.getUsers();
    if (!result.success) {
        res.status(500).json({ error: result.error });
        return;
    }
    res.json(result.data);
});

// Get a single user by ID
router.get("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    const result = await UserService.getUserById(userId);
    if (!result.success) {
        res.status(404).json({ error: result.error });
        return;
    }

    res.json(result.data);
});

// POST Create User
router.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ error: "Username or email missing" });
        return;
    }

    const result = await UserService.createUser(name, email);
    if (!result.success) {
        res.status(500).json({ error: result.error });
        return;
    }

    res.status(201).json({
        message: "User created successfully",
        user: result.data,
    });
});

export default router;
