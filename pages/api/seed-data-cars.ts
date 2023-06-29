import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const cars = await prisma.car.createMany({ data: request.body.cars });

        return response.status(200).json(cars);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
}
