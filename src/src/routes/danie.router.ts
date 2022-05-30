import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Danie  from "../models/Danie";

export const danieRouter = express.Router();
danieRouter.use(express.json());

danieRouter.get("/", async (req: Request, res: Response) => {
	try {
		const danie = (await collections.Danie.find({}).toArray()) as Danie[];
		res.status(200).send(danie);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania dania";
		if (error.message) {
			errorMessage = error.message;
		}
		res.status(500).send(error.message);
	}
});


