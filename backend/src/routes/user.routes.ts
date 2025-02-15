import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";

const router = Router();

// ✅ POST Create User
// TODO: 1️ Validate Empty Fields Properly Before Calling Prisma
// Currently, empty values for `name` or `email` might not be caught properly.
// Fix: Add validation to prevent empty strings from reaching Prisma.

// TODO: 2️ Implement Proper Email Format Validation
// Right now, the system does not validate whether the `email` field is a valid email format.
// Fix: Use a regex or a library like `validator.js` to ensure proper email formatting.

// TODO: 3️ Handle Invalid Role ID (Foreign Key Constraint Error - `P2003`)
// If a user is created with a `roleId` that does not exist, Prisma will fail.
// Fix: Before inserting, check if the `roleId` exists in the `Roles` table.

router.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const result = await UserService.createUser(name, email);

    if (!result.success) {
        res.status(400).json({ error: result.error });
        return;
    }

    res.status(201).json({
        message: "User created successfully",
        data: result.data,
    });
});

// ✅ GET All Users
router.get("/users", async (req: Request, res: Response) => {
    const result = await UserService.getUsers();

    if (!result.success) {
        res.status(500).json({ error: result.error });
        return;
    }

    res.status(200).json({
        message: "Users fetched successfully",
        data: result.data,
    });
});

// ✅ GET a Single User by ID
router.get("/users/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await UserService.getUserById(userId);

    if (!result.success) {
        res.status(404).json({ error: result.error });
        return;
    }

    res.status(200).json({
        message: "User found",
        data: result.data,
    });
});

export default router;
