import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const investments = await prisma.investmentFinished.findMany();
                return res.status(200).json(investments);

            case "POST":
                const { title, description, budget, completed, region, type, location, lat, lng, completedDate, contractor } = req.body;

                if (!title || !description || !type || !location || !region) {
                    console.log(title, description, type, location, region)
                    return res.status(400).json({ error: "Missing required fields" });
                }

                const data: any = { title, description, type, location, region };
                if (lat && lng) {
                    data['lat'] = parseFloat(lat);
                    data['lng'] = parseFloat(lng);
                }
                if (budget !== undefined) {
                    data['budget'] = parseFloat(budget);
                }
                if (completed !== undefined) {
                    data['completed'] = completed;
                }
                if (completedDate !== undefined) {
                    data['completedDate'] = parseFloat(completedDate);
                }
                if (contractor) {
                    data['contractor'] = contractor;
                }

                const newInvestment = await prisma.investmentFinished.create({
                    data: data
                });

                return res.status(201).json(newInvestment);

            default:
                res.setHeader("Allow", ["GET", "POST"]);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error", details: err });
    }
}
