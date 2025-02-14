import { prisma } from "../db/prisma";
import { Prisma } from "@prisma/client";

export const UserService = {
    async createUser(name: string, email: string) {
        try {
            console.log("[UserService] Creating user with:", { name, email });

            const user = await prisma.user.create({
                data: { name, email },
            });

            console.log("[UserService] User created:", user);
            return { success: true, data: user };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    console.error("[UserService] Error: Email already exists.");
                    return { success: false, error: "Email already exists." };
                }
            }
            console.error(
                "[UserService] Unexpected error creating user:",
                error
            );
            return { success: false, error: "An unexpected error occurred." };
        }
    },

    async getUsers() {
        try {
            console.log("[UserService] Fetching all users...");
            const users = await prisma.user.findMany();
            console.log("[UserService] Retrieved users:", users);

            return { success: true, data: users };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(
                    "[UserService] Prisma error fetching users:",
                    error.message
                );
                return { success: false, error: error.message };
            }
            console.error(
                "[UserService] Unexpected error fetching users:",
                error
            );
            return { success: false, error: "Error retrieving user data." };
        }
    },

    async getUserById(userId: string) {
        try {
            console.log(`[UserService] Fetching user by ID: ${userId}`);

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.warn(`[UserService] User not found with ID: ${userId}`);
                return { success: false, error: "User not found." };
            }

            console.log("[UserService] Retrieved user:", user);
            return { success: true, data: user };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.error(
                    "[UserService] Prisma error fetching user:",
                    error.message
                );
                return { success: false, error: error.message };
            }
            console.error(
                "[UserService] Unexpected error fetching user:",
                error
            );
            return { success: false, error: "Error retrieving user data." };
        }
    },
};
