import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Danie  from "../models/Danie";

export const danieRouter = express.Router();
danieRouter.use(express.json());

danieRouter.get("/", async (req: Request, res: Response) => {
	try {
		const danie = (await collections?.Danie?.find({}).toArray()) as Danie[];
		res.status(200).send(danie);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania dania";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

danieRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const danie = (await collections?.Danie?.findOne({ _id: new ObjectId(req.params.id) })) as Danie;
		if(danie){
			res.status(200).send(danie);
		}else {
			res.status(404).send("Nie znaleziono dania");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania dania";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

danieRouter.post("/", async (req: Request, res: Response) => {
	try {
		const danie = req.body as Danie;
		const result = await collections?.Danie?.insertOne(danie);

		result ? res.status(201).send(`Dodano danie: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania dania");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania dania";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

danieRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateDanie: Danie = req.body as Danie;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Danie?.updateOne(query, {$set: updateDanie});

		result ? res.status(200).send(`Zaktualizowano danie: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji dania ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji dania";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

danieRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Danie?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto danie: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono dania: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania dania ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania dania";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});


