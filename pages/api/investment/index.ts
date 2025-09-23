import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case "GET":
                const investments = await prisma.investment.findMany({
                    orderBy: {
                        likes: "desc"
                    }
                });
                return res.status(200).json(investments);

            case "POST":
                const { title, description, type, location, lat, lng, authorPlz, authorAge } = req.body;

                if (!title || !description || !type || !location || !authorPlz) {
                    return res.status(400).json({ error: "Missing required fields" });
                }

                const data: any = { title, description, type, location, authorPlz, authorAge };
                if (lat && lng) {
                    data['lat'] = parseFloat(lat);
                    data['lng'] = parseFloat(lng);
                }
                if (authorAge !== undefined) {
                    data['authorAge'] = parseInt(authorAge);
                }

                const newInvestment = await prisma.investment.create({
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
