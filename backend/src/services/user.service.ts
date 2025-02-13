import { prisma } from "../db/prisma";

export const UserService = {
    async createUser(name: string, email: string) {
        try {
            console.log("[UserService] Creating user with:", {
                name,
                email,
            });

            const user = await prisma.user.create({
                data: { name, email },
            });

            console.log("[UserService] User created:", user);
            return { success: true, data: user };
        } catch (error: any) {
            console.error("[UserService] Error creating user:", error.message);
            return {
                success: false,
                error: error.message || "An unexpected error occurred",
            };
        }
    },

    async getUsers() {
        try {
            console.log("[UserService] Fetching all users...");
            const users = await prisma.user.findMany();
            console.log("[UserService] Retrieved users:", users);

            return { success: true, data: users };
        } catch (error: any) {
            console.error("[UserService] Error fetching users:", error.message);
            return {
                success: false,
                error: error.message || "Error retrieving user data",
            };
        }
    },

    async getUserById(userId: string) {
        try {
            console.log(`[UserService] Fetching user by ID: ${userId}`);

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.error(
                    `[UserService] User not found with ID: ${userId}`
                );
                return { success: false, error: "User not found" };
            }

            console.log("[UserService] Retrieved user:", user);
            return { success: true, data: user };
        } catch (error: any) {
            console.error("[UserService] Error fetching user:", error.message);
            return {
                success: false,
                error: error.message || "Error retrieving user data",
            };
        }
    },
};
