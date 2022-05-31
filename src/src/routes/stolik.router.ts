import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import  Stolik from "../models/Stolik";

export const stolikRouter = express.Router();
stolikRouter.use(express.json());

stolikRouter.get("/", async (req: Request, res: Response) => {
	try {
		const stolik = (await collections?.Stolik?.find({}).toArray()) as Stolik[];
		res.status(200).send(stolik);

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania stolia";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

stolikRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const stolik = (await collections?.Stolik?.findOne({ _id: new ObjectId(req.params.id) })) as Stolik;
		if(stolik){
			res.status(200).send(stolik);
		}else {
			res.status(404).send("Nie znaleziono stolika");
		}
		

	}catch (error) {
		let errorMessage = "Błąd podczas pobierania stolika";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(500).send(errorMessage);
	}
});

stolikRouter.post("/", async (req: Request, res: Response) => {
	try {
		const stolik = req.body as Stolik;
		const result = await collections?.Stolik?.insertOne(stolik);

		result ? res.status(201).send(`Dodano stolika: ${result.insertedId}`) 
		: res.status(500).send("Błąd podczas dodawania stolika");

	}catch (error) {
		let errorMessage = "Błąd podczas dodawania stolika";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(500).send(errorMessage);
	}
});

stolikRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const updateStolik: Stolik = req.body as Stolik;
		const query = { _id: new ObjectId(id) };

		const result = await collections?.Stolik?.updateOne(query, {$set: updateStolik});

		result ? res.status(200).send(`Zaktualizowano stolika: ${id}`)
		: res.status(500).send(`Błąd podczas aktualizacji stolika ${id}`);
	}catch (error){
		let errorMessage = "Błąd podczas aktualizacji stolika";
		if (error instanceof Error) {
			errorMessage = error?.message;
		}
		res.status(400).send(errorMessage);

	}
});

stolikRouter.delete("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;
	try{
		const query = { _id: new ObjectId(id) };
		const result = await collections?.Stolik?.deleteOne(query);

		if(result && result.deletedCount){
			res.status(202).send(`Usunięto stolika: ${id}`);
		} else if (!result){
			res.status(404).send(`Nie znaleziono stolika: ${id}`);
		} else if (!result.deletedCount){
			res.status(500).send(`Błąd podczas usuwania stolika ${id}`);
		}
	}catch (error){
		let errorMessage = "Błąd podczas usuwania stolika";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		res.status(400).send(errorMessage);

	}
});

