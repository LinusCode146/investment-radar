import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        switch (req.method) {
            case "GET":
                const investment = await prisma.investment.findUnique({
                    where: { id: Number(id) },
                });
                if (!investment) return res.status(404).json({ error: "Investment not found" });
                return res.status(200).json(investment);

            case "PUT":
                const allowedFields = ["title", "description", "type", "location", "lat", "lng", "likes", "authorName", "authorAdress", "approved"];
                const dataToUpdate: Record<string, any> = {};

                allowedFields.forEach((field) => {
                    if (req.body[field] !== undefined) {
                        if (field === "lat" || field === "lng") {
                            dataToUpdate[field] = parseFloat(req.body[field]);
                        } else {
                            dataToUpdate[field] = req.body[field];
                        }
                    }
                });

                if (Object.keys(dataToUpdate).length === 0) {
                    return res.status(400).json({ error: "No valid fields to update" });
                }

                const updatedInvestment = await prisma.investment.update({
                    where: { id: Number(id) },
                    data: dataToUpdate,
                });

                return res.status(200).json(updatedInvestment);

            case "DELETE":
                await prisma.investment.delete({ where: { id: Number(id) } });
                return res.status(204).end();

            default:
                res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
                return res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error", details: err });
    }
}
