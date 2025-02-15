import { prisma } from "../db/prisma";
import { ServiceResponse } from "../types/types";
import { handlePrismaRequestError } from "../utils/errorHandler";
import logger from "../utils/logger";

export const UserService = {
    async createUser(
        name: string,
        email: string
    ): Promise<ServiceResponse<{ id: string; name: string; email: string }>> {
        try {
            const user = await prisma.user.create({
                data: { name, email },
            });

            logger.success(`[UserService] User created successfully.`);
            return { success: true, data: user };
        } catch (error) {
            return handlePrismaRequestError(error, "creating user");
        }
    },

    async getUsers(): Promise<
        ServiceResponse<{ id: string; name: string; email: string }[]>
    > {
        try {
            const users = await prisma.user.findMany();
            logger.success("[UserService] Fetched all users.");
            return { success: true, data: users };
        } catch (error) {
            return handlePrismaRequestError(error, "fetching users");
        }
    },

    async getUserById(
        userId: string
    ): Promise<ServiceResponse<{ id: string; name: string; email: string }>> {
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                logger.error(`[UserService] User not found with ID: ${userId}`);
                return { success: false, error: "User not found." };
            }

            logger.success(
                `[UserService] Retrieved user: ${user.name}, email: ${user.email}`
            );

            return { success: true, data: user };
        } catch (error) {
            return handlePrismaRequestError(error, "fetching user by ID");
        }
    },
};
