import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        if (request.method === "DELETE") {
            const mountOfCarsDeleted = await prisma.car.deleteMany();

            return response.status(200).json({
                message: `${mountOfCarsDeleted.count} Car deleted successfully`,
            });
        }

        return response.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
}
