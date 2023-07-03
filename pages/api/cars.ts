import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        if (request.method === "GET") {
            const cars = await prisma.car.findMany({
                orderBy: [{ id: "asc" }],
            });
            response.setHeader("Cache-Control", "no-store");
            return response.status(200).json(cars);
        }

        if (request.method === "POST") {
            const {
                car,
                car_model,
                car_color,
                car_model_year,
                car_vin,
                price,
                availability,
            } = request.body;
            console.log(request.body);
            const existingCar = await prisma.car.findUnique({
                where: { car_vin },
            });
            if (existingCar) {
                return response
                    .status(400)
                    .json({ error: "Car VIN already exists" });
            }

            const createdCar = await prisma.car.create({
                data: {
                    car,
                    car_model,
                    car_color,
                    car_model_year,
                    car_vin,
                    price,
                    availability,
                },
            });

            return response.status(201).json(createdCar);
        }

        if (request.method === "PATCH") {
            console.log("456");
            const { id, car_color, price, availability } = request.body;
            console.log(request.body);

            const updatedCar = await prisma.car.update({
                where: { id },
                data: { car_color, price, availability },
            });

            return response.status(200).json(updatedCar);
        }

        if (request.method === "DELETE") {
            const { id } = request.query;
            console.log(id);
            console.log(request);

            await prisma.car.delete({
                where: { id: parseInt(id as string, 10) },
            });

            return response
                .status(200)
                .json({ message: "Car deleted successfully" });
        }

        return response.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Something went wrong" });
    }
}
